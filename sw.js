importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/idb.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/CSS/materialize.min.css', revision: '1' },
    { url: '/CSS/style.css', revision: '1' },
    { url: '/JS/materialize.min.js', revision: '1' },
    { url: '/JS/navbar.js', revision: '1' },
    { url: '/JS/APIteam.js', revision: '1' },
    { url: '/JS/APItopscore.js', revision: '1' },
    { url: '/JS/IDB.js', revision: '1' },
    { url: '/JS/TeamFavIDB.js', revision: '1' },
    { url: '/img/notfound.png', revision: '1' },
    { url: '/images/icons/icon-72x72.png', revision: '1' },
    { url: '/images/icons/icon-96x96.png', revision: '1' },
    { url: '/images/icons/icon-128x128.png', revision: '1' },
    { url: '/images/icons/icon-144x144.png', revision: '1' },
    { url: '/images/icons/icon-152x152.png', revision: '1' },
    { url: '/images/icons/icon-192x192.png', revision: '1' },
    { url: '/images/icons/icon-384x384.png', revision: '1' },
    { url: '/images/icons/icon-512x512.png', revision: '1' },
]);

workbox.routing.registerRoute(
    new RegExp('pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

//If Cache Notfound then add Cache from server
self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/";

    if (event.request.url.indexOf(base_url) > -1) {

        const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();
        event.respondWith(staleWhileRevalidate.handle({ event }));


    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});




self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Notifikasi BolaKu';
    }
    var options = {
        body: body,
        icon: 'images/icons/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});