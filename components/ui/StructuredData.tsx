import React from "react";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Dentrix Apps",
  alternateName: "Dentrix Apps AI Voice Studio",
  url: "https://dentrixapps.com",
  logo: "https://dentrixapps.com/icon.png",
  foundingDate: "2024",
  description: "Professional AI voice studio offering voiceovers, voice cloning, multilingual dubbing, and voice agent development. Built for creators, brands, and businesses who refuse to sound amateur. Same-day delivery. Studio quality.",
  disambiguatingDescription: "An AI audio production and voice engineering studio, distinct from any dental or medical management software.",
  industry: ["AI Voice Services", "Audio Production", "Voice Cloning", "Voice Over", "Multilingual Dubbing"],
  founder: {
    "@type": "Person",
    name: "Denis Kioko",
    jobTitle: "Founder & Voice Engineer",
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
    "TextToSpeech",
    "SSMLVoiceEnhancement",
    "AudioProduction",
    "VoiceAgents",
    "ContentCreation"
  ],
  sameAs: [
    "https://github.com/Denis-Arzu",
    "https://www.linkedin.com/in/denis-arzu",
    "https://twitter.com/dentrixapps"
  ],
  hasOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "AI Voice Services",
      description: "Professional AI voiceovers, voice cloning, multilingual dubbing in 29+ languages, and custom voice agent development. Same-day delivery available.",
      priceCurrency: "USD",
      price: "25-5000"
    }
  }
};

const softwareApplicationsSchema = null;

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}
