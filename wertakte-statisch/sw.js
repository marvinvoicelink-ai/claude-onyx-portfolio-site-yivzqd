/* Service Worker der Wertakte.
   Zweck: die App laesst sich aufs Handy legen und laeuft danach auch ohne
   Netz — im Ortstermin, im Keller, im Funkloch. Die Daten selbst liegen
   ohnehin im Geraet (localStorage und IndexedDB), hier geht es nur um die
   Programmdateien.

   Bei jeder Aenderung an den Dateien die Fassung hochzaehlen. Der alte
   Zwischenspeicher wird dann beim naechsten Start geloescht. */
var FASSUNG = 'wertakte-v1';

var DATEIEN = [
  './',
  './index.html',
  './app.css',
  './onyx-dunkel.css',
  './manifest.webmanifest',
  './schriften/schriften.css',
  './schriften/archivo-latin-wght-normal.woff2',
  './schriften/instrument-sans-latin-wght-normal.woff2',
  './schriften/ibm-plex-mono-latin-400-normal.woff2',
  './schriften/ibm-plex-mono-latin-500-normal.woff2',
  './js/seed.js',
  './js/format.js',
  './js/speicher.js',
  './js/bausteine.js',
  './js/seiten.js',
  './js/zentrale.js',
  './js/app.js',
  './symbole/symbol-192.png',
  './symbole/symbol-512.png',
  './symbole/symbol-maskierbar-512.png',
  './symbole/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(FASSUNG).then(function (c) { return c.addAll(DATEIEN); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (namen) {
      return Promise.all(namen.map(function (n) {
        return n === FASSUNG ? null : caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Aus dem Zwischenspeicher antworten, im Hintergrund erneuern. So startet
   die App sofort und holt sich die naechste Fassung fuers naechste Mal. */
self.addEventListener('fetch', function (e) {
  var anfrage = e.request;
  if (anfrage.method !== 'GET') return;
  var adresse = new URL(anfrage.url);
  if (adresse.origin !== self.location.origin) return;

  e.respondWith(
    caches.open(FASSUNG).then(function (c) {
      return c.match(anfrage).then(function (treffer) {
        var ausDemNetz = fetch(anfrage).then(function (antwort) {
          if (antwort && antwort.status === 200 && antwort.type === 'basic') {
            c.put(anfrage, antwort.clone());
          }
          return antwort;
        }).catch(function () {
          /* Kein Netz: die Startseite beantwortet jede Navigation, der
             Rest der App liegt ohnehin im Zwischenspeicher. */
          return treffer || (anfrage.mode === 'navigate' ? c.match('./index.html') : undefined);
        });
        return treffer || ausDemNetz;
      });
    })
  );
});
