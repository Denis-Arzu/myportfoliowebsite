"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import LiveDemosSection from "./components/LiveDemosSection";
import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import { CursorGradient } from "./components/CursorGradient";
import { SiteFooter } from "./components/SiteFooter";
import { LoadingScreen } from "./components/LoadingScreen";
import { initHashScroll } from "@/lib/smooth-scroll";

const SpaceChatOverlay = dynamic(
  () => import("./components/SpaceChatOverlay").then((m) => m.SpaceChatOverlay),
  { ssr: false },
);

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  // Listen for custom "open-chat" event from FAQSection
  useEffect(() => {
    const handler = () => openChat();
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, [openChat]);

  // Initialize hash scroll (handles direct URL hash navigation)
  useEffect(() => {
    const cleanup = initHashScroll();
    return cleanup;
  }, []);

  return (
    <main className="relative min-h-[100dvh] flex flex-col bg-[#050506] text-foreground overflow-hidden">
      {/* Loading screen */}
      <LoadingScreen />

      {/* Grid + vignette */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.35] -z-10"
        style={{
          backgroundImage: `
            linear-gradient(oklch(1 0 0 / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0 / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.12_145/0.12),transparent)] -z-10" />
      <CursorGradient />

      {/* Main content — fades when chat opens */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            key="page-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {/* Hero section */}
            <section className="relative flex flex-col min-h-[100dvh] pt-24 sm:pt-28">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col justify-center py-12 sm:py-16">
                  <HeroSection onOpenChat={openChat} />
                </div>
              </div>
            </section>

            {/* New sections */}
            <HowItWorksSection />
            <LiveDemosSection />
            <FeaturesSection />
            <PricingSection />
            <FAQSection />
            <CTASection onOpenChat={openChat} />

            <SiteFooter />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Space chat — mounts on demand */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            key="space-chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[600]"
          >
            <SpaceChatOverlay onClose={closeChat} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
