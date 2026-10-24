# EuropaSoft - Plateforme de Distribution d'Applications

Site web professionnel pour la découverte et la distribution d'applications EuropaSoft sur tous les systèmes d'exploitation et plateformes.

## 🚀 Démarrage Rapide

### Prérequis
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Aucune dépendance externe (HTML/CSS/JS pur)

### Installation

```bash
# Cloner ou télécharger le projet
cd EuropaSoft

# Lancer un serveur local (optionnel, pour le développement)
# Avec Python 3:
python -m http.server 8000

# Avec Node.js (http-server):
npx http-server

# Puis ouvrir http://localhost:8000 dans le navigateur
```

### Déploiement OVH

1. Uploader tous les fichiers via FTP vers le répertoire racine
2. Les fichiers `.html`, `.css`, `.js` sont des fichiers statiques
3. Aucune configuration serveur requise

## 📁 Structure du Projet

```
EuropaSoft/
├── index.html                    # Page d'accueil
├── apps/
│   ├── clio.html               # Fiche app Clio
│   ├── mushroom.html           # Fiche app Chasseur de Champignons
│   └── collectivicity.html     # Fiche app Collectiv'City
├── css/
│   ├── variables.css           # Design tokens (couleurs, typo, spacing)
│   ├── reset.css               # Normalisation
│   ├── base.css                # Styles de base
│   └── components.css          # Composants (boutons, cards, etc.)
├── js/
│   └── main.js                 # Interactions (menu mobile, scroll)
├── assets/
│   ├── logo/                   # Logos EuropaSoft
│   └── images/                 # Screenshots, images promotionnelles (à remplir)
├── PRODUCT.md                  # Brief produit
├── DESIGN.md                   # Système de design
├── CLAUDE.md                   # Guide de développement
├── AppInfo.json                # Métadonnées projet
└── README.md                   # Ce fichier
```

## 🎨 Design System

### Couleurs
- **Bleu Marine:** `#004A8D` (primaire)
- **Bleu Ciel:** `#0099CC` (secondaire)
- **Or/Jaune:** `#FFD700` (accent)
- **Gris:** `#F5F5F5` (backgrounds), `#666666` (texte muted)

### Typography
- **Font:** Montserrat, Poppins, ou système sans-serif
- **Base:** 16px
- **Hierarchy:** H1 (48px), H2 (32px), H3 (24px), etc.

### Spacing
Base unit: **8px**
- Petit: 8px, 16px
- Moyen: 24px, 32px
- Grand: 48px, 64px, 96px

## 📱 Responsive Design

- **Mobile:** < 768px (1 colonne, menu hamburger)
- **Tablet:** 768px - 1024px (2 colonnes)
- **Desktop:** > 1024px (3-4 colonnes, max-width 1200px)

## 🛠️ Développement

### Ajouter une nouvelle application

1. Créer un fichier HTML dans `/apps/`
2. Copier le modèle depuis `apps/clio.html`
3. Mettre à jour le contenu (titre, description, platforms)
4. Ajouter une carte dans `index.html` (grid-apps)

### Modifier les tokens de design

Tous les tokens se trouvent dans `css/variables.css`:
```css
:root {
  --color-blue-800: #004A8D;
  --font-size-base: 16px;
  --spacing-1: 8px;
  /* etc */
}
```

### Assets

Placer les images dans `/assets/`:
- Logo: `/assets/logo/europasoft-logo.svg`
- Screenshots: `/assets/images/app-name/`
- Favicons: `/assets/logo/favicon.svg`

## 🔍 Validation & QA

### Checklist avant déploiement

- [ ] Tous les liens de navigation fonctionnent
- [ ] Menu mobile responsive et fonctionnel
- [ ] Boutons de téléchargement/lancement actifs (linking OK)
- [ ] Images optimisées (< 200KB par image)
- [ ] Performance Lighthouse 90+
- [ ] Mobile responsive (tester sur devtools)
- [ ] Contrast ratio WCAG AA (4.5:1 minimum)
- [ ] Pas d'erreurs console (F12 → Console)

### Test Cross-Browser

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (iOS + macOS)
- [ ] Mobile browsers

## 📦 Optimisation

### Performance
- Images compressées (Optimize via TinyPNG/Squoosh)
- CSS minifié (si nécessaire)
- JS léger, pas de frameworks
- Lazy loading pour images (optionnel)

### Accessibilité
- Alt text sur toutes les images
- Focus states clairs
- Contraste WCAG AA
- Semantic HTML (h1, nav, section, etc.)

## 🚀 Roadmap

**MVP (Actuellement):**
- Showcase des 3 apps
- Pages détaillées par app
- Design premium
- Responsive mobile/desktop

**Phase 2 (Futur):**
- Système de paiement pour Collectiv'City
- Compte utilisateur
- Analytics & tracking
- Blog/documentation
- Internationalization (i18n)
- Dark mode

## 📝 Convention de Nommage

- **Classes CSS:** kebab-case (`.btn-primary`, `.card-image`)
- **IDs:** kebab-case (`#navMenu`, `#hamburger`)
- **Files:** kebab-case ou camelCase (index.html, main.js)
- **Variables CSS:** kebab-case (`--color-blue-800`)

## 🔐 Sécurité

- Aucune données sensibles en dur (API keys, passwords)
- Links externes: `target="_blank" rel="noopener noreferrer"`
- Pas de localStorage pour données critiques (MVP)
- HTTPS recommandé sur OVH

## 📞 Support & Contact

- Email: contact@europasoft.eu
- Site: https://europasoft.eu

## 📄 Licences

© 2026 EuropaSoft. Tous droits réservés.

---

**Créé avec:** HTML5, CSS3, Vanilla JavaScript
**Design:** Impeccable (premium, professional, showcase-led)
**Hosting:** OVH Static Files
