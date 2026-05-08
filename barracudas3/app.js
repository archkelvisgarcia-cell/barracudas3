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
    date: 'May 5, 2026',
    tag: '🩷 Pink Game',
    tagColor: '#FF3EA5',
    headline: 'Barracudas 3 Fall 17–5 in Pink Game as NLA Squad Proves Too Strong',
    summary: 'Under the lights of Heerenschürli, the Barracudas 3 donned their pink uniforms for breast cancer awareness — but the NLA squad had other plans, running away with a 17–5 victory.',
    image: 'assets/news-pink-game-02.jpg',
    href: 'pink-game-recap.html',
    featured: true,
  },
  // ← Future articles go here, newest first
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
function openPlayerModal(player) {
  const modal      = document.getElementById('playerModal');
  const photoEl    = document.getElementById('pmPhoto');
  const badgeEl    = document.getElementById('pmBadge');
  const nameEl     = document.getElementById('pmName');
  const posEl      = document.getElementById('pmPos');
  const typeLabel  = document.getElementById('pmTypeLabel');
  const statsGrid  = document.getElementById('pmStatsGrid');
  const extraEl    = document.getElementById('pmExtra');
  const linksEl    = document.getElementById('pmLinks');
  if (!modal) return;

  // Photo
  photoEl.innerHTML = '';
  if (player.img) {
    const img = document.createElement('img');
    img.src = player.img;
    img.alt = `${player.first} ${player.last}`;
    img.onerror = () => { photoEl.innerHTML = `${player.first[0]}${player.last[0]}`.toUpperCase(); };
    photoEl.appendChild(img);
  } else {
    photoEl.textContent = `${player.first[0]}${player.last[0]}`.toUpperCase();
  }

  // Identity
  badgeEl.textContent = `#${player.num} · ${player.type === 'pitcher' ? 'Pitcher' : player.type === 'both' ? 'Two-Way' : 'Batter'}`;
  nameEl.textContent  = `${player.first} ${player.last}`;
  posEl.textContent   = `${player.pos} · ${player.flag} ${player.country}`;

  // Stats section label
  const labelMap = { batter: 'Batting Stats 2026', pitcher: 'Pitching Stats 2026', both: 'Season Stats 2026' };
  typeLabel.textContent = labelMap[player.type] || 'Stats 2026';

  // Stats grid from player.stats array
  statsGrid.innerHTML = (player.stats || []).map(s => `
    <div class="pm-stat-cell">
      <span class="pm-stat-k">${s.k}</span>
      <span class="pm-stat-v">${s.v}</span>
    </div>
  `).join('');

  // Extra chips
  const chips = [];
  if (player.captain)    chips.push('★ Captain');
  if (player.streak > 0) chips.push(`${player.streak}-game hit streak`);
  extraEl.innerHTML = chips.map(c => `<span class="pm-chip">${c}</span>`).join('');
  extraEl.style.display = chips.length ? '' : 'none';

  // EasyScore link
  linksEl.innerHTML = player.easyscoreId
    ? `<a class="pm-easyscore-link" href="https://www.easyscore.com/players/${player.easyscoreId}" target="_blank" rel="noopener">Ver stats completos en EasyScore ↗</a>`
    : '';

  // Show modal
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