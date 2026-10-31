// AnyOnlineTools PWA Service Worker - Offline-First Performance & Safe Next.js Cache
const CACHE_NAME = 'anyonlinetools-v2';
const STATIC_ASSETS = [
  '/manifest.json',
  '/icon.svg',
  '/favicon.ico',
  '/logo.png',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/maskable-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // CRITICAL: NEVER intercept or cache Next.js internal chunks, webpack modules, or HMR.
  // Caching webpack chunks breaks Fast Refresh and causes options.factory undefined errors.
  if (
    url.includes('/_next/') ||
    url.includes('webpack') ||
    url.includes('hot-update') ||
    url.includes('/api/') ||
    url.startsWith('chrome-extension')
  ) {
    return;
  }

  // For HTML navigations, use Network-First so updates reflect instantly
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => cached || caches.match('/'));
        })
    );
    return;
  }

  // Only cache designated static image assets and manifest
  if (STATIC_ASSETS.some(asset => url.endsWith(asset))) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  }
});
