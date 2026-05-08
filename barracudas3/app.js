/* ============================================================
   BARRACUDAS — App scripts
============================================================ */

// ── GAMES — single source of truth ──────────────────────────
const GAMES = [
  {
    date: '2026-04-19', time: '14:00', label: 'APR 19 · 2026',
    opponent: 'Zürich Flyers', opponentLogo: 'assets/teams/flyers.png',
    location: 'Away · Zürich', league: 'Gruppe A',
    result: 'L', score: { us: 4, them: 14 }, innings: 7, notes: '',
  },
  {
    date: '2026-04-26', time: '14:00', label: 'APR 26 · 2026',
    opponent: 'Therwil Indians', opponentLogo: 'assets/teams/indians.png',
    location: 'Away · Therwil', league: 'Gruppe A',
    result: 'L', score: { us: 3, them: 15 }, innings: 7, notes: '',
  },
  {
    date: '2026-05-02', time: '12:00', label: 'MAY 2 · 2026 · G1',
    opponent: 'Luzern Eagles', opponentLogo: 'assets/teams/eagles.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: 'L', score: { us: 9, them: 23 }, innings: 9, notes: 'HR · K.Garcia',
  },
  {
    date: '2026-05-02', time: '15:00', label: 'MAY 2 · 2026 · G2',
    opponent: 'Luzern Eagles', opponentLogo: 'assets/teams/eagles.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: 'L', score: { us: 9, them: 10 }, innings: 9, notes: '2B · J.Rosa Lima · 2 RBI',
  },
  {
    date: '2026-05-05', time: '18:30', label: 'MAY 5 · 2026',
    opponent: 'Barracudas NLA', opponentLogo: 'assets/teams/BARLOGO.png',
    location: 'Home · Heerenschürli', league: 'NL vs NLA · Pink Game',
    result: 'L', score: { us: 5, them: 17 }, innings: 7,
    notes: '🩷 Pink Game', recapUrl: 'pink-game-recap.html',
  },
  {
    date: '2026-05-30', time: '11:00', label: 'MAY 30 · 2026 · G1',
    opponent: 'Sissach Frogs', opponentLogo: 'assets/teams/frogs.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-05-30', time: '14:00', label: 'MAY 30 · 2026 · G2',
    opponent: 'Sissach Frogs', opponentLogo: 'assets/teams/frogs.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-06-02', time: '18:30', label: 'JUN 2 · 2026',
    opponent: 'Barracudas NLA', opponentLogo: 'assets/teams/BARLOGO.png',
    location: 'Home · Heerenschürli', league: 'NL vs NLA',
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-06-07', time: '11:00', label: 'JUN 7 · 2026 · G1',
    opponent: 'Challengers 2', opponentLogo: 'assets/teams/challengers.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-06-07', time: '14:00', label: 'JUN 7 · 2026 · G2',
    opponent: 'Challengers 2', opponentLogo: 'assets/teams/challengers.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: null, score: null, innings: null, notes: '',
  },
];

// ── HERO BACKGROUND CAROUSEL — Pink Game photos ─────────────
const HERO_BG_IMAGES = [
  'assets/nightgame-1.jpg',
  'assets/nightgame-3.jpg',
  'assets/nightgame-7.jpg',
  'assets/nightgame-9.jpg',
  'assets/nightgame-14.jpg',
  'assets/nightgame-16.jpg',
  'assets/nightgame-20.jpg',
  'assets/nightgame-22.jpg',
  'assets/nightgame-24.jpg',
  'assets/nightgame-26.jpg',
  'assets/pink-game-team.jpg',
  'assets/news-pink-game-02.jpg',
  'assets/news-pink-game-10.jpg',
  'assets/pink-game-22.jpg',
];

// ── NEWS ARTICLES — single source of truth ──────────────────
const NEWS_ARTICLES = [
  {
    id: 'pink-game-may5',
    date: 'May 5, 2026', tag: '🩷 Pink Game', tagColor: '#FF3EA5',
    headline: 'Barracudas 3 Fall 17–5 in Pink Game as NLA Squad Proves Too Strong',
    summary: 'Under the lights of Heerenschürli, the Barracudas 3 donned their pink uniforms for breast cancer awareness — but the NLA squad had other plans.',
    image: 'assets/news-pink-game-02.jpg',
    href: 'pink-game-recap.html', featured: true,
    score: { us: 5, them: 17 }, opponent: 'Barracudas NLA', location: 'Home · Heerenschürli',
  },
  {
    id: 'eagles-game1-may2',
    date: 'May 2, 2026', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'Eagles explode for 23 in Game 1 shellacking',
    summary: 'The Barracudas dropped Game 1 of the home doubleheader 23–9 at Heerenschürli. Kelvis Garcia was the lone bright spot — 3-for-5 with a home run, 2 doubles and 3 RBI.',
    body: 'The Barracudas dropped Game 1 of the home doubleheader 23–9 at Heerenschürli. Kelvis Garcia was the lone bright spot — 3-for-5 with a home run, 2 doubles and 3 RBI. Hansel Rodriguez added 3 hits off the bench. Wilkin Peguero took the loss, lasting 3.1 innings and allowing 8 earned runs. The Cudas went 6-for-19 with RISP and stranded 8.',
    image: 'assets/news-game1-batter.jpg',
    href: 'article.html?id=eagles-game1-may2',
    score: { us: 9, them: 23 }, opponent: 'Luzern Eagles', location: 'Home · Heerenschürli',
    notes: 'HR · K.Garcia · 9 innings',
  },
  {
    id: 'eagles-game2-may2',
    date: 'May 2, 2026', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'Barracudas fall in heartbreaker, 10–9 in seven',
    summary: 'In a much tighter Game 2, the Cudas fought back repeatedly but fell 10–9 in seven innings. Zürich led 7–3 after four before the Eagles answered with 6 runs over the final three frames.',
    body: 'In a much tighter Game 2, the Cudas fought back repeatedly but fell 10–9 in seven innings. Zürich led 7–3 after four before the Eagles answered with 6 runs over the final three frames. Jhomar Rosa Lima led the offense (2-for-4, 2 RBI). Elvis Del Valle scored three times and swiped a bag. Vasquez started, gave way to Elias and Rodriguez — the bullpen couldn\'t seal it.',
    image: 'assets/news-game1-slide.jpg',
    href: 'article.html?id=eagles-game2-may2',
    score: { us: 9, them: 10 }, opponent: 'Luzern Eagles', location: 'Home · Heerenschürli',
    notes: '2B · J.Rosa Lima · 2 RBI · 7 innings',
  },
  {
    id: 'cardinals-bern',
    date: 'Sep 21, 2024', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'Late rally sinks Cardinals in Bern',
    summary: 'A clutch late-inning rally on the road sealed the win for the Barracudas against Bern Cardinals.',
    image: 'assets/news-vs-eagles-2023.jpg',
    href: 'article.html?id=cardinals-bern',
  },
  {
    id: 'arregoitia-profile',
    date: 'Sep 12, 2024', tag: 'Player Profile', tagColor: '#F0B429',
    headline: 'Inside #77\'s monster summer at the plate',
    summary: 'Jhon Arregoitia put together an impressive stretch in the second half of the 2024 season, anchoring the lineup at first base.',
    image: 'assets/news-two-players.jpg',
    href: 'article.html?id=arregoitia-profile',
  },
  {
    id: 'garcia-signing',
    date: 'Aug 30, 2024', tag: 'Roster Move', tagColor: '#F0B429',
    headline: 'Garcia signs on for 2026 season',
    summary: 'Kelvis Garcia officially re-signs with the Barracudas 3 ahead of the 2026 season, set to bring his two-way skill set back to Heerenschürli.',
    image: 'assets/news-batter-action.jpg',
    href: 'article.html?id=garcia-signing',
  },
  {
    id: 'peguero-cg',
    date: 'Aug 24, 2024', tag: 'Pitching', tagColor: '#F0B429',
    headline: 'Peguero\'s complete game shuts the door',
    summary: 'Wilkin Peguero delivered a dominant complete-game performance, shutting out the opposition and giving the Barracudas a statement win.',
    image: 'assets/news-pitcher.jpg',
    href: 'article.html?id=peguero-cg',
  },
  {
    id: 'open-tryouts',
    date: 'Aug 12, 2024', tag: 'Club', tagColor: '#F0B429',
    headline: 'Open tryouts: how to join the Barracudas',
    summary: 'Everything you need to know about joining Zürich\'s premier baseball club — from tryout dates to what to bring and what to expect.',
    image: 'assets/news-game1-dugout.jpg',
    href: 'article.html?id=open-tryouts',
  },
  {
    id: 'rivera-leadership',
    date: 'Jul 28, 2024', tag: 'Captain\'s Corner', tagColor: '#F0B429',
    headline: 'Rivera on leadership, language, the long season',
    summary: 'An inside look at how the Barracudas captain navigates a multilingual locker room, the grind of a full Swiss season, and what it means to lead.',
    image: 'assets/news-player-field.jpg',
    href: 'article.html?id=rivera-leadership',
  },
  // ← New articles go here, newest first
];

// SHARE — copy current page URL to clipboard with visual feedback
function copyLink(btn) {
  navigator.clipboard.writeText(window.location.href).then(function () {
    btn.classList.add('copied');
    var prev = btn.title;
    btn.title = 'Copied!';
    setTimeout(function () {
      btn.classList.remove('copied');
      btn.title = prev;
    }, 2000);
  });
}

// THEME TOGGLE
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const stored = localStorage.getItem('barracudas-theme');
  if (stored) root.setAttribute('data-theme', stored);
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('barracudas-theme', next);
  });
})();

// MOBILE MENU
(function () {
  const menu = document.getElementById('mobile-menu');
  const open  = document.getElementById('menu-open');
  const close = document.getElementById('menu-close');
  if (!menu) return;
  open  && open.addEventListener('click',  () => menu.classList.add('open'));
  close && close.addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

// SCROLL REVEAL
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(e => io.observe(e));
})();

// ── PLAYER REGISTRY — global lookup for modal ───────────────
const PLAYER_REGISTRY = new Map();

// ── EXTENDED STATS — keyed by player num ─────────────────────
const PLAYER_EXTENDED_DATA = {
  '20': { // Kelvis Garcia
    fullName: 'Garcia Rondon Kelvis Carmelo',
    age: 38, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:30, AB:27, R:12, H:10, '2B':2, '3B':0, HR:2, RBI:11, BB:3, SO:4, SB:1, CS:0, HBP:0, SF:0, AVG:'.370', OBP:'.433', SLG:'.667', OPS:'1.100' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',  spot:5, pos:'2B',       AB:3, R:0, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:2, SB:0, AVG:'.370' },
        { date:'05/02', opp:'Luzern Eagles',   spot:5, pos:'2B',       AB:4, R:2, H:1, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.375' },
        { date:'05/02', opp:'Luzern Eagles',   spot:5, pos:'2B/3B',    AB:5, R:3, H:3, '2B':2, HR:1, RBI:3, BB:0, SO:0, SB:0, AVG:'.400' },
        { date:'04/26', opp:'Lausanne Indians', spot:5, pos:'2B/RF',   AB:4, R:2, H:2, '2B':0, HR:1, RBI:1, BB:0, SO:0, SB:0, AVG:'.333' },
        { date:'04/26', opp:'Lausanne Indians', spot:5, pos:'SS/2B/P', AB:6, R:3, H:3, '2B':0, HR:0, RBI:6, BB:0, SO:0, SB:1, AVG:'.273' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:5, pos:'PH/P',   AB:1, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.000' },
      ],
    },
    pitching: {
      season: { G:2, GS:0, IP:'3.1', H:2, R:0, ER:0, BB:1, SO:7, HR:0, HBP:1, WP:1, BF:14, WL:'0-0', SV:0, OppAVG:'.167', WHIP:'0.90', ERA:'0.00' },
      log: [
        { date:'04/26', opp:'Lausanne Indians',  IP:'2.1', H:2, R:0, ER:0, BB:0, SO:5, HBP:0, WP:1, BF:9,  ERA:'0.00' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'1.0', H:0, R:0, ER:0, BB:1, SO:2, HBP:1, WP:0, BF:5,  ERA:'0.00' },
      ],
    },
    fielding: {
      season: { G:7, 'IP':'47.0', PO:13, A:9, E:2, DP:0, PB:0, RF:'4.21', FPct:'.917' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'2B',       IP:'7.0', PO:2, A:3, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'2B',       IP:'7.0', PO:2, A:1, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'2B/3B',    IP:'9.0', PO:3, A:1, E:2, FPct:'.667'  },
        { date:'04/26', opp:'Lausanne Indians', pos:'2B/RF',    IP:'8.0', PO:3, A:2, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'2B/P/SS',  IP:'7.0', PO:2, A:2, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P/PH',    IP:'1.0', PO:0, A:0, E:0, FPct:'—'     },
      ],
    },
  },

  '27': { // Elvis Del Valle Diaz
    fullName: 'Del Valle Diaz Elvis', age: 31, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:37, AB:29, R:15, H:10, '2B':1, '3B':2, HR:0, RBI:4, BB:7, SO:5, SB:4, CS:0, HBP:1, SF:0, AVG:'.345', OBP:'.486', SLG:'.517', OPS:'1.004' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:1, pos:'SS',     AB:3, R:2, H:1, '2B':0, HR:0, RBI:0, BB:1, SO:1, SB:0, AVG:'.345' },
        { date:'05/02', opp:'Luzern Eagles',    spot:1, pos:'SS',     AB:4, R:3, H:1, '2B':0, HR:0, RBI:0, BB:1, SO:1, SB:1, AVG:'.346' },
        { date:'05/02', opp:'Luzern Eagles',    spot:1, pos:'SS/2B',  AB:5, R:0, H:2, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.364' },
        { date:'04/26', opp:'Lausanne Indians', spot:1, pos:'SS',     AB:3, R:1, H:1, '2B':1, HR:0, RBI:0, BB:1, SO:1, SB:1, AVG:'.353' },
        { date:'04/26', opp:'Lausanne Indians', spot:1, pos:'P/SS',   AB:5, R:3, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.357' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:1, pos:'SS',    AB:3, R:3, H:1, '2B':0, HR:0, RBI:0, BB:2, SO:0, SB:1, AVG:'.444' },
      ],
    },
    pitching: {
      season: { G:1, GS:1, IP:'0.2', H:2, R:8, ER:1, BB:3, SO:0, HR:0, HBP:1, WP:2, BF:11, WL:'0-0', SV:0, OppAVG:'.333', WHIP:'7.50', ERA:'10.50' },
      log: [
        { date:'04/26', opp:'Lausanne Indians', IP:'0.2', H:2, R:8, ER:1, BB:3, SO:0, HBP:1, WP:2, BF:11, ERA:'10.50' },
      ],
    },
    fielding: {
      season: { G:7, IP:'51.0', PO:12, A:18, E:4, DP:0, PB:0, RF:'5.29', FPct:'.882' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'SS',     IP:'7.0', PO:1, A:4, E:0, FPct:'.882' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'SS',     IP:'7.0', PO:3, A:3, E:0, FPct:'.862' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'2B/SS',  IP:'9.0', PO:2, A:3, E:0, FPct:'.826' },
        { date:'04/26', opp:'Lausanne Indians', pos:'SS',     IP:'8.0', PO:3, A:4, E:2, FPct:'.778' },
        { date:'04/26', opp:'Lausanne Indians', pos:'P/SS',   IP:'7.0', PO:1, A:0, E:1, FPct:'.778' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'SS',    IP:'5.0', PO:0, A:2, E:0, FPct:'.857' },
      ],
    },
  },

  '1': { // Juan Malchans
    fullName: 'Malchans Caridad Juan Leonel', bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:36, AB:30, R:12, H:7, '2B':3, '3B':0, HR:0, RBI:12, BB:4, SO:3, SB:2, CS:0, HBP:2, SF:0, AVG:'.233', OBP:'.361', SLG:'.333', OPS:'.694' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:2, pos:'DH/P',   AB:4, R:1, H:2, '2B':1, HR:0, RBI:2, BB:0, SO:1, SB:0, AVG:'.233' },
        { date:'05/02', opp:'Luzern Eagles',    spot:2, pos:'DH',     AB:5, R:1, H:2, '2B':1, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.192' },
        { date:'05/02', opp:'Luzern Eagles',    spot:2, pos:'DH',     AB:5, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.143' },
        { date:'04/26', opp:'Lausanne Indians', spot:2, pos:'DH/2B',  AB:4, R:0, H:0, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.188' },
        { date:'04/26', opp:'Lausanne Indians', spot:2, pos:'2B/P',   AB:6, R:4, H:1, '2B':0, HR:0, RBI:3, BB:0, SO:0, SB:0, AVG:'.250' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:2, pos:'2B',    AB:3, R:3, H:1, '2B':0, HR:0, RBI:2, BB:2, SO:1, SB:0, AVG:'.333' },
      ],
    },
    pitching: {
      season: { G:2, GS:0, IP:'4.2', H:4, R:2, ER:1, BB:3, SO:4, HR:0, HBP:0, WP:4, BF:22, WL:'1-0', SV:0, OppAVG:'.211', WHIP:'1.50', ERA:'1.50' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'0.2', H:0, R:0, ER:0, BB:0, SO:0, HBP:0, WP:0, BF:2,  ERA:'1.50' },
        { date:'04/26', opp:'Lausanne Indians', IP:'4.0', H:4, R:2, ER:1, BB:3, SO:4, HBP:0, WP:4, BF:19, ERA:'1.75' },
      ],
    },
    fielding: {
      season: { G:7, IP:'22.2', PO:5, A:1, E:2, DP:0, PB:0, RF:'2.38', FPct:'.750' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'DH/P',  IP:'0.2', PO:0, A:0, E:0, FPct:'.750' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'DH',    IP:'0.0', PO:0, A:0, E:0, FPct:'.750' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'DH',    IP:'0.0', PO:0, A:0, E:0, FPct:'.750' },
        { date:'04/26', opp:'Lausanne Indians', pos:'2B/DH', IP:'2.0', PO:0, A:1, E:0, FPct:'.750' },
        { date:'04/26', opp:'Lausanne Indians', pos:'2B/P',  IP:'7.0', PO:1, A:0, E:1, FPct:'.714' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'2B',   IP:'5.0', PO:1, A:0, E:1, FPct:'.800' },
      ],
    },
  },

  '28': { // Francisco Robles Noa
    fullName: 'Francisco Robles Noa', age: 26, bats: 'R', throws: 'R',
    batting: {
      season: { G:6, PA:17, AB:13, R:4, H:1, '2B':0, '3B':0, HR:0, RBI:0, BB:3, SO:8, SB:1, CS:0, HBP:1, SF:0, AVG:'.077', OBP:'.294', SLG:'.077', OPS:'.371' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:9, pos:'RF', AB:4, R:1, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:3, SB:1, AVG:'.077' },
        { date:'05/02', opp:'Luzern Eagles',    spot:9, pos:'RF', AB:2, R:1, H:0, '2B':0, HR:0, RBI:0, BB:1, SO:0, SB:0, AVG:'.111' },
        { date:'04/26', opp:'Lausanne Indians', spot:9, pos:'RF', AB:2, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:2, SB:0, AVG:'.143' },
        { date:'04/26', opp:'Lausanne Indians', spot:9, pos:'RF', AB:3, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:2, SB:0, AVG:'.200' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:9, pos:'RF', AB:2, R:2, H:1, '2B':0, HR:0, RBI:0, BB:2, SO:1, SB:0, AVG:'.500' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:6, IP:'29.1', PO:3, A:0, E:0, DP:0, PB:0, RF:'.92', FPct:'1.000' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'RF', IP:'7.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'RF', IP:'6.0', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'RF', IP:'0.1', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'RF', IP:'6.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'RF', IP:'5.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'RF', IP:'5.0', PO:0, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '15': { // Jose Medina
    fullName: 'Medina Reyes Jose Antonio', age: 38, bats: 'S', throws: 'R', captain: true,
    batting: {
      season: { G:7, PA:33, AB:22, R:6, H:10, '2B':2, '3B':2, HR:0, RBI:11, BB:6, SO:2, SB:4, CS:0, HBP:4, SF:1, AVG:'.455', OBP:'.606', SLG:'.727', OPS:'1.333' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:3, pos:'C', AB:4, R:0, H:2, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.455' },
        { date:'05/02', opp:'Luzern Eagles',    spot:3, pos:'C', AB:4, R:0, H:2, '2B':0, HR:0, RBI:2, BB:0, SO:1, SB:0, AVG:'.444' },
        { date:'05/02', opp:'Luzern Eagles',    spot:3, pos:'C', AB:2, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.429' },
        { date:'04/26', opp:'Lausanne Indians', spot:6, pos:'C', AB:2, R:0, H:1, '2B':1, HR:0, RBI:0, BB:1, SO:0, SB:2, AVG:'.500' },
        { date:'04/26', opp:'Lausanne Indians', spot:6, pos:'C', AB:2, R:1, H:1, '2B':0, HR:0, RBI:1, BB:3, SO:0, SB:0, AVG:'.500' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:7, pos:'C', AB:4, R:2, H:2, '2B':0, HR:0, RBI:3, BB:1, SO:1, SB:0, AVG:'.500' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:7, IP:'47.0', PO:48, A:2, E:1, DP:0, PB:7, SBAtt:12, RF:'9.57', FPct:'.980' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'C', IP:'7.0', PO:3,  A:0, E:0, PB:2, SBAtt:2, FPct:'.980' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'C', IP:'7.0', PO:2,  A:0, E:0, PB:1, SBAtt:1, FPct:'.979' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'C', IP:'5.0', PO:5,  A:0, E:0, PB:0, SBAtt:2, FPct:'.978' },
        { date:'04/26', opp:'Lausanne Indians', pos:'C', IP:'8.0', PO:8,  A:0, E:0, PB:1, SBAtt:2, FPct:'.976' },
        { date:'04/26', opp:'Lausanne Indians', pos:'C', IP:'7.0', PO:9,  A:0, E:0, PB:3, SBAtt:2, FPct:'.970' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'C', IP:'5.0', PO:9,  A:2, E:0, PB:0, SBAtt:1, FPct:'.958' },
      ],
    },
  },

  '23': { // Sascha Litscher
    fullName: 'Litscher Sascha', age: 33, bats: 'R', throws: 'R',
    batting: {
      season: { G:2, PA:2, AB:2, R:1, H:1, '2B':0, '3B':0, HR:0, RBI:0, BB:0, SO:1, SB:1, CS:0, HBP:0, SF:0, AVG:'.500', OBP:'.500', SLG:'.500', OPS:'1.000' },
      log: [
        { date:'05/02', opp:'Luzern Eagles', spot:3, pos:'1B', AB:2, R:1, H:1, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:1, AVG:'.500' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:2, IP:'5.0', PO:4, A:1, E:1, DP:0, PB:0, RF:'9.00', FPct:'.833' },
      log: [
        { date:'05/02', opp:'Luzern Eagles', pos:'1B', IP:'1.0', PO:1, A:0, E:0, FPct:'.833' },
        { date:'05/02', opp:'Luzern Eagles', pos:'1B', IP:'4.0', PO:3, A:1, E:1, FPct:'.800' },
      ],
    },
  },

  '34': { // Jhomar Lima
    fullName: 'Rosa Lima Jhomar Bienvenido', age: 32, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:34, AB:27, R:9, H:15, '2B':2, '3B':0, HR:3, RBI:18, BB:6, SO:1, SB:1, CS:0, HBP:0, SF:1, AVG:'.556', OBP:'.618', SLG:'.963', OPS:'1.581' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:4, pos:'3B',   AB:2, R:0, H:2, '2B':0, HR:0, RBI:1,  BB:1, SO:0, SB:0, AVG:'.556' },
        { date:'05/02', opp:'Luzern Eagles',    spot:4, pos:'3B',   AB:4, R:1, H:2, '2B':0, HR:0, RBI:2,  BB:1, SO:0, SB:0, AVG:'.520' },
        { date:'05/02', opp:'Luzern Eagles',    spot:4, pos:'3B/C', AB:4, R:3, H:2, '2B':0, HR:0, RBI:0,  BB:1, SO:0, SB:1, AVG:'.524' },
        { date:'04/26', opp:'Lausanne Indians', spot:4, pos:'3B',   AB:4, R:0, H:1, '2B':0, HR:0, RBI:0,  BB:0, SO:1, SB:0, AVG:'.529' },
        { date:'04/26', opp:'Lausanne Indians', spot:4, pos:'3B',   AB:5, R:2, H:3, '2B':2, HR:1, RBI:5,  BB:1, SO:0, SB:0, AVG:'.615' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:4, pos:'3B',  AB:4, R:1, H:4, '2B':0, HR:1, RBI:6,  BB:1, SO:0, SB:0, AVG:'.625' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:7, IP:'50.0', PO:4, A:4, E:2, DP:0, PB:1, SBAtt:2, RF:'1.44', FPct:'.800' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'3B',   IP:'6.0', PO:2, A:0, E:0, FPct:'.800' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'3B',   IP:'7.0', PO:0, A:3, E:1, FPct:'.750' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'3B/C', IP:'9.0', PO:2, A:0, E:0, FPct:'.750' },
        { date:'04/26', opp:'Lausanne Indians', pos:'3B',   IP:'8.0', PO:0, A:0, E:0, FPct:'.500' },
        { date:'04/26', opp:'Lausanne Indians', pos:'3B',   IP:'7.0', PO:0, A:0, E:1, FPct:'.500' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'3B',  IP:'5.0', PO:0, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '77': { // Jhon Arregoitia
    fullName: 'Arregoitia Villarreal Jhon Manuel', age: 32, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:35, AB:29, R:8, H:3, '2B':1, '3B':0, HR:0, RBI:6, BB:6, SO:7, SB:1, CS:0, HBP:0, SF:0, AVG:'.103', OBP:'.257', SLG:'.138', OPS:'.395' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:6, pos:'1B',    AB:4, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:3, SB:0, AVG:'.103' },
        { date:'05/02', opp:'Luzern Eagles',    spot:6, pos:'1B',    AB:4, R:0, H:1, '2B':1, HR:0, RBI:2, BB:0, SO:1, SB:0, AVG:'.120' },
        { date:'05/02', opp:'Luzern Eagles',    spot:6, pos:'1B/SS', AB:5, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.095' },
        { date:'04/26', opp:'Lausanne Indians', spot:3, pos:'1B',    AB:5, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:2, SB:0, AVG:'.063' },
        { date:'04/26', opp:'Lausanne Indians', spot:3, pos:'1B',    AB:3, R:3, H:0, '2B':0, HR:0, RBI:1, BB:3, SO:0, SB:0, AVG:'.091' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:3, pos:'1B',   AB:4, R:3, H:1, '2B':0, HR:0, RBI:2, BB:1, SO:1, SB:0, AVG:'.125' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:7, IP:'50.0', PO:25, A:1, E:3, DP:0, PB:0, RF:'4.68', FPct:'.897' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'1B',    IP:'7.0', PO:6, A:0, E:0, FPct:'.897' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'1B',    IP:'6.0', PO:5, A:0, E:0, FPct:'.870' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'1B/SS', IP:'9.0', PO:3, A:0, E:2, FPct:'.833' },
        { date:'04/26', opp:'Lausanne Indians', pos:'1B',    IP:'8.0', PO:5, A:0, E:0, FPct:'.923' },
        { date:'04/26', opp:'Lausanne Indians', pos:'1B',    IP:'7.0', PO:1, A:0, E:1, FPct:'.875' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'1B',   IP:'5.0', PO:3, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '30': { // Carlos Moreno
    fullName: 'Moreno Carlos', age: 31, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:34, AB:29, R:8, H:7, '2B':2, '3B':0, HR:0, RBI:6, BB:2, SO:7, SB:9, CS:0, HBP:3, SF:0, AVG:'.241', OBP:'.353', SLG:'.310', OPS:'.663' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:7, pos:'CF/3B', AB:3, R:1, H:1, '2B':1, HR:0, RBI:0, BB:0, SO:1, SB:1, AVG:'.241' },
        { date:'05/02', opp:'Luzern Eagles',    spot:7, pos:'CF',    AB:3, R:1, H:1, '2B':0, HR:0, RBI:0, BB:0, SO:2, SB:1, AVG:'.231' },
        { date:'05/02', opp:'Luzern Eagles',    spot:7, pos:'CF',    AB:5, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:1, AVG:'.217' },
        { date:'04/26', opp:'Lausanne Indians', spot:7, pos:'CF',    AB:3, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:2, SB:2, AVG:'.222' },
        { date:'04/26', opp:'Lausanne Indians', spot:7, pos:'CF',    AB:6, R:2, H:1, '2B':0, HR:0, RBI:2, BB:0, SO:0, SB:1, AVG:'.200' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:6, pos:'CF',   AB:4, R:2, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:2, SB:0, AVG:'.222' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:7, IP:'51.0', PO:25, A:1, E:0, DP:0, PB:0, RF:'4.59', FPct:'1.000' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'3B/CF', IP:'7.0', PO:4, A:1, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'CF',    IP:'7.0', PO:5, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'CF',    IP:'9.0', PO:4, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'CF',    IP:'8.0', PO:4, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'CF',    IP:'7.0', PO:3, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'CF',   IP:'5.0', PO:1, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '11': { // Clemens Lombriser
    fullName: 'Lombriser Clemens', age: 46, bats: 'R', throws: 'R',
    batting: {
      season: { G:6, PA:24, AB:19, R:6, H:2, '2B':0, '3B':0, HR:0, RBI:5, BB:4, SO:2, SB:0, CS:0, HBP:1, SF:0, AVG:'.105', OBP:'.292', SLG:'.105', OPS:'.397' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:8, pos:'LF', AB:4, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.105' },
        { date:'05/02', opp:'Luzern Eagles',    spot:8, pos:'LF', AB:4, R:1, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.133' },
        { date:'04/26', opp:'Lausanne Indians', spot:8, pos:'LF', AB:4, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.091' },
        { date:'04/26', opp:'Lausanne Indians', spot:8, pos:'LF', AB:4, R:2, H:0, '2B':0, HR:0, RBI:1, BB:2, SO:1, SB:0, AVG:'.143' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:8, pos:'LF', AB:3, R:3, H:1, '2B':0, HR:0, RBI:3, BB:2, SO:0, SB:0, AVG:'.333' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:6, IP:'40.0', PO:7, A:1, E:1, DP:0, PB:0, RF:'1.80', FPct:'.889' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'LF', IP:'7.0', PO:1, A:1, E:0, FPct:'.889' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'LF', IP:'1.0', PO:0, A:0, E:0, FPct:'.857' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'LF', IP:'9.0', PO:3, A:0, E:0, FPct:'.857' },
        { date:'04/26', opp:'Lausanne Indians', pos:'LF', IP:'8.0', PO:0, A:0, E:0, FPct:'.750' },
        { date:'04/26', opp:'Lausanne Indians', pos:'LF', IP:'7.0', PO:3, A:0, E:1, FPct:'.750' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'LF', IP:'8.0', PO:0, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '8': { // Rodriguez Martin Hansel
    fullName: 'Rodriguez Martin Hansel Martin', bats: 'R', throws: 'R',
    batting: {
      season: { G:6, PA:9, AB:8, R:3, H:4, '2B':1, '3B':0, HR:1, RBI:1, BB:0, SO:1, SB:1, CS:0, HBP:1, SF:1, AVG:'.500', OBP:'.556', SLG:'1.000', OPS:'1.556' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:4,  pos:'PH/CF', AB:1, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.500' },
        { date:'05/02', opp:'Luzern Eagles',    spot:9,  pos:'RF/P',  AB:4, R:1, H:3, '2B':1, HR:0, RBI:0, BB:0, SO:1, SB:1, AVG:'.571' },
        { date:'04/26', opp:'Lausanne Indians', spot:10, pos:'P/PH',  AB:2, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.333' },
        { date:'04/26', opp:'Lausanne Indians', spot:9,  pos:'PH/RF', AB:1, R:2, H:1, '2B':0, HR:1, RBI:1, BB:0, SO:0, SB:0, AVG:'1.000' },
      ],
    },
    pitching: {
      season: { G:4, GS:0, IP:'7.2', H:10, R:11, ER:10, BB:10, SO:11, HR:1, HBP:1, WP:3, BF:45, WL:'0-1', SV:0, OppAVG:'.313', WHIP:'2.61', ERA:'9.13' },
      log: [
        { date:'05/02', opp:'Luzern Eagles',    IP:'1.0', H:2, R:3,  ER:3, BB:3, SO:0, HBP:0, WP:0, BF:8,  ERA:'9.13' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'0.1', H:0, R:0,  ER:0, BB:1, SO:1, HBP:0, WP:0, BF:2,  ERA:'7.35' },
        { date:'04/26', opp:'Lausanne Indians', IP:'2.1', H:4, R:3,  ER:2, BB:2, SO:4, HBP:1, WP:2, BF:14, ERA:'7.74' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'4.0', H:4, R:5, ER:5, BB:4, SO:6, HBP:0, WP:1, BF:21, ERA:'8.75' },
      ],
    },
    fielding: {
      season: { G:6, IP:'19.1', PO:3, A:0, E:1, DP:0, PB:0, RF:'1.40', FPct:'.750' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'CF/PH', IP:'1.0', PO:1, A:0, E:1, FPct:'.750' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P',     IP:'1.0', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P/RF',  IP:'9.0', PO:2, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'P/PH',  IP:'2.1', PO:0, A:0, E:0, FPct:'—' },
        { date:'04/26', opp:'Lausanne Indians', pos:'PH/RF', IP:'2.0', PO:0, A:0, E:0, FPct:'—' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P',     IP:'4.0', PO:0, A:0, E:0, FPct:'—' },
      ],
    },
  },

  '36': { // Wilkin Peguero
    fullName: 'Peguero Wilkin', age: 27, bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:3, GS:2, IP:'8.0', H:10, R:11, ER:11, BB:11, SO:10, HR:0, HBP:1, WP:4, BF:45, WL:'1-2', SV:0, OppAVG:'.303', WHIP:'2.63', ERA:'9.62' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'0.2', H:1,  R:3, ER:3, BB:5, SO:0, HBP:0, WP:2, BF:8,  ERA:'9.62' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'3.1', H:6,  R:8, ER:8, BB:5, SO:4, HBP:0, WP:1, BF:21, ERA:'7.64' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'4.0', H:3,  R:0, ER:0, BB:1, SO:6, HBP:1, WP:1, BF:16, ERA:'0.00' },
      ],
    },
    fielding: {
      season: { G:5, IP:'20.0', PO:4, A:1, E:1, DP:0, PB:0, RF:'2.25', FPct:'.833' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'P',     IP:'0.2', PO:0, A:0, E:0, FPct:'.833' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'LF/RF', IP:'7.0', PO:3, A:0, E:1, FPct:'.833' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P',     IP:'3.1', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'LF',   IP:'5.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P',    IP:'4.0', PO:0, A:1, E:0, FPct:'1.000' },
      ],
    },
  },

  '50': { // Andrea Girasole
    fullName: 'Girasole Andrea', age: 38, bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:2, GS:0, IP:'6.2', H:17, R:23, ER:11, BB:5, SO:4, HR:1, HBP:2, WP:5, BF:50, WL:'0-0', SV:0, OppAVG:'.405', WHIP:'3.30', ERA:'11.55' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'1.1', H:7,  R:8,  ER:6, BB:2, SO:2, HBP:0, WP:1, BF:14, ERA:'11.55' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'5.1', H:10, R:15, ER:5, BB:3, SO:2, HBP:2, WP:2, BF:36, ERA:'6.56'  },
      ],
    },
    fielding: {
      season: { G:2, IP:'6.2', PO:0, A:1, E:0, DP:0, PB:0, RF:'1.35', FPct:'1.000' },
      log: [
        { date:'05/05', opp:'Barracudas NLA', pos:'P', IP:'1.1', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',  pos:'P', IP:'5.1', PO:0, A:1, E:0, FPct:'1.000' },
      ],
    },
  },

  '13': { // Angel Elias
    fullName: 'Elias Angel Marcial', bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:3, GS:1, IP:'8.0', H:7, R:11, ER:7, BB:7, SO:12, HR:2, HBP:3, WP:1, BF:42, WL:'1-0', SV:0, OppAVG:'.233', WHIP:'1.75', ERA:'6.13' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'1.1', H:2, R:4, ER:2, BB:2, SO:1,  HBP:0, WP:0, BF:8,  ERA:'6.13' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'2.2', H:3, R:4, ER:2, BB:2, SO:2,  HBP:1, WP:1, BF:14, ERA:'5.25' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'4.0', H:2, R:3, ER:3, BB:3, SO:9,  HBP:2, WP:0, BF:19, ERA:'5.25' },
      ],
    },
    fielding: {
      season: { G:3, IP:'8.0', PO:0, A:0, E:2, DP:0, PB:0, RF:'0.00', FPct:'.000' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'P', IP:'1.1', PO:0, A:0, E:2, FPct:'.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P', IP:'2.2', PO:0, A:0, E:0, FPct:'—'   },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P', IP:'4.0', PO:0, A:0, E:0, FPct:'—'   },
      ],
    },
  },

  '22': { // Michael Vasquez
    fullName: 'Vasquez Nuñez Michael', age: 31, bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:3, GS:3, IP:'12.0', H:11, R:11, ER:8, BB:11, SO:3, HR:0, HBP:3, WP:10, BF:61, WL:'0-1', SV:0, OppAVG:'.239', WHIP:'1.83', ERA:'4.67' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'3.0', H:1, R:2,  ER:2, BB:4, SO:0, HBP:2, WP:1, BF:15, ERA:'4.67' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'3.1', H:2, R:3,  ER:2, BB:5, SO:0, HBP:0, WP:2, BF:18, ERA:'4.67' },
        { date:'04/26', opp:'Lausanne Indians', IP:'5.2', H:8, R:6,  ER:4, BB:2, SO:3, HBP:1, WP:7, BF:28, ERA:'4.94' },
      ],
    },
    fielding: {
      season: { G:3, IP:'12.0', PO:0, A:1, E:1, DP:0, PB:0, RF:'.75', FPct:'.500' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'P', IP:'3.0', PO:0, A:0, E:0, FPct:'.500' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P', IP:'3.1', PO:0, A:1, E:0, FPct:'.500' },
        { date:'04/26', opp:'Lausanne Indians', pos:'P', IP:'5.2', PO:0, A:0, E:1, FPct:'.000' },
      ],
    },
  },
};

// ROSTER — render flip cards directly from JSON stats
(function () {
  const grid = document.querySelector('.roster-grid');
  const data = document.getElementById('roster-data');
  if (!grid || !data) return;

  let roster;
  try { roster = JSON.parse(data.textContent); } catch (e) { return; }

  // Register all players globally
  roster.forEach(p => PLAYER_REGISTRY.set(p.num, p));

  grid.innerHTML = roster.map((p, i) => `
    <div class="player reveal${p.captain ? ' is-captain' : ''}" data-delay="${i % 4}">
      <div class="player-inner">
        <div class="player-face player-front" style="background-image:url('${p.img}');">
          ${p.captain ? '<span class="captain-badge">★ Captain</span>' : ''}
          <span class="player-tap-hint">Tap to flip</span>
        </div>
        <div class="player-face player-back">
          <span class="num-back">#${p.num}</span>
          <div class="back-head">
            <div class="back-flag">${p.flag}${p.captain ? ' <span class="back-cap">★ Captain</span>' : ''}</div>
            <h4>${p.first}<br/>${p.last}</h4>
            <div class="pos">${p.pos} · ${p.country}</div>
          </div>
          <div class="stats">
            ${p.stats.map(s => `
              <div>
                <div class="k">${s.k}</div>
                <div class="v">${s.v}</div>
              </div>
            `).join('')}
          </div>
          <div class="back-foot">
            <button class="btn-view-profile" data-num="${p.num}">Ver Perfil →</button>
            <span class="back-flip">↺ flip</span>
          </div>
          <span class="player-tap-hint">Tap to flip back</span>
        </div>
      </div>
    </div>
  `).join('');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    grid.querySelectorAll('.reveal').forEach(e => io.observe(e));
  } else {
    grid.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  }

  grid.querySelectorAll('.player').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  // "Ver Perfil" buttons — stop propagation so card doesn't flip
  grid.querySelectorAll('.btn-view-profile').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const player = PLAYER_REGISTRY.get(btn.dataset.num);
      if (player) openPlayerModal(player);
    });
  });
})();

// LIGHTBOX
(function () {
  const items = document.querySelectorAll('[data-lightbox]');
  const lb = document.getElementById('lightbox');
  if (!lb || !items.length) return;
  const imgEl   = lb.querySelector('.lightbox-img');
  const counter = lb.querySelector('.lightbox-counter');
  let idx = 0;
  const srcs = Array.from(items).map(i => i.getAttribute('data-lightbox'));
  function show(i) {
    idx = (i + srcs.length) % srcs.length;
    if (imgEl)   imgEl.src = srcs[idx];
    if (counter) counter.textContent = `${String(idx+1).padStart(2,'0')} / ${String(srcs.length).padStart(2,'0')}`;
  }
  items.forEach((it, i) => it.addEventListener('click', () => { show(i); lb.classList.add('open'); }));
  lb.querySelector('.lightbox-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.querySelector('.lightbox-nav.prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lightbox-nav.next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     lb.classList.remove('open');
    if (e.key === 'ArrowLeft')  show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();

// PINK GAME GALLERY LIGHTBOX
(function () {
  const items = document.querySelectorAll('[data-pg-lightbox]');
  const lb = document.getElementById('lightbox-pg');
  if (!lb || !items.length) return;
  const imgEl   = lb.querySelector('.lightbox-img');
  const counter = lb.querySelector('.lightbox-counter');
  let idx = 0;
  const srcs = Array.from(items).map(i => i.getAttribute('data-pg-lightbox'));
  function show(i) {
    idx = (i + srcs.length) % srcs.length;
    if (imgEl)   imgEl.src = srcs[idx];
    if (counter) counter.textContent = `${String(idx+1).padStart(2,'0')} / ${String(srcs.length).padStart(2,'0')}`;
  }
  items.forEach((it, i) => it.addEventListener('click', () => { show(i); lb.classList.add('open'); }));
  lb.querySelector('.lightbox-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.querySelector('.lightbox-nav.prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lightbox-nav.next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     lb.classList.remove('open');
    if (e.key === 'ArrowLeft')  show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();

// ── DYNAMIC NEXT GAME COUNTDOWN ─────────────────────────────
function initNextGameCountdown() {
  const games = Array.from(document.querySelectorAll('.schedule-game[data-date]'));
  if (!games.length) return;

  let countdownTimer = null;

  function getNextGame() {
    const now = new Date();
    return games
      .map(el => ({
        el,
        dt: new Date(`${el.dataset.date}T${el.dataset.time || '18:00'}:00`)
      }))
      .filter(g => g.dt > now)
      .sort((a, b) => a.dt - b.dt)[0] || null;
  }

  function updateCountdownDisplay(distance) {
    const vals = {
      d: Math.floor(distance / 86400000),
      h: Math.floor((distance % 86400000) / 3600000),
      m: Math.floor((distance % 3600000) / 60000),
      s: Math.floor((distance % 60000) / 1000)
    };
    document.querySelectorAll('[data-cd]').forEach(el => {
      el.textContent = String(vals[el.dataset.cd]).padStart(2, '0');
    });
  }

  function startCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);

    games.forEach(el => {
      el.classList.remove('next-game');
      const b = el.querySelector('.next-game-badge');
      if (b) b.remove();
    });

    const next = getNextGame();

    if (!next) {
      const wrap = document.getElementById('countdown');
      if (wrap) wrap.innerHTML = '<p style="font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);">Season Complete · See You in 2027 🦈</p>';
      return;
    }

    next.el.classList.add('next-game');
    const badge = document.createElement('div');
    badge.className = 'next-game-badge';
    badge.textContent = 'Next Game';
    next.el.prepend(badge);

    const opponentEl = document.getElementById('nextGameOpponent');
    const metaEl     = document.getElementById('nextGameMeta');
    const eyebrowEl  = document.getElementById('nextGameEyebrow');
    if (opponentEl) opponentEl.textContent = 'vs ' + (next.el.dataset.opponent || '—');
    if (metaEl)     metaEl.textContent = 'Zürich · ' + (next.el.dataset.time || '—');
    if (eyebrowEl)  eyebrowEl.textContent = next.dt.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();

    countdownTimer = setInterval(() => {
      const distance = next.dt - new Date();
      if (distance <= 0) {
        clearInterval(countdownTimer);
        setTimeout(startCountdown, 3000);
        return;
      }
      updateCountdownDisplay(distance);
    }, 1000);

    updateCountdownDisplay(Math.max(0, next.dt - new Date()));
  }

  startCountdown();
}

document.addEventListener('DOMContentLoaded', initNextGameCountdown);

// ── SCHEDULE FILTERS ─────────────────────────────────────────
function initScheduleFilters() {
  const games = Array.from(document.querySelectorAll('.schedule-game'));
  if (!games.length) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  games.forEach(game => {
    game.classList.remove('past', 'upcoming');
    const dateStr = game.dataset.date;
    if (!dateStr) return;
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    game.classList.add(d < today ? 'past' : 'upcoming');
  });

  function applyFilter(filter) {
    let visible = 0;
    games.forEach(game => {
      const show =
        filter === 'all'      ? true :
        filter === 'upcoming' ? game.classList.contains('upcoming') :
        filter === 'past'     ? game.classList.contains('past') :
        filter === 'home'     ? game.dataset.location === 'home' :
        filter === 'away'     ? game.dataset.location === 'away' : true;
      game.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    const countEl = document.getElementById('schedFilterCount');
    if (countEl) countEl.textContent = `${visible} game${visible !== 1 ? 's' : ''}`;
  }

  document.querySelectorAll('.sched-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sched-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  const upcomingBtn = document.querySelector('.sched-filter-btn[data-filter="upcoming"]');
  if (upcomingBtn) {
    document.querySelectorAll('.sched-filter-btn').forEach(b => b.classList.remove('active'));
    upcomingBtn.classList.add('active');
  }
  applyFilter('upcoming');
}

document.addEventListener('DOMContentLoaded', initScheduleFilters);

// ── HERO BACKGROUND CAROUSEL + NEWS CTA ─────────────────────
function initHeroNews() {
  const slidesContainer     = document.getElementById('heroSlides');
  const ctaContainer        = document.getElementById('heroNewsCta');
  const indicatorsContainer = document.getElementById('heroSlideIndicators');

  // Hide dot indicators — background is decorative, no user controls needed
  if (indicatorsContainer) indicatorsContainer.style.display = 'none';

  // ── Background carousel (Pink Game photos) ──
  if (slidesContainer && HERO_BG_IMAGES.length) {
    slidesContainer.innerHTML = HERO_BG_IMAGES.map((src, i) =>
      `<div class="hero-slide${i === 0 ? ' active' : ''}" style="background-image: url('${src}');"></div>`
    ).join('');

    const slides = slidesContainer.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
      let current = 0;
      setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 4500);
    }
  }

  // ── CTA card (latest news article, static) ──
  if (ctaContainer && NEWS_ARTICLES.length) {
    const article = NEWS_ARTICLES[0];
    ctaContainer.innerHTML = `
      <a class="hero-news-cta-inner" href="${article.href}">
        <span class="hero-news-cta-tag" style="color:${article.tagColor || 'var(--accent)'};">
          <span class="hero-news-cta-dot"></span>
          ${article.tag} &nbsp;·&nbsp; ${article.date}
        </span>
        <span class="hero-news-cta-headline">${article.headline}</span>
        <span class="hero-news-cta-read">Read Full Article →</span>
      </a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', initHeroNews);

// ── NEWS FEATURE CAROUSEL ────────────────────────────────────
(function () {
  const wrap = document.getElementById('newsFeatureCarousel');
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.news-carousel-slide');
  const dots   = wrap.querySelectorAll('.ncd');
  if (!slides.length) return;
  let cur = 0;
  function goTo(i) {
    slides[cur].classList.remove('active');
    dots[cur] && dots[cur].classList.remove('active');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur] && dots[cur].classList.add('active');
  }
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(t); goTo(i); t = setInterval(() => goTo(cur + 1), 4000); }));
  let t = setInterval(() => goTo(cur + 1), 4000);
})();

// ── NEWS CARD CLICK — navigate ignoring share bar ─────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.news-card[data-article-href]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      if (e.target.closest('.share-bar')) return;
      window.location.href = card.dataset.articleHref;
    });
  });
});

// ── FIRST PITCH — next upcoming game card ────────────────────
function initFirstPitch() {
  const container = document.getElementById('firstPitchCard');
  if (!container) return;

  const now = new Date();
  const next = GAMES.find(g => new Date(`${g.date}T${g.time}:00`) > now);

  if (!next) {
    container.innerHTML = `<p style="color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:0.8rem;letter-spacing:0.1em;">SEASON COMPLETE 🦈</p>`;
    return;
  }

  const dt = new Date(`${next.date}T${next.time}:00`);
  const dayStr = dt.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  const timeStr = `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;

  const nextIdx = GAMES.indexOf(next);
  const after = GAMES[nextIdx + 1];
  const afterStr = after
    ? `${new Date(after.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()} · ${after.opponent.split(' ').pop().toUpperCase()}`
    : '—';

  container.className = 'match-card reveal in';
  container.innerHTML = `
    <div class="head">
      <span class="tag">${dayStr} · ${timeStr}</span>
      <span class="eyebrow">${next.league}</span>
    </div>
    <div class="vs">
      <div class="team us">
        <div class="crest"><img src="assets/logo.png" alt="" style="height:48px;width:auto;" /></div>
        <div class="name">Barracudas 3</div>
        <div class="sub">Gruppe A</div>
      </div>
      <div class="center">VS</div>
      <div class="team them">
        <div class="crest"><img src="${next.opponentLogo}" alt="${next.opponent}" style="height:48px;width:auto;" onerror="this.style.display='none'" /></div>
        <div class="name">${next.opponent}</div>
        <div class="sub">${next.location}</div>
      </div>
    </div>
    <div class="info-row">
      <div><div class="k">Date</div><div class="v">${new Date(next.date).toLocaleDateString('en-US',{month:'short',day:'numeric'}).toUpperCase()}</div></div>
      <div><div class="k">Next</div><div class="v">${afterStr}</div></div>
      <div><div class="k">League</div><div class="v">${next.league.split(' ·')[0]}</div></div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initFirstPitch);

// ── RECENT RESULTS — last 3 played games ────────────────────
function initRecentResults() {
  const container = document.getElementById('recentResultsList');
  if (!container) return;

  const now = new Date();
  const played = GAMES.filter(g => {
    const dt = new Date(`${g.date}T${g.time || '23:59'}:00`);
    return g.result !== null && dt < now;
  }).reverse();

  const recent = played.slice(0, 3);

  if (!recent.length) {
    container.innerHTML = `<p style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:var(--ink-mute);">No games played yet.</p>`;
    return;
  }

  container.innerHTML = recent.map(g => {
    const isWin = g.result === 'W';
    const isPink = g.notes && g.notes.includes('Pink Game');
    const recapLink = g.recapUrl
      ? `<a href="${g.recapUrl}" class="result-recap-link">READ RECAP →</a>`
      : '';
    return `
      <div class="result-card${isPink ? ' result-card--pink' : ''}">
        <div class="result-card-header">
          <span class="result-card-date">${g.label} · ${g.location}</span>
          <span class="result-badge result-badge--${isWin ? 'win' : 'loss'}">${g.result}</span>
        </div>
        <div class="result-card-matchup">
          <div class="result-team">
            <img src="assets/logo.png" alt="B3" class="result-logo" onerror="this.style.display='none'" />
            <span class="result-team-name">BARRACUDAS 3</span>
            <span class="result-score${!isWin ? ' result-score--loss' : ''}">${g.score.us}</span>
          </div>
          <div class="result-team">
            <img src="${g.opponentLogo}" alt="${g.opponent}" class="result-logo" onerror="this.style.display='none'" />
            <span class="result-team-name">${g.opponent.toUpperCase()}</span>
            <span class="result-score${isWin ? ' result-score--loss' : ' result-score--win'}">${g.score.them}</span>
          </div>
        </div>
        <div class="result-card-footer">
          <span class="result-innings">${g.innings} INNINGS${g.notes ? ' · ' + g.notes : ''}</span>
          ${recapLink}
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', initRecentResults);

// ── PLAYER STATS STRIP ────────────────────────────────────────
function initPlayerStats() {
  const container = document.getElementById('playerStrip');
  const dataEl    = document.getElementById('roster-data');
  if (!container || !dataEl) return;

  let roster;
  try { roster = JSON.parse(dataEl.textContent); } catch (e) { return; }

  // Top Batter — highest AVG among batters/both
  const batters = roster.filter(p => {
    const avg = p.stats.find(s => s.k === 'AVG');
    return avg && (p.type === 'batter' || p.type === 'both');
  });
  const topBatter = batters.reduce((best, p) => {
    const avg = parseFloat(p.stats.find(s => s.k === 'AVG').v);
    const bestAvg = parseFloat(best.stats.find(s => s.k === 'AVG').v);
    return avg > bestAvg ? p : best;
  }, batters[0]);

  // Top Pitcher — lowest ERA among players who have ERA stat
  const pitchers = roster.filter(p => p.stats.find(s => s.k === 'ERA'));
  const topPitcher = pitchers.reduce((best, p) => {
    const era = parseFloat(p.stats.find(s => s.k === 'ERA').v);
    const bestEra = parseFloat(best.stats.find(s => s.k === 'ERA').v);
    return era < bestEra ? p : best;
  }, pitchers[0]);

  // Hitting Streak — highest streak among non-pitchers
  const streakers = roster.filter(p => p.type !== 'pitcher' && (p.streak || 0) > 0);
  const streakLeader = streakers.length
    ? streakers.reduce((best, p) => (p.streak || 0) > (best.streak || 0) ? p : best, streakers[0])
    : null;

  function shortName(p) {
    return `${p.first.split(' ')[0][0]}. ${p.last}`;
  }

  function initials(p) {
    return `${p.first[0]}${p.last[0]}`.toUpperCase();
  }

  function card(label, player, stat) {
    if (!player) return `<div class="ps-card"><div class="ps-info"><span class="ps-label">${label}</span><span class="ps-name">—</span></div></div>`;
    const img = player.img || '';
    const photoContent = img
      ? `<img src="${img}" alt="${shortName(player)}" onerror="this.parentNode.textContent='${initials(player)}'" />`
      : initials(player);
    return `
      <div class="ps-card" data-num="${player.num}" title="Ver perfil completo">
        <div class="ps-photo">${photoContent}</div>
        <div class="ps-info">
          <span class="ps-label">${label}</span>
          <div class="ps-player-row">
            <span class="ps-num">#${player.num}</span>
            <span class="ps-name">${shortName(player)}</span>
          </div>
          <span class="ps-stat">${stat}</span>
        </div>
      </div>
    `;
  }

  const avgStat = topBatter
    ? topBatter.stats.find(s => s.k === 'AVG').v + ' AVG · ' + (topBatter.stats.find(s => s.k === 'RBI')?.v || '—') + ' RBI'
    : '—';
  const eraStat = topPitcher
    ? topPitcher.stats.find(s => s.k === 'ERA').v + ' ERA · ' + (topPitcher.stats.find(s => s.k === 'W-L')?.v || '') + ' W-L'
    : '—';
  const streakStat = streakLeader
    ? streakLeader.streak + ' juegos consecutivos con hit'
    : '—';

  container.innerHTML = [
    card('Top Batter 2026',  topBatter,    avgStat),
    card('Top Pitcher 2026', topPitcher,   eraStat),
    card('Hitting Streak',   streakLeader, streakStat),
  ].join('');

  // Click on any player stat card opens the modal
  container.querySelectorAll('.ps-card[data-num]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const player = PLAYER_REGISTRY.get(el.dataset.num);
      if (player) openPlayerModal(player);
    });
  });
}

document.addEventListener('DOMContentLoaded', initPlayerStats);

// ── PLAYER PROFILE MODAL ──────────────────────────────────────
// ── Modal helpers ─────────────────────────────────────────────
function pmSummary(cells) {
  const HL = ['AVG','OBP','SLG','OPS','ERA','FPct','WHIP'];
  return `<div class="pm-summary">${cells.map(([k,v]) =>
    `<div class="pm-summary-cell">
      <span class="pm-summary-k">${k}</span>
      <span class="pm-summary-v${HL.includes(k) ? ' hl' : ''}">${v ?? '—'}</span>
    </div>`
  ).join('')}</div>`;
}

function pmTable(headers, rows, hlCols = [], minWidth = 560) {
  const head = headers.map(h => `<th>${h}</th>`).join('');
  const body = rows.map(row =>
    `<tr>${row.map((c, i) => `<td class="${hlCols.includes(i) ? 'hl' : ''}">${c ?? '—'}</td>`).join('')}</tr>`
  ).join('');
  return `<div class="pm-table-wrap"><table class="pm-table" style="min-width:${minWidth}px">
    <thead><tr>${head}</tr></thead><tbody>${body}</tbody>
  </table></div>`;
}

function pmBattingPane(ext, basicStats) {
  if (ext?.batting) {
    let html = '';
    const s = ext.batting.season;
    if (s) {
      html += pmSummary([['AVG',s.AVG],['HR',s.HR],['RBI',s.RBI],['OBP',s.OBP],['SLG',s.SLG],['OPS',s.OPS]]);
      const sh = ['','G','PA','AB','R','H','2B','3B','HR','RBI','BB','SO','SB','AVG','OBP','SLG','OPS'];
      const sr = ['2026',s.G,s.PA,s.AB,s.R,s.H,s['2B'],s['3B'],s.HR,s.RBI,s.BB,s.SO,s.SB,s.AVG,s.OBP,s.SLG,s.OPS];
      html += pmTable(sh, [sr], [13,14,15,16], 700);
    }
    if (ext.batting.log?.length) {
      const lh = ['Fecha','Rival','#','Pos','AB','R','H','2B','HR','RBI','BB','SO','SB','AVG'];
      const lr = ext.batting.log.map(g => [g.date,g.opp,g.spot,g.pos,g.AB,g.R,g.H,g['2B'],g.HR,g.RBI,g.BB,g.SO,g.SB,g.AVG]);
      html += `<div class="pm-log-label">Game Log</div>${pmTable(lh, lr, [13], 580)}`;
    }
    return html || `<p class="pm-no-data">Sin datos de bateo disponibles.</p>`;
  }
  const batStats = basicStats.filter(s => ['AVG','HR','RBI','OBP','SLG','OPS','SB'].includes(s.k));
  if (!batStats.length) return `<p class="pm-no-data">Sin datos de bateo disponibles.</p>`;
  return pmSummary(batStats.map(s => [s.k, s.v])) + `<p class="pm-no-data">Game log no disponible.</p>`;
}

function pmPitchingPane(ext, basicStats) {
  if (ext?.pitching) {
    let html = '';
    const s = ext.pitching.season;
    if (s) {
      html += pmSummary([['ERA',s.ERA],['W-L',s.WL],['IP',s.IP],['SO',s.SO],['WHIP',s.WHIP],['OppAVG',s.OppAVG]]);
      const sh = ['','G','GS','IP','H','R','ER','BB','SO','HR','HBP','WP','BF','OppAVG','WHIP','ERA'];
      const sr = ['2026',s.G,s.GS,s.IP,s.H,s.R,s.ER,s.BB,s.SO,s.HR,s.HBP,s.WP,s.BF,s.OppAVG,s.WHIP,s.ERA];
      html += pmTable(sh, [sr], [13,14,15], 620);
    }
    if (ext.pitching.log?.length) {
      const lh = ['Fecha','Rival','IP','H','R','ER','BB','SO','HBP','WP','BF','ERA'];
      const lr = ext.pitching.log.map(g => [g.date,g.opp,g.IP,g.H,g.R,g.ER,g.BB,g.SO,g.HBP,g.WP,g.BF,g.ERA]);
      html += `<div class="pm-log-label">Game Log</div>${pmTable(lh, lr, [11], 500)}`;
    }
    return html || `<p class="pm-no-data">Sin datos de pitcheo disponibles.</p>`;
  }
  const pitStats = basicStats.filter(s => ['ERA','K','W-L','WHIP'].includes(s.k));
  if (!pitStats.length) return `<p class="pm-no-data">Sin datos de pitcheo disponibles.</p>`;
  return pmSummary(pitStats.map(s => [s.k, s.v])) + `<p class="pm-no-data">Game log no disponible.</p>`;
}

function pmFieldingPane(ext) {
  if (!ext?.fielding) return `<p class="pm-no-data">Sin datos de fielding disponibles.</p>`;
  let html = '';
  const s = ext.fielding.season;
  if (s) {
    const extraCols = s.PB != null ? [['PB',s.PB]] : [];
    const sbCols = s.SBAtt != null ? [['SBAtt',s.SBAtt]] : [];
    html += pmSummary([['G',s.G],['IP',s.IP],['PO',s.PO],['A',s.A],['E',s.E],['FPct',s.FPct],...extraCols,...sbCols]);
    const baseHeaders = ['','G','IP','PO','A','E','DP','RF','FPct'];
    const baseRow = ['2026',s.G,s.IP,s.PO,s.A,s.E,s.DP,s.RF,s.FPct];
    if (s.PB != null) { baseHeaders.push('PB'); baseRow.push(s.PB); }
    if (s.SBAtt != null) { baseHeaders.push('SBAtt'); baseRow.push(s.SBAtt); }
    html += pmTable(baseHeaders, [baseRow], [baseHeaders.length - 1], 440);
  }
  if (ext.fielding.log?.length) {
    const hasPB = ext.fielding.log.some(g => g.PB != null);
    const lh = ['Fecha','Rival','Pos','IP','PO','A','E','FPct', ...(hasPB ? ['PB','SBAtt'] : [])];
    const lr = ext.fielding.log.map(g => [g.date,g.opp,g.pos,g.IP,g.PO,g.A,g.E,g.FPct, ...(hasPB ? [g.PB,g.SBAtt] : [])]);
    html += `<div class="pm-log-label">Game Log</div>${pmTable(lh, lr, [7], 400)}`;
  }
  return html || `<p class="pm-no-data">Sin datos de fielding disponibles.</p>`;
}

function openPlayerModal(player) {
  const modal   = document.getElementById('playerModal');
  const photoEl = document.getElementById('pmPhoto');
  const badgeEl = document.getElementById('pmBadge');
  const nameEl  = document.getElementById('pmName');
  const posEl   = document.getElementById('pmPos');
  const tabsEl  = document.getElementById('pmTabs');
  const contentEl = document.getElementById('pmTabContent');
  const extraEl = document.getElementById('pmExtra');
  const linksEl = document.getElementById('pmLinks');
  if (!modal) return;

  // Photo
  photoEl.innerHTML = '';
  if (player.img) {
    const img = document.createElement('img');
    img.src = player.img;
    img.alt = `${player.first} ${player.last}`;
    img.onerror = () => { photoEl.textContent = `${player.first[0]}${player.last[0]}`.toUpperCase(); };
    photoEl.appendChild(img);
  } else {
    photoEl.textContent = `${player.first[0]}${player.last[0]}`.toUpperCase();
  }

  // Identity
  const ext = PLAYER_EXTENDED_DATA[player.num] || null;
  const typeLabel = { batter:'Batter', pitcher:'Pitcher', both:'Two-Way' }[player.type] || 'Player';
  badgeEl.textContent = `#${player.num} · ${typeLabel}${ext?.age ? ' · ' + ext.age + ' años' : ''}`;
  nameEl.textContent  = ext?.fullName || `${player.first} ${player.last}`;
  const meta = [player.pos, player.flag + ' ' + player.country];
  if (ext?.bats)   meta.push(`Batea: ${ext.bats}`);
  if (ext?.throws) meta.push(`Lanza: ${ext.throws}`);
  posEl.textContent = meta.join(' · ');

  // Build tabs
  const tabs = [];
  if (player.type !== 'pitcher') tabs.push({ id:'batting',  label:'Batting'  });
  if (player.type !== 'batter')  tabs.push({ id:'pitching', label:'Pitching' });
  if (ext?.fielding)             tabs.push({ id:'fielding', label:'Fielding' });

  tabsEl.innerHTML = tabs.map((t, i) =>
    `<button class="pm-tab-btn${i === 0 ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`
  ).join('');

  contentEl.innerHTML = tabs.map((t, i) => {
    let pane = '';
    if (t.id === 'batting')  pane = pmBattingPane(ext, player.stats);
    if (t.id === 'pitching') pane = pmPitchingPane(ext, player.stats);
    if (t.id === 'fielding') pane = pmFieldingPane(ext);
    return `<div class="pm-pane${i === 0 ? ' active' : ''}" data-pane="${t.id}">${pane}</div>`;
  }).join('');

  tabsEl.querySelectorAll('.pm-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.pm-tab-btn').forEach(b => b.classList.remove('active'));
      contentEl.querySelectorAll('.pm-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      contentEl.querySelector(`[data-pane="${btn.dataset.tab}"]`)?.classList.add('active');
    });
  });

  // Chips
  const chips = [];
  if (player.captain)    chips.push('★ Captain');
  if (player.streak > 0) chips.push(`${player.streak}-game hit streak`);
  extraEl.innerHTML = chips.map(c => `<span class="pm-chip">${c}</span>`).join('');
  extraEl.style.display = chips.length ? '' : 'none';

  // EasyScore link
  linksEl.innerHTML = player.easyscoreId
    ? `<a class="pm-easyscore-link" href="https://www.easyscore.com/players/${player.easyscoreId}" target="_blank" rel="noopener">Ver stats completos en EasyScore ↗</a>`
    : '';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePlayerModal() {
  const modal = document.getElementById('playerModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pmClose')?.addEventListener('click', closePlayerModal);
  document.getElementById('pmOverlay')?.addEventListener('click', closePlayerModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePlayerModal(); });
});