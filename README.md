# EuropaSoft

Ce dépôt contient **le site d'EuropaSoft** et les logos de la marque. Le
site occupe la racine : il est donc servi tel quel par GitHub Pages.

Site vitrine en trois pages :

| Page | Contenu |
|---|---|
| `index.html` | carrousel des applications, puis le journal des dernières mises à jour et l'engagement sur les données |
| `applications.html` | le catalogue complet : description, plateformes, stores, téléchargement direct, fiche détaillée |
| `contact.html` | formulaire (qui compose un courriel, sans serveur) et coordonnées |

Écrit en HTML, CSS et JavaScript natifs. **Aucune dépendance** : pas de
framework, pas de bibliothèque, pas de CDN, pas de police distante, pas
d'étape de construction. Le site s'ouvre aussi bien servi en HTTPS que par
double-clic sur `index.html`.

C'est aussi une **application installable (PWA)** : servi en HTTPS, le
navigateur propose de l'installer, et le site fonctionne ensuite hors
ligne.

---

## Organisation

```
.
├── index.html              accueil : carrousel + journal
├── applications.html       catalogue et stores
├── contact.html            formulaire et coordonnées
├── hors-ligne.html         page de secours quand la connexion manque
├── manifest.webmanifest    identité de l'application installée
├── sw.js                   service worker : cache et mode hors ligne
├── assets/
│   ├── css/style.css       toute la feuille de style, commentée par section
│   ├── js/donnees.js       LA SOURCE : société, actualités, applications
│   ├── js/app.js           cartes, fiches, journal, thème, navigation
│   ├── js/carrousel.js     carrousel de la page d'accueil
│   ├── js/contact.js       composition du courriel
│   ├── js/pwa.js           enregistrement, installation, mise à jour
│   ├── img/                logos et icônes (source : source-globe-512.png)
│   └── img/captures/       captures affichées à l'installation
├── .nojekyll              (GitHub Pages sert le dossier tel quel)
├── MEMOIRE/                suivi du projet, à lire avant toute reprise
├── LICENSE
└── Logo_EuropaSoft_*.png|svg   logos de la marque, antérieurs au site
```

> Les fichiers `Logo_EuropaSoft_*.svg` ne sont pas vectoriels : ce sont des
> PNG encapsulés dans du SVG, d'environ 790 Ko chacun. Les icônes du site
> sont dérivées de `assets/img/source-globe-512.png`. Un vrai tracé
> vectoriel reste à faire.

L'en-tête et le pied de page sont recopiés dans les trois fichiers HTML :
sans étape de construction, c'est le prix à payer pour que chaque page
reste lisible sans JavaScript. **Une modification de la navigation doit
être reportée dans les trois.**

## Ajouter ou modifier une application

Tout se passe dans **`assets/js/donnees.js`** — ni le HTML ni le CSS n'ont à
être touchés. Copier un bloc d'application et remplir les champs :

| Champ | Rôle |
|---|---|
| `id` | identifiant d'ancre (`#clio`), sans accent ni espace |
| `statut` | `disponible` ou `developpement` — pilote la pastille et les filtres |
| `monogramme` | la lettre affichée dans le sceau coloré |
| `accent` | les deux couleurs du dégradé propre à l'application |
| `plateformes` | liste libre ; les noms connus reçoivent leur icône (Web, PWA, Android, iOS, macOS, Windows, Linux, watchOS) |
| `liens.essai` | URL d'ouverture dans le navigateur ; vide = bouton absent |
| `liens.depot` | URL du dépôt public ; vide = bouton absent |
| `telechargements[]` | une ligne par cible ; `url` vide affiche la ligne en « bientôt » |
| `stores[]` | `{ id: 'play' \| 'appstore', nom, url }` ; `url` vide affiche la pastille « Non déposée sur… » |
| `installable` | `true` affiche « Installable depuis le navigateur » à la place d'un store |
| `avis` | encart d'avertissement affiché dans la fiche (facultatif) |

Le carrousel de l'accueil et la liste des sujets du formulaire de contact
se construisent eux aussi depuis cette liste : une application ajoutée
apparaît partout sans toucher au HTML.

### Ajouter une mise à jour au journal

Ajouter une entrée en tête du tableau `actualites`, avec `app` (l'`id` de
l'application), `date` (format `AAAA-MM-JJ`), `dateLisible`, `titre` et
`points[]`.

Un lien vide n'est jamais inventé : la ligne reste visible mais inactive,
et la carte propose « En savoir plus » à la place du bouton principal.

## L'application installable (PWA)

| Élément | Rôle |
|---|---|
| `manifest.webmanifest` | nom, icônes, couleurs, écran de démarrage, raccourcis (Applications, Contact) et captures montrées par le navigateur au moment d'installer |
| `sw.js` | met le site en cache et le sert hors ligne |
| `assets/js/pwa.js` | enregistre le service worker, affiche le bouton « Installer » et signale les nouvelles versions |
| `hors-ligne.html` | page de secours pour une adresse jamais visitée, sans connexion |

**Stratégies de cache** — les pages sont demandées au réseau d'abord (une
page fraîche prime sur une page rapide), avec le cache en secours ; les
ressources (CSS, JS, images) sont servies depuis le cache et rafraîchies
en arrière-plan ; les autres domaines ne sont jamais interceptés.

> **À chaque mise en ligne, incrémenter `VERSION` en tête de `sw.js`.**
> Sans cela, les navigateurs qui ont déjà visité le site continueront de
> servir les anciens fichiers depuis leur cache. Au changement de version,
> les visiteurs voient un bandeau « Une nouvelle version est prête ».

L'installation exige **HTTPS** (ou `localhost`). En `file://`, le service
worker ne s'enregistre pas : `pwa.js` s'arrête de lui-même, sans erreur,
et le site reste entièrement utilisable.

Le cache appartient au navigateur de la personne : rien n'en sort, aucune
donnée d'usage n'est enregistrée ni transmise.

## Mise en ligne

Le dossier est un site statique : il n'a besoin d'aucun serveur applicatif.

- **GitHub Pages** — le site étant à la racine du dépôt, il suffit de
  choisir la branche comme source dans *Settings → Pages* (dossier `/`).
  Le fichier `.nojekyll` évite que Jekyll ne réécrive quoi que ce soit.
  Adresse obtenue : `https://yoann-cramatte.github.io/EuropaSoft/`.
- **Hébergement classique** — copier le dossier par FTP.
- **Essai local** — `python3 -m http.server 8123` puis
  `http://localhost:8123`.

## Vérifications effectuées

Mesurées sous Chromium, sur les trois pages, à six largeurs : 320, 390,
768, 1280, 1920 et 2560 pixels.

- Aucun débordement horizontal, sur aucune page, à aucune de ces largeurs.
- Aucune erreur JavaScript, en `http://` comme en `file://`.
- Carrousel : flèches, points, pause et flèches du clavier vérifiés ;
  lecture automatique interrompue au premier contact et jamais reprise
  d'elle-même ; arrêtée quand l'onglet passe en arrière-plan.
- Filtres du catalogue : 2 disponibles, 1 dans le navigateur,
  1 en développement, 3 au total.
- Formulaire de contact : sujet pré-remplissable par `?sujet=Calliope`,
  refus d'un message vide, courriel correctement composé.
- PWA : manifeste servi et complet (4 icônes dont 2 *maskable*,
  4 captures, 2 raccourcis), toutes les ressources déclarées présentes,
  service worker actif avec 22 entrées en cache. Hors ligne, les pages
  déjà visitées se chargent entièrement (carrousel et catalogue compris)
  et une adresse inconnue tombe sur la page de secours. En `file://`,
  aucune erreur et aucun bouton d'installation.
- Contraste du texte : ≥ 4,5:1 sur l'ensemble des textes mesurés, dans les
  deux thèmes (niveau AA des WCAG). Les bleus vifs de la marque ne
  passent pas ce seuil sous du texte blanc : deux jetons dédiés
  (`--accent-texte`, `--bouton-1/2`) portent les textes et les boutons.
- Navigation au clavier : lien d'évitement, focus visible, piège à
  tabulation dans les fenêtres, fermeture par Échap.
- `prefers-reduced-motion` respecté : animations et défilement doux coupés.
- Feuille d'impression : décor retiré, cartes non coupées entre deux pages.

## Ce qui reste à faire

Voir `MEMOIRE/ETAT-DU-PROJET.md` — notamment les liens de téléchargement de
Clio, absents faute d'URL publique à ce jour.
