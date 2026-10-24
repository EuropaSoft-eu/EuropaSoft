/* ------------------------------------------------------------------
   EuropaSoft — source unique des données du site
   Un simple fichier JavaScript (et non un JSON chargé par fetch) pour
   que le site fonctionne aussi bien en https que par double-clic
   sur index.html, en file://, sans serveur.

   Pour ajouter une application : copier un bloc, remplir les champs.
   Les liens vides ("") affichent un bouton inactif « bientôt ».
   ------------------------------------------------------------------ */

const EUROPASOFT = {
  societe: {
    nom: 'EuropaSoft',
    auteur: 'Yoann CRAMATTE',
    contact: 'contact@europasoft.fr',
    site: 'https://europasoft.fr',
    github: 'https://github.com/Yoann-CRAMATTE',
    annee: 2026,
  },

  /* Les trois promesses affichées en bandeau sous le titre. */
  promesses: [
    {
      icone: 'bouclier',
      titre: 'Aucune donnée collectée',
      texte:
        'Pas de compte, pas de traceur, pas de serveur derrière. Vos fichiers restent sur votre appareil.',
    },
    {
      icone: 'eclair',
      titre: 'Hors ligne par défaut',
      texte:
        'Les applications fonctionnent sans connexion. Certaines tiennent même dans un seul fichier HTML.',
    },
    {
      icone: 'code',
      titre: 'Code lisible, sans dépendance',
      texte:
        'HTML, CSS et JavaScript écrits à la main. Pas de framework, pas de CDN, pas d’étape de construction.',
    },
  ],

  /* Journal public, repris des changelogs des applications.
     La plus récente en tête. */
  actualites: [
    {
      app: 'chasseur',
      date: '2026-10-15',
      dateLisible: '15 octobre 2026',
      version: '1.0.0',
      titre: 'Le Chasseur de Champignons — repérage GPS et respect absolu des coins secrets',
      points: [
        'Enregistrement de stations de cueillette hors ligne par coordonnées GPS précises.',
        'Guidage retour par boussole et distance en temps réel, sans exiger de réseau.',
        'Confidentialité absolue : aucune coordonnée de vos coins n’est transmise à un serveur.',
        'Portage multiplateforme complet développé avec Flutter.',
      ],
    },
    {
      app: 'clio',
      date: '2026-09-12',
      dateLisible: '12 septembre 2026',
      version: '1.0.0',
      titre: 'Clio 1.0.0 — l’Android réparé de fond en comble',
      points: [
        'L’application ne répondait à aucun clic sur Android : la politique de sécurité du contenu bloquait tout le JavaScript, qui est en ligne dans la page.',
        'Ouverture d’un .clio par le sélecteur de fichiers du système, sans filtre d’extension — Android ne connaît pas le type .clio et grisait les fichiers.',
        'Enregistrement et exports rétablis par les greffons Tauri, en remplacement de la couche Capacitor.',
        'Résumé du livre modifiable depuis la fiche, et plus seulement à la création.',
      ],
    },
    {
      app: 'clio',
      date: '2026-09-10',
      dateLisible: '10 septembre 2026',
      version: '',
      titre: 'Clio passe à Tauri v2 pour Android',
      points: [
        'Portage Android sur Tauri v2, en remplacement du paquet Capacitor.',
        'JSZip embarqué : l’ouverture et la sauvegarde .clio fonctionnent hors ligne.',
        'Polices Playfair Display, Crimson Pro et IM Fell English embarquées.',
        'Ouverture d’un fichier .clio par partage et par association de type dans Android.',
      ],
    },
    {
      app: 'morphee',
      date: '2026-08-30',
      dateLisible: '30 août 2026',
      version: 'MVP',
      titre: 'Morphée — premier jet complet sur Apple Watch',
      points: [
        'Détection de l’endormissement par rythme cardiaque et capteurs de mouvement.',
        'Bilan de séance : délai d’endormissement, sommeil effectif, rythme cardiaque moyen.',
        'Développement en cours : aucune date de publication annoncée.',
      ],
    },
    {
      app: 'calliope',
      date: '2026-08-21',
      dateLisible: '21 août 2026',
      version: '1.1.0',
      titre: 'Calliope 1.1.0 — son logo, et l’installation comme un logiciel',
      points: [
        'Logo vectoriel propre à l’application : un C calligraphique, lisible jusqu’à 16 pixels.',
        'Manifeste d’application fabriqué au démarrage : Calliope s’installe comme un logiciel tout en restant un fichier unique.',
        'La couleur de la barre système suit le thème actif.',
      ],
    },
    {
      app: 'calliope',
      date: '2026-08-21',
      dateLisible: '21 août 2026',
      version: '1.0.0',
      titre: 'Calliope 1.0.0 — première version de production',
      points: [
        'Éditeur Markdown tenant dans un seul fichier autonome, sans dépendance, sans construction et sans appel réseau.',
        'Parseur Markdown et coloration syntaxique écrits à la main, avec une couleur par niveau de titre.',
        'Quatre modes d’écriture : Focus, Hemingway, Machine à écrire, Aperçu synchronisé.',
        'Ouverture, enregistrement, export Markdown, HTML autonome et PDF.',
      ],
    },
  ],

  /* Les couleurs d'accent portent un monogramme blanc : elles sont
     choisies assez sombres pour rester lisibles (≥ 4,5:1). Celles de
     Morphée sont une version foncée du bleu de l'application. */
  applications: [
    /* ---------------------------------------------------------- */
    {
      id: 'clio',
      nom: 'Clio',
      monogramme: 'C',
      icone: 'assets/img/apps/clio/clio-icone-512.png',
      banniere: 'assets/img/apps/clio/clio-banniere-1024x500.png',
      muse: 'Clio, muse de l’Histoire',
      statut: 'disponible',
      version: '1.0.0',
      dateVersion: '12 septembre 2026',
      categorie: 'Écriture',
      baseline: 'L’atelier de l’écrivain',
      resume:
        'Traitement de texte pour romanciers, fondé sur l’écriture par fragments : on écrit des morceaux — une scène, une réplique, une idée — puis on les assemble et on les réordonne. Le texte final se reconstitue par concaténation à la lecture et à l’export.',
      accent: ['#1A66CF', '#0B3C82'],
      points: [
        'Hiérarchie Livre → Chapitre → Scène → Bloc : le bloc est l’unité de pensée, il se déplace dans sa scène, vers une autre scène ou vers un autre chapitre.',
        'Fiches personnages et lieux attachées au livre, résumé et métadonnées modifiables à tout moment.',
        'Format .clio documenté et autonome : le fichier vous appartient, il s’ouvre sans l’application.',
        'Une seule source HTML pour toutes les cibles : web, Android, et bureau via Tauri.',
        'Aucun appel réseau : ni compte, ni connexion, ni analyse du texte.',
      ],
      plateformes: ['Web', 'Android', 'Windows', 'macOS', 'Linux', 'iOS'],
      liens: {
        /* Renseigner l’URL quand la version web sera déposée en ligne. */
        essai: '',
        essaiLibelle: 'Ouvrir dans le navigateur',
        depot: 'https://github.com/Yoann-CRAMATTE/Clio',
      },
      telechargements: [
        { plateforme: 'Android', format: 'APK', url: '', taille: '' },
        { plateforme: 'Windows', format: 'Installateur', url: '', taille: '' },
        { plateforme: 'macOS', format: '.dmg', url: '', taille: '' },
        { plateforme: 'Linux', format: 'AppImage', url: '', taille: '' },
      ],
      /* Aucune application n'est déposée sur un store à ce jour : les
         entrées sans URL s'affichent inactives, jamais comme un lien. */
      stores: [
        { id: 'play', nom: 'Google Play', url: '' },
        { id: 'appstore', nom: 'App Store', url: '' },
      ],
      avis:
        'Version 1.0.0 terminée et utilisée au quotidien. Les paquets publics (APK, installateurs de bureau) et la version web ne sont pas encore déposés en ligne : écrire à EuropaSoft pour y accéder.',
    },

    /* ---------------------------------------------------------- */
    {
      id: 'calliope',
      nom: 'Calliope',
      monogramme: 'C',
      icone: 'assets/img/apps/calliope/calliope-icone.svg',
      muse: 'Calliope, muse de l’éloquence et de la poésie épique, sœur de Clio',
      statut: 'disponible',
      version: '1.1.0',
      dateVersion: '21 août 2026',
      categorie: 'Écriture',
      baseline: 'Éditeur Markdown sans distraction',
      resume:
        'Un éditeur Markdown qui tient dans un seul fichier HTML et s’ouvre dans n’importe quel navigateur, sans rien installer. Parseur Markdown et coloration syntaxique écrits à la main, sans aucune bibliothèque.',
      accent: ['#1779B8', '#0E5FA8'],
      points: [
        'Quatre modes d’écriture : Focus, Hemingway, Machine à écrire et Aperçu synchronisé.',
        'Coloration syntaxique dans l’éditeur, avec une couleur propre à chaque niveau de titre.',
        'Barre de mise en forme de vingt-cinq boutons, qui s’allument selon le contexte du curseur.',
        'Export Markdown, HTML autonome et PDF ; quatre thèmes, trois polices, largeur de colonne réglable.',
        'Un seul fichier de 145 Ko : à copier, à envoyer par courriel ou à poser sur une clé.',
      ],
      plateformes: ['Web', 'PWA', 'Windows', 'macOS', 'Linux', 'Android', 'iOS'],
      liens: {
        essai: 'https://yoann-cramatte.github.io/calliope/Calliope.html',
        essaiLibelle: 'Ouvrir dans le navigateur',
        depot: 'https://github.com/Yoann-CRAMATTE/calliope',
      },
      telechargements: [
        {
          plateforme: 'Tous systèmes',
          format: 'Calliope.html',
          url: 'https://github.com/Yoann-CRAMATTE/calliope/raw/main/Calliope.html',
          taille: '145 Ko',
          note: 'Fichier unique : télécharger, double-cliquer, écrire.',
        },
      ],
      stores: [],
      installable: true,
    },

    /* ---------------------------------------------------------- */
    {
      id: 'chasseur',
      nom: 'Le Chasseur de Champignons',
      monogramme: 'C',
      icone: 'assets/img/apps/chasseur/chasseur-icone-512.png',
      muse: 'Compagnon de cueillette et de géolocalisation autonome',
      statut: 'disponible',
      version: '1.0.0',
      dateVersion: '15 octobre 2026',
      categorie: 'Plein air & Cartographie',
      baseline: 'Repérez, mémorisez et retrouvez vos coins de cueillette',
      resume:
        'Application tout-terrain pour amateurs de cueillette : mémorisation GPS hors ligne des stations de champignons, guidage par boussole et distance, fiches d’identification et carnet de récolte personnel. Vos coins secrets restent strictement sur votre appareil, sans serveur ni analyse de position.',
      accent: ['#B85D19', '#7A3508'],
      points: [
        'Enregistrement instantané d’un point GPS même en pleine forêt sans réseau cellulaire.',
        'Guidage retour par cap et distance directe sans dépendance à un fond de carte en ligne.',
        'Photos, notes et espèces associées à chaque station de cueillette privée.',
        'Carnet de récoltes horodaté pour analyser les saisons et les futures poussées.',
        'Données locales au téléphone : aucun compte, aucun partage forcé de vos coins secrets.',
      ],
      plateformes: ['Android', 'iOS', 'Web', 'Windows', 'macOS'],
      liens: {
        essai: '',
        essaiLibelle: '',
        depot: 'https://github.com/Yoann-CRAMATTE/LeChasseurDeChampignions',
      },
      telechargements: [
        { plateforme: 'Android', format: 'APK', url: '', taille: '' },
        { plateforme: 'Code source', format: 'GitHub', url: 'https://github.com/Yoann-CRAMATTE/LeChasseurDeChampignions', taille: '' },
      ],
      stores: [
        { id: 'play', nom: 'Google Play', url: '' },
      ],
      avis:
        'Version 1.0.0 fonctionnelle. Code source disponible sur GitHub ; paquets d’installation prêts au déploiement.',
    },

    /* ---------------------------------------------------------- */
    {
      id: 'morphee',
      nom: 'Morphée',
      monogramme: 'M',
      muse: 'Morphée, dieu des songes',
      statut: 'developpement',
      version: 'MVP',
      dateVersion: '',
      categorie: 'Santé',
      baseline: 'La sieste, mesurée au poignet',
      resume:
        'Application Apple Watch de sieste courte : elle suit le rythme cardiaque et les mouvements pour détecter l’endormissement, puis déclenche le réveil au terme de la durée choisie et non au terme d’un simple minuteur.',
      accent: ['#4F5ED2', '#3A49B8'],
      points: [
        'Détection de l’endormissement à partir du rythme cardiaque et des capteurs de mouvement.',
        'Durée de sieste réglable ; le décompte démarre à l’endormissement réel.',
        'Bilan de séance : délai d’endormissement, durée de sommeil effective, rythme cardiaque moyen.',
        'Données de santé conservées sur la montre, via HealthKit.',
      ],
      plateformes: ['watchOS'],
      liens: { essai: '', essaiLibelle: '', depot: '' },
      telechargements: [],
      stores: [{ id: 'appstore', nom: 'App Store', url: '' }],
      avis:
        'Développement en cours sur Apple Watch. Aucune date de publication annoncée.',
    },
  ],
};
