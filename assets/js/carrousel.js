/* ------------------------------------------------------------------
   EuropaSoft — carrousel des applications (page d'accueil)

   Le défilement est celui du navigateur : la piste est une simple zone
   défilante avec accrochage CSS (scroll-snap). Les flèches, les points
   et la lecture automatique ne font que la piloter. Conséquence : le
   glissement du doigt, la molette et le clavier fonctionnent seuls, et
   sans JavaScript la piste reste défilable à la main.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  const piste = document.getElementById('carrousel-piste');
  if (!piste || typeof EUROPASOFT === 'undefined') return;

  const cadre = document.getElementById('carrousel');
  const pointsBoite = document.getElementById('carrousel-points');
  const boutonPrec = document.getElementById('carrousel-precedent');
  const boutonSuiv = document.getElementById('carrousel-suivant');
  const boutonPause = document.getElementById('carrousel-pause');
  const pauseTexte = document.getElementById('carrousel-pause-texte');
  const annonce = document.getElementById('carrousel-annonce');

  const apps = EUROPASOFT.applications;
  const total = apps.length;
  const DELAI = 7000;

  const esc = (v) =>
    String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const moinsAnime = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------- Construction des diapositives ------------------ */

  piste.innerHTML = apps
    .map((app, i) => {
      const web = app.liens && app.liens.essai;
      const dispo = app.statut === 'disponible';

      const action = web
        ? `<a class="bouton bouton--primaire" href="${esc(web)}" target="_blank" rel="noopener">
             ${esc(app.liens.essaiLibelle || 'Ouvrir')}</a>`
        : `<a class="bouton bouton--primaire" href="applications.html#${esc(app.id)}">
             Voir l’application</a>`;

      return `
      <article class="diapo" role="group" aria-roledescription="diapositive"
               aria-label="${esc(app.nom)}, ${i + 1} sur ${total}"
               style="--app-c1:${esc(app.accent[0])};--app-c2:${esc(app.accent[1])}">
        <div class="diapo__texte">
          <span class="etiquette etiquette--${dispo ? 'disponible' : 'developpement'}">
            <i class="pastille"></i>${dispo ? 'Disponible' : 'En développement'}
          </span>
          <h2>${esc(app.nom)}</h2>
          <p class="diapo__baseline">${esc(app.baseline)}</p>
          <p class="diapo__resume">${esc(app.resume)}</p>
          <div class="diapo__actions">
            ${action}
            <button class="bouton bouton--secondaire" type="button" data-fiche="${esc(app.id)}">
              Fiche détaillée</button>
          </div>
        </div>

        <div class="diapo__visuel" aria-hidden="true">
          <div class="diapo__halo"></div>
          <div class="diapo__sceau">${esc(app.monogramme)}</div>
          <ul class="diapo__plateformes">
            ${app.plateformes.slice(0, 4).map((p) => `<li>${esc(p)}</li>`).join('')}
            ${app.plateformes.length > 4 ? `<li>+${app.plateformes.length - 4}</li>` : ''}
          </ul>
        </div>
      </article>`;
    })
    .join('');

  /* ---------------- Points de navigation --------------------------- */

  pointsBoite.innerHTML = apps
    .map(
      (app, i) =>
        `<button class="carrousel__point" type="button" data-index="${i}"
                 aria-label="Aller à ${esc(app.nom)}"
                 aria-current="${i === 0 ? 'true' : 'false'}"></button>`
    )
    .join('');

  const points = Array.from(pointsBoite.querySelectorAll('.carrousel__point'));
  const diapos = Array.from(piste.querySelectorAll('.diapo'));
  let courant = 0;

  /* ---------------- Déplacement ------------------------------------ */

  function allerA(index, doux) {
    const i = ((index % total) + total) % total;
    const cible = diapos[i];
    if (!cible) return;
    piste.scrollTo({
      left: cible.offsetLeft - piste.offsetLeft,
      behavior: doux === false || moinsAnime.matches ? 'auto' : 'smooth',
    });
  }

  function majEtat() {
    /* La diapositive courante est celle dont le bord gauche est le plus
       proche du bord gauche de la piste. */
    let meilleur = 0;
    let ecart = Infinity;
    diapos.forEach((d, i) => {
      const e = Math.abs(d.offsetLeft - piste.offsetLeft - piste.scrollLeft);
      if (e < ecart) {
        ecart = e;
        meilleur = i;
      }
    });

    if (meilleur === courant) return;
    courant = meilleur;

    points.forEach((pt, i) =>
      pt.setAttribute('aria-current', String(i === courant))
    );
    diapos.forEach((d, i) => (d.dataset.actif = i === courant ? 'oui' : 'non'));
    if (annonce) {
      annonce.textContent = `${apps[courant].nom}, ${courant + 1} sur ${total}`;
    }
  }

  let minuteurDefilement = null;
  piste.addEventListener(
    'scroll',
    () => {
      window.clearTimeout(minuteurDefilement);
      minuteurDefilement = window.setTimeout(majEtat, 90);
    },
    { passive: true }
  );

  boutonPrec.addEventListener('click', () => {
    arreter();
    allerA(courant - 1);
  });
  boutonSuiv.addEventListener('click', () => {
    arreter();
    allerA(courant + 1);
  });
  points.forEach((pt) =>
    pt.addEventListener('click', () => {
      arreter();
      allerA(Number(pt.dataset.index));
    })
  );

  /* Flèches du clavier quand la piste a le focus */
  piste.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    arreter();
    allerA(courant + (e.key === 'ArrowRight' ? 1 : -1));
  });

  /* ---------------- Lecture automatique ---------------------------- */

  let minuteur = null;
  let enLecture = false;

  function afficherEtatLecture() {
    boutonPause.setAttribute('aria-pressed', String(!enLecture));
    boutonPause.querySelector('.icone-pause').hidden = !enLecture;
    boutonPause.querySelector('.icone-lecture').hidden = enLecture;
    pauseTexte.textContent = enLecture ? 'Mettre en pause' : 'Reprendre';
  }

  function demarrer() {
    if (enLecture || moinsAnime.matches || total < 2) return;
    enLecture = true;
    minuteur = window.setInterval(() => allerA(courant + 1), DELAI);
    afficherEtatLecture();
  }

  function arreter() {
    if (!enLecture) return;
    enLecture = false;
    window.clearInterval(minuteur);
    afficherEtatLecture();
  }

  boutonPause.addEventListener('click', () => (enLecture ? arreter() : demarrer()));

  /* La lecture s'interrompt dès qu'on s'intéresse au carrousel, et quand
     l'onglet passe en arrière-plan. Elle ne reprend jamais d'elle-même :
     un défilement qui repart sous les doigts est une gêne. */
  ['pointerenter', 'pointerdown', 'focusin', 'touchstart'].forEach((ev) =>
    cadre.addEventListener(ev, arreter, { passive: true })
  );
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) arreter();
  });

  /* ---------------- Départ ----------------------------------------- */

  diapos[0].dataset.actif = 'oui';
  afficherEtatLecture();
  if (!moinsAnime.matches && total > 1) demarrer();

  /* Un changement de largeur déplace les diapositives : on se recale. */
  let minuteurTaille = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(minuteurTaille);
    minuteurTaille = window.setTimeout(() => allerA(courant, false), 150);
  });
})();
