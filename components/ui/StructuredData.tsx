import React from "react";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dentrix Apps",
  url: "https://dentrixapps.com",
  description:
    "Dentrix Apps - High-performance software engineering lab specializing in AI SaaS and Quant engines.",
  disambiguatingDescription:
    "A software development and algorithmic trading engineering firm, distinct from any dental or medical management software.",
  industry: [
    "Software Engineering",
    "AI Development",
    "Algorithmic Trading",
  ],
  knowsAbout: [
    "https://en.wikipedia.org/wiki/Software_engineering",
    "https://en.wikipedia.org/wiki/Algorithmic_trading",
    "https://en.wikipedia.org/wiki/Artificial_intelligence",
  ],
  sameAs: [
    "https://github.com/Denis-Arzu",
    "https://www.linkedin.com/in/denis-arzu",
    "https://tuandike.online",
    "https://maganji.site",
  ],
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
