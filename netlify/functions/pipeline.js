// ══════════════════════════════════════════════════════════════
//  BAR3 AUTO-PIPELINE
//  Scheduled hourly. Also callable via POST for manual trigger.
//
//  What it does each run:
//    1. Probe EasyScore for new BAR3 games (no hardcoded ID list)
//    2. For each newly-finished game:
//       a. Compute team W-L, fielding stats, pitcher ERA/IP
//       b. Generate trilingual recap article via Claude
//    3. Persist everything to Netlify Blobs
//    4. Return a summary so the admin panel can show results
//
//  Batting stats (AVG, HR, RBI, OBP, SLG, OPS) are NOT available
//  via this EasyScore API key — /stats returns 500. Those remain
//  manually maintained in PLAYER_EXTENDED_DATA in app.js.
// ══════════════════════════════════════════════════════════════

const { getStore }  = require('@netlify/blobs');
const Anthropic     = require('@anthropic-ai/sdk');
const { calculateAwards, calculateTopPerformers } = require('./_award-calc');
const { requireAuth, isScheduledInvocation } = require('./_auth');
const { PLAYER_EXTENDED_DATA } = require('../../barracudas3/data-players.js');

const ES_KEY    = process.env.EASYSCORE_API_KEY;
const TEAM_ID   = parseInt(process.env.EASYSCORE_TEAM_ID || '13054');
const BASE      = 'https://api.easyscore.com/v2';
const ES_HDR    = { 'x-api-key': ES_KEY };

// Start probing from last known game. Each run probes PROBE_STEP IDs forward.
// Keep low (≤15) to stay within Netlify's 26s function timeout.
const SEED_ID    = 19272;
const PROBE_STEP = 15;

// Confirmed BAR3 game IDs. Re-probed every run to catch late EasyScore entries
// (EasyScore sometimes assigns an ID before the score is entered, causing the
// forward probe to pass over it and miss the result when it appears later).
const CATCHUP_IDS = [19279, 19280];

// Known BAR3 game dates (YYYY-MM-DD). Keep in sync with GAMES[] in app.js.
// The pipeline only runs on game days or the day after.
// Add new dates here when the schedule is updated.
const GAME_DATES = new Set([
  '2026-04-19', '2026-04-26',
  '2026-05-02', '2026-05-05',
  '2026-05-30', '2026-06-02',
  '2026-06-07',
  // Add future game dates below as the season progresses:
]);

function isGameDay() {
  // Swiss time = UTC+2 (CEST). Convert 'now' to Swiss local date.
  const now = new Date();
  const swiss = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Zurich' }));
  const today = swiss.toISOString().split('T')[0];
  // Also check yesterday — results may not be in EasyScore until late night.
  const yesterday = new Date(swiss);
  yesterday.setDate(yesterday.getDate() - 1);
  const yd = yesterday.toISOString().split('T')[0];
  const twoDaysAgo = new Date(swiss);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const d2 = twoDaysAgo.toISOString().split('T')[0];
  return GAME_DATES.has(today) || GAME_DATES.has(yd) || GAME_DATES.has(d2);
}

// ── EasyScore helpers ──────────────────────────────────────────
async function fetchGame(id) {
  try {
    const r = await fetch(`${BASE}/games?id=${id}`, { headers: ES_HDR });
    const d = await r.json();
    return Array.isArray(d) ? d[0] ?? null : null;
  } catch { return null; }
}

function isBAR3(g) { return g && (g.AwayTeam === TEAM_ID || g.HomeTeam === TEAM_ID); }

function parseStatDef(str) {
  if (!str) return null;
  const [G, IP, PO, A, E, DP] = (str || '').split('-');
  const po = parseInt(PO) || 0, a = parseInt(A) || 0, e = parseInt(E) || 0;
  const fPct = (po + a + e) > 0 ? ((po + a) / (po + a + e)).toFixed(3) : '1.000';
  return { G: parseInt(G)||0, IP: IP||'0.0', PO: po, A: a, E: e, DP: parseInt(DP)||0, FPct: fPct };
}

function summarise(g) {
  const isAway   = g.AwayTeam === TEAM_ID;
  const bar3Side = isAway ? 'away' : 'home';
  const oppSide  = isAway ? 'home' : 'away';
  const ls       = g.LineScore?.[0] ?? null;
  const bar3R    = ls?.[bar3Side]?.totals?.R ?? (isAway ? g.AwayRuns : g.HomeRuns);
  const oppR     = ls?.[oppSide]?.totals?.R  ?? (isAway ? g.HomeRuns : g.AwayRuns);

  // Aggregate fielding + pitching from lineup StatDef
  const bar3Lineup = (isAway ? g.AwayTeamLineup : g.HomeTeamLineup) || [];
  const players = {};
  const seen = new Set();
  for (const p of bar3Lineup) {
    const pid = p.PlayerID;
    if (!pid || seen.has(pid)) continue;
    seen.add(pid);
    players[p.UniformNr || pid] = {
      uniformNr:   p.UniformNr,
      name:        p.Player,
      pos:         p.PosStr,
      fielding:    parseStatDef(p.StatDef),
      photo:       p.PlayerPic || null,
    };
  }

  return {
    id:        g.ID,
    date:      g.GameDate?.split('T')[0],
    gameNumber:g.GameNumber,
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
    players,
  };
}

// ── Claude article generation ──────────────────────────────────
function lsText(ls) {
  if (!ls) return 'Linescore not available.';
  const away = ls.away || {}, home = ls.home || {};
  const inns = parseInt(ls.innings || 9);
  const al = Array.from({ length: inns }, (_, i) => away.line?.[i + 1] ?? '·').join(' ');
  const hl = Array.from({ length: inns }, (_, i) => home.line?.[i + 1] ?? '·').join(' ');
  return `${away.abbr || 'AWAY'}: ${al}  (R:${away.totals?.R} H:${away.totals?.H} E:${away.totals?.E})\n` +
         `${home.abbr || 'HOME'}: ${hl}  (R:${home.totals?.R} H:${home.totals?.H} E:${home.totals?.E})`;
}

async function generateArticle(game, anthropicKey) {
  const client = new Anthropic({ apiKey: anthropicKey });
  const opp = game.oppName?.split(' ').pop() || game.oppAbbr;

  const prompt = `You are a professional baseball journalist. Write a vivid recap for Zürich Barracudas 3.

GAME: BAR3 ${game.bar3Score} — ${game.oppScore} ${opp}
DATE: ${game.date}  VENUE: ${game.field}  INNINGS: ${game.innings}
RESULT FOR BARRACUDAS 3: ${game.won ? 'WIN ✓' : 'LOSS ✗'}

Score by inning:
${lsText(game.lineScore)}

Lineup: ${Object.values(game.players || {}).map(p => `${p.name} (#${p.uniformNr}, ${p.pos})`).slice(0, 8).join(', ')}

Return ONLY valid JSON (no markdown):
{
  "title_en": "short punchy English headline (max 10 words)",
  "title_es": "Spanish headline",
  "title_de": "German headline",
  "subtitle_en": "1-sentence English subtitle",
  "subtitle_es": "1-sentence Spanish subtitle",
  "subtitle_de": "1-sentence German subtitle",
  "body_en": "2-3 paragraph English recap mentioning key players",
  "body_es": "2-3 paragraph Spanish recap",
  "body_de": "2-3 paragraph German recap",
  "tag_en": "Game Recap",
  "tag_es": "Resumen de Partido",
  "tag_de": "Spielbericht"
}`;

  const resp = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = resp.content[0]?.text ?? '';
  const clean = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();
  return JSON.parse(clean);
}

// ── Compute team W-L from all finished games ───────────────────
function computeRecord(allGames) {
  let W = 0, L = 0;
  for (const g of allGames) {
    if (!g.finished) continue;
    if (g.won) W++; else L++;
  }
  return { W, L, label: `${W}-${L}` };
}

// ── Main handler ───────────────────────────────────────────────
exports.handler = async (event) => {
  // Reject non-POST from outside (scheduled events have no httpMethod)
  if (event.httpMethod && event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Allow Netlify's own hourly cron trigger through unauthenticated (it can't
  // carry a user token); any other caller (e.g. the admin "Run Now" button)
  // must present a valid admin token.
  if (!isScheduledInvocation(event) && !requireAuth(event)) {
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  if (!ES_KEY) {
    return { statusCode: 503, body: JSON.stringify({ error: 'EASYSCORE_API_KEY not set' }) };
  }

  // Any POST = manual trigger from admin panel — always run regardless of game day.
  // Scheduled cron calls have no httpMethod set (or it's undefined).
  const isManual = event.httpMethod === 'POST';
  if (!isManual && !isGameDay()) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true, skipped: true,
        reason: 'No game scheduled today or yesterday',
        found: 0, newFinished: 0, newArticles: 0, record: '—',
        log: ['Skipped — not a game day'],
      }),
    };
  }

  const store = getStore({ name: 'bar3-pipeline', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN });
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const log = [];

  try {
    // ── Load persisted state ────────────────────────────────────
    let state = {};
    try {
      const raw = await store.get('state');
      if (raw) state = JSON.parse(raw);
    } catch { /* first run */ }

    const lastProbedId = state.lastProbedId ?? SEED_ID;
    const seenIds      = new Set(state.seenIds ?? []);
    const allGames     = state.games    ?? [];
    const articles     = state.articles ?? [];

    // ── Probe next PROBE_STEP IDs + catch-up IDs ──────────────────
    const probeIds = Array.from({ length: PROBE_STEP }, (_, i) => lastProbedId + i + 1);
    log.push(`Probing IDs ${probeIds[0]}–${probeIds[probeIds.length - 1]}`);

    // Also re-probe known IDs that EasyScore may have entered after the forward
    // probe already passed them (late data entry is common in amateur leagues).
    const allProbeIds = [...new Set([...CATCHUP_IDS, ...probeIds])];
    const raw = await Promise.all(allProbeIds.map(fetchGame));
    const found = raw.filter(g => g && isBAR3(g)).map(summarise);
    log.push(`Found ${found.length} BAR3 games in probe window`);

    // ── Merge found games into allGames ─────────────────────────
    let newFinishedCount = 0;
    let newArticleCount  = 0;

    for (const game of found) {
      const idx = allGames.findIndex(g => g.id === game.id);
      if (idx >= 0) {
        allGames[idx] = game; // update in place (live→finished transition)
      } else {
        allGames.push(game);
        log.push(`New game discovered: ID ${game.id} — BAR3 ${game.bar3Score}–${game.oppScore} ${game.oppAbbr} on ${game.date}`);
      }

      // Generate article for newly finished games
      if (game.finished && !seenIds.has(game.id)) {
        seenIds.add(game.id);
        newFinishedCount++;

        if (anthropicKey) {
          try {
            log.push(`Generating article for game ${game.id}…`);
            const article = await generateArticle(game, anthropicKey);
            articles.unshift({
              id:          `game-${game.id}`,
              gameId:      game.id,
              date:        new Date(game.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              game,
              article,
              generatedAt: new Date().toISOString(),
            });
            newArticleCount++;
            log.push(`Article generated for game ${game.id}`);
          } catch (e) {
            log.push(`Article generation FAILED for game ${game.id}: ${e.message}`);
          }
        } else {
          log.push(`Skipped article for game ${game.id} — ANTHROPIC_API_KEY not set`);
        }
      }
    }

    // ── Compute current season record ───────────────────────────
    const record = computeRecord(allGames);

    // ── Compute awards from latest player data ───────────────────
    let awards = null, topPerformers = null;
    try {
      awards        = calculateAwards(PLAYER_EXTENDED_DATA);
      topPerformers = calculateTopPerformers(PLAYER_EXTENDED_DATA);
      log.push('Awards and top performers calculated successfully');
    } catch (e) {
      log.push(`Award calculation failed: ${e.message}`);
    }

    // ── Save state ──────────────────────────────────────────────
    const newState = {
      lastProbedId: lastProbedId + PROBE_STEP,
      seenIds:      [...seenIds],
      games:        allGames.sort((a, b) => (b.date || '').localeCompare(a.date || '')),
      articles:     articles.slice(0, 30),
      record,
      awards,
      topPerformers,
      lastRun:      new Date().toISOString(),
    };
    await store.set('state', JSON.stringify(newState));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        probeRange: `${probeIds[0]}–${probeIds[probeIds.length - 1]}`,
        found:       found.length,
        newFinished: newFinishedCount,
        newArticles: newArticleCount,
        record:      record.label,
        nextProbeFrom: newState.lastProbedId,
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
