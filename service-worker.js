const APP_CACHE = "obra-certa-shell-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./supabase-config.js",
  "./manifest.webmanifest",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== APP_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetchAndCache(request).catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    fetchAndCache(request).catch(() => caches.match(request))
  );
});

async function fetchAndCache(request) {
  const networkResponse = await fetch(request);
  if (!networkResponse || networkResponse.status !== 200) {
    return networkResponse;
  }

  const clonedResponse = networkResponse.clone();
  const cache = await caches.open(APP_CACHE);
  await cache.put(request, clonedResponse);
  return networkResponse;
}
