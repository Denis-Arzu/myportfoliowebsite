/** Shared SEO constants — single source for metadata, sitemap, and JSON-LD */

export const SITE_URL = "https://dentrixapps.com";
export const SITE_NAME = "DentrixApps";

export const DEFAULT_TITLE =
  "DentrixApps | AI Assistants for Salons, Gyms & Dental";

export const DEFAULT_DESCRIPTION =
  "AI assistant for salons, gyms & dental practices. Answers questions 24/7, captures leads, books appointments. Built from your website in 60 seconds. Free live demo.";

export const OG_IMAGE_PATH = "/images/og-image.webp";

export const KEYWORDS = [
  // Primary — industry-specific
  "AI chatbot for salons",
  "AI assistant for gyms",
  "AI chatbot for dental practices",
  "salon chatbot",
  "gym chatbot",
  "dental chatbot",
  // Secondary — capabilities
  "lead capture chatbot",
  "AI booking assistant",
  "24/7 website assistant",
  "automated lead capture",
  "website chatbot for small business",
  // Long-tail — intent-driven
  "AI assistant built from your website",
  "try chatbot before you buy",
  "no code chatbot for salon",
  "free AI demo for business",
  "increase salon bookings with AI",
];

export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ogImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "DentrixApps — AI chatbot assistants for salons, gyms, and dental practices. 24/7 lead capture. Free demo.",
} as const;
