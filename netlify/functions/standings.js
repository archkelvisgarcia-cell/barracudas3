// Compute Gruppe A 2026 standings from EasyScore game data.
// Probes all known game IDs + a forward window to catch new games.

const API_KEY   = process.env.EASYSCORE_API_KEY;
const BASE      = 'https://api.easyscore.com/v2';
const LEAGUE_ID = parseInt(process.env.EASYSCORE_LEAGUE_ID || '10144');
const TEAM_ID   = parseInt(process.env.EASYSCORE_TEAM_ID   || '13054'); // BAR3

// All confirmed league game IDs (updated as season progresses)
const KNOWN_IDS = [
  19240, 19241, 19242, 19243, 19244, 19245, 19246, 19247, 19248, 19249,
  19250, 19251, 19252, 19253, 19254, 19255, 19256, 19257, 19258, 19259,
  19260, 19261, 19262, 19263, 19264, 19265, 19266, 19267, 19268, 19269,
  19270, 19271, 19272, 19273, 19274, 19275, 19276, 19277, 19278, 19279, 19280,
];

const TEAM_NAMES = {
  BAR3: 'Zürich Barracudas 3',
  EAG:  'Luzern Eagles',
  IND:  'Lausanne Indians',
  BAR:  'Zürich Barracudas',
  CHA2: 'Challengers 2',
  FLY2: 'Zürich Flyers 2',
  FRO:  'Sissach Frogs',
};

async function fetchGame(id) {
  try {
    const r = await fetch(`${BASE}/games?id=${id}`, { headers: { 'x-api-key': API_KEY } });
    const d = await r.json();
    return Array.isArray(d) ? d[0] ?? null : null;
  } catch { return null; }
}

exports.handler = async () => {
  if (!API_KEY) return { statusCode: 503, body: JSON.stringify({ error: 'No API key' }) };

  // Probe known IDs + a window ahead
  const maxId   = Math.max(...KNOWN_IDS);
  const probeIds = Array.from({ length: 15 }, (_, i) => maxId + i + 1);
  const allIds   = [...new Set([...KNOWN_IDS, ...probeIds])];

  const raw = await Promise.all(allIds.map(fetchGame));

  // Filter to this league only
  const games = raw.filter(g => g && g.LeagueID === LEAGUE_ID);

  // Compute standings
  const teams = {};

  function ensureTeam(abbr, name, logo) {
    if (!teams[abbr]) {
      teams[abbr] = { abbr, name: name || TEAM_NAMES[abbr] || abbr, logo: logo || '', gp: 0, w: 0, l: 0 };
    }
    if (!teams[abbr].logo && logo) teams[abbr].logo = logo;
  }

  for (const g of games) {
    if (!g.GameEnded) continue; // skip upcoming / in-progress

    const awayAbbr = g.AwayTeamShort;
    const homeAbbr = g.HomeTeamShort;
    const awayR    = g.AwayRuns ?? 0;
    const homeR    = g.HomeRuns ?? 0;

    ensureTeam(awayAbbr, g.AwayTeamName, g.AwayTeamLogo);
    ensureTeam(homeAbbr, g.HomeTeamName, g.HomeTeamLogo);

    teams[awayAbbr].gp++;
    teams[homeAbbr].gp++;

    if (awayR > homeR) {
      teams[awayAbbr].w++;
      teams[homeAbbr].l++;
    } else {
      teams[homeAbbr].w++;
      teams[awayAbbr].l++;
    }
  }

  // Sort: PCT desc → wins desc → name asc
  const rawSorted = Object.values(teams)
    .filter(t => t.gp > 0)
    .sort((a, b) => {
      const pctA = a.gp ? a.w / a.gp : 0;
      const pctB = b.gp ? b.w / b.gp : 0;
      if (pctB !== pctA) return pctB - pctA;
      if (b.w !== a.w) return b.w - a.w;
      return a.abbr.localeCompare(b.abbr);
    });

  const leader = rawSorted[0];
  const sorted = rawSorted.map((t, i) => {
    const gbRaw = i === 0
      ? null
      : ((leader.w - t.w) + (t.l - leader.l)) / 2;
    const gb = gbRaw === null ? '—'
      : (gbRaw % 1 === 0 ? String(gbRaw) : gbRaw.toFixed(1));
    return {
      rank: i + 1,
      abbr: t.abbr,
      name: t.name,
      logo: t.logo,
      gp:   t.gp,
      w:    t.w,
      l:    t.l,
      pct:  t.gp ? (t.w / t.gp).toFixed(3).replace(/^0/, '') : '.000',
      gb,
      isUs: t.abbr === 'BAR3',
    };
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type':  'application/json',
      'Cache-Control': 'public, max-age=300', // 5-min cache
    },
    body: JSON.stringify({
      league:    'NLA Baseball Gruppe A 2026',
      updatedAt: new Date().toISOString(),
      standings: sorted,
    }),
  };
};
