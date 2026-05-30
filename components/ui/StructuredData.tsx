import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

// ─── Identity constants ────────────────────────────────────────────────────
const LEGAL_NAME = "DentrixApps LLC";
const DISPLAY_NAME = SITE_NAME;
const ORG_URL = SITE_URL;
const ORG_EMAIL = "ceo@dentrixapps.com";
const ORG_LOGO = `${SITE_URL}/images/home/dentrixappslg.png`;

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
const softwareId = `${SITE_URL}/#software`;

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // ── Organization + ProfessionalService ───────────────────────────────
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": organizationId,
      name: LEGAL_NAME,
      alternateName: DISPLAY_NAME,
      url: ORG_URL,
      logo: ORG_LOGO,
      image: ORG_LOGO,
      foundingDate: "2024",
      description: "AI chatbot assistants for salons, gyms, and dental practices",
      legalName: LEGAL_NAME,
      naics: "541511",
      industry: [
        "AI Chatbots",
        "Lead Generation",
        "Salon Technology",
        "Fitness Technology",
        "Dental Technology",
      ],
      sameAs: [
        ORG_URL,
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: ORG_EMAIL,
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
      },
      areaServed: [
        { "@type": "Country", name: "US" },
        { "@type": "Country", name: "CA" },
        { "@type": "Country", name: "GB" },
        { "@type": "Country", name: "AU" },
      ],
      knowsAbout: [
        "AI Chatbots for Salons",
        "AI Chatbots for Gyms",
        "AI Chatbots for Dental",
        "Lead Capture Automation",
        "Conversational AI",
        "Website Automation",
        "Appointment Booking AI",
        "Small Business AI Software",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Chatbot Assistant Service",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Chatbot Setup - Salon",
              description:
                "Custom AI chatbot assistant for salons and spas. Trained on your services, pricing, and team.",
            },
            price: "299",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Chatbot Setup - Gym",
              description:
                "Custom AI chatbot assistant for gyms and fitness centers. Handles memberships, tours, and objections.",
            },
            price: "299",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Chatbot Setup - Dental",
              description:
                "Custom AI chatbot assistant for dental practices. Anxiety-aware, handles insurance and scheduling.",
            },
            price: "299",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Chatbot Monthly Hosting",
              description:
                "Monthly hosting including AI, lead notifications, analytics dashboard, and updates.",
            },
            price: "97",
            priceCurrency: "USD",
          },
        ],
      },
    },

    // ── WebSite ────────────────────────────────────────────────────────────
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: DISPLAY_NAME,
      url: ORG_URL,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": organizationId },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // ── SoftwareApplication ────────────────────────────────────────────────
    {
      "@type": "SoftwareApplication",
      "@id": softwareId,
      name: `${DISPLAY_NAME} AI Chatbot Platform`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: ORG_URL,
      description:
        "Multi-tenant AI chatbot platform for salons, gyms, and dental practices. Builds and hosts custom AI assistants using business website data.",
      provider: { "@id": organizationId },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "97",
        highPrice: "499",
        priceCurrency: "USD",
        offerCount: "2",
        offers: [
          {
            "@type": "Offer",
            price: "299",
            priceCurrency: "USD",
            description: "$299 one-time setup",
            eligibility: "All businesses with a website",
          },
          {
            "@type": "Offer",
            price: "97",
            priceCurrency: "USD",
            description: "$97/month hosting",
          },
        ],
      },
      featureList: [
        "24/7 lead capture on business websites",
        "Industry-specific AI personalities (salon, gym, dental)",
        "Built from your website data - no configuration needed",
        "Instant email notifications for captured leads",
        "Reply-to-lead directly from your inbox",
        "One line of code to install on any website",
        "Free live demo before any payment",
        "Analytics dashboard",
        "Cancel anytime - no contracts",
      ],
      screenshot: `${SITE_URL}/images/og-image.webp`,
      applicationSubCategory: "AI Chatbot",
      downloadUrl: ORG_URL,
      softwareVersion: "4.0.0",
    },

    // ── BreadcrumbList ────────────────────────────────────────────────────
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Get Your Free AI Assistant Demo",
          item: `${SITE_URL}/contact`,
        },
      ],
    },

    // ── FAQPage - rich snippets in Google search results ──────────────────
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is DentrixApps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DentrixApps builds AI chatbot assistants for salons, gyms, and dental practices. Each assistant lives on your website, answers visitor questions 24/7 using your actual business data, captures leads, and emails them to you instantly. You don't build anything - we build it for you from your website.",
          },
        },
        {
          "@type": "Question",
          name: "How much does an AI chatbot assistant cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "$299 one-time setup fee. $97/month for hosting. No hidden fees, no contracts - cancel anytime. We also build a free live demo before you pay anything. The demo is free with no credit card required.",
          },
        },
        {
          "@type": "Question",
          name: "How does the free demo work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You give us your website URL. We build your AI assistant from your site data and send you a live demo link within hours. You chat with it, see how it handles real questions about your business, and decide if it's worth it. No credit card. No commitment.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to get an AI assistant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Same day. You give us your website URL, we build the assistant and send you a demo link within hours. If you decide to go live, adding the widget to your website takes 2 minutes - one line of HTML code.",
          },
        },
        {
          "@type": "Question",
          name: "What can the AI assistant do for a salon?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your salon's AI assistant knows every service, every price, every stylist. It recommends treatments based on client needs, highlights new client specials, pushes visitors toward booking, and captures leads from after-hours browsers. While your front desk is closed, your AI is still booking appointments.",
          },
        },
        {
          "@type": "Question",
          name: "What can the AI assistant do for a gym?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your gym's AI assistant works like your best membership advisor - 24/7. It focuses on the visitor's fitness goals, handles pricing objections, promotes free trials and tours, and captures membership leads from evening website visitors who would never call during business hours.",
          },
        },
        {
          "@type": "Question",
          name: "What can the AI assistant do for a dental practice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your dental practice's AI assistant is warm, professional, and anxiety-aware. It acknowledges dental fear, explains procedures clearly, highlights your technology and comfort options, handles insurance questions, and pushes for appointment scheduling.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a website to use DentrixApps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We can build you a simple landing page with the AI assistant as the core feature. Visitors land on your page, chat with the assistant, and book directly. Landing page setup is $499 one-time + $97/month.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. No contracts, no cancellation fees. Cancel and we take your assistant offline. You keep any leads you've already captured. We're confident you won't cancel, but the option is there.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need technical skills to set it up?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We build everything for you. You don't configure prompts, write responses, or set up conversation flows. We use your website data to create an assistant that already knows your business. You just add one line of code to your website.",
          },
        },
        {
          "@type": "Question",
          name: "Does it work on WordPress, Shopify, or Wix?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We give you a single line of HTML that works on WordPress, Shopify, Wix, Squarespace, Webflow, and any platform that lets you add custom HTML. If you're not sure, just ask us and we'll help with installation.",
          },
        },
        {
          "@type": "Question",
          name: "How does the AI know about my business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We scrape your website - services, pricing, hours, team, location, FAQs - and feed it into the AI. It only answers based on your real data. It's trained to never make things up. If it doesn't know the answer, it offers to connect the visitor with your team.",
          },
        },
      ],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
