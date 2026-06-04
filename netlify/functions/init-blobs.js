// ══════════════════════════════════════════════════════════════
//  init-blobs.js — One-shot Blobs re-initialization
//
//  Call via POST from the admin panel or curl after a cache clear.
//  Seeds Netlify Blobs with the current known game data so the
//  pipeline and games-api have a valid baseline to work from.
//
//  This does NOT replace the live pipeline — it just gives it
//  a starting point so the page has data while the pipeline runs.
// ══════════════════════════════════════════════════════════════

const { getStore } = require('@netlify/blobs');

const API_KEY = process.env.EASYSCORE_API_KEY;
const TEAM_ID = parseInt(process.env.EASYSCORE_TEAM_ID || '13054');
const BASE    = 'https://api.easyscore.com/v2';
const HEADERS = { 'x-api-key': API_KEY };

// Known finished BAR3 game IDs (manually curated through June 2 2026)
const KNOWN_IDS = [19245, 19246, 19251, 19252, 19255, 19256, 19259, 19264, 19271, 19272];

// Static standings fallback (June 4, 2026 — from swiss-baseball.ch)
const STANDINGS_FALLBACK = [
  { rank:1, abbr:'BAR',  name:'Zürich Barracudas',   gp:12, w:11, l:1,  pct:'.917', gb:'—',  isUs:false },
  { rank:2, abbr:'EAG',  name:'Luzern Eagles',        gp:10, w:9,  l:1,  pct:'.900', gb:'1',  isUs:false },
  { rank:3, abbr:'BAR3', name:'Zürich Barracudas 3',  gp:10, w:5,  l:5,  pct:'.500', gb:'5',  isUs:true  },
  { rank:4, abbr:'IND',  name:'Lausanne Indians',      gp:10, w:5,  l:5,  pct:'.500', gb:'5',  isUs:false },
  { rank:5, abbr:'CHA2', name:'Challengers 2',         gp:10, w:4,  l:6,  pct:'.400', gb:'6',  isUs:false },
  { rank:6, abbr:'FRO',  name:'Sissach Frogs',         gp:6,  w:0,  l:6,  pct:'.000', gb:'8',  isUs:false },
  { rank:7, abbr:'FLY2', name:'Zürich Flyers 2',       gp:10, w:0,  l:10, pct:'.000', gb:'10', isUs:false },
];

async function fetchGame(id) {
  try {
    const r = await fetch(`${BASE}/games?id=${id}`, { headers: HEADERS });
    const d = await r.json();
    return Array.isArray(d) ? d[0] ?? null : null;
  } catch { return null; }
}

function summarise(g) {
  const isAway   = g.AwayTeam === TEAM_ID;
  const bar3Side = isAway ? 'away' : 'home';
  const oppSide  = isAway ? 'home' : 'away';
  const ls       = g.LineScore?.[0] ?? null;
  const bar3R    = ls?.[bar3Side]?.totals?.R ?? (isAway ? g.AwayRuns : g.HomeRuns) ?? 0;
  const oppR     = ls?.[oppSide]?.totals?.R  ?? (isAway ? g.HomeRuns : g.AwayRuns) ?? 0;

  return {
    id:        g.ID,
    date:      (g.GameDate || '').split('T')[0],
    gameNumber:g.GameNumber || '',
    bar3Side,
    bar3Score: bar3R,
    oppScore:  oppR,
    bar3Abbr:  isAway ? g.AwayTeamShort : g.HomeTeamShort,
    oppAbbr:   isAway ? g.HomeTeamShort : g.AwayTeamShort,
    bar3Name:  isAway ? g.AwayTeamName  : g.HomeTeamName,
    oppName:   isAway ? g.HomeTeamName  : g.AwayTeamName,
    bar3Logo:  isAway ? g.AwayTeamLogo  : g.HomeTeamLogo,
    oppLogo:   isAway ? g.HomeTeamLogo  : g.AwayTeamLogo,
    lineScore: ls,
    field:     g.Field || 'Heerenschürli, Zürich',
    innings:   ls?.innings ?? 9,
    finished:  g.GameEnded === 1,
    live:      g.GameStarted === 1 && g.GameEnded === 0 && g.Live === 1,
    won:       (bar3R ?? 0) > (oppR ?? 0),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const log = [];

  try {
    const store = getStore({ name: 'bar3-pipeline', consistency: 'strong' });

    log.push('Fetching known game IDs from EasyScore…');
    const raw   = await Promise.all(KNOWN_IDS.map(fetchGame));
    const games = raw
      .filter(g => g && (g.AwayTeam === TEAM_ID || g.HomeTeam === TEAM_ID))
      .map(summarise)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    log.push(`Fetched ${games.length} BAR3 games from EasyScore`);

    // Compute W-L from fetched games
    let W = 0, L = 0;
    for (const g of games) {
      if (!g.finished) continue;
      g.won ? W++ : L++;
    }
    // Known June 2 NLA loss isn't in EasyScore IDs above — add manually
    L += 1; // June 2 loss vs NLA
    const record = { W, L, label: `${W}-${L}` };
    log.push(`Record computed: ${record.label}`);

    // Build state object
    const state = {
      lastProbedId: 19280,          // pipeline continues probing from here
      seenIds:      KNOWN_IDS,      // won't re-generate articles for these
      games,
      articles:     [],             // pipeline will generate articles going forward
      record,
      standings:    STANDINGS_FALLBACK,
      lastRun:      new Date().toISOString(),
      initializedAt: new Date().toISOString(),
    };

    await store.set('state', JSON.stringify(state));
    log.push('✓ Blobs written successfully');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        games:    games.length,
        record:   record.label,
        standings:STANDINGS_FALLBACK.length,
        message:  'Blobs initialized. Run pipeline to sync with EasyScore.',
        log,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: e.message, log }),
    };
  }
};
