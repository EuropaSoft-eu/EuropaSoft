/* ------------------------------------------------------------------
   EuropaSoft — formulaire de contact

   Le site n'a pas de serveur : le formulaire ne transmet rien. Il
   compose un courriel et ouvre le logiciel de messagerie de la
   personne, qui décide d'envoyer ou non. Rien n'est enregistré.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  const form = document.getElementById('formulaire-contact');
  if (!form || typeof EUROPASOFT === 'undefined') return;

  const sujet = document.getElementById('sujet');
  const nom = document.getElementById('nom');
  const message = document.getElementById('message');
  const erreur = document.getElementById('erreur-message');

  /* Les sujets proposés suivent le catalogue : une application ajoutée
     dans donnees.js apparaît ici sans rien toucher. */
  const options = [
    { valeur: 'Question générale', libelle: 'Une question générale' },
  ]
    .concat(
      EUROPASOFT.applications.map((a) => ({
        valeur: a.nom,
        libelle: a.nom + ' — ' + a.baseline,
      }))
    )
    .concat([
      { valeur: 'Signalement de défaut', libelle: 'Signaler un défaut' },
      { valeur: 'Proposition', libelle: 'Proposer une idée' },
    ]);

  sujet.innerHTML = options
    .map(
      (o) =>
        '<option value="' +
        o.valeur.replace(/"/g, '&quot;') +
        '">' +
        o.libelle.replace(/</g, '&lt;') +
        '</option>'
    )
    .join('');

  /* Une application peut être pré-sélectionnée par l'adresse :
     contact.html?sujet=Calliope */
  const demande = new URLSearchParams(window.location.search).get('sujet');
  if (demande) {
    const trouve = Array.from(sujet.options).find(
      (o) => o.value.toLowerCase() === demande.toLowerCase()
    );
    if (trouve) sujet.value = trouve.value;
  }

  message.addEventListener('input', () => {
    if (message.value.trim()) {
      erreur.hidden = true;
      message.removeAttribute('aria-invalid');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!message.value.trim()) {
      erreur.hidden = false;
      message.setAttribute('aria-invalid', 'true');
      message.focus();
      return;
    }

    const signature = nom.value.trim() ? '\n\n— ' + nom.value.trim() : '';
    const lien =
      'mailto:' +
      EUROPASOFT.societe.contact +
      '?subject=' +
      encodeURIComponent('[' + sujet.value + '] Message depuis le site') +
      '&body=' +
      encodeURIComponent(message.value.trim() + signature);

    /* Un lien cliqué plutôt qu'une affectation de window.location : les
       navigateurs traitent mieux un mailto venu d'un vrai lien, et le
       reste de la page n'est pas déchargé. */
    const passerelle = document.createElement('a');
    passerelle.href = lien;
    passerelle.style.display = 'none';
    document.body.appendChild(passerelle);
    passerelle.click();
    passerelle.remove();
  });
})();
