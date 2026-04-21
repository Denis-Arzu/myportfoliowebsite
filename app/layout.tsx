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
    default: "Dentrix Apps | High-Performance Software Engineering Lab",
    template: "%s | Dentrix Apps"
  },
  description: "Dentrix Apps is a US-focused software engineering lab specializing in algorithmic trading engines (C++/Python), Next.js 16 architectures, and AI SaaS integrations. We build B2B digital infrastructure.",
  keywords: ["Dentrix Apps", "AI SaaS", "algorithmic trading", "software engineering", "Next.js", "Flutter", "enterprise software", "scalable applications", "high-performance software", "AI development", "quantitative finance", "digital infrastructure", "trading platforms", "fintech solutions"],
  authors: [{ name: "Dentrix Apps" }],
  alternates: {
    canonical: "https://dentrixapps.com",
  },
  openGraph: {
    title: "Dentrix Apps | High-Performance Software Engineering Lab",
    description: "Dentrix Apps is a US-focused software engineering lab specializing in algorithmic trading engines (C++/Python), Next.js 16 architectures, and AI SaaS integrations. We build B2B digital infrastructure.",
    siteName: "Dentrix Apps LLC",
    url: "https://dentrixapps.com",
    type: "website",
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.png'
  },
  manifest: '/manifest.json',
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
