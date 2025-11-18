// public/sw.js - This needs to be in the public directory

const CACHE_NAME = 'prompt-website-v1';
const urlsToCache = [
    '/',
    '/index.html', // React-ல் இது single-page app-இன் index.html-ஐ குறிக்கிறது
    '/manifest.json',
    '/logo192.png',
    '/logo512.png',
    // ஆப்-இன் ஸ்டைல்ஸ் மற்றும் பிற முக்கிய அசெட்களை இங்கே சேர்க்கவும்
];

self.addEventListener('install', event => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching assets');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(error => {
                    console.error('Fetch failed:', error);
                    // Return a fallback response or handle the error
                    // For now, just log the error to prevent uncaught promise
                });
            })
    );
});

// Firebase Messaging event listener for push notifications
self.addEventListener('push', event => {
    let data = {};
    if (event.data) {
        // Payload handling: data.json() is needed to parse the data
        try {
            data = event.data.json();
        } catch (e) {
            console.error("Push event data not valid JSON:", e);
            data = { title: "New Notification", body: "New update available!" };
        }
    }

    const options = {
        body: data.body || 'New post available!',
        icon: '/logo192.png',
        badge: '/logo192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
            url: data.url || '/prompts' // Notification click path, e.g., /prompts/card/7 for new card
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Prompt Website', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    // Get the URL from the data property
    const clickUrl = event.notification.data.url;

    event.waitUntil(
        clients.openWindow(clickUrl)
    );
});