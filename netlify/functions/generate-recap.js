// Auto-generate trilingual game recap using Claude API
// Triggered by admin panel or after detecting a newly-finished game

const Anthropic = require('@anthropic-ai/sdk');
const { requireAuth } = require('./_auth');

const ES_KEY   = process.env.EASYSCORE_API_KEY;
const TEAM_ID  = parseInt(process.env.EASYSCORE_TEAM_ID || '13054');
const BASE     = 'https://api.easyscore.com/v2';
const HEADERS  = { 'x-api-key': ES_KEY };

async function fetchGame(id) {
  const r = await fetch(`${BASE}/games?id=${id}`, { headers: HEADERS });
  const d = await r.json();
  return Array.isArray(d) ? d[0] ?? null : null;
}

function buildLineScoreText(ls) {
  if (!ls) return '';
  const away = ls.away || {}, home = ls.home || {};
  const innings = parseInt(ls.innings || 9);
  const nums = Array.from({ length: innings }, (_, i) => i + 1);
  const awayLine = nums.map(i => away.line?.[i] ?? '·').join(' ');
  const homeLine = nums.map(i => home.line?.[i] ?? '·').join(' ');
  return `${away.abbr || '?'}: ${awayLine}  (R:${away.totals?.R} H:${away.totals?.H} E:${away.totals?.E})\n` +
         `${home.abbr || '?'}: ${homeLine}  (R:${home.totals?.R} H:${home.totals?.H} E:${home.totals?.E})`;
}

function topPerformers(lineup) {
  if (!Array.isArray(lineup)) return '—';
  const seen = new Set();
  return lineup
    .filter(p => { if (seen.has(p.PlayerID)) return false; seen.add(p.PlayerID); return true; })
    .slice(0, 5)
    .map(p => `${p.Playername || p.Player} (#${p.UniformNr}, ${p.PosStr})`)
    .join(', ');
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  if (!requireAuth(event)) {
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) return { statusCode: 503, body: JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }) };

  let body;
  try { body = JSON.parse(event.body); } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const gameId = parseInt(body.gameId);
  if (!gameId) return { statusCode: 400, body: JSON.stringify({ error: 'gameId required' }) };

  try {
    const g = await fetchGame(gameId);
    if (!g) return { statusCode: 404, body: JSON.stringify({ error: 'Game not found' }) };
    if (!g.GameEnded) return { statusCode: 400, body: JSON.stringify({ error: 'Game not finished yet' }) };

    const isAway    = g.AwayTeam === TEAM_ID;
    const bar3Side  = isAway ? 'away' : 'home';
    const oppSide   = isAway ? 'home' : 'away';
    const ls        = g.LineScore?.[0] ?? null;
    const bar3Score = ls?.[bar3Side]?.totals?.R ?? (isAway ? g.AwayRuns : g.HomeRuns);
    const oppScore  = ls?.[oppSide]?.totals?.R  ?? (isAway ? g.HomeRuns : g.AwayRuns);
    const bar3Name  = isAway ? g.AwayTeamName : g.HomeTeamName;
    const oppName   = isAway ? g.HomeTeamName : g.AwayTeamName;
    const bar3Line  = isAway ? g.AwayTeamLineup : g.HomeTeamLineup;
    const won       = bar3Score > oppScore;
    const date      = g.GameDate?.split('T')[0];
    const field     = g.Field || 'Heerenschürli, Zürich';

    const prompt = `You are a professional baseball journalist. Write a vivid, engaging game recap.

GAME DATA:
Date: ${date}
${isAway ? 'Away' : 'Home'} team: Zürich Barracudas 3 (BAR3)
${isAway ? 'Home' : 'Away'} team: ${oppName}
Final score: BAR3 ${bar3Score} — ${oppScore} ${oppName.split(' ').pop()}
Result for Barracudas: ${won ? 'WIN ✓' : 'LOSS ✗'}
Venue: ${field}
Innings: ${ls?.innings ?? 9}

Score by inning:
${buildLineScoreText(ls)}

BAR3 lineup: ${topPerformers(bar3Line)}

Write the recap in THREE languages. Return ONLY valid JSON (no markdown, no explanation):
{
  "title_en": "short punchy English headline (max 10 words)",
  "title_es": "Spanish headline",
  "title_de": "German headline",
  "subtitle_en": "1-sentence English subtitle",
  "subtitle_es": "Spanish subtitle",
  "subtitle_de": "German subtitle",
  "body_en": "3-4 paragraph English recap. Use player stats from lineup. Keep proper nouns (player names, team names, Heerenschürli) unchanged.",
  "body_es": "Spanish recap same length",
  "body_de": "German recap same length",
  "tag_en": "e.g. Game Recap",
  "tag_es": "Resumen de Partido",
  "tag_de": "Spielbericht"
}`;

    const client   = new Anthropic({ apiKey: anthropicKey });
    const response = await client.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages:   [{ role: 'user', content: prompt }],
    });

    const text = response.content[0]?.text ?? '';
    let article;
    try {
      // Strip any accidental markdown fences
      const clean = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();
      article = JSON.parse(clean);
    } catch {
      return { statusCode: 500, body: JSON.stringify({ error: 'Claude returned invalid JSON', raw: text.slice(0, 500) }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status:  'draft',
        gameId,
        date,
        bar3Score,
        oppScore,
        opponent: oppName,
        won,
        article,
        generatedAt: new Date().toISOString(),
      }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
