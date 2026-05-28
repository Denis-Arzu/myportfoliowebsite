import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Do Not Sell My Personal Information",
  description:
    "Opt out of the sale of your personal information under CCPA. DentrixApps respects your privacy rights.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: absoluteUrl("/do-not-sell"),
  },
};

export default function DoNotSellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
