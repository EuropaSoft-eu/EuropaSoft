# EuropaSoft Design System

## Visual Identity

**Logo:** EuropaSoft (provided)  
**Palette:** Premium tech (blues + gold)  
**Mode:** Experience (showcase-led)  
**Tone:** Professional, accessible, premium

## Color Tokens

```css
/* Blues (Primary) */
--color-blue-900: #003366;  /* Darkest */
--color-blue-800: #004A8D;  /* Primary dark */
--color-blue-600: #0099CC;  /* Primary light */
--color-blue-400: #00A8E8;  /* Accent light */
--color-blue-100: #E6F2FF;  /* Background tint */

/* Gold (Accent) */
--color-gold: #FFD700;
--color-gold-dark: #FFC700;

/* Neutrals */
--color-white: #FFFFFF;
--color-gray-50: #F9F9F9;
--color-gray-100: #F5F5F5;
--color-gray-300: #E0E0E0;
--color-gray-600: #666666;
--color-gray-800: #333333;
--color-black: #1A1A1A;
```

## Typography

**Typeface:** Montserrat (or Poppins, or system sans-serif)

```css
/* Scale */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 32px;
--font-size-4xl: 40px;
--font-size-5xl: 48px;

/* Line heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;

/* Weights */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Hierarchy

- **H1:** 48px, bold, line-height 1.2 (page title)
- **H2:** 32px, bold, line-height 1.2 (section title)
- **H3:** 24px, semibold, line-height 1.3 (subsection)
- **H4:** 20px, semibold, line-height 1.4 (component title)
- **Body:** 16px, regular, line-height 1.5
- **Small:** 14px, regular, line-height 1.5 (meta, labels)

## Spacing & Rhythm

**Base unit:** 8px

```css
--spacing-1: 8px;
--spacing-2: 16px;
--spacing-3: 24px;
--spacing-4: 32px;
--spacing-5: 40px;
--spacing-6: 48px;
--spacing-8: 64px;
--spacing-12: 96px;
```

## Components

### Button

- **Primary:** Blue background (#004A8D), white text, 16px, padding 12px 24px
- **Secondary:** Blue outline, blue text, white background
- **Tertiary:** Link style, blue text, underline on hover
- **States:** Hover (darker blue), Active (pressed), Disabled (gray)

### Card (App Showcase)

- **Structure:** Image + content (title, description, category, badge)
- **Dimensions:** Min 280px width, responsive
- **Spacing:** 16px padding, 8px gap between elements
- **Shadow:** `0 2px 8px rgba(0, 0, 0, 0.1)` on hover
- **Border-radius:** 8px

### Navigation

- **Header:** Sticky, blue background (#004A8D), white logo + links
- **Links:** White text, hover underline in gold
- **Mobile:** Hamburger menu (3-line icon)
- **Search:** Icon + text input, blue border on focus

### Hero Section

- **Background:** Blue gradient or large app image
- **Overlay:** Semi-transparent dark overlay (if image)
- **Text:** Large heading (48px), subheading (20px), CTA buttons
- **CTA:** Primary button (gold accent) + secondary

### Footer

- **Background:** Dark blue (#003366)
- **Text:** White/light gray
- **Links:** White, hover gold
- **Copyright:** Small text, gray

## Responsive Breakpoints

```css
/* Mobile-first */
--bp-mobile: 0px;
--bp-tablet: 768px;
--bp-desktop: 1024px;
--bp-wide: 1440px;
```

### Grid

- **Mobile:** 1 column, 16px padding
- **Tablet:** 2 columns, 24px padding
- **Desktop:** 3-4 columns, 32px padding, max-width 1200px center

## Animations & Transitions

- **Default:** 200ms ease-in-out
- **Hover states:** Smooth color/shadow transitions
- **Load animations:** Fade-in, subtle slide-up
- **Avoid:** Jarring animations, excessive motion

## Dark Mode (Future)

- Invert neutrals: white → dark, gray → light gray
- Blues: desaturate slightly, adjust contrast
- Gold: same or slightly lighter

## Quality Standards

- **Contrast:** WCAG AA minimum (4.5:1 for text)
- **Touch targets:** Min 48x48px buttons
- **Spacing:** Consistent use of base unit
- **Images:** Optimized, srcset for responsive
- **Loading:** Fast (sub-2s initial load)
- **Performance:** Lighthouse 90+

## Design Rules (Impeccable)

✅ Honor logo colors (blues + gold)  
✅ Showcase apps (interface recedes)  
✅ Premium, professional tone  
✅ Mobile-first responsive  
✅ Semantic, accessible HTML  

❌ No frameworks, no build step  
❌ No heavy scripts/animations  
❌ No generic design patterns (be specific to EuropaSoft)  
❌ No tracking/analytics (MVP)
