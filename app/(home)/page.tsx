"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import { CursorGradient } from "./components/CursorGradient";
import { SiteFooter } from "./components/SiteFooter";
import { SpaceChatOverlay } from "./components/SpaceChatOverlay";

// Keep the panel for /contact page — not used here but exported symbol stays live
const ChatAgentPanel = dynamic(
  () => import("./components/ChatAgentPanel").then((m) => m.ChatAgentPanel),
  { ssr: false },
);

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <main className="relative min-h-[100dvh] flex flex-col bg-[#050506] text-foreground overflow-hidden">
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

      {/* Hero — fades out when chat opens */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col min-h-[100dvh]"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">
              <Navbar minimal />
              <div className="flex-1 flex flex-col justify-center py-20 sm:py-24">
                <HeroSection onOpenChat={openChat} />
              </div>
            </div>
            <SiteFooter />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Space chat — mounts over everything */}
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

      <ChatAgentPanel />
    </main>
  );
}
