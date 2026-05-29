self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('neuralmusic-v1').then((cache) => {
      return cache.addAll([
        '/neuralmusic/',
        '/neuralmusic/index.html'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});