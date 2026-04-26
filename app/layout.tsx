import type { Metadata } from "next";
import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { StructuredData } from "@/components/ui/StructuredData";
import PrivacyBanner from "@/app/(home)/components/PrivacyBanner";


const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Dentrix Apps | Algorithmic Trading Engines & AI Automation Systems",
    template: "%s | Dentrix Apps"
  },
  description: "Dentrix Apps is a US-focused software engineering lab building algorithmic trading engines (C++/Python), AI automation systems, and scalable Next.js applications. We engineer high-leverage infrastructure for quantitative firms, SaaS founders, and enterprise teams. Based in Nairobi, serving globally. Projects start at $100. Response <12 hours.",
  keywords: [
    "algorithmic trading developer",
    "C++ trading bot builder",
    "Python automation engineer",
    "custom web scraper development",
    "AI video generation system",
    "Next.js expert Kenya",
    "faceless YouTube automation",
    "quantitative systems architect",
    "data pipeline engineer",
    "Discord bot developer",
    "API integration specialist",
    "software engineering lab Nairobi",
    "offshore development team Africa"
  ],
  authors: [{ name: "Denis Kioko", url: "https://linkedin.com/in/denis-kioko-743234365" }],
  creator: "Denis Kioko",
  publisher: "Dentrix Apps",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://dentrixapps.com",
    languages: {
      en: "https://dentrixapps.com",
    },
  },
  openGraph: {
    title: "Dentrix Apps | We Engineer Systems That Print Money",
    description: "High-performance software engineering lab specializing in algorithmic trading engines, AI automation systems, and scalable infrastructure. C++/Python/Next.js. Based in Nairobi. Serving globally.",
    url: "https://dentrixapps.com",
    siteName: "Dentrix Apps",
    locale: "en_US",
    type: "website",
    alternateLocale: "en_GB",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dentrix Apps | Algorithmic Trading & AI Automation Lab",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dentrixapps",
    creator: "@deniskiooko",
    title: "Dentrix Apps | Algorithmic Trading & AI Automation Lab",
    description: "We build systems that print money. C++ trading engines. Data pipelines. Faceless video factories. Nairobi-based, globally served.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dentrix Apps - High-Performance Software Engineering Lab",
      }
    ],
  },
  metadataBase: new URL("https://dentrixapps.com"),
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  category: "technology",
  classification: "Software Engineering, Algorithmic Trading, AI Development",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
};

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/og-image.png" />
      </head>
      <body className={`${geistMono.variable} ${geistSans.variable} font-mono antialiased`}>
        <SmoothScroll>
          <ThemeWrapper>
            <StructuredData />
            {children}
            <PrivacyBanner />
          </ThemeWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
