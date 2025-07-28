const CACHE_NAME = "pl-predictor-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./logos/", // include if you cache team logos
  // add other CSS/JS/logo assets
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
