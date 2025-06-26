const CACHE_NAME = "mood-journal-cache-v2";
const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./favicon.ico",
    "./favicon-16x16.png",
    "./favicon-32x32.png",
    "./apple-touch-icon.png",
    "./android-chrome-192x192.png",
    "./android-chrome-512x512.png",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/chart.js"
];


self.addEventListener("install", event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files...');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to cache files:', error);
            })
    );
    self.skipWaiting();
});


self.addEventListener("activate", event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});


self.addEventListener("fetch", event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }


    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                
                if (response) {
                    console.log('Serving from cache:', event.request.url);
                    return response;
                }
                
                console.log('Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then(response => {
                    
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

            
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.error('Fetch failed:', error);
                        
                        throw error;
                    });
            })
    );
});
