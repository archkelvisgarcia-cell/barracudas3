// ══════════════════════════════════════════════════════════════
//  STANDINGS EDITOR — admin-managed league tables (2 halves)
//
//  Persists two independent standings tables in Netlify Blobs, under
//  the SAME 'bar3-pipeline' state blob already used by the rest of
//  the pipeline (games-api.js, init-blobs.js, pipeline.js):
//
//    state.standingsFirstHalf  — "NL Baseball Gruppe A 2026" (round 1)
//    state.standingsSecondHalf — "NL Baseball - NLA 2026" (TOP 6 round)
//
//  Each is fully independent — editing one never touches the other.
//
//  GET  (public)        → { firstHalf, secondHalf } — Blobs data if
//                          present, else the static fallback below
//                          (mirrors the tables already hardcoded in
//                          results.html so the admin form is never
//                          empty on first load).
//  POST (admin-only)     → body: { half: 'first'|'second', league, teams }
//                          Validates + persists just that half.
// ══════════════════════════════════════════════════════════════

const { getStore } = require('@netlify/blobs');
const { requireAuth } = require('./_auth');

// Fallback data — matches the static tables in results.html exactly,
// so GET always returns something even before the first admin save.
const FALLBACK_FIRST_HALF = {
  league: 'NL Baseball Gruppe A 2026',
  updatedAt: '2026-06-15T00:00:00.000Z',
  teams: [
    { rank: 1, abbr: 'BAR',  name: 'Zürich Barracudas', logo: 'assets/teams/BARLOGO.png',     gp: 12, w: 11, l: 1,  pct: '.917', gb: '—', isUs: false },
    { rank: 2, abbr: 'EAG',  name: 'Luzern Eagles',      logo: 'assets/teams/eagles.png',      gp: 10, w: 9,  l: 1,  pct: '.900', gb: '1', isUs: false },
    { rank: 3, abbr: 'BAR3', name: 'Zürich Barracudas 3',logo: 'assets/logo.png',              gp: 10, w: 5,  l: 5,  pct: '.500', gb: '5', isUs: true  },
    { rank: 4, abbr: 'IND',  name: 'Lausanne Indians',   logo: 'assets/teams/indians.png',     gp: 10, w: 5,  l: 5,  pct: '.500', gb: '5', isUs: false },
    { rank: 5, abbr: 'CHA2', name: 'Challengers 2',      logo: 'assets/teams/challengers.png', gp: 10, w: 4,  l: 6,  pct: '.400', gb: '6', isUs: false },
    { rank: 6, abbr: 'FRO',  name: 'Sissach Frogs',      logo: 'assets/teams/frogs.png',       gp: 6,  w: 0,  l: 6,  pct: '.000', gb: '8', isUs: false },
    { rank: 7, abbr: 'FLY2', name: 'Zürich Flyers 2',    logo: 'assets/teams/flyers.png',      gp: 10, w: 0,  l: 10, pct: '.000', gb: '10', isUs: false },
  ],
};

const FALLBACK_SECOND_HALF = {
  league: 'NL Baseball - NLA 2026',
  updatedAt: '2026-08-15T00:00:00.000Z',
  teams: [
    { rank: 1, abbr: 'FLY',  name: 'Therwil Flyers 1',    logo: 'assets/teams/flyers.png',      gp: 8,  w: 7, l: 1, pct: '.875', gb: '0',   isUs: false },
    { rank: 2, abbr: 'EAG',  name: 'Luzern Eagles',       logo: 'assets/teams/eagles.png',       gp: 10, w: 7, l: 3, pct: '.700', gb: '1',   isUs: false },
    { rank: 3, abbr: 'BAR',  name: 'Zürich Barracudas',   logo: 'assets/teams/BARLOGO.png',      gp: 10, w: 7, l: 3, pct: '.700', gb: '1',   isUs: false },
    { rank: 4, abbr: 'CHA',  name: 'Zürich Challengers',  logo: 'assets/teams/challengers.png',  gp: 7,  w: 2, l: 5, pct: '.286', gb: '4.5', isUs: false },
    { rank: 5, abbr: 'BAR3', name: 'Zürich Barracudas 3', logo: 'assets/logo.png',               gp: 7,  w: 1, l: 6, pct: '.143', gb: '5.5', isUs: true  },
    { rank: 6, abbr: 'LIO',  name: 'Zürich Lions',        logo: 'assets/teams/Lions.png',        gp: 8,  w: 1, l: 7, pct: '.125', gb: '6',   isUs: false },
  ],
};

function getStoreInstance() {
  return getStore({ name: 'bar3-pipeline', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN });
}

function validateTeams(teams) {
  if (!Array.isArray(teams) || teams.length === 0) return 'teams must be a non-empty array';
  for (const [i, t] of teams.entries()) {
    if (!t || typeof t !== 'object') return `teams[${i}] must be an object`;
    if (!t.abbr || typeof t.abbr !== 'string') return `teams[${i}].abbr is required`;
    if (!t.name || typeof t.name !== 'string') return `teams[${i}].name is required`;
    for (const key of ['gp', 'w', 'l']) {
      const n = Number(t[key]);
      if (!Number.isFinite(n) || n < 0) return `teams[${i}].${key} must be a non-negative number`;
    }
  }
  return null;
}

function sanitizeTeams(teams) {
  return teams.map((t, i) => ({
    rank: i + 1, // row order in the array IS the standing order
    abbr: String(t.abbr).trim().toUpperCase(),
    name: String(t.name).trim(),
    logo: typeof t.logo === 'string' ? t.logo.trim() : '',
    gp: Math.max(0, parseInt(t.gp, 10) || 0),
    w: Math.max(0, parseInt(t.w, 10) || 0),
    l: Math.max(0, parseInt(t.l, 10) || 0),
    pct: typeof t.pct === 'string' && t.pct.trim() ? t.pct.trim() : '.000',
    gb: typeof t.gb === 'string' && t.gb.trim() ? t.gb.trim() : (i === 0 ? '—' : '0'),
    isUs: !!t.isUs,
  }));
}

exports.handler = async (event) => {
  const store = getStoreInstance();

  if (event.httpMethod === 'GET') {
    let state = {};
    try {
      const raw = await store.get('state');
      if (raw) state = JSON.parse(raw);
    } catch { /* fall through to fallback */ }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        firstHalf:  state.standingsFirstHalf  ?? FALLBACK_FIRST_HALF,
        secondHalf: state.standingsSecondHalf ?? FALLBACK_SECOND_HALF,
      }),
    };
  }

  if (event.httpMethod === 'POST') {
    if (!requireAuth(event)) {
      return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    let payload;
    try { payload = JSON.parse(event.body || '{}'); }
    catch { return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid JSON body' }) }; }

    const { half, league, teams } = payload;
    if (half !== 'first' && half !== 'second') {
      return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: "half must be 'first' or 'second'" }) };
    }
    const validationError = validateTeams(teams);
    if (validationError) {
      return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: validationError }) };
    }

    const key = half === 'first' ? 'standingsFirstHalf' : 'standingsSecondHalf';
    const saved = {
      league: (typeof league === 'string' && league.trim()) || (half === 'first' ? 'NL Baseball Gruppe A 2026' : 'NL Baseball - NLA 2026'),
      updatedAt: new Date().toISOString(),
      teams: sanitizeTeams(teams),
    };

    try {
      const raw = await store.get('state');
      const state = raw ? JSON.parse(raw) : {};
      state[key] = saved; // only this half's key is touched — the other is left untouched
      await store.set('state', JSON.stringify(state));
    } catch (e) {
      return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: e.message }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, half, saved }),
    };
  }

  return { statusCode: 405, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Method Not Allowed' }) };
};
