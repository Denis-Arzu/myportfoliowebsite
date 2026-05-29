# DentrixApps — Architecture Overview

## What This Is

DentrixApps is an AI chatbot SaaS platform for salons, gyms, and dental practices. The main site (dentrixapps.com) is a multi-section marketing landing page with an embedded AI assistant. The product delivers custom-branded AI assistants to businesses, deployed at private subdomains (e.g., business-name.dentrixapps.com).

**Founder:** Denis Kioko  
**Contact:** ceo@dentrixapps.com  
**Live demos:** ameerahspa.dentrixapps.com, fitzone.dentrixapps.com, brightsmile.dentrixapps.com  
**Bot demo:** bot.dentrixapps.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack dev) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | motion/react |
| AI Engine | Groq LLM (llama-3.3-70b-versatile), groq-sdk official client |
| Email | Resend (React Email templates) |
| Validation | Zod v4 |
| Deployment | Vercel |

---

## Project Structure

```
app/
  (home)/
    page.tsx                    — Homepage with 8 sections + SpaceChatOverlay
    components/
      SpaceChatOverlay          — Immersive full-screen AI chat (5-phase state machine)
      HeroSection               — Hero with eyebrow, headline, subheadline, 3 CTAs
      Navbar                    — Fixed nav with section-button hash navigation, mobile menu
      SiteFooter                — Client footer with scroll-aware section links
      HowItWorksSection         — 3-step card layout
      LiveDemosSection          — 3 industry demo cards (salon, gym, dental) with tenant URLs
      FeaturesSection           — 2x3 grid of 6 capabilities
      PricingSection            — 2 tiers ($299/$499 setup + $97/mo)
      FAQSection                — 8-item accordion with custom open-chat event
      CTASection                — Final conversion section with 2 CTAs
      ContactSection            — Industry selector + website URL + Zod-validated form
      PrivacyBanner             — CCPA / GPC compliance banner (links /do-not-sell)
      CursorGradient            — RAF pointer-tracked radial gradient
  contact/
    ContactPageView.tsx         — Client component owning chatOpen state on /contact
    page.tsx                    — Server-side metadata + render
  privacy-policy/page.tsx       — Privacy policy (updated for salons/gyms/dental)
  terms-of-service/page.tsx     — Terms of service (10 sections, covers pricing/demo/cancellation)
  do-not-sell/page.tsx          — CCPA opt-out page (localStorage-driven)
  actions/
    chat-agent.ts               — Server action: Groq LLM primary → local KB fallback
    contact.ts                  — Zod + Resend + rate limiter + honeypot
  layout.tsx                    — Root layout (ThemeProvider, StructuredData, PrivacyBanner)
  globals.css                   — Tailwind v4 @theme tokens + cosmic/dark aesthetics
  icon.svg                      — SVG favicon
  robots.ts                     — Dynamic robots.txt
  sitemap.ts                    — Dynamic sitemap

lib/
  dentrix-knowledge.ts          — System prompt + 12 KB topics (salon/gym/dental) + greeting/fallback
  claim-validator.ts            — Token-overlap confidence scoring (4-char prefix fuzzy matching)
  chat-responder.ts             — Keyword-scoring KB fallback (context-aware, uses recent history)
  content-data.ts               — Site copy (hero 3 CTAs, contact form with industry dropdown)
  groq-client.ts                — groq-sdk singleton (llama-3.3-70b-versatile, temperature 0.45)
  seo.ts                        — SEO constants (title, description, 22 keywords, ogImage)
  smooth-scroll.ts              — scrollToSection() with 100px navbar offset, initHashScroll()
  contact-upload.ts             — Upload limits + MIME/ext validation
  utils.ts                      — cn() — clsx + tailwind-merge

components/
  ui/
    StructuredData.tsx           — JSON-LD: Organization + ProfessionalService + WebSite + SoftwareApp + BreadcrumbList + FAQPage
  theme-provider.tsx             — next-themes re-export (dark-only, enableSystem: false)

scripts/
  create-og-image.js             — OG image generator

public/
  images/home/                   — dentrixappslg + logoicon (png+webp)
  images/og-image.png|webp
  icon.png|webp
  manifest.json
```

---

## Key Architectural Decisions

### 1. Multi-Tenant Routing via Subdomain Rewrite

The same Next.js app serves both dentrixapps.com (marketing) and {business}.dentrixapps.com (tenant demos). Vercel rewrites map subdomain requests to `/?tenant={slug}`, and the page resolves the slug to serve the correct tenant AI assistant.

### 2. AI Chat Architecture

- **Client:** `SpaceChatOverlay` (React client component, dynamically imported with `ssr: false`) — handles 5-phase state machine (greeting → typing → waiting → answer → done), typewriter rendering with jitter, mobile keyboard-aware layout via visualViewport API, answer persistence via completedRef
- **Server action:** `chat-agent.ts` — accepts message + history, builds system prompt with KB block + conversation stage hint, calls Groq LLM, validates claims
- **Fallback:** `chat-responder.ts` — keyword-matches against 12 knowledge topics with recent history context
- **Knowledge base:** `dentrix-knowledge.ts` — 12 topics covering company, 3 industry verticals (salon, gym, dental), pricing, setup, demo; system prompt with industry-specific personality instructions

### 3. Demo-Before-Pay Model

Businesses see their custom AI assistant deployed live before paying. The free demo is the core differentiator — no credit card, no commitment. Live demos are available at tenant subdomains for each industry vertical.

### 4. Hash-Based Section Navigation

Custom `smooth-scroll.ts` handles cross-page and same-page hash navigation with a 100px navbar offset. SiteFooter uses `usePathname`/`useRouter` to scroll sections on the homepage or navigate to `/` first when on other pages. No `scroll-mt` classes needed.

### 5. Answer Persistence

The typewriter hook's completed answer is stored in a `useRef` (`completedRef`), not reactive state. The `done` phase renders from the ref, making the answer immune to state resets. It stays on screen until the user's first keystroke, which atomically promotes it to the ghost history strip.

### 6. Dual-Input Architecture (Mobile vs Desktop)

- **Desktop:** 1×1px `opacity-0` input at 50vh/50vw captures all keystrokes silently
- **Mobile:** Visible `<input>` bar with `enterKeyHint="send"` + visualViewport tracking for keyboard-aware layout

### 7. Contact Form Dual Purpose

The contact form serves two functions: lead capture for DentrixApps and data collection for building demos. The `website_url` field is required, and the email template includes a note about automatic website scraping so the lead understands what happens next.

---

## Data Flow

```
User → SpaceChatOverlay (client)
  → sendChatMessage (server action)
    → Groq LLM (llama-3.3-70b-versatile) with system prompt (KB block + stage hint + rules) + conversation history (last 8 turns)
    → validateClaims (confidence scoring via 4-char prefix fuzzy token matching)
    → Return { reply, confidence, sources, model }
  → Typewriter rendering with jitter → Phase machine → Done (answer persists via ref)
```

---

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Groq LLM API key (optional — fallback mode works without it) |
| `GROQ_MODEL` | Groq model override (default: `llama-3.3-70b-versatile`) |
| `RESEND_API_KEY` | Resend transactional email API key |
| `CONTACT_EMAIL` | Contact form destination email (default: `ceo@dentrixapps.com`) |
| `RESEND_FROM_EMAIL` | From address for contact emails (default: `DentrixApps <noreply@dentrixapps.com>`) |

---

## Development

```bash
pnpm install
cp .env.example .env.local  # Configure your environment
pnpm dev                     # http://localhost:3000
pnpm build                   # Production build
pnpm lint                    # ESLint check (flat config)
```

---

## Deployment

Deployed on Vercel. The build process:

1. `pnpm install`
2. `pnpm build`
3. Vercel automatically deploys the output

---

## Future Considerations

- Social proof section (testimonials / case studies)
- Business dashboard for managing AI assistant responses
- Analytics dashboard for lead tracking
- More AI model options (e.g., Anthropic Claude, OpenAI GPT-4o)
- Embeddable widget customization
