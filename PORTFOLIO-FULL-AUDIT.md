# PORTFOLIO FULL AUDIT REPORT
## dentrixapps.com
## Audited: 2026-07-14 (updated — post AI chat integration)
## Last updated: 2026-05-21 (hero copy + demo link changes)
## Analyst: Full Codebase Static Analysis

---

## EXECUTIVE SUMMARY

**Project:** Dentrix Apps — real estate AI chatbot service website  
**Framework:** Next.js 16.1.6 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4  
**Package Manager:** pnpm 10.18.1  
**Build Status:** Zero errors, zero build warnings. Clean production build confirmed.  
**Brand:** AI chatbots for real estate agents. "Proof-before-pay" model.  
**Deployment target:** Vercel (static-compatible; 9 routes prerendered as static content)

**Current state:** Codebase is lean, fully active — zero dead files. The AI chat layer has been fully rebuilt: Groq LLM (llama-3.3-70b-versatile) replaces OpenAI, a full-screen immersive `SpaceChatOverlay` replaces the old slide-up panel on both `/` and `/contact`, and all email references are unified. Remaining work is product/content depth, not engineering cleanup.

---

## QUICK STATS

| Metric | Value |
|---|---|
| Routes | 5 pages (/, /contact, /privacy-policy, /terms-of-service) + /robots.txt + /sitemap.xml + /icon.svg |
| `/do-not-sell` | linked from PrivacyBanner — **route does not exist → 404** |
| App files | 12 (layout, globals.css, icon.svg, robots.ts, sitemap.ts, page.tsx, ContactPageView.tsx, contact page.tsx, 3 legal pages) |
| Active components | 9 in `app/(home)/components/`, 2 in `components/ui/`, 1 `theme-provider.tsx` |
| Lib files | 8 (all active, including `groq-client.ts`) |
| Server actions | 2 (chat-agent.ts, contact.ts) |
| Script files | 2 (create-og-image.js, optimize-images.ts) |
| Public images | 8 (home/ × 6 png+webp, og-image × png+webp) + icon.png + icon.webp |
| Dead code | **0 files** |
| TypeScript errors | 0 |
| Build errors | 0 |
| Lint errors | 2 (encoding artifact in `.eslintrc.json`) |
| Lint warnings | ~65 (all Tailwind v4 class-shorthand suggestions — cosmetic only) |

---

## 1. CURRENT FILE TREE (COMPLETE)

```
myportfoliowebsite/
│
├── app/
│   ├── (home)/
│   │   ├── components/
│   │   │   ├── ChatAgentPanel.tsx        slide-up panel (contact page legacy, kept for /contact CTA card)
│   │   │   ├── ContactSection.tsx        full contact form — accepts onOpenChat prop
│   │   │   ├── CursorGradient.tsx        RAF pointer-tracked radial gradient
│   │   │   ├── HeroSection.tsx           headline + dual CTAs — accepts onOpenChat prop
│   │   │   ├── PrivacyBanner.tsx         CCPA/GPC localStorage banner
│   │   │   ├── ProjectFileUpload.tsx     drag-and-drop file attachment widget
│   │   │   ├── SiteFooter.tsx            logo + nav links + copyright
│   │   │   ├── SpaceChatOverlay.tsx      immersive full-screen AI chat — used on / and /contact
│   │   │   └── navbar.tsx                fixed nav with scroll transforms
│   │   └── page.tsx                      homepage — owns chatOpen state
│   ├── actions/
│   │   ├── chat-agent.ts                 Groq LLM → local KB fallback
│   │   └── contact.ts                    Zod + Resend + rate limiter
│   ├── contact/
│   │   ├── ContactPageView.tsx           owns chatOpen state for /contact
│   │   └── page.tsx                      server metadata + render
│   ├── privacy-policy/page.tsx
│   ├── terms-of-service/page.tsx
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── ui/
│   │   ├── StructuredData.tsx            JSON-LD schema graph
│   │   └── smooth-scroll.tsx             ReactLenis root wrapper
│   └── theme-provider.tsx
│
├── lib/
│   ├── chat-responder.ts                 keyword-scoring KB lookup (fallback)
│   ├── claim-validator.ts                token-overlap confidence scorer
│   ├── contact-upload.ts                 upload limits + MIME/ext sets
│   ├── content-data.ts                   heroContent + contactContent
│   ├── dentrix-knowledge.ts              KB topics, system prompt, greeting, fallback
│   ├── groq-client.ts                    official groq-sdk chat completion client
│   ├── seo.ts                            SITE_URL, DEFAULT_TITLE, ogImage, absoluteUrl
│   └── utils.ts                          cn() — clsx + tailwind-merge
│
├── public/
│   ├── images/
│   │   ├── home/                         dentrixappslg + logoicon + profilepic (png+webp each)
│   │   ├── og-image.png
│   │   └── og-image.webp
│   ├── icon.png
│   ├── icon.webp
│   └── manifest.json
│
├── scripts/
│   ├── create-og-image.js
│   └── optimize-images.ts
│
├── .env.example                          documents all 5 env vars
├── .eslintrc.json                        legacy flat config — encoding artifact (2 errors)
├── eslint.config.mjs                     modern flat config — active
├── eslint.config.mjs.bak                 backup file — should be deleted
├── next.config.ts
├── package.json
├── package-lock.json                     npm lockfile — conflicts with pnpm-lock.yaml
├── pnpm-lock.yaml                        canonical lockfile
├── postcss.config.mjs
├── tsconfig.json
└── components.json
```

---

## 2. FRAMEWORK & TOOLING

| Item | State |
|---|---|
| Next.js | 16.1.6, App Router, Turbopack dev |
| React | 19.0.0 |
| TypeScript | ^5, strict, `noEmit: true`, `bundler` moduleResolution |
| Tailwind CSS | v4 via `@tailwindcss/postcss`, all tokens in `globals.css` `@theme` |
| Animation | `motion` v12.6.3 (Framer Motion) |
| Smooth scroll | `lenis` v1.3.21 via `ReactLenis` root |
| LLM | `groq-sdk` v1.2.0 — llama-3.3-70b-versatile, OpenAI-compatible API |
| Icons | `lucide-react` v0.487.0 + `react-icons` v5.5.0 (react-icons: no active imports) |
| Email | `resend` v6.12.2 — dynamic import inside server action |
| Validation | `zod` v4.3.6 — contact form schema |
| Image processing | `sharp` v0.34.5 (devDep) — scripts only |
| Theme | `next-themes` v0.4.6 — dark-only, `enableSystem: false` |
| ESLint | Dual config conflict: `.eslintrc.json` (2 parse errors) + `eslint.config.mjs` (active). `.bak` file also present. |
| Lock files | `package-lock.json` + `pnpm-lock.yaml` — conflict. pnpm canonical. |

---

## 3. ACTIVE COMPONENT INVENTORY

### `app/(home)/components/`

| File | Lines | Role | Notes |
|---|---|---|---|
| `SpaceChatOverlay.tsx` | ~610 | Immersive full-screen AI chat. Phase machine: greeting → typing → waiting → answer → done. Mounted on `/` and `/contact` via `AnimatePresence`. | The primary AI chat interface. |
| `ChatAgentPanel.tsx` | 233 | Legacy slide-up chat panel. Still mounted on `/` (via `dynamic` import) but its `open` state is never triggered from the homepage. Used on `/contact` only via `ChatAgentPanel` import — now also removed from there. | **Effectively dead on both pages.** Not triggered anywhere. |
| `ContactSection.tsx` | ~460 | Full contact form with Zod validation, file upload, Calendly + email CTAs, AI assistant card. `onOpenChat?: () => void` prop wires the AI card to the parent's overlay. | `window.dispatchEvent` removed. |
| `CursorGradient.tsx` | 70 | RAF-driven cursor tracker, `prefers-reduced-motion` guard. | Active on `/`. |
| `HeroSection.tsx` | 54 | Headline + two CTAs. `onOpenChat: () => void` prop drives the "Talk to AI Agent" button. | |
| `PrivacyBanner.tsx` | 61 | CCPA/GPC bottom banner. Links `/do-not-sell` (404). | |
| `ProjectFileUpload.tsx` | 207 | Drag-and-drop upload widget used inside `ContactSection`. | |
| `SiteFooter.tsx` | 36 | Logo, nav links, copyright. | |
| `navbar.tsx` | 116 | Scroll-driven nav, minimal/back-button modes. | |

### `components/ui/` and `components/`

| File | Role |
|---|---|
| `StructuredData.tsx` | JSON-LD: Organization + ProfessionalService + WebSite + SoftwareApplication |
| `smooth-scroll.tsx` | `ReactLenis` root wrapper |
| `theme-provider.tsx` | next-themes re-export |

---

## 4. AI CHAT SYSTEM (FULL DETAIL)

### Architecture

The AI chat system has three layers:

```
User interaction
       │
       ▼
SpaceChatOverlay (client component)
  Phase machine: greeting → typing → waiting → answer → done
  Desktop: hidden 1px input captures keystrokes
  Mobile:  visible input bar + visualViewport for keyboard-aware layout
       │
       ▼
sendChatMessage() — "use server" action
  app/actions/chat-agent.ts
       │
       ├── Primary: groqChat() → llama-3.3-70b-versatile
       │     lib/groq-client.ts (groq-sdk singleton)
       │     System prompt = DENTRIX_SYSTEM_CONTEXT + KB block + RULES
       │     History: last 8 turns passed for conversation context
       │
       └── Fallback: getKnowledgeResponse()
             lib/chat-responder.ts
             Keyword scoring over 11 KB topics in lib/dentrix-knowledge.ts
             Used when GROQ_API_KEY absent or Groq errors
       │
       ▼
validateClaims() — lib/claim-validator.ts
  Token-overlap confidence scoring → high / medium / low
  Top-3 supporting source snippets extracted
```

### `SpaceChatOverlay.tsx` — phase machine detail

| Phase | What renders centre-stage | Input state |
|---|---|---|
| `greeting` | "Hi, this is Dentrix Apps AI Assistant.\nHow can I help you?" — `font-light text-white/65`, blur-in entrance, dim cursor | Hidden input ready (desktop) / mobile input visible |
| `typing` | User's live keystrokes mirrored large at centre — `text-white`, bright cursor | Input active |
| `waiting` | 3 dots, staggered `y: [0,-4,0]` float animation | Input disabled |
| `answer` | AI reply typewriters character by character, `speedMs: 15` with ±30% jitter | Input disabled |
| `done` | Full answer stays visible (`completedAnswer` ref, not reactive state) + "— Dentrix AI" attribution fades in | Input re-enabled — next keystroke archives to ghost strip |

### Answer persistence fix

The typewriter hook's `!active` branch no longer calls `setDisplayed("")`. Instead:
- `completedRef` (a `useRef`) stores the full text when the last character is typed
- `done` phase renders `completedAnswer` (from `completedRef.current`) not `typedAnswer` (reactive state)
- The answer is immune to any state reset. It stays on screen until the user's first keystroke in `done` phase, which atomically promotes it to `ghostExchange` (history strip) and transitions to `typing`

### Mobile layout

- `useIsMobile()` — `window.innerWidth < 640`, updates on resize
- `useVisualViewport()` — tracks `window.visualViewport.height` via both `resize` and `scroll` events (iOS fires `scroll` not `resize` when keyboard opens). Container `height` is set inline to `vpHeight` so the stage + input bar fit the visible area above the keyboard
- Mobile renders a real `<input>` bar (not hidden) because browsers require a focused visible input to summon the virtual keyboard. `enterKeyHint="send"` labels the iOS return key
- Desktop renders a 1×1px `opacity-0` input at `50vh/50vw` that captures all keystrokes silently

### Close button

Top-right `motion.button` with `X` icon (36×36px mobile, 32×32px desktop). Present on all viewports. Animates in at 250ms delay so it doesn't compete with the greeting entrance. `whileTap={{ scale: 0.88 }}` gives tactile feedback. Desktop also shows `Esc to exit` hint and keyboard listener.

### `groq-client.ts`

- Module-level singleton (`_client`) — instantiated once per server process lifetime
- `getClient()` returns `null` when `GROQ_API_KEY` absent — caller drops to KB fallback, no throw
- Default model: `llama-3.3-70b-versatile` (overridable via `GROQ_MODEL` env var)
- Error logging: logs `err.message` only, not full error object (avoids key leakage in logs)
- `temperature: 0.35`, `max_tokens: 512` defaults; chat-agent overrides to `0.3` / `400`

### Email — now fully unified

All references across the codebase now use `ceo@dentrixapps.com`:

| File | Status |
|---|---|
| `lib/dentrix-knowledge.ts` — `DENTRIX_SYSTEM_CONTEXT` | ✅ `ceo@` |
| `lib/dentrix-knowledge.ts` — `contact` topic answer | ✅ `ceo@` |
| `lib/dentrix-knowledge.ts` — `CHAT_FALLBACK` | ✅ `ceo@` |
| `app/actions/chat-agent.ts` — system prompt + low-confidence message | ✅ `ceo@` |
| `app/actions/contact.ts` — `DEFAULT_CONTACT_EMAIL` | ✅ `ceo@` |
| `components/ui/StructuredData.tsx` — `contactPoint.email` | ✅ `ceo@` |
| `lib/content-data.ts` — `contactMethods` | ✅ `ceo@` |

### `ChatAgentPanel.tsx` — status

The panel component still exists and is mounted on the homepage via `dynamic(..., { ssr: false })`. Its `open` state is never set to `true` from the homepage — the "Talk to AI Agent" button now calls `onOpenChat` which opens `SpaceChatOverlay`. On `/contact`, `ChatAgentPanel` was removed from `ContactPageView.tsx` entirely. The component remains in the codebase because its `openChatAgent()` export was previously used — but that export is no longer called from anywhere.

**`ChatAgentPanel.tsx` is now dead.** It should be deleted.

---

## 5. PAGE ARCHITECTURE

### `/` (homepage) — `app/(home)/page.tsx`

```
page.tsx  ("use client")
  state: chatOpen: boolean
  │
  ├── AnimatePresence (hero exit)
  │     motion.div — exit: opacity:0, scale:0.98, blur(8px), 450ms
  │       Navbar (minimal)
  │       HeroSection (onOpenChat={openChat})
  │       SiteFooter
  │
  └── AnimatePresence (overlay enter)
        motion.div — enter: opacity:1, 350ms
          SpaceChatOverlay (onClose={closeChat})
```

### `/contact` — `app/contact/ContactPageView.tsx`

```
ContactPageView.tsx  ("use client")
  state: chatOpen: boolean
  │
  ├── AnimatePresence (contact exit)
  │     motion.div — exit: opacity:0, scale:0.98, blur(8px), 400ms
  │       Navbar (minimal, isBackMode)
  │       ContactSection (onOpenChat={openChat})
  │       SiteFooter
  │
  └── AnimatePresence (overlay enter)
        motion.div — enter: opacity:1, 350ms
          SpaceChatOverlay (onClose={closeChat})
```

Both pages use identical `AnimatePresence` cross-dissolve patterns. `SpaceChatOverlay` is shared between them — same component, same behaviour, same close mechanic.

---

## 6. SERVER ACTIONS

### `app/actions/contact.ts`

**Security hardening:**
- Zod schema validation — field-level errors returned to client
- `escapeHtml()` on all user strings before email HTML
- `sanitizeFilename()` — strips `../`, path separators, non-word chars, truncates at 120 chars
- Honeypot field (`name="website"`, positioned `absolute -left-[9999px]`)
- MIME + extension dual validation on attachments
- Per-file 8MB cap + 40MB total
- 3 submissions per email per rolling hour (in-memory `Map`)
- Graceful dev console fallback when `RESEND_API_KEY` absent

**Remaining issues:**
- `FALLBACK_CONTACT_EMAIL` is identical to `DEFAULT_CONTACT_EMAIL` — redundant constant
- Rate limiter resets on serverless cold start — soft protection only
- `bodySizeLimit: "48mb"` in `next.config.ts` vs 40MB attachment cap — 8MB gap

### `app/actions/chat-agent.ts`

**What it does:**
1. Loads `DENTRIX_SYSTEM_CONTEXT` + `knowledgeTopics` from `dentrix-knowledge.ts`
2. Builds a structured KB block: `[topic-id]: answer` per topic
3. Constructs system prompt: context + KB block + 4 explicit RULES
4. Passes last 8 history turns to Groq (conversation-aware)
5. Calls `groqChat()` — returns `null` if key absent or error
6. If Groq returns text: runs `validateClaims()` for confidence + sources, returns raw text (no truncation)
7. If Groq returns `null`: falls back to `getKnowledgeResponse()` (keyword scoring)

**Remaining issues:**
- `meta?: { confidence, sources, model }` on `ChatMessage` is typed but `model` is never displayed in the UI
- KB fallback ignores conversation `history` — always responds without context
- `claim-validator.ts` stopword list is minimal; token overlap on short KB answers frequently scores `low` even for correct responses — shown to users as "Confidence: LOW"

---

## 7. LIB LAYER

| File | Purpose | Issues |
|---|---|---|
| `groq-client.ts` | Official `groq-sdk` singleton, `groqChat()` returns `GroqChatResult | null` | Clean. |
| `chat-responder.ts` | Keyword scoring fallback. Greeting pattern < 40 chars detected separately. | Clean. |
| `claim-validator.ts` | Token overlap → high/medium/low confidence + top-3 source snippets. | Confidence scores frequently `low` for valid KB answers — visible to users. |
| `contact-upload.ts` | Upload constants (8MB/file, 40MB total, 8 files max), MIME/ext sets, helpers. | Clean. |
| `content-data.ts` | `heroContent` + `contactContent`. `heroContent.eyebrow` defined, never rendered. | Minor dead field. |
| `dentrix-knowledge.ts` | 11 KB topics, `DENTRIX_SYSTEM_CONTEXT`, `CHAT_GREETING`, `CHAT_FALLBACK`. All `ceo@`. | Clean. |
| `seo.ts` | `SITE_URL`, `DEFAULT_TITLE`, `DEFAULT_DESCRIPTION`, `KEYWORDS`, `ogImage`, `absoluteUrl()`. | Clean. |
| `utils.ts` | `cn()` — `clsx` + `twMerge`. | Clean. |

---

## 8. CONTENT & COPY

### Active pages

**`/` (homepage):** Navbar + hero (headline + 2 CTAs) + footer. No sections below fold.

**`/contact`:** Full contact form + side panel (AI chat CTA → `SpaceChatOverlay`, Calendly, direct email).

**`/privacy-policy`:** CCPA/CPRA compliant, monospace terminal aesthetic.

**`/terms-of-service`:** Standard terms, same aesthetic.

### Copy gaps

- **No social proof** — zero client results, testimonials, or case studies
- **No pricing page** — budget ranges in form are the only signal
- **Homepage is single-section** — hero + CTAs only, no "how it works" or FAQ below fold
- **`profilepic.png/webp` exists** in `public/images/home/` but is not rendered anywhere
- **`heroContent.eyebrow`** (`"Dentrix Apps"`) defined in `content-data.ts`, destructured in `HeroSection.tsx`, never rendered

---

## 9. SEO & METADATA

| Item | Status | Notes |
|---|---|---|
| `<title>` | ✅ | "Dentrix Apps \| AI Chatbots for Real Estate Agents" |
| `description` | ✅ | 163 chars, proof-before-pay differentiator |
| `keywords` | ✅ | 10 entries |
| `canonical` | ✅ | `https://dentrixapps.com` |
| `robots` meta | ✅ | index/follow, max-image-preview: large |
| Open Graph | ✅ | 1200×630 webp |
| Twitter Card | ✅ | summary_large_image |
| JSON-LD | ✅ | Org + ProfessionalService + WebSite + SoftwareApp |
| Sitemap | ✅ | Dynamic — `/` + `/contact` |
| robots.txt | ✅ | Dynamic via `app/robots.ts` |
| Favicon | ✅ | `/icon.webp` + `icon.svg` |
| PWA manifest | ✅ | Brand-correct |
| OG preload | ✅ | `<link rel="preload" as="image">` in `<head>` |

**Remaining issues:**
- `layout.tsx` `openGraph.title`: "AI Chatbots for Real Estate" vs `DEFAULT_TITLE` "AI Chatbots for Real Estate Agents" — minor mismatch
- `addressLocality: "Nairobi", addressCountry: "KE"` in JSON-LD — Kenya address for US-pitched service
- `telephone: "+254-111480091"` in JSON-LD — Kenya number
- `sameAs`: `https://github.com/Denis-Arzu` — verify handle is active
- `remotePatterns` allows `images.unsplash.com` — no Unsplash images in use

---

## 10. PERFORMANCE

### Images
- All images have `.webp` variants. `next/image` used in `navbar.tsx`, `SiteFooter.tsx`.
- `next.config.ts`: AVIF + WebP formats, full device size breakpoints, `minimumCacheTTL: 60`.

### Code splitting
- `ChatAgentPanel` — `dynamic(..., { ssr: false })` on homepage. Since it's now dead, this dynamic import loads a dead component on every homepage visit.
- `SpaceChatOverlay` — statically imported by `page.tsx` and `ContactPageView.tsx`. It's a large component (~610 lines) that should be `dynamic` imported since it only mounts on user interaction.
- `dentrix-knowledge.ts` — dynamically imported inside `chat-agent.ts` server action. Correct.

### CSS
- `globals.css` body `::after` and `.terminal-scanlines` both use the same SVG `fractalNoise` data-URI — duplicate definition (cosmetic only).
- `@media (prefers-reduced-motion: reduce)` declared twice in `globals.css` — redundant but harmless.

### `"use client"` on homepage
- `page.tsx` is `"use client"` because `CursorGradient` and `useState` (for `chatOpen`) require it. `HeroSection` and `SiteFooter` are client-rendered as a result. The static content could benefit from server rendering if `CursorGradient` were isolated.

---

## 11. ACCESSIBILITY

| Item | Status |
|---|---|
| `*:focus-visible` custom outline | ✅ `2px solid oklch(0.85 0.3 150)` |
| Contact form — `aria-describedby`, `aria-invalid`, `role="alert"` | ✅ |
| `ChatAgentPanel` — `role="dialog"`, `aria-label` | ✅ (component now dead) |
| `SpaceChatOverlay` — `aria-label` on close button, `aria-hidden` on cursor | ✅ |
| `PrivacyBanner` — `role="region"`, `aria-label` | ✅ |
| `CursorGradient` — `aria-hidden` | ✅ |
| `ProjectFileUpload` — `role="button"`, keyboard `Enter`/`Space`, `aria-label` | ✅ |
| `prefers-reduced-motion` in `globals.css` | ✅ |
| `prefers-reduced-motion` in `CursorGradient.tsx` | ✅ |
| `SpaceChatOverlay` spring animations | ⚠️ not guarded by `prefers-reduced-motion` |
| `navbar.tsx` scroll transforms | ⚠️ not guarded by `prefers-reduced-motion` |
| Honeypot field — `absolute -left-[9999px]` | ✅ |
| `SpaceChatOverlay` mobile input — `enterKeyHint="send"` | ✅ |
| `SpaceChatOverlay` close — Escape key (desktop) + visible button (all viewports) | ✅ |

---

## 12. ENVIRONMENT VARIABLES

| Variable | File | Required | Default |
|---|---|---|---|
| `GROQ_API_KEY` | `lib/groq-client.ts` | Production | Falls back to local KB |
| `GROQ_MODEL` | `lib/groq-client.ts` | Optional | `llama-3.3-70b-versatile` |
| `RESEND_API_KEY` | `app/actions/contact.ts` | Production | `console.log` fallback |
| `CONTACT_EMAIL` | `app/actions/contact.ts` | Optional | `ceo@dentrixapps.com` |
| `RESEND_FROM_EMAIL` | `app/actions/contact.ts` | Optional | `Dentrix Apps <noreply@dentrixapps.com>` |

`.env.example` created — documents all five vars with placeholder values and source links.

---

## 13. BUG REGISTRY

| # | Severity | Location | Description |
|---|---|---|---|
| B-1 | HIGH | `PrivacyBanner.tsx` | `/do-not-sell` link → 404 for every user |
| B-2 | HIGH | `app/(home)/page.tsx` + `ContactPageView.tsx` | `ChatAgentPanel` is dynamically imported and mounted but its `open` state is never triggered — dead component loading on every page visit |
| B-3 | MEDIUM | `app/(home)/page.tsx` | `SpaceChatOverlay` is statically imported — large client bundle loaded upfront; should be `dynamic(..., { ssr: false })` |
| B-4 | MEDIUM | `ChatAgentPanel.tsx` | Component is entirely dead — no longer triggered from any button or event anywhere in the codebase. Should be deleted. |
| B-5 | MEDIUM | `ChatAgentPanel.tsx` | Message timestamp rendered as `new Date().toLocaleTimeString()` at render time, not message receipt time |
| B-6 | MEDIUM | `.eslintrc.json` | Encoding artifact → 2 parse errors; dual ESLint config ambiguity |
| B-7 | MEDIUM | `app/(home)/page.tsx` | `"use client"` forces client render of static content (HeroSection, SiteFooter) |
| B-8 | LOW | `lib/claim-validator.ts` | Token overlap frequently scores `low` for valid KB answers — "Confidence: LOW" shown to users incorrectly |
| B-9 | LOW | `content-data.ts` | `heroContent.eyebrow` defined, destructured in HeroSection, never rendered |
| B-10 | LOW | `next.config.ts` | `remotePatterns` allows `images.unsplash.com` — no Unsplash images in use |
| B-11 | LOW | No `.env.example` in git | `.env.example` created but not verified to be committed |

---

## 14. CONFIG / INFRA ISSUES

| Item | Detail |
|---|---|
| `package-lock.json` | Conflicts with `pnpm-lock.yaml` — delete |
| `eslint.config.mjs.bak` | Committed backup file — delete |
| `.eslintrc.json` | Encoding artifact, 2 parse errors — delete in favour of `eslint.config.mjs` |
| `next.config.ts` `/products` redirect | `source: "/products"` → `destination: "/"` — no `/products` route exists or is planned |

---

## 15. STALE DOCUMENTATION

| Document | Status |
|---|---|
| `ARCHITECTURE.md` | **Severely stale.** Title: "AI Voice Studio Architecture Documentation." Describes voiceovers, voice cloning, dubbing. "Dennis Kioko" (double-n) vs `layout.tsx` "Denis Kioko". Tech stack section is broadly accurate but framed around wrong product. |
| `TODO.md` | **Fully obsolete.** References `Myskills.tsx`, `EngineeringStandards.tsx`, `CaseStudies.tsx`, `ActiveBuilds.tsx`, `GlobalImpact` — none exist. Every item is for the old software lab site. |
| `README.md` | **Boilerplate.** Unmodified `create-next-app` README. No Dentrix Apps info, no env var docs, no setup instructions. |

---

## 16. RECENT CHANGES (2026-05-21)

### Hero section — copy updates (`lib/content-data.ts`)
- `headline` changed from `"Turn your real estate website into a"` → `"Let's turn your real estate website into a"`
- `subheadline` changed from `"We build AI chatbots for agents — and prove it by showing your chatbot already live on your site before you pay."` → `"We build custom AI assistants for real estate agents and show them live on your site before you ever pay, so it always feels like you."`

### Hero section — demo link updated (`app/(home)/components/HeroSection.tsx`)
- "View Demo" `<Link>` href changed from `https://kiokocb.vercel.app/` → `https://bot.dentrixapps.com/`
- Footer "Live Demo" links were already pointing to `https://bot.dentrixapps.com` — no change needed

---

## 17. WHAT WAS BUILT SINCE LAST AUDIT

### Groq integration (replaced OpenAI)
- `lib/groq-client.ts` created — `groq-sdk` singleton, `groqChat()` returning typed result or `null`
- `app/actions/chat-agent.ts` rewritten — Groq primary, local KB fallback. KB injected as `[topic-id]: answer` structured block. Explicit RULES in system prompt. Last 8 history turns passed. `formatAssistantResponse()` / `shortSentence()` truncation removed — Groq controls output length via `max_tokens`
- `meta?: any` on `ChatMessage` replaced with narrow typed interface
- OpenAI removed entirely — no `OPENAI_API_KEY` references remain
- `groq-sdk` added to `dependencies` in `package.json`

### Email unification
- `hello@dentrixapps.com` removed from all 7 locations it appeared
- `ceo@dentrixapps.com` is now the single canonical email everywhere

### `SpaceChatOverlay.tsx` — full-screen immersive chat
- 5-phase state machine (greeting / typing / waiting / answer / done)
- Desktop: 1px hidden input captures keystrokes invisibly
- Mobile: visible input bar + `visualViewport` API for keyboard-aware layout
- Answer persistence: `completedRef` stores finished text; `done` phase reads from ref not reactive state — answer stays on screen until user's next keystroke
- History ghost strip: previous Q+A ghosted at top in `text-white/14` / `text-white/9`
- Top-right close button on all viewports (36×36px mobile, 32×32px desktop)
- Escape key closes on desktop
- `prefers-reduced-motion` not yet guarded in overlay animations

### Homepage wiring (`page.tsx`)
- `chatOpen: boolean` state owns overlay lifecycle
- Hero fades out with `opacity:0 scale:0.98 blur(8px)` exit via `AnimatePresence`
- `SpaceChatOverlay` fades in independently at 350ms
- `HeroSection` now takes `onOpenChat` prop — `window.dispatchEvent` removed

### Contact page wiring (`ContactPageView.tsx` + `ContactSection.tsx`)
- `ChatAgentPanel` removed from `ContactPageView` — was triggering old slide-up panel
- `ContactPageView` now owns `chatOpen` state, same pattern as homepage
- `ContactSection` accepts `onOpenChat?: () => void` — AI card calls it directly
- Full contact content fades out with same exit animation as homepage hero
- `SpaceChatOverlay` mounts over blank contact page

### `.env.example`
- Created — documents `GROQ_API_KEY`, `GROQ_MODEL`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL` with placeholder values

---

## 18. TOP PRIORITY ACTIONS

**P1 — Delete `ChatAgentPanel.tsx`** (5 min)  
Dead component. Not triggered from any button or event. Loaded as a dynamic import on every homepage visit — pure bundle waste. Remove it and the `dynamic` import in `page.tsx`.

**P2 — Lazy-load `SpaceChatOverlay`** (10 min)  
610-line client component loaded statically. It only mounts when a user clicks "Talk to AI Agent". Convert to `dynamic(..., { ssr: false })` in both `page.tsx` and `ContactPageView.tsx`.

**P3 — Create `/do-not-sell` route** (15 min)  
`PrivacyBanner` links to it. Every user who clicks "Do Not Sell/Share" hits a 404.

**P4 — Delete `package-lock.json`, `.eslintrc.json`, `eslint.config.mjs.bak`** (2 min)  
Dual lockfile conflict, encoding-broken legacy config, committed backup file.

**P5 — Homepage depth** (days — product decision)  
Single hero section. No "how it works", no proof, no FAQ. High bounce risk.

**P6 — Fix confidence scoring** (1 hour)  
`claim-validator.ts` shows "Confidence: LOW" for factually correct KB answers because token overlap is low. Consider removing public confidence display or raising the `medium` threshold for KB-only responses.

**P7 — Update `ARCHITECTURE.md` and `TODO.md`** (1 hour)  
Both describe the wrong product entirely.
