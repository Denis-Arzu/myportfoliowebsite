import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

// ─── Identity constants ────────────────────────────────────────────────────
const LEGAL_NAME = "Dentrix Apps LLC";
const DISPLAY_NAME = SITE_NAME;
const ORG_URL = SITE_URL;
const ORG_EMAIL = "ceo@dentrixapps.com";
const ORG_PHONE = "+13072008300";
const ORG_LOGO = `${SITE_URL}/images/home/dentrixappslg.png`;

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
const softwareId = `${SITE_URL}/#software`;
const localBizId = `${SITE_URL}/#localbusiness`;

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
      description: DEFAULT_DESCRIPTION,
      legalName: LEGAL_NAME,
      naics: "541511",
      industry: ["Real Estate Technology", "AI Chatbots", "Lead Generation"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "1621 Central Ave",
        addressLocality: "Cheyenne",
        addressRegion: "WY",
        postalCode: "82001",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: ORG_EMAIL,
        telephone: ORG_PHONE,
        contactType: "customer service",
        areaServed: "US",
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
        "Real Estate Chatbots",
        "AI Lead Capture",
        "Conversational AI",
        "Real Estate Marketing",
        "Website Automation",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Real Estate AI Chatbots",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Website Chatbot",
              description:
                "Custom AI chatbot embedded on real estate agent websites for 24/7 lead capture and qualification.",
            },
            price: "200",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Proof-Before-Pay Preview",
              description:
                "Working chatbot built on the agent's actual website before any payment — agents see real results first.",
            },
          },
        ],
      },
    },

    // ── LocalBusiness — signals a real US company to Google ───────────────
    {
      "@type": "LocalBusiness",
      "@id": localBizId,
      name: LEGAL_NAME,
      alternateName: DISPLAY_NAME,
      url: ORG_URL,
      telephone: ORG_PHONE,
      email: ORG_EMAIL,
      logo: ORG_LOGO,
      image: ORG_LOGO,
      priceRange: "$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1621 Central Ave",
        addressLocality: "Cheyenne",
        addressRegion: "WY",
        postalCode: "82001",
        addressCountry: "US",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      parentOrganization: { "@id": organizationId },
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
    },

    // ── SoftwareApplication ────────────────────────────────────────────────
    {
      "@type": "SoftwareApplication",
      "@id": softwareId,
      name: `${DISPLAY_NAME} AI Chatbot`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: ORG_URL,
      description:
        "AI chatbot for real estate agent websites that captures and qualifies leads 24/7, with a live working preview on the agent's site before they pay.",
      provider: { "@id": organizationId },
      offers: {
        "@type": "Offer",
        price: "200",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description:
          "One-time $200 fee. No subscriptions. Proof-before-pay model.",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "12",
        bestRating: "5",
      },
      featureList: [
        "24/7 lead capture on agent websites",
        "Listing and buyer qualification",
        "Live chatbot preview before payment",
        "CRM-ready lead handoff",
        "One-time pricing — no subscriptions",
      ],
    },

    // ── FAQPage — rich snippets in Google search results ──────────────────
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Dentrix Apps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dentrix Apps builds AI-powered chatbots designed specifically for real estate agents. Our chatbots capture leads 24/7, answer property questions, schedule viewings, and qualify buyers — all branded to match the agent's website.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a real estate AI chatbot cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dentrix Apps charges a one-time fee of $200 per chatbot. No monthly subscriptions, no hidden fees. You own it forever.",
          },
        },
        {
          "@type": "Question",
          name: "How does the proof-before-pay model work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We build your chatbot first — populated with your real listings and data — and send you a working demo on your actual site. You see it working before you pay anything. If you like it, $200 and it's yours.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to install anything on my website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No installation required on your end. We provide a single line of embed code, or you can use your dedicated chatbot URL directly. Works on any website platform.",
          },
        },
        {
          "@type": "Question",
          name: "Is my clients' data secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All conversations are encrypted in transit and at rest. We never sell or share your leads' data. Dentrix Apps LLC is fully CCPA compliant.",
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
