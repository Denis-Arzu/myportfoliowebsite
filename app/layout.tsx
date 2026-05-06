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
    default: "Dentrix Apps | AI Voice Studio — Voiceovers, Cloning & Dubbing",
    template: "%s | Dentrix Apps"
  },
  description: "Professional AI voice services: voiceovers, voice cloning, multilingual dubbing, and voice agents. Built for creators, brands, and businesses who refuse to sound amateur. Same-day delivery. Studio quality. Based in Nairobi, serving globally.",
  keywords: [
    "AI voiceover service",
    "AI voice cloning",
    "multilingual dubbing",
    "SSML voice enhancement",
    "YouTube intro voiceover",
    "podcast ad voice",
    "professional AI voice",
    "voice agent development",
    "ElevenLabs expert",
    "AI audio production",
    "voice localization",
    "brand voice cloning",
    "AI voice studio",
    "e-learning narration",
    "commercial voiceover AI"
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
    title: "Dentrix Apps | AI Voice Studio — Your Brand's Voice, Engineered",
    description: "Professional AI voiceovers, voice cloning, and multilingual dubbing. Same-day delivery. Studio quality. Built for creators and brands who refuse to sound amateur.",
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
        alt: "Dentrix Apps | AI Voice Studio — Voiceovers, Cloning & Dubbing",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dentrixapps",
    creator: "@deniskiooko",
    title: "Dentrix Apps | AI Voice Studio",
    description: "Professional AI voiceovers, voice cloning & multilingual dubbing. Same-day delivery. Studio quality. Nairobi-based, globally served.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dentrix Apps - AI Voice Studio",
      }
    ],
  },
  metadataBase: new URL("https://dentrixapps.com"),
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  category: "technology",
  classification: "AI Voice Services, Voice Cloning, Audio Production, Dubbing",
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
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
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
