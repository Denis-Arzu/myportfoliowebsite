/**
 * Dentrix Apps knowledge base — used by the site chat agent.
 * Keep in sync with positioning: real-estate AI chatbots, proof-before-pay model.
 */

export type KnowledgeTopic = {
  id: string;
  keywords: string[];
  answer: string;
};

export const DENTRIX_SYSTEM_CONTEXT = `You are the Dentrix Apps website assistant. Dentrix Apps builds AI chatbots that turn real estate agents' websites into 24/7 lead-capturing machines. The company proves value by showing agents their chatbot already built on their site before they pay. Focus: real estate, lead capture, 24/7 availability, website conversion. Be concise, professional, and helpful. If asked about pricing or contracts, encourage booking via the Contact page or ceo@dentrixapps.com.`;

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: "what-is-dentrix",
    keywords: [
      "what is dentrix",
      "who are you",
      "what do you do",
      "about dentrix",
      "company",
      "dentrix apps",
    ],
    answer:
      "Dentrix Apps builds AI chatbots for real estate agents. We turn your website into a 24/7 lead-capturing machine — qualifying visitors, answering property questions, and capturing contact details while you sleep.",
  },
  {
    id: "how-it-works",
    keywords: [
      "how does it work",
      "how it works",
      "process",
      "get started",
      "onboarding",
      "setup",
    ],
    answer:
      "We analyze your brand and listings, then build and embed a custom AI chatbot on your website. Before you pay, we show you the chatbot already live on your site — so you see exactly what you're getting. Once you're happy, we launch, tune responses, and hand you a dashboard for leads and conversations.",
  },
  {
    id: "proof-before-pay",
    keywords: [
      "before pay",
      "before i pay",
      "proof",
      "demo",
      "try",
      "free",
      "preview",
      "built before",
      "see first",
    ],
    answer:
      "Our proof-before-pay model means we build your chatbot on your actual website first. You interact with it, see how it handles buyer questions, and review captured leads — then decide if it's worth investing. No blind purchases.",
  },
  {
    id: "real-estate",
    keywords: [
      "real estate",
      "realtor",
      "agent",
      "broker",
      "listing",
      "property",
      "buyers",
      "sellers",
      "mls",
    ],
    answer:
      "We're built specifically for real estate. The chatbot knows your listings, neighborhoods, open houses, and buyer FAQs. It qualifies leads (budget, timeline, pre-approval), books showings, and routes hot prospects to you instantly — all in natural conversation.",
  },
  {
    id: "lead-capture",
    keywords: [
      "lead",
      "leads",
      "capture",
      "conversion",
      "contact",
      "form",
      "crm",
      "pipeline",
    ],
    answer:
      "Every conversation is designed to capture leads: name, email, phone, and intent. The bot qualifies visitors 24/7 so you wake up to warm prospects, not empty contact forms. Integrations with your CRM and email can be configured on launch.",
  },
  {
    id: "24-7",
    keywords: [
      "24/7",
      "24 7",
      "always on",
      "night",
      "weekend",
      "after hours",
      "availability",
    ],
    answer:
      "Your website never closes — and neither does your chatbot. Nights, weekends, and holidays: visitors get instant answers and you get notified when someone is ready to move. That's the 24/7 lead machine we build.",
  },
  {
    id: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "how much",
      "fee",
      "subscription",
      "plan",
      "budget",
    ],
    answer:
      "Pricing depends on your market, site traffic, and integrations. Because you see your chatbot built before you pay, there's no guesswork. Use the Contact page to book a short call — we'll scope your site and share a clear quote.",
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "when", "fast", "delivery", "launch"],
    answer:
      "Most agents see a working preview on their site within days, not weeks. Full launch timing depends on content volume and CRM hooks — we'll give you a realistic date on your discovery call.",
  },
  {
    id: "integrations",
    keywords: [
      "integrate",
      "integration",
      "crm",
      "website",
      "wordpress",
      "squarespace",
      "wix",
      "embed",
    ],
    answer:
      "We embed on virtually any agent website — custom sites, WordPress, Squarespace, and more. Leads can flow to your CRM, email, or Slack. Tell us your stack on the Contact form and we'll confirm compatibility.",
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "talk to human",
      "speak to someone",
      "email",
      "call",
      "book",
      "calendly",
      "hello",
    ],
    answer:
      'Ready to talk to the team? Hit "Talk to us" on the homepage or visit our Contact page. Email ceo@dentrixapps.com or book a discovery call — we typically respond within an hour.',
  },
  {
    id: "different",
    keywords: ["different", "why you", "competitor", "better", "unique"],
    answer:
      "Generic chat widgets don't know real estate. We do — and we prove it by building your bot on your site before you pay. You see real conversations and real leads, not a sales deck.",
  },
];

export const CHAT_GREETING =
  "Hi — I'm the Dentrix Apps assistant. Ask me how we turn agent websites into 24/7 lead machines, or how our proof-before-pay model works.";

export const CHAT_FALLBACK =
  "I'm not sure I have the perfect answer for that. For specifics on your site or pricing, use **Talk to us** on the homepage or email ceo@dentrixapps.com — we'll get back to you quickly.";
