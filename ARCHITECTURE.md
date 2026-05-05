# Dentrix Apps — Architecture Documentation

> Current state as of May 2026.
> Single-page premium portfolio website for Dentrix Apps — a software engineering lab specializing in algorithmic trading engines, AI automation systems, and scalable infrastructure.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Directory Structure](#3-directory-structure)
4. [Routing & Page Architecture](#4-routing--page-architecture)
5. [Component Architecture](#5-component-architecture)
6. [UI Component Library](#6-ui-component-library)
7. [Styling System](#7-styling-system)
8. [Animation & Motion System](#8-animation--motion-system)
9. [Data Architecture](#9-data-architecture)
10. [State Management](#10-state-management)
11. [Server Actions](#11-server-actions)
12. [Performance Strategy](#12-performance-strategy)
13. [SEO & Metadata](#13-seo--metadata)
14. [Known Issues & Technical Debt](#14-known-issues--technical-debt)

---

## 1. Project Overview

**Name:** Dentrix Apps Website
**Type:** Premium single-page portfolio / company profile
**Framework:** Next.js 16 (App Router, Turbopack)
**Deployment:** Vercel (static export compatible)
**Design Philosophy:** Dark, minimal, space-like aesthetic. Near-invisible borders, subtle opacity layers, premium fluid scroll. No flashy gradients or heavy color animations.

The site is a single scrollable document at `/` composed of 10+ sections. Navigation is anchor-based via a fixed navbar. All content is static — no CMS, no database. Contact form submissions are handled via a server action with Resend email integration.

---

## 2. Tech Stack

| Category | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Next.js | ^16.1.6 | App Router, RSC, Turbopack |
| UI Library | React | ^19.0.0 | Functional components, hooks |
| Language | TypeScript | ^5 | Strict mode, path aliases `@/*` |
| Styling | Tailwind CSS | ^4 | PostCSS integration via `@tailwindcss/postcss` |
| Animations | motion (Framer Motion) | ^12.6.3 | React animation primitives |
| Smooth Scroll | Lenis | ^1.3.21 | `ReactLenis` wrapper with exponential easing |
| Animation Utilities | tw-animate-css | ^1.2.5 | Tailwind accordion/shadcn animations |
| Component Primitives | Radix UI Accordion | ^1.2.3 | Accessible headless accordion |
| UI Preset | Aceternity UI | ^0.2.2 | Inspiration / some component patterns |
| Icons | lucide-react | ^0.487.0 | Feather-style icons |
| Icons | react-icons | ^5.5.0 | Simple Icons, Font Awesome |
| Email | resend | ^6.12.2 | Server action email delivery |
| Validation | zod | ^4.3.6 | Contact form schema validation |
| Class Utilities | clsx + tailwind-merge | ^2.1.1 / ^2.6.0 | `cn()` conditional class helper |
| Component Variants | class-variance-authority | ^0.7.1 | CVA for variant-based components |
| Theme | next-themes | ^0.4.6 | Dark-only (no toggle) |
| Package Manager | pnpm | 10.18.1 | Locked via `packageManager` field |

**Note:** `tailwind-merge` is pinned to `^2.6.0` (not v3) due to compatibility with the project's `cn()` helper usage pattern.

---

## 3. Directory Structure

```
myportfoliowebsite/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout: Geist fonts, metadata, ThemeProvider, SmoothScroll, StructuredData, PrivacyBanner
│   ├── globals.css                   # Global styles, OKLCH tokens, Tailwind v4 directives, custom keyframes
│   ├── icon.svg                      # Lightweight vector favicon
│   ├── robots.ts                     # Dynamic robots.txt generation
│   ├── sitemap.ts                    # Dynamic sitemap.xml generation
│   ├── (home)/                       # Route group — renders at "/"
│   │   ├── page.tsx                  # Main page: dynamic imports for all sections, loader orchestration
│   │   └── components/               # Page-specific components (26 files)
│   │       ├── HeroSection.tsx       # Hero: text-swap animation, mouse-reactive light beams
│   │       ├── navbar.tsx            # Fixed nav: scroll progress, mobile sidebar, Magnetic buttons
│   │       ├── loader.tsx            # Full-screen splash loader with callback
│   │       ├── about.tsx             # Founder's letter + four-pillar expandable cards
│   │       ├── aboutsectitle.tsx     # Section heading
│   │       ├── Myskills.tsx          # Skills section: data + grid
│   │       ├── Myskillssectitle.tsx  # Section heading
│   │       ├── ProjectsSection.tsx   # 3-project showcase with hover overlays
│   │       ├── MethodologySection.tsx # Bento grid: 4 capability pillars
│   │       ├── EngineeringStandards.tsx # 4-phase cards (Discovery → Optimization)
│   │       ├── GlobalImpact.tsx      # Geographic reach / timezone advantage
│   │       ├── Testimonials.tsx      # Client testimonial cards
│   │       ├── FAQSection.tsx        # Accordion-based FAQ
│   │       ├── ContactSection.tsx    # Contact form + pricing tiers + methods
│   │       ├── LeadMagnet.tsx        # Email capture lead magnet
│   │       ├── CaseStudies.tsx       # Project deep-dives with metrics
│   │       ├── ActiveBuilds.tsx      # Terminal-style build log panel
│   │       ├── RollingProgress.tsx   # Scroll-driven progress indicator
│   │       ├── Footer.tsx            # 4-column footer + copyright
│   │       ├── PrivacyBanner.tsx     # Bottom privacy banner (GPC-aware)
│   │       ├── ScrollProgress.tsx    # Thin top progress bar (standalone)
│   │       ├── UrgencyBar.tsx        # Scarcity banner (currently unused)
│   │       ├── MagneticButton.tsx    # Magnetic hover effect wrapper
│   │       ├── Logo.tsx              # Animated logo component
│   │       ├── AnimateOnScroll.tsx   # Reusable scroll-triggered wrapper
│   │       ├── AnimatedCounter.tsx   # Number count-up animation
│   │       ├── SkeletonLoader.tsx    # Loading skeleton placeholder
│   │       └── ScrollProgress.tsx    # Duplicate — legacy, unused
│   ├── actions/
│   │   └── contact.ts                # Server action: form validation + Resend email
│   ├── privacy-policy/
│   │   └── page.tsx                  # Static privacy policy page
│   ├── terms-of-service/
│   │   └── page.tsx                  # Static terms page
│   └── products/
│       └── page.tsx                  # Product listing / capabilities page
│
├── components/                       # Shared/reusable components
│   ├── theme-provider.tsx            # next-themes wrapper
│   └── ui/                           # Reusable UI primitives (22 files)
│       ├── text-swap.tsx             # Framer Motion text carousel (used in Hero)
│       ├── magnetic.tsx              # Magnetic hover effect (used in Footer, Navbar)
│       ├── smooth-scroll.tsx         # Lenis ReactLenis wrapper
│       ├── accordion.tsx             # Radix UI accordion (used in FAQ)
│       ├── spotlight.tsx             # Mouse-tracking spotlight overlay
│       ├── splash-cursor.tsx         # Canvas cursor splash effect
│       ├── vortex.tsx                # Canvas particle vortex background
│       ├── true-focus.tsx            # Focus blur effect (used in Projects)
│       ├── shiny-text.tsx            # Static text wrapper (gradient removed)
│       ├── blur-text.tsx             # Animated blur-reveal text
│       ├── glitch-text.tsx           # Glitch effect on hover
│       ├── decrypted-text.tsx        # Scramble-decrypt text animation
│       ├── rotating-text.tsx         # 3D rotating text cylinder
│       ├── typing-text.tsx           # Typewriter effect
│       ├── fuzzy-text.tsx            # Fuzzy distortion text
│       ├── electric-border.tsx       # Electric arc border animation
│       ├── service-icon.tsx          # SVG icon renderer
│       ├── three-d-card.tsx          # 3D tilt card (unused)
│       ├── animated-tooltip.tsx      # Profile tooltip (unused)
│       ├── moving-border.tsx         # Animated gradient border (unused)
│       ├── StructuredData.tsx        # JSON-LD schema markup
│       └── RotatingText.css          # Styles for rotating-text
│
├── lib/
│   ├── utils.ts                      # `cn()` helper: clsx + tailwind-merge
│   └── content-data.ts               # Centralized content: hero, about, services, projects, testimonials, contact
│
├── types/
│   ├── modules.d.ts                  # Type declarations: resend, aceternity-ui, clsx, tailwind-merge, @react-bits/LightRays
│   └── lucide-react.d.ts             # Comprehensive lucide-react icon declarations
│
├── public/
│   ├── images/
│   │   ├── home/
│   │   │   ├── dentrixappslg.png     # Navbar logo
│   │   │   ├── dentrixappslogoicon.png # Footer logo icon
│   │   │   └── profilepic.png        # Founder photo
│   │   └── projects/
│   │       ├── maganji-screenshot.png
│   │       └── tuandike-screenshot.png
│   └── manifest.json               # PWA manifest
│
├── next.config.ts                    # Image formats, device sizes, strict mode
├── postcss.config.mjs                # PostCSS: @tailwindcss/postcss plugin
├── tsconfig.json                     # Path alias `@/*`, strict TypeScript
├── package.json                      # Dependencies + pnpm lock
├── pnpm-lock.yaml                    # pnpm 10.18.1 lockfile
├── components.json                   # shadcn/ui configuration
├── eslint.config.mjs                 # ESLint flat config
├── ARCHITECTURE.md                   # This document
├── PORTFOLIO-FULL-AUDIT.md           # Historical audit notes
└── README.md                         # Project readme
```

---

## 4. Routing & Page Architecture

### Route Map

```
/                    → app/(home)/page.tsx           (main portfolio — single scrollable page)
/privacy-policy      → app/privacy-policy/page.tsx   (static legal page)
/terms-of-service    → app/terms-of-service/page.tsx (static legal page)
/products            → app/products/page.tsx           (product listing placeholder)
/robots.txt          → app/robots.ts                 (dynamic robots generation)
/sitemap.xml         → app/sitemap.ts                (dynamic sitemap generation)
```

### Page Composition (`app/(home)/page.tsx`)

The main page is a **Client Component** (`"use client"`) that orchestrates section rendering with a loader gate:

```
<Loader onDone={() => setPageReady(true)} />

<AnimatePresence>
  {pageReady && (
    <motion.main>
      ├── fixed bg-black canvas layer
      ├── <HeavyVortex />              (canvas particles, SSR-disabled dynamic import)
      ├── <HeavySplashCursor />       (cursor ripples, desktop only, SSR-disabled)
      ├── #home → <Navbar /> + <LazyHeroSection />
      ├── #impact → <HeavyGlobalImpact />
      ├── #methodology → <HeavyMethodologySection />
      ├── #about → <AboutSectitle /> + <About />
      ├── #skills → <Myskillssectitle /> + <SkillsSection />
      ├── #standards → <HeavyEngineeringStandards />
      ├── #projects → <HeavyProjects />
      ├── <HeavyTestimonials />
      ├── <HeavyFAQ />
      ├── <HeavyLeadMagnet />
      ├── <HeavyContact />
      └── <HeavyFooter />
    </motion.main>
  )}
</AnimatePresence>
```

**All heavy sections** (Vortex, SplashCursor, GlobalImpact, Methodology, EngineeringStandards, Testimonials, FAQ, LeadMagnet, Contact, Projects, Footer) are loaded via **dynamic imports with `ssr: false`** to reduce initial bundle size and avoid hydration mismatches with canvas-based effects.

**Note:** `<UrgencyBar />` is commented out / removed from the render tree.

---

## 5. Component Architecture

### 5.1 Loader (`app/(home)/components/loader.tsx`)

**Type:** Client Component
**Behavior:** Full-screen overlay that auto-dismisses after 3s OR on external callback (`onDone`). Receives `onDone` prop from `page.tsx` to coordinate the main content fade-in.

**Flow:**
```
Mount → render overlay → 3000ms → call onDone() → parent sets pageReady=true
                                                      → AnimatePresence reveals main
```

### 5.2 Navbar (`app/(home)/components/navbar.tsx`)

**Type:** Client Component
**Position:** Fixed inside hero container, `z-[200]`

**Features:**
- **Scroll-aware styling:** Width shrinks (95% → 90%), backdrop blur intensifies, border appears on scroll
- **Scroll Progress Bar:** Built-in `ScrollProgress` sub-component using Framer Motion `useScroll` + `scrollYProgress` — single 2px gradient bar at top of navbar
- **Desktop nav:** 6 anchor links (Home, Methodology, About, Capabilities, Products, Contact)
- **Mobile:** Hamburger → full-screen sidebar overlay with spring animations
- **Logo click:** Triggers loader → full page reload to `/`
- **Products link:** Shows `<Loader>` transition before routing to `/products`

**Sections data:** Hardcoded array of `{ name, href, isExternal? }`

### 5.3 HeroSection (`app/(home)/components/HeroSection.tsx`)

**Type:** Client Component
**Background:** Transparent — the `page.tsx` fixed `bg-black` layer shows through

**Mouse-reactive light beams:**
- `handleMouseMove` callback updates CSS custom properties `--ray-x`, `--ray-y`, `--glow-x`, `--glow-y`
- Beams originate from top-center via `conic-gradient` + `mask-image`
- Ambient glow follows cursor with 0.8s transition

**Content:**
- Eyebrow: "Software Engineering Lab" (ghost text, no box)
- Headline: "We Engineer Systems That" + `<TextSwap />` with 4 rotating phrases
- Subheadline from `heroContent`
- CTA: White button (primary) + ghost link (secondary)
- Stats row: 4 inline stats (Systems Deployed, Latency, Uptime, Timezone)

**TextSwap:** Plain `text-white/90` — no gradient animation (removed per design direction)

### 5.4 About Section (`app/(home)/components/about.tsx`)

**Type:** Client Component
**Content:** Founder's letter + 4 expandable pillar cards (Vision, Mission, Origin, Standard)

**Styling:** Ghost borders (`rgba(255,255,255,0.06)`), transparent backgrounds. No colored badges — icons at `text-white/30`. Text at `text-white/60` (headings) down to `text-white/35` (body).

**Interaction:** Click to expand/collapse individual pillars via `activePillar` state.

### 5.5 Myskills / Capabilities (`app/(home)/components/Myskills.tsx`)

**Type:** Client Component
**Data:** 8 services from `servicesContent` (trading, data pipelines, automation, video, fullstack, audits, AI, creator OS)

**Grid:** Responsive — cards with hover lift, ghost borders, minimal styling.

### 5.6 ProjectsSection (`app/(home)/components/ProjectsSection.tsx`)

**Type:** Client Component
**Data:** 3 projects from `projectsContent` (Maganji, Tuandike, CreatorOS)

**Card features:**
- `TrueFocus` blur effect on image hover
- Status badge (LIVE / IN DEVELOPMENT)
- Click/tap to reveal "Visit Website" overlay
- Metrics grid (3 stats per project)
- Tech stack tags
- Coming-soon projects: grayscale + blur + "IN DEVELOPMENT" badge

### 5.7 MethodologySection (`app/(home)/components/MethodologySection.tsx`)

**Type:** Client Component
**Layout:** Asymmetric bento grid (3 columns on lg)
- Row 1: Architecture (2 cols) | AI Integration (1 col)
- Row 2: Algo Scalability (1 col) | Global Deployment (2 cols)

**Styling:** Ghost borders `rgba(255,255,255,0.05)`, no background fills. Icons bare at `text-white/25`. Titles `text-white/80`, body `text-white/35`. No `ShinyText` gradient animation.

### 5.8 EngineeringStandards (`app/(home)/components/EngineeringStandards.tsx`)

**Type:** Client Component
**Layout:** Bento grid (3 columns on lg), 4 phase cards

**Phases:** Discovery → Architecture → Intelligence → Optimization

**Removed:** Performance arc circles (the animated SVG progress indicators with % values)

**Styling:** Same ghost aesthetic as Methodology. Phase numbers as plain mono text. No colored icon boxes.

### 5.9 ContactSection (`app/(home)/components/ContactSection.tsx`)

**Type:** Client Component
**Features:**
- Contact form (name, email, company, budget, description)
- Budget selector dropdown
- Pricing transparency box (4 tiers)
- Multiple contact methods (Calendly, WhatsApp, direct email)
- Trust signals

**Form submission:** Uses `useActionState` with `submitContactForm` server action.

### 5.10 Footer (`app/(home)/components/Footer.tsx`)

**Type:** Client Component
**Columns:** Brand & Mission | Company links | Legal links | Social + CTA
**Socials:** GitHub, WhatsApp, Gmail via `react-icons/si`
**Bottom bar:** Terminal-style panel with system status + copyright

### 5.11 Other Components

| Component | Type | Purpose |
|---|---|---|
| `GlobalImpact.tsx` | Client | Geographic reach / timezone visual |
| `Testimonials.tsx` | Client | 3 client testimonial cards |
| `FAQSection.tsx` | Client | Radix accordion FAQ (6 items) |
| `LeadMagnet.tsx` | Client | Email capture with form validation |
| `CaseStudies.tsx` | Client | Deep-dive project case studies |
| `ActiveBuilds.tsx` | Client | Terminal-style animated build log |
| `RollingProgress.tsx` | Client | Scroll-driven ball progress indicator |
| `PrivacyBanner.tsx` | Client | GPC-aware privacy banner |
| `MagneticButton.tsx` | Client | Magnetic hover effect wrapper |
| `Logo.tsx` | Client | Animated logo with glitch effect |
| `AnimateOnScroll.tsx` | Client | Reusable scroll-triggered fade-in wrapper |
| `AnimatedCounter.tsx` | Client | Number count-up animation |

---

## 6. UI Component Library

All components in `components/ui/` are local copies following the shadcn/ui model.

### 6.1 Currently Used

| Component | Used By | Description |
|---|---|---|
| `text-swap.tsx` | HeroSection | Animated text carousel with AnimatePresence |
| `magnetic.tsx` | Navbar, Footer | Magnetic pull effect on hover (Framer Motion spring) |
| `smooth-scroll.tsx` | layout.tsx | Lenis wrapper with `lerp: 0.035`, `duration: 2.2` |
| `accordion.tsx` | FAQSection | Radix UI accordion with Tailwind animations |
| `spotlight.tsx` | (available) | Mouse-tracking radial spotlight overlay |
| `splash-cursor.tsx` | page.tsx | Canvas cursor trail/ripple effect |
| `vortex.tsx` | page.tsx | Canvas particle vortex background |
| `true-focus.tsx` | ProjectsSection | Blur-on-hover focus effect for images |
| `shiny-text.tsx` | (available) | Static white text wrapper (was gradient sweep) |
| `StructuredData.tsx` | layout.tsx | JSON-LD schema markup (Organization, WebSite) |

### 6.2 Available but Unused

| Component | Description |
|---|---|
| `blur-text.tsx` | Animated blur-reveal text |
| `glitch-text.tsx` | Hover-triggered glitch distortion |
| `decrypted-text.tsx` | Scramble-to-decrypt text animation |
| `rotating-text.tsx` | 3D cylindrical text rotation |
| `typing-text.tsx` | Typewriter effect |
| `fuzzy-text.tsx` | Fuzzy distortion text |
| `electric-border.tsx` | Electric arc border animation |
| `three-d-card.tsx` | 3D tilt/perspective card |
| `animated-tooltip.tsx` | Profile tooltip with spring |
| `moving-border.tsx` | Animated gradient border button |

---

## 7. Styling System

### 7.1 Tailwind CSS v4

Configured via PostCSS (`@tailwindcss/postcss`). Entry point is `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
```

No `tailwind.config.js` is actively used — Tailwind v4 prefers CSS-based configuration.

### 7.2 OKLCH Design Tokens

All colors use **OKLCH** for perceptually-uniform color. Defined in `globals.css`:

```css
:root {
  --background: oklch(0 0 0);           /* pure black */
  --foreground: oklch(1 0 0);         /* white */
  --primary: oklch(0.85 0.3 150);      /* terminal green */
  --border: oklch(0.85 0.3 150 / 30%);
  --radius: 0.625rem;
}
```

**Dark mode:** `.dark` class is always applied (no light mode toggle). Tokens are identical in both modes.

**Brand palette:**
- `--color-brand-green`: `oklch(0.55 0.18 145)` — terminal green
- `--color-brand-indigo`: `oklch(0.52 0.24 264)` — indigo
- `--color-brand-purple`: `oklch(0.60 0.22 300)` — purple

### 7.3 Body Background

```css
body {
  background: oklch(0 0 0); /* pure black */
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px, transparent 2px,
    oklch(0.85 0.3 150 / 0.04) 3px,
    transparent 4px
  ); /* subtle scanline overlay */
}
```

### 7.4 Custom CSS Effects

| Class | Description | Location |
|---|---|---|
| `.hero-light-rays` | Mouse-reactive conic-gradient beams from top-center | globals.css |
| `.hero-ambient` | Mouse-reactive radial glow beneath beams | globals.css |
| `.shiny-text` | Static white text at 75% opacity | globals.css |
| `.glitch` | Hover-triggered RGB split effect | globals.css |
| `.grid-background` | 40px dot grid pattern | globals.css |
| `.terminal-panel` | Bordered panel with inset shadow | globals.css |
| `.terminal-scanlines` | Subtle horizontal scanlines | globals.css |
| `.skeleton` | Shimmer loading animation | globals.css |
| `.card-bg-animated` | Slow gradient drift animation | globals.css |
| `.animate-marquee` | Infinite horizontal scroll | globals.css |

### 7.5 Typography

**Fonts loaded in `layout.tsx`:**
- `Geist` (sans) → `--font-geist-sans`
- `Geist_Mono` (mono) → `--font-geist-mono`

**Applied:** All text uses `var(--font-geist-mono)` (monospace aesthetic throughout)

---

## 8. Animation & Motion System

### 8.1 Smooth Scroll (Lenis)

```tsx
<ReactLenis root options={{
  lerp: 0.035,        // very slow interpolation = weightless feel
  duration: 2.2,      // long deceleration curve
  smoothWheel: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))  // exponential out
}}>
```

### 8.2 Section Entrance Animations

Every section in `page.tsx` uses `motion.div` with `whileInView`:

```
Initial:    opacity: 0, y: 40-80 (or x: 80, or scale: 0.92)
Animate:    opacity: 1, y: 0, scale: 1
Transition: type: "spring", stiffness: 80-100, damping: 18-22
Viewport:   once: false, amount: 0.1-0.3
```

### 8.3 Hero Light Beams

**Mouse tracking via React refs:**
```tsx
const handleMouseMove = useCallback((e: MouseEvent) => {
  const x = (clientX / innerWidth - 0.5) * 2;  // -1 to 1
  raysRef.current.style.setProperty('--ray-x', `${50 + x * 8}%`);
  raysRef.current.style.setProperty('--ray-y', `${x * 3}deg`);
}, []);
```

**CSS reads custom properties:**
```css
.hero-light-rays::before {
  left: var(--ray-x, 50%);
  transform: translateX(-50%) rotate(var(--ray-y, 0deg));
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
```

### 8.4 TextSwap Animation

```tsx
<TextSwap
  phrases={["Print Money.", "Save Time.", "Work While You Sleep.", "Scale Infinitely."]}
  interval={3000}
  className="text-white/90"
/>
```

- Uses `AnimatePresence mode="wait"` with `initial={false}`
- `y: 16 → 0` enter, `y: 0 → -16` exit
- 0.3s duration, custom cubic-bezier ease
- SSR-safe: shows static first phrase on initial render

### 8.5 Core Motion Patterns

| Pattern | Implementation | Used In |
|---|---|---|
| Mount fade | `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` | Loader, Navbar |
| Slide from Y | `initial={{ y: 24 }} whileInView={{ y: 0 }}` | Most sections |
| Slide from X | `initial={{ x: 80 }} whileInView={{ x: 0 }}` | About, Methodology |
| Scale entrance | `initial={{ scale: 0.92 }} whileInView={{ scale: 1 }}` | EngineeringStandards |
| Spring hover | `whileHover={{ scale: 1.02 }}` | Cards, buttons |
| Magnetic pull | Framer Motion `onMouseMove` + `animate` | Navbar links, Footer socials |
| Stagger children | `staggerChildren: 0.07` | Mobile sidebar links |
| Progress bar | `scaleX: scrollYProgress` | Navbar scroll indicator |

---

## 9. Data Architecture

All content is **static** and centralized in `lib/content-data.ts`.

### 9.1 Content Modules

```ts
export const heroContent = { primaryHeadline, subheadline, stats, primaryCta, ... };
export const aboutContent = { heading, paragraphs, foundingPrinciple, visionStatement };
export const servicesContent = [ { id, icon, title, outcome_description, tech_stack, price_anchor, ... }, ... ];
export const projectsContent = [ { id, name, tagline, description, url, stack, metrics, status, image_path }, ... ];
export const testimonialsContent = [ { name, role, location, quote, metric }, ... ];
export const contactContent = { heading, contactMethods, pricingTransparencyBox, trustSignals };
```

### 9.2 Data Flow

```
lib/content-data.ts
      │
      ├──→ HeroSection (heroContent)
      ├──→ About (aboutContent)
      ├──→ Myskills (servicesContent)
      ├──→ ProjectsSection (projectsContent)
      ├──→ Testimonials (testimonialsContent)
      ├──→ ContactSection (contactContent)
      └──→ EngineeringStandards (hardcoded in component)
```

No external APIs, no database, no CMS. All data is compile-time constants.

---

## 10. State Management

No global state. All state is **local to components** via `useState`.

| Component | State | Purpose |
|---|---|---|
| `page.tsx` | `pageReady: boolean` | Gates main content after loader |
| `page.tsx` | `isMobile: boolean` | Adapts vortex particle count |
| `Loader` | `isVisible: boolean` | Controls loader overlay |
| `Navbar` | `scrolled: boolean` | Changes nav style on scroll |
| `Navbar` | `menuOpen: boolean` | Mobile sidebar toggle |
| `Navbar` | `isNavigatingToProducts: boolean` | Shows loader before /products |
| `HeroSection` | Mouse position (refs) | Drives light beam CSS vars |
| `About` | `activePillar: string \| null` | Expandable pillar toggle |
| `ProjectsSection` | `activeId: string \| null` | Click-to-reveal overlay |
| `MethodologySection` | `hovered: boolean` (per card) | Card hover state |
| `EngineeringStandards` | `hovered: boolean`, `open: boolean` | Card hover + deliverables toggle |
| `FAQSection` | `openItem: string \| null` | Accordion toggle |
| `ContactSection` | `useActionState` | Form submission state |
| `LeadMagnet` | `email`, `isSubmitting`, `message` | Email capture form |

---

## 11. Server Actions

### `app/actions/contact.ts`

**Export:** `submitContactForm(prevState, formData)`

**Pipeline:**
1. **Validate** with Zod schema (name, email, company, budget, description)
2. **Rate limit** — 3 submissions per email per hour (in-memory Map, resets on cold start)
3. **Honeypot check** — hidden `website` field must be empty (bot detection)
4. **Send email** via Resend (dynamic import, graceful fallback if no API key)
5. **Return** `{ success: boolean, message: string, errors? }`

**Environment variables required:**
- `RESEND_API_KEY` — Resend API key
- `CONTACT_EMAIL` — Destination email (defaults to `hello@dentrixapps.com`)

**Fallback behavior:** If no Resend key configured, logs submission to server console and returns success.

---

## 12. Performance Strategy

### 12.1 Dynamic Imports with SSR Disabled

All heavy sections are dynamically imported to reduce initial bundle:

```tsx
const HeavyVortex = dynamic(() => import('@/components/ui/vortex').then(m => m.Vortex), { ssr: false });
const HeavySplashCursor = dynamic(() => import('@/components/ui/splash-cursor').then(m => m.SplashCursor), { ssr: false });
const HeavyGlobalImpact = dynamic(() => import('./components/GlobalImpact').then(m => m.GlobalImpact), { ssr: false });
// ... etc for all sections
```

### 12.2 Loader Gating

The `<Loader />` component blocks rendering of the main content tree for 3 seconds, giving time for dynamic chunks to load in the background.

### 12.3 Image Optimization

- `next/image` with `fill` + `priority` for above-fold images
- AVIF/WebP formats enabled in `next.config.ts`
- Responsive `sizes` attribute on project cards: `(max-width: 1024px) 100vw, 33vw`

### 12.4 CSS

- `will-change: transform, opacity` on animated elements
- `transform: translateZ(0)` for GPU compositing
- `@media (prefers-reduced-motion: reduce)` disables all animations for accessibility

---

## 13. SEO & Metadata

### 13.1 Metadata (`app/layout.tsx`)

Comprehensive metadata object:
- **Title template:** `%s | Dentrix Apps`
- **Description:** Full SEO paragraph with keywords
- **Keywords:** 13 targeted terms (algorithmic trading, C++ bot, Python automation, etc.)
- **OpenGraph:** Title, description, OG image `/images/og-image.png`
- **Twitter Card:** Summary large image
- **Canonical:** `https://dentrixapps.com`
- **Authors / Creator:** Denis Kioko
- **Robots:** `index, follow` with Googlebot-specific directives
- **Icons:** `/icon.png` for favicon + apple touch
- **Manifest:** `/manifest.json`

### 13.2 Structured Data (`components/ui/StructuredData.tsx`)

JSON-LD schema:
- `@type: Organization` — Dentrix Apps
- `@type: WebSite` — with `SearchAction` for site search
- Founder info, sameAs links (GitHub, WhatsApp, email)

### 13.3 Dynamic Files

- `robots.ts` → `/robots.txt`
- `sitemap.ts` → `/sitemap.xml` (lists all routes with priority/changefreq)

---

## 14. Known Issues & Technical Debt

| # | Issue | Location | Impact | Status |
|---|---|---|---|---|
| 1 | `accentColor` fields in EngineeringStandards/Methodology data are unused after ghost-border redesign | `EngineeringStandards.tsx`, `MethodologySection.tsx` | Dead code — colors still defined but not applied | Low |
| 2 | Unused UI components (~10 files) increase bundle size slightly | `components/ui/` | Dead code — not tree-shaken from dynamic chunks | Low |
| 3 | `@react-bits/LightRays-JS-CSS` declaration exists but component was replaced with CSS | `types/modules.d.ts` | Stale type declaration | Low |
| 4 | `ScrollProgress.tsx` duplicate — both standalone and inline in Navbar | `app/(home)/components/` | One is unused | Low |
| 5 | ProjectsSection header still has indigo underline gradient | `ProjectsSection.tsx:35` | Inconsistent with ghost design direction | Medium |
| 6 | `UrgencyBar` is commented out but file remains | `app/(home)/components/UrgencyBar.tsx` | Dead file | Low |
| 7 | `Myskillssectitle.tsx` and `aboutsectitle.tsx` are minimal wrappers | Section title components | Could be inlined | Low |
| 8 | Rate limiter is in-memory (Map) — resets on cold start | `app/actions/contact.ts` | Not suitable for production scale | Medium |
| 9 | `aceternity-ui` types are all `any` | `types/modules.d.ts` | No real type safety for aceternity imports | Low |
| 10 | No OG image file at `/images/og-image.png` | `public/images/` | Metadata references non-existent image | Medium |

---

## Appendix: File Size Estimates

| Category | Files | Approx. Lines |
|---|---|---|
| Page components | 26 | ~3,500 |
| UI primitives | 22 | ~2,800 |
| Content data | 1 | 260 |
| Server actions | 1 | 160 |
| Types | 2 | 180 |
| Styles (globals.css) | 1 | 470 |
| **Total TypeScript/TSX** | **~55** | **~7,400** |
