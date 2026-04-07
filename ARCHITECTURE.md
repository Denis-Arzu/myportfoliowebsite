# Dentrix Apps — Architecture Documentation

> Current state of the application as of April 2026.
> This document describes the full structure, component design, styling system, and animation approach of the portfolio/company website.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Directory Structure](#3-directory-structure)
4. [Routing & Page Structure](#4-routing--page-structure)
5. [Component Architecture](#5-component-architecture)
6. [UI Component Library](#6-ui-component-library)
7. [Styling System](#7-styling-system)
8. [Animation System](#8-animation-system)
9. [Theme System](#9-theme-system)
10. [Font System](#10-font-system)
11. [Asset Management](#11-asset-management)
12. [Data Flow & State](#12-data-flow--state)
13. [Known Issues & Technical Debt](#13-known-issues--technical-debt)

---

## 1. Project Overview

**Name:** Dentrix Apps Website
**Current framing:** Personal portfolio for Denis (founder of Dentrix Apps)
**Intended direction:** Premium company profile for Dentrix Apps
**Framework:** Next.js (App Router)
**Status:** Functional single-page site with all sections implemented

The site is a single-page application rendered at the root route `/`. It showcases the founder's background, technical skills, and two live product links. All navigation is anchor-based (no multi-page routing yet).

---

## 2. Tech Stack

| Category | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | ^16.1.6 | App Router, RSC-enabled |
| UI Library | React | ^19.0.0 | With React DOM |
| Language | TypeScript | ^5 | Strict mode enabled |
| Styling | Tailwind CSS | ^4 | PostCSS integration via `@tailwindcss/postcss` |
| Animations | Motion (`motion/react`) | ^12.6.3 | The rebranded Framer Motion standalone package |
| Animation Utilities | tw-animate-css | ^1.2.5 | Extra Tailwind animation classes |
| Component Primitives | Radix UI Accordion | ^1.2.3 | Accessible headless accordion |
| UI Preset | Aceternity UI | ^0.2.2 | Inspiration for some components |
| Icons | react-icons | ^5.5.0 | SI (Simple Icons), FA (Font Awesome) sets |
| Icons | lucide-react | ^0.487.0 | Feather-style icons (ChevronRight, X, ArrowLeft) |
| Theme | next-themes | ^0.4.6 | Light/dark system theme detection |
| Class Utilities | clsx + tailwind-merge | ^2.1.1 / ^3.1.0 | Combined via `cn()` helper in `lib/utils.ts` |
| Component Variants | class-variance-authority | ^0.7.1 | CVA for variant-based components |
| Component Setup | shadcn/ui (config only) | — | `components.json` configured; components copied locally |
| Package Manager | pnpm | 10.18.1 | Specified in `packageManager` field |

---

## 3. Directory Structure

```
myportfoliowebsite/
│
├── app/                              # Next.js App Router root
│   ├── layout.tsx                    # Root layout: fonts, metadata, ThemeProvider
│   ├── globals.css                   # Global styles, CSS custom properties, Tailwind directives
│   │
│   └── (home)/                       # Route group — renders at "/"
│       ├── page.tsx                  # Main page: composes all sections in order
│       └── components/               # Page-specific components (not reusable across routes)
│           ├── loader.tsx            # Full-screen splash loader (3s auto-dismiss)
│           ├── navbar.tsx            # Fixed top navigation bar
│           ├── HeroSection.tsx       # Hero / landing section
│           ├── about.tsx             # FAQ accordion (About section content)
│           ├── aboutsectitle.tsx     # Section heading for About
│           ├── Myskills.tsx          # Skills section: data definition + grid layout
│           ├── Myskillssectitle.tsx  # Section heading for Skills
│           └── ProjectsSection.tsx   # Projects showcase with hover overlays
│
├── components/                       # Shared/reusable components
│   ├── theme-provider.tsx            # next-themes ThemeProvider wrapper
│   └── ui/                           # Reusable UI primitives
│       ├── accordion.tsx             # Radix UI accordion (styled wrapper)
│       ├── animated-tooltip.tsx      # Clickable profile tooltip with spring animation
│       ├── moving-border.tsx         # Animated gradient border button component
│       └── skill-card.tsx            # Interactive sliding skill card (open/navigate/close)
│
├── lib/
│   └── utils.ts                      # `cn()` helper: clsx + tailwind-merge
│
├── public/
│   └── images/
│       ├── home/
│       │   └── profilepic.png        # Founder profile picture
│       └── projects/
│           ├── tuandike-screenshot.png
│           └── maganji-screenshot.png
│
├── package.json
├── tailwind.config.js                # Tailwind extensions (3D transforms, custom sizes)
├── tsconfig.json                     # TypeScript config (path aliases: @/*)
├── postcss.config.mjs                # PostCSS: @tailwindcss/postcss plugin
├── next.config.ts                    # Next.js config
├── eslint.config.mjs                 # ESLint flat config
└── components.json                   # shadcn/ui configuration
```

---

## 4. Routing & Page Structure

### Route Architecture

The project uses **Next.js App Router** with a single route group:

```
/  →  app/(home)/page.tsx
```

The `(home)` directory is a **route group** (parentheses = no URL segment). It renders at the root `/` path.

### Page Composition (`app/(home)/page.tsx`)

The page is a single scrollable document. Sections are rendered in this order:

```
<Loader />              ← Full-screen overlay, auto-dismisses after 3s
<main>
  ├── Background layers (fixed gradients)
  ├── <Navbar />        ← Fixed, z-50
  ├── #home → <HeroSection />
  ├── #about → <AboutSectitle /> + <About />
  ├── #skills → <Myskillssectitle /> + <SkillsSection />
  └── #projects → <ProjectsSection />
</main>
```

**Navigation:** All links are anchor (`href="#section-id"`) based — no client-side routing between pages.

### Background System

Two fixed gradient `div` layers sit behind everything inside `<main>`:

```tsx
// Layer 1: Vertical dark gradient
<div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />

// Layer 2: Diagonal warm tint (orange-950)
<div className="fixed inset-0 bg-gradient-to-br from-orange-950/30 via-black to-gray-900/50" />
```

Section transitions use `bg-gradient-to-t from-black` dividers to blend sections into each other.

---

## 5. Component Architecture

### 5.1 Loader (`app/(home)/components/loader.tsx`)

**Type:** Client Component (`"use client"`)
**Behavior:** Mounts as a fixed full-screen overlay. A `setTimeout` triggers state change after 3000ms, causing `return null` and unmounting the loader.

```
Mount → isVisible: true → 3000ms → isVisible: false → returns null (unmounts)
```

**Animations:**
- Background: radial gradient cycles indigo ↔ purple (8s loop, `repeat: Infinity`)
- Logo: `opacity: 0 → 1`, `scale: 0.8 → 1` on mount (0.5s, delayed 0.2s)
- Loading dots: Three dots bounce with `y: [0, -10, 0]` and opacity pulse, staggered by 0.2s each
- Fade out: Overlay div animates `opacity: 0 → 1` on dismiss (currently has a bug — the `isVisible` state is set to false before this animation fully fires, so the unmount is immediate)

---

### 5.2 Navbar (`app/(home)/components/navbar.tsx`)

**Type:** Client Component
**Position:** `fixed top-0 left-0 right-0 z-50`
**Layout:** Flex column on mobile, flex row on `sm:` (640px+)

**Three zones:**
1. **Logo** — "Dentrix" (green) + "Apps" (white), animates in from x=-20 on mount
2. **Navigation links** — anchor links to `#home`, `#about`, `#skills`, `#projects`; each has a `scaleX: 0 → 1` underline on hover
3. **Social links** — GitHub, WhatsApp, Gmail icons; `y: -2` lift on hover

**Data shape:**
```ts
interface SocialLink { name: string; url: string; icon: React.ReactNode }
interface Section    { name: string; href: string }
```

Both are defined as local arrays inside the component (no external data file).

---

### 5.3 HeroSection (`app/(home)/components/HeroSection.tsx`)

**Type:** Server Component (no `"use client"` directive)
**Layout:** `flex-col` on mobile, `flex-row-reverse` on `lg:` (1024px+)

**Left side (text):**
- `AnimatedTooltip` — profile image thumbnail with expandable tooltip card
- "Get in touch" button — WhatsApp `wa.me` link, styled as ghost pill button
- Heading: "Hello and nice to meet you!👋"
- Subheading: "I'm Denis." with green underline decoration
- Bio paragraph

**Right side (image):**
- `MovingBorderBtn` wrapper used as a decorative announcement chip above the image
- `next/image` with `fill` + `priority` for the profile picture
- `.glow` CSS class applied as an absolutely positioned radial shadow element

---

### 5.4 About Section

**Files:**
- `aboutsectitle.tsx` — Section heading markup (no interactivity)
- `about.tsx` — Content via Radix UI `<Accordion>` (Server Component)

**Accordion structure:** `type="single" collapsible` — only one item open at a time.

**6 items:**
| # | Question topic |
|---|---|
| 1 | Who am I and background |
| 2 | Software specializations |
| 3 | Programming languages |
| 4 | Client collaboration process |
| 5 | Project capacity limits |
| 6 | Other skills (financial, sales) |

The accordion is wrapped in `page.tsx` with a styled container:
```tsx
<div className="p-6 md:p-8 border border-indigo-500/20 rounded-xl backdrop-blur-sm bg-black/40">
```

---

### 5.5 Skills Section

**Files:**
- `Myskillssectitle.tsx` — Section heading
- `Myskills.tsx` — Data definition + grid layout
- `components/ui/skill-card.tsx` — Interactive card UI

**Data structure (`Myskills.tsx`):**
```ts
type Skill = {
  type: string;
  icon: ReactNode;
  description: string;
  mainProficiency: number;           // Used for overview display
  technologies: {
    name: string;
    icon: ReactNode;
    description: string;
    proficiency: number;             // 0–100, drives animated progress bar
  }[];
}
```

**Two skill categories defined:**
1. **Full-Stack & AI Development** — 90% main, 6 technologies (Next.js, React, TypeScript, Python, Node.js, Flutter)
2. **Algorithmic Trading & Automation** — 88% main, 3 technologies (C++, Python, System Architecture)

**Grid layout:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `max-w-sm` per card.

**SkillCard interaction flow:**
```
Closed card → click "View More" → card slides left (x: 0 → -100%)
                                → detail panel slides in from right (x: 100% → 0)
                                → shows slide 0/N (Overview)
                                → ◀ ▶ navigate slides
                                → ArrowLeft or X closes → reverses animation
```

Each technology slide shows: icon + name, description, animated proficiency bar (`width: 0% → N%`, 1s ease-out).

---

### 5.6 Projects Section (`app/(home)/components/ProjectsSection.tsx`)

**Type:** Client Component (uses `useState` for mobile click overlay)

**Two projects:**
| Project | URL | Border color |
|---|---|---|
| Tuandike | tuandike.online | Green (`border-green-500`) |
| Maganji Engine | maganji.site | Blue (`border-blue-500`) |

**Interaction:**
- Desktop (`md:`): Hover triggers CSS `group-hover:opacity-100` on overlay
- Mobile: `onClick` toggles `isClicked` state — same overlay shown

**Bug:** Both project cards share a single `isClicked` state. Clicking one card opens both overlays simultaneously.

**Background:** Animated radial gradient (indigo ↔ purple, 8s loop) — same pattern as Loader.

---

## 6. UI Component Library

All UI components live in `components/ui/`. They are local copies (not imported from npm), following the shadcn/ui copy-into-project model.

### 6.1 `animated-tooltip.tsx`

Renders a list of profile items. Each item shows:
- A 60×60px circular avatar with a pulsing green status badge
- On click: a spring-animated tooltip card appears (250px wide, absolute positioned)
- Tooltip contains: full-size image (180px height), name in green, designation in white, two decorative gradient lines at the bottom

**Close behavior:** `document` click listener detects clicks outside `.tooltip-area` elements.

**Type:**
```ts
items: { id: number; name: string; designation: string; image: string }[]
```

---

### 6.2 `moving-border.tsx`

Two exported components:

**`MovingBorderBtn`** — A container that wraps content with an animated border effect:
- Outer container: `h-16 w-70` (fixed size), `overflow-hidden`
- Inner border layer: uses `<MovingBorder>` for the glow ring
- Content layer: `border border-indigo-500/20`, `bg-black/40`, `backdrop-blur-xl`

**`MovingBorder`** — The animated border itself:
- `background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)`
- `backgroundPosition` animates `0% 50% → 100% 50% → 0% 50%` (3s linear loop)
- Inner black mask creates the border-only visual effect

---

### 6.3 `skill-card.tsx`

See [5.5 Skills Section](#55-skills-section) for full behavior description.

**State:**
```ts
const [isOpen, setIsOpen] = useState(false);
const [currentSlide, setCurrentSlide] = useState(0); // 0 = overview, 1..N = technologies
```

**Animation:** `motion` spring (`stiffness: 300, damping: 30`) for slide-in/out. `AnimatePresence` handles mounting/unmounting of the detail panel and slide content transitions (`opacity + y: 20` fade).

---

### 6.4 `accordion.tsx`

Thin styled wrapper around `@radix-ui/react-accordion`. Exports:
- `Accordion` — root (passes through Radix props)
- `AccordionItem` — adds `border-b border-border`
- `AccordionTrigger` — adds flex layout, hover underline, chevron icon (rotates 180° when open via `[data-state=open]`)
- `AccordionContent` — adds `overflow-hidden` + height animation via Tailwind `animate-accordion-*` classes from `tw-animate-css`

---

## 7. Styling System

### 7.1 Tailwind CSS 4

Tailwind v4 is configured via PostCSS (`@tailwindcss/postcss`). The main entry is `app/globals.css` which uses:

```css
@import "tailwindcss";       /* Tailwind v4 import syntax */
@import "tw-animate-css";    /* Extra animation utilities */
```

### 7.2 CSS Custom Properties (Design Tokens)

Defined in `globals.css` using OKLCH color space. Two themes: `:root` (light) and `.dark`:

| Token | Light | Dark |
|---|---|---|
| `--background` | `oklch(1 0 0)` (white) | `oklch(0.141 0.005 285.823)` (near-black) |
| `--foreground` | Near-black | White |
| `--primary` | Dark charcoal | Light gray |
| `--muted` | Light gray | Dark gray |
| `--border` | `oklch(0.92 ...)` | `oklch(1 0 0 / 10%)` |
| `--radius` | `0.625rem` | same |

Sidebar and chart tokens are also defined (shadcn/ui convention) but unused.

### 7.3 `@theme inline` Block

Maps CSS custom properties to Tailwind's theme system:
```css
@theme inline {
  --color-background: var(--background);
  --font-sans: var(--font-geist-sans);
  /* ... */
}
```
This allows using `bg-background`, `text-foreground`, etc. as Tailwind classes.

### 7.4 Custom CSS Classes

```css
.glow {
  /* Creates an orange radial box-shadow spread: 200px × 130px at 20% opacity */
  box-shadow: 0 0 200px 130px rgba(255, 165, 0, 0.2);
  filter: blur(10px);
}

.grid-background {
  /* 20px × 20px grid lines */
  background-size: 20px 20px;
  background-image: linear-gradient(to right, ...), linear-gradient(to bottom, ...);
  /* Dark variant: .dark .grid-background uses #262626 lines */
}
```

### 7.5 `@layer base`

```css
@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
```

### 7.6 `tailwind.config.js`

Extends the default theme with:
- `transformStyle: { 'preserve-3d': ... }` — for 3D card flips (currently unused)
- `rotate: { 'y-180': ... }` — for Y-axis rotation (currently unused)
- `perspective: { 1000: '1000px' }` — for 3D depth (currently unused)
- `fontSize: { tiny: '2px', huge: '10px' }` — custom sizes (currently unused)

**Note:** The config has a bug — `plugins: [plugins]` references an undefined variable `plugins`. This doesn't break the build because Tailwind v4 primarily uses the PostCSS plugin, not `tailwind.config.js`.

---

## 8. Animation System

All animations use the **`motion`** package (`motion/react`), which is Framer Motion rebranded as a standalone package in v11+. The API is identical to `framer-motion`.

### 8.1 Core Patterns Used

| Pattern | Where Used | Implementation |
|---|---|---|
| Mount fade-in | Loader logo, Navbar logo | `initial={{ opacity: 0 }}` + `animate={{ opacity: 1 }}` |
| Slide from X | Navbar logo, SkillCard panels | `initial={{ x: -20 }}` or `x: '100%'` |
| Scale on hover | Nav links, project buttons | `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.95 }}` |
| Y-axis lift | Social icons | `whileHover={{ y: -2 }}` |
| Underline expand | Nav links | `scaleX: 0 → 1` on `whileHover`, `transformOrigin: left` |
| Spring slide | SkillCard open/close | `type: "spring", stiffness: 300, damping: 30` |
| Fade between slides | SkillCard slides | `AnimatePresence mode="wait"` + `opacity + y` |
| Width progress bar | Skill proficiency bars | `width: 0% → N%`, 1s ease-out |
| Bounce loop | Loader dots | `y: [0, -10, 0]`, `repeat: Infinity`, staggered |
| Background gradient loop | Loader, ProjectsSection | `background` keyframe array, 8s, `repeat: Infinity` |
| Spring tooltip | AnimatedTooltip | `type: "spring", stiffness: 260, damping: 10` |
| `AnimatePresence` | Tooltip, SkillCard | For enter/exit animations on conditional renders |

### 8.2 Page Load Sequence

```
t=0ms    → Loader mounts (full-screen overlay, z-50)
t=200ms  → Loader logo fades in (scale 0.8→1)
t=0ms    → Page content renders behind loader (z-10)
t=3000ms → Loader state: isVisible = false → returns null → unmounts
           Page becomes visible immediately (no fade transition on page reveal)
```

**Gap:** There is no coordinated fade-in of the page content when the loader dismisses. The loader just disappears.

---

## 9. Theme System

**Package:** `next-themes@0.4.6`

**Configuration (`app/layout.tsx`):**
```tsx
<ThemeProvider
  attribute="class"        // Adds "dark" class to <html>
  defaultTheme="system"    // Follows OS preference
  enableSystem             // Reads prefers-color-scheme
  disableTransitionOnChange // No flash on theme switch
>
```

**`suppressHydrationWarning`** is set on `<html>` to prevent React hydration mismatch from server-rendered theme class.

**Current usage:** The site is effectively dark-only in practice. While light mode CSS variables are defined, no theme toggle button exists in the UI. The theme always resolves to dark unless the user's OS is in light mode.

---

## 10. Font System

**Loaded in:** `app/layout.tsx` via `next/font/google`

| Font | Variable | Usage |
|---|---|---|
| Work Sans | `--font-work-sans` | Default body font (`font-family: var(--font-work-sans)` in `globals.css`) |
| Geist Mono | `--font-geist-mono` | Code/pre elements |

Both fonts use `subsets: ["latin"]`. Work Sans uses `display: 'swap'`.

Font variables are applied to `<body>` via className:
```tsx
<body className={`${workSans.variable} ${geistMono.variable} antialiased`}>
```

**Note:** `globals.css` references `--font-geist-sans` in the `@theme inline` block, but the layout only loads `Geist_Mono` (not `Geist_Sans`). This token is unused/unresolved.

---

## 11. Asset Management

All assets use `next/image` with the `fill` prop and a sized parent container.

| Asset | Path | Usage | Notes |
|---|---|---|---|
| Profile picture | `/images/home/profilepic.png` | HeroSection + AnimatedTooltip | `priority` set |
| Tuandike screenshot | `/images/projects/tuandike-screenshot.png` | ProjectsSection | `priority` set |
| Maganji screenshot | `/images/projects/maganji-screenshot.png` | ProjectsSection | `priority` set |

`object-cover` is used for the profile picture; `object-contain bg-black` for project screenshots (letterboxed).

---

## 12. Data Flow & State

The app has minimal state. All state is local to individual components:

| Component | State | Purpose |
|---|---|---|
| `Loader` | `isVisible: boolean` | Controls loader visibility after 3s |
| `ProjectsSection` | `isClicked: boolean` | Toggles project overlay on mobile |
| `AnimatedTooltip` | `hoveredIndex: number \| null` | Controls which tooltip is visible |
| `SkillCard` | `isOpen: boolean` | Whether detail panel is shown |
| `SkillCard` | `currentSlide: number` | Which technology slide is active |

No global state management. No Context. No server actions. No API calls. The site is fully static.

**Data definitions** (skills data, nav links, social links) are all hardcoded as arrays within their respective components — no external data files or CMS.

---

## 13. Known Issues & Technical Debt

| # | Issue | Location | Impact |
|---|---|---|---|
| 1 | Shared `isClicked` state for both project cards | `ProjectsSection.tsx:8` | Clicking either project card opens overlays on both |
| 2 | Loader has no coordinated page reveal | `loader.tsx` + `page.tsx` | Page abruptly appears when loader unmounts; no fade |
| 3 | `plugins: [plugins]` — undefined variable | `tailwind.config.js:27` | Silent error; doesn't break build under Tailwind v4 |
| 4 | `--font-geist-sans` referenced but never loaded | `globals.css:9` + `layout.tsx` | Font fallback used silently |
| 5 | No dark/light toggle in UI | — | Theme only responds to OS; cannot be user-controlled |
| 6 | `mainProficiency` field defined in data but never rendered | `Myskills.tsx` type + `skill-card.tsx` | Dead data field |
| 7 | Metadata description is placeholder | `layout.tsx:21` | "Generated by create next app" in production |
| 8 | No `sitemap.xml`, `robots.txt`, or OG image | `public/` | Poor SEO baseline |
| 9 | All section content is first-person personal | All sections | Must be reframed as company-level content |
| 10 | `HeroSection` is a Server Component but imports Client Components | `HeroSection.tsx` | Works, but `AnimatedTooltip` and `MovingBorderBtn` are Client; HeroSection gets bundled accordingly |
