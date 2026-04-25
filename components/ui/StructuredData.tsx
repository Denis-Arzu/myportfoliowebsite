import React from "react";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Dentrix Apps",
  alternateName: "Dentrix Apps Software Engineering Lab",
  url: "https://dentrixapps.com",
  logo: "https://dentrixapps.com/icon.png",
  foundingDate: "2024",
  description: "High-performance software engineering lab specializing in algorithmic trading engines, AI automation systems, and scalable web infrastructure. Building digital leverage as a product.",
  disambiguatingDescription: "A software development and algorithmic trading engineering firm, distinct from any dental or medical management software.",
  industry: ["Software Engineering", "AI Development", "Algorithmic Trading"],
  founder: {
    "@type": "Person",
    name: "Denis Kioko",
    jobTitle: "Founder & CEO",
    url: "https://linkedin.com/in/denis-kioko-743234365"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE"
  },
  areaServed: [
    { "@type": "Country", name: "US" },
    { "@type": "Country", name: "GB" },
    { "@type": "Country", name: "SG" }
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@dentrixapps.com",
    telephone: "+254-111480091",
    contactType: "sales",
    availableLanguage: ["en-US", "en-GB"]
  },
  knowsAbout: [
    "AlgorithmicTrading",
    "SoftwareEngineering",
    "PythonDevelopment",
    "CPlusPlusProgramming",
    "NextJSDevelopment",
    "WebScraping",
    "AIAutomation",
    "DataPipelines",
    "QuantitativeFinance"
  ],
  sameAs: [
    "https://github.com/Denis-Arzu",
    "https://www.linkedin.com/in/denis-arzu",
    "https://twitter.com/dentrixapps",
    "https://tuandike.online",
    "https://maganji.site"
  ],
  hasOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Custom Software Development Services",
      description: "Bespoke engineering solutions including trading engines, automation systems, and full-stack applications",
      priceCurrency: "USD",
      price: "100-5000"
    }
  }
};

const softwareApplicationsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tuandike",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://tuandike.online",
    creator: {
      "@type": "Organization",
      name: "Dentrix Apps",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Maganji Engine",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://maganji.site",
    creator: {
      "@type": "Organization",
      name: "Dentrix Apps",
    },
  },
];

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationsSchema),
        }}
      />
    </>
  );
}
