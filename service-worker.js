importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if(workbox)
    console.log('Workbox Berhasil Diload!');
else
    console.log('Workbox gagal dimuat');
    
workbox.precaching.precacheAndRoute([
    { url: '/navbar.html', revision: '1'},
    { url: '/index.html', revision: '1'},
    { url: '/assets/css/materialize.min.css', revision: '1'},
    { url: '/assets/css/style.css', revision: '1'},
    { url: '/assets/js/materialize.min.js', revision: '1'},
    { url: '/assets/js/navbar.js', revision: '1'},
    { url: '/assets/js/register-sw.js', revision: '1'},
    { url: '/assets/js/api.js', revision: '1'},
    { url: '/assets/js/moment.js', revision: '1'},
    { url: '/assets/js/db-controller.js', revision: '1'},
    { url: '/assets/js/idb.js', revision: '1'},
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1'},
    { url: '/pages/standing.html', revision: '1'},
    { url: '/pages/favorites.html', revision: '1'},
    { url: '/pages/jadwal.html', revision: '1'},
    { url: '/manifest.json', revision: '1'},
    { url: '/assets/image/iconPWA.png', revision: '1'},
]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'data-api',
        plugins: [
            //Menyimpan ke dalam cache
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxEntries: 40,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('/assets/js/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'javascript'
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'image',
        plugin: [
            new workbox.expiration.Plugin({
                maxEntries: 40,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ]
    })
);

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Pesan Push Tanpa Payload';
    }
    var options = {
        body: body,
        icon: 'assets/image/iconpwa.png',
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