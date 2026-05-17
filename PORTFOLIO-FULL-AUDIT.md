# PORTFOLIO FULL AUDIT REPORT
## dentrixapps.com
## Audited: 2026-07-14 (updated post-cleanup)
## Analyst: Full Codebase Static Analysis

---

## EXECUTIVE SUMMARY

**Project:** Dentrix Apps — real estate AI chatbot service website  
**Framework:** Next.js 16.1.6 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4  
**Package Manager:** pnpm 10.18.1  
**Build Status:** Zero errors, zero build warnings. Clean production build confirmed.  
**Brand:** AI chatbots for real estate agents. "Proof-before-pay" model — chatbot is built live on the client's site before payment is taken.  
**Deployment target:** Vercel (static-compatible; 9 routes prerendered as static content)

**Current state:** The dead-code purge is complete. Every file in the repository is either actively imported or is a utility/config. The codebase is lean, well-typed, and builds cleanly. Remaining work is product/content work, not engineering cleanup.

---

## QUICK STATS

| Metric | Value |
|---|---|
| Routes | 5 real pages (/, /contact, /privacy-policy, /terms-of-service) + /robots.txt + /sitemap.xml + /icon.svg (static) |
| `/do-not-sell` | linked from PrivacyBanner — **route still does not exist → 404** |
| App files | 11 (layout, globals.css, icon.svg, robots.ts, sitemap.ts, page.tsx, 4 route pages, ContactPageView.tsx) |
| Active components | 8 in `app/(home)/components/`, 2 in `components/ui/`, 1 `components/theme-provider.tsx` |
| Lib files | 7 (all active) |
| Server actions | 2 (chat-agent.ts, contact.ts) |
| Script files | 2 (create-og-image.js, optimize-images.ts) |
| Public images | 8 files (home/ × 6 png+webp pairs, og-image × png+webp) + icon.png + icon.webp |
| Type dirs | `types/` deleted — no custom `.d.ts` files remain |
| Dead code | **0 files** |
| TypeScript errors | 0 |
| Build errors | 0 |
| Lint errors | 2 (encoding artifact in `.eslintrc.json`) |
| Lint warnings | 33 (all Tailwind v4 class-shorthand suggestions, 7 CSS at-rule unknowns — cosmetic only) |

---

## 1. CURRENT FILE TREE (COMPLETE)

```
myportfoliowebsite/
│
├── app/
│   ├── (home)/
│   │   ├── components/
│   │   │   ├── ChatAgentPanel.tsx        chat panel + openChatAgent() dispatcher
│   │   │   ├── ContactSection.tsx        full contact form with file upload
│   │   │   ├── CursorGradient.tsx        pointer-tracked radial gradient overlay
│   │   │   ├── HeroSection.tsx           headline + dual CTA buttons
│   │   │   ├── PrivacyBanner.tsx         CCPA/GPC bottom banner
│   │   │   ├── ProjectFileUpload.tsx     drag-and-drop file attachment widget
│   │   │   ├── SiteFooter.tsx            logo + nav links + copyright
│   │   │   └── navbar.tsx                fixed/minimal navbar with scroll transforms
│   │   └── page.tsx                      homepage (/, "use client")
│   ├── actions/
│   │   ├── chat-agent.ts                 "use server" — OpenAI → KB fallback chain
│   │   └── contact.ts                    "use server" — Zod + Resend + rate limiter
│   ├── contact/
│   │   ├── ContactPageView.tsx           client wrapper for /contact
│   │   └── page.tsx                      server component — metadata + render
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── terms-of-service/
│   │   └── page.tsx
│   ├── globals.css                       OKLCH tokens, Tailwind v4 directives, keyframes
│   ├── icon.svg                          vector favicon
│   ├── layout.tsx                        root layout — fonts, metadata, providers
│   ├── robots.ts                         dynamic robots.txt
│   └── sitemap.ts                        dynamic sitemap.xml
│
├── components/
│   ├── ui/
│   │   ├── StructuredData.tsx            JSON-LD schema graph (Org + Website + Software)
│   │   └── smooth-scroll.tsx             ReactLenis root wrapper
│   └── theme-provider.tsx                next-themes ThemeProvider re-export
│
├── lib/
│   ├── chat-responder.ts                 keyword-scoring KB lookup
│   ├── claim-validator.ts                token-overlap confidence scorer
│   ├── contact-upload.ts                 upload limits, MIME/ext allowlists, helpers
│   ├── content-data.ts                   heroContent + contactContent (single source of truth)
│   ├── dentrix-knowledge.ts              KB topics, system prompt, greeting, fallback
│   ├── seo.ts                            SITE_URL, DEFAULT_TITLE, ogImage, absoluteUrl
│   └── utils.ts                          cn() — clsx + tailwind-merge
│
├── public/
│   ├── images/
│   │   ├── home/
│   │   │   ├── dentrixappslg.png + .webp      navbar + loader logo
│   │   │   ├── dentrixappslogoicon.png + .webp footer icon
│   │   │   └── profilepic.png + .webp         founder photo (not yet used on any page)
│   │   ├── og-image.png                       OG fallback
│   │   └── og-image.webp                      OG primary
│   ├── icon.png                               PWA icon
│   ├── icon.webp                              favicon (referenced in metadata)
│   └── manifest.json                          PWA manifest — brand-correct
│
├── scripts/
│   ├── create-og-image.js                sharp SVG→WebP OG image generator
│   └── optimize-images.ts                sharp batch image→WebP optimizer (5 entries)
│
├── .eslintrc.json                         legacy flat config — encoding artifact (2 errors)
├── eslint.config.mjs                      modern flat config — active
├── eslint.config.mjs.bak                  backup of above — should be deleted
├── next.config.ts                         AVIF/WebP, 48MB server action limit, /products redirect
├── package.json
├── package-lock.json                      npm lockfile — conflicts with pnpm-lock.yaml
├── pnpm-lock.yaml                         canonical lockfile
├── postcss.config.mjs
├── tsconfig.json
└── components.json                        shadcn/ui config (New York, zinc, cssVariables)
```

---

## 2. FRAMEWORK & TOOLING

| Item | State |
|---|---|
| Next.js | 16.1.6, App Router, Turbopack dev, no `output: export` |
| React | 19.0.0 |
| TypeScript | ^5, strict, `noEmit: true`, `bundler` moduleResolution, `@/*` → root |
| Tailwind CSS | v4 via `@tailwindcss/postcss` — no `tailwind.config.js`, all tokens in `globals.css` `@theme` block |
| Animation | `motion` v12.6.3 (Framer Motion, renamed package) |
| Smooth scroll | `lenis` v1.3.21 via `ReactLenis` root — lerp: 0.035, duration: 2.2s, exponential easing |
| Icons | `lucide-react` v0.487.0 + `react-icons` v5.5.0 (both installed; react-icons has no active imports) |
| Email | `resend` v6.12.2 — dynamic import inside server action |
| Validation | `zod` v4.3.6 — contact form schema |
| Image processing | `sharp` v0.34.5 (devDep) — scripts only |
| Theme | `next-themes` v0.4.6 — dark-only, `enableSystem: false` |
| ESLint | **Dual config conflict**: `.eslintrc.json` (legacy, 2 parse errors from encoding artifact) + `eslint.config.mjs` (modern flat, active). The `.bak` file is an additional orphan. |
| Lock files | **Dual lockfile conflict**: `package-lock.json` + `pnpm-lock.yaml`. pnpm is canonical per `packageManager` field. `package-lock.json` should be deleted. |

---

## 3. ACTIVE COMPONENT INVENTORY

### `app/(home)/components/`

| File | Lines | Role | Key deps |
|---|---|---|---|
| `ChatAgentPanel.tsx` | 233 | Slide-up AI chat panel, `AnimatePresence` overlay, source accordion, `openChatAgent()` event dispatcher | `motion/react`, `sendChatMessage`, `CHAT_GREETING` |
| `ContactSection.tsx` | 237 | Full contact form — `useActionState`, file upload, Calendly + email CTAs, inline chat trigger | `motion/react`, `submitContactForm`, `ProjectFileUpload`, `contactContent` |
| `CursorGradient.tsx` | 70 | RAF-driven CSS custom-property cursor tracker, `prefers-reduced-motion` static fallback | none |
| `HeroSection.tsx` | 54 | Headline + subheadline + two CTA buttons | `heroContent`, `openChatAgent` |
| `PrivacyBanner.tsx` | 61 | CCPA/GPC localStorage-dismissed bottom banner. Links `/privacy-policy` and `/do-not-sell` | none |
| `ProjectFileUpload.tsx` | 207 | Drag-and-drop file input, MIME/ext validation, image previews, per-file + total size enforcement | `motion/react`, `contact-upload` |
| `SiteFooter.tsx` | 36 | Logo image, nav links, copyright year | `next/image`, `next/link` |
| `navbar.tsx` | 116 | Fixed nav with scroll-driven width/opacity transforms, minimal mode, back-button mode, mobile overlay | `motion/react`, `next/image` |

### `components/ui/`

| File | Role |
|---|---|
| `StructuredData.tsx` | Inline `<script type="application/ld+json">` — Organization + ProfessionalService + WebSite + SoftwareApplication graph |
| `smooth-scroll.tsx` | `ReactLenis` root provider wrapper |

### `components/`

| File | Role |
|---|---|
| `theme-provider.tsx` | Thin re-export of `next-themes` `ThemeProvider` |

---

## 4. SERVER ACTIONS

### `app/actions/contact.ts`

**What it does:** Validates form data with Zod, parses file attachments, rate-limits by email (3/hr, in-memory), checks honeypot, sends styled HTML email via Resend with attachments. Falls back to `console.log` in dev when `RESEND_API_KEY` is absent.

**Security hardening in place:**
- Zod schema — field-level validation, errors returned to client
- `escapeHtml()` on all user strings before HTML injection
- `sanitizeFilename()` — strips `../`, path separators, non-word chars, truncates at 120 chars
- Honeypot field (`name="website"`, off-screen, `-left-[9999px]`)
- MIME + extension dual validation on attachments
- Per-file 8MB cap + 40MB total cap
- 3 submissions per email per rolling hour (in-memory `Map`)

**Remaining issues:**
- `DEFAULT_CONTACT_EMAIL` and `FALLBACK_CONTACT_EMAIL` are the same value — `FALLBACK_CONTACT_EMAIL` is a redundant constant
- Rate limiter resets on every serverless cold start — provides soft protection only
- `next.config.ts` `bodySizeLimit: "48mb"` leaves an 8MB gap above the 40MB attachment limit — not a bug but worth noting

### `app/actions/chat-agent.ts`

**What it does:** Two-tier fallback. If `OPENAI_API_KEY` is set and starts with `sk-`, calls `gpt-4o-mini` with the KB as context (last 6 history messages included). Otherwise falls back to local keyword-scoring KB lookup. Both paths run `validateClaims()` to assign confidence and extract source snippets.

**Post-cleanup state:** `queryGroq` import removed. The Groq-first fallback branch (broken endpoint) is gone. The OpenAI key check is now `startsWith("sk-")` instead of `length > 10`. Contact email unified to `ceo@dentrixapps.com`.

**Remaining issues:**
- `formatAssistantResponse()` calls `shortSentence()` which truncates the answer to the first sentence (max 260 chars). Long, detailed OpenAI answers get silently cut.
- KB fallback does not receive `_history` — always responds without conversation context.
- `meta?: any` on `ChatMessage` type is loose — should be typed narrowly.

---

## 5. LIB LAYER

| File | Purpose | Notes |
|---|---|---|
| `chat-responder.ts` | Keyword-scoring KB lookup. Greeting pattern detected separately (< 40 chars). Returns best-match `topic.answer` or `CHAT_FALLBACK`. | Solid. No issues. |
| `claim-validator.ts` | Tokenizes response + source docs, computes overlap ratio, returns `high/medium/low` confidence + top-3 supporting sources with snippet extraction. | Stopword list is minimal. Token overlap on short KB answers will frequently score `low` even for correct responses — surfaced to users as "low confidence". |
| `contact-upload.ts` | Shared upload constants (`maxFiles: 8`, `maxFileBytes: 8MB`, `maxTotalBytes: 40MB`), MIME/ext sets, `formatFileSize`, `isImageMime`, `fileKey`. Used by both server action and client component. | Clean, no issues. |
| `content-data.ts` | `heroContent` + `contactContent` — all site copy. `heroContent.eyebrow: "Dentrix Apps"` is defined but never rendered in `HeroSection.tsx`. | Minor dead field. |
| `dentrix-knowledge.ts` | `DENTRIX_SYSTEM_CONTEXT`, `knowledgeTopics` array (11 topics), `CHAT_GREETING`, `CHAT_FALLBACK`. All KB answers reference `hello@dentrixapps.com` in `CHAT_FALLBACK`. Server action now overrides this at format time with `ceo@`. The KB topic copy itself still says `hello@dentrixapps.com` in the `contact` topic answer. | **Email still inconsistent inside KB topic text.** |
| `seo.ts` | `SITE_URL`, `SITE_NAME`, `DEFAULT_TITLE`, `DEFAULT_DESCRIPTION`, `KEYWORDS`, `ogImage`, `absoluteUrl()`. Single source for all metadata. | Clean. |
| `utils.ts` | `cn()` — `clsx` + `twMerge`. | Clean. |

---

## 6. CONTENT & COPY

### Active pages

**`/` (homepage)**
- Headline: *"Turn your real estate website into a 24/7 lead-capturing machine."*
- Subheadline: *"We build AI chatbots for agents — and prove it by showing your chatbot already live on your site before you pay."*
- CTA 1: "Talk to us" → `/contact`
- CTA 2: "Talk to AI Agent" → opens `ChatAgentPanel`
- Page content: navbar + hero + footer only. No sections below the fold.

**`/contact`**
- Form: Name*, Email*, Agency/Company, Service Type (4 options), Budget Range (5 options), Project Details*, File upload (8 files / 40MB)
- Service options: AI website chatbot · Proof-before-pay preview · Lead capture & CRM integration · Something else
- Budget options: Just exploring · Under $500/mo · $500–$1,500/mo · $1,500+/mo · Prefer to discuss
- Side panel: AI chat CTA · Calendly link · ceo@dentrixapps.com direct email
- Trust signals: 3 copy lines

**`/privacy-policy`** — CCPA/CPRA compliant. Monospace terminal aesthetic.  
**`/terms-of-service`** — Standard terms. Same aesthetic.

### Email inconsistency — STILL OPEN

| Location | Email |
|---|---|
| `lib/dentrix-knowledge.ts` — `contact` topic answer | `hello@dentrixapps.com` |
| `lib/dentrix-knowledge.ts` — `CHAT_FALLBACK` | `hello@dentrixapps.com` |
| `app/actions/chat-agent.ts` — `formatAssistantResponse` low-confidence message | `ceo@dentrixapps.com` ✅ fixed |
| `app/actions/contact.ts` — `DEFAULT_CONTACT_EMAIL` | `ceo@dentrixapps.com` ✅ |
| `components/ui/StructuredData.tsx` — `contactPoint.email` | `hello@dentrixapps.com` |
| `lib/seo.ts` | no email |

`hello@dentrixapps.com` still appears in two places inside `dentrix-knowledge.ts` (the `contact` topic and `CHAT_FALLBACK`). These are the strings users see in chat responses.

### Copy gaps

- **No social proof** — zero client quotes, results metrics, or case studies anywhere on the site
- **No pricing** — budget ranges on the form are the only signal; users have no anchor before reaching out
- **Homepage is single-section** — hero + CTAs is the entire page; no "how it works", no FAQ, no proof of concept section
- **`profilepic.png/webp` exists in `public/images/home/`** but is referenced nowhere — founder photo is available but not surfaced
- **`heroContent.eyebrow`** (`"Dentrix Apps"`) defined in `content-data.ts`, destructured in `HeroSection.tsx`, never rendered

---

## 7. SEO & METADATA

| Item | Status | Detail |
|---|---|---|
| `<title>` | ✅ | "Dentrix Apps \| AI Chatbots for Real Estate Agents" |
| `description` | ✅ | 163 chars, includes proof-before-pay differentiator |
| `keywords` | ✅ | 10 entries in `lib/seo.ts` |
| `canonical` | ✅ | `https://dentrixapps.com` |
| `robots` meta | ✅ | index/follow, max-image-preview: large |
| Open Graph | ✅ | 1200×630 webp, correct title/description/url |
| Twitter Card | ✅ | summary_large_image, @dentrixapps / @deniskiooko |
| JSON-LD | ✅ | Organization + ProfessionalService + WebSite + SoftwareApplication |
| Sitemap | ✅ | Dynamic — `/` (priority 1.0) + `/contact` (priority 0.9) |
| robots.txt | ✅ | Dynamic via `app/robots.ts` — static `public/robots.txt` deleted |
| Favicon | ✅ | `/icon.webp` + `icon.svg` |
| PWA manifest | ✅ | Brand-correct — "Dentrix Apps — Real Estate AI Chatbots" |
| OG preload | ✅ | `<link rel="preload" as="image">` in `<head>` |
| DNS prefetch | ✅ | `fonts.googleapis.com` + `fonts.gstatic.com` |

**Structured data issues remaining:**
- `contactPoint.email`: `hello@dentrixapps.com` — conflicts with operational email `ceo@`
- `address`: `addressLocality: "Nairobi", addressCountry: "KE"` — Kenya address in structured data for a US-market pitch. Not wrong, but visible to Google and US-based prospects who may search it.
- `telephone`: `"+254-111480091"` — Kenya number exposed in JSON-LD
- `sameAs`: includes `https://github.com/Denis-Arzu` — verify this GitHub handle is still active/correct

**OG title mismatch (minor):**
- `layout.tsx` `openGraph.title`: `"Dentrix Apps | AI Chatbots for Real Estate"` (no "Agents")
- `DEFAULT_TITLE`: `"Dentrix Apps | AI Chatbots for Real Estate Agents"` (with "Agents")

---

## 8. PERFORMANCE

### Images
- All images have `.webp` variants. `next/image` used throughout — `navbar.tsx`, `SiteFooter.tsx`.
- `next.config.ts`: AVIF + WebP formats, full device size breakpoints (`640 750 828 1080 1200 1920 2048 3840`), `minimumCacheTTL: 60`.
- `dangerouslyAllowSVG: true` — needed for `icon.svg`.
- `remotePatterns` allows `images.unsplash.com` — no Unsplash images are used. Vestigial config.

### Code splitting
- `ChatAgentPanel` is `dynamic(..., { ssr: false })` — correct, it's interaction-only.
- All other components are statically imported. No other lazy loading.
- `dentrix-knowledge.ts` is dynamically imported inside `chat-agent.ts` server action (`await import(...)`) — correct tree-shaking pattern for server bundles.

### Fonts
- Geist + Geist Mono via `next/font/google`, `display: 'swap'`.
- DNS prefetch + preconnect in `<head>`.

### CSS
- Tailwind v4 purges unused styles at build time.
- `globals.css` body `::after` and `.terminal-scanlines` both embed the same SVG `fractalNoise` data-URI — duplicate noise texture definition (cosmetic, no runtime cost).
- `@media (prefers-reduced-motion: reduce)` — set twice in `globals.css` (once at line ~218 with `animation: none !important`, once at the bottom with `animation-duration: 0.01ms !important`). Both fire; the second overrides the first. Redundant but harmless.

### Lenis scroll
- `lerp: 0.035`, `duration: 2.2s` — intentional slow-scroll premium aesthetic.
- `smoothWheel: true` — may cause issues for vestibular-sensitive users beyond CSS motion guard.

### `"use client"` on homepage
- `app/(home)/page.tsx` is marked `"use client"` because `CursorGradient` requires a client context. All children (`Navbar`, `HeroSection`, `SiteFooter`) are therefore client-rendered. `ChatAgentPanel` is already `ssr: false` via `dynamic`. The static content (`HeroSection`, `SiteFooter`) could benefit from server rendering if `CursorGradient` were extracted into its own client island.

---

## 9. ACCESSIBILITY

| Item | Status |
|---|---|
| `*:focus-visible` custom outline | ✅ `2px solid oklch(0.85 0.3 150)` |
| Contact form — `aria-describedby`, `aria-invalid`, `role="alert"` on errors | ✅ |
| `ChatAgentPanel` — `role="dialog"`, `aria-label` | ✅ |
| `PrivacyBanner` — `role="region"`, `aria-label` | ✅ |
| `CursorGradient` — `aria-hidden` | ✅ |
| `ProjectFileUpload` — `role="button"`, keyboard `Enter`/`Space`, `aria-label` | ✅ |
| `prefers-reduced-motion` in `globals.css` | ✅ |
| `prefers-reduced-motion` in `CursorGradient.tsx` | ✅ static fallback |
| `ChatAgentPanel` spring animations | ⚠️ not guarded by `prefers-reduced-motion` |
| `navbar.tsx` scroll transforms | ⚠️ not guarded by `prefers-reduced-motion` |
| Honeypot field — visually hidden via `absolute -left-[9999px]` | ✅ |

---

## 10. ENVIRONMENT VARIABLES

| Variable | File | Required | Default / Behaviour |
|---|---|---|---|
| `RESEND_API_KEY` | `contact.ts` | Production | `console.log` fallback in dev |
| `CONTACT_EMAIL` | `contact.ts` | Optional | `ceo@dentrixapps.com` |
| `RESEND_FROM_EMAIL` | `contact.ts` | Optional | `Dentrix Apps <noreply@dentrixapps.com>` |
| `OPENAI_API_KEY` | `chat-agent.ts` | Optional | Falls back to local KB |
| `OPENAI_CHAT_MODEL` | `chat-agent.ts` | Optional | `gpt-4o-mini` |

**No `.env.example` file exists.** All five vars must be discovered by reading source code.

---

## 11. REMAINING ISSUES

### Bugs (open)

| # | Severity | Location | Description |
|---|---|---|---|
| B-1 | HIGH | `PrivacyBanner.tsx` | Links to `/do-not-sell` — route does not exist → 404 for every user |
| B-2 | HIGH | `dentrix-knowledge.ts` | `contact` topic + `CHAT_FALLBACK` still reference `hello@dentrixapps.com` — chat agent tells users wrong email |
| B-3 | MEDIUM | `ChatAgentPanel.tsx` | Message timestamp is `new Date().toLocaleTimeString()` at render time, not message receipt time |
| B-4 | MEDIUM | `ContactSection.tsx` | `window.dispatchEvent(new CustomEvent("open-chat-agent"))` inline instead of `openChatAgent()` utility |
| B-5 | MEDIUM | `.eslintrc.json` | Encoding artifact → 2 parse errors; dual config with `eslint.config.mjs` is ambiguous |
| B-6 | MEDIUM | `app/(home)/page.tsx` | `"use client"` forces client render of all static content (Navbar, HeroSection, SiteFooter) |
| B-7 | LOW | `chat-agent.ts` | `shortSentence()` silently truncates OpenAI responses to first sentence ≤ 260 chars |
| B-8 | LOW | `content-data.ts` | `heroContent.eyebrow` defined, destructured in HeroSection, never rendered |
| B-9 | LOW | `next.config.ts` | `remotePatterns` allows `images.unsplash.com` — no Unsplash images in use |
| B-10 | LOW | No `.env.example` | No documented env var list |

### Config / infra

| Item | Detail |
|---|---|
| `package-lock.json` | Conflicts with `pnpm-lock.yaml`. Project uses pnpm (declared in `packageManager`). npm lockfile should be deleted. |
| `eslint.config.mjs.bak` | Backup file committed to repo — should be deleted |
| `.eslintrc.json` | Encoding artifact causes 2 parse errors. Should be deleted in favour of `eslint.config.mjs` only. |
| `next.config.ts` `/products` redirect | `source: "/products"` → `destination: "/"` permanent redirect. No `/products` route exists or ever will. Harmless but stale. |

### Content gaps (not bugs, but conversion risk)

| Item | Impact |
|---|---|
| No `/do-not-sell` page | HIGH — every user who reads the PrivacyBanner hits a 404 |
| Homepage is one section | HIGH — no proof, no process, no FAQ below the fold; high bounce risk |
| No social proof | MEDIUM — zero client results or testimonials anywhere |
| No pricing page | MEDIUM — no anchor before contact; filters no one |
| `profilepic.png/webp` unused | LOW — founder photo exists in `public/images/home/` but is not rendered on any page |

---

## 12. STALE DOCUMENTATION

| Document | Status |
|---|---|
| `ARCHITECTURE.md` | **Severely stale.** Title: "AI Voice Studio Architecture Documentation." Describes voiceovers, voice cloning, dubbing. Has "Dennis Kioko" (double-n) vs `layout.tsx` "Denis Kioko" (single-n). The tech stack section is broadly accurate but framed around the wrong product. |
| `TODO.md` | **Fully obsolete.** References `Myskills.tsx`, `EngineeringStandards.tsx`, `CaseStudies.tsx`, `ActiveBuilds.tsx`, `GlobalImpact` — none of these files exist. Every item is for the old software lab site. |
| `README.md` | **Boilerplate only.** Unmodified `create-next-app` README. No Dentrix Apps info, no env var docs, no setup instructions. |

---

## 13. WHAT WAS CLEANED (SUMMARY OF PRIOR SESSION)

The following were removed in the cleanup pass:

**Server actions (1 deleted, 1 modified):**
- `app/actions/voice-agent.ts` — deleted (ElevenLabs voice-studio era, zero imports)
- `app/actions/chat-agent.ts` — `queryGroq` import removed, both Groq call branches removed, key check fixed (`length > 10` → `startsWith("sk-")`), contact email unified to `ceo@`

**Library (1):** `lib/groq-client.ts` — deleted (non-existent Groq search endpoint, always returned `[]`)

**Components — `app/(home)/components/` (6):** `loader.tsx`, `Logo.tsx`, `AnimateOnScroll.tsx`, `AnimatedCounter.tsx`, `MagneticButton.tsx`, `SkeletonLoader.tsx`

**Components — `components/ui/` (7):** `accordion.tsx`, `magnetic.tsx`, `service-icon.tsx`, `splash-cursor.tsx`, `spotlight.tsx`, `text-swap.tsx`, `voice-aurora.tsx`

**Type declarations (entire `types/` dir — 2 files):** `lucide-react.d.ts` (shadowed package types), `modules.d.ts` (declared types for packages that ship their own)

**Scripts (1):** `scripts/optimize-audio.ts` — audio files deleted, script was orphaned

**Public assets:**
- `public/audio/` — 5 MP3s (voice-studio era demos, zero references)
- `public/images/projects/` — 4 files (`maganji-screenshot`, `tuandike-screenshot` × png+webp)
- `public/images/services/` — 14 files (7 service backgrounds × png+webp)
- `public/robots.txt` — superseded by dynamic `app/robots.ts`

**`scripts/optimize-images.ts`** — dead image entries (`maganji-screenshot`, `tuandike-screenshot`, 5 service screenshots) removed from `OPTIMIZATION_CONFIGS`

**Total removed:** ~31 files/directories. Build remains clean at 0 errors, 0 warnings.

---

## 14. TOP PRIORITY ACTIONS

**P1 — Create `/do-not-sell` route** (15 min)  
`PrivacyBanner.tsx` renders a "Do Not Sell/Share" link for every visitor. It 404s. Create `app/do-not-sell/page.tsx` with a minimal CCPA preference acknowledgment.

**P2 — Fix `hello@` in `dentrix-knowledge.ts`** (2 min)  
The `contact` topic answer and `CHAT_FALLBACK` both say `hello@dentrixapps.com`. Users who follow that advice email an address that may not be monitored. Change to `ceo@dentrixapps.com` to match the form and server action.

**P3 — Delete `package-lock.json`, `.eslintrc.json`, `eslint.config.mjs.bak`** (5 min)  
Two lockfiles conflict. Legacy ESLint config has parse errors. The `.bak` file is committed noise. Remove all three.

**P4 — Add homepage depth** (hours–days, product decision)  
The homepage is a single hero section. Add at minimum: a "How it works" (3-step process) section and a trust/proof section. The proof-before-pay differentiator is stated but never demonstrated.

**P5 — Update `ARCHITECTURE.md` and `TODO.md`** (1 hour)  
Both describe the wrong product. Any developer onboarding reads these first.

**P6 — Create `.env.example`** (5 min)  
Document `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL`, `OPENAI_API_KEY`, `OPENAI_CHAT_MODEL` with placeholder values and descriptions.
