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
      areaServed: { "@type": "Country", name: "US" },
      knowsAbout: [
        "AI Chatbots for Salons",
        "AI Chatbots for Gyms",
        "AI Chatbots for Dental",
        "Lead Capture",
        "Conversational AI",
        "Website Automation",
        "Appointment Booking",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Chatbot Assistant Service",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Chatbot Setup",
              description:
                "One-time setup — we build your AI assistant from your website data.",
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
                "Monthly hosting including AI, lead notifications, analytics dashboard.",
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
        "Multi-tenant AI chatbot platform for salons, gyms, and dental practices.",
      provider: { "@id": organizationId },
      offers: [
        {
          "@type": "Offer",
          price: "299",
          priceCurrency: "USD",
          description: "$299 setup + $97/month. No contracts. Free demo.",
          availability: "https://schema.org/InStock",
        },
      ],
      featureList: [
        "24/7 lead capture on business websites",
        "Industry-specific AI personalities",
        "Built from your website data",
        "Instant email notifications for leads",
        "One line of code to install",
        "Free demo before you pay",
        "Analytics dashboard",
        "Cancel anytime — no contracts",
      ],
      screenshot: `${SITE_URL}/images/og-image.webp`,
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
          name: "Contact",
          item: `${SITE_URL}/contact`,
        },
      ],
    },

    // ── FAQPage — rich snippets in Google search results ──────────────────
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is DentrixApps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DentrixApps builds AI chatbot assistants for salons, gyms, and dental practices. Each assistant lives on your website, answers visitor questions 24/7 using your actual business data, captures leads, and emails them to you instantly.",
          },
        },
        {
          "@type": "Question",
          name: "How much does an AI chatbot assistant cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DentrixApps charges a one-time setup fee of $299, then $97/month for hosting. No hidden fees, no contracts — cancel anytime. We also build a free demo before you pay.",
          },
        },
        {
          "@type": "Question",
          name: "How does the free demo work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You give us your website URL. We build your AI assistant from your site data and send you a live demo link. You chat with it and see how it handles real questions about your business. No credit card needed.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to get an AI assistant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Same day. You give us your website URL, we build the assistant and send you a demo link within hours. If you decide to go live, adding the widget to your website takes 2 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "What can the AI assistant do for a salon?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your salon's AI assistant knows every service, price, and stylist. It recommends treatments, highlights new client specials, pushes visitors toward booking, and captures leads after hours when your front desk is closed.",
          },
        },
        {
          "@type": "Question",
          name: "What can the AI assistant do for a gym?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your gym's AI assistant works like your best membership advisor 24/7. It focuses on visitor goals, handles objections, pushes for free tours, and captures leads from evening browsers who would never call during business hours.",
          },
        },
        {
          "@type": "Question",
          name: "What can the AI assistant do for a dental practice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your dental practice's AI assistant is warm, professional, and anxiety-aware. It acknowledges fear of the dentist, explains procedures clearly, handles insurance questions, and pushes for appointments.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a website to use DentrixApps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We can create a simple landing page with the AI assistant as the core feature. Visitors land on your page, chat with the assistant, and book directly. Landing page setup is $499 one-time + $97/month.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. No contracts, no cancellation fees. Cancel and we take your assistant offline. You keep any leads you've already received.",
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
