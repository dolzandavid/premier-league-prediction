const CACHE_NAME = "pl-predictor-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./logos/arsenal.png",
  "./logos/aston-villa.png",
  "./logos/bournemouth.png",
  "./logos/brentford.png",
  "./logos/brighton.png",
  "./logos/burnley.png",
  "./logos/chelsea.png",
  "./logos/crystal-palace.png",
  "./logos/everton.png",
  "./logos/fulham.png",
  "./logos/leeds.png",
  "./logos/liverpool.png",
  "./logos/man-city.png",
  "./logos/man-utd.png",
  "./logos/newcastle.png",
  "./logos/nottm-forest.png",
  "./logos/spurs.png",
  "./logos/sunderland.png",
  "./logos/west-ham.png",
  "./logos/wolves.png"  
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
