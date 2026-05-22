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
| AI Engine | Groq LLM (llama-3.3-70b-versatile), fetch-based client |
| Database | Turso (libSQL) via Prisma ORM (production), local SQLite (dev) |
| Payments | PayPal Orders API v2 + Subscriptions API |
| Email | Resend (React Email templates) |
| Deployment | Vercel (edge + serverless functions) |

---

## Project Structure

```
app/
  (home)/              — Marketing landing page (hero, features, etc.)
    page.tsx           — Homepage with SpaceChatOverlay integration
    components/
      SpaceChatOverlay — Full-screen AI chat interface
      HeroSection      — Hero with CTAs (Talk to us, View Demo, Talk to AI Agent)
      Navbar           — Navigation bar
      SiteFooter       — Site footer
      PrivacyBanner    — CCPA compliance banner
      ContactSection   — Contact form
  contact/             — Contact page
  privacy-policy/      — Privacy policy (monospace terminal style)
  terms-of-service/    — Terms of service
  do-not-sell/         — CCPA opt-out page
  actions/
    chat-agent.ts      — Server action: sends messages to Groq LLM
  sitemap.ts           — Dynamic sitemap generation

lib/
  dentrix-knowledge.ts — System prompt + knowledge topics + greeting/fallback
  claim-validator.ts   — Confidence scoring for AI responses
  chat-responder.ts    — Fallback responder (used when Groq API key is missing)
  content-data.ts      — Site copy (hero, contact form)
  groq-client.ts       — Groq fetch client with retry logic
  seo.ts               — SEO constants (title, description, keywords)
  contact-upload.ts    — Contact form handling
  utils.ts             — Shared utilities
  app/actions/         — Server actions directory

components/
  ui/                  — Reusable UI components (shadcn/ui style)
  theme-provider.tsx   — Theme context provider

scripts/
  create-og-image.js   — OG image generator
  optimize-images.ts   — Image optimization pipeline
```

---

## Key Architectural Decisions

### 1. Multi-Tenant Routing via Subdomain Rewrite

The same Next.js app serves both dentrixapps.com (marketing) and {agent}.dentrixapps.com (agent demos). Vercel rewrites map subdomain requests to `/?agent={slug}`, and the page resolves the slug via `getAgentSlugFromHost()`.

### 2. AI Chat Architecture

- **Client:** SpaceChatOverlay (React client component) — handles phase machine (greeting → typing → waiting → answer → done), typewriter rendering, mobile keyboard-aware layout
- **Server action:** `chat-agent.ts` — accepts message + history, calls Groq LLM with Dentrix system prompt, validates claims
- **Fallback:** `chat-responder.ts` — keyword-matches against knowledge topics when Groq API key is absent
- **Knowledge base:** `dentrix-knowledge.ts` — 13 topics covering company, product, pricing, features

### 3. Proof-Before-Pay Model

The core differentiator. Agents see their custom chatbot deployed live before paying. This is not a free trial — it's a fully working demo on the agent's actual brand and listings.

### 4. Two-Step PayPal Checkout

1. Capture $197 setup fee (one-time)
2. Activate $29/month subscription

---

## Data Flow

```
User → SpaceChatOverlay (client)
  → sendChatMessage (server action)
    → Groq LLM (llama-3.3-70b-versatile) with system prompt + conversation history
    → validateClaims (confidence scoring)
    → Return { reply, confidence, sources }
  → Typewriter rendering → Phase machine → Done
```

---

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Groq LLM API key (optional — fallback mode works without it) |
| `TURSO_DATABASE_URL` | Turso DB URL |
| `TURSO_AUTH_TOKEN` | Turso auth token |
| `PAYPAL_CLIENT_ID` | PayPal REST API client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal REST API secret |
| `RESEND_API_KEY` | Resend transactional email API key |

---

## Development

```bash
pnpm install
cp .env.example .env.local  # Configure your environment
pnpm dev                     # http://localhost:3000
pnpm build                   # Production build
pnpm lint                    # ESLint check
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