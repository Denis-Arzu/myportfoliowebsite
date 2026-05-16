import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
const softwareId = `${SITE_URL}/#software`;

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.webp`,
      foundingDate: "2024",
      description: DEFAULT_DESCRIPTION,
      industry: ["Real Estate Technology", "AI Chatbots", "Lead Generation"],
      founder: {
        "@type": "Person",
        name: "Denis Kioko",
        jobTitle: "Founder",
        url: "https://linkedin.com/in/denis-kioko-743234365",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi County",
        addressCountry: "KE",
      },
      areaServed: [
        { "@type": "Country", name: "US" },
        { "@type": "Country", name: "GB" },
        { "@type": "Country", name: "KE" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@dentrixapps.com",
        telephone: "+254-111480091",
        contactType: "sales",
        availableLanguage: ["en-US", "en-GB"],
      },
      knowsAbout: [
        "RealEstateChatbots",
        "LeadCapture",
        "ConversationalAI",
        "RealEstateMarketing",
        "WebsiteAutomation",
      ],
      sameAs: [
        "https://github.com/Denis-Arzu",
        "https://www.linkedin.com/in/denis-kioko-743234365",
        "https://twitter.com/dentrixapps",
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
                "Custom AI chatbot embedded on agent websites for 24/7 lead capture and qualification.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Proof-Before-Pay Preview",
              description:
                "Live chatbot built on the agent's website before payment, so they see results first.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "SoftwareApplication",
      "@id": softwareId,
      name: `${SITE_NAME} AI Chatbot`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "AI chatbot for real estate agent websites that captures and qualifies leads 24/7, with a live preview on your site before you pay.",
      provider: { "@id": organizationId },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        description:
          "Proof-before-pay preview — your chatbot live on your website before purchase.",
      },
      featureList: [
        "24/7 lead capture on agent websites",
        "Listing and buyer qualification",
        "Live chatbot preview before payment",
        "CRM-ready lead handoff",
      ],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaGraph),
      }}
    />
  );
}
