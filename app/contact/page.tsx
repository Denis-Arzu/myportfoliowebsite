import type { Metadata } from "next";
import { ContactPageView } from "./ContactPageView";
import { SITE_NAME, absoluteUrl, ogImage } from "@/lib/seo";

const title = "Get Your Free AI Assistant Demo";
const description =
  "Tell us about your salon, gym, or dental practice. We'll build your AI assistant from your website and send you a free live demo - same day. No credit card required.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/contact"),
    type: "website",
    images: [ogImage],
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [ogImage],
  },
};

export default function ContactPage() {
  return <ContactPageView />;
}
