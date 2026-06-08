// Netlify Edge Function — injects per-article OG/Twitter meta tags server-side
// so WhatsApp, iMessage, Twitter/X, and Instagram previews see the correct
// article image and title (those crawlers don't execute JavaScript).

const BASE = 'https://barracudas3.netlify.app/';
const DEFAULT_IMG = BASE + 'assets/og-image.jpg';

// Mirrors the OG-relevant fields from NEWS_ARTICLES in data-schedule.js.
// Update this map whenever a new article is added.
const ARTICLE_META = {
  'challengers-g2-june7': {
    title:   'Vasquez Dominates, BAR3 Complete Sweep with 15–7 Win in Game 2',
    desc:    'Michael Vasquez threw four dominant shutout innings and BAR3\'s offense erupted in the third and sixth to clinch the Sunday sweep over Challengers 2 at Heerenschürli.',
    img:     BASE + 'assets/news-player-glove.jpg',
  },
  'challengers-g1-june7': {
    title:   'Barracudas 3 Outlast Challengers in Wild 23–13 Eight-Inning Battle',
    desc:    'BAR3 exploded for 23 runs and 19 hits, withstanding a pair of Challengers surges to claim Game 1 — Rosa Lima\'s HR the exclamation mark on a dominant afternoon.',
    img:     BASE + 'assets/news/recap-june7-scoreboard.jpg',
  },
  'nla-june2': {
    title:   'NLA Barracudas Overpower BAR3 17–3 in Lopsided Inter-Club Clash',
    desc:    'Zürich\'s NLA squad handed BAR3 a humbling 17–3 defeat at Heerenschürli on Tuesday evening, exposing the gap between the club\'s squads.',
    img:     BASE + 'assets/news/recap-june2-ondeck.jpg',
  },
  'frogs-doubleheader-may30': {
    title:   'BAR3 Sweep Frogs with Back-to-Back Mercy Rule Annihilations — 48 Runs, 7 Innings',
    desc:    'Vasquez and Elias each delivered mercy-rule gems as BAR3 outscored Sissach 48–1 across both games, capitalising on 11 Frogs errors.',
    img:     BASE + 'assets/nightgame-7.jpg',
  },
  'pink-game-may5': {
    title:   'Barracudas 3 Fall 17–5 in Pink Game as NLA Squad Proves Too Strong',
    desc:    'Under the lights of Heerenschürli, the Barracudas 3 donned their pink uniforms for breast cancer awareness — but the NLA squad had other plans.',
    img:     BASE + 'assets/news-pink-game-02.jpg',
  },
};

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Replace the content attribute of a <meta> tag that has a known id attribute.
function setMetaById(html, metaId, value) {
  return html.replace(
    new RegExp(`(<meta[^>]+id="${metaId}"[^>]+content=")[^"]*(")`),
    `$1${esc(value)}$2`
  );
}

export default async function handler(request, context) {
  const url = new URL(request.url);
  const id  = url.searchParams.get('id');
  const article = id ? ARTICLE_META[id] : null;

  // No recognised article — serve the page as-is.
  if (!article) return context.next();

  const response = await context.next();
  let html = await response.text();

  const img   = article.img || DEFAULT_IMG;
  const title = article.title;
  const desc  = article.desc;

  html = setMetaById(html, 'metaOgTitle',  title);
  html = setMetaById(html, 'metaTwTitle',  title);
  html = setMetaById(html, 'metaOgDesc',   desc);
  html = setMetaById(html, 'metaTwDesc',   desc);
  html = setMetaById(html, 'metaOgImage',  img);
  html = setMetaById(html, 'metaTwImage',  img);
  html = setMetaById(html, 'metaOgUrl',    url.href);

  // Also update the <title> tag so link previews show the article headline.
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${esc(title)} — Zürich Barracudas</title>`
  );

  return new Response(html, {
    status:  response.status,
    headers: response.headers,
  });
}

export const config = { path: '/article.html' };
