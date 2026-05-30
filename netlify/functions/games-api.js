// ══════════════════════════════════════════════════════════════
//  GAMES API — runtime data endpoint
//  Front-end fetches this on every page load to get:
//    - Dynamic game results (overlays onto static GAMES[] in app.js)
//    - Auto-generated recap articles (prepended to NEWS_ARTICLES[])
//    - Current team W-L record
//    - Live game if any
//
//  Response is cached for 2 minutes via Cache-Control.
// ══════════════════════════════════════════════════════════════

const { getStore } = require('@netlify/blobs');

exports.handler = async () => {
  try {
    const store = getStore({ name: 'bar3-pipeline', consistency: 'strong' });
    const raw = await store.get('state');

    if (!raw) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=120',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ games: [], articles: [], record: null, live: null, lastRun: null }),
      };
    }

    const state = JSON.parse(raw);
    const live  = (state.games || []).find(g => g.live) ?? null;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': live ? 'public, max-age=30' : 'public, max-age=120',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        games:    state.games    ?? [],
        articles: state.articles ?? [],
        record:   state.record   ?? null,
        live,
        lastRun:  state.lastRun  ?? null,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: e.message }),
    };
  }
};
