import type { Metadata } from "next";
import { Work_Sans, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { StructuredData } from "@/components/ui/StructuredData";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: 'swap',
});

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
  title: "Dentrix Apps | High-Performance Software Engineering",
  description: "Dentrix Apps - High-performance software engineering lab specializing in AI SaaS and Trading engines.",
  keywords: ["Dentrix Apps", "AI SaaS", "algorithmic trading", "software engineering", "Next.js", "Flutter", "fintech Kenya", "enterprise software", "scalable applications", "high-performance software", "AI development", "quantitative finance", "software solutions", "technology innovation", "software development", "AI-powered applications", "trading platforms", "fintech solutions", "software engineering lab", "AI software", "trading engines", "scalable software", "high-performance applications", "software engineering company", "AI development company", "algorithmic trading software", "enterprise software solutions", "scalable applications development", "high-performance software engineering", "AI SaaS solutions", "quantitative finance software", "technology innovation company", "software development services", "AI-powered applications development", "trading platforms development", "fintech solutions provider"],
  authors: [{ name: "Dentrix Apps" }],
  openGraph: {
    title: "Dentrix Apps | High-Performance Software Engineering",
    description: "AI SaaS, Algorithmic Trading Engines & Enterprise Apps — built to scale, perform, and disrupt. Crafting the future of software with precision and innovation.",
    siteName: "Dentrix Apps",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
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
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${workSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScroll>
          <ThemeWrapper>
            <StructuredData />
            {children}
          </ThemeWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
