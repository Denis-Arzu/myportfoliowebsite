import type { Metadata, Viewport } from "next";
import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/ui/StructuredData";
import PrivacyBanner from "@/app/(home)/components/PrivacyBanner";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  ogImage,
} from "@/lib/seo";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050506",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [...KEYWORDS],
  authors: [{ name: "Dentrix Apps LLC" }],
  creator: "Dentrix Apps LLC",
  publisher: SITE_NAME,
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
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [ogImage],
  },
  category: "technology",
  classification: "Real Estate Technology, AI Chatbots, Lead Generation",
  icons: {
    icon: "/icon.webp",
    apple: "/icon.webp",
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
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href={absoluteUrl(ogImage.url)} />
      </head>
      <body
        className={`${geistMono.variable} ${geistSans.variable} font-mono antialiased`}
      >
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
