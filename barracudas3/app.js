/* ============================================================
   BARRACUDAS — App scripts
============================================================ */

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
  const open = document.getElementById('menu-open');
  const close = document.getElementById('menu-close');
  if (!menu) return;
  open && open.addEventListener('click', () => menu.classList.add('open'));
  close && close.addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

// SCROLL REVEAL
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(e => io.observe(e));
})();

/* ============================================================
   EASYSCORE STATS — Anthropic API integration
   Fetches 2026 season stats for each player via web_search
   Caches results in localStorage, refreshes weekly
============================================================ */

const STATS_CACHE_KEY  = 'barracudas_stats_2026_v3';
const STATS_TIME_KEY   = 'barracudas_stats_time_v3';
const STATS_WEEK_MS    = 7 * 24 * 60 * 60 * 1000;
const EASYSCORE_LEAGUE = 10144;
const EASYSCORE_YEAR   = 2026;

// Fetch stats for a single player from EasyScore via Anthropic API
async function fetchOnePlayerStats(player) {
  const url = `https://www.easyscore.com/playerstats/${player.easyscoreId}?yr=${EASYSCORE_YEAR}&lg=${EASYSCORE_LEAGUE}&rd=0`;

  const isPitcher = player.type === 'pitcher';
  const isBoth    = player.type === 'both';

  const prompt = `Visit this URL and extract the 2026 season baseball statistics: ${url}

Return ONLY a valid JSON object, no text, no markdown, no backticks:
{
  "batting": {
    "G": 0, "AB": 0, "R": 0, "H": 0, "2B": 0, "3B": 0, "HR": 0,
    "RBI": 0, "BB": 0, "SO": 0, "SB": 0, "CS": 0, "HBP": 0,
    "AVG": ".000", "OBP": ".000", "SLG": ".000", "OPS": ".000"
  },
  "pitching": {
    "G": 0, "GS": 0, "IP": "0.0", "H": 0, "R": 0, "ER": 0,
    "BB": 0, "SO": 0, "HR": 0, "WP": 0, "WL": "0-0",
    "SV": 0, "BF": 0, "OppAVG": ".000", "WHIP": "0.00", "ERA": "0.00"
  }
}
If a section shows "No stats available" use null for that section. Return ONLY the JSON.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        system: 'You extract baseball stats from EasyScore URLs and return ONLY valid JSON. No markdown, no extra text, no backticks.',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    const text = (data.content || []).map(b => b.text || '').join('').trim();
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.warn(`Stats fetch failed for ${player.first} ${player.last}:`, e);
    return null;
  }
}

// Build the 4 stat boxes shown on the back of the card based on player type + fetched data
function buildCardStats(player, fetched) {
  const b = fetched && fetched.batting;
  const p = fetched && fetched.pitching;
  const dash = '—';

  // Helper: show value or dash
  const v = (val) => (val !== undefined && val !== null && val !== '0' && val !== 0 && val !== '.000' && val !== '0.00' && val !== '0-0') ? String(val) : dash;

  if (player.type === 'pitcher') {
    return [
      { k: 'ERA',  v: p ? v(p.ERA)  : dash },
      { k: 'K',    v: p ? v(p.SO)   : dash },
      { k: 'W-L',  v: p ? v(p.WL)   : dash },
      { k: 'WHIP', v: p ? v(p.WHIP) : dash }
    ];
  }

  if (player.type === 'both') {
    return [
      { k: 'AVG',  v: b ? v(b.AVG)  : dash },
      { k: 'ERA',  v: p ? v(p.ERA)  : dash },
      { k: 'K',    v: p ? v(p.SO)   : dash },
      { k: 'OPS',  v: b ? v(b.OPS)  : dash }
    ];
  }

  // Batter — pick the right 4 stats per original design
  const statKeys = player.stats.map(s => s.k);
  return statKeys.map(k => {
    let val = dash;
    if (b) {
      const map = {
        'AVG': b.AVG, 'OBP': b.OBP, 'SLG': b.SLG, 'OPS': b.OPS,
        'HR': b.HR, 'RBI': b.RBI, 'SB': b.SB, '2B': b['2B'],
        '3B': b['3B'], 'H': b.H, 'R': b.R, 'BB': b.BB
      };
      if (map[k] !== undefined) val = v(map[k]);
    }
    return { k, v: val };
  });
}

// Inject fetched stats into a rendered card's back face
function injectStatsIntoCard(cardEl, player, fetched) {
  const statsEl = cardEl.querySelector('.stats');
  if (!statsEl) return;

  const stats = buildCardStats(player, fetched);

  statsEl.innerHTML = stats.map(s => `
    <div>
      <div class="k">${s.k}</div>
      <div class="v" style="${s.v !== '—' ? 'color:var(--accent)' : ''}">${s.v}</div>
    </div>
  `).join('');

  // Update year label on back foot
  const foot = cardEl.querySelector('.back-team');
  if (foot) foot.textContent = 'Barracudas · 2026';

  // Add a subtle "live" indicator if we have real data
  if (fetched) {
    const backHead = cardEl.querySelector('.back-head');
    if (backHead && !backHead.querySelector('.live-dot')) {
      const dot = document.createElement('span');
      dot.className = 'live-dot';
      dot.title = 'Stats from EasyScore 2026';
      dot.style.cssText = `
        display:inline-block;width:6px;height:6px;border-radius:50%;
        background:var(--accent);margin-left:6px;vertical-align:middle;
        animation:pulse-dot 2s infinite;
      `;
      backHead.querySelector('.pos').appendChild(dot);
    }
  }
}

// Main: load all roster stats
async function loadRosterStats(force = false) {
  const grid = document.querySelector('.roster-grid');
  if (!grid) return;

  // Check cache
  if (!force) {
    const lastTime = localStorage.getItem(STATS_TIME_KEY);
    const cached   = localStorage.getItem(STATS_CACHE_KEY);
    if (lastTime && cached && (Date.now() - parseInt(lastTime)) < STATS_WEEK_MS) {
      try {
        const data = JSON.parse(cached);
        applyStatsToCards(grid, data);
        setStatsStatus(`Stats cached · ${new Date(parseInt(lastTime)).toLocaleDateString('es-CH')}`);
        return;
      } catch (e) { /* fall through */ }
    }
  }

  // Load fresh
  const btn   = document.getElementById('stats-refresh-btn');
  const icon  = document.getElementById('stats-refresh-icon');
  const label = document.getElementById('stats-refresh-label');
  if (btn) btn.disabled = true;
  if (icon) { icon.style.display = 'inline-block'; icon.style.animation = 'spin-icon 1s linear infinite'; }
  if (label) label.textContent = 'Loading…';

  let roster;
  try {
    roster = JSON.parse(document.getElementById('roster-data').textContent);
  } catch (e) { return; }

  const results = {};
  let done = 0;

  for (const player of roster) {
    if (!player.easyscoreId) { done++; continue; }

    setStatsStatus(`Loading ${player.first} ${player.last}… (${done + 1}/${roster.length})`);
    const fetched = await fetchOnePlayerStats(player);
    results[player.easyscoreId] = fetched;
    done++;

    // Inject immediately as each player loads
    const cardEl = grid.querySelector(`[data-playerid="${player.easyscoreId}"]`);
    if (cardEl) injectStatsIntoCard(cardEl, player, fetched);
  }

  // Save to cache
  try {
    localStorage.setItem(STATS_CACHE_KEY, JSON.stringify(results));
    localStorage.setItem(STATS_TIME_KEY, Date.now().toString());
  } catch (e) {}

  const now = new Date().toLocaleString('es-CH');
  setStatsStatus(`✓ Updated · ${now}`);
  if (btn)  btn.disabled = false;
  if (icon) icon.style.animation = '';
  if (label) label.textContent = 'Update 2026 Stats';
}

// Apply cached stats to already-rendered cards
function applyStatsToCards(grid, cachedData) {
  let roster;
  try { roster = JSON.parse(document.getElementById('roster-data').textContent); } catch (e) { return; }
  roster.forEach(player => {
    const fetched = cachedData[player.easyscoreId] || null;
    const cardEl  = grid.querySelector(`[data-playerid="${player.easyscoreId}"]`);
    if (cardEl) injectStatsIntoCard(cardEl, player, fetched);
  });
}

function setStatsStatus(msg) {
  const el = document.getElementById('stats-status');
  if (el) el.textContent = msg;
}

// Public: called by the "Update Stats" button
function refreshRosterStats() {
  loadRosterStats(true);
}

/* ============================================================
   ROSTER — render flip cards from JSON, then load stats
============================================================ */
(function () {
  const grid = document.querySelector('.roster-grid');
  const data = document.getElementById('roster-data');
  if (!grid || !data) return;

  let roster;
  try { roster = JSON.parse(data.textContent); } catch (e) { return; }

  grid.innerHTML = roster.map((p, i) => `
    <div class="player reveal${p.captain ? ' is-captain' : ''}"
         data-delay="${i % 4}"
         data-playerid="${p.easyscoreId || ''}">
      <div class="player-inner">
        <div class="player-face player-front" style="background-image:url('${p.img}');">
          ${p.captain ? '<span class="captain-badge">★ Captain</span>' : ''}
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
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe newly created reveals
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    grid.querySelectorAll('.reveal').forEach(e => io.observe(e));
  } else {
    grid.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  }

  // Flip on click
  grid.querySelectorAll('.player').forEach(p => {
    p.addEventListener('click', () => p.classList.toggle('flipped'));
  });

  // Add pulse animation style
  if (!document.getElementById('live-dot-style')) {
    const style = document.createElement('style');
    style.id = 'live-dot-style';
    style.textContent = `
      @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
      @keyframes spin-icon { to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  // Auto-load stats (from cache if fresh, otherwise fetch)
  loadRosterStats(false);
})();

/* ============================================================
   LIGHTBOX
============================================================ */
(function () {
  const items = document.querySelectorAll('[data-lightbox]');
  const lb = document.getElementById('lightbox');
  if (!lb || !items.length) return;
  const imgEl = lb.querySelector('.lightbox-img');
  const counter = lb.querySelector('.lightbox-counter');
  let idx = 0;
  const srcs = Array.from(items).map(i => i.getAttribute('data-lightbox'));

  function show(i) {
    idx = (i + srcs.length) % srcs.length;
    if (imgEl) imgEl.src = srcs[idx];
    if (counter) counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(srcs.length).padStart(2, '0')}`;
  }
  items.forEach((it, i) => it.addEventListener('click', () => {
    show(i);
    lb.classList.add('open');
  }));
  lb.querySelector('.lightbox-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.querySelector('.lightbox-nav.prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lightbox-nav.next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lb.classList.remove('open');
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();

/* ============================================================
   CALENDAR FILTER
============================================================ */
(function () {
  const chips = document.querySelectorAll('[data-filter]');
  const rows = document.querySelectorAll('[data-team]');
  if (!chips.length) return;
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    const f = c.getAttribute('data-filter');
    rows.forEach(r => {
      const t = r.getAttribute('data-team');
      r.style.display = (f === 'all' || t === f) ? '' : 'none';
    });
  }));
})();

/* ============================================================
   COUNTDOWN
============================================================ */
(function () {
  const wrap = document.getElementById('countdown');
  if (!wrap) return;
  const target = new Date(wrap.getAttribute('data-target')).getTime();
  function tick() {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const map = { d, h, m, s };
    wrap.querySelectorAll('[data-cd]').forEach(el => {
      el.textContent = String(map[el.getAttribute('data-cd')]).padStart(2, '0');
    });
  }
  tick(); setInterval(tick, 1000);
})();