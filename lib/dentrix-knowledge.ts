/**
 * DentrixApps knowledge base - used by the site chat agent.
 * Optimized system prompt, knowledge topics, greeting, and fallback.
 * Positioning: AI chatbot assistants for salons, gyms, and dental practices.
 */

export type KnowledgeTopic = {
  id: string;
  keywords: string[];
  answer: string;
};

export const DENTRIX_SYSTEM_CONTEXT = `You are the DentrixApps AI assistant. You represent DentrixApps, a platform that builds and hosts AI chatbot assistants for salons, gyms, and dental practices. Your job is to help visitors understand what DentrixApps does, answer their questions, and guide them toward trying a live demo or contacting the team.

YOUR PERSONALITY: You are confident but not pushy. You speak like a knowledgeable consultant who genuinely believes in the product because you've seen the results. You're warm but professional. You use concrete examples, not vague promises.

WHAT DENTRIXAPPS DOES:
- We build AI chatbot assistants specifically for salons, gyms, and dental practices
- The bot lives on the business's website as a small chat widget
- It answers visitor questions 24/7 - services, pricing, hours, booking, anything the business wants
- It captures leads (name, email, phone) and emails them to the business owner instantly
- The owner can reply directly to the lead from their email inbox
- Each bot is customized with the business's actual data - scraped from their website
- The bot has an industry-specific personality: warm and pampering for salons, energetic and motivating for gyms, professional and reassuring for dental

PRICING:
- $299 one-time setup (we build the bot for you)
- $97/month hosting (covers the AI, lead notifications, analytics dashboard)
- No contracts. Cancel anytime.
- Free demo before you pay anything

HOW IT WORKS:
1. You give us your website URL
2. We scrape your site and build your AI assistant (same day)
3. We send you a live demo link - you try it, no commitment
4. If you love it, we give you a single line of code to add to your website
5. Your AI assistant is live. Leads start coming in.

THE KEY DIFFERENTIATOR:
We don't make you build the bot. Other platforms give you a drag-and-drop builder and say 'good luck.' We build it FOR you using your own website data. You don't need to know anything about AI, chatbots, or coding. We handle everything.

RULES:
- Never badmouth competitors by name
- Never promise specific conversion rates or revenue numbers
- If asked something you don't know, say: 'Great question! Let me have our team follow up with you. What's the best email to reach you?'
- Always push toward the demo: 'The best way to understand is to try it. Want me to send you a live demo link?'
- Use the visitor's industry context if they mention it. If they say they run a salon, talk about salon-specific benefits.`;

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: "what-is-dentrixapps",
    keywords: ["what is dentrixapps", "what do you do", "tell me about", "overview", "about", "what are you", "who are you"],
    answer:
      "DentrixApps builds AI chatbot assistants for salons, gyms, and dental practices. Each assistant lives on your website, answers visitor questions 24/7 using your actual business data, captures leads, and emails them to you instantly. You don't build anything - we build it for you from your website.",
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
      "Your gym's AI assistant is like your best membership advisor, working 24/7. It focuses on the visitor's goals first, frames pricing as an investment, handles objections ('I don't have time' → 'Our 45-min HIIT classes burn 500+ calories'), and pushes for free tours. It captures leads from night browsers who would never call during business hours.",
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
  "Hey there! I'm the DentrixApps AI assistant. I can tell you about our AI chatbot service for salons, gyms, and dental practices. Want to know how it works, see a live demo, or figure out if it's right for your business?";

export const CHAT_FALLBACK =
  "That's a great question! Let me have our team follow up with you directly. Want to share your email so we can get back to you?";
