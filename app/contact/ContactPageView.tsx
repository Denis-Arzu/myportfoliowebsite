"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/app/(home)/components/navbar";
import { ContactSection } from "@/app/(home)/components/ContactSection";
import { SiteFooter } from "@/app/(home)/components/SiteFooter";
import dynamic from "next/dynamic";

const SpaceChatOverlay = dynamic(
  () =>
    import("@/app/(home)/components/SpaceChatOverlay").then(
      (m) => m.SpaceChatOverlay,
    ),
  { ssr: false },
);

export function ContactPageView() {
  const [chatOpen, setChatOpen] = useState(false);
  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <main className="relative min-h-[100dvh] flex flex-col bg-[#050506] text-foreground">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,oklch(0.55_0.12_145/0.08),transparent)]" />

      {/* Page content — fades out when chat opens */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            key="contact-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col min-h-[100dvh]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-6">
              <Navbar minimal isBackMode />
            </div>
            <ContactSection onOpenChat={openChat} />
            <SiteFooter />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Space chat overlay */}
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
