"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import { CursorGradient } from "./components/CursorGradient";
import { SiteFooter } from "./components/SiteFooter";

const ChatAgentPanel = dynamic(
  () => import("./components/ChatAgentPanel").then((m) => m.ChatAgentPanel),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col bg-[#050506] text-foreground overflow-hidden">
      {/* Subtle grid + vignette */}
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

      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">
          <Navbar minimal />
          <div className="flex-1 flex flex-col justify-center py-20 sm:py-24">
            <HeroSection />
          </div>
        </div>
        <SiteFooter />
      </div>

      <ChatAgentPanel />
    </main>
  );
}
