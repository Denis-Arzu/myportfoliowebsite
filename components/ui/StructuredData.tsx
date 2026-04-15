import React from "react";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dentrix Apps",
  url: "https://dentrixapps.com",
  description:
    "Dentrix Apps - High-performance software engineering lab specializing in AI SaaS and Quant engines.",
  industry: [
    "Software Engineering",
    "AI Development",
    "Algorithmic Trading",
  ],
  sameAs: [
    "https://github.com/",
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
