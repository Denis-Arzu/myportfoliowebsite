/** Shared SEO constants — single source for metadata, sitemap, and JSON-LD */

export const SITE_URL = "https://dentrixapps.com";
export const SITE_NAME = "DentrixApps";

export const DEFAULT_TITLE =
  "AI Chatbot Assistant for Salons, Gyms & Dental | DentrixApps";

export const DEFAULT_DESCRIPTION =
  "Stop losing customers. AI chatbot assistant for salons, gyms & dental — answers 24/7, captures leads, books appointments. Built from your website. Free live demo.";

export const OG_IMAGE_PATH = "/images/og-image.webp";

export const KEYWORDS = [
  // Primary — industry + service combination
  "AI chatbot for salons",
  "AI assistant for gyms",
  "AI chatbot for dental practices",
  "salon chatbot",
  "gym chatbot",
  "dental chatbot",
  "salon AI booking assistant",
  // Secondary — capability-based
  "lead capture chatbot",
  "24/7 website assistant",
  "automated lead capture",
  "small business AI chatbot",
  "website chatbot no code",
  // Long-tail — intent-driven
  "AI assistant built from your website",
  "free AI demo for salon business",
  "increase salon bookings with AI",
  "no code chatbot for small business",
  "try chatbot before you buy",
  "gym membership chatbot",
  "dental appointment chatbot",
  "AI chat widget for website",
];

export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ogImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "DentrixApps — AI chatbot assistant for salons, gyms, and dental practices. Answers 24/7, captures leads, books appointments. Free live demo.",
} as const;
