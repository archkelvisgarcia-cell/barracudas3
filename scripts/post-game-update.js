#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════
//  BAR3 Post-Game Auto-Update Script
//  Runs via GitHub Actions after each game day.
//
//  What it does:
//  1. Probes EasyScore for newly finished BAR3 games
//  2. Updates barracudas3/app.js  → GAMES[] results, standings FALLBACK, W-L record CSS
//  3. Updates barracudas3/index.html → W-L record strip
//  4. Updates barracudas3/results.html → new boxscore HTML + standings table
//  5. Creates a GitHub Issue with batting stats template (EasyScore doesn't provide them)
//  6. Updates scripts/game-state.json for next run
//
//  Env vars required (GitHub Secrets):
//    EASYSCORE_API_KEY   — EasyScore v2 API key
//    GITHUB_TOKEN        — auto-provided by GitHub Actions
//    GITHUB_REPOSITORY   — e.g. archkelvisgarcia-cell/barracudas3
//
//  Optional:
//    EASYSCORE_TEAM_ID   — defaults to 13054 (BAR3)
//    FORCE_FROM_ID       — override probe start ID
//    DRY_RUN             — 'true' to skip file writes
// ══════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');
const https = require('https');

const ROOT      = path.join(__dirname, '..');
const SITE      = path.join(ROOT, 'barracudas3');
const STATE_FILE= path.join(__dirname, 'game-state.json');
const APP_JS    = path.join(SITE, 'app.js');
const INDEX_HTML= path.join(SITE, 'index.html');
const RESULTS_HTML = path.join(SITE, 'results.html');

const API_KEY  = process.env.EASYSCORE_API_KEY;
const TEAM_ID  = parseInt(process.env.EASYSCORE_TEAM_ID  || '13054');
const BASE_URL = 'https://api.easyscore.com/v2';
const PROBE_STEP = 60;
const DRY_RUN  = process.env.DRY_RUN === 'true';

const TEAM_LOGOS = {
  BAR3: 'assets/logo.png',
  BAR:  'assets/teams/BARLOGO.png',
  EAG:  'assets/teams/eagles.png',
  IND:  'assets/teams/indians.png',
  CHA2: 'assets/teams/challengers.png',
  FLY2: 'assets/teams/flyers.png',
  FRO:  'assets/teams/frogs.png',
};

// ── Helpers ────────────────────────────────────────────────────
function setOutput(key, value) {
  const file = process.env.GITHUB_OUTPUT;
  if (file) fs.appendFileSync(file, `${key}=${value}\n`);
  else console.log(`OUTPUT ${key}=${value}`);
}

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch { return { lastProbedId: 19280, processedIds: [], record: { W: 5, L: 4 } }; }
}

function saveState(state) {
  if (DRY_RUN) return;
  state.updatedAt = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}

function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch(e) { reject(new Error(`JSON parse error: ${body.slice(0,200)}`)); }
      });
    }).on('error', reject);
  });
}

async function fetchGame(id) {
  try {
    const d = await fetchJson(`${BASE_URL}/games?id=${id}`, { 'x-api-key': API_KEY });
    return Array.isArray(d) ? d[0] ?? null : null;
  } catch { return null; }
}

function ipToFloat(ip) {
  const [w, t = '0'] = String(ip || '0').split('.');
  return parseInt(w) + parseInt(t) / 3;
}

// ── Game summary from EasyScore response ──────────────────────
function summarise(g) {
  const isAway   = g.AwayTeam === TEAM_ID;
  const bar3Side = isAway ? 'away' : 'home';
  const oppSide  = isAway ? 'home' : 'away';
  const ls       = g.LineScore?.[0] ?? null;

  const bar3R = ls?.[bar3Side]?.totals?.R ?? (isAway ? g.AwayRuns : g.HomeRuns) ?? 0;
  const oppR  = ls?.[oppSide]?.totals?.R  ?? (isAway ? g.HomeRuns : g.AwayRuns) ?? 0;
  const bar3H = ls?.[bar3Side]?.totals?.H ?? '?';
  const oppH  = ls?.[oppSide]?.totals?.H  ?? '?';
  const bar3E = ls?.[bar3Side]?.totals?.E ?? '?';
  const oppE  = ls?.[oppSide]?.totals?.E  ?? '?';

  const bar3Abbr = isAway ? g.AwayTeamShort : g.HomeTeamShort;
  const oppAbbr  = isAway ? g.HomeTeamShort : g.AwayTeamShort;
  const oppName  = isAway ? g.HomeTeamName  : g.AwayTeamName;

  const innings = parseInt(ls?.innings ?? g.Innings ?? 9);
  const won     = bar3R > oppR;
  const date    = (g.GameDate || '').split('T')[0]; // YYYY-MM-DD

  // Per-inning linescore
  const bar3Line = ls?.[bar3Side]?.line ?? {};
  const oppLine  = ls?.[oppSide]?.line  ?? {};

  // BAR3 lineup (for issue template)
  const lineup = (isAway ? g.AwayTeamLineup : g.HomeTeamLineup) || [];

  return {
    id: g.ID,
    gameNumber: g.GameNumber || '',
    date,
    bar3Side, isAway,
    bar3R, oppR, bar3H, oppH, bar3E, oppE,
    bar3Abbr, oppAbbr, oppName,
    innings, won,
    bar3Line, oppLine,
    lineup,
    field: g.Field || 'Heerenschürli, Zürich',
  };
}

// ── File update functions ──────────────────────────────────────

// 1. Update GAMES[] entry in app.js
function updateGamesArray(game) {
  let src = fs.readFileSync(APP_JS, 'utf8');

  // Match entry by date (YYYY-MM-DD) — find the first null-result entry for this date
  const dateStr = game.date; // e.g. '2026-06-07'
  const result  = game.won ? 'W' : 'L';
  const notes   = game.won
    ? (game.innings <= 4 ? 'Mercy Rule' : '')
    : '';
  const pitcher = (game.lineup.find(p => p.PosStr === 'P' || p.PosStr?.startsWith('P')) || {}).Player || '';
  const pitcherNote = pitcher ? pitcher.split(' ').slice(-1)[0] + ' P' : '';
  const fullNotes = [notes, pitcherNote].filter(Boolean).join(' · ');

  // Pattern: match the entry for this date that still has result: null
  const pattern = new RegExp(
    `(date: '${dateStr}'[^}]*?result: )null(, score: )null(, innings: )null`,
    's'
  );

  if (!pattern.test(src)) {
    console.log(`  ⚠ No null entry found in GAMES[] for date ${dateStr} — may already be updated`);
    return false;
  }

  const replacement = `$1'${result}'$2{ us: ${game.bar3R}, them: ${game.oppR} }$3${game.innings}` +
    (fullNotes ? `,\n    notes: '${fullNotes}'` : '');

  // Only replace first match (first game of the day)
  src = src.replace(pattern, replacement);
  if (!DRY_RUN) fs.writeFileSync(APP_JS, src);
  console.log(`  ✓ GAMES[] updated: ${dateStr} → ${result} ${game.bar3R}-${game.oppR}`);
  return true;
}

// 2. Update W-L record in index.html
function updateRecord(W, L) {
  let src = fs.readFileSync(INDEX_HTML, 'utf8');
  const pattern = /(data-i18n="strip_record">Record 2026<\/span><span class="v">)[0-9]+-[0-9]+(<\/span>)/;
  if (!pattern.test(src)) {
    console.log(`  ⚠ W-L record pattern not found in index.html`);
    return;
  }
  src = src.replace(pattern, `$1${W}-${L}$2`);
  if (!DRY_RUN) fs.writeFileSync(INDEX_HTML, src);
  console.log(`  ✓ W-L record updated: ${W}-${L}`);
}

// 3. Add boxscore HTML to results.html (prepend before first boxscore)
function addBoxscore(game) {
  let src = fs.readFileSync(RESULTS_HTML, 'utf8');
  const anchor = '<!-- BOXSCORES LIST -->\n<div class="res-list">';
  if (!src.includes(anchor)) {
    console.log(`  ⚠ Could not find boxscore anchor in results.html`);
    return;
  }

  const logo  = (abbr) => TEAM_LOGOS[abbr] ? `<img src="${TEAM_LOGOS[abbr]}" alt="" style="height:28px;width:auto;" />` : abbr[0];
  const oppLogoTag  = logo(game.oppAbbr);
  const bar3LogoTag = logo('BAR3');
  const winClass    = game.won ? 'win' : 'loss';
  const dateLabel   = new Date(game.date + 'T12:00:00Z')
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const inningsLabel = game.innings <= 5 ? `${game.innings} innings (Mercy Rule)` : `${game.innings} innings`;

  // Build per-inning cells
  function inningCells(lineObj, numInnings) {
    const cells = [];
    for (let i = 1; i <= numInnings; i++) {
      const v = lineObj[i];
      cells.push(`<td>${v !== undefined ? v : '—'}</td>`);
    }
    return cells.join('');
  }

  const innings = game.innings || 9;
  const inningHeaders = Array.from({ length: innings }, (_, i) => `<th>${i + 1}</th>`).join('');

  const boxscoreId = `game-${game.id}`;
  const gameNumLabel = game.gameNumber ? ` · G${game.gameNumber.split('-')[1] || ''}` : '';

  const html = `
  <!-- ============= ${dateLabel}${gameNumLabel} vs ${game.oppName} ============= -->
  <article class="boxscore reveal" id="${boxscoreId}">
    <div class="boxscore-main">
      <div class="boxscore-head">
        <div>
          <span class="tag">Game Recap · Gruppe A</span>
          <span class="stamp" style="margin-left:8px;">Final · ${inningsLabel}</span>
        </div>
        <span class="stamp">${dateLabel}${gameNumLabel} · ${game.field}</span>
      </div>

      <div>
        <div class="boxscore-result us ${winClass}">
          <div class="team"><div class="crest">${bar3LogoTag}</div>Barracudas 3</div>
          <div class="score">${game.bar3R}</div>
        </div>
        <div class="boxscore-result ${game.won ? 'loss' : 'win'}">
          <div class="team"><div class="crest">${oppLogoTag}</div>${game.oppName}</div>
          <div class="score">${game.oppR}</div>
        </div>
      </div>

      <div class="boxscore-innings">
        <table>
          <thead>
            <tr>
              <th style="text-align:left;">Team</th>
              ${inningHeaders}
              <th>R</th><th>H</th><th>E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="team">${game.bar3Abbr}</td>
              ${inningCells(game.bar3Line, innings)}
              <td class="r">${game.bar3R}</td><td class="h">${game.bar3H}</td><td class="e">${game.bar3E}</td>
            </tr>
            <tr>
              <td class="team">${game.oppAbbr}</td>
              ${inningCells(game.oppLine, innings)}
              <td class="r">${game.oppR}</td><td class="h">${game.oppH}</td><td class="e">${game.oppE}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="boxscore-actions">
        <a href="article.html?id=${boxscoreId}" class="btn btn-primary" data-i18n="btn_recap">Recap →</a>
        <a href="https://www.easyscore.com/boxscores/${game.id}" target="_blank" rel="noopener" class="btn btn-ghost" data-i18n="btn_full_boxscore">Full Boxscore ↗</a>
      </div>
    </div>

    <div class="boxscore-side">
      <div class="mvp">
        <div class="photo">⚾</div>
        <div class="info">
          <div class="label">Result</div>
          <div class="name">BAR3 ${game.bar3R} — ${game.oppR} ${game.oppAbbr}</div>
          <div class="stat">${game.won ? 'WIN' : 'LOSS'} · ${inningsLabel}</div>
        </div>
      </div>
      <div class="boxscore-stats">
        <div><div class="k">BAR3 Hits</div><div class="v">${game.bar3H}</div></div>
        <div><div class="k">OPP Errors</div><div class="v">${game.oppE}</div></div>
        <div><div class="k">Innings</div><div class="v">${innings}</div></div>
        <div><div class="k">${game.won ? 'W' : 'L'}</div><div class="v">BAR3</div></div>
      </div>
    </div>
  </article>
`;

  src = src.replace(anchor, `${anchor}\n${html}`);
  if (!DRY_RUN) fs.writeFileSync(RESULTS_HTML, src);
  console.log(`  ✓ Boxscore added to results.html (ID: ${boxscoreId})`);
}

// 4. Update BAR3 row in standings (results.html + app.js FALLBACK)
function updateStandingsBar3Row(W, L) {
  const gp  = W + L;
  const pct = gp ? (W / gp).toFixed(3).replace(/^0/, '') : '.000';

  // results.html: update the BAR3 <tr class="standings-us"> row
  let src = fs.readFileSync(RESULTS_HTML, 'utf8');
  const tbodyPattern = /(<tr class="standings-us">[\s\S]*?<\/tr>)/;
  const match = tbodyPattern.exec(src);
  if (match) {
    // Update GP, W, L, PCT in the BAR3 row (keep logo/name HTML intact)
    let row = match[1];
    row = row
      .replace(/(<td>)\d+(<\/td><td class="standings-w">)/, `$1${gp}$2`)
      .replace(/(<td class="standings-w">)\d+/, `$1${W}`)
      .replace(/(<td class="standings-w">\d+<\/td><td>)\d+/, `$1${L}`)
      .replace(/(<td class="standings-pct">)[^<]+/, `$1${pct}`);
    src = src.replace(tbodyPattern, row);
    if (!DRY_RUN) fs.writeFileSync(RESULTS_HTML, src);
    console.log(`  ✓ BAR3 standings row updated: G${gp} W${W} L${L} ${pct}`);
  } else {
    console.log(`  ⚠ BAR3 standings row not found in results.html`);
  }

  // app.js: update BAR3 entry in initHeroStandings FALLBACK
  let app = fs.readFileSync(APP_JS, 'utf8');
  const fbPattern = /(\{ rank:\d+, abbr:'BAR3'[^}]+w:)\d+(, l:)\d+(, pct:')[^']+(')/;
  if (fbPattern.test(app)) {
    app = app.replace(fbPattern, `$1${W}$2${L}$3${pct}$4`);
    if (!DRY_RUN) fs.writeFileSync(APP_JS, app);
    console.log(`  ✓ FALLBACK standings BAR3 updated in app.js`);
  }
}

// ── GitHub Issue: batting stats template ─────────────────────
async function createBattingStatsIssue(game) {
  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPOSITORY; // e.g. archkelvisgarcia-cell/barracudas3
  if (!token || !repo) {
    console.log('  ⚠ GITHUB_TOKEN or GITHUB_REPOSITORY not set — skipping issue creation');
    return;
  }

  const dateLabel = new Date(game.date + 'T12:00:00Z')
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const lineupRows = game.lineup
    .filter((p, i, arr) => arr.findIndex(x => x.PlayerID === p.PlayerID) === i) // unique
    .map(p => {
      const name = p.Player || p.Playername || '?';
      const num  = p.UniformNr || '?';
      const pos  = p.PosStr || '?';
      const isPitcher = pos.startsWith('P') || p.PitcherNr === 1;
      if (isPitcher) {
        return `| #${num} | ${name} | P | | | | | | | | | ← IP, H, R, ER, BB, SO |`;
      }
      return `| #${num} | ${name} | ${pos} | | | | | | | | | |`;
    }).join('\n');

  const body = `## ⚾ Batting Stats Update Required

**Game:** BAR3 ${game.won ? '🟢' : '🔴'} ${game.bar3R}–${game.oppR} ${game.oppName}
**Date:** ${dateLabel} (EasyScore ID: ${game.id})
**Result:** ${game.won ? 'WIN ✓' : 'LOSS ✗'}

---

### ⚠️ Action Required

EasyScore does not provide individual batting stats via the API.
Please fill in the stats below and paste them into \`barracudas3/app.js\` → \`PLAYER_EXTENDED_DATA\`.

---

### Batting & Pitching Log — ${dateLabel}

Update each player's \`batting.log\` (or \`pitching.log\`) in \`PLAYER_EXTENDED_DATA\`:

\`\`\`
// Format for batting.log entries:
{ date:'${game.date.replace(/^\d{4}-/, '').replace('-', '/')}', opp:'${game.oppName.split(' ').pop()} G?', spot:?, pos:'?', AB:?, R:?, H:?, '2B':?, HR:?, RBI:?, BB:?, SO:?, SB:0, AVG:'??' }
\`\`\`

| # | Player | Pos | AB | R | H | 2B | HR | RBI | BB | SO | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
${lineupRows}

---

### Season Totals to Recalculate

After adding the log entries, recalculate these fields in \`batting.season\` or \`pitching.season\`:
- \`G\`, \`PA\`, \`AB\`, \`H\`, \`R\`, \`RBI\`, \`HR\`, \`BB\`, \`SO\`
- \`AVG\` = H/AB · \`OBP\` = (H+BB)/(AB+BB) · \`SLG\` = TB/AB · \`OPS\` = OBP+SLG

---

### Files to update

- [ ] \`barracudas3/app.js\` → \`PLAYER_EXTENDED_DATA\` batting logs
- [ ] \`barracudas3/app.js\` → \`roster-data\` JSON stats (card backs)
- [ ] Close this issue after committing

> _This issue was auto-generated by [post-game-update.yml](.github/workflows/post-game-update.yml)_
`;

  const payload = JSON.stringify({
    title: `[Stats] ${game.won ? 'WIN' : 'LOSS'} ${game.bar3R}–${game.oppR} vs ${game.oppName} · ${dateLabel}`,
    body,
    labels: ['stats-update', 'auto-generated'],
  });

  await new Promise((resolve, reject) => {
    const [owner, repoName] = repo.split('/');
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repoName}/issues`,
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'BAR3-AutoUpdate/1.0',
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };
    const req = https.request(options, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        const result = JSON.parse(body);
        if (res.statusCode === 201) {
          console.log(`  ✓ GitHub issue created: #${result.number} — ${result.html_url}`);
          resolve(result);
        } else {
          console.log(`  ⚠ Issue creation failed (${res.statusCode}): ${body.slice(0, 200)}`);
          resolve(null);
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  console.log('━━ BAR3 Post-Game Update ━━━━━━━━━━━━━━━━━━━━━━');
  if (DRY_RUN) console.log('⚡ DRY RUN — no files will be written');

  if (!API_KEY) {
    console.error('✗ EASYSCORE_API_KEY not set');
    setOutput('games_updated', 'false');
    setOutput('summary', '❌ No API key');
    process.exit(1);
  }

  const state = loadState();
  const startId = parseInt(process.env.FORCE_FROM_ID || '') || state.lastProbedId;
  const endId   = startId + PROBE_STEP;

  console.log(`Probing EasyScore IDs ${startId + 1}–${endId}...`);
  const probeIds = Array.from({ length: PROBE_STEP }, (_, i) => startId + i + 1);
  const raw = await Promise.all(probeIds.map(fetchGame));

  const newFinished = raw.filter(g => {
    if (!g) return false;
    if (!g.GameEnded) return false;
    if (g.AwayTeam !== TEAM_ID && g.HomeTeam !== TEAM_ID) return false;
    if (state.processedIds.includes(g.ID)) return false;
    return true;
  });

  console.log(`Found ${newFinished.length} new finished BAR3 game(s)`);

  if (newFinished.length === 0) {
    setOutput('games_updated', 'false');
    setOutput('summary', `✅ No new games found (probed IDs ${startId + 1}–${endId})`);
    state.lastProbedId = endId;
    saveState(state);
    return;
  }

  const summaryLines = [];
  let gamesUpdated = false;

  for (const rawGame of newFinished) {
    const game = summarise(rawGame);
    console.log(`\n▶ Processing: ID ${game.id} | ${game.date} | BAR3 ${game.bar3R}–${game.oppR} ${game.oppAbbr} | ${game.won ? 'WIN' : 'LOSS'}`);

    // 1. Update GAMES[] entry
    const gamesUpdatedOk = updateGamesArray(game);

    // 2. Update W-L record
    const newW = state.record.W + (game.won ? 1 : 0);
    const newL = state.record.L + (game.won ? 0 : 1);
    updateRecord(newW, newL);

    // 3. Add boxscore
    addBoxscore(game);

    // 4. Update standings row
    updateStandingsBar3Row(newW, newL);

    // 5. Create GitHub issue for batting stats
    if (!DRY_RUN) {
      await createBattingStatsIssue(game);
    }

    // Update state
    state.record.W = newW;
    state.record.L = newL;
    state.processedIds.push(game.id);

    summaryLines.push(`${game.won ? '🟢 WIN' : '🔴 LOSS'} ${game.bar3R}–${game.oppR} vs ${game.oppAbbr} (${game.date}) · Record ${newW}-${newL}`);
    gamesUpdated = true;
  }

  state.lastProbedId = endId;
  saveState(state);

  const commitMsg = newFinished.map(g => {
    const s = summarise(g);
    return `${s.date} ${s.won?'WIN':'LOSS'} ${s.bar3R}-${s.oppR} vs ${s.oppAbbr}`;
  }).join(', ');

  setOutput('games_updated', gamesUpdated ? 'true' : 'false');
  setOutput('commit_message', commitMsg);
  setOutput('summary', summaryLines.join('\n'));

  console.log('\n━━ Done ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  summaryLines.forEach(l => console.log(`  ${l}`));
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  setOutput('games_updated', 'false');
  setOutput('summary', `❌ Error: ${err.message}`);
  process.exit(1);
});
