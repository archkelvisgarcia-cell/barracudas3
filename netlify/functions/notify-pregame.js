// Scheduled function: fires every 30 minutes, checks if a BAR3 game
// starts within the next 30 minutes and sends a "Game Day!" notification.
// Schedule set in netlify.toml: every 30 minutes.

const { sendOneSignal } = require('./notify');

const API_KEY  = process.env.EASYSCORE_API_KEY;
const TEAM_ID  = parseInt(process.env.EASYSCORE_TEAM_ID || '13054');
const BASE_URL = 'https://api.easyscore.com/v2';
const KNOWN_IDS = [19245, 19246, 19251, 19252, 19255, 19256, 19259, 19264, 19271, 19272];
const SENT_KEY  = 'pregame_sent_'; // used as prefix for dedup via env check

async function fetchGame(id) {
  try {
    const r = await fetch(`${BASE_URL}/games?id=${id}`, {
      headers: { 'x-api-key': API_KEY },
    });
    const d = await r.json();
    return Array.isArray(d) ? d[0] ?? null : null;
  } catch { return null; }
}

exports.handler = async () => {
  if (!API_KEY) return { statusCode: 200, body: 'No API key' };

  const now    = new Date();
  const in30   = new Date(now.getTime() + 30 * 60 * 1000);
  const maxKnown = Math.max(...KNOWN_IDS);
  const probeIds = Array.from({ length: 10 }, (_, i) => maxKnown + i + 1);
  const allIds   = [...new Set([...KNOWN_IDS, ...probeIds])];

  const games = (await Promise.all(allIds.map(fetchGame))).filter(g =>
    g && (g.AwayTeam === TEAM_ID || g.HomeTeam === TEAM_ID) && !g.GameEnded && !g.GameStarted
  );

  for (const g of games) {
    if (!g.StartTime) continue;
    const start = new Date(g.StartTime);
    // Game starts within the next 30 minutes
    if (start > now && start <= in30) {
      const isAway = g.AwayTeam === TEAM_ID;
      const opp    = isAway ? g.HomeTeamName : g.AwayTeamName;
      const oppShort = opp.split(' ').slice(-1)[0];
      try {
        await sendOneSignal({
          title:   '⚾ Game Day!',
          message: `BAR3 vs ${oppShort} starting soon at Heerenschürli`,
          url:     '/schedule.html',
          type:    'pregame',
        });
        console.log(`Pre-game notification sent for game ${g.ID}`);
      } catch (e) {
        console.error('Pre-game notify failed:', e.message);
      }
    }
  }

  return { statusCode: 200, body: 'OK' };
};
