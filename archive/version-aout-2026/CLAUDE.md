# EuropaSoft Dev Guide

## Project Overview

**EuropaSoft** = plateforme showcase + distribution d'apps.  
MVP: 3 apps (Clio, Chasseur de Champignons, Collectiv'City).  
Tech: HTML/CSS/JS vanille, OVH hébergement static.  
Design: Premium, bleus + jaune, professionnel.

## Tech Stack

- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- **Hosting:** OVH (static files)
- **Build:** None (no build step)
- **Package Manager:** None (CDN links for libraries if needed)

## Project Structure

```
EuropaSoft/
├── index.html              # Homepage
├── apps/
│   ├── clio.html          # Clio app detail page
│   ├── mushroom.html      # Chasseur de Champignons detail page
│   ├── collectivicity.html # Collectiv'City detail page
├── css/
│   ├── reset.css          # Normalize/reset
│   ├── variables.css      # Design tokens (colors, typography)
│   ├── base.css           # Base styles (body, typography, etc.)
│   ├── layout.css         # Grid, spacing, layout utilities
│   ├── components.css     # Buttons, cards, modals
├── js/
│   ├── main.js            # Global scripts
│   ├── app-detail.js      # App detail page logic
├── assets/
│   ├── logo/              # Logos (EuropaSoft)
│   ├── images/            # Screenshots, promotional images
│   ├── videos/            # Video embeds (if any)
├── PRODUCT.md             # Product brief
├── DESIGN.md              # Design system documentation
├── AppInfo.json           # Project metadata
└── CLAUDE.md              # This file
```

## Design System

**Colors:**
- Primary Blue: `#004A8D` (dark), `#0099CC` (light)
- Accent Gold: `#FFD700`
- Neutrals: `#FFFFFF`, `#F5F5F5`, `#333333`, `#666666`

**Typography:**
- Headings: Sans-serif modern (Montserrat, Poppins, or system)
- Body: Same sans-serif, 16px base, 1.5 line-height

**Spacing:** 8px base unit (8, 16, 24, 32, 48, 64px)

**Components:**
- Buttons: Primary (blue), Secondary (outline), CTAs
- Cards: App showcase (image + title + description + action)
- Navigation: Clean, sticky header, hamburger mobile
- Hero: Large imagery, clear CTAs

## Development Guidelines

1. **Accessibility:** WCAG 2.1 AA minimum
2. **Mobile-first:** Design mobile first, then scale up
3. **Performance:** Optimize images, minimize CSS/JS
4. **Semantic HTML:** Proper heading hierarchy, ARIA labels
5. **No frameworks:** Keep it vanilla, simple, fast
6. **Browser support:** Modern browsers (Chrome, Firefox, Safari, Edge last 2 versions)

## Apps Data Structure

Each app has:
- `id`: Unique identifier
- `name`: Display name
- `tagline`: Short description
- `description`: Long description
- `category`: Type (productivity, utility, professional)
- `images`: Screenshot array
- `video`: YouTube/embed URL (optional)
- `price`: "free" | "paid" | "freemium"
- `platforms`: Array of available platforms
- `links`: Download/launch URLs by platform

## Deployment

- Push to git → auto-sync to OVH via FTP/Git hook
- Files must be static HTML/CSS/JS
- No server-side processing

## Impeccable Design Mode

- Surface Mode: Experience (showcase-led)
- Design tokens in `css/variables.css`
- Component library in `css/components.css`
- Design audit: `/impeccable audit` before deploy

## When Adding Features

- Freemium pricing (future): Collectiv'City modules payants
- Backend integration (future): Paiement, analytics
- Today: Pure static showcase
