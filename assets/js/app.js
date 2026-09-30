/* ------------------------------------------------------------------
   EuropaSoft — comportement du site
   JavaScript natif, aucune bibliothèque. Le site reste lisible sans
   JavaScript pour l'essentiel (en-tête, méthode, contact, pied) ; ce
   fichier construit le catalogue et les fiches à partir de donnees.js.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  const $ = (sel, racine) => (racine || document).querySelector(sel);
  const $$ = (sel, racine) => Array.from((racine || document).querySelectorAll(sel));

  /* Échappement : les données viennent du dépôt, mais la règle vaut
     pour tout ce qui est injecté en HTML. */
  const esc = (v) =>
    String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  /* ---------------- Jeu d'icônes ---------------------------------- */

  const ICONES = {
    bouclier: '<path d="M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9-4.1-1.1-7-4.8-7-9V6l7-3Z"/><path d="M9.2 12.2l2 2 3.6-3.9"/>',
    eclair: '<path d="M13 3L5 13.5h5.5L10 21l8-10.5h-5.5L13 3Z"/>',
    code: '<path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>',
    web: '<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z"/>',
    android: '<path d="M6 10h12v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7Z"/><path d="M8.5 10L7 6.5M15.5 10L17 6.5M4 12v4M20 12v4M10 21v-2M14 21v-2"/>',
    apple: '<path d="M16 3c-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.8 2.5 1 .1 2-.4 2.6-1.1.6-.7 1-1.7.7-2.7Z"/><path d="M19 16.5c-.5 1.2-.8 1.7-1.4 2.7-.9 1.4-2.1 3.1-3.6 3.1-1.3 0-1.7-.9-3.5-.9s-2.2.9-3.5.9c-1.5 0-2.6-1.5-3.5-2.9C1.6 16 1.3 11.4 3.1 9c.9-1.2 2.3-2 3.8-2 1.5 0 2.5 1 3.7 1 1.2 0 2-1 3.7-1 1.3 0 2.7.7 3.7 2-3.2 1.8-2.7 6.4 1 7.5Z"/>',
    windows: '<path d="M3 6.2l7.2-1v6.3H3V6.2Z"/><path d="M11.6 5l9.4-1.3v7.8h-9.4V5Z"/><path d="M3 12.9h7.2v6.2L3 18V12.9Z"/><path d="M11.6 12.9H21v7.8l-9.4-1.3v-6.5Z"/>',
    linux: '<path d="M12 3c2.4 0 3.4 2 3.4 4.4 0 1.6.4 2.3 1.3 3.6 1.2 1.8 2.3 3.4 2.3 5.2 0 2.3-1.6 3.8-3.4 3.8-1.2 0-2.1-.5-3.6-.5s-2.4.5-3.6.5c-1.8 0-3.4-1.5-3.4-3.8 0-1.8 1.1-3.4 2.3-5.2.9-1.3 1.3-2 1.3-3.6C8.6 5 9.6 3 12 3Z"/><path d="M10.4 8.3h.01M13.6 8.3h.01"/>',
    watch: '<rect x="7" y="6" width="10" height="12" rx="3"/><path d="M9 6l.6-3h4.8L15 6M9 18l.6 3h4.8l.6-3"/>',
    pwa: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
    telecharger: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19h14"/>',
    externe: '<path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
    fleche: '<path d="M9 6l6 6-6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    play: '<path d="M4.5 3.3v17.4c0 .6.6 1 1.1.7l12.6-8.7c.5-.3.5-1.1 0-1.4L5.6 2.6c-.5-.3-1.1.1-1.1.7Z"/><path d="M13.6 9.2 5 20.9M13.6 14.8 5 3.1"/>',
    appstore: '<path d="M16 3c-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.8 2.5 1 .1 2-.4 2.6-1.1.6-.7 1-1.7.7-2.7Z"/><path d="M19 16.5c-.5 1.2-.8 1.7-1.4 2.7-.9 1.4-2.1 3.1-3.6 3.1-1.3 0-1.7-.9-3.5-.9s-2.2.9-3.5.9c-1.5 0-2.6-1.5-3.5-2.9C1.6 16 1.3 11.4 3.1 9c.9-1.2 2.3-2 3.8-2 1.5 0 2.5 1 3.7 1 1.2 0 2-1 3.7-1 1.3 0 2.7.7 3.7 2-3.2 1.8-2.7 6.4 1 7.5Z"/>',
    installer: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 8v6M9 11.5l3 3 3-3"/>',
    github:
      '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>',
  };

  const icone = (nom, classe) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
    (classe ? ' class="' + classe + '"' : '') +
    '>' +
    (ICONES[nom] || '') +
    '</svg>';

  /* Correspondance plateforme → icône */
  const ICONE_PLATEFORME = {
    Web: 'web',
    PWA: 'pwa',
    Android: 'android',
    iOS: 'apple',
    macOS: 'apple',
    watchOS: 'watch',
    Windows: 'windows',
    Linux: 'linux',
  };

  /* ---------------- Rendu : promesses ----------------------------- */

  function rendrePromesses() {
    const cible = $('#promesses');
    if (!cible) return;
    cible.innerHTML = EUROPASOFT.promesses
      .map(
        (p) => `
      <li class="promesse revelation">
        <div class="promesse__icone">${icone(p.icone)}</div>
        <h3>${esc(p.titre)}</h3>
        <p>${esc(p.texte)}</p>
      </li>`
      )
      .join('');
  }

  /* Pastilles de stores. Un store sans URL n'est jamais un lien : il
     reste affiché, inactif, avec la mention « non déposée ». */
  function pastillesStores(app) {
    const entrees = [];

    (app.stores || []).forEach((st) => {
      const contenu =
        icone(st.id === 'play' ? 'play' : 'appstore') +
        `<span><small>${st.url ? 'Disponible sur' : 'Non déposée sur'}</small>
           <strong>${esc(st.nom)}</strong></span>`;
      entrees.push(
        st.url
          ? `<a class="store" href="${esc(st.url)}" target="_blank" rel="noopener">${contenu}</a>`
          : `<span class="store" aria-disabled="true">${contenu}</span>`
      );
    });

    if (app.installable) {
      entrees.push(
        `<span class="store store--pwa">${icone('installer')}
           <span><small>Sans store</small>
             <strong>Installable depuis le navigateur</strong></span></span>`
      );
    }

    return entrees.length
      ? `<div class="stores">${entrees.join('')}</div>`
      : '';
  }

  /* ---------------- Rendu : cartes d'applications ------------------ */

  function etiquetteStatut(app) {
    const dispo = app.statut === 'disponible';
    return `<span class="etiquette etiquette--${dispo ? 'disponible' : 'developpement'}">
      <i class="pastille"></i>${dispo ? 'Disponible' : 'En développement'}</span>`;
  }

  function carte(app, detaillee) {
    const web = app.liens && app.liens.essai;
    const dl = (app.telechargements || []).some((t) => t.url);

    const actionPrincipale = web
      ? `<a class="bouton bouton--primaire" href="${esc(web)}" target="_blank" rel="noopener">
           ${icone('externe')}${esc(app.liens.essaiLibelle || 'Ouvrir')}</a>`
      : dl
        ? `<button class="bouton bouton--primaire" type="button" data-fiche="${esc(app.id)}">
             ${icone('telecharger')}Télécharger</button>`
        : `<button class="bouton bouton--primaire" type="button" data-fiche="${esc(app.id)}">
             ${icone('info')}En savoir plus</button>`;

    return `
    <article class="carte-app revelation" id="${esc(app.id)}"
             style="--app-c1:${esc(app.accent[0])};--app-c2:${esc(app.accent[1])}"
             data-statut="${esc(app.statut)}" data-web="${web ? 'oui' : 'non'}">
      <div class="carte-app__tete">
        <div class="carte-app__sceau" aria-hidden="true">${esc(app.monogramme)}</div>
        <div class="carte-app__identite">
          <h3 class="carte-app__titre">${esc(app.nom)}
            <span class="carte-app__version">${esc(app.version)}</span>
          </h3>
          <p class="carte-app__baseline">${esc(app.baseline)}</p>
        </div>
        <div class="carte-app__etat">${etiquetteStatut(app)}</div>
      </div>

      <p class="carte-app__resume">${esc(app.resume)}</p>

      <ul class="plateformes">
        ${app.plateformes
          .map(
            (p) =>
              `<li>${icone(ICONE_PLATEFORME[p] || 'web')}${esc(p)}</li>`
          )
          .join('')}
      </ul>

      ${detaillee ? pastillesStores(app) : ''}

      <div class="carte-app__actions">
        ${actionPrincipale}
        ${
          web || dl
            ? `<button class="bouton bouton--fantome" type="button" data-fiche="${esc(app.id)}">
                 Fiche détaillée</button>`
            : ''
        }
      </div>
    </article>`;
  }

  function rendreApplications() {
    const grille = $('#grille-apps');
    if (!grille) return;
    const detaillee = grille.classList.contains('grille-apps--detaillee');
    grille.innerHTML = EUROPASOFT.applications
      .map((app) => carte(app, detaillee))
      .join('');

    const publiees = EUROPASOFT.applications.filter((a) => a.statut === 'disponible').length;
    const compteur = $('#chiffre-apps');
    if (compteur) compteur.textContent = String(publiees);

    const liste = $('#pied-apps');
    if (liste) {
      liste.innerHTML = EUROPASOFT.applications
        .map((a) => `<li><a href="#${esc(a.id)}">${esc(a.nom)}</a></li>`)
        .join('');
    }
  }

  /* ---------------- Rendu : journal des mises à jour --------------- */

  function rendreJournal() {
    const cible = $('#journal');
    if (!cible) return;

    const parApp = {};
    EUROPASOFT.applications.forEach((a) => (parApp[a.id] = a));

    cible.innerHTML = EUROPASOFT.actualites
      .map((e) => {
        const app = parApp[e.app] || {};
        const accent = app.accent || ['#2AA7E8', '#0E5FA8'];
        return `
      <li class="entree revelation" style="--app-c1:${esc(accent[0])};--app-c2:${esc(accent[1])}">
        <div class="entree__date">
          <time datetime="${esc(e.date)}">${esc(e.dateLisible)}</time>
        </div>
        <div class="entree__corps">
          <div class="entree__tete">
            <span class="entree__sceau" aria-hidden="true">${esc(app.monogramme || '?')}</span>
            <h3>${esc(e.titre)}</h3>
          </div>
          <ul class="liste-points">
            ${e.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}
          </ul>
          <button class="bouton bouton--fantome" type="button" data-fiche="${esc(e.app)}">
            Voir ${esc(app.nom || 'l’application')}</button>
        </div>
      </li>`;
      })
      .join('');
  }

  /* ---------------- Filtres --------------------------------------- */

  function brancherFiltres() {
    const boutons = $$('.filtre');
    const vide = $('#aucun-resultat');

    boutons.forEach((b) => {
      b.addEventListener('click', () => {
        boutons.forEach((autre) =>
          autre.setAttribute('aria-pressed', String(autre === b))
        );

        const f = b.dataset.filtre;
        let visibles = 0;

        $$('.carte-app').forEach((carte) => {
          const ok =
            f === 'tout' ||
            (f === 'web' && carte.dataset.web === 'oui') ||
            carte.dataset.statut === f;
          carte.hidden = !ok;
          if (ok) visibles += 1;
        });

        if (vide) vide.hidden = visibles !== 0;
      });
    });
  }

  /* ---------------- Fiche détaillée -------------------------------- */

  const fiche = $('#fiche');
  const ficheCorps = $('#fiche-corps');
  let dernierFocus = null;

  function lignesTelechargement(app) {
    if (!app.telechargements || app.telechargements.length === 0) return '';

    const lignes = app.telechargements
      .map((t) => {
        const detail = [t.format, t.taille].filter(Boolean).join(' · ');
        const contenu = `
          <span class="telechargement__icone">${icone('telecharger')}</span>
          <span>
            <strong>${esc(t.plateforme)}</strong>
            <small>${esc(t.url ? detail : detail ? detail + ' · bientôt' : 'bientôt')}</small>
          </span>
          <span class="telechargement__fleche">${icone('fleche')}</span>`;

        return t.url
          ? `<a class="telechargement" href="${esc(t.url)}" target="_blank" rel="noopener" download>${contenu}</a>`
          : `<div class="telechargement" aria-disabled="true">${contenu}</div>`;
      })
      .join('');

    const note = app.telechargements.find((t) => t.note);

    return `
      <div class="fiche__bloc">
        <h3>Téléchargement</h3>
        <div class="telechargements">${lignes}</div>
        ${
          note
            ? `<div class="note" style="margin-top:.75rem">${icone('info')}<p style="margin:0">${esc(note.note)}</p></div>`
            : ''
        }
      </div>`;
  }

  function contenuFiche(app) {
    const web = app.liens && app.liens.essai;
    const depot = app.liens && app.liens.depot;

    return `
    <div style="--app-c1:${esc(app.accent[0])};--app-c2:${esc(app.accent[1])}">
      <div class="fiche__tete">
        <div class="carte-app__sceau" aria-hidden="true">${esc(app.monogramme)}</div>
        <div>
          <h2 id="fiche-titre">${esc(app.nom)}</h2>
          <p class="fiche__muse">${esc(app.muse)}</p>
        </div>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.5rem">
        ${etiquetteStatut(app)}
        <span class="etiquette">Version ${esc(app.version)}</span>
        ${app.dateVersion ? `<span class="etiquette">${esc(app.dateVersion)}</span>` : ''}
        <span class="etiquette">${esc(app.categorie)}</span>
      </div>

      <p style="color:var(--texte-doux)">${esc(app.resume)}</p>

      ${app.avis ? `<div class="note">${icone('info')}<p style="margin:0">${esc(app.avis)}</p></div>` : ''}

      <div class="fiche__bloc">
        <h3>Ce qu’elle fait</h3>
        <ul class="liste-points">
          ${app.points.map((p) => `<li>${esc(p)}</li>`).join('')}
        </ul>
      </div>

      <div class="fiche__bloc">
        <h3>Plateformes</h3>
        <ul class="plateformes">
          ${app.plateformes
            .map((p) => `<li>${icone(ICONE_PLATEFORME[p] || 'web')}${esc(p)}</li>`)
            .join('')}
        </ul>
      </div>

      ${
        (app.stores && app.stores.length) || app.installable
          ? `<div class="fiche__bloc">
               <h3>Stores</h3>
               ${pastillesStores(app)}
             </div>`
          : ''
      }

      ${lignesTelechargement(app)}

      <div class="carte-app__actions" style="margin-top:1.5rem">
        ${
          web
            ? `<a class="bouton bouton--primaire" href="${esc(web)}" target="_blank" rel="noopener">
                 ${icone('externe')}${esc(app.liens.essaiLibelle || 'Ouvrir')}</a>`
            : ''
        }
        ${
          depot
            ? `<a class="bouton bouton--secondaire" href="${esc(depot)}" target="_blank" rel="noopener">
                 ${icone('github')}Code source</a>`
            : ''
        }
        <a class="bouton bouton--fantome" href="mailto:${esc(EUROPASOFT.societe.contact)}?subject=${encodeURIComponent(app.nom)}">
          Signaler un défaut</a>
      </div>
    </div>`;
  }

  function ouvrirFiche(id) {
    const app = EUROPASOFT.applications.find((a) => a.id === id);
    if (!app || !fiche) return;

    dernierFocus = document.activeElement;
    ficheCorps.innerHTML = contenuFiche(app);
    fiche.dataset.ouvert = 'oui';
    document.body.style.overflow = 'hidden';
    $('#fermer-fiche').focus();
  }

  function fermerFiche() {
    if (!fiche || fiche.dataset.ouvert !== 'oui') return;
    fiche.dataset.ouvert = 'non';
    document.body.style.overflow = '';
    if (dernierFocus) dernierFocus.focus();
  }

  function brancherFiche() {
    document.addEventListener('click', (e) => {
      const declencheur = e.target.closest('[data-fiche]');
      if (declencheur) {
        e.preventDefault();
        ouvrirFiche(declencheur.dataset.fiche);
        return;
      }
      if (e.target === fiche) fermerFiche();
    });

    $('#fermer-fiche').addEventListener('click', fermerFiche);

    /* Piège à tabulation : le focus reste dans le panneau ouvert. */
    document.addEventListener('keydown', (e) => {
      if (fiche.dataset.ouvert !== 'oui') return;
      if (e.key === 'Escape') {
        fermerFiche();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = $$(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        $('#fiche-panneau')
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const premier = focusables[0];
      const dernier = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    });
  }

  /* ---------------- Tiroir de navigation --------------------------- */

  function brancherTiroir() {
    const tiroir = $('#tiroir');
    const ouvrir = $('#ouvrir-menu');
    const fermer = $('#fermer-menu');
    if (!tiroir || !ouvrir) return;

    const basculer = (etat) => {
      tiroir.dataset.ouvert = etat ? 'oui' : 'non';
      ouvrir.setAttribute('aria-expanded', String(etat));
      document.body.style.overflow = etat ? 'hidden' : '';
      if (etat) $('.tiroir__panneau a', tiroir).focus();
      else ouvrir.focus();
    };

    ouvrir.addEventListener('click', () => basculer(true));
    fermer.addEventListener('click', () => basculer(false));
    tiroir.addEventListener('click', (e) => {
      if (e.target === tiroir || e.target.tagName === 'A') basculer(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && tiroir.dataset.ouvert === 'oui') basculer(false);
    });
  }

  /* ---------------- Thème clair / sombre --------------------------- */

  function brancherTheme() {
    const bouton = $('#bascule-theme');
    const racine = document.documentElement;
    if (!bouton) return;

    const lune = $('.icone-lune', bouton);
    const soleil = $('.icone-soleil', bouton);

    const appliquer = (theme) => {
      racine.dataset.theme = theme;
      const clair = theme === 'clair';
      lune.hidden = clair;
      soleil.hidden = !clair;
      bouton.setAttribute(
        'aria-label',
        clair ? 'Passer au thème sombre' : 'Passer au thème clair'
      );
      try {
        localStorage.setItem('europasoft-theme', theme);
      } catch (err) {
        /* navigation privée ou stockage refusé : sans importance */
      }
    };

    let initial = null;
    try {
      initial = localStorage.getItem('europasoft-theme');
    } catch (err) {
      /* idem */
    }
    /* Le sombre est le thème par défaut : c'est l'identité visuelle du
       site. Le choix de l'utilisateur, lui, est mémorisé. */
    if (initial !== 'clair' && initial !== 'sombre') initial = 'sombre';
    appliquer(initial);

    bouton.addEventListener('click', () =>
      appliquer(racine.dataset.theme === 'clair' ? 'sombre' : 'clair')
    );
  }

  /* ---------------- En-tête, révélations, section courante --------- */

  function brancherDefilement() {
    const entete = $('#entete');
    const majEntete = () => {
      if (entete) entete.dataset.defile = window.scrollY > 8 ? 'oui' : 'non';
    };
    majEntete();
    window.addEventListener('scroll', majEntete, { passive: true });

    if (!('IntersectionObserver' in window)) {
      $$('.revelation').forEach((el) => (el.dataset.vue = 'oui'));
      return;
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (e.isIntersecting) {
            e.target.dataset.vue = 'oui';
            observateur.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    $$('.revelation').forEach((el) => observateur.observe(el));

  }

  /* ---------------- Divers ----------------------------------------- */

  function completerCoordonnees() {
    const annee = $('#annee');
    if (annee) annee.textContent = String(new Date().getFullYear());

    const contact = $('#lien-contact');
    if (contact) contact.href = 'mailto:' + EUROPASOFT.societe.contact;

    const gh = $('#lien-github');
    if (gh) gh.href = EUROPASOFT.societe.github;
  }

  /* ---------------- Démarrage --------------------------------------- */

  function demarrer() {
    rendrePromesses();
    rendreApplications();
    rendreJournal();
    brancherFiltres();
    brancherFiche();
    brancherTiroir();
    brancherTheme();
    brancherDefilement();
    completerCoordonnees();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', demarrer);
  } else {
    demarrer();
  }
})();
