'use strict';
// Shared award calculation — runs on server (pipeline) and used as fallback client-side.
// Accepts PLAYER_EXTENDED_DATA as parameter; no DOM or PLAYER_REGISTRY dependency.

function f(v) { return parseFloat(v) || 0; }

function normPct(val, min, max, invert = false) {
  const pct = Math.min(100, Math.max(0, ((f(val) - min) / (max - min)) * 100));
  return invert ? 100 - pct : pct;
}

function ipFloat(ip) {
  const s = String(ip || '0').split('.');
  return parseInt(s[0] || 0) + parseInt(s[1] || 0) / 3;
}

function wins(wl) {
  return parseInt(String(wl || '0-0').split('-')[0]) || 0;
}

// Returns { gg, ss, cy, mvp } — each is an array of up to 3 candidate objects.
// Candidates include num, fullName, relevant stats, and pre-computed metrics[].
// Browser enriches each candidate with img/pos/shortName from PLAYER_REGISTRY.
function calculateAwards(PLAYER_EXTENDED_DATA) {
  const players = Object.entries(PLAYER_EXTENDED_DATA)
    .filter(([, ext]) => !ext.excludeFromAwards)
    .map(([num, ext]) => ({
      num,
      fullName: ext.fullName || `#${num}`,
      bat: ext.batting?.season  || null,
      pit: ext.pitching?.season || null,
      fld: ext.fielding?.season || null,
    }));

  // Golden Glove: IP >= 18 — sort E↑ FPct↓ IP↓
  const gg = players
    .filter(p => p.fld && f(p.fld.IP) >= 18)
    .sort((a, b) => {
      if (a.fld.E !== b.fld.E) return a.fld.E - b.fld.E;
      if (f(a.fld.FPct) !== f(b.fld.FPct)) return f(b.fld.FPct) - f(a.fld.FPct);
      if (f(a.fld.IP) !== f(b.fld.IP)) return f(b.fld.IP) - f(a.fld.IP);
      return f(b.fld.RF || 0) - f(a.fld.RF || 0);
    })
    .slice(0, 3)
    .map(p => ({
      num: p.num, fullName: p.fullName, fld: p.fld,
      metrics: [
        { label: 'FPct', val: p.fld.FPct, pct: normPct(p.fld.FPct, 0.7, 1.0)     },
        { label: 'E',    val: p.fld.E,    pct: normPct(p.fld.E,     0,   5, true) },
        { label: 'IP',   val: p.fld.IP,   pct: normPct(p.fld.IP,    0,  55)       },
      ],
    }));

  // Silver Slugger: PA >= 20, AB >= 15 — sort OPS↓ AVG↓ RBI↓
  const ss = players
    .filter(p => p.bat && p.bat.PA >= 20 && p.bat.AB >= 15)
    .sort((a, b) => {
      const d = f(b.bat.OPS) - f(a.bat.OPS); if (d) return d;
      const d2 = f(b.bat.AVG) - f(a.bat.AVG); if (d2) return d2;
      if (b.bat.RBI !== a.bat.RBI) return b.bat.RBI - a.bat.RBI;
      return (b.bat.HR || 0) - (a.bat.HR || 0);
    })
    .slice(0, 3)
    .map(p => ({
      num: p.num, fullName: p.fullName, bat: p.bat,
      metrics: [
        { label: 'OPS', val: p.bat.OPS, pct: normPct(p.bat.OPS, 0, 2.0) },
        { label: 'AVG', val: p.bat.AVG, pct: normPct(p.bat.AVG, 0, 0.6) },
        { label: 'RBI', val: p.bat.RBI, pct: normPct(p.bat.RBI, 0, 20)  },
      ],
    }));

  // Cy Young: IP >= 6 — sort ERA↑ WHIP↑ SO↓
  const cy = players
    .filter(p => p.pit && f(p.pit.IP) >= 6)
    .sort((a, b) => {
      const d = f(a.pit.ERA) - f(b.pit.ERA); if (d) return d;
      const d2 = f(a.pit.WHIP) - f(b.pit.WHIP); if (d2) return d2;
      if (a.pit.SO !== b.pit.SO) return b.pit.SO - a.pit.SO;
      return wins(b.pit.WL) - wins(a.pit.WL);
    })
    .slice(0, 3)
    .map(p => ({
      num: p.num, fullName: p.fullName, pit: p.pit,
      metrics: [
        { label: 'ERA',  val: p.pit.ERA,  pct: normPct(p.pit.ERA,  0, 12, true) },
        { label: 'WHIP', val: p.pit.WHIP, pct: normPct(p.pit.WHIP, 0,  3, true) },
        { label: 'SO',   val: p.pit.SO,   pct: normPct(p.pit.SO,   0, 12)       },
      ],
    }));

  // MVP — composite score across all qualifying categories
  const MAX_SO = Math.max(...players.map(p => p.pit?.SO || 0), 1);
  function mvpScore(p) {
    let sc = 0, cats = 0;
    if (p.bat && p.bat.PA >= 20)    { sc += f(p.bat.OPS) * 40 + f(p.bat.AVG) * 20; cats++; }
    if (p.pit && f(p.pit.IP) >= 6)  { sc += Math.max(0, (12 - f(p.pit.ERA)) / 12) * 30 + (Math.min(p.pit.SO, MAX_SO) / MAX_SO) * 10; cats++; }
    if (p.fld && f(p.fld.IP) >= 18) { sc += f(p.fld.FPct) * 10; cats++; }
    if (cats >= 2) sc += 5;
    return Math.round(sc * 10) / 10;
  }

  const mvp = players
    .filter(p => (p.bat && p.bat.PA >= 20) || (p.pit && f(p.pit.IP) >= 6) || (p.fld && f(p.fld.IP) >= 18))
    .map(p => ({ ...p, _sc: mvpScore(p) }))
    .sort((a, b) => b._sc - a._sc)
    .slice(0, 3)
    .map(p => ({
      num: p.num, fullName: p.fullName, bat: p.bat, pit: p.pit, fld: p.fld,
      mvpSc: p._sc,
      metrics: [
        ...(p.bat && p.bat.PA >= 10 ? [{ label: 'OPS', val: p.bat.OPS, pct: normPct(p.bat.OPS, 0, 2.0) }] : []),
        ...(p.pit && f(p.pit.IP) >= 3 ? [{ label: 'ERA', val: p.pit.ERA, pct: normPct(p.pit.ERA, 0, 12, true) }] : []),
        ...(p.fld ? [{ label: 'FPct', val: p.fld.FPct, pct: normPct(p.fld.FPct, 0.7, 1.0) }] : []),
      ].slice(0, 3),
    }));

  return { gg, ss, cy, mvp };
}

// Returns { batter, pitcher, fielder } for the hero stats strip.
function calculateTopPerformers(PLAYER_EXTENDED_DATA) {
  let topBatter = null, scoreBat = -Infinity;
  let topPitcher = null, scorePit = -Infinity;
  let topFielder = null, scoreFld = -Infinity;

  for (const [num, ext] of Object.entries(PLAYER_EXTENDED_DATA)) {
    if (ext.excludeFromAwards) continue;
    const meta = { num, fullName: ext.fullName || `#${num}` };

    const bat = ext.batting?.season;
    if (bat && f(bat.AB) >= 10) {
      const s = f(bat.OPS) * 40 + f(bat.AVG) * 30 + f(bat.RBI) * 1.5 + f(bat.HR) * 3;
      if (s > scoreBat) { scoreBat = s; topBatter = { ...meta, statLine: `${bat.AVG} AVG · ${f(bat.RBI)} RBI · ${bat.OPS} OPS` }; }
    }

    const pit = ext.pitching?.season;
    if (pit && ipFloat(pit.IP) >= 6.0) {
      const era = f(pit.ERA), whip = f(pit.WHIP);
      const s = (era > 0 ? (1/era) * 30 : 60) + (whip > 0 ? (1/whip) * 20 : 40) + f(pit.SO) * 1.5 + wins(pit.WL) * 5;
      if (s > scorePit) { scorePit = s; topPitcher = { ...meta, statLine: `${pit.ERA} ERA · ${wins(pit.WL)}-${String(pit.WL||'0-0').split('-')[1]||0} W-L · ${f(pit.SO)} K` }; }
    }

    const fld = ext.fielding?.season;
    if (fld && ipFloat(fld.IP) >= 45.0) {
      const s = f(fld.FPct) * 50 + f(fld.A) * 0.5 + f(fld.PO) * 0.3;
      if (s > scoreFld) { scoreFld = s; topFielder = { ...meta, statLine: `${fld.FPct} FPct · ${f(fld.PO)} PO · ${f(fld.A)} A` }; }
    }
  }

  return { batter: topBatter, pitcher: topPitcher, fielder: topFielder };
}

module.exports = { calculateAwards, calculateTopPerformers };
