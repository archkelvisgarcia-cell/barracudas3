#!/usr/bin/env node
/**
 * sync-player-stats.js — Sync player stats from EasyScore
 *
 * Usage:
 *   node scripts/sync-player-stats.js --player=30            ← live update
 *   node scripts/sync-player-stats.js --player=30 --dry-run  ← preview only
 *   node scripts/sync-player-stats.js --player=all           ← all players
 */

const { chromium } = require('@playwright/test');
const fs   = require('fs');
const path = require('path');

// ── Paths ──────────────────────────────────────────────────────────
const ROOT             = path.join(__dirname, '..');
const DATA_PLAYERS_JS  = path.join(ROOT, 'barracudas3', 'data-players.js');
const INDEX_HTML       = path.join(ROOT, 'barracudas3', 'index.html');
const ROSTER_HTML      = path.join(ROOT, 'barracudas3', 'roster.html');

// ── CLI args ───────────────────────────────────────────────────────
const args = {};
for (const arg of process.argv.slice(2)) {
  const [k, v] = arg.replace(/^--/, '').split('=');
  args[k] = v !== undefined ? v : true;
}
const TARGET_PLAYER = args.player || '30';
const DRY_RUN       = !!args['dry-run'];

// ── Player registry ────────────────────────────────────────────────
const PLAYERS = {
  '1':  { easyscoreId: 42266, name: 'Malchans Juan',          type: 'batter'  },
  '27': { easyscoreId: 26400, name: 'Del Valle Elvis',         type: 'batter'  },
  '15': { easyscoreId: 37907, name: 'Medina Jose',            type: 'batter'  },
  '34': { easyscoreId: 34551, name: 'Rosa Lima Jhomar',       type: 'batter'  },
  '20': { easyscoreId: 19648, name: 'Garcia Kelvis',          type: 'both'    },
  '77': { easyscoreId: 34542, name: 'Arregoitia Jhon',        type: 'batter'  },
  '23': { easyscoreId: 3825,  name: 'Litscher Sascha',        type: 'batter'  },
  '30': { easyscoreId: 35528, name: 'Moreno Carlos',          type: 'batter'  },
  '36': { easyscoreId: 38086, name: 'Peguero Wilkin',         type: 'pitcher' },
  '28': { easyscoreId: 9083,  name: 'Noa Francisco',          type: 'batter'  },
  '11': { easyscoreId: 3831,  name: 'Lombriser Clemens',      type: 'batter'  },
  '22': { easyscoreId: 37221, name: 'Vasquez Michael',        type: 'pitcher' },
  '13': { easyscoreId: 47363, name: 'Elias Angel',            type: 'pitcher' },
  '8':  { easyscoreId: 45832, name: 'Rodriguez Martin Hansel',type: 'both'    },
  '16': { easyscoreId: 24327, name: 'Pedroso Yohandris',      type: 'batter'  },
};

const LEAGUE_ID = 10144;
const YEAR      = 2026;

// ── Helpers ────────────────────────────────────────────────────────
function fmtAvg(n) {
  const num = parseFloat(n);
  if (isNaN(num) || num === 0) return '.000';
  return num.toFixed(3).replace(/^0/, '');
}

// ── Core: scrape one player ────────────────────────────────────────
async function scrapePlayer(browser, uniformNum) {
  const player = PLAYERS[uniformNum];
  if (!player) throw new Error(`Unknown player #${uniformNum}`);

  const url = `https://www.easyscore.com/playerstats/${player.easyscoreId}?yr=${YEAR}&lg=${LEAGUE_ID}&rd=0`;
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`👤 #${uniformNum} — ${player.name}`);
  console.log(`   ${url}\n`);

  const page = await browser.newPage();

  // ── 1. Intercept network responses ──────────────────────────────
  const captured = [];
  page.on('response', async response => {
    const respUrl = response.url();
    const ct      = response.headers()['content-type'] || '';
    if (!ct.includes('application/json')) return;
    if (respUrl.includes('_next') || respUrl.includes('fonts') || respUrl.includes('analytics')) return;
    try {
      const json = await response.json();
      const text = JSON.stringify(json);
      if (
        text.includes('AVG') || text.includes('BattingStat') ||
        text.includes('batting') || text.includes('gamelog') ||
        text.includes('season') || text.includes('ERA')
      ) {
        console.log(`  📡 Network hit: ${respUrl.split('?')[0]}`);
        captured.push({ url: respUrl, data: json });
      }
    } catch { /* skip */ }
  });

  // ── 2. Navigate ─────────────────────────────────────────────────
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log(`  ⚠ Nav warning: ${e.message.slice(0, 80)}`);
  }
  await page.waitForTimeout(3000); // extra render time

  // ── 3. DOM scraping ─────────────────────────────────────────────
  const dom = await page.evaluate(() => {
    const tables = Array.from(document.querySelectorAll('table'));
    return {
      tableCount: tables.length,
      tables: tables.map(t => ({
        headers: Array.from(t.querySelectorAll('th')).map(th => th.textContent.trim()),
        rows: Array.from(t.querySelectorAll('tbody tr')).map(tr =>
          Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim())
        ),
      })),
    };
  });

  console.log(`  🗂  DOM tables found: ${dom.tableCount}`);
  for (const t of dom.tables) {
    console.log(`     Headers: [${t.headers.slice(0, 10).join(' | ')}] — ${t.rows.length} rows`);
  }

  await page.close();

  // ── 4. Extract stats ─────────────────────────────────────────────
  let season = null, log = [], pitchingSeason = null, pitchingLog = [];

  // Try network captured data first
  for (const { data } of captured) {
    const extracted = tryExtractFromJson(data);
    if (extracted.season) { season = extracted.season; log = extracted.log; break; }
  }

  // Fallback: DOM tables
  if (!season && dom.tableCount > 0) {
    const extracted = tryExtractFromDom(dom.tables);
    season       = extracted.season;
    log          = extracted.log;
    pitchingSeason = extracted.pitchingSeason;
    pitchingLog  = extracted.pitchingLog;
  }

  return { uniformNum, player, season, log, pitchingSeason, pitchingLog, captured, dom };
}

// ── Extract from intercepted JSON ─────────────────────────────────
function tryExtractFromJson(data) {
  const result = { season: null, log: [] };

  // If root is array of game objects
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item.AVG !== undefined || item.BattingStat !== undefined) {
        console.log('  ✅ Found stats array in network response');
        // Map fields
        result.season = mapApiSeason(item);
        break;
      }
    }
  }

  // If root has a stats/batting key
  for (const key of ['batting', 'stats', 'season', 'BattingStat', 'data']) {
    if (data[key] && typeof data[key] === 'object') {
      const s = mapApiSeason(data[key]);
      if (s && s.AVG) { result.season = s; break; }
    }
  }

  return result;
}

function mapApiSeason(obj) {
  if (!obj || typeof obj !== 'object') return null;
  const has = k => obj[k] !== undefined && obj[k] !== null && obj[k] !== '';
  if (!has('AVG') && !has('G') && !has('AB')) return null;
  return {
    G:    parseInt(obj.G   || obj.Games || 0),
    PA:   parseInt(obj.PA  || 0),
    AB:   parseInt(obj.AB  || obj.AtBat || 0),
    R:    parseInt(obj.R   || obj.Runs  || 0),
    H:    parseInt(obj.H   || obj.Hits  || 0),
    '2B': parseInt(obj['2B'] || obj.Doubles || 0),
    '3B': parseInt(obj['3B'] || obj.Triples || 0),
    HR:   parseInt(obj.HR  || obj.HomeRun || 0),
    RBI:  parseInt(obj.RBI || 0),
    BB:   parseInt(obj.BB  || obj.Walks || 0),
    SO:   parseInt(obj.SO  || obj.StrikeOut || 0),
    SB:   parseInt(obj.SB  || obj.StolenBases || 0),
    CS:   parseInt(obj.CS  || 0),
    HBP:  parseInt(obj.HBP || obj.HitByPitch || 0),
    SF:   parseInt(obj.SF  || 0),
    AVG:  fmtAvg(obj.AVG || obj.BattingAverage || 0),
    OBP:  fmtAvg(obj.OBP || obj.OnBasePercentage || 0),
    SLG:  fmtAvg(obj.SLG || obj.SluggingPercentage || 0),
    OPS:  fmtAvg(obj.OPS || 0),
  };
}

// ── Extract from DOM tables ────────────────────────────────────────
function tryExtractFromDom(tables) {
  const result = { season: null, log: [], pitchingSeason: null, pitchingLog: [] };

  for (const table of tables) {
    const headers = table.headers;

    // Batting season totals
    if (headers.includes('AVG') && headers.includes('AB') && headers.includes('OPS') && !result.season) {
      const gruppeRow = table.rows.find(r => r.join(' ').includes('Gruppe A')) || table.rows.at(-1);
      if (gruppeRow) {
        const g = h => {
          const i = headers.indexOf(h);
          return i > 0 ? (gruppeRow[i - 1] || '0') : '0';
        };
        result.season = {
          G:    parseInt(g('G'))   || 0,
          PA:   parseInt(g('PA'))  || 0,
          AB:   parseInt(g('AB'))  || 0,
          R:    parseInt(g('R'))   || 0,
          H:    parseInt(g('H'))   || 0,
          '2B': parseInt(g('2B')) || 0,
          '3B': parseInt(g('3B')) || 0,
          HR:   parseInt(g('HR'))  || 0,
          RBI:  parseInt(g('RBI')) || 0,
          BB:   parseInt(g('BB'))  || 0,
          SO:   parseInt(g('SO'))  || 0,
          SB:   parseInt(g('SB'))  || 0,
          CS:   parseInt(g('CS'))  || 0,
          HBP:  parseInt(g('HBP')) || 0,
          SF:   parseInt(g('SF'))  || 0,
          AVG:  g('AVG')  || '.000',
          OBP:  g('OBP')  || '.000',
          SLG:  g('SLG')  || '.000',
          OPS:  g('OPS')  || '.000',
        };
        console.log(`  ✅ DOM batting season extracted: AVG ${result.season.AVG}, G ${result.season.G}`);
      }
    }

    // Game log (has date column) — header[0] is table title, so cells offset by -1
    if ((headers.includes('Date') || headers.includes('DATE')) &&
        headers.includes('AB') && headers.includes('AVG') && table.rows.length > 0) {
      for (const row of table.rows) {
        if (row.length < 4) continue;
        // header[i] matches cell[i-1] because header[0] is the table title with no <td>
        const g = h => {
          const i = headers.indexOf(h);
          return i > 0 ? (row[i - 1] || '0') : '0';
        };
        const dateRaw = g('Date') || g('DATE') || row[0];
        if (!dateRaw || dateRaw === '0') continue;
        result.log.push({
          date: dateRaw,
          opp:  g('Opponent') || g('OPPONENT') || row[2] || '?',
          pos:  g('Pos') || g('POS') || '?',
          AB:   parseInt(g('AB'))   || 0,
          R:    parseInt(g('R'))    || 0,
          H:    parseInt(g('H'))    || 0,
          '2B': parseInt(g('2B'))  || 0,
          '3B': parseInt(g('3B'))  || 0,
          HR:   parseInt(g('HR'))   || 0,
          RBI:  parseInt(g('RBI'))  || 0,
          BB:   parseInt(g('BB'))   || 0,
          SO:   parseInt(g('SO'))   || 0,
          SB:   parseInt(g('SB'))   || 0,
          HBP:  parseInt(g('HBP'))  || 0,
          AVG:  g('AVG') || '.000',
        });
      }
      if (result.log.length > 0) {
        console.log(`  ✅ DOM batting log: ${result.log.length} entries found`);
      }
    }

    // Pitching season — same header[0] offset
    if (headers.includes('ERA') && headers.includes('IP') && !result.pitchingSeason) {
      const gruppeRow = table.rows.find(r => r.join(' ').includes('Gruppe A')) || table.rows.at(-1);
      if (gruppeRow) {
        const g = h => { const i = headers.indexOf(h); return i > 0 ? (gruppeRow[i - 1] || '0') : '0'; };
        result.pitchingSeason = {
          G:    parseInt(g('G'))   || 0,
          GS:   parseInt(g('GS')) || 0,
          IP:   g('IP')  || '0.0',
          H:    parseInt(g('H'))   || 0,
          R:    parseInt(g('R'))   || 0,
          ER:   parseInt(g('ER')) || 0,
          BB:   parseInt(g('BB')) || 0,
          SO:   parseInt(g('SO')) || 0,
          HR:   parseInt(g('HR')) || 0,
          WL:   g('W-L') || '0-0',
          ERA:  g('ERA') || '0.00',
          WHIP: g('WHIP')|| '0.00',
        };
        console.log(`  ✅ DOM pitching season extracted: ERA ${result.pitchingSeason.ERA}, IP ${result.pitchingSeason.IP}`);
      }
    }

    // Pitching game log
    if ((headers.includes('Date') || headers.includes('DATE')) &&
        headers.includes('IP') && headers.includes('ERA') && table.rows.length > 0) {
      for (const row of table.rows) {
        if (row.length < 4) continue;
        const g = h => { const i = headers.indexOf(h); return i > 0 ? (row[i - 1] || '0') : '0'; };
        const dateRaw = g('Date') || g('DATE') || row[0];
        if (!dateRaw || dateRaw === '0') continue;
        result.pitchingLog.push({
          date: dateRaw,
          opp:  g('Opponent') || g('OPPONENT') || row[2] || '?',
          IP:   g('IP')  || '0.0',
          H:    parseInt(g('H'))   || 0,
          R:    parseInt(g('R'))   || 0,
          ER:   parseInt(g('ER')) || 0,
          BB:   parseInt(g('BB')) || 0,
          SO:   parseInt(g('SO')) || 0,
          ERA:  g('ERA') || '0.00',
        });
      }
      if (result.pitchingLog.length > 0) {
        console.log(`  ✅ DOM pitching log: ${result.pitchingLog.length} entries found`);
      }
    }
  }

  return result;
}

// ── Update data-players.js ─────────────────────────────────────────
function updateDataPlayersJs(uniformNum, season, _log, pitchingSeason) {
  let src = fs.readFileSync(DATA_PLAYERS_JS, 'utf8');

  // Update batting season
  if (season) {
    const s = season;
    const newSeason = `season: { G:${s.G}, PA:${s.PA}, AB:${s.AB}, R:${s.R}, H:${s.H}, '2B':${s['2B']}, '3B':${s['3B']}, HR:${s.HR}, RBI:${s.RBI}, BB:${s.BB}, SO:${s.SO}, SB:${s.SB}, CS:${s.CS}, HBP:${s.HBP}, SF:${s.SF}, AVG:'${s.AVG}', OBP:'${s.OBP}', SLG:'${s.SLG}', OPS:'${s.OPS}' }`;
    const pat = new RegExp(`('${uniformNum}'\\s*:[\\s\\S]{0,300}?batting:\\s*\\{[\\s\\S]{0,100}?)(season:\\s*\\{[^}]+\\})`, 'm');
    if (pat.test(src)) {
      src = src.replace(pat, `$1${newSeason}`);
      console.log(`  ✏️  Updated batting.season for #${uniformNum}`);
    } else {
      console.log(`  ⚠  Could not find batting.season pattern for #${uniformNum}`);
    }
  }

  // Update pitching season — only if we actually got real data (G > 0 or IP has innings)
  const pitchingHasData = pitchingSeason && (
    pitchingSeason.G > 0 ||
    (pitchingSeason.IP && pitchingSeason.IP !== '0' && pitchingSeason.IP !== '0.0')
  );
  if (pitchingHasData) {
    const p = pitchingSeason;
    const newPitch = `season: { G:${p.G}, GS:${p.GS}, IP:'${p.IP}', H:${p.H}, R:${p.R}, ER:${p.ER}, BB:${p.BB}, SO:${p.SO}, HR:${p.HR}, HBP:0, WP:0, BF:0, WL:'${p.WL}', SV:0, OppAVG:'.000', WHIP:'${p.WHIP}', ERA:'${p.ERA}' }`;
    const pat = new RegExp(`('${uniformNum}'[\\s\\S]{0,2000}?pitching:[\\s\\S]{0,200}?)(season:\\s*\\{[^}]+\\})`, 'm');
    if (pat.test(src)) {
      src = src.replace(pat, `$1${newPitch}`);
      console.log(`  ✏️  Updated pitching.season for #${uniformNum}`);
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(DATA_PLAYERS_JS, src);
    console.log(`  💾 Saved data-players.js`);
  }
}

// ── Update flip cards in index.html + roster.html ─────────────────
function updateFlipCard(uniformNum, season) {
  if (!season) return;
  const s = season;
  const newStats = `{"k":"AVG","v":"${s.AVG}"},{"k":"RBI","v":"${s.RBI}"},{"k":"OBP","v":"${s.OBP}"},{"k":"OPS","v":"${s.OPS}"}`;
  const pat = new RegExp(`("num":"${uniformNum}"[^\\]]*?"stats":\\[)[^\\]]*?(\\])`, 's');

  for (const [label, file] of [['index.html', INDEX_HTML], ['roster.html', ROSTER_HTML]]) {
    if (!fs.existsSync(file)) continue;
    let src = fs.readFileSync(file, 'utf8');
    if (pat.test(src)) {
      src = src.replace(pat, `$1${newStats}$2`);
      if (!DRY_RUN) fs.writeFileSync(file, src);
      console.log(`  ✏️  Updated flip card in ${label}${DRY_RUN ? ' (dry-run)' : ''}`);
    }
  }
}

// ── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log('\n══════════════════════════════════════════════');
  console.log('  BAR3 EasyScore Sync');
  console.log(`  Mode: ${DRY_RUN ? '🔍 DRY RUN — no files will be written' : '✏️  LIVE — files will be updated'}`);
  console.log('══════════════════════════════════════════════');

  const targets = TARGET_PLAYER === 'all' ? Object.keys(PLAYERS) : [TARGET_PLAYER];

  // Validate players exist
  for (const num of targets) {
    if (!PLAYERS[num]) {
      console.error(`\n❌ Unknown player #${num}`);
      console.error(`   Available numbers: ${Object.keys(PLAYERS).join(', ')}`);
      process.exit(1);
    }
  }

  const browser = await chromium.launch({
    headless: false, // visible so you can see what's happening
    args: ['--no-sandbox'],
  });

  const results = [];

  for (const uniformNum of targets) {
    try {
      const result = await scrapePlayer(browser, uniformNum);
      results.push(result);

      // Print extracted data
      if (result.season) {
        console.log(`\n  📊 Extracted batting season:`);
        console.log(`     G:${result.season.G}  AB:${result.season.AB}  H:${result.season.H}  AVG:${result.season.AVG}  OBP:${result.season.OBP}  OPS:${result.season.OPS}`);
        console.log(`     RBI:${result.season.RBI}  HR:${result.season.HR}  BB:${result.season.BB}  SB:${result.season.SB}  HBP:${result.season.HBP}`);
      } else {
        console.log(`\n  ❌ Could not extract batting season data`);
      }

      if (result.pitchingSeason) {
        console.log(`\n  📊 Extracted pitching season:`);
        console.log(`     ERA:${result.pitchingSeason.ERA}  IP:${result.pitchingSeason.IP}  W-L:${result.pitchingSeason.WL}  WHIP:${result.pitchingSeason.WHIP}`);
      }

      if (result.log.length > 0) {
        console.log(`\n  📋 Game log (${result.log.length} entries):`);
        for (const entry of result.log.slice(0, 5)) {
          console.log(`     ${entry.date}  ${String(entry.opp).padEnd(25)}  ${entry.pos.padEnd(8)}  AB:${entry.AB} H:${entry.H} RBI:${entry.RBI} AVG:${entry.AVG}`);
        }
        if (result.log.length > 5) console.log(`     ... and ${result.log.length - 5} more`);
      }

      // Apply updates
      if (result.season || result.pitchingSeason) {
        console.log(`\n  ${DRY_RUN ? '🔍 Would update' : '✏️  Updating'} files...`);
        updateDataPlayersJs(uniformNum, result.season, result.log, result.pitchingSeason);
        updateFlipCard(uniformNum, result.season);
      }

    } catch (e) {
      console.error(`\n  ❌ Error processing #${uniformNum}: ${e.message}`);
    }
  }

  await browser.close();

  // Final summary
  console.log('\n══════════════════════════════════════════════');
  const ok  = results.filter(r => r.season).length;
  const fail = results.filter(r => !r.season).length;
  console.log(`  ✅ Successful: ${ok} player(s)`);
  if (fail) console.log(`  ❌ Failed:     ${fail} player(s)`);

  if (ok > 0 && !DRY_RUN) {
    console.log('\n  Running git commit + push...');
    const { execSync } = require('child_process');
    const names = results.filter(r => r.season).map(r => `#${r.uniformNum} ${r.player.name.split(' ').at(-1)}`).join(', ');
    try {
      execSync(`cd "${ROOT}" && git add barracudas3/data-players.js barracudas3/index.html barracudas3/roster.html && git diff --cached --quiet || git commit -m "Auto-update: sync stats from EasyScore — ${names}" && git push origin main`, { stdio: 'inherit' });
      console.log('  🚀 Pushed to GitHub — Netlify deploying...');
    } catch (e) {
      console.log('  ⚠  Git push failed — check manually');
    }
  }

  console.log('══════════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('\n❌ Fatal:', err.message);
  process.exit(1);
});
