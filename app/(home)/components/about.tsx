"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { aboutContent } from "@/lib/content-data";

const iconMap: Record<string, string> = {
  Vision: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  Mission: "M13 10V3L4 14h7v7l9-11h-7z",
  Origin: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
  Standard: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
};

export function About() {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const { sectionTitle, founderName, founderTitle, paragraphs, pillars } = aboutContent;

  return (
    <div className="space-y-16 py-16">

      {/* ── Founder's Story ──────────────────────────────────────────── */}
      <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-white/70 tracking-tight">
          {sectionTitle}
        </h2>

        {/* Founder signature */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
            <span className="text-xs text-white/40 font-mono">DK</span>
          </div>
          <div>
            <p className="text-sm text-white/60 font-medium">{founderName}</p>
            <p className="text-xs text-white/30 font-mono">{founderTitle}</p>
          </div>
        </div>

        {/* Narrative body */}
        <div className="space-y-4 text-white/40 leading-relaxed max-w-3xl">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* ── Four Pillars ─────────────────────────────────────────────── */}
      <div>
        <p className="text-xs text-white/25 uppercase tracking-widest font-medium mb-5">
          What we stand for
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar) => {
            const isOpen = activePillar === pillar.title;
            return (
              <motion.button
                key={pillar.title}
                onClick={() => setActivePillar(isOpen ? null : pillar.title)}
                className="text-left rounded-xl p-5 backdrop-blur-sm transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white/30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={iconMap[pillar.title] || ""} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
                    {pillar.title}
                  </span>
                  <motion.span
                    className="ml-auto text-white/20 text-lg leading-none"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-white/35 leading-relaxed pt-1">
                    {pillar.text}
                  </p>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black transition-colors duration-200 whitespace-nowrap"
          style={{ background: "oklch(0.55 0.18 145)" }}
        >
          Start a conversation ➜
        </a>
        <span className="text-xs text-white/25 leading-relaxed">
          Built in Nairobi. Serving creators, brands, and businesses worldwide.
        </span>
      </div>
    </div>
  );
}
