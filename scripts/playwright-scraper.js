#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════
//  BAR3 EasyScore Playwright Scraper
//
//  Scrapes easyscore.com (Next.js, fully client-rendered) to extract
//  per-player batting stats that the EasyScore REST API does not expose.
//
//  Flow:
//  1. Detect new finished BAR3 games via EasyScore API (fast, no browser)
//  2. For each new game, use Playwright to scrape:
//       https://www.easyscore.com/boxscores/{gameId}
//       → final score, innings, per-player batting stats
//  3. For each BAR3 player, use Playwright to scrape:
//       https://www.easyscore.com/playerstats/{playerId}?yr=2026&lg=10144&rd=0
//       → season totals + full game log
//  4. Update source files:
//       barracudas3/app.js  → PLAYER_EXTENDED_DATA, GAMES[], standings FALLBACK
//       barracudas3/index.html → W-L record
//       barracudas3/results.html → boxscore HTML + standings row
//  5. Output GITHUB_OUTPUT flags for the workflow step
// ══════════════════════════════════════════════════════════════════

const { chromium } = require('@playwright/test');
const fs    = require('fs');
const path  = require('path');
const https = require('https');

// ── Paths ──────────────────────────────────────────────────────
const ROOT          = path.join(__dirname, '..');
const SITE          = path.join(ROOT, 'barracudas3');
const STATE_FILE    = path.join(__dirname, 'game-state.json');
const APP_JS        = path.join(SITE, 'app.js');
const INDEX_HTML    = path.join(SITE, 'index.html');
const RESULTS_HTML  = path.join(SITE, 'results.html');

// ── Config ─────────────────────────────────────────────────────
const API_KEY   = process.env.EASYSCORE_API_KEY;
const TEAM_ID   = parseInt(process.env.EASYSCORE_TEAM_ID || '13054');
const DRY_RUN   = process.env.DRY_RUN === 'true';
const FORCE_ID  = parseInt(process.env.FORCE_GAME_ID || '') || null;
const PROBE_STEP = 60;

// BAR3 player EasyScore IDs → uniform numbers (for PLAYER_EXTENDED_DATA lookup)
const PLAYER_MAP = {
  26400: '27',  // Del Valle
  42266: '1',   // Malchans
  37907: '15',  // Medina
  34551: '34',  // Rosa Lima
  24327: '16',  // Pedroso
  34542: '77',  // Arregoitia
  35528: '30',  // Moreno
  47363: '13',  // Elias
  37221: '22',  // Vasquez
};

const TEAM_LOGOS = {
  BAR3: 'assets/logo.png',       BAR:  'assets/teams/BARLOGO.png',
  EAG:  'assets/teams/eagles.png', IND:  'assets/teams/indians.png',
  CHA2: 'assets/teams/challengers.png', FLY2: 'assets/teams/flyers.png',
  FRO:  'assets/teams/frogs.png',
};

// ── Utilities ──────────────────────────────────────────────────
function setOutput(key, val) {
  const f = process.env.GITHUB_OUTPUT;
  if (f) fs.appendFileSync(f, `${key}=${String(val).replace(/\n/g, '%0A')}\n`);
  else console.log(`[OUTPUT] ${key}=${val}`);
}

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch { return { lastProbedId: 19280, processedIds: [], record: { W: 5, L: 4 } }; }
}

function saveState(s) {
  if (DRY_RUN) return;
  s.updatedAt = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2) + '\n');
}

function fetchJson(url, headers = {}) {
  return new Promise((res, rej) => {
    https.get(url, { headers }, r => {
      let b = '';
      r.on('data', c => b += c);
      r.on('end', () => { try { res(JSON.parse(b)); } catch(e) { rej(new Error(b.slice(0,200))); } });
    }).on('error', rej);
  });
}

async function fetchGame(id) {
  try {
    const d = await fetchJson(`https://api.easyscore.com/v2/games?id=${id}`, { 'x-api-key': API_KEY });
    return Array.isArray(d) ? d[0] ?? null : null;
  } catch { return null; }
}

// ── Swiss Baseball scraper ─────────────────────────────────────
// swiss-baseball.ch uses EasyScore Firestore as backend.
// It shows ALL Swiss league games including inter-club (NLA vs NL)
// that don't appear in the EasyScore REST API with LeagueID 10144.
async function scrapeSwissBaseball(page) {
  console.log('  Scraping swiss-baseball.ch for BAR3 games...');
  await page.goto('https://www.swiss-baseball.ch', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(5000);

  // Click "VERGANGENE SPIELE" to show past games
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*'))
      .find(e => e.textContent.trim() === 'VERGANGENE SPIELE' && e.children.length === 0);
    if (el) el.click();
  });
  await page.waitForTimeout(4000);

  const text = await page.evaluate(() => document.body.innerText || '');
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 3);

  const games = [];
  let currentDate = '';

  // Parse format: "time\tleague\tgame_nr\taway\thome\tscore\t...\tlocation"
  for (const line of lines) {
    // Detect date headers like "Sa. 30.05.2026" or "Di. 02.06.2026"
    const dateMatch = line.match(/^(?:Mo|Di|Mi|Do|Fr|Sa|So)\.\s+(\d{2}\.\d{2}\.\d{4})$/);
    if (dateMatch) {
      const [d, m, y] = dateMatch[1].split('.');
      currentDate = `${y}-${m}-${d}`; // YYYY-MM-DD
      continue;
    }

    // Detect game lines — tab-separated
    const parts = line.split('\t').map(p => p.trim());
    if (parts.length < 5) continue;
    const [time, league, nr, away, home, score] = parts;
    if (!time.match(/^\d{2}:\d{2}$/) || !league || !away || !home) continue;

    // Only care about games with Barracudas 3
    if (!away.includes('Barracudas 3') && !home.includes('Barracudas 3')) continue;

    // Only process games with a score (completed)
    if (!score || !score.match(/^\d+-\d+/)) continue;

    const [awayR, homeR] = score.split('-').map(n => parseInt(n) || 0);
    const bar3IsAway = away.includes('Barracudas 3');
    const bar3R = bar3IsAway ? awayR : homeR;
    const oppR  = bar3IsAway ? homeR : awayR;
    const oppName = bar3IsAway ? home : away;

    games.push({
      date: currentDate,
      time,
      league,
      gameNr: nr,
      bar3R,
      oppR,
      oppName: oppName.trim(),
      won: bar3R > oppR,
      source: 'swiss-baseball',
    });
  }

  // Also extract live standings from the TABELLEN section
  const standings = [];
  let inGruppeA = false;
  for (const line of lines) {
    if (line.includes('NL Baseball Gruppe A')) { inGruppeA = true; continue; }
    if (line.includes('NL Baseball Gruppe B') || line.includes('NLA ')) { inGruppeA = false; continue; }
    if (!inGruppeA) continue;
    const m = line.match(/^(\d+)\.\s+(\w+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)\s+(\S+)/);
    if (m) {
      standings.push({ rank:parseInt(m[1]), abbr:m[2], g:parseInt(m[3]), w:parseInt(m[4]), l:parseInt(m[5]), pct:m[6], gb:m[7] });
    }
  }

  console.log(`  Swiss Baseball: found ${games.length} BAR3 completed games, ${standings.length} standings rows`);
  return { games, standings };
}

// ── 1. GAME DISCOVERY via EasyScore REST API ───────────────────
async function findNewGames(state) {
  if (FORCE_ID) {
    console.log(`  Force-checking game ID ${FORCE_ID}`);
    const g = await fetchGame(FORCE_ID);
    if (!g || !g.GameEnded) return [];
    if ((g.AwayTeam !== TEAM_ID && g.HomeTeam !== TEAM_ID)) return [];
    return [g];
  }

  const startId = state.lastProbedId;
  const endId   = startId + PROBE_STEP;
  console.log(`  Probing EasyScore IDs ${startId + 1}–${endId}...`);

  const ids = Array.from({ length: PROBE_STEP }, (_, i) => startId + i + 1);
  const raw = await Promise.all(ids.map(fetchGame));

  return raw.filter(g =>
    g &&
    g.GameEnded === 1 &&
    (g.AwayTeam === TEAM_ID || g.HomeTeam === TEAM_ID) &&
    !state.processedIds.includes(g.ID)
  );
}

// ── 2. PLAYWRIGHT: scrape boxscore page ───────────────────────
async function scrapeBoxscore(page, gameId) {
  const url = `https://www.easyscore.com/boxscores/${gameId}`;
  console.log(`  Scraping boxscore: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for score data to appear
  await page.waitForSelector('table, [class*="score"], [class*="team"]', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000); // extra JS render time

  const data = await page.evaluate(() => {
    const result = { teams: [], innings: {}, batting: {}, pitching: {} };

    // ── Extract JSON data embedded by Next.js ──────────────────
    // Next.js apps often have __NEXT_DATA__ or fetch calls with game data
    // Try multiple extraction strategies

    // Strategy 1: Look for structured score tables
    const allTables = Array.from(document.querySelectorAll('table'));

    for (const table of allTables) {
      const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());

      // Detect batting stats table (has AB, R, H columns)
      if (headers.includes('AB') && headers.includes('H') && headers.includes('R')) {
        const abIdx  = headers.indexOf('AB');
        const rIdx   = headers.indexOf('R');
        const hIdx   = headers.indexOf('H');
        const b2Idx  = headers.indexOf('2B');
        const hrIdx  = headers.indexOf('HR');
        const rbiIdx = headers.indexOf('RBI');
        const bbIdx  = headers.indexOf('BB');
        const soIdx  = headers.indexOf('SO');
        const sbIdx  = headers.indexOf('SB');

        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const teamKey = Object.keys(result.batting).length === 0 ? 'away' : 'home';
        result.batting[teamKey] = [];

        for (const row of rows) {
          const cells = Array.from(row.querySelectorAll('td'));
          if (cells.length < 3) continue;

          const name = cells[0]?.textContent.trim();
          const pos  = cells[1]?.textContent.trim() || '?';
          if (!name || name === 'Totals') continue;

          const entry = {
            name, pos,
            AB:  parseInt(cells[abIdx]?.textContent)  || 0,
            R:   parseInt(cells[rIdx]?.textContent)   || 0,
            H:   parseInt(cells[hIdx]?.textContent)   || 0,
            '2B': b2Idx >= 0 ? parseInt(cells[b2Idx]?.textContent) || 0 : 0,
            HR:  hrIdx  >= 0 ? parseInt(cells[hrIdx]?.textContent)  || 0 : 0,
            RBI: rbiIdx >= 0 ? parseInt(cells[rbiIdx]?.textContent) || 0 : 0,
            BB:  bbIdx  >= 0 ? parseInt(cells[bbIdx]?.textContent)  || 0 : 0,
            SO:  soIdx  >= 0 ? parseInt(cells[soIdx]?.textContent)  || 0 : 0,
            SB:  sbIdx  >= 0 ? parseInt(cells[sbIdx]?.textContent)  || 0 : 0,
          };
          result.batting[teamKey].push(entry);
        }
      }

      // Detect linescore table (columns 1-9 with R H E)
      if (headers.some(h => h === '1') && headers.includes('R')) {
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        for (const row of rows) {
          const cells = Array.from(row.querySelectorAll('td'));
          const abbr  = cells[0]?.textContent.trim();
          if (!abbr) continue;
          const innVals = {};
          headers.forEach((h, i) => {
            if (/^\d+$/.test(h)) innVals[parseInt(h)] = parseInt(cells[i]?.textContent) || 0;
          });
          const rIdx = headers.indexOf('R');
          const hIdx = headers.indexOf('H');
          const eIdx = headers.indexOf('E');
          result.innings[abbr] = {
            line: innVals,
            R: parseInt(cells[rIdx]?.textContent) || 0,
            H: parseInt(cells[hIdx]?.textContent) || 0,
            E: parseInt(cells[eIdx]?.textContent) || 0,
          };
        }
      }
    }

    // ── Extract team names and final score ─────────────────────
    // Look for score display patterns
    const scoreEls = document.querySelectorAll('[class*="score"], [class*="Score"]');
    scoreEls.forEach(el => {
      const num = parseInt(el.textContent.trim());
      if (!isNaN(num) && num >= 0) result.teams.push(num);
    });

    // Try to get page title for team names
    result.pageTitle = document.title || '';

    // Grab all text containing patterns like "BAR3 21 — FRO 1"
    const bodyText = document.body.innerText || '';
    result.bodySnippet = bodyText.slice(0, 2000);

    return result;
  });

  console.log(`    Batting tables found: away=${data.batting.away?.length ?? 0} home=${data.batting.home?.length ?? 0}`);
  console.log(`    Innings extracted:`, Object.keys(data.innings));

  return data;
}

// ── 3. PLAYWRIGHT: scrape player stats page ───────────────────
async function scrapePlayerStats(page, playerId) {
  const url = `https://www.easyscore.com/playerstats/${playerId}?yr=2026&lg=10144&rd=0`;
  console.log(`  Scraping player ${playerId}: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('table', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const result = { season: null, log: [], pitching: null };
    const allTables = Array.from(document.querySelectorAll('table'));

    for (const table of allTables) {
      const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());
      const rows    = Array.from(table.querySelectorAll('tbody tr'));

      // ── Batting season totals ──────────────────────────────
      // NOTE: headers[0] is the table title <th> with no matching <td>.
      // So cells[i] corresponds to headers[i+1]. Fix: use cells[i-1].
      if (headers.includes('AVG') && headers.includes('AB') && headers.includes('OPS')) {
        // Find the Gruppe A row (most relevant for BAR3)
        const gruppeARow = rows.find(r => r.cells[1]?.textContent.includes('Gruppe A'))
          || rows[rows.length - 1];

        if (gruppeARow) {
          const cells = Array.from(gruppeARow.querySelectorAll('td'));
          // Subtract 1 from header index to get the matching cell index
          const get = h => {
            const i = headers.indexOf(h);
            return (i > 0) ? (cells[i - 1]?.textContent.trim() || '0') : '0';
          };
          result.season = {
            G:    parseInt(get('G'))   || 0,
            PA:   parseInt(get('PA'))  || 0,
            AB:   parseInt(get('AB'))  || 0,
            R:    parseInt(get('R'))   || 0,
            H:    parseInt(get('H'))   || 0,
            '2B': parseInt(get('2B'))  || 0,
            '3B': parseInt(get('3B'))  || 0,
            HR:   parseInt(get('HR'))  || 0,
            RBI:  parseInt(get('RBI')) || 0,
            BB:   parseInt(get('BB'))  || 0,
            SO:   parseInt(get('SO'))  || 0,
            SB:   parseInt(get('SB'))  || 0,
            CS:   parseInt(get('CS'))  || 0,
            HBP:  parseInt(get('HBP')) || 0,
            SF:   parseInt(get('SF'))  || 0,
            AVG:  get('AVG') || '.000',
            OBP:  get('OBP') || '.000',
            SLG:  get('SLG') || '.000',
            OPS:  get('OPS') || '.000',
          };
        }
      }

      // ── Pitching season totals ─────────────────────────────
      if (headers.includes('ERA') && headers.includes('IP') && headers.includes('SO')) {
        const gruppeARow = rows.find(r => r.cells[1]?.textContent.includes('Gruppe A'))
          || rows[rows.length - 1];
        if (gruppeARow) {
          const cells = Array.from(gruppeARow.querySelectorAll('td'));
          const get = h => { const i = headers.indexOf(h); return (i > 0) ? (cells[i - 1]?.textContent.trim() || '0') : '0'; };
          result.pitching = {
            G:   parseInt(get('G'))  || 0,
            GS:  parseInt(get('GS')) || 0,
            IP:  get('IP') || '0.0',
            H:   parseInt(get('H'))  || 0,
            R:   parseInt(get('R'))  || 0,
            ER:  parseInt(get('ER')) || 0,
            BB:  parseInt(get('BB')) || 0,
            SO:  parseInt(get('SO')) || 0,
            HR:  parseInt(get('HR')) || 0,
            WL:  get('W-L') || '0-0',
            ERA: get('ERA') || '0.00',
            WHIP:get('WHIP')|| '0.00',
          };
        }
      }

      // ── Game log (6-Game Log Batting) ─────────────────────────
      // Same offset fix: headers[0] = title, so cells[i-1] = header[i].
      // Log row layout: cells[0]=Date, [1]=Round, [2]=Opponent, [3]=Spot, [4]=Pos,
      //                 [5]=AB, [6]=R, [7]=H, [8]=2B, [9]=3B, [10]=HR, [11]=RBI,
      //                 [12]=BB, [13]=SO, [14]=SB, [23]=AVG*
      if (headers.some(h => h.includes('6-Game Log Batting')) && rows.length > 0 && rows.length <= 7) {
        for (const row of rows) {
          const cells = Array.from(row.querySelectorAll('td'));
          if (cells.length < 8) continue;
          const dateVal = cells[0]?.textContent.trim();
          if (!dateVal || !dateVal.match(/\d{2}\/\d{2}\/\d{4}/)) continue;
          // Only Gruppe A games
          if (!cells[1]?.textContent.includes('Gruppe A')) continue;

          const entry = {
            date: dateVal,
            opp:  cells[2]?.textContent.trim() || '?',
            spot: cells[3]?.textContent.trim(),
            pos:  cells[4]?.textContent.trim() || '?',
            AB:   parseInt(cells[5]?.textContent)  || 0,
            R:    parseInt(cells[6]?.textContent)   || 0,
            H:    parseInt(cells[7]?.textContent)   || 0,
            '2B': parseInt(cells[8]?.textContent)   || 0,
            '3B': parseInt(cells[9]?.textContent)   || 0,
            HR:   parseInt(cells[10]?.textContent)  || 0,
            RBI:  parseInt(cells[11]?.textContent)  || 0,
            BB:   parseInt(cells[12]?.textContent)  || 0,
            SO:   parseInt(cells[13]?.textContent)  || 0,
            SB:   parseInt(cells[14]?.textContent)  || 0,
            AVG:  cells[cells.length - 1]?.textContent.trim() || '',
          };
          if (entry.AB > 0 || entry.BB > 0) result.log.push(entry);
        }
      }
    }

    return result;
  });

  console.log(`    Season found: ${data.season ? 'yes' : 'no'} | Log entries: ${data.log.length}`);
  return data;
}

// ── 4. FILE UPDATE: PLAYER_EXTENDED_DATA in app.js ────────────
function updatePlayerExtendedData(uniformNum, season, pitching, newLogEntries) {
  let src = fs.readFileSync(APP_JS, 'utf8');

  // Update batting season stats for the player
  if (season) {
    // Build new season string (single-line format matching existing style)
    const s = season;
    const newSeasonStr = `season: { G:${s.G}, PA:${s.PA}, AB:${s.AB}, R:${s.R}, H:${s.H}, '2B':${s['2B']}, '3B':${s['3B']}, HR:${s.HR}, RBI:${s.RBI}, BB:${s.BB}, SO:${s.SO}, SB:${s.SB}, CS:${s.CS}, HBP:${s.HBP}, SF:${s.SF}, AVG:'${s.AVG}', OBP:'${s.OBP}', SLG:'${s.SLG}', OPS:'${s.OPS}' }`;

    // Use a more targeted approach: find the specific player block and replace its season line
    const playerBlockPattern = new RegExp(`('${uniformNum}'\\s*:\\s*\\{[\\s\\S]*?batting:\\s*\\{[\\s\\S]*?)(season:\\s*\\{[^}]+\\})([\\s\\S]*?log:\\s*\\[)`);
    if (playerBlockPattern.test(src)) {
      src = src.replace(playerBlockPattern, `$1${newSeasonStr}$3`);
      console.log(`    ✓ Updated batting.season for #${uniformNum}`);
    } else {
      console.log(`    ⚠ Could not find batting.season pattern for #${uniformNum}`);
    }
  }

  // Update pitching season stats
  if (pitching) {
    const pit = pitching;
    const wlStr = pit.WL || '0-0';
    const newPitchStr = `season: { G:${pit.G}, GS:${pit.GS}, IP:'${pit.IP}', H:${pit.H}, R:${pit.R}, ER:${pit.ER}, BB:${pit.BB}, SO:${pit.SO}, HR:${pit.HR}, HBP:0, WP:0, BF:0, WL:'${wlStr}', SV:0, OppAVG:'.000', WHIP:'${pit.WHIP}', ERA:'${pit.ERA}' }`;
    const pitPattern = new RegExp(`('${uniformNum}'[\\s\\S]{0,2000}?pitching:[\\s\\S]*?)(season:\\s*\\{[^}]+\\})([\\s\\S]*?log:\\s*\\[)`);
    if (pitPattern.test(src)) {
      src = src.replace(pitPattern, `$1${newPitchStr}$3`);
      console.log(`    ✓ Updated pitching.season for #${uniformNum}`);
    }
  }

  // Prepend new log entries
  if (newLogEntries && newLogEntries.length > 0) {
    const logInsertPattern = new RegExp(`('${uniformNum}'[\\s\\S]{0,2000}?batting:[\\s\\S]*?log:\\s*\\[)`);
    if (logInsertPattern.test(src)) {
      const entries = newLogEntries
        .map(e => `        { date:'${e.date}', opp:'${e.opp}', spot:0, pos:'${e.pos || '?'}', AB:${e.AB}, R:${e.R}, H:${e.H}, '2B':${e['2B']||0}, HR:${e.HR||0}, RBI:${e.RBI||0}, BB:${e.BB||0}, SO:${e.SO||0}, SB:${e.SB||0}, AVG:'${e.AVG||'.000'}' },`)
        .join('\n');
      src = src.replace(logInsertPattern, `$1\n${entries}`);
      console.log(`    ✓ Prepended ${newLogEntries.length} log entries for #${uniformNum}`);
    }
  }

  if (!DRY_RUN) fs.writeFileSync(APP_JS, src);

  // Also update roster-data card backs in index.html
  if (season && !DRY_RUN) {
    let html = fs.readFileSync(INDEX_HTML, 'utf8');
    // Pattern: "num":"XX" entry — update its AVG, RBI, OBP/SB, OPS stats
    const cardPat = new RegExp(`("num":"${uniformNum}"[^}]*?"stats":\\[)(.*?)(\\])`,'s');
    if (cardPat.test(html)) {
      const newStats = `{"k":"AVG","v":"${season.AVG}"},{"k":"RBI","v":"${season.RBI}"},{"k":"OBP","v":"${season.OBP}"},{"k":"OPS","v":"${season.OPS}"}`;
      html = html.replace(cardPat, `$1${newStats}$3`);
      fs.writeFileSync(INDEX_HTML, html);
      console.log(`    ✓ Updated roster-data card stats for #${uniformNum}`);
    }
  }
}

// ── 5. FILE UPDATE: GAMES[] in app.js ─────────────────────────
function updateGamesArray(game) {
  let src = fs.readFileSync(APP_JS, 'utf8');
  const result = game.won ? 'W' : 'L';
  const innings = game.innings || 9;

  const pattern = new RegExp(
    `(date:\\s*'${game.date}'[^}]*?result:\\s*)null(,\\s*score:\\s*)null(,\\s*innings:\\s*)null`,
    's'
  );
  if (!pattern.test(src)) {
    console.log(`  ⚠ No null entry in GAMES[] for ${game.date}`);
    return false;
  }
  src = src.replace(pattern, `$1'${result}'$2{ us: ${game.bar3R}, them: ${game.oppR} }$3${innings}`);
  if (!DRY_RUN) fs.writeFileSync(APP_JS, src);
  console.log(`  ✓ GAMES[]: ${game.date} → ${result} ${game.bar3R}-${game.oppR}`);
  return true;
}

// ── 6. FILE UPDATE: W-L record in index.html ──────────────────
function updateRecord(W, L) {
  let src = fs.readFileSync(INDEX_HTML, 'utf8');
  const pattern = /(data-i18n="strip_record">Record 2026<\/span><span class="v">)[0-9]+-[0-9]+(<\/span>)/;
  if (pattern.test(src)) {
    src = src.replace(pattern, `$1${W}-${L}$2`);
    if (!DRY_RUN) fs.writeFileSync(INDEX_HTML, src);
    console.log(`  ✓ Record updated: ${W}-${L}`);
  }
}

// ── 7. FILE UPDATE: boxscore in results.html ──────────────────
function addBoxscore(game, scrapedData) {
  let src = fs.readFileSync(RESULTS_HTML, 'utf8');
  const anchor = '<!-- BOXSCORES LIST -->\n<div class="res-list">';
  if (!src.includes(anchor)) return;

  const logo = abbr => TEAM_LOGOS[abbr]
    ? `<img src="${TEAM_LOGOS[abbr]}" alt="" style="height:28px;width:auto;" />`
    : abbr[0];

  const dateLabel = new Date(game.date + 'T12:00:00Z')
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const inn = game.innings || 9;
  const innLabel = inn <= 5 ? `${inn} innings (Mercy Rule)` : `${inn} innings`;

  // Build innings headers and cells
  const innHeaders = Array.from({ length: inn }, (_, i) => `<th>${i + 1}</th>`).join('');
  const bar3Inn = scrapedData?.innings?.[game.bar3Abbr] || {};
  const oppInn  = scrapedData?.innings?.[game.oppAbbr]  || {};
  const innCells = (obj) => Array.from({ length: inn }, (_, i) =>
    `<td>${obj.line?.[i + 1] ?? '—'}</td>`).join('');

  const html = `
  <!-- ============= ${dateLabel} vs ${game.oppName} ============= -->
  <article class="boxscore reveal" id="game-${game.id}">
    <div class="boxscore-main">
      <div class="boxscore-head">
        <div>
          <span class="tag">Game Recap · Gruppe A</span>
          <span class="stamp" style="margin-left:8px;">Final · ${innLabel}</span>
        </div>
        <span class="stamp">${dateLabel} · ${game.field || 'Heerenschürli'}</span>
      </div>
      <div>
        <div class="boxscore-result us ${game.won ? 'win' : 'loss'}">
          <div class="team"><div class="crest">${logo('BAR3')}</div>Barracudas 3</div>
          <div class="score">${game.bar3R}</div>
        </div>
        <div class="boxscore-result ${game.won ? 'loss' : 'win'}">
          <div class="team"><div class="crest">${logo(game.oppAbbr)}</div>${game.oppName}</div>
          <div class="score">${game.oppR}</div>
        </div>
      </div>
      <div class="boxscore-innings">
        <table>
          <thead><tr><th style="text-align:left;">Team</th>${innHeaders}<th>R</th><th>H</th><th>E</th></tr></thead>
          <tbody>
            <tr>
              <td class="team">${game.bar3Abbr}</td>${innCells(bar3Inn)}
              <td class="r">${bar3Inn.R ?? game.bar3R}</td><td class="h">${bar3Inn.H ?? '?'}</td><td class="e">${bar3Inn.E ?? '?'}</td>
            </tr>
            <tr>
              <td class="team">${game.oppAbbr}</td>${innCells(oppInn)}
              <td class="r">${oppInn.R ?? game.oppR}</td><td class="h">${oppInn.H ?? '?'}</td><td class="e">${oppInn.E ?? '?'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="boxscore-actions">
        <a href="article.html?id=game-${game.id}" class="btn btn-primary" data-i18n="btn_recap">Recap →</a>
        <a href="https://www.easyscore.com/boxscores/${game.id}" target="_blank" rel="noopener" class="btn btn-ghost" data-i18n="btn_full_boxscore">Full Boxscore ↗</a>
      </div>
    </div>
    <div class="boxscore-side">
      <div class="mvp">
        <div class="photo">⚾</div>
        <div class="info">
          <div class="label">Result</div>
          <div class="name">BAR3 ${game.bar3R} — ${game.oppR} ${game.oppAbbr}</div>
          <div class="stat">${game.won ? 'WIN ✓' : 'LOSS ✗'} · ${innLabel}</div>
        </div>
      </div>
      <div class="boxscore-stats">
        <div><div class="k">Runs</div><div class="v">${game.bar3R}</div></div>
        <div><div class="k">Hits</div><div class="v">${bar3Inn.H ?? '?'}</div></div>
        <div><div class="k">Innings</div><div class="v">${inn}</div></div>
        <div><div class="k">${game.won ? 'W' : 'L'}</div><div class="v">BAR3</div></div>
      </div>
    </div>
  </article>
`;

  src = src.replace(anchor, `${anchor}\n${html}`);
  if (!DRY_RUN) fs.writeFileSync(RESULTS_HTML, src);
  console.log(`  ✓ Boxscore added to results.html`);
}

// ── 8. Update standings BAR3 row ──────────────────────────────
function updateStandingsBar3Row(W, L) {
  const gp  = W + L;
  const pct = gp ? (W / gp).toFixed(3).replace(/^0/, '') : '.000';

  let src = fs.readFileSync(RESULTS_HTML, 'utf8');
  const pattern = /(<tr class="standings-us">[\s\S]*?<\/tr>)/;
  const match = pattern.exec(src);
  if (match) {
    let row = match[1];
    row = row
      .replace(/(<td>)\d+(<\/td><td class="standings-w">)/, `$1${gp}$2`)
      .replace(/(<td class="standings-w">)\d+/, `$1${W}`)
      .replace(/(<td class="standings-w">\d+<\/td><td>)\d+/, `$1${L}`)
      .replace(/(<td class="standings-pct">)[^<]+/, `$1${pct}`);
    src = src.replace(pattern, row);
    if (!DRY_RUN) fs.writeFileSync(RESULTS_HTML, src);
    console.log(`  ✓ Standings BAR3 row: G${gp} W${W} L${L} ${pct}`);
  }

  // Also update FALLBACK in app.js
  let app = fs.readFileSync(APP_JS, 'utf8');
  const fbPat = /(\{ rank:\d+, abbr:'BAR3'[^}]+w:)\d+(, l:)\d+(, pct:')[^']+(')/;
  if (fbPat.test(app)) {
    app = app.replace(fbPat, `$1${W}$2${L}$3${pct}$4`);
    if (!DRY_RUN) fs.writeFileSync(APP_JS, app);
    console.log(`  ✓ FALLBACK standings BAR3 updated`);
  }
}

// ── 9. FILE UPDATE: full standings from Swiss Baseball ────────
function updateStandingsFromSwiss(standings) {
  // Build a map abbr → row data
  const map = {};
  standings.forEach(s => { map[s.abbr] = s; });
  if (!Object.keys(map).length) return;

  // Update BAR3 row in FALLBACK (app.js)
  const bar3 = map['BAR3'];
  if (bar3) {
    let app = fs.readFileSync(APP_JS, 'utf8');
    const fbPat = /(\{ rank:\d+, abbr:'BAR3'[^}]+w:)\d+(, l:)\d+(, pct:')[^']+('[^}]+gb:')[^']+(')/;
    if (fbPat.test(app)) {
      app = app.replace(fbPat, `$1${bar3.w}$2${bar3.l}$3${bar3.pct}$4${bar3.gb}$5`);
      fs.writeFileSync(APP_JS, app);
      console.log(`  ✓ Swiss Baseball standings applied to FALLBACK`);
    }
  }

  // Update full standings table in results.html
  let src = fs.readFileSync(RESULTS_HTML, 'utf8');
  const LOGOS_MAP = {
    BAR: 'assets/teams/BARLOGO.png', EAG: 'assets/teams/eagles.png',
    BAR3: 'assets/logo.png', IND: 'assets/teams/indians.png',
    CHA2: 'assets/teams/challengers.png', FLY2: 'assets/teams/flyers.png',
    FRO: 'assets/teams/frogs.png',
  };
  const NAMES_MAP = {
    BAR: 'Zürich Barracudas', EAG: 'Luzern Eagles',
    BAR3: 'Zürich Barracudas 3', IND: 'Lausanne Indians',
    CHA2: 'Challengers 2', FLY2: 'Zürich Flyers 2', FRO: 'Sissach Frogs',
  };

  const newTbody = standings.map(s => {
    const logo = LOGOS_MAP[s.abbr] ? `<div class="sl-circle" style="background-image:url('${LOGOS_MAP[s.abbr]}')" title="${NAMES_MAP[s.abbr]||s.abbr}"></div>` : '';
    const name = NAMES_MAP[s.abbr] || s.abbr;
    const isUs = s.abbr === 'BAR3' ? ' class="standings-us"' : '';
    return `          <tr${isUs}>
            <td>${s.rank}</td>
            <td><div class="standings-team-cell">${logo}<div><div class="standings-team-name">${name}</div><div class="standings-abbr">${s.abbr}</div></div></div></td>
            <td>${s.g}</td><td class="standings-w">${s.w}</td><td>${s.l}</td><td class="standings-pct">${s.pct}</td><td class="standings-gb">${s.gb}</td>
          </tr>`;
  }).join('\n');

  const tbodyPat = /(<tbody>)([\s\S]*?)(<\/tbody>)/;
  if (tbodyPat.test(src)) {
    src = src.replace(tbodyPat, `$1\n${newTbody}\n        $3`);
    // Update meta date
    src = src.replace(
      /(standings-meta[^>]*>Updated:)[^<]+(<)/,
      `$1 ${new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}$2`
    );
    fs.writeFileSync(RESULTS_HTML, src);
    console.log(`  ✓ Full standings table updated from Swiss Baseball data`);
  }
}

// ── MAIN ───────────────────────────────────────────────────────
async function main() {
  console.log('━━ BAR3 Playwright Scraper ━━━━━━━━━━━━━━━━━━━━');
  if (DRY_RUN) console.log('⚡ DRY RUN — no file writes');

  if (!API_KEY) {
    console.error('✗ EASYSCORE_API_KEY not set');
    setOutput('updated', 'false');
    setOutput('summary', '❌ No API key');
    process.exit(1);
  }

  const state = loadState();
  console.log(`State: lastProbedId=${state.lastProbedId} | record=${state.record.W}-${state.record.L}`);

  // ── Step 1: Find new finished games (EasyScore API) ─────────
  const newGames = await findNewGames(state);
  console.log(`\nNew finished BAR3 games (EasyScore): ${newGames.length}`);

  // ── Step 2: Launch Playwright browser ───────────────────────
  console.log('\nLaunching Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'en-US',
  });
  const page = await context.newPage();

  // ── Step 2b: Swiss Baseball scrape — catches inter-club games ─
  // (NLA vs BAR3 and other games not in EasyScore Gruppe A API)
  let swissData = { games: [], standings: [] };
  try { swissData = await scrapeSwissBaseball(page); }
  catch(e) { console.log(`  ⚠ Swiss Baseball scrape failed: ${e.message}`); }

  // Filter Swiss Baseball games not yet in processedIds / GAMES[]
  const swissNewGames = swissData.games.filter(sg => {
    // Must have a result and not be already registered
    const alreadyInEasyscore = newGames.some(eg =>
      (eg.GameDate || '').startsWith(sg.date)
    );
    // Check if GAMES[] already has a result for this date (simple check)
    const src = fs.readFileSync(APP_JS, 'utf8');
    const hasResult = new RegExp(`date:\\s*'${sg.date}'[^}]*?result:\\s*'[WL]'`).test(src);
    return !alreadyInEasyscore && !hasResult;
  });
  console.log(`Swiss Baseball: ${swissData.games.length} BAR3 games found, ${swissNewGames.length} new unregistered`);

  // Update full standings from Swiss Baseball if available (more accurate than our FALLBACK)
  if (swissData.standings.length >= 6 && !DRY_RUN) {
    updateStandingsFromSwiss(swissData.standings);
  }

  if (newGames.length === 0 && swissNewGames.length === 0 && !FORCE_ID) {
    state.lastProbedId += PROBE_STEP;
    saveState(state);
    await browser.close();
    setOutput('updated', 'false');
    setOutput('summary', '✅ No new games today');
    return;
  }

  const commitParts = [];
  const summaryLines = [];

  for (const rawGame of newGames) {
    const isAway    = rawGame.AwayTeam === TEAM_ID;
    const bar3Side  = isAway ? 'away' : 'home';
    const oppSide   = isAway ? 'home' : 'away';
    const ls        = rawGame.LineScore?.[0] ?? null;
    const bar3R     = ls?.[bar3Side]?.totals?.R ?? (isAway ? rawGame.AwayRuns : rawGame.HomeRuns) ?? 0;
    const oppR      = ls?.[oppSide]?.totals?.R  ?? (isAway ? rawGame.HomeRuns : rawGame.AwayRuns) ?? 0;
    const bar3Abbr  = isAway ? rawGame.AwayTeamShort : rawGame.HomeTeamShort;
    const oppAbbr   = isAway ? rawGame.HomeTeamShort : rawGame.AwayTeamShort;
    const oppName   = isAway ? rawGame.HomeTeamName  : rawGame.AwayTeamName;
    const date      = (rawGame.GameDate || '').split('T')[0];
    const innings   = parseInt(ls?.innings ?? 9);
    const won       = bar3R > oppR;
    const field     = rawGame.Field || 'Heerenschürli, Zürich';
    const lineup    = (isAway ? rawGame.AwayTeamLineup : rawGame.HomeTeamLineup) || [];

    const game = { id: rawGame.ID, date, bar3Side, isAway, bar3R, oppR, bar3Abbr, oppAbbr, oppName, innings, won, field, lineup };

    console.log(`\n▶ Game ${rawGame.ID}: ${date} | BAR3 ${bar3R}–${oppR} ${oppAbbr} | ${won ? 'WIN' : 'LOSS'}`);

    // Scrape boxscore for full stats
    let boxData = {};
    try { boxData = await scrapeBoxscore(page, rawGame.ID); }
    catch(e) { console.log(`  ⚠ Boxscore scrape failed: ${e.message}`); }

    // ── Update source files ──────────────────────────────────
    updateGamesArray(game);
    const newW = state.record.W + (won ? 1 : 0);
    const newL = state.record.L + (won ? 0 : 1);
    updateRecord(newW, newL);
    addBoxscore(game, boxData);
    updateStandingsBar3Row(newW, newL);

    // ── Scrape player stats and update PLAYER_EXTENDED_DATA ──
    console.log('\n  Scraping player stats...');
    const bar3Team = isAway ? 'away' : 'home';
    const bar3BattingStats = boxData.batting?.[bar3Team] || [];

    for (const [playerIdStr, uniformNum] of Object.entries(PLAYER_MAP)) {
      const playerId = parseInt(playerIdStr);

      // Find this player's batting line from the boxscore scrape
      const playerLine = lineup.find(p => parseInt(p.PlayerID) === playerId);
      const boxscoreLine = bar3BattingStats.find(row => {
        const lastName = (playerLine?.Lastname || '').toLowerCase();
        return lastName && row.name.toLowerCase().includes(lastName);
      });

      try {
        const stats = await scrapePlayerStats(page, playerId);
        await page.waitForTimeout(800); // rate limiting

        if (!stats.season && !stats.pitching) {
          console.log(`    ⚠ No stats for player ${playerId} (#${uniformNum})`);
          continue;
        }

        // Build game log entry from boxscore line (if found)
        let newLogEntry = null;
        if (boxscoreLine && (boxscoreLine.AB > 0 || boxscoreLine.BB > 0)) {
          const mmdd = date.slice(5).replace('-', '/'); // MM/DD
          const oppShort = oppName.split(' ').pop();
          newLogEntry = {
            date: mmdd,
            opp:  `${oppShort} G?`,
            pos:  playerLine?.PosStr || '?',
            AB:   boxscoreLine.AB,
            R:    boxscoreLine.R,
            H:    boxscoreLine.H,
            '2B': boxscoreLine['2B'],
            HR:   boxscoreLine.HR,
            RBI:  boxscoreLine.RBI,
            BB:   boxscoreLine.BB,
            SO:   boxscoreLine.SO,
            SB:   boxscoreLine.SB || 0,
            AVG:  stats.season?.AVG || '.000',
          };
        }

        updatePlayerExtendedData(
          uniformNum,
          stats.season,
          stats.pitching,
          newLogEntry ? [newLogEntry] : null
        );
      } catch(e) {
        console.log(`    ⚠ Failed for player ${playerId}: ${e.message}`);
      }
    }

    state.record.W = newW;
    state.record.L = newL;
    state.processedIds.push(rawGame.ID);
    commitParts.push(`${date} ${won ? 'WIN' : 'LOSS'} ${bar3R}-${oppR} vs ${oppAbbr}`);
    summaryLines.push(`${won ? '🟢 WIN' : '🔴 LOSS'} ${bar3R}–${oppR} vs ${oppAbbr} (${date}) · Record now ${newW}-${newL}`);
  }

  // ── Process Swiss Baseball inter-club games (no EasyScore ID) ─
  for (const sg of swissNewGames) {
    console.log(`\n▶ [Swiss Baseball] ${sg.date} | BAR3 ${sg.bar3R}–${sg.oppR} ${sg.oppName} | ${sg.won ? 'WIN' : 'LOSS'} | ${sg.league}`);

    const oppWords = sg.oppName.split(' ');
    const oppAbbr  = oppWords.length >= 2 ? oppWords[oppWords.length - 1].toUpperCase().slice(0, 4) : 'OPP';
    const swissGame = {
      id: null, date: sg.date, bar3Side: 'home', isAway: false,
      bar3R: sg.bar3R, oppR: sg.oppR,
      bar3Abbr: 'BAR3', oppAbbr, oppName: sg.oppName,
      innings: 7, won: sg.won, field: 'Heerenschürli, Zürich', lineup: [],
    };

    const updated = updateGamesArray(swissGame);
    if (updated) {
      const newW = state.record.W + (sg.won ? 1 : 0);
      const newL = state.record.L + (sg.won ? 0 : 1);
      updateRecord(newW, newL);
      updateStandingsBar3Row(newW, newL);
      state.record.W = newW;
      state.record.L = newL;
      commitParts.push(`${sg.date} ${sg.won ? 'WIN' : 'LOSS'} ${sg.bar3R}-${sg.oppR} vs ${oppAbbr} [Swiss Baseball]`);
      summaryLines.push(`${sg.won ? '🟢' : '🔴'} ${sg.bar3R}–${sg.oppR} vs ${sg.oppName} (${sg.date}) · ${sg.league}`);
    }
  }

  await browser.close();

  state.lastProbedId += PROBE_STEP;
  saveState(state);

  setOutput('updated', 'true');
  setOutput('commit_msg', commitParts.join(', '));
  setOutput('summary', summaryLines.join('\n') || '✅ Done');

  console.log('\n━━ Complete ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  summaryLines.forEach(l => console.log(`  ${l}`));
}

main().catch(err => {
  console.error('Fatal:', err.message);
  setOutput('updated', 'false');
  setOutput('summary', `❌ ${err.message}`);
  process.exit(1);
});
