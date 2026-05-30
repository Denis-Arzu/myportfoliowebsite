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
  authors: [{ name: "DentrixApps LLC" }],
  creator: "DentrixApps LLC",
  publisher: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
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
      "en": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  other: {
    "google-site-verification": "YOUR_VERIFICATION_CODE_HERE",
    "msvalidate.01": "YOUR_BING_VERIFICATION_CODE_HERE",
    "theme-color": "#050506",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=yes, email=yes, address=yes",
  },
  openGraph: {
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [ogImage],
    countryName: "United States",
    emails: ["ceo@dentrixapps.com"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dentrixapps",
    creator: "@dentrixapps",
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    images: [ogImage],
  },
  category: "technology",
  classification: "AI Chatbots, Lead Generation, Salon Technology, Gym Technology, Dental Technology, Small Business Software",
  icons: {
    icon: [
      { url: "/icon.webp", type: "image/webp" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.webp", type: "image/webp" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
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
