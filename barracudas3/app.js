/* ============================================================
   BARRACUDAS — App Scripts
   Data lives in: data-schedule.js, data-players.js
============================================================ */

// Keep NEWS_ARTICLES sorted newest-first. Called once at load and again
// after pipeline articles are prepended, so NEWS_ARTICLES[0] is always latest.
function _sortNews() {
  if (typeof NEWS_ARTICLES !== 'undefined') {
    NEWS_ARTICLES.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}
_sortNews();


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
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  els.forEach(e => io.observe(e));
})();

// ── i18n helper — reads current lang from _barLang ───────────
function _t(key) {
  return window._barLang ? window._barLang.t(key) : key;
}

// ROSTER — render flip cards directly from JSON stats
(function () {
  const data = document.getElementById('roster-data');
  if (!data) return;

  let roster;
  try { roster = JSON.parse(data.textContent); } catch (e) { return; }

  // Always register players globally (needed on all pages for modals/stats)
  roster.forEach(p => PLAYER_REGISTRY.set(p.num, p));

  const grid = document.querySelector('.roster-grid');
  if (!grid) return; // registry only — no grid to render on this page

  grid.innerHTML = roster.map((p, i) => `
    <div class="player reveal${p.captain ? ' is-captain' : ''}" data-delay="${i % 4}">
      <div class="player-inner">
        <div class="player-face player-front" style="background-image:url('${p.img}');">
          ${p.captain ? '<span class="captain-badge">★ Captain</span>' : ''}
          <span class="player-tap-hint" data-i18n="card_tap_flip">Tap to flip</span>
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
            <a class="btn-view-profile" href="player.html?num=${p.num}" data-i18n="btn_view_profile">View Profile →</a>
            <span class="back-flip" data-i18n="card_flip_icon">↺ flip</span>
          </div>
          <span class="player-tap-hint" data-i18n="card_tap_back">Tap to flip back</span>
        </div>
      </div>
    </div>
  `).join('');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
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
      if (wrap) wrap.innerHTML = `<p style="font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);" data-i18n="season_done_msg">Season Complete · See You in 2027 🦈</p>`;
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
    if (countEl) countEl.textContent = `${visible} ${visible === 1 ? _t('sched_games_single') : _t('sched_games_plural')}`;
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

  // Re-compute count text when language changes
  window._barLang?.onLang?.(() => {
    const active = document.querySelector('.sched-filter-btn.active');
    if (active) applyFilter(active.dataset.filter);
  });
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
function initNewsFeatureCarousel() {
  const wrap = document.getElementById('newsFeatureCarousel');
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.news-carousel-slide');
  const dots   = wrap.querySelectorAll('.ncd');
  if (!slides.length) return;
  if (wrap._ct) clearInterval(wrap._ct);
  let cur = 0;
  function goTo(i) {
    slides[cur].classList.remove('active');
    dots[cur] && dots[cur].classList.remove('active');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur] && dots[cur].classList.add('active');
  }
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(wrap._ct); goTo(i); wrap._ct = setInterval(() => goTo(cur + 1), 4000); }));
  wrap._ct = setInterval(() => goTo(cur + 1), 4000);
}

function initNewsFeature() {
  const el = document.getElementById('newsFeatureEl');
  if (!el || typeof NEWS_ARTICLES === 'undefined' || !NEWS_ARTICLES.length) return;
  const a = NEWS_ARTICLES[0];
  const tagColor = a.tagColor || '#F0B429';
  const images = a.carouselImages || (a.image ? [a.image] : ['assets/nightgame-7.jpg']);
  const venue = (a.location || 'Heerenschürli').split('·').pop().trim();
  const slidesHtml = images.map((img, i) =>
    `<div class="news-carousel-slide${i === 0 ? ' active' : ''}" style="background-image:url('${img}')"></div>`
  ).join('');
  const dotsHtml = images.length > 1
    ? `<div class="news-carousel-dots">${images.map((_, i) => `<button class="ncd${i === 0 ? ' active' : ''}"></button>`).join('')}</div>`
    : '';
  const shareUrl = encodeURIComponent('https://barracudas3.netlify.app/news.html');
  const shareText = encodeURIComponent('Zürich Barracudas 3: ' + a.headline);
  el.style.borderLeft = `4px solid ${tagColor}`;
  el.innerHTML = `
    <div class="img" id="newsFeatureCarousel">
      ${slidesHtml}
      ${dotsHtml}
    </div>
    <div class="body">
      <span class="byline" style="color:${tagColor};">${a.tag} · ${a.date} · ${venue}</span>
      <h2>${a.headline}<span class="y">.</span></h2>
      <p style="font-size:18px;color:var(--ink);font-weight:500;margin-bottom:16px;">${a.summary}</p>
      <a href="${a.href || '#'}" class="btn btn-ghost" style="align-self:start;margin-top:8px;border-color:${tagColor};color:${tagColor};">Read article →</a>
      <div class="share-bar">
        <span class="share-label">Share</span>
        <a href="https://wa.me/?text=${shareText}%20%E2%80%93%20${shareUrl}" target="_blank" rel="noopener" class="share-btn whatsapp" title="Share on WhatsApp"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>
        <button class="share-btn copy" onclick="copyLink(this)" title="Copy link"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></button>
      </div>
    </div>
  `;
  initNewsFeatureCarousel();
}
document.addEventListener('DOMContentLoaded', initNewsFeature);

// ── LATEST NEWS (home page 3-column grid) ─────────────────────
function initLatestNews() {
  const grid = document.getElementById('latestNewsGrid');
  if (!grid || typeof NEWS_ARTICLES === 'undefined') return;

  const latest = NEWS_ARTICLES.slice(0, 3);
  if (!latest.length) return;

  grid.innerHTML = latest.map((a, i) => {
    const tag  = (a.tag  || '').toUpperCase();
    const date = (a.date || '').toUpperCase();
    const meta = [tag, date].filter(Boolean).join(' · ');
    const img  = a.image || 'assets/og-image.jpg';
    const pos  = a.imagePosition || 'center 25%';
    return `
      <a class="hn-card reveal" data-delay="${i}" href="${a.href || 'news.html'}">
        <div class="hn-card-img">
          <img src="${img}" alt="${a.headline}" loading="lazy" style="object-position:${pos}" />
        </div>
        <div class="hn-card-body">
          <div class="hn-card-tag">${meta}</div>
          <div class="hn-card-headline">${a.headline}</div>
        </div>
      </a>`;
  }).join('');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.reveal').forEach(e => io.observe(e));
  } else {
    grid.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  }
}
document.addEventListener('DOMContentLoaded', initLatestNews);

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

// ── FIRST PITCH — compact next-game badge ────────────────────
function initFirstPitch() {
  const container = document.getElementById('firstPitchCard');
  if (!container) return;

  const now  = new Date();
  const next = GAMES.find(g => new Date(`${g.date}T${g.time}:00`) > now);

  if (!next) {
    container.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);" data-i18n="next_season_done">SEASON COMPLETE 🦈</span>`;
    return;
  }

  const dt       = new Date(`${next.date}T${next.time}:00`);
  const monthDay = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  const timeStr  = `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
  const opp      = next.opponent;
  const loc      = next.location || next.league;

  container.innerHTML = `
    <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;
      text-transform:uppercase;display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <span style="background:var(--accent);color:#0d1f0f;font-weight:700;font-size:10px;
        letter-spacing:0.14em;padding:3px 10px;border-radius:999px;">NEXT</span>
      <span style="color:var(--ink);">${monthDay}</span>
      <span style="color:var(--line);">·</span>
      <span style="color:var(--ink-mute);">${timeStr}</span>
      <span style="color:var(--line);">·</span>
      <span style="color:var(--ink);">vs ${opp}</span>
      <span style="color:var(--line);">·</span>
      <span style="color:var(--ink-mute);">${loc}</span>
    </span>`;
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
    container.innerHTML = `<p style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:var(--ink-mute);" data-i18n="res_no_games">No games played yet.</p>`;
    return;
  }

  container.innerHTML = recent.map(g => {
    const isWin = g.result === 'W';
    const isPink = g.notes && g.notes.includes('Pink Game');
    const recapLink = g.recapUrl
      ? `<a href="${g.recapUrl}" class="result-recap-link" data-i18n="res_read_recap">READ RECAP →</a>`
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

// ── CALCULATE TOP PERFORMERS ───────────────────────────────────
// Reads PLAYER_EXTENDED_DATA — zero hardcoded values.
// Returns { batter, pitcher, fielder } or null for each category.
//
// TOP BATTER  = (OPS×40) + (AVG×30) + (RBI×1.5) + (HR×3)   min AB ≥ 10
// TOP PITCHER = (1/ERA×30) + (SO×1.5) + (W×5) + (1/WHIP×20) min IP ≥ 4.0
// GUANTE ORO  = (FPct×50) + (A×0.5) + (PO×0.3)             min IP ≥ 45.0 (strict)
function calculateTopPerformers() {
  const EXT = typeof PLAYER_EXTENDED_DATA !== 'undefined' ? PLAYER_EXTENDED_DATA : {};

  const fv = v => parseFloat(v) || 0;

  function ipFloat(ip) {
    const s = String(ip || '0').split('.');
    return parseInt(s[0] || 0) + parseInt(s[1] || 0) / 3;
  }

  function wins(wl) {
    return parseInt(String(wl || '0-0').split('-')[0]) || 0;
  }

  let topBatter   = null, scoreBat  = -Infinity;
  let topPitcher  = null, scorePit  = -Infinity;
  let topFielder  = null, scoreFld  = -Infinity;

  for (const [num, ext] of Object.entries(EXT)) {
    const reg  = typeof PLAYER_REGISTRY !== 'undefined' ? PLAYER_REGISTRY.get(num) : null;
    const meta = {
      num,
      shortName: reg
        ? `${reg.first.split(' ')[0][0]}. ${reg.last}`
        : (ext.fullName?.split(' ').pop() || `#${num}`),
      img: reg?.img || null,
    };

    // ── TOP BATTER ──
    const bat = ext.batting?.season;
    if (bat && fv(bat.AB) >= 10) {
      const s = fv(bat.OPS)*40 + fv(bat.AVG)*30 + fv(bat.RBI)*1.5 + fv(bat.HR)*3;
      if (s > scoreBat) {
        scoreBat = s;
        topBatter = { ...meta, statLine: `${bat.AVG} AVG · ${fv(bat.RBI)} RBI · ${bat.OPS} OPS` };
      }
    }

    // ── TOP PITCHER ──
    const pit = ext.pitching?.season;
    if (pit && ipFloat(pit.IP) >= 6.0) {
      const era  = fv(pit.ERA);
      const whip = fv(pit.WHIP);
      const s = (era  > 0 ? (1/era)  * 30 : 60) +   // ERA 0.00 → cap at 60
                (whip > 0 ? (1/whip) * 20 : 40) +   // WHIP 0.00 → cap at 40
                fv(pit.SO) * 1.5 +
                wins(pit.WL) * 5;
      if (s > scorePit) {
        scorePit = s;
        const wl  = String(pit.WL || '0-0');
        const wStr = `${wins(pit.WL)}-${wl.split('-')[1] || 0}`;
        topPitcher = { ...meta, statLine: `${pit.ERA} ERA · ${wStr} W-L · ${fv(pit.SO)} K` };
      }
    }

    // ── GUANTE DE ORO — strict IP ≥ 45.0 ──
    const fld = ext.fielding?.season;
    if (fld && ipFloat(fld.IP) >= 45.0) {
      const s = fv(fld.FPct)*50 + fv(fld.A)*0.5 + fv(fld.PO)*0.3;
      if (s > scoreFld) {
        scoreFld = s;
        topFielder = { ...meta, statLine: `${fld.FPct} FPct · ${fv(fld.PO)} PO · ${fv(fld.A)} A` };
      }
    }
  }

  return { batter: topBatter, pitcher: topPitcher, fielder: topFielder };
}

// ── PLAYER STATS STRIP ─────────────────────────────────────────
function initPlayerStats() {
  const container = document.getElementById('playerStrip');
  if (!container) return;

  const { batter, pitcher, fielder } = calculateTopPerformers();

  function card(i18nKey, fbLabel, player) {
    const label = _t(i18nKey) || fbLabel;
    if (!player) {
      return `<div class="ps-card">
        <div class="ps-info">
          <span class="ps-label">${label}</span>
          <span class="ps-name" style="font-size:10px;opacity:.45;line-height:1.4;">Sin candidato —<br/>datos insuficientes</span>
        </div>
      </div>`;
    }
    const ini = (player.shortName || '??').replace(/[^A-Za-zÀ-ÿ]/g, '').substring(0, 2).toUpperCase();
    const photo = player.img
      ? `<img src="${player.img}" alt="${player.shortName}" onerror="this.parentNode.textContent='${ini}'" />`
      : ini;
    return `<div class="ps-card" data-num="${player.num}">
      <div class="ps-photo">${photo}</div>
      <div class="ps-info">
        <span class="ps-label">${label}</span>
        <div class="ps-player-row">
          <span class="ps-num">#${player.num}</span>
          <span class="ps-name">${player.shortName}</span>
        </div>
        <span class="ps-stat">${player.statLine}</span>
      </div>
    </div>`;
  }

  container.innerHTML = [
    card('stat_top_batter',   'Top Batter 2026',    batter),
    card('stat_top_pitcher',  'Top Pitcher 2026',   pitcher),
    card('stat_golden_glove', 'Guante de Oro 2026', fielder),
  ].join('');

  container.querySelectorAll('.ps-card[data-num]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const p = typeof PLAYER_REGISTRY !== 'undefined' ? PLAYER_REGISTRY.get(el.dataset.num) : null;
      if (p) openPlayerModal(p);
    });
  });
}

document.addEventListener('DOMContentLoaded', initPlayerStats);

// ── AWARDS SECTION ────────────────────────────────────────────
// ── AWARDS — pure calculation, no DOM dependencies ────────────
function calculateAwards() {
  if (typeof PLAYER_EXTENDED_DATA === 'undefined') return null;

  // Build enriched player list from PLAYER_EXTENDED_DATA
  const players = Object.entries(PLAYER_EXTENDED_DATA)
    .filter(([, ext]) => !ext.excludeFromAwards)
    .map(([num, ext]) => {
      const reg = typeof PLAYER_REGISTRY !== 'undefined' ? PLAYER_REGISTRY.get(num) : null;
      return {
        num,
        fullName: ext.fullName || (reg ? `${reg.first} ${reg.last}` : `#${num}`),
        shortName: reg ? `${reg.first[0]}. ${reg.last}` : (ext.fullName?.split(' ').pop() || `#${num}`),
        img:  reg?.img || null,
        pos:  reg?.pos || '—',
        bat:  ext.batting?.season  || null,
        pit:  ext.pitching?.season || null,
        fld:  ext.fielding?.season || null,
      };
    });

  function f(v) { return parseFloat(v) || 0; }
  function normPct(val, min, max, invert = false) {
    const pct = Math.min(100, Math.max(0, ((f(val) - min) / (max - min)) * 100));
    return invert ? 100 - pct : pct;
  }

  // ── Golden Glove: IP ≥ 18 (≈50% del promedio del equipo: 31 IP)
  //    Sort: E↑ → FPct↓ → IP↓ → RF↓
  const gg = players
    .filter(p => p.fld && f(p.fld.IP) >= 18)
    .sort((a, b) => {
      if (a.fld.E !== b.fld.E)         return a.fld.E - b.fld.E;
      if (f(a.fld.FPct) !== f(b.fld.FPct)) return f(b.fld.FPct) - f(a.fld.FPct);
      if (f(a.fld.IP)   !== f(b.fld.IP))   return f(b.fld.IP) - f(a.fld.IP);
      return f(b.fld.RF || 0) - f(a.fld.RF || 0);
    })
    .slice(0, 3)
    .map(p => ({
      ...p,
      metrics: [
        { label: 'FPct', val: p.fld.FPct, pct: normPct(p.fld.FPct, 0.7, 1.0)       },
        { label: 'E',    val: p.fld.E,    pct: normPct(p.fld.E,     0,   5, true)   },
        { label: 'IP',   val: p.fld.IP,   pct: normPct(p.fld.IP,    0,  55)         },
      ],
    }));

  // ── Silver Slugger: PA ≥ 20, AB ≥ 15 (≈50% del promedio del equipo: 34 PA)
  //    Sort: OPS↓ → AVG↓ → RBI↓ → HR↓
  const ss = players
    .filter(p => p.bat && p.bat.PA >= 20 && p.bat.AB >= 15)
    .sort((a, b) => {
      const opsD = f(b.bat.OPS) - f(a.bat.OPS); if (opsD) return opsD;
      const avgD = f(b.bat.AVG) - f(a.bat.AVG); if (avgD) return avgD;
      if (b.bat.RBI !== a.bat.RBI) return b.bat.RBI - a.bat.RBI;
      return (b.bat.HR || 0) - (a.bat.HR || 0);
    })
    .slice(0, 3)
    .map(p => ({
      ...p,
      metrics: [
        { label: 'OPS', val: p.bat.OPS, pct: normPct(p.bat.OPS, 0,   2.0) },
        { label: 'AVG', val: p.bat.AVG, pct: normPct(p.bat.AVG, 0,   0.6) },
        { label: 'RBI', val: p.bat.RBI, pct: normPct(p.bat.RBI, 0,  20)   },
      ],
    }));

  // ── Cy Young: IP ≥ 6 (≈50% del promedio de pitchers: 8.3 IP)
  //    Sort: ERA↑ → WHIP↑ → SO↓ → wins↓
  const cy = players
    .filter(p => p.pit && f(p.pit.IP) >= 6)
    .sort((a, b) => {
      const eraD = f(a.pit.ERA) - f(b.pit.ERA); if (eraD) return eraD;
      const whpD = f(a.pit.WHIP) - f(b.pit.WHIP); if (whpD) return whpD;
      if (a.pit.SO !== b.pit.SO) return b.pit.SO - a.pit.SO;
      const wa = parseInt((a.pit.WL||'0-0').split('-')[0]) || 0;
      const wb = parseInt((b.pit.WL||'0-0').split('-')[0]) || 0;
      return wb - wa;
    })
    .slice(0, 3)
    .map(p => ({
      ...p,
      metrics: [
        { label: 'ERA',  val: p.pit.ERA,  pct: normPct(p.pit.ERA,  0, 12, true) },
        { label: 'WHIP', val: p.pit.WHIP, pct: normPct(p.pit.WHIP, 0,  3, true) },
        { label: 'SO',   val: p.pit.SO,   pct: normPct(p.pit.SO,   0, 12)        },
      ],
    }));

  // ── MVP: G ≥ 3 in any category; composite score
  const MAX_SO = Math.max(...players.map(p => p.pit?.SO || 0), 1);
  function mvpScore(p) {
    let sc = 0, cats = 0;
    if (p.bat && p.bat.PA >= 20) {
      sc += f(p.bat.OPS) * 40 + f(p.bat.AVG) * 20;
      cats++;
    }
    if (p.pit && f(p.pit.IP) >= 6) {
      sc += Math.max(0, (12 - f(p.pit.ERA)) / 12) * 30;
      sc += (Math.min(p.pit.SO, MAX_SO) / MAX_SO) * 10;
      cats++;
    }
    if (p.fld && f(p.fld.IP) >= 18) {
      sc += f(p.fld.FPct) * 10;
      cats++;
    }
    if (cats >= 2) sc += 5;
    return Math.round(sc * 10) / 10;
  }

  const mvp = players
    .filter(p => {
      const qualBat = p.bat && p.bat.PA >= 20;
      const qualPit = p.pit && f(p.pit.IP) >= 6;
      const qualFld = p.fld && f(p.fld.IP) >= 18;
      return qualBat || qualPit || qualFld;
    })
    .map(p => ({ ...p, _mvpSc: mvpScore(p) }))
    .sort((a, b) => b._mvpSc - a._mvpSc)
    .slice(0, 3)
    .map(p => ({
      ...p,
      metrics: [
        ...(p.bat && p.bat.PA >= 10 ? [{ label: 'OPS', val: p.bat.OPS, pct: normPct(p.bat.OPS, 0, 2.0) }] : []),
        ...(p.pit && f(p.pit.IP) >= 3 ? [{ label: 'ERA', val: p.pit.ERA, pct: normPct(p.pit.ERA, 0, 12, true) }] : []),
        ...(p.fld ? [{ label: 'FPct', val: p.fld.FPct, pct: normPct(p.fld.FPct, 0.7, 1.0) }] : []),
      ].slice(0, 3),
      mvpSc: p._mvpSc,
    }));

  return { gg, ss, cy, mvp };
}

// ── RENDER AWARDS ─────────────────────────────────────────────
function initAwards() {
  const grid = document.getElementById('awardsGrid');
  if (!grid) return;

  function renderPhoto(p, size) {
    const ini = p.fullName ? p.fullName.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase() : p.num;
    const img = p.img
      ? `<img src="${p.img}" alt="${p.shortName}" onerror="this.parentNode.textContent='${ini}'" />`
      : ini;
    return `<div class="award-photo award-photo--${size}">${img}</div>`;
  }

  function renderMetric(m) {
    return `<div class="award-metric">
      <span class="award-metric-label">${m.label}</span>
      <div class="award-metric-track"><div class="award-metric-fill" style="width:${Math.round(m.pct)}%"></div></div>
      <span class="award-metric-val">${m.val ?? '—'}</span>
    </div>`;
  }

  const AWARD_DEFS = [
    { key:'gg',  icon:'🧤', nameKey:'award_gg_name', descKey:'award_gg_desc' },
    { key:'ss',  icon:'⚾', nameKey:'award_ss_name', descKey:'award_ss_desc' },
    { key:'cy',  icon:'🏆', nameKey:'award_cy_name', descKey:'award_cy_desc' },
    { key:'mvp', icon:'🌟', nameKey:'award_mvp_name', descKey:'award_mvp_desc' },
  ];

  function renderGrid() {
    const awards = calculateAwards();
    if (!awards) { grid.innerHTML = '<p style="color:var(--ink-faint);font-family:var(--mono);font-size:12px;padding:20px;">No player stats available.</p>'; return; }

    const badge = _t('award_badge') || 'CANDIDATE · SEASON IN PROGRESS';

    grid.innerHTML = AWARD_DEFS.map(def => {
      const candidates = awards[def.key] || [];
      if (!candidates.length) return '';
      const [first, ...rest] = candidates;

      const winnerHTML = `
        <div class="award-winner award-clickable" data-player-num="${first.num}">
          ${renderPhoto(first, 'lg')}
          <div class="award-details">
            <div class="award-player-name">${first.fullName}</div>
            <div class="award-player-pos">#${first.num} · ${first.pos}</div>
            <div class="award-metrics">${(first.metrics || []).map(renderMetric).join('')}</div>
            ${first.mvpSc != null ? `<div style="font-family:var(--mono);font-size:10px;color:var(--accent);margin-top:6px;letter-spacing:0.08em;">Score: ${first.mvpSc}</div>` : ''}
          </div>
        </div>`;

      const runnersHTML = rest.length ? `
        <div class="award-runners">
          ${rest.map(c => `
            <div class="award-runner award-clickable" data-player-num="${c.num}">
              ${renderPhoto(c, 'sm')}
              <div class="award-runner-info">
                <span class="award-player-name">${c.shortName}</span>
                <span class="award-score-sm" style="color:var(--accent)">
                  ${c.mvpSc != null ? c.mvpSc : (c.metrics?.[0] ? `${c.metrics[0].label} ${c.metrics[0].val}` : '#' + c.num)}
                </span>
              </div>
              <div class="award-mini-metrics">
                ${(c.metrics || []).slice(0,2).map(m => `
                  <div class="award-mini-bar">
                    <span>${m.label}</span>
                    <div class="award-metric-track"><div class="award-metric-fill" style="width:${Math.round(m.pct)}%"></div></div>
                    <span>${m.val ?? '—'}</span>
                  </div>`).join('')}
              </div>
            </div>`).join('')}
        </div>` : '';

      return `<div class="award-card reveal">
        <div class="award-header">
          <span class="award-icon">${def.icon}</span>
          <div>
            <div class="award-name">${_t(def.nameKey) || def.nameKey}</div>
            <div class="award-desc">${_t(def.descKey) || def.descKey}</div>
          </div>
        </div>
        <div style="padding:8px 20px 0;font-family:var(--mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(240,180,41,0.55);">${badge}</div>
        ${winnerHTML}
        ${runnersHTML}
      </div>`;
    }).join('');

    grid.querySelectorAll('.award-clickable').forEach(el => {
      el.addEventListener('click', () => {
        const player = typeof PLAYER_REGISTRY !== 'undefined' ? PLAYER_REGISTRY.get(el.dataset.playerNum) : null;
        if (player) openPlayerModal(player);
      });
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.1 });
      grid.querySelectorAll('.reveal').forEach(e => io.observe(e));
    } else {
      grid.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
    }
  }

  renderGrid();
  window._barLang?.onLang?.(() => renderGrid());
}

document.addEventListener('DOMContentLoaded', initAwards);

// ── LEAGUE STANDINGS ──────────────────────────────────────────
const STANDINGS_LOGOS = {
  EAG:  'assets/teams/eagles.png',
  BAR:  'assets/teams/BARLOGO.png',
  IND:  'assets/teams/indians.png',
  BAR3: 'assets/teams/Barracudas3.png',
  LIO:  'assets/teams/Lions.png',
  CHA:  'assets/teams/challengers.png',
  CHA2: 'assets/teams/challengers.png',
  FLY:  'assets/teams/flyers.png',
  FLY2: 'assets/teams/flyers.png',
  FRO:  'assets/teams/frogs.png',
};

function standingLogo(t) {
  const src = STANDINGS_LOGOS[t.abbr] || '';
  const ini = (t.abbr || '?')[0];
  // Use background-image div to avoid img onerror quoting bugs
  if (src) {
    return '<div class="sl-circle" style="background-image:url(\'' + src + '\')" title="' + (t.name || t.abbr) + '"></div>';
  }
  return '<div class="sl-circle sl-circle--text">' + ini + '</div>';
}

// ── HERO MINI-STANDINGS ───────────────────────────────────────
function initHeroStandings() {
  const wrap = document.getElementById('heroMiniStandings');
  if (!wrap) return;

  // TOP 6 qualified teams — Gruppe phase final standings (June 9, 2026)
  const FALLBACK = [
    { rank:1, abbr:'FLY',  name:'Zürich Flyers',      w:10, l:0, pct:'1.000', gb:'—', isUs:false },
    { rank:2, abbr:'BAR',  name:'Zürich Barracudas',  w:11, l:1, pct:'.917',  gb:'—', isUs:false },
    { rank:3, abbr:'EAG',  name:'Luzern Eagles',      w:9,  l:1, pct:'.900',  gb:'—', isUs:false },
    { rank:4, abbr:'LIO',  name:'Lions',              w:6,  l:4, pct:'.600',  gb:'—', isUs:false },
    { rank:5, abbr:'BAR3', name:'Barracudas 3',        w:7,  l:5, pct:'.583',  gb:'—', isUs:true  },
    { rank:6, abbr:'CHA',  name:'Challengers',        w:5,  l:5, pct:'.500',  gb:'—', isUs:false },
  ];

  function hmsLogo(abbr) {
    const src = STANDINGS_LOGOS[abbr] || '';
    if (src) return `<div class="hms-logo" style="background-image:url('${src}')" title="${abbr}"></div>`;
    return `<div class="hms-logo hms-logo--ini">${(abbr || '?')[0]}</div>`;
  }

  function render(rows) {
    wrap.innerHTML = `<div class="hms-wrap">
      <div class="hms-head">
        <span class="hms-title">TOP 6 · Swiss League 2026</span>
        <a class="hms-link" href="results.html#standings">Full Standings ↗</a>
      </div>
      ${rows.map(t => `
        <div class="hms-row${t.isUs ? ' hms-us' : ''}">
          <span class="hms-rank">${t.rank}</span>
          ${hmsLogo(t.abbr)}
          <span class="hms-name">${t.isUs ? 'BAR3' : t.name.split(' ').pop()}</span>
          <span class="hms-stat">${t.w}</span>
          <span class="hms-stat">${t.l}</span>
          <span class="hms-pct">${t.pct}</span>
        </div>`).join('')}
    </div>`;
  }

  // Render immediately from hardcoded data
  render(FALLBACK);

  // Silently upgrade from API
  fetch('/.netlify/functions/standings')
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data?.standings?.length) return;
      const rows = data.standings.map((t, i) => ({
        rank: i + 1,
        abbr: t.abbr,
        name: t.name,
        w: t.W ?? t.w ?? 0,
        l: t.L ?? t.l ?? 0,
        pct: t.PCT ?? t.pct ?? '.000',
        isUs: t.isUs ?? t.abbr === 'BAR3',
      }));
      render(rows);
    })
    .catch(() => { /* keep FALLBACK */ });
}

document.addEventListener('DOMContentLoaded', initHeroStandings);

function initStandings() {
  const wrap = document.getElementById('standingsTable');
  if (!wrap) return;

  // Try fetching live data from the API; silently update table if successful
  async function tryFetchLive() {
    try {
      const res = await fetch('/.netlify/functions/standings');
      if (!res.ok) return;
      const data = await res.json();
      if (data.standings?.length) render(data);
    } catch { /* silent — fallback already showing */ }
  }

  function render(data) {
    const rows = data.standings || [];
    const gpL  = _t('standings_gp')   || 'GP';
    const wL   = _t('standings_w')    || 'W';
    const lL   = _t('standings_l')    || 'L';
    const pctL = _t('standings_pct')  || 'PCT';
    const teamL= _t('standings_team') || 'Team';
    const updL = _t('standings_updated') || 'Updated';
    const updated = data.updatedAt
      ? new Date(data.updatedAt).toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
      : '';

    wrap.innerHTML = `
      <div class="standings-table-wrap reveal in">
        <table class="standings-table" aria-label="${data.league}">
          <thead><tr>
            <th>#</th>
            <th>${teamL}</th>
            <th>${gpL}</th>
            <th>${wL}</th>
            <th>${lL}</th>
            <th>${pctL}</th>
            <th>GB</th>
          </tr></thead>
          <tbody>
            ${rows.map(t => `
              <tr class="${t.isUs ? 'standings-us' : ''}">
                <td>${t.rank}</td>
                <td>
                  <div class="standings-team-cell">
                    ${standingLogo(t)}
                    <div>
                      <div class="standings-team-name">${t.name}</div>
                      <div class="standings-abbr">${t.abbr}</div>
                    </div>
                  </div>
                </td>
                <td>${t.gp}</td>
                <td class="standings-w">${t.w}</td>
                <td>${t.l}</td>
                <td class="standings-pct">${t.pct}</td>
                <td class="standings-gb">${t.gb ?? '—'}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      ${updated ? `<div class="standings-meta">${updL}: ${updated}</div>` : ''}`;
  }

  // Static HTML table already in results.html — just upgrade with live data
  tryFetchLive();
}

document.addEventListener('DOMContentLoaded', initStandings);

// ── ADD TO CALENDAR ───────────────────────────────────────────
function _calDateStr(date, time) {
  return date.replace(/-/g, '') + 'T' + time.replace(':', '') + '00';
}
function _calEndStr(date, time) {
  const [h, m] = time.split(':');
  const endH = String(parseInt(h) + 3).padStart(2, '0');
  return date.replace(/-/g, '') + 'T' + endH + m + '00';
}

function openGoogleCal(date, time, opponent, location) {
  const title = encodeURIComponent(`Barracudas 3 vs ${opponent}`);
  const det   = encodeURIComponent('NL Baseball Gruppe A 2026 — Zürich Barracudas');
  const loc   = encodeURIComponent(location);
  const url   = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${_calDateStr(date,time)}/${_calEndStr(date,time)}&details=${det}&location=${loc}`;
  window.open(url, '_blank', 'noopener');
}

function downloadIcs(date, time, opponent, location) {
  const start = _calDateStr(date, time);
  const end   = _calEndStr(date, time);
  const uid   = `barracudas-${date}-${time.replace(':','')}@barracudas3.netlify.app`;
  const ics   = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//Zürich Barracudas//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`, `DTEND:${end}`,
    `SUMMARY:Barracudas 3 vs ${opponent}`,
    'DESCRIPTION:NL Baseball Gruppe A 2026 — Zürich Barracudas',
    `LOCATION:${location}`,
    `UID:${uid}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: `barracudas-vs-${opponent.replace(/\s+/g,'-').toLowerCase()}.ics`,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

function initCalendarButtons() {
  document.querySelectorAll('.schedule-game[data-date]').forEach(game => {
    const date     = game.dataset.date;
    const time     = game.dataset.time || '12:00';
    const opponent = game.dataset.opponent || 'Opponent';
    const isHome   = game.dataset.location === 'home';
    const location = isHome ? 'Heerenschürli\\, Zürich\\, Switzerland' : `${opponent} Field`;
    const arrow    = game.querySelector('.cal-arrow');
    if (!arrow) return;

    const wrap = document.createElement('div');
    wrap.className = 'cal-add-wrap';
    wrap.innerHTML = `
      <button class="cal-add-btn" aria-label="Add to Calendar" title="Add to Calendar">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </button>
      <div class="cal-dropdown" hidden>
        <button class="cal-dd-item" data-cal="google">🗓 Google Calendar</button>
        <button class="cal-dd-item" data-cal="ics">🍎 Apple / iCal</button>
      </div>`;

    arrow.before(wrap);

    wrap.querySelector('.cal-add-btn').addEventListener('click', e => {
      e.stopPropagation();
      const dd = wrap.querySelector('.cal-dropdown');
      document.querySelectorAll('.cal-dropdown:not([hidden])').forEach(d => { if (d !== dd) d.hidden = true; });
      dd.hidden = !dd.hidden;
    });

    wrap.querySelectorAll('.cal-dd-item').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        wrap.querySelector('.cal-dropdown').hidden = true;
        if (item.dataset.cal === 'google') openGoogleCal(date, time, opponent, location);
        else downloadIcs(date, time, opponent, location);
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.cal-dropdown:not([hidden])').forEach(d => { d.hidden = true; });
  });
}

document.addEventListener('DOMContentLoaded', initCalendarButtons);

// ── ONESIGNAL NOTIFICATION BELL ───────────────────────────────
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const tools = document.querySelector('.nav-tools');
    if (!tools) return;

    const bell = document.createElement('button');
    bell.id = 'notifBell';
    bell.className = 'icon-btn notif-bell';
    bell.setAttribute('aria-label', 'Notifications');
    bell.title = 'Subscribe to notifications';
    bell.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
    const themeBtn = tools.querySelector('#theme-toggle');
    if (themeBtn) tools.insertBefore(bell, themeBtn); else tools.prepend(bell);

    function setBellState(isOn) {
      bell.classList.toggle('notif-bell--on', !!isOn);
      bell.title = isOn ? 'Notifications on — click to unsubscribe' : 'Subscribe to notifications';
      localStorage.setItem('barracudas_notifications', isOn ? 'true' : 'false');
    }

    // Check subscription state once SDK is ready
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
      try {
        const isOptedIn = await OneSignal.User.PushSubscription.optedIn;
        setBellState(!!isOptedIn);
      } catch (e) {}
    });

    // Click: always push into deferred queue so SDK is guaranteed ready
    bell.addEventListener('click', () => {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function(OneSignal) {
        try {
          const permission = await OneSignal.Notifications.permission;

          if (!permission) {
            // Browser hasn't granted permission yet — request it
            await OneSignal.Notifications.requestPermission();
          } else {
            // Permission granted — toggle opt-in / opt-out
            const isOptedIn = await OneSignal.User.PushSubscription.optedIn;
            if (isOptedIn) {
              await OneSignal.User.PushSubscription.optOut();
            } else {
              await OneSignal.User.PushSubscription.optIn();
            }
          }

          // Refresh visual state after any action
          const isOptedIn = await OneSignal.User.PushSubscription.optedIn;
          setBellState(!!isOptedIn);
        } catch (e) {
          console.warn('OneSignal bell:', e.message);
        }
      });
    });
  });
})();

// ── ONESIGNAL AUTO-TRIGGERS ──────────────────────────────────
// Client-side: detects live games from EasyScore and sends "🔴 LIVE NOW"
// notification. Uses sessionStorage to avoid spamming the same game.
(function () {
  const SENT_KEY = 'bar3-live-notif-sent';

  async function maybeSendLiveNotif(gameData) {
    if (!gameData?.live) return;
    const gameId = String(gameData.id);
    if (sessionStorage.getItem(SENT_KEY) === gameId) return; // already sent

    try {
      const opp = (gameData.oppName || gameData.oppAbbr || 'opponent').split(' ').slice(-1)[0];
      await fetch('/.netlify/functions/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title:   '🔴 LIVE NOW',
          message: `BAR3 vs ${opp} — Follow live at barracudas3.netlify.app`,
          url:     '/',
          type:    'live',
        }),
      });
      sessionStorage.setItem(SENT_KEY, gameId);
    } catch (e) { /* silent — notification sending is non-critical */ }
  }

  // Hook into live score polling — called from initLiveScore after load
  window._barLiveNotif = maybeSendLiveNotif;
})();

// ── DYNAMIC STATS FROM EASYSCORE API ─────────────────────────
// Fetches fresh data on load (5-min cache).
// Updates: team W-L record, fielding stats per player.
// Batting/pitching not available via /stats — stays hardcoded.
(function initDynamicStats() {
  const CACHE_KEY = 'bar3-sync-cache';
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async function sync() {
    const cached = (() => {
      try {
        const s = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        if (s.fetchedAt && Date.now() - s.fetchedAt < CACHE_TTL) return s;
      } catch {}
      return null;
    })();

    const data = cached || await (async () => {
      try {
        const r = await fetch('/.netlify/functions/sync-stats');
        if (!r.ok) return null;
        const d = await r.json();
        localStorage.setItem(CACHE_KEY, JSON.stringify({ ...d, fetchedAt: Date.now() }));
        return d;
      } catch { return null; }
    })();

    if (!data) return;

    // Update W-L record display
    if (data.record) {
      document.querySelectorAll('[data-i18n="strip_record"]').forEach(el => {
        const sibling = el.nextElementSibling;
        if (sibling) sibling.textContent = data.record.label;
      });
    }

    // Merge API fielding stats into PLAYER_EXTENDED_DATA
    if (data.players && typeof PLAYER_EXTENDED_DATA !== 'undefined') {
      data.players.forEach(p => {
        if (!p.playerID || !p.fielding) return;
        const num = String(p.uniformNr || '');
        if (!num) return;
        // Find by uniform number (maps to PLAYER_REGISTRY key)
        const existing = PLAYER_EXTENDED_DATA[num];
        if (existing && p.fielding) {
          existing.fielding = existing.fielding || {};
          // Update only the season totals from API; preserve per-game log
          existing.fielding.season = {
            ...(existing.fielding.season || {}),
            G:    p.fielding.G,
            IP:   p.fielding.IP,
            PO:   p.fielding.PO,
            A:    p.fielding.A,
            E:    p.fielding.E,
            DP:   p.fielding.DP,
            FPct: p.fielding.FPct,
          };
        }
        // Update player photo in registry if API has one
        if (p.photo) {
          const reg = typeof PLAYER_REGISTRY !== 'undefined' ? PLAYER_REGISTRY.get(num) : null;
          if (reg && !reg.img) reg.img = p.photo;
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', sync);
})();

// ── LIVE SCORE (EasyScore API) ────────────────────────────────
function initLiveScore() {
  const wrap = document.getElementById('liveScoreWrap');
  if (!wrap) return;

  // Local logo map — team abbreviation → local asset path
  const LOGOS = {
    'BAR3':'assets/logo.png',     'ZBA':'assets/logo.png',
    'BAR':'assets/teams/BARLOGO.png', 'NLA':'assets/teams/BARLOGO.png', 'ZBB':'assets/teams/BARLOGO.png',
    'EAG':'assets/teams/eagles.png',  'LUZ':'assets/teams/eagles.png',
    'IND':'assets/teams/indians.png', 'LAU':'assets/teams/indians.png',
    'CHA2':'assets/teams/challengers.png', 'CHA':'assets/teams/challengers.png',
    'FLY2':'assets/teams/flyers.png', 'FLY':'assets/teams/flyers.png', 'THF':'assets/teams/flyers.png',
    'FRO':'assets/teams/frogs.png',   'SIS':'assets/teams/frogs.png',
  };

  function sbLogo(abbr, apiUrl) {
    const src = LOGOS[abbr] || apiUrl || '';
    const ini = (abbr || '?')[0];
    if (src) return `<div class="sb-logo" style="background-image:url('${src}')" title="${abbr}"></div>`;
    return `<div class="sb-logo sb-logo--ini">${ini}</div>`;
  }

  function sbDiamond(b1, b2, b3) {
    const b = (cls, on) => `<div class="sb-base ${cls}${on ? ' sb-base--on' : ''}"></div>`;
    return `<div class="sb-diamond" aria-hidden="true">
      ${b('sb-base--2nd', b2)}${b('sb-base--3rd', b3)}${b('sb-base--1st', b1)}
      <div class="sb-base sb-base--home"></div>
    </div>`;
  }

  function sbBso(balls, strikes, outs) {
    const empty = balls == null;
    function dots(n, max, isOut) {
      return Array.from({ length: max }, (_, i) => {
        const on = !empty && i < n;
        return `<span class="sb-dot${on ? (isOut ? ' sb-dot--out' : ' sb-dot--on') : ''}"></span>`;
      }).join('');
    }
    return `<div class="sb-bso${empty ? ' sb-bso--empty' : ''}">
      <div class="sb-bso-g"><span class="sb-bso-l">B</span><div class="sb-bso-d">${dots(balls, 4, false)}</div></div>
      <div class="sb-bso-g"><span class="sb-bso-l">S</span><div class="sb-bso-d">${dots(strikes, 3, false)}</div></div>
      <div class="sb-bso-g"><span class="sb-bso-l">O</span><div class="sb-bso-d">${dots(outs, 3, true)}</div></div>
    </div>`;
  }

  function sbLinescore(ls, bar3Side, curInn) {
    if (!ls) return '';
    const inns  = Math.max(parseInt(ls.innings || 9), 9);
    const cols  = Array.from({ length: inns }, (_, i) => i + 1);
    const bar3  = ls[bar3Side] || {};
    const opp   = bar3Side === 'away' ? (ls.home || {}) : (ls.away || {});
    const b3l   = bar3.line || {};
    const oppl  = opp.line  || {};

    function cell(val, inn) {
      if (val == null || val === '') return `<td class="sb-lz">·</td>`;
      const cur = curInn && inn === curInn ? ' sb-lcur' : '';
      if ((val === 0 || val === '0') && !cur) return `<td class="sb-lz">0</td>`;
      return `<td class="${cur.trim()}">${val}</td>`;
    }

    return `<table class="sb-ls">
      <thead><tr><th></th>${cols.map(i => `<th>${i}</th>`).join('')}<th class="sb-lsep">R</th><th>H</th><th>E</th></tr></thead>
      <tbody>
        <tr>
          <td class="sb-lteam">${bar3.abbr || 'BAR3'}</td>
          ${cols.map(i => cell(b3l[i], i)).join('')}
          <td class="sb-lsep sb-lr">${bar3.totals?.R ?? '·'}</td>
          <td>${bar3.totals?.H ?? '·'}</td><td>${bar3.totals?.E ?? '·'}</td>
        </tr>
        <tr>
          <td class="sb-lteam">${opp.abbr || 'OPP'}</td>
          ${cols.map(i => cell(oppl[i], i)).join('')}
          <td class="sb-lsep sb-lr">${opp.totals?.R ?? '·'}</td>
          <td>${opp.totals?.H ?? '·'}</td><td>${opp.totals?.E ?? '·'}</td>
        </tr>
      </tbody>
    </table>`;
  }

  function sbTicker(g) {
    const parts = [];
    if (g.bar3Abbr) parts.push(`${g.bar3Abbr}  ${g.bar3Score ?? 0}`);
    if (g.oppAbbr)  parts.push(`${g.oppAbbr}  ${g.oppScore ?? 0}`);
    if (Array.isArray(g.lineup)) {
      g.lineup.slice(0, 5).forEach(p => {
        const n = `${(p.FirstName || p.firstName || '')[0] || ''}. ${p.LastName || p.lastName || p.Name || ''}`.trim();
        if (n.length > 2) parts.push(n);
      });
    }
    const text = parts.join('  ·  ');
    return `${text}  ·  ${text}`;
  }

  function renderBroadcast(g) {
    if (!g) return '';
    const isLive   = g.live;
    const ls       = g.lineScore;
    const innNum   = ls?.innings ? parseInt(ls.innings) : null;
    const b3Ahead  = (g.bar3Score ?? 0) > (g.oppScore ?? 0);
    const oppAhead = (g.oppScore ?? 0) > (g.bar3Score ?? 0);

    const statusText = isLive
      ? (innNum ? `INN ${innNum}` : 'IN PROGRESS')
      : g.finished
        ? `FINAL · ${new Date(g.date).toLocaleDateString('en-US', { month:'short', day:'numeric' })}`
        : 'UPCOMING';

    return `<div class="sb-wrap">
      <div class="sb-row1">
        <div class="sb-teams">
          <div class="sb-team">
            ${sbLogo(g.bar3Abbr, g.bar3Logo)}
            <span class="sb-abbr">${g.bar3Abbr || 'BAR3'}</span>
            <span class="sb-score${b3Ahead ? ' sb-score--lead' : ''}">${g.bar3Score ?? 0}</span>
          </div>
          <span class="sb-vsep">—</span>
          <div class="sb-team sb-team--r">
            <span class="sb-score${oppAhead ? ' sb-score--lead' : ''}">${g.oppScore ?? 0}</span>
            <span class="sb-abbr">${g.oppAbbr || 'OPP'}</span>
            ${sbLogo(g.oppAbbr, g.oppLogo)}
          </div>
        </div>
        <div class="sb-center">
          ${innNum ? `<div class="sb-inn"><span class="sb-inn-n">${innNum}</span><span class="sb-inn-l">INN</span></div>` : ''}
          ${sbDiamond(false, false, false)}
          ${sbBso(null, null, null)}
        </div>
        <div class="sb-right">
          <span class="sb-pill${isLive ? ' sb-pill--live' : ' sb-pill--done'}">${isLive ? '🔴 LIVE' : statusText}</span>
          ${isLive ? `<div class="sb-ticker-rail"><div class="sb-ticker">${sbTicker(g)}</div></div>` : ''}
        </div>
      </div>
      <div class="sb-row2">
        <div class="sb-ls-wrap">${sbLinescore(ls, g.bar3Side, isLive ? innNum : null)}</div>
        <a href="results.html" class="sb-cta">${_t('btn_all_boxscores') || 'ALL BOXSCORES →'}</a>
      </div>
    </div>`;
  }

  // ── Hero live card ───────────────────────────────────────────
  function updateHeroLiveBadge(liveGame, nextGame) {
    const card = document.getElementById('heroLiveCard');
    if (!card) return;

    if (liveGame) {
      const b3 = liveGame.bar3Score ?? 0;
      const op = liveGame.oppScore  ?? 0;
      const score = `${liveGame.bar3Abbr || 'BAR3'} ${b3} — ${op} ${liveGame.oppAbbr || 'OPP'}`;
      card.style.display = 'block';
      card.innerHTML = `<a class="hero-live-btn hero-live-btn--live" href="#liveScoreWrap"
          onclick="event.preventDefault();document.getElementById('liveScoreWrap').scrollIntoView({behavior:'smooth'})">
          <span class="hero-live-dot"></span>
          <span class="hero-live-label">LIVE NOW</span>
          <span class="hero-live-score">${score}</span>
        </a>`;
    } else if (nextGame) {
      const dt  = new Date(`${nextGame.date}T${nextGame.time || '00:00'}:00`);
      const ds  = dt.toLocaleDateString('en-US', { month:'short', day:'numeric' }).toUpperCase();
      const ts  = `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
      const opp = nextGame.opponent.split(' ').pop().toUpperCase();
      card.style.display = 'block';
      card.innerHTML = `<a class="hero-live-btn hero-live-btn--next" href="schedule.html">
          <span class="hero-live-label">NEXT UP</span>
          <span class="hero-live-score">${opp} · ${ds} · ${ts}</span>
        </a>`;
    } else {
      card.style.display = 'none';
    }
  }

  let _pollTimer = null;

  async function load() {
    // Admin can force-hide the scoreboard; default is ON for all visitors
    if (localStorage.getItem('barracudas_scoreboard_active') === 'false') {
      wrap.style.display = 'none';
      return;
    }

    try {
      const res  = await fetch('/.netlify/functions/easyscore');
      if (!res.ok) throw new Error();
      const data = await res.json();

      // ── State: LIVE ──────────────────────────────────────────
      if (data.live) {
        wrap.style.display = 'block';
        wrap.innerHTML = renderBroadcast(data.live);
        updateHeroLiveBadge(data.live, null);
        window._barLiveNotif?.(data.live);
        if (_pollTimer) clearTimeout(_pollTimer);
        _pollTimer = setTimeout(load, 30000); // poll every 30s while live
        return;
      }

      // ── State: FINAL (recent finished game) ──────────────────
      if (data.recent) {
        wrap.style.display = 'block';
        wrap.innerHTML = renderBroadcast(data.recent);
        // Hero shows next upcoming game, not a finished game
        const next = GAMES.find(g => g.result === null && new Date(`${g.date}T${g.time || '23:59'}:00`) > new Date());
        updateHeroLiveBadge(null, next ?? null);
        if (_pollTimer) clearTimeout(_pollTimer);
        return;
      }

      // ── State: no data ───────────────────────────────────────
      wrap.style.display = 'none';
      const next = GAMES.find(g => g.result === null && new Date(`${g.date}T${g.time || '23:59'}:00`) > new Date());
      updateHeroLiveBadge(null, next ?? null);
      if (_pollTimer) clearTimeout(_pollTimer);

    } catch {
      // Fallback: manual score from localStorage (admin/score.html)
      const s = JSON.parse(localStorage.getItem('bar3-live') || '{}');
      if (!s.us && s.us !== 0) {
        wrap.style.display = 'none';
        const next = GAMES.find(g => g.result === null && new Date(`${g.date}T${g.time || '23:59'}:00`) > new Date());
        updateHeroLiveBadge(null, next ?? null);
        return;
      }
      wrap.style.display = 'block';
      wrap.innerHTML = `<div class="sb-wrap"><div class="sb-row1">
        <div class="sb-teams">
          <div class="sb-team">${sbLogo('BAR3','')}<span class="sb-abbr">BAR3</span><span class="sb-score sb-score--lead">${s.us}</span></div>
          <span class="sb-vsep">—</span>
          <div class="sb-team sb-team--r"><span class="sb-score">${s.them}</span><span class="sb-abbr">OPP</span><div class="sb-logo sb-logo--ini">O</div></div>
        </div>
        <div class="sb-right"><span class="sb-pill sb-pill--live">🔴 LIVE${s.inning ? ' · ' + s.inning : ''}</span></div>
      </div></div>`;
      updateHeroLiveBadge({ bar3Abbr:'BAR3', bar3Score:s.us, oppAbbr:'OPP', oppScore:s.them }, null);
    }
  }

  // Expose so initDynamicData can trigger a refresh when it detects a live game
  window._refreshScoreboard = load;

  load();
}

document.addEventListener('DOMContentLoaded', initLiveScore);

// ── DYNAMIC DATA OVERLAY (pipeline games-api) ──────────────────
// Fetches the latest game results and auto-generated articles from
// the Netlify pipeline function and merges them into GAMES[] and
// NEWS_ARTICLES[] at runtime — no site rebuild needed.
(function initDynamicData() {
  async function fetchAndMerge() {
    try {
      const r = await fetch('/.netlify/functions/games-api');
      if (!r.ok) return;
      const data = await r.json();

      let changed = false;

      // ── Overlay game results onto static GAMES[] ──────────────
      if (Array.isArray(data.games)) {
        for (const dg of data.games) {
          if (!dg.finished && !dg.live) continue;

          // Match by date and opponent name (fuzzy last-word match)
          const dgDate = dg.date || '';
          const dgOpp  = (dg.oppName || '').split(' ').pop().toLowerCase();

          // For doubleheaders: find the first unfilled slot matching date+opponent
          const candidates = GAMES.filter(g => {
            if (!g.date || g.date !== dgDate) return false;
            const localOpp = g.opponent.split(' ').pop().toLowerCase();
            return localOpp === dgOpp || g.opponent.toLowerCase().includes(dgOpp);
          });
          const match = candidates.find(g => g.result === null);

          if (match) {
            match.result  = dg.won ? 'W' : 'L';
            match.score   = { us: dg.bar3Score ?? 0, them: dg.oppScore ?? 0 };
            match.innings = parseInt(dg.innings) || 9;
            changed = true;
          }
        }

        // Re-render recent results and next match if data changed
        if (changed) {
          initRecentResults();
          initFirstPitch();
        }
      }

      // ── Prepend pipeline-generated articles to NEWS_ARTICLES[] ─
      if (Array.isArray(data.articles) && data.articles.length) {
        let articlesAdded = false;
        for (const a of data.articles) {
          if (NEWS_ARTICLES.find(x => x.id === a.id)) continue; // already present
          const art = a.article || {};
          NEWS_ARTICLES.unshift({
            id:       a.id,
            date:     a.date,
            tag:      art.tag_en    || 'Game Recap',
            tagColor: '#F0B429',
            headline: art.title_en  || '',
            summary:  art.subtitle_en || '',
            body:     art.body_en   || '',
            image:    'assets/nightgame-7.jpg',
            href:     `article.html?id=${a.id}`,
            score:    { us: a.game?.bar3Score ?? 0, them: a.game?.oppScore ?? 0 },
            opponent: a.game?.oppName || '',
            location: 'Home · Heerenschürli',
            featured: true,
            i18n: {
              es: { tag: art.tag_es, headline: art.title_es, summary: art.subtitle_es, body: art.body_es },
              de: { tag: art.tag_de, headline: art.title_de, summary: art.subtitle_de, body: art.body_de },
            },
          });
          articlesAdded = true;
        }
        if (articlesAdded) {
          _sortNews();
          initHeroNews();
          initNewsFeature();
          if (typeof window.refreshNewsGrid === 'function') window.refreshNewsGrid();
        }
      }

      // ── Update W-L record display ─────────────────────────────
      if (data.record?.label) {
        document.querySelectorAll('[data-i18n="strip_record"]').forEach(el => {
          const v = el.nextElementSibling;
          if (v) v.textContent = data.record.label;
        });
      }

      // ── If games-api reports a live game, wake up the scoreboard ─
      if (data.live && typeof window._refreshScoreboard === 'function') {
        window._refreshScoreboard();
      }

      // ── Re-render Top Performers + Awards after any data update ─
      initPlayerStats();
      initAwards();
    } catch { /* silent — static data already visible */ }
  }

  document.addEventListener('DOMContentLoaded', fetchAndMerge);
})();

// Instagram feed rendered by Behold.so widget (see index.html)

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
      html += `<div class="pm-log-label">${_t('modal_game_log')}</div>${pmTable(lh, lr, [13], 580)}`;
    }
    return html || `<p class="pm-no-data">${_t('modal_no_bat_data')}</p>`;
  }
  const batStats = basicStats.filter(s => ['AVG','HR','RBI','OBP','SLG','OPS','SB'].includes(s.k));
  if (!batStats.length) return `<p class="pm-no-data">${_t('modal_no_bat_data')}</p>`;
  return pmSummary(batStats.map(s => [s.k, s.v])) + `<p class="pm-no-data">${_t('modal_no_log')}</p>`;
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
      html += `<div class="pm-log-label">${_t('modal_game_log')}</div>${pmTable(lh, lr, [11], 500)}`;
    }
    return html || `<p class="pm-no-data">${_t('modal_no_pit_data')}</p>`;
  }
  const pitStats = basicStats.filter(s => ['ERA','K','W-L','WHIP'].includes(s.k));
  if (!pitStats.length) return `<p class="pm-no-data">${_t('modal_no_pit_data')}</p>`;
  return pmSummary(pitStats.map(s => [s.k, s.v])) + `<p class="pm-no-data">${_t('modal_no_log')}</p>`;
}

function pmFieldingPane(ext) {
  if (!ext?.fielding) return `<p class="pm-no-data">${_t('modal_no_fld_data')}</p>`;
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
    html += `<div class="pm-log-label">${_t('modal_game_log')}</div>${pmTable(lh, lr, [7], 400)}`;
  }
  return html || `<p class="pm-no-data">${_t('modal_no_fld_data')}</p>`;
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
  const typeMap = { batter: 'modal_batter_type', pitcher: 'modal_pitcher_type', both: 'modal_two_way_type' };
  const typeLabel = _t(typeMap[player.type] || 'modal_batter_type');
  badgeEl.textContent = `#${player.num} · ${typeLabel}${ext?.age ? ' · ' + ext.age : ''}`;
  nameEl.textContent  = ext?.fullName || `${player.first} ${player.last}`;
  const meta = [player.pos, player.flag + ' ' + player.country];
  if (ext?.bats)   meta.push(`${_t('modal_bats')} ${ext.bats}`);
  if (ext?.throws) meta.push(`${_t('modal_throws')} ${ext.throws}`);
  posEl.textContent = meta.join(' · ');

  // Build tabs
  const tabs = [];
  if (player.type !== 'pitcher') tabs.push({ id:'batting',  label: _t('modal_tab_batting')  });
  if (player.type !== 'batter')  tabs.push({ id:'pitching', label: _t('modal_tab_pitching') });
  if (ext?.fielding)             tabs.push({ id:'fielding', label: _t('modal_tab_fielding') });

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
  if (player.streak > 0) chips.push(`${player.streak} ${_t('modal_streak_chip')}`);
  extraEl.innerHTML = chips.map(c => `<span class="pm-chip">${c}</span>`).join('');
  extraEl.style.display = chips.length ? '' : 'none';

  // EasyScore link
  linksEl.innerHTML = player.easyscoreId
    ? `<a class="pm-easyscore-link" href="https://www.easyscore.com/players/${player.easyscoreId}" target="_blank" rel="noopener">${_t('modal_easyscore')}</a>`
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