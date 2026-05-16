"use client";

import Navbar from "@/app/(home)/components/navbar";
import { ContactSection } from "@/app/(home)/components/ContactSection";
import { SiteFooter } from "@/app/(home)/components/SiteFooter";
import { ChatAgentPanel } from "@/app/(home)/components/ChatAgentPanel";

export function ContactPageView() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col bg-[#050506] text-foreground">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,oklch(0.55_0.12_145/0.08),transparent)]" />
      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-6">
          <Navbar minimal isBackMode />
        </div>
        <ContactSection />
        <SiteFooter />
      </div>
      <ChatAgentPanel />
    </main>
  );
}
