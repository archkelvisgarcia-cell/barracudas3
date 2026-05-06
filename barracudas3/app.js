/* ============================================================
   BARRACUDAS — App scripts
============================================================ */

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

// ROSTER — render flip cards directly from JSON stats
(function () {
  const grid = document.querySelector('.roster-grid');
  const data = document.getElementById('roster-data');
  if (!grid || !data) return;

  let roster;
  try { roster = JSON.parse(data.textContent); } catch (e) { return; }

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
            <span class="back-team">Barracudas · 2026</span>
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

  grid.querySelectorAll('.player').forEach(p => {
    p.addEventListener('click', () => p.classList.toggle('flipped'));
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

// CALENDAR FILTER
(function () {
  const chips = document.querySelectorAll('[data-filter]');
  const rows  = document.querySelectorAll('[data-team]');
  if (!chips.length) return;
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    const f = c.getAttribute('data-filter');
    rows.forEach(r => {
      r.style.display = (f === 'all' || r.getAttribute('data-team') === f) ? '' : 'none';
    });
  }));
})();

// COUNTDOWN
(function () {
  const wrap = document.getElementById('countdown');
  if (!wrap) return;
  const target = new Date(wrap.getAttribute('data-target')).getTime();
  function tick() {
    const diff = Math.max(0, target - Date.now());
    const map = {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000)
    };
    wrap.querySelectorAll('[data-cd]').forEach(el => {
      el.textContent = String(map[el.getAttribute('data-cd')]).padStart(2, '0');
    });
  }
  tick(); setInterval(tick, 1000);
})();

// ── HERO DYNAMIC NEWS BACKGROUND ────────────────────────────
function initHeroNews() {
  const slidesContainer = document.getElementById('heroSlides');
  const ctaContainer = document.getElementById('heroNewsCta');
  const indicatorsContainer = document.getElementById('heroSlideIndicators');

  if (!slidesContainer || !NEWS_ARTICLES.length) return;

  let current = 0;
  let autoTimer;

  slidesContainer.innerHTML = NEWS_ARTICLES.map((article, i) =>
    `<div class="hero-slide${i === 0 ? ' active' : ''}" style="background-image: url('${article.image}')"></div>`
  ).join('');

  if (NEWS_ARTICLES.length > 1) {
    indicatorsContainer.innerHTML = NEWS_ARTICLES.map((_, i) =>
      `<button class="hero-slide-dot${i === 0 ? ' active' : ''}" aria-label="Article ${i + 1}"></button>`
    ).join('');
  }

  const slides = slidesContainer.querySelectorAll('.hero-slide');
  const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('.hero-slide-dot') : [];

  function renderCta(index) {
    const article = NEWS_ARTICLES[index];
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

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + NEWS_ARTICLES.length) % NEWS_ARTICLES.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    renderCta(current);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      goTo(i);
      autoTimer = setInterval(() => goTo(current + 1), 6000);
    });
  });

  renderCta(0);

  if (NEWS_ARTICLES.length > 1) {
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  }
}

document.addEventListener('DOMContentLoaded', initHeroNews);