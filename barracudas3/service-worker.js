const CACHE = 'barracudas-v4';  // bumped — data-players.js now Network First

// Static shell files that are safe to precache (change rarely)
const PRECACHE = [
  '/',
  '/index.html',
  '/schedule.html',
  '/results.html',
  '/news.html',
  '/article.html',
  '/player.html',
  '/pink-game-recap.html',
  '/offline.html',
  '/styles.css',
  '/results.css',
  '/app.js',
  '/lang.js',
  '/manifest.json',
  '/assets/logo.png',
];

// Data files that must always be fresh — served Network First
const DATA_FILES = [
  '/data-players.js',
  '/data-schedule.js',
];

// Install — pre-cache shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate — purge old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - HTML pages        → Network First (always fresh, fall back to cache)
// - Data JS files     → Network First (player stats / schedule must never be stale)
// - Other assets      → Cache First with background revalidation (fast)
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  const isHTML     = request.headers.get('accept')?.includes('text/html');
  const isDataFile = DATA_FILES.some(f => url.pathname === f);

  if (isHTML || isDataFile) {
    // Network First — always try network, fall back to cache
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(request, clone));
          return res;
        })
        .catch(() =>
          caches.match(request)
            .then(cached => cached || caches.match('/offline.html'))
        )
    );
  } else {
    // Cache First for static assets (CSS, images, fonts, etc.)
    e.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          // Revalidate in background
          fetch(request).then(res => {
            caches.open(CACHE).then(cache => cache.put(request, res));
          }).catch(() => {});
          return cached;
        }
        return fetch(request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(request, clone));
          return res;
        }).catch(() => caches.match('/offline.html'));
      })
    );
  }
});
