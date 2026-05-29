# DentrixApps

**AI chatbot assistants for salons, gyms, and dental practices. Free live demo — see your AI before paying a single dollar.**

Built with Next.js 16, deployed on Vercel. Live at [dentrixapps.com](https://dentrixapps.com).

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, motion/react |
| AI Engine | Groq LLM (llama-3.3-70b-versatile) |
| Email | Resend (React Email) |
| Validation | Zod v4 |
| Deployment | Vercel |

---

## Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Edit .env.local with your keys (see .env.example for required variables)
#    Note: GROQ_API_KEY is optional — the chat agent works in fallback mode without it.

# 4. Start the dev server
pnpm dev

# 5. Open http://localhost:3000
```

## Available Commands

```bash
pnpm dev         # Development server (Turbopack)
pnpm build       # Production build
pnpm start       # Start production server
pnpm lint        # Lint all TypeScript/TSX files
```

## Environment Variables

See `.env.example` for the complete reference. Key variables:

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | No | Groq LLM API key (fallback mode works without it) |
| `RESEND_API_KEY` | For email | Resend API key |
| `CONTACT_EMAIL` | For contact | Contact form destination (default: ceo@dentrixapps.com) |
| `RESEND_FROM_EMAIL` | For contact | From address for emails |
| `TURSO_DATABASE_URL` | For DB | Turso database URL |
| `TURSO_AUTH_TOKEN` | For DB | Turso auth token |
| `PAYPAL_CLIENT_ID` | For payments | PayPal REST API client ID |
| `PAYPAL_CLIENT_SECRET` | For payments | PayPal REST API secret |

## Project Structure

```
app/
  (home)/           — Marketing landing page with 8 sections + AI chat overlay
  contact/          — Contact / demo request page
  privacy-policy/   — Privacy policy
  terms-of-service/ — Terms of service
  do-not-sell/      — CCPA opt-out page
  actions/          — Server actions (chat, contact)
  sitemap.ts        — Dynamic sitemap
  robots.ts         — Dynamic robots.txt

lib/
  dentrix-knowledge.ts  — AI agent system prompt + 12 knowledge topics
  claim-validator.ts    — Confidence scoring for AI responses
  chat-responder.ts     — Fallback keyword responder
  groq-client.ts        — Groq API client with retry logic
  content-data.ts       — Site copy (hero, contact form)
  seo.ts                — SEO constants
  smooth-scroll.ts      — Hash-based scroll-to-section with navbar offset
```

## Architecture

Read [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed overview of the system architecture, data flow, and key design decisions.

## About

DentrixApps was founded by Denis Kioko. The product is a custom AI chat assistant trained on each business's services, pricing, and brand voice. It operates on a demo-before-pay model — businesses see their working AI assistant live at a private subdomain before committing.

- **Website:** https://dentrixapps.com
- **Live demos:** https://ameerahspa.dentrixapps.com, https://fitzone.dentrixapps.com, https://brightsmile.dentrixapps.com
- **Bot demo:** https://bot.dentrixapps.com
- **Contact:** ceo@dentrixapps.com
