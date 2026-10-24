/* ------------------------------------------------------------------
   EuropaSoft — service worker

   Rôle : rendre le site utilisable hors ligne et le faire démarrer
   instantanément. Aucune donnée d'usage n'est collectée ni transmise :
   le cache est local au navigateur, et rien n'en sort.

   Stratégies
   - Navigation (les pages) : réseau d'abord, cache en secours, puis la
     page « hors ligne ». Une page fraîche prime sur une page rapide.
   - Ressources du site (CSS, JS, images) : cache d'abord, avec
     rafraîchissement en arrière-plan. Elles changent avec la version.
   - Tout le reste (autres domaines) : on ne touche à rien.

   À CHAQUE MISE EN LIGNE : incrémenter VERSION, sinon les anciens
   fichiers resteront servis depuis le cache.
   ------------------------------------------------------------------ */

const VERSION = 'v2';
const CACHE = 'europasoft-' + VERSION;
const PAGE_HORS_LIGNE = 'hors-ligne.html';

/* Chemins relatifs : le site fonctionne aussi bien à la racine d'un
   domaine que dans un sous-dossier (GitHub Pages, par exemple). */
const A_PRECHARGER = [
  './',
  './index.html',
  './applications.html',
  './contact.html',
  './mentions-legales.html',
  './hors-ligne.html',
  './manifest.webmanifest',
  './assets/css/style.css',
  './assets/js/donnees.js',
  './assets/js/app.js',
  './assets/js/carrousel.js',
  './assets/js/contact.js',
  './assets/js/pwa.js',
  './assets/img/logo-europasoft-horizontal.png',
  './assets/img/favicon-64.png',
  './assets/img/icone-192.png',
  './assets/img/icone-512.png',
  './assets/img/apps/clio/clio-banniere-1024x500.png',
  './assets/img/apps/clio/clio-icone-512.png',
  './assets/img/apps/calliope/calliope-icone.svg',
  './assets/img/apps/chasseur/chasseur-icone-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      /* addAll échoue en bloc si un seul fichier manque : on ajoute un
         par un pour qu'une ressource absente ne casse pas l'install. */
      Promise.all(
        A_PRECHARGER.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => null)
        )
      )
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const noms = await caches.keys();
      await Promise.all(
        noms
          .filter((n) => n.startsWith('europasoft-') && n !== CACHE)
          .map((n) => caches.delete(n))
      );
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      await self.clients.claim();
    })()
  );
});

/* La page peut demander l'activation immédiate d'une version en attente. */
self.addEventListener('message', (e) => {
  if (e.data === 'activer-maintenant') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // rien à faire ailleurs

  if (req.mode === 'navigate') {
    e.respondWith(reseauDAbord(e));
    return;
  }

  e.respondWith(cacheDAbord(req));
});

async function reseauDAbord(e) {
  const cache = await caches.open(CACHE);
  try {
    const prechargee = await e.preloadResponse;
    const reponse = prechargee || (await fetch(e.request));
    /* On ne met en cache qu'une réponse valide : une 404 passagère
       mise en cache resservirait une page d'erreur pendant des jours. */
    if (reponse && reponse.ok && reponse.type === 'basic') {
      cache.put(e.request, reponse.clone());
    }
    return reponse;
  } catch (err) {
    const enCache = await cache.match(e.request);
    if (enCache) return enCache;
    const secours = await cache.match(PAGE_HORS_LIGNE);
    if (secours) return secours;
    return new Response('Hors ligne.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function cacheDAbord(req) {
  const cache = await caches.open(CACHE);
  const enCache = await cache.match(req);

  const depuisLeReseau = fetch(req)
    .then((reponse) => {
      if (reponse && reponse.ok && reponse.type === 'basic') {
        cache.put(req, reponse.clone());
      }
      return reponse;
    })
    .catch(() => null);

  /* Servie depuis le cache tout de suite ; la copie fraîche remplacera
     la précédente pour la prochaine visite. */
  return enCache || (await depuisLeReseau) || Response.error();
}
