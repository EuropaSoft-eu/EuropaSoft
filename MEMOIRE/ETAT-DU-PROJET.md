# Mémoire du projet — Site EuropaSoft

Fichier de suivi : à lire avant toute reprise du projet, à mettre à jour
après chaque instruction. Il évite de relire le site de zéro à chaque fois.

---

## 1. Ce qu'est le projet

Site vitrine d'EuropaSoft, responsive du petit téléphone au très grand
écran, en **trois pages** :

| Page | Contenu |
|---|---|
| `index.html` | carrousel des applications en haut, journal des dernières mises à jour, engagement sur les données |
| `applications.html` | catalogue complet : description, plateformes, stores, téléchargement direct, fiche détaillée |
| `contact.html` | formulaire composant un courriel (sans serveur) et coordonnées |
| `hors-ligne.html` | page de secours affichée sans connexion, pour une adresse jamais visitée |

Le site est également une **application installable (PWA)** : manifeste,
service worker, bouton « Installer » dans l'en-tête, bandeau de mise à
jour.

**Contraintes tenues** : HTML/CSS/JS natifs, aucune dépendance, aucun build,
fonctionne en `file://` comme en HTTPS — cohérent avec la ligne technique de
Clio et de Calliope.

## 2. Où il se trouve

| | |
|---|---|
| Dépôt | `Yoann-CRAMATTE/EuropaSoft` (public) |
| Branche | `claude/europa-soft-responsive-500vvq` |
| Emplacement | la racine du dépôt |

Le site a d'abord été développé dans `Yoann-CRAMATTE/Morphee`, sous
`site-europasoft/`, parce que c'était la branche de travail assignée.
Yoann a tranché le 30 septembre 2026 : sa place est le dépôt EuropaSoft.
Le dossier a été déplacé à la racine de ce dépôt, ce qui permet à GitHub
Pages de le servir directement.

**Pour la mise en ligne** : *Settings → Pages*, source = cette branche,
dossier `/ (root)`. Adresse obtenue :
`https://yoann-cramatte.github.io/EuropaSoft/`.

## 3. Architecture

- Trois fichiers HTML — structure statique : en-tête, sections, pied. Le
  contenu éditorial reste lisible sans JavaScript ; le catalogue, le
  carrousel et le journal, eux, sont construits par script.
- **L'en-tête et le pied sont recopiés dans les trois pages** : sans étape
  de construction, il n'y a pas d'inclusion possible côté serveur, et les
  injecter en JavaScript aurait rendu la navigation dépendante du script.
  Toute modification de la navigation doit être reportée trois fois.
- `assets/css/style.css` — feuille unique, découpée en onze sections
  numérotées et commentées. Jetons de conception en tête (`:root`), thème
  clair par `:root[data-theme='clair']`.
- `assets/js/donnees.js` — **source unique des contenus**. Société,
  promesses, applications. C'est le seul fichier à modifier pour faire
  évoluer le catalogue.
- `assets/js/app.js` — rendu des cartes, des fiches et du journal,
  filtres, tiroir de navigation, bascule de thème, révélations au
  défilement. Chaque fonction sort d'elle-même si son point d'ancrage est
  absent de la page : le même script sert les trois pages.
- `assets/js/carrousel.js` — carrousel de l'accueil. Le défilement est
  celui du navigateur (zone défilante + accrochage CSS) : glissement du
  doigt, molette et clavier fonctionnent sans lui.
- `assets/js/contact.js` — liste des sujets, contrôle du message,
  composition du courriel.

### Choix retenus

| Décision | Motif |
|---|---|
| Données en `.js` et non en `.json` | `fetch()` est bloqué en `file://` : un JSON aurait cassé l'ouverture par double-clic. |
| Thème sombre par défaut | Identité visuelle du site. Le thème clair reste accessible par le bouton, et le choix est mémorisé dans `localStorage`. |
| Polices système | Aucune police distante, par cohérence avec l'engagement « aucun appel réseau ». |
| Carrousel bâti sur `scroll-snap` | Le navigateur fait le travail : pas de calcul de position, pas de transition maison, et la piste reste utilisable si le script ne se charge pas. |
| Lecture automatique qui ne reprend jamais seule | Elle s'arrête au premier contact (pointeur, focus, doigt) et quand l'onglet passe en arrière-plan. Un carrousel qui repart sous les doigts est une gêne, pas un agrément. |
| Formulaire de contact en `mailto:` | Le site n'a pas de serveur : rien ne peut être envoyé ni enregistré ici. Le bouton ouvre le logiciel de messagerie avec le message déjà rédigé, et c'est dit sous le bouton. |
| Jetons de couleur dédiés au texte | Les bleus vifs de la marque (`#2AA7E8`, `#1B7FE0`) ne passent pas 4,5:1 sous du texte blanc. `--accent-texte` et `--bouton-1/2` portent les textes et les boutons ; les bleus vifs restent au décor. |
| Accents d'applications assombris | Même raison : le monogramme blanc des sceaux doit rester lisible. Clio `#1A66CF`, Calliope `#1779B8`, Morphée `#4F5ED2` (version foncée du bleu de la montre). |
| Pages au réseau d'abord, ressources au cache d'abord | Une page périmée servie depuis le cache afficherait de vieilles versions d'applications : pour les pages, la fraîcheur prime. Les ressources, elles, changent avec la version du cache. |
| Numéro de version en tête de `sw.js` | Il n'y a pas d'étape de construction pour poser une empreinte sur les fichiers : la version est tenue à la main. **C'est le point de vigilance de chaque mise en ligne.** |
| Icônes *maskable* sur fond marine | Android rogne l'icône selon la forme du système : le globe est placé dans la zone sûre (58 % du côté) sur un fond plein, sans quoi il serait tronqué. |
| Logos en PNG recadrés | Les SVG du dépôt EuropaSoft ne sont pas vectoriels : ce sont des PNG encapsulés (≈ 790 Ko chacun). Recadrés sur leur contenu et redimensionnés, ils tombent à ≈ 110 Ko. Un vrai tracé vectoriel reste à faire. |

## 4. Contenu en place

| Application | Statut affiché | Ouverture navigateur | Téléchargement | Code source |
|---|---|---|---|---|
| Clio 1.0.0 | Disponible | — | lignes inactives | — (dépôt privé) |
| Calliope 1.1.0 | Disponible | oui | `Calliope.html` (145 Ko) | oui |
| Morphée (MVP) | En développement | — | — | — |

Aucune application n'est déposée sur un store : les pastilles Google Play
et App Store sont affichées inactives, avec la mention « Non déposée
sur ». Calliope reçoit à la place « Installable depuis le navigateur ».

Le journal de l'accueil compte cinq entrées, reprises des changelogs des
`AppInfo.json` (Clio 12 et 10 septembre, Morphée 30 août, Calliope 1.1.0
et 1.0.0 du 21 août).

Sources des textes : `README.md` et `AppInfo.json` de chaque dépôt, plus le
code de Morphée pour sa description. **Rien n'a été inventé.**

## 5. Points à trancher ou à vérifier

1. **Liens de Clio** — aucune URL publique connue : ni version web déposée,
   ni APK, ni installateur. Les lignes de téléchargement sont affichées
   inactives et un encart le dit. À remplir dans `donnees.js` dès que les
   paquets sont en ligne.
2. **Adresse de contact : `contact@europasoft.fr`**, confirmée par Yoann le
   16 septembre 2026. Les fichiers sources des applications portent deux
   adresses fausses, toutes deux à corriger : `accueil@europasoft.eu`
   (AppInfo de Clio) et `contact@europasoft.eu` (AppInfo de Calliope).
3. **Adresse du site, à trancher** : les AppInfo annoncent
   `https://www.europasoft.eu` (Clio) et `https://europasoft.com`
   (Calliope). Le courriel étant en `.fr`, le `.fr` est probable mais n'est
   pas confirmé : le site affiche encore le `.eu` en attendant.
4. **URL Calliope non vérifiables depuis l'environnement de développement**
   (le mandataire réseau bloque GitHub) : le lien d'ouverture
   `yoann-cramatte.github.io/calliope/Calliope.html` vient du README du
   dépôt, et le lien de téléchargement est construit sur la forme standard
   `…/raw/main/Calliope.html`. À cliquer une fois en conditions réelles.
5. **Applications absentes du site** : Poséidon, Oralia, Synapse, Kidyssée
   existent comme dépôts mais leur objet ne m'est pas connu — aucune fiche
   n'a été écrite plutôt que d'en inventer une.
6. **Mentions légales et politique de confidentialité** : absentes. À
   rédiger si le site est publié sous un nom de domaine.
7. **`VERSION` dans `sw.js`** : à incrémenter à chaque mise en ligne,
   sinon les visiteurs déjà venus gardent les anciens fichiers.
8. **Installation non vérifiable ici** : Chromium sans interface ne
   déclenche pas `beforeinstallprompt`. Les conditions posées par Chrome
   sont réunies (manifeste complet, icônes 192 et 512, `display:
   standalone`, service worker répondant aux requêtes), mais le bouton
   « Installer » n'a pas pu être vu apparaître de lui-même — à confirmer
   sur un vrai téléphone, en HTTPS.

## 6. Journal

### 16 septembre 2026 — création

- Arborescence `site-europasoft/`, logos extraits et optimisés depuis le
  dépôt EuropaSoft (horizontal, vertical, icône carrée, favicon).
- Page complète : accroche avec fenêtre de code, section « Vos données »
  (trois promesses), catalogue filtrable, méthode en quatre étapes,
  contact, pied de page.
- Fiche détaillée par application, en panneau modal (feuille glissante sur
  téléphone, fenêtre centrée à partir de 600 px).
- Thème clair/sombre, tiroir de navigation sous 860 px, révélations au
  défilement, suivi de la section courante dans la navigation.
- Corrections faites pendant les essais : dégradé du titre qui virait au
  kaki entre le bleu et l'or ; pastille d'état qui recouvrait le titre des
  cartes ; logos trop petits dans l'en-tête et le pied ; bouton « Bientôt »
  contradictoire avec la pastille « Disponible » de Clio ; contraste
  insuffisant (4,32:1) du texte secondaire en thème clair.
- Vérifié sous Chromium à 320, 390, 768, 1280, 1920 et 2560 px : aucun
  débordement horizontal, aucune erreur console, contrastes ≥ 4,5:1 dans
  les deux thèmes.

### 16 septembre 2026 — correction de l'adresse de contact

- `contact@europasoft.fr` partout : `donnees.js`, bouton de la section
  Contact, pied de page, données structurées JSON-LD.
- L'adresse du site reste `www.europasoft.eu` faute de confirmation.

### 16 septembre 2026 — passage en trois pages

- **Accueil** : carrousel des applications (diapositive sur deux colonnes
  à partir de 960 px, une seule en dessous), puis le journal des mises à
  jour et l'engagement sur les données.
- **Applications** : le catalogue quitte l'accueil et gagne les pastilles
  de stores ; filtres conservés.
- **Contact** : nouvelle page, formulaire composant un courriel et trois
  blocs de coordonnées.
- Ajouts dans `donnees.js` : tableau `actualites` (cinq entrées) et champ
  `stores` par application.
- Défauts corrigés au passage :
  - les filtres ne masquaient rien — `display: flex` sur `.carte-app`
    l'emportait sur le `display: none` du navigateur pour `[hidden]` ;
  - le point final doré du titre était mangé par la classe `.point` du
    carrousel (collision de nom, renommée `.carrousel__point`) ;
  - le surtitre perdait sa couleur d'accent, `.entete-section p` étant
    plus spécifique que `.surtitre` ;
  - les flèches du carrousel dépassaient hors de l'écran ;
  - contrastes insuffisants sous du texte blanc (2,7:1 sur le bleu vif) :
    jetons de couleur dédiés, accents d'applications assombris.
- Styles devenus morts retirés : ancienne accroche, fenêtre de code,
  section « Méthode ».
- Vérifié sur les trois pages, à 320, 390, 768, 1280, 1920 et 2560 px :
  aucun débordement, aucune erreur console. Carrousel, filtres, fiches et
  formulaire éprouvés par script.

### 29 septembre 2026 — passage en application installable (PWA)

- `manifest.webmanifest` : nom, description, `display: standalone`,
  couleurs, quatre icônes (192 et 512, en `any` et en `maskable`), quatre
  captures pour la fenêtre d'installation, deux raccourcis (Applications,
  Contact). Chemins relatifs : le site peut vivre dans un sous-dossier.
- `sw.js` : préchargement de seize fichiers, pages au réseau d'abord avec
  retour au cache puis à `hors-ligne.html`, ressources au cache d'abord
  avec rafraîchissement en arrière-plan, autres domaines ignorés. Seules
  les réponses valides sont mises en cache — une 404 passagère aurait été
  resservie pendant des jours.
- `assets/js/pwa.js` : enregistrement, bouton « Installer » (masqué tant
  que le navigateur ne le propose pas, réduit à son icône sous 620 px),
  bandeau « Une nouvelle version est prête » avec rechargement.
- Icônes régénérées : le cadrage se faisait sur la boîte englobante
  alpha, qui incluait un halo quasi transparent — le globe se retrouvait
  décentré. Seuil d'alpha à 30 pour un cadrage sur le dessin réel.
- Éprouvé par script : manifeste complet et toutes ses ressources
  présentes, service worker actif (22 entrées), pages connues entièrement
  fonctionnelles hors ligne, page inconnue basculant sur la page de
  secours, aucune erreur en `file://`.

### 17 octobre 2026 — modernisation globale & intégration des visuels

- **Visuels & identité graphique** :
  - Centralisation et organisation de tous les visuels dans `assets/img/` : master logos originaux dans `originaux/`, tracé vectoriel pur dans `vectoriel/`, visuels applicatifs dans `apps/` (Clio : icône 512 + bannière 1024×500 ; Calliope : icône vectorielle SVG extraite ; Le Chasseur de Champignons : icônes 192 et 512).
  - Prise en charge des icônes réelles et bannières dans le carrousel d'accueil (`carrousel.js`), les cartes de catalogue et la modale détaillée (`app.js`).
- **Catalogue & Contenu** :
  - Intégration de l'application **Le Chasseur de Champignons** (v1.0.0, 15 octobre 2026) dans `donnees.js` et mise à jour du journal d'actualités.
  - Bascule officielle de l'adresse du site sur `https://europasoft.fr` (en cohérence avec `contact@europasoft.fr`).
- **Fonctionnalités UI / UX modernes** :
  - Ajout d'une **barre de recherche instantanée** combinée aux filtres par catégorie dans `applications.html` avec compteur de résultats en temps réel.
  - Boutons de **partage natif (`navigator.share`)** et **copie de lien direct** avec ancre (#clio, #chasseur...) sur chaque application.
  - Bouton de **copie rapide de l'adresse courriel** dans `contact.html`.
  - Notification toast accessible et animée pour tous les retours de copie.
- **Conformité & Légal** :
  - Création de la page `mentions-legales.html` (éditeur, hébergeur GitHub Pages, engagement d'absence totale de collecte/cookies).
- **Service Worker & PWA** :
  - Passage de `VERSION` à `'v2'` dans `sw.js`.
  - Inclusion des nouvelles pages et des visuels applicatifs dans le pré-cache hors ligne.

