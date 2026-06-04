const CACHE = 'barracudas-v3';  // bump when JS files change

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
  '/data-schedule.js',
  '/data-players.js',
  '/app.js',
  '/lang.js',
  '/manifest.json',
  '/assets/logo.png',
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
// - HTML pages  → Network First (fresh content, fall back to cache, then offline.html)
// - Assets      → Cache First (fast, update in background)
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  const isHTML = request.headers.get('accept')?.includes('text/html');

  if (isHTML) {
    // Network First for HTML
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
    // Cache First for assets (JS, CSS, images)
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
