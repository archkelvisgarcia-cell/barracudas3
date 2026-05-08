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
    const s = ext.batting.season;
    const summary = pmSummary([['AVG',s.AVG],['HR',s.HR],['RBI',s.RBI],['OBP',s.OBP],['SLG',s.SLG],['OPS',s.OPS]]);
    const seasonHeaders = ['','G','PA','AB','R','H','2B','3B','HR','RBI','BB','SO','SB','AVG','OBP','SLG','OPS'];
    const seasonRow = ['2026',s.G,s.PA,s.AB,s.R,s.H,s['2B'],s['3B'],s.HR,s.RBI,s.BB,s.SO,s.SB,s.AVG,s.OBP,s.SLG,s.OPS];
    const seasonTable = pmTable(seasonHeaders, [seasonRow], [13,14,15,16], 700);
    let logHTML = '';
    if (ext.batting.log?.length) {
      const lh = ['Fecha','Rival','#','Pos','AB','R','H','2B','HR','RBI','BB','SO','SB','AVG'];
      const lr = ext.batting.log.map(g => [g.date,g.opp,g.spot,g.pos,g.AB,g.R,g.H,g['2B'],g.HR,g.RBI,g.BB,g.SO,g.SB,g.AVG]);
      logHTML = `<div class="pm-log-label">Game Log</div>${pmTable(lh, lr, [13], 580)}`;
    }
    return summary + seasonTable + logHTML;
  }
  // Fallback: basic stats from roster array
  const batStats = basicStats.filter(s => ['AVG','HR','RBI','OBP','SLG','OPS','SB'].includes(s.k));
  if (!batStats.length) return `<p class="pm-no-data">Sin datos de bateo disponibles.</p>`;
  return pmSummary(batStats.map(s => [s.k, s.v])) + `<p class="pm-no-data">Game log no disponible.</p>`;
}

function pmPitchingPane(ext, basicStats) {
  if (ext?.pitching) {
    const s = ext.pitching.season;
    const summary = pmSummary([['ERA',s.ERA],['W-L',s.WL],['IP',s.IP],['SO',s.SO],['WHIP',s.WHIP],['OppAVG',s.OppAVG]]);
    const sh = ['','G','GS','IP','H','R','ER','BB','SO','HR','HBP','WP','BF','OppAVG','WHIP','ERA'];
    const sr = ['2026',s.G,s.GS,s.IP,s.H,s.R,s.ER,s.BB,s.SO,s.HR,s.HBP,s.WP,s.BF,s.OppAVG,s.WHIP,s.ERA];
    const seasonTable = pmTable(sh, [sr], [13,14,15], 620);
    let logHTML = '';
    if (ext.pitching.log?.length) {
      const lh = ['Fecha','Rival','IP','H','R','ER','BB','SO','HBP','WP','BF','ERA'];
      const lr = ext.pitching.log.map(g => [g.date,g.opp,g.IP,g.H,g.R,g.ER,g.BB,g.SO,g.HBP,g.WP,g.BF,g.ERA]);
      logHTML = `<div class="pm-log-label">Game Log</div>${pmTable(lh, lr, [11], 500)}`;
    }
    return summary + seasonTable + logHTML;
  }
  const pitStats = basicStats.filter(s => ['ERA','K','W-L','WHIP'].includes(s.k));
  if (!pitStats.length) return `<p class="pm-no-data">Sin datos de pitcheo disponibles.</p>`;
  return pmSummary(pitStats.map(s => [s.k === 'W-L' ? 'W-L' : s.k, s.v])) + `<p class="pm-no-data">Game log no disponible.</p>`;
}

function pmFieldingPane(ext) {
  if (!ext?.fielding) return `<p class="pm-no-data">Sin datos de fielding disponibles.</p>`;
  const s = ext.fielding.season;
  const summary = pmSummary([['G',s.G],['IP',s.IP],['PO',s.PO],['A',s.A],['E',s.E],['FPct',s.FPct]]);
  const sh = ['','G','IP','PO','A','E','DP','PB','RF','FPct'];
  const sr = ['2026',s.G,s.IP,s.PO,s.A,s.E,s.DP,s.PB,s.RF,s.FPct];
  const seasonTable = pmTable(sh, [sr], [9], 420);
  let logHTML = '';
  if (ext.fielding.log?.length) {
    const lh = ['Fecha','Rival','Pos','IP','PO','A','E','FPct'];
    const lr = ext.fielding.log.map(g => [g.date,g.opp,g.pos,g.IP,g.PO,g.A,g.E,g.FPct]);
    logHTML = `<div class="pm-log-label">Game Log</div>${pmTable(lh, lr, [7], 380)}`;
  }
  return summary + seasonTable + logHTML;
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