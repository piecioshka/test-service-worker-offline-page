const VERSION = '1.0.0';

const PRECACHE_FILES = [
    './',
    './index.html',
    './offline.html',
];

// -----------------------------------------------------------------------------

self.addEventListener('install', (evt) => {
    console.log('Event: install', { evt });

    evt.waitUntil(handleInstall());
});

async function handleInstall() {
    const cache = await caches.open(VERSION);
    await cache.addAll(PRECACHE_FILES);
    return self.skipWaiting();
}

// -----------------------------------------------------------------------------

self.addEventListener('fetch', (evt) => {
    console.log('Event: fetch', { evt });
    evt.respondWith(handleActivate(evt));
});

async function handleActivate(evt) {
    const request = evt.request;
    const isOffline = !navigator.onLine;

    const cache = await caches.open(VERSION);

    if (isOffline) {
        return await cache.match(new Request('offline.html'));
    }

    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    const response = await fetch(request.clone());
    await cache.put(request, response.clone());
    return response;
}
