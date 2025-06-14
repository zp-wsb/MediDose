const CACHE_NAME = 'medidose-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/logo192.png',
  '/logo512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🗂️ Cache otwarty');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
