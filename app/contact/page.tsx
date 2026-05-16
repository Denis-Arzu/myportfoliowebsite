import type { Metadata } from "next";
import { ContactPageView } from "./ContactPageView";
import { SITE_NAME, absoluteUrl, ogImage } from "@/lib/seo";

const title = "Contact";
const description =
  "Book a discovery call or message Dentrix Apps. We scope your real estate AI chatbot and show a live preview on your website before you pay.";

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
