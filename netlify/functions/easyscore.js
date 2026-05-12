// EasyScore v2 API proxy
// Team: Zürich Barracudas 3 · TeamID 13054 · LeagueID 10144
// Endpoint pattern: GET /games?id={gameId}  (teamId query param is broken on this key)

const API_KEY  = process.env.EASYSCORE_API_KEY;
const BASE_URL = 'https://api.easyscore.com/v2';
const TEAM_ID  = parseInt(process.env.EASYSCORE_TEAM_ID  || '13054');
const HEADERS  = { 'x-api-key': API_KEY };

// All confirmed BAR3 game IDs (updated as season progresses).
// Probe IDs above MAX_KNOWN to catch new scheduled games automatically.
const KNOWN_IDS = [19245, 19246, 19251, 19252, 19255, 19256, 19259, 19264, 19271, 19272];
const PROBE_AHEAD = 15; // how many IDs above the max known to probe

async function fetchGame(id) {
  try {
    const res = await fetch(`${BASE_URL}/games?id=${id}`, { headers: HEADERS });
    const data = await res.json();
    return Array.isArray(data) ? data[0] ?? null : null;
  } catch {
    return null;
  }
}

function isBAR3(g) {
  return g && (g.AwayTeam === TEAM_ID || g.HomeTeam === TEAM_ID);
}

function isLive(g)     { return g.GameStarted === 1 && g.GameEnded === 0 && g.Live === 1; }
function isFinished(g) { return g.GameEnded === 1; }
function isUpcoming(g) { return !g.GameStarted && !g.GameEnded; }

function summarise(g) {
  if (!g) return null;
  const bar3Side = g.AwayTeam === TEAM_ID ? 'away' : 'home';
  const oppSide  = bar3Side === 'away' ? 'home' : 'away';
  const ls       = g.LineScore?.[0] ?? null;

  return {
    id:          g.ID,
    date:        g.GameDate,
    startTime:   g.StartTime,
    live:        isLive(g),
    finished:    isFinished(g),
    upcoming:    isUpcoming(g),
    bar3Side,
    bar3Score:   ls?.[bar3Side]?.totals?.R ?? (bar3Side === 'away' ? g.AwayRuns : g.HomeRuns),
    oppScore:    ls?.[oppSide]?.totals?.R  ?? (oppSide  === 'away' ? g.AwayRuns : g.HomeRuns),
    bar3Abbr:    bar3Side === 'away' ? g.AwayTeamShort : g.HomeTeamShort,
    oppAbbr:     oppSide  === 'away' ? g.AwayTeamShort : g.HomeTeamShort,
    bar3Name:    bar3Side === 'away' ? g.AwayTeamName : g.HomeTeamName,
    oppName:     oppSide  === 'away' ? g.AwayTeamName : g.HomeTeamName,
    bar3Logo:    bar3Side === 'away' ? g.AwayTeamLogo : g.HomeTeamLogo,
    oppLogo:     oppSide  === 'away' ? g.AwayTeamLogo : g.HomeTeamLogo,
    lineScore:   ls,
    lineup:      bar3Side === 'away' ? g.AwayTeamLineup : g.HomeTeamLineup,
    oppLineup:   oppSide  === 'away' ? g.AwayTeamLineup : g.HomeTeamLineup,
    field:       g.Field,
    innings:     ls?.innings ?? null,
  };
}

exports.handler = async (event) => {
  const params = event.queryStringParameters ?? {};

  // Single game lookup
  if (params.action === 'game' && params.id) {
    const g = await fetchGame(parseInt(params.id));
    return {
      statusCode: g ? 200 : 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(summarise(g)),
    };
  }

  try {
    // Probe known IDs + a window ahead of the max
    const maxKnown = Math.max(...KNOWN_IDS);
    const probeIds = Array.from({ length: PROBE_AHEAD }, (_, i) => maxKnown + i + 1);
    const allIds   = [...new Set([...KNOWN_IDS, ...probeIds])].sort((a, b) => a - b);

    const raw    = await Promise.all(allIds.map(fetchGame));
    const games  = raw.filter(isBAR3).map(summarise);

    const live     = games.find(g => g.live)           ?? null;
    const finished = games.filter(g => g.finished)
                          .sort((a, b) => new Date(b.date) - new Date(a.date));
    const recent   = finished[0]                        ?? null;
    const upcoming = games.filter(g => g.upcoming)
                          .sort((a, b) => new Date(a.date) - new Date(b.date));

    const isActiveNow = !!live;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': isActiveNow ? 'no-cache, no-store' : 'public, max-age=120',
      },
      body: JSON.stringify({ live, recent, upcoming: upcoming.slice(0, 3), allFinished: finished }),
    };
  } catch (e) {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
