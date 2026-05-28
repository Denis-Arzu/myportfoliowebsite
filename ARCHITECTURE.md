# Dentrix Apps — Architecture Overview

## What This Is

Dentrix Apps is a real estate AI chatbot SaaS platform. The main site (dentrixapps.com) is a marketing landing page with an embedded AI assistant. The product delivers custom-branded AI chatbots to real estate agents, deployed at private subdomains (e.g., agent-name.dentrixapps.com).

**Founder:** Denis Kioko  
**Contact:** ceo@dentrixapps.com  
**Live demo:** bot.dentrixapps.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack dev) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix primitives) |
| Animation | Motion (motion/react), lenis (smooth scroll) |
| AI Engine | Groq LLM (llama-3.3-70b-versatile), groq-sdk official client |
| Email | Resend (React Email templates) |
| Validation | Zod v4 |
| Deployment | Vercel (edge + serverless functions) |

---

## Project Structure

```
app/
  (home)/
    page.tsx                — Homepage with SpaceChatOverlay (dynamic import, ssr: false)
    components/
      SpaceChatOverlay      — Immersive full-screen AI chat (5-phase state machine)
      HeroSection           — Hero with 3 CTAs (Talk to us, View Demo, Talk to AI Agent)
      navbar                — Fixed nav with scroll transforms, minimal/back-button modes
      SiteFooter            — Site footer
      PrivacyBanner         — CCPA/GPC compliance banner (links /do-not-sell)
      ContactSection        — Full contact form with Zod validation + file upload
      CursorGradient        — RAF pointer-tracked radial gradient
      ProjectFileUpload     — Drag-and-drop file attachment widget
  contact/
    ContactPageView.tsx     — Client component owning chatOpen state on /contact
    page.tsx                — Server-side metadata + render
  privacy-policy/page.tsx   — Privacy policy (monospace terminal style)
  terms-of-service/page.tsx — Terms of service
  do-not-sell/page.tsx      — CCPA opt-out page (monospace terminal, localStorage-driven)
  actions/
    chat-agent.ts           — Server action: Groq LLM primary → local KB fallback
    contact.ts              — Zod + Resend + rate limiter + honeypot
  layout.tsx                — Root layout (ThemeProvider, SmoothScroll, StructuredData, PrivacyBanner)
  globals.css               — Tailwind v4 @theme tokens + cosmic/dark aesthetics
  icon.svg                  — SVG favicon
  robots.ts                 — Dynamic robots.txt
  sitemap.ts                — Dynamic sitemap (5 routes)

lib/
  dentrix-knowledge.ts      — System prompt (strategic framework) + 11 KB topics + greeting/fallback
  claim-validator.ts        — Token-overlap confidence scoring for AI responses
  chat-responder.ts         — Keyword-scoring KB fallback (context-aware, uses recent history)
  content-data.ts           — Site copy (hero, contact form)
  groq-client.ts            — groq-sdk singleton (llama-3.3-70b-versatile, temperature 0.35, max_tokens 512)
  seo.ts                    — SEO constants (title, description, keywords, ogImage)
  contact-upload.ts         — Upload limits + MIME/ext validation sets
  utils.ts                  — cn() — clsx + tailwind-merge

components/
  ui/
    StructuredData.tsx       — JSON-LD schema graph (Organization + ProfessionalService + WebSite + SoftwareApplication)
    smooth-scroll.tsx        — ReactLenis root wrapper
  theme-provider.tsx         — next-themes re-export (dark-only, enableSystem: false)

scripts/
  create-og-image.js         — OG image generator
  optimize-images.ts          — Image optimization pipeline

public/
  images/home/               — dentrixappslg + logoicon + profilepic (png+webp each)
  images/og-image.png|webp
  icon.png|webp
  manifest.json
```

---

## Key Architectural Decisions

### 1. Multi-Tenant Routing via Subdomain Rewrite

The same Next.js app serves both dentrixapps.com (marketing) and {agent}.dentrixapps.com (agent demos). Vercel rewrites map subdomain requests to `/?agent={slug}`, and the page resolves the slug via `getAgentSlugFromHost()`.

### 2. AI Chat Architecture

- **Client:** `SpaceChatOverlay` (React client component, dynamically imported with `ssr: false`) — handles 5-phase state machine (greeting → typing → waiting → answer → done), typewriter rendering with jitter, mobile keyboard-aware layout via visualViewport API, answer persistence via completedRef
- **Server action:** `chat-agent.ts` — accepts message + history, builds system prompt with strategic framework + KB block + conversation stage hint, calls Groq LLM with llama-3.3-70b-versatile, validates claims
- **Fallback:** `chat-responder.ts` — keyword-matches against knowledge topics with recent history context
- **Knowledge base:** `dentrix-knowledge.ts` — 11 topics covering company, product, pricing, features; system prompt is an elaborate strategic consulting framework

### 3. Proof-Before-Pay Model

The core differentiator. Agents see their custom chatbot deployed live before paying. This is not a free trial — it's a fully working demo on the agent's actual brand and listings.

### 4. Answer Persistence

The typewriter hook's completed answer is stored in a `useRef` (`completedRef`), not reactive state. The `done` phase renders from the ref, making the answer immune to state resets. It stays on screen until the user's first keystroke, which atomically promotes it to the ghost history strip.

### 5. Dual-Input Architecture (Mobile vs Desktop)

- **Desktop:** 1×1px `opacity-0` input at 50vh/50vw captures all keystrokes silently
- **Mobile:** Visible `<input>` bar with `enterKeyHint="send"` + visualViewport tracking for keyboard-aware layout

---

## Data Flow

```
User → SpaceChatOverlay (client)
  → sendChatMessage (server action)
    → Groq LLM (llama-3.3-70b-versatile) with system prompt (strategic framework + KB block + rules + stage hint) + conversation history (last 8 turns)
    → validateClaims (confidence scoring via token overlap)
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
| `RESEND_FROM_EMAIL` | From address for contact emails (default: `Dentrix Apps <noreply@dentrixapps.com>`) |

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

- Agent dashboard for managing chatbot responses
- Analytics dashboard for lead tracking
- More AI model options (e.g., Anthropic Claude, OpenAI GPT-4o)
- Embeddable widget script for agent websites