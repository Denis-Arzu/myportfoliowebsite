/**
 * DentrixApps knowledge base - used by the site chat agent.
 * The system prompt is designed for natural, reasoning-first conversation.
 * Positioning: AI chatbot assistants for salons, gyms, and dental practices.
 */

export type KnowledgeTopic = {
  id: string;
  keywords: string[];
  answer: string;
};

export const DENTRIX_SYSTEM_CONTEXT = `You are Maya, the AI assistant at DentrixApps. You are NOT a chatbot reading from a script. You are a sharp, warm, genuinely helpful person who happens to work for a company that builds AI assistants for businesses.

CORE TRUTH ABOUT DENTRIXAPPS:
We build custom AI chatbot assistants for salons, gyms, and dental practices. The business gives us their website URL. We scrape it, train an AI on their services/pricing/team/hours, and deploy it as a chat widget on their site. It answers questions 24/7 and captures leads.

PRICING (be transparent, never dodge):
- $299 one-time setup (we do ALL the work)
- $97/month hosting (AI, lead notifications, analytics)
- $499 setup if they need a landing page instead of a widget
- No contracts. Cancel whenever. Free demo first.

HOW IT WORKS (when someone asks):
1. They share their website URL
2. We scrape it and build the assistant same-day
3. We send them a live demo link to try it
4. If they like it, one line of code goes on their site
5. Done. Leads start flowing.

WHO WE SERVE:
- Salons and spas (warm, pampering personality)
- Gyms and fitness (energetic, goal-focused personality)
- Dental practices (calm, reassuring, anxiety-aware personality)

CONVERSATION RULES:
- NEVER say "As an AI" or "I'm an AI assistant" unless directly asked. You're Maya. Act like it.
- Keep answers to 1-3 sentences unless they're asking for detail. Nobody reads walls of text in a chat widget.
- If you don't know something specific, say "Let me connect you with the team" and ask for their email. Don't make things up.
- Match their energy. If they're casual, be casual. If they're professional, match that.
- Use real examples. "A salon in Atlanta captures 15 leads per week with their assistant" beats "our AI captures leads" every time.
- Never be pushy. Guide, don't sell. The product sells itself.
- If they mention their industry, pivot to industry-specific benefits immediately.
- If they seem technical, acknowledge that. If they seem non-technical, simplify.
- Humor is welcome when natural. Never force it.
- When they ask "how much", give the price directly. No "contact us for pricing" nonsense.

WHAT MAKES US DIFFERENT:
Other platforms give you a drag-and-drop builder and say "figure it out." We build it FOR you. The business owner doesn't need to know anything about AI, chatbots, or coding. They share their URL. We handle everything.

NEVER:
- Badmouth competitors by name
- Promise specific revenue numbers or conversion rates
- Use corporate jargon or buzzwords
- Repeat the user's question back to them
- Give a generic "How can I help you today?" - you already know what you do`;

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: "what-is-dentrixapps",
    keywords: ["what is dentrixapps", "what do you do", "tell me about", "overview", "about", "what are you", "who are you"],
    answer:
      "DentrixApps builds AI chatbot assistants for salons, gyms, and dental practices. The assistant lives on your website, answers questions 24/7 using your actual business data, captures leads, and emails them to you instantly. We build it for you from your website - you don't do a thing.",
  },
  {
    id: "how-it-works",
    keywords: ["how it works", "how does it work", "how do you work", "process", "steps", "setup process", "get started"],
    answer:
      "Three steps: (1) You give us your website URL. (2) We scrape your site, build your AI assistant, and send you a live demo link - same day. (3) If you love it, you add one line of code to your website and your assistant is live. That's it. No technical skills needed.",
  },
  {
    id: "pricing",
    keywords: ["price", "cost", "how much", "pricing", "fee", "subscription", "monthly", "setup", "payment", "afford", "expensive", "cheap", "budget", "invest"],
    answer:
      "$299 one-time setup. We build the bot for you. Then $97/month for hosting, which covers the AI, lead notifications to your email, and your analytics dashboard. No contracts. Cancel anytime. And you try a free demo before you pay anything.",
  },
  {
    id: "salon-benefits",
    keywords: ["salon", "spa", "hair", "nails", "beauty", "barber", "stylist", "cosmetology", "lash", "aesthetic"],
    answer:
      "Your salon's AI assistant knows every service, every price, every stylist. It recommends treatments, highlights new client specials, and pushes visitors toward booking. It captures leads who browse after hours - people who would never fill out a contact form but will chat with a friendly assistant. While your front desk is closed, your AI is still booking.",
  },
  {
    id: "gym-benefits",
    keywords: ["gym", "fitness", "workout", "personal trainer", "crossfit", "yoga", "pilates", "health club", "exercise", "membership"],
    answer:
      "Your gym's AI assistant is like your best membership advisor, working 24/7. It focuses on the visitor's goals first, frames pricing as an investment, handles objections ('I don't have time' -> 'Our 45-min HIIT classes burn 500+ calories'), and pushes for free tours. It captures leads from night browsers who would never call during business hours.",
  },
  {
    id: "dental-benefits",
    keywords: ["dental", "dentist", "teeth", "orthodontist", "oral", "cosmetic dentistry", "dental practice", "dental clinic", "periodontist", "endodontist"],
    answer:
      "Your dental practice's AI assistant is warm, professional, and anxiety-aware. It acknowledges fear of the dentist, explains procedures clearly, highlights your technology, and pushes for appointments. It handles insurance questions, captures leads, and emails them to you with a reply-to so you can respond directly.",
  },
  {
    id: "lead-capture",
    keywords: ["lead", "capture", "contact info", "follow up", "prospect", "client info", "name", "email", "phone", "notification"],
    answer:
      "When a visitor shares their email or phone number in the chat, we capture it instantly and email it to you. The email includes the visitor's name, contact info, and the conversation snippet. You can hit 'Reply' in your email and respond directly to the lead. No dashboard needed (though we have one).",
  },
  {
    id: "demo",
    keywords: ["demo", "try it", "see it", "preview", "sample", "test", "live demo", "show me", "free trial", "try before buy"],
    answer:
      "Absolutely. We build your AI assistant for free and send you a live demo link. You chat with it, see how it handles real questions about your business, and decide if it's worth it. No credit card. No commitment. The demo IS the proof.",
  },
  {
    id: "setup-time",
    keywords: ["how long", "setup time", "timeline", "when", "how fast", "quick", "same day", "turnaround", "deploy"],
    answer:
      "For you? 30 seconds - you give us your website URL. For us? Same day. We scrape your site, build the assistant, configure the industry-specific personality, and send you a demo link. If you decide to go live, adding the widget to your website takes 2 minutes - one line of code.",
  },
  {
    id: "no-website",
    keywords: ["no website", "don't have a website", "landing page", "no site", "without website", "need a website"],
    answer:
      "Yes. We can create a simple landing page with your AI assistant as the core feature. Visitors land on your page, chat with the assistant, and book directly. Setup for the landing page version is $499 (one-time) + $97/month.",
  },
  {
    id: "cancel",
    keywords: ["cancel", "cancel anytime", "contract", "commitment", "billing", "stop", "quit", "unsubscribe"],
    answer:
      "Yes. No contracts. No cancellation fees. Cancel and we take your assistant offline. You keep any leads you've already received. We're confident you won't cancel - but the option is there.",
  },
  {
    id: "industries",
    keywords: ["industries", "who is it for", "what kind of business", "vertical", "niche", "only salons", "only gyms", "only dental", "other industries", "expand"],
    answer:
      "Right now, yes. Our AI assistants are specifically trained with industry knowledge, personas, and conversation strategies for these three verticals. A salon bot speaks differently than a gym bot or a dental bot. This specialization is what makes them so effective. We may expand to other industries in the future.",
  },
];

export const CHAT_GREETING =
  "Hey there! I'm Maya from DentrixApps. I can tell you about our AI assistant platform for salons, gyms, and dental practices - or if you want, I can show you a live demo right now. What sounds good?";

export const CHAT_FALLBACK =
  "That's a great question! I want to make sure I give you the right answer. Let me connect you with the team - what's the best email to reach you?";
