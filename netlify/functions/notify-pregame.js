// Scheduled: fires every hour, sends "Game Day!" 60 min before BAR3 games.
// Schedule in netlify.toml: "0 * * * *"

const { sendPush } = require('./send-notification');

const API_KEY  = process.env.EASYSCORE_API_KEY;
const TEAM_ID  = parseInt(process.env.EASYSCORE_TEAM_ID || '13054');
const ES_BASE  = 'https://api.easyscore.com/v2';
const KNOWN_IDS = [19245, 19246, 19251, 19252, 19255, 19256, 19259, 19264, 19271, 19272];

async function fetchGame(id) {
  try {
    const r = await fetch(`${ES_BASE}/games?id=${id}`, {
      headers: { 'x-api-key': API_KEY },
    });
    const d = await r.json();
    return Array.isArray(d) ? d[0] ?? null : null;
  } catch { return null; }
}

exports.handler = async () => {
  if (!API_KEY) return { statusCode: 200, body: 'No EasyScore API key — skipping' };

  const now     = new Date();
  const in60    = new Date(now.getTime() + 60 * 60 * 1000);
  const maxKnown = Math.max(...KNOWN_IDS);
  const probeIds = Array.from({ length: 10 }, (_, i) => maxKnown + i + 1);
  const allIds   = [...new Set([...KNOWN_IDS, ...probeIds])];

  const games = (await Promise.all(allIds.map(fetchGame))).filter(g =>
    g && (g.AwayTeam === TEAM_ID || g.HomeTeam === TEAM_ID) &&
    !g.GameEnded && !g.GameStarted && g.StartTime
  );

  const sent = [];
  for (const g of games) {
    const start = new Date(g.StartTime);
    // Game starts within the next 60 minutes
    if (start > now && start <= in60) {
      const isAway   = g.AwayTeam === TEAM_ID;
      const opp      = isAway ? g.HomeTeamName : g.AwayTeamName;
      const oppShort = opp.split(' ').slice(-1)[0];
      const venue    = isAway ? opp + ' Field' : 'Heerenschürli';
      try {
        const result = await sendPush({
          title:   '⚾ Game Day!',
          message: `BAR3 vs ${oppShort} in ~1h at ${venue}`,
          url:     '/schedule.html',
          type:    'pregame',
        });
        sent.push({ gameId: g.ID, recipients: result.recipients });
        console.log(`Pre-game notification sent for game ${g.ID} (${result.recipients} recipients)`);
      } catch (e) {
        console.error(`Pre-game notify failed for game ${g.ID}:`, e.message);
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ checked: allIds.length, upcoming: games.length, sent }),
  };
};
