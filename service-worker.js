// Assign name and version to cache
const cacheName = "v1";

// Assets to cache
const urlsToCache = [
  "./",
  "./img/logo.png",
  "./img/icons/android-chrome-192x192.png",
  "./img/icons/android-chrome-256x256.png",
  "./img/icons/apple-touch-icon.png",
  "./img/icons/browserconfig.xml",
  "./img/icons/favicon-16x16.png",
  "./img/icons/favicon-32x32.png",
  "./img/icons/favicon.ico",
  "./img/icons/mstile-150x150.png",
  "./img/icons/safari-pinned-tab.svg",
  "./styles/style.css",
];

// Call Install Event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.error("Service Worker: Error Caching Files", err))
  );
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [cacheName];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cacheWhiteList.indexOf(cache) === -1) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(e.request);
    })
  );
});
