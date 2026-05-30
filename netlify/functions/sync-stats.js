// EasyScore Stats Sync
// NOTE: /stats endpoint returns 500 with this API key.
// We extract what IS available:
//   - Fielding stats from StatDef field (G-IP-PO-A-E-DP)
//   - Team W-L record from game outcomes
//   - Player photo URLs
//   - Game roster (confirms active players)
// Batting / Pitching stats are NOT available via this key — fallback to hardcoded data.

const API_KEY  = process.env.EASYSCORE_API_KEY;
const BASE_URL = 'https://api.easyscore.com/v2';
const TEAM_ID  = parseInt(process.env.EASYSCORE_TEAM_ID || '13054');
const HEADERS  = { 'x-api-key': API_KEY };

// Apr 19: 19245 · Apr 26: 19246 · May 2: 19251,19252 · May 5: 19255,19256,19259,19264,19271 · May 30 G2: 19272
const KNOWN_IDS = [19245, 19246, 19251, 19252, 19255, 19256, 19259, 19264, 19271, 19272];

async function fetchGame(id) {
  try {
    const r = await fetch(`${BASE_URL}/games?id=${id}`, { headers: HEADERS });
    const d = await r.json();
    return Array.isArray(d) ? d[0] ?? null : null;
  } catch { return null; }
}

// Parse "G-IP-PO-A-E-DP" StatDef string
function parseFielding(statDef) {
  if (!statDef) return null;
  const [G, IP, PO, A, E, DP] = statDef.split('-');
  const po = parseInt(PO) || 0, a = parseInt(A) || 0, e = parseInt(E) || 0;
  const fPct = (po + a + e) > 0 ? ((po + a) / (po + a + e)).toFixed(3) : '1.000';
  return { G: parseInt(G)||0, IP: IP||'0.0', PO: po, A: a, E: e, DP: parseInt(DP)||0, FPct: fPct };
}

exports.handler = async () => {
  if (!API_KEY) return { statusCode: 503, body: JSON.stringify({ error: 'EASYSCORE_API_KEY not set' }) };

  try {
    const raw   = await Promise.all(KNOWN_IDS.map(fetchGame));
    const games = raw.filter(g => g && (g.AwayTeam === TEAM_ID || g.HomeTeam === TEAM_ID));

    // --- Team record ---
    let wins = 0, losses = 0;
    const finishedGames = [];

    for (const g of games) {
      if (!g.GameEnded) continue;
      const isAway  = g.AwayTeam === TEAM_ID;
      const bar3R   = isAway ? g.AwayRuns : g.HomeRuns;
      const oppR    = isAway ? g.HomeRuns : g.AwayRuns;
      const won     = bar3R > oppR;
      won ? wins++ : losses++;

      finishedGames.push({
        id:        g.ID,
        date:      g.GameDate?.split('T')[0],
        opponent:  isAway ? g.HomeTeamName : g.AwayTeamName,
        oppShort:  isAway ? g.HomeTeamShort : g.AwayTeamShort,
        oppLogo:   isAway ? g.HomeTeamLogo  : g.AwayTeamLogo,
        bar3Score: bar3R,
        oppScore:  oppR,
        won,
        lineScore: g.LineScore?.[0] ?? null,
      });
    }

    // --- Player fielding stats aggregated across games ---
    const playerMap = {};

    for (const g of games) {
      const isAway = g.AwayTeam === TEAM_ID;
      const lineup = isAway ? g.AwayTeamLineup : g.HomeTeamLineup;
      if (!lineup) continue;

      for (const entry of lineup) {
        const pid = entry.PlayerID;
        if (!pid) continue;

        if (!playerMap[pid]) {
          playerMap[pid] = {
            playerID:    pid,
            uniformNr:   entry.UniformNr,
            name:        entry.Player,
            firstName:   entry.Name,
            lastName:    entry.Lastname,
            photo:       entry.PlayerPic || null,
            positions:   new Set(),
            fieldingRaw: entry.StatDef || null, // season cumulative from last appearance
          };
        }

        // Collect all positions played
        if (entry.PosStr) entry.PosStr.split(',').forEach(p => playerMap[pid].positions.add(p.trim()));

        // StatDef is season cumulative — update with latest (last game seen)
        if (entry.StatDef) playerMap[pid].fieldingRaw = entry.StatDef;
      }
    }

    // Build final player list
    const players = Object.values(playerMap).map(p => ({
      ...p,
      positions: [...p.positions],
      fielding:  parseFielding(p.fieldingRaw),
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // 5-min cache
      },
      body: JSON.stringify({
        syncedAt:    new Date().toISOString(),
        record:      { W: wins, L: losses, label: `${wins}-${losses}` },
        players,
        recentGames: finishedGames.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
        note: 'Batting/pitching stats not available via this API key. Fielding from StatDef (G-IP-PO-A-E-DP).',
      }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
