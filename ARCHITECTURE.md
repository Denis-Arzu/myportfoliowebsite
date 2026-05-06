# Dentrix Apps — AI Voice Studio Architecture Documentation

> Current state as of May 5, 2026.
> Single-page premium AI Voice Studio website for Dentrix Apps — specializing in professional AI voiceovers, voice cloning, multilingual dubbing, and conversational voice agents.

---

## CHANGELOG (Latest Audit - May 5, 2026)

### Critical Fixes Completed
- ✅ **FIX #2**: Removed legacy tagline `fix(world, code)` from loader.tsx — replaced with "AI Voice Studio" branding
- ✅ **FIX #4**: Fixed structured data founder name inconsistency — standardized to "Dennis Kioko" (matches live site and content-data.ts)
- ✅ **FIX #5**: Removed "Software Engineering" from structured data industry array and knowsAbout array (voice-first positioning)
- ✅ **FIX #D2**: Removed empty JSON-LD schema script tag (softwareApplicationsSchema) — prevents rendering unnecessary empty array
- ✅ **Brand Cleanup**: Updated privacy-policy and terms-of-service page descriptions to reflect AI Voice Studio positioning (removed "software engineering lab")
- ✅ **Removed Dead Code**: Deleted UrgencyBar.tsx (unused scarcity banner component)
- ✅ **OG Image**: Created placeholder og-image.png (copied from logo) — metadata now references valid file
- ✅ **Routing**: Removed /products page (was legacy, brand bleed risk) — updated sitemap to only include valid routes
- ✅ **Contact Form**: Improved rate limiter with periodic cleanup (prevents unbounded memory growth on long-running instances)

### Build Status
- ✅ `pnpm next build` — **ZERO errors, ZERO warnings**
- ✅ All TypeScript compilation passed
- ✅ All routes properly configured
- ✅ Static generation successful for 8 routes

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

**Name:** Dentrix Apps — AI Voice Studio
**Type:** Premium single-page conversion-focused service website
**Framework:** Next.js 16 (App Router, Turbopack)
**Deployment:** Vercel (static export compatible)
**Design Philosophy:** Dark minimal, ghost-border aesthetic. Near-invisible borders (`rgba(255,255,255,0.05)`), subtle opacity layers, premium fluid scroll. No flashy gradients or heavy color animations. Monospace-first typography with Geist Mono.

The site is a single scrollable document at `/` composed of 10+ sections optimized for voice AI service conversion. Navigation is anchor-based via a fixed navbar. All content is static — no CMS, no database. Contact form submissions are handled via a server action with Resend email integration, including service type selection.

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
| Image Optimization | sharp | ^0.34.0 | Build-time image compression & WebP conversion |
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
│   │   └── components/               # Page-specific components (25 active files)
│   │       ├── HeroSection.tsx       # Hero: AI Voice Studio headline, text-swap, mouse-reactive light beams
│   │       ├── navbar.tsx            # Fixed nav: scroll progress, mobile sidebar, Magnetic buttons
│   │       ├── loader.tsx            # Full-screen splash loader with callback
│   │       ├── about.tsx             # Founder's letter + four-pillar expandable cards (Voice AI positioning)
│   │       ├── aboutsectitle.tsx     # Section heading wrapper
│   │       ├── Myskills.tsx          # ServicesSection: 5 voice AI services grid
│   │       ├── Myskillssectitle.tsx  # Section heading wrapper
│   │       ├── MethodologySection.tsx # ProcessSection: voice production workflow bento grid
│   │       ├── EngineeringStandards.tsx # WhyUs: 4 differentiation pillars
│   │       ├── Testimonials.tsx      # Voice client social proof cards
│   │       ├── FAQSection.tsx        # Accordion-based FAQ (voice AI focused)
│   │       ├── ContactSection.tsx    # Contact form + service selector + pricing tiers
│   │       ├── AudioPlayer.tsx       # Voice demo audio player with progress bar, time display
│   │       ├── VoiceDemoSection.tsx  # Voice portfolio showcase with AudioPlayer components
│   │       ├── PricingSection.tsx    # 3-tier pricing cards with feature comparison
│   │       ├── Footer.tsx            # 4-column footer + copyright (AI Voice Studio branding)
│   │       ├── PrivacyBanner.tsx     # Bottom privacy banner (GPC-aware)
│   │       ├── MagneticButton.tsx    # Magnetic hover effect wrapper
│   │       ├── Logo.tsx              # Animated logo component
│   │       ├── AnimateOnScroll.tsx   # Reusable scroll-triggered wrapper
│   │       ├── AnimatedCounter.tsx   # Number count-up animation
│   │       ├── SkeletonLoader.tsx    # Loading skeleton placeholder
│   │       # REMOVED: UrgencyBar.tsx (unused scarcity banner — deleted in audit)
│   │       # REMOVED: ProjectsSection.tsx, GlobalImpact.tsx, LeadMagnet.tsx, CaseStudies.tsx,
│   │       #          ActiveBuilds.tsx, RollingProgress.tsx, ScrollProgress.tsx (duplicate)
│   ├── actions/
│   │   └── contact.ts                # Server action: form validation + serviceType + Resend email
│   ├── privacy-policy/
│   │   └── page.tsx                  # Static privacy policy page
│   └── terms-of-service/
│       └── page.tsx                  # Static terms page
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
│       ├── true-focus.tsx            # Focus blur effect (available)
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
│       ├── moving-border.tsx         # Animated gradient border button
│       ├── StructuredData.tsx        # JSON-LD schema markup (AI Voice Studio)
│       └── RotatingText.css          # Styles for rotating-text
│
├── lib/
│   ├── utils.ts                      # `cn()` helper: clsx + tailwind-merge
│   └── content-data.ts               # Centralized content: hero, about, services, voice demos, pricing, testimonials, contact, FAQ, why us
│
├── scripts/
│   ├── optimize-images.ts            # Build-time image optimization (sharp → WebP)
│   └── optimize-audio.ts            # Build-time audio compression (ffmpeg)
│
├── types/
│   ├── modules.d.ts                  # Type declarations: resend, aceternity-ui, clsx, tailwind-merge
│   └── lucide-react.d.ts             # Comprehensive lucide-react icon declarations
│
├── public/
│   ├── images/
│   │   ├── home/
│   │   │   ├── dentrixappslg.png     # Navbar logo (OPTIMIZE: 83KB → WebP)
│   │   │   ├── dentrixappslogoicon.png # Footer logo icon (OPTIMIZE: 2.1MB → WebP)
│   │   │   └── profilepic.png        # Founder photo (OPTIMIZE: 132KB → WebP)
│   │   ├── og-image.png              # OG image for social media previews (created in audit)
│   │   └── projects/                 # Legacy screenshots (may be unused)
│   │       ├── maganji-screenshot.png (OPTIMIZE: 2.2MB)
│   │       └── tuandike-screenshot.png (OPTIMIZE: 1.3MB)
│   ├── audio/                        # Voice demo MP3 files (OPTIMIZE: compress to 64-80kbps)
│   │   ├── horizon-product-intro.mp3
│   │   ├── techpulse-youtube-intro.mp3
│   │   ├── dentrix-voice-clone-showcase.mp3
│   │   ├── dentrix-clone-french-dub.mp3
│   │   └── dentrix-clone-hindi-dub.mp3
│   ├── icon.png                      # Favicon (OPTIMIZE: 2.1MB → <50KB WebP)
│   └── manifest.json               # PWA manifest
│
├── next.config.ts                    # Image formats (AVIF/WebP), device sizes, strict mode
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
      ├── #demos → <LazyVoiceDemoSection />   (Voice portfolio with AudioPlayer)
      ├── #services → <LazySkillsSection />    (5 AI voice services grid)
      ├── #process → <LazyMethodologySection /> (Voice production workflow)
      ├── #why-us → <LazyEngineeringStandards /> (4 differentiation pillars)
      ├── #pricing → <LazyPricingSection />    (3-tier pricing cards)
      ├── <LazyTestimonials />         (Voice client social proof)
      ├── #about → <AboutSectitle /> + <About /> (Founder story)
      ├── <LazyFAQ />                  (Voice AI focused FAQ)
      ├── #contact → <LazyContact />   (Form + service selector + pricing)
      └── <LazyFooter />               (4-column footer + copyright)
    </motion.main>
  )}
</AnimatePresence>
```

**All heavy sections** (Vortex, SplashCursor, VoiceDemoSection, MethodologySection, EngineeringStandards, Testimonials, FAQ, Contact, Footer) are loaded via **dynamic imports with `ssr: false`** to reduce initial bundle size and avoid hydration mismatches with canvas-based effects.

**Removed sections:** GlobalImpact, LeadMagnet, ProjectsSection, CaseStudies, ActiveBuilds, RollingProgress, and duplicate ScrollProgress.

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
- **Desktop nav:** 6 anchor links (Home, Portfolio, Services, Pricing, About, Contact)
- **Mobile:** Hamburger → full-screen sidebar overlay with spring animations
- **Logo click:** Smooth scroll to top (logo within same page)

**Sections data:** Hardcoded array of `{ name, href, isExternal? }`

### 5.3 HeroSection (`app/(home)/components/HeroSection.tsx`)

**Type:** Client Component
**Background:** Transparent — the `page.tsx` fixed `bg-black` layer shows through

**Mouse-reactive light beams:**
- `handleMouseMove` callback updates CSS custom properties `--ray-x`, `--ray-y`, `--glow-x`, `--glow-y`
- Beams originate from top-center via `conic-gradient` + `mask-image`
- Ambient glow follows cursor with 0.8s transition

**Content:**
- Eyebrow: "AI Voice Studio" (ghost text, no box)
- Headline: "Your Brand's Voice, Engineered to Perfection." + `<TextSwap />` with rotating phrases
- Subheadline from `heroContent` (AI voiceover value prop)
- CTA: "Hear Our Work" (primary) + ghost link (secondary)
- Stats row: 4 inline stats (Voiceovers Delivered, Languages Supported, Avg Delivery Time, Client Satisfaction)

**TextSwap:** Plain `text-white/90` — no gradient animation (removed per design direction)

### 5.4 About Section (`app/(home)/components/about.tsx`)

**Type:** Client Component
**Content:** Founder's letter + 4 expandable pillar cards (Vision, Mission, Origin, Standard)

**Styling:** Ghost borders (`rgba(255,255,255,0.06)`), transparent backgrounds. No colored badges — icons at `text-white/30`. Text at `text-white/60` (headings) down to `text-white/35` (body).

**Interaction:** Click to expand/collapse individual pillars via `activePillar` state.

### 5.5 ServicesSection (formerly Myskills) (`app/(home)/components/Myskills.tsx`)

**Type:** Client Component
**Data:** 5 voice AI services from `servicesContent`:
1. AI Voiceovers (YouTube, podcast, e-learning, commercials)
2. Voice Cloning (brand voice, audiobook narration)
3. Dubbing & Localization (29+ languages)
4. Conversational Voice Agents (IVR, lead qualification)
5. AI Developer & Integrations (custom pipelines, API integrations)

**Grid:** Responsive — cards with hover lift, ghost borders, minimal styling. Icons from lucide-react (Mic, Copy, Globe, Phone, Code2).

### 5.6 VoiceDemoSection (`app/(home)/components/VoiceDemoSection.tsx`)

**Type:** Client Component
**Data:** Voice demos from `voiceDemosContent` (5 demos: Horizon, TechPulse, Voice Clone, French Dub, Hindi Dub)

**Features:**
- Section title + subtitle from content data
- Demo cards with `<AudioPlayer />` component for each voice sample
- Badge showing delivery time ("Delivered in < 30 minutes")
- Tags for categorization (Commercial, Product, Brand, YouTube, etc.)
- Scroll-triggered entrance animations
- Ghost border aesthetic matching site design

**Audio files:** Stored in `public/audio/` (5 MP3 files)
- `horizon-product-intro.mp3`
- `techpulse-youtube-intro.mp3`
- `dentrix-voice-clone-showcase.mp3`
- `dentrix-clone-french-dub.mp3`
- `dentrix-clone-hindi-dub.mp3`

### 5.7 ProcessSection (formerly MethodologySection) (`app/(home)/components/MethodologySection.tsx`)

**Type:** Client Component
**Layout:** Asymmetric bento grid (3 columns on lg)
**Data:** Voice production workflow steps from `processContent`:
1. Brief Analysis & Voice Selection (2 cols)
2. Script Preparation & SSML Enhancement (1 col)
3. Generation & Quality Testing (1 col)
4. Delivery & Format Conversion (2 cols)

**Styling:** Ghost borders `rgba(255,255,255,0.05)`, no background fills. Icons bare at `text-white/25`. Titles `text-white/80`, body `text-white/35`. No `ShinyText` gradient animation.

### 5.8 WhyUs (formerly EngineeringStandards) (`app/(home)/components/EngineeringStandards.tsx`)

**Type:** Client Component
**Layout:** Bento grid (3 columns on lg), 4 pillar cards

**Pillars:**
1. Human + AI, Not Human vs AI
2. Sound Like You, Every Language
3. Speed Without Sacrifice
4. Your Voice, Global Scale

**Removed:** Performance arc circles (the animated SVG progress indicators with % values)

**Styling:** Same ghost aesthetic as ProcessSection. Icons from lucide-react. No colored icon boxes.

### 5.9 PricingSection (`app/(home)/components/PricingSection.tsx`)

**Type:** Client Component
**Data:** 3 pricing tiers from `pricingContent`:
1. **Starter** — $25: 1 voiceover (up to 2 min), 1 revision, 2-3 day delivery
2. **Professional** — $75: 3 voiceovers (up to 5 min each), 2 revisions, same-day delivery (Popular)
3. **Enterprise** — Custom: Unlimited voiceovers, dedicated voice, API access, white-glove support

**Features:**
- Popular tier highlight with green accent border
- Feature comparison with inline SVG checkmarks
- CTA buttons linking to contact section
- Scroll-triggered entrance animations
- Ghost border card styling

### 5.10 ContactSection (`app/(home)/components/ContactSection.tsx`)

**Type:** Client Component
**Features:**
- Contact form (name, email, company, budget, description, **serviceType**)
- **Service selector dropdown** (Voiceover, Cloning, Dubbing, Voice Agent, Integration)
- Budget selector dropdown
- Pricing transparency box (4 tiers)
- Multiple contact methods (Calendly, WhatsApp, direct email)
- Trust signals

**Form submission:** Uses `useActionState` with `submitContactForm` server action. Form schema includes optional `serviceType` field.

### 5.11 Footer (`app/(home)/components/Footer.tsx`)

**Type:** Client Component
**Columns:** Brand & Mission | Company links | Legal links | Social + CTA
**Socials:** GitHub, WhatsApp, Gmail via `react-icons/si`
**Bottom bar:** Terminal-style panel with system status + copyright
**AI Voice Studio branding** — updated company description and navigation links

### 5.12 Other Components

| Component | Type | Purpose |
|---|---|---|
| `AudioPlayer.tsx` | Client | Voice demo audio player with progress bar, time display |
| `Testimonials.tsx` | Client | 3 voice client testimonial cards |
| `FAQSection.tsx` | Client | Radix accordion FAQ (8 items) |
| `PrivacyBanner.tsx` | Client | GPC-aware privacy banner |
| `MagneticButton.tsx` | Client | Magnetic hover effect wrapper |
| `Logo.tsx` | Client | Animated logo with glitch effect |
| `AnimateOnScroll.tsx` | Client | Reusable scroll-triggered fade-in wrapper |
| `AnimatedCounter.tsx` | Client | Number count-up animation |

**Removed components:** GlobalImpact, LeadMagnet, ProjectsSection, CaseStudies, ActiveBuilds, RollingProgress, ScrollProgress (duplicate)

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
| `true-focus.tsx` | (available) | Blur-on-hover focus effect for images |
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

| Module | Exports | Used By |
|---|---|---|
| `heroContent` | eyebrow, primaryHeadline, secondaryHeadline, textSwapPhrases[], description, stats[] | `HeroSection.tsx` |
| `aboutContent` | paragraphs[] (5), pillars[] (4): { title, description } | `about.tsx` |
| `servicesContent` | sectionSubtitle, services[] (5): { icon, title, outcomeTitle, description, deliverables[], startingPrice, deliveryTime, tags[] } | `Myskills.tsx` |
| `voiceDemosContent` | sectionTitle, sectionSubtitle, demos[] (5): { id, title, description, voiceLabel, duration, audioFile, tags[], badge } | `VoiceDemoSection.tsx`, `AudioPlayer.tsx` |
| `processContent` | steps[] (4): { number, title, description, features[] } | `MethodologySection.tsx` |
| `whyUsContent` | pillars[] (4): { title, description, icon } | `EngineeringStandards.tsx` |
| `pricingContent` | tiers[] (3): { name, price, period, description, features[], cta, popular, delivery } | `PricingSection.tsx` |
| `testimonialsContent` | sectionTitle, testimonials[] (5): { quote, author, title, project, type } | `Testimonials.tsx` |
| `faqContent` | sectionTitle, subtitle, footerText, questions[] (8): { question, answer } | `FAQSection.tsx` |
| `contactContent` | methods[], pricingSteps[], budgetTiers[], urgencyItems[], trustSignals[], guaranteeItems[], services[], toolStack[] | `ContactSection.tsx` |
| `footerLinks` | company[], legal[], social[] | `Footer.tsx` |

The data in `lib/content-data.ts` is a **hardcoded JavaScript object**. All content updates are manual edits to this file. No CMS integration.

### 9.2 Data Flow

```
lib/content-data.ts
      │
      ├──→ HeroSection (heroContent)
      ├──→ About (aboutContent)
      ├──→ Myskills (servicesContent)
      ├──→ VoiceDemoSection (voiceDemosContent)
      ├──→ PricingSection (pricingContent)
      ├──→ Testimonials (testimonialsContent)
      ├──→ ContactSection (contactContent)
      └──→ EngineeringStandards (whyUsContent)
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
| `HeroSection` | Mouse position (refs) | Drives light beam CSS vars |
| `About` | `activePillar: string \| null` | Expandable pillar toggle |
| `MethodologySection` | `hovered: boolean` (per card) | Card hover state |
| `EngineeringStandards` | `hovered: boolean`, `open: boolean` | Card hover + deliverables toggle |
| `FAQSection` | `openItem: string \| null` | Accordion toggle |
| `ContactSection` | `useActionState` | Form submission state |
| `AudioPlayer` | `isPlaying`, `currentTime`, `duration` | Audio playback state |
| `VoiceDemoSection` | — | Voice demo cards rendering |
| `PricingSection` | — | Pricing tier cards rendering |

---

## 11. Server Actions

### `app/actions/contact.ts`

**Export:** `submitContactForm(prevState, formData)`

**Pipeline:**
1. **Validate** with Zod schema (name, email, company, budget, description, **serviceType**)
2. **Rate limit** — 3 submissions per email per hour (in-memory Map with periodic cleanup; resets on cold start but has periodic cleanup to prevent unbounded memory growth)
3. **Honeypot check** — hidden `website` field must be empty (bot detection)
4. **Send email** via Resend (dynamic import, graceful fallback if no API key)
5. **Return** `{ success: boolean, message: string, errors? }`

**Environment variables required:**
- `RESEND_API_KEY` — Resend API key
- `CONTACT_EMAIL` — Destination email (defaults to `hello@dentrixapps.com`)

**Fallback behavior:** If no Resend key configured, logs submission to server console and returns success.

**Rate Limiter Improvement (May 2026 Audit):** Added `cleanupOldEntries()` function that runs every 50 submissions to delete entries older than 2x the rate window. This prevents the Map from growing unbounded on long-running server instances.

---

## 12. Performance Strategy

### 12.1 Dynamic Imports with SSR Disabled

All heavy sections are dynamically imported to reduce initial bundle:

```tsx
const HeavyVortex = dynamic(() => import('@/components/ui/vortex').then(m => m.Vortex), { ssr: false });
const HeavySplashCursor = dynamic(() => import('@/components/ui/splash-cursor').then(m => m.SplashCursor), { ssr: false });
const HeavyVoiceDemoSection = dynamic(() => import('./components/VoiceDemoSection').then(m => m.VoiceDemoSection), { ssr: false });
const HeavyPricingSection = dynamic(() => import('./components/PricingSection').then(m => m.PricingSection), { ssr: false });
// ... etc for all sections
```

### 12.2 Loader Gating

The `<Loader />` component blocks rendering of the main content tree for 3 seconds, giving time for dynamic chunks to load in the background.

### 12.3 Image Optimization

- `next/image` with `fill` + `priority` for above-fold images
- AVIF/WebP formats enabled in `next.config.ts`
- Responsive `sizes` attribute on project cards: `(max-width: 1024px) 100vw, 33vw`
- **Build-time optimization scripts** (`scripts/optimize-images.ts`) using `sharp` to convert PNG/JPEG → WebP with aggressive compression:
  - Logos: resize to 128-400px, quality 60-70%
  - Screenshots: resize to 800x600 max, quality 65%
  - OG images: resize to 1200x630, quality 75%
- Current unoptimized assets (pre-optimization):
  - `icon.png`: 2.1MB → target <50KB WebP
  - `og-image.png`: 4.4MB → target <200KB WebP  
  - `dentrixappslogoicon.png`: 2.1MB → target <30KB WebP
  - Screenshots: 1-2.6MB each → target <200KB WebP

### 12.4 Audio Optimization

- Voice demos served as MP3 with streaming `preload="metadata"`
- **Build-time compression script** (`scripts/optimize-audio.ts`) using `ffmpeg`:
  - Standard voiceovers: 64kbps mono, 22050Hz (sufficient for speech)
  - Dubbing/clones: 80kbps mono, 24000Hz
- Current unoptimized assets (pre-optimization):
  - `dentrix-clone-hindi-dub.mp3`: 3.1MB → target <300KB
  - `dentrix-voice-clone-showcase.mp3`: 2.1MB → target <200KB
  - `dentrix-clone-french-dub.mp3`: 2.0MB → target <200KB

### 12.5 CSS

- `will-change: transform, opacity` on animated elements
- `transform: translateZ(0)` for GPU compositing
- `@media (prefers-reduced-motion: reduce)` disables all animations for accessibility

---

## 13. SEO & Metadata

### 13.1 Metadata (`app/layout.tsx`)

Comprehensive metadata object:
- **Title template:** `%s | Dentrix Apps`
- **Description:** Full SEO paragraph with keywords (AI voice studio, professional voiceovers, voice cloning, multilingual dubbing, voice agents)
- **Keywords:** 13 targeted terms (AI voiceover, voice cloning, text to speech, multilingual dubbing, conversational AI, podcast voice, YouTube voiceover, SSML, voice synthesis, AI voice agent, professional narrator, synthetic voice, ElevenLabs alternative)
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
- `@type: Service`
- `@context`: `https://schema.org`
- `name`: Dentrix Apps
- `description`: AI Voice Studio specializing in professional voiceovers, voice cloning, and multilingual dubbing
- `url`: `https://dentrixapps.com`
- `logo`: `/images/home/dentrixappslogoicon.png`
- `sameAs`: GitHub, LinkedIn, Twitter social profiles
- `contactPoint`: email `hello@dentrixapps.com`, contact type: customer service
- `founder`: Dennis Kioko (AI Voice Engineer)
- `hasOfferCatalog`: AI voice services (voiceovers, cloning, dubbing, voice agents)

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
| 4 | `ScrollProgress.tsx` duplicate — **RESOLVED** duplicate removed | `app/(home)/components/` | One was unused, removed during overhaul | Resolved |
| 5 | ProjectsSection header still has indigo underline gradient — **MOOT** section removed | `ProjectsSection.tsx` | Section removed during AI Voice Studio overhaul | Resolved |
| 6 | `UrgencyBar` is commented out but file remains | `app/(home)/components/UrgencyBar.tsx` | Dead file | Low |
| 7 | `Myskillssectitle.tsx` and `aboutsectitle.tsx` are minimal wrappers | Section title components | Could be inlined | Low |
| 8 | Rate limiter is in-memory (Map) — resets on cold start | `app/actions/contact.ts` | Not suitable for production scale | Medium |
| 9 | `aceternity-ui` types are all `any` | `types/modules.d.ts` | No real type safety for aceternity imports | Low |
| 10 | **Unoptimized images**: `icon.png` (2.1MB), `og-image.png` (4.4MB), `dentrixappslogoicon.png` (2.1MB) | `public/` | Severely impacts initial load and bandwidth | **High** |
| 11 | **Unoptimized audio**: Voice dub files 2-3MB each | `public/audio/` | Large download for voice demos on mobile | **Medium** |
| 12 | No OG image file at `/images/og-image.png` | `public/images/` | Metadata references non-existent image | Medium |

---

## Appendix: File Size Estimates

| Category | Files | Approx. Lines |
|---|---|---|
| Page components | 25 active (5 removed) | ~3,500 |
| UI primitives | 22 | ~2,800 |
| Build scripts | 2 | ~300 |
| Content data | 1 | ~400 |

**Removed components (legacy portfolio):** GlobalImpact, LeadMagnet, ProjectsSection, CaseStudies, ActiveBuilds, RollingProgress, ScrollProgress (duplicate)

**New components (AI Voice Studio):** AudioPlayer, VoiceDemoSection, PricingSection

**Asset sizes (pre-optimization):**
- Images in `public/images/`: ~15MB total
  - `icon.png`: 2.1MB (target: <50KB WebP)
  - `og-image.png`: 4.4MB (target: <200KB WebP)
  - `dentrixappslogoicon.png`: 2.1MB (target: <30KB WebP)
  - Screenshots: 1-2.6MB each (target: <200KB WebP)
- Audio in `public/audio/`: ~7.8MB total
  - Dub files: 2-3MB each (target: <300KB MP3 @ 80kbps)
  - Short demos: 270-330KB (acceptable)
| Content data | 1 | 260 |
| Server actions | 1 | 160 |
| Types | 2 | 180 |
| Styles (globals.css) | 1 | 470 |
| **Total TypeScript/TSX** | **~55** | **~7,400** |

## 14. Audit & Optimization Results (2026-05-06)

### 14.1 Asset Optimization
- `icon.png` (2.1MB) → `icon.webp` (3.3KB) [99.8% reduction]
- `dentrixappslogoicon.png` (2.1MB) → `dentrixappslogoicon.webp` (2.4KB) [99.9% reduction]
- `dentrixappslg.png` (218KB) → `dentrixappslg.webp` (6.5KB) [97.0% reduction]
- `og-image.png` (218KB) → `og-image.webp` (38.8KB) [82.2% reduction]
- `profilepic.png` (1.4MB) → Removed (unused asset)
- `services/*_bg.png` → Converted to WebP with ~85-95% size reduction.

### 14.2 Codebase Hardening
- **Dead Code**: Removed 10+ unused UI components and 6+ inactive section components.
- **Inlining**: `Myskillssectitle.tsx` and `aboutsectitle.tsx` inlined to reduce component depth.
- **Server Actions**: Hardened `contact.ts` with a sliding window rate limiter (3 req/hr per user).
- **Branding**: Purged all legacy "Software Engineering" services and taglines. Added permanent redirect from `/products` to `/#services`.

### 14.3 SEO & Metadata
- **Sitemap**: Refactored `sitemap.ts` to include actual routes (`/`, `/privacy-policy`, `/terms-of-service`) and removed redundant anchors.
- **Manifest**: Updated `manifest.json` with AI Voice Studio branding and description.
- **Performance**: Added `dns-prefetch` for Google Fonts and optimized `og-image` preload.

### 14.4 Build Status
- **Result**: `SUCCESS`
- **Warnings**: 0
- **Errors**: 0
- **Metric**: Zero-error state reached. Production ready.
