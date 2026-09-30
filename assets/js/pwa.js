/* ------------------------------------------------------------------
   EuropaSoft — installation et mise à jour de l'application

   Trois choses :
   1. enregistrer le service worker (impossible en file:// — c'est
      normal, le site reste entièrement utilisable sans lui) ;
   2. proposer l'installation quand le navigateur la permet ;
   3. signaler discrètement qu'une nouvelle version est prête.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  /* ---------------- 1. Service worker ------------------------------ */

  /* L'invitation à installer peut arriver avant le chargement complet :
     on écoute tout de suite. Les scripts étant en fin de page, le bouton
     est déjà dans le document. */
  brancherInstallation();

  if (!('serviceWorker' in navigator) || location.protocol === 'file:') {
    /* Ouverture par double-clic ou navigateur ancien : on s'arrête là,
       sans message d'erreur. Le site fonctionne, simplement sans cache
       hors ligne ni installation. */
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(surveillerMiseAJour)
      .catch(() => {
        /* Enregistrement refusé (origine non sécurisée, réglage du
           navigateur) : sans conséquence pour le reste du site. */
      });
  });

  /* ---------------- 2. Proposition d'installation ------------------ */

  let invite = null;

  function brancherInstallation() {
    const bouton = document.getElementById('installer-app');
    if (!bouton) return;

    window.addEventListener('beforeinstallprompt', (e) => {
      /* Le navigateur accepte d'installer : on garde l'invitation pour
         la déclencher sur un vrai clic, seul moment où elle est
         autorisée. */
      e.preventDefault();
      invite = e;
      bouton.hidden = false;
    });

    bouton.addEventListener('click', async () => {
      if (!invite) return;
      bouton.hidden = true;
      invite.prompt();
      await invite.userChoice;
      invite = null;
    });

    window.addEventListener('appinstalled', () => {
      invite = null;
      bouton.hidden = true;
    });
  }

  /* ---------------- 3. Nouvelle version prête ---------------------- */

  function surveillerMiseAJour(enregistrement) {
    if (enregistrement.waiting) return annoncerMiseAJour(enregistrement.waiting);

    enregistrement.addEventListener('updatefound', () => {
      const arrivant = enregistrement.installing;
      if (!arrivant) return;
      arrivant.addEventListener('statechange', () => {
        /* « installed » avec un contrôleur déjà en place = il ne s'agit
           pas de la première visite : une version plus récente attend. */
        if (arrivant.state === 'installed' && navigator.serviceWorker.controller) {
          annoncerMiseAJour(arrivant);
        }
      });
    });

    let rechargee = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (rechargee) return;
      rechargee = true;
      window.location.reload();
    });
  }

  function annoncerMiseAJour(travailleur) {
    if (document.querySelector('.bandeau-maj')) return;

    const bandeau = document.createElement('div');
    bandeau.className = 'bandeau-maj';
    bandeau.setAttribute('role', 'status');
    bandeau.innerHTML =
      '<p>Une nouvelle version du site est prête.</p>' +
      '<button class="bouton bouton--primaire" type="button">Recharger</button>' +
      '<button class="bouton bouton--fantome" type="button">Plus tard</button>';

    const [recharger, plusTard] = bandeau.querySelectorAll('button');
    recharger.addEventListener('click', () => {
      travailleur.postMessage('activer-maintenant');
      bandeau.remove();
    });
    plusTard.addEventListener('click', () => bandeau.remove());

    document.body.appendChild(bandeau);
  }
})();
