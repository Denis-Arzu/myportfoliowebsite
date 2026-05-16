/** Shared SEO constants — single source for metadata, sitemap, and JSON-LD */

export const SITE_URL = "https://dentrixapps.com";
export const SITE_NAME = "Dentrix Apps";

export const DEFAULT_TITLE =
  "Dentrix Apps | AI Chatbots for Real Estate Agents";

export const DEFAULT_DESCRIPTION =
  "Dentrix Apps builds AI chatbots that turn real estate agents' websites into 24/7 lead-capturing machines — with your chatbot live on your site before you pay.";

export const OG_IMAGE_PATH = "/images/og-image.webp";

export const KEYWORDS = [
  "real estate chatbot",
  "AI lead capture",
  "real estate website automation",
  "agent chatbot",
  "24/7 lead generation",
  "proof before pay chatbot",
  "Dentrix Apps",
  "real estate AI",
  "listing chatbot",
  "property website chatbot",
] as const;

export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ogImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "Dentrix Apps — AI chatbots for real estate agents",
} as const;
