import type { Metadata } from "next";
import { Work_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider'; // Named import

// 1. Font configurations
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Denis Webdev | Portfolio",
  description: "Generated by create next app",
}; 

// 2. Fixed ThemeWrapper component
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

// 3. Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${workSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}