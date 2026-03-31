const V = 'su-v2';
const PRE = ['/', '/index.html', '/manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(PRE)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (/firebase|googleapis|gstatic|openstreetmap/.test(e.request.url)) return;
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
