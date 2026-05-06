import React from "react";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Dentrix Apps",
  alternateName: ["Dentrix Apps AI Voice Studio", "Dentrix Software Engineering Lab"],
  url: "https://dentrixapps.com",
  logo: "https://dentrixapps.com/icon.webp",
  foundingDate: "2024",
  description: "Elite AI Voice Studio & Software Engineering Lab. Specialized in professional voice cloning, multilingual dubbing, and high-performance algorithmic trading engines (C++/Python). Precision engineering for the AI era.",
  disambiguatingDescription: "A specialized AI audio production and software engineering studio, distinct from any dental or medical management software.",
  industry: ["AI Voice Services", "Software Engineering", "Quantitative Finance", "Audio Production"],
  founder: {
    "@type": "Person",
    name: "Denis Kioko",
    jobTitle: "Founder & Lead Engineer",
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
    { "@type": "Country", name: "KE" }
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@dentrixapps.com",
    telephone: "+254-111480091",
    contactType: "sales",
    availableLanguage: ["en-US", "en-GB"]
  },
  knowsAbout: [
    "AIVoiceSynthesis",
    "VoiceCloning",
    "MultilingualDubbing",
    "AlgorithmicTrading",
    "CPPSupport",
    "PythonAutomation",
    "SoftwareEngineering",
    "VoiceAgents",
    "QuantitativeAnalysis"
  ],
  sameAs: [
    "https://github.com/Denis-Arzu",
    "https://www.linkedin.com/in/denis-kioko-743234365",
    "https://twitter.com/dentrixapps"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engineering & AI Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Voice Studio",
          description: "Professional voiceovers, cloning, and multilingual dubbing."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Algorithmic Trading Engines",
          description: "High-performance C++ and Python trading systems for quantitative finance."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conversational AI Agents",
          description: "Custom WebRTC voice agents for enterprise automation."
        }
      }
    ]
  }
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}
