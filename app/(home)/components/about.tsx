"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

const pillars = [
  {
    id: "vision",
    label: "Vision",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    content:
      "To empower ambitious businesses with high-leverage AI and scalable infrastructure — turning complex technical challenges into durable competitive advantages.",
  },
  {
    id: "mission",
    label: "Mission",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    content:
      "Dentrix Apps designs and engineers software that performs at the frontier of what is possible. We combine AI product development, ultra-low-latency financial systems, and enterprise infrastructure into a single, precision-focused practice.",
  },
  {
    id: "origin",
    label: "Origin",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
    content:
      "Dentrix Apps was forged from a conscious departure from traditional education into engineering excellence. We chose depth over credentials — mastering systems that generate real, measurable output rather than following the expected path.",
  },
  {
    id: "standard",
    label: "Standard",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    content:
      "Quality at Dentrix Apps is non-negotiable. We are selective about every engagement — not to be exclusive, but because the only work worth doing is work we can stand behind completely. Every system we deliver is built to last.",
  },
];

export function About() {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  return (
    <div className="space-y-16 py-16">

      {/* ── Founder's Letter ──────────────────────────────────────────── */}
      <div className="space-y-10">
        {/* Pull-quote mission statement */}
        <blockquote className="relative border-l-2 border-[oklch(0.55_0.18_145)] pl-6 py-1">
          <p className="text-xl md:text-2xl font-semibold text-white leading-snug tracking-tight">
            "To empower ambitious businesses with high-leverage AI and scalable
            infrastructure — turning technical complexity into lasting competitive
            advantage."
          </p>
          <footer className="mt-3 text-sm text-gray-500 font-medium uppercase tracking-widest">
            — Dentrix Apps, founding principle
          </footer>
        </blockquote>

        {/* Narrative body */}
        <div className="space-y-4 text-gray-400 leading-relaxed max-w-3xl">
          <p>
            Dentrix Apps was not born in a classroom. We stepped away from the
            conventional path of traditional education and chose engineering
            excellence instead — a deliberate, difficult decision that became the
            foundation of everything we build. That catalyst for disruption shapes
            every line of code we commit to our repositories and every deployment pipeline we engineer.
          </p>
          <p>
            Today, Dentrix Apps operates at the intersection of artificial
            intelligence, quantitative finance, and enterprise software architecture. We don't
            build generic tools. We architect high-leverage systems designed
            specifically to give the businesses we partner with a structural
            advantage in their markets.
          </p>
          <p>
            We are intentionally small and selective. Every engagement receives the
            full depth of Dentrix Apps' capability — not a fraction of it.
          </p>
        </div>
      </div>

      {/* ── Four Pillars ─────────────────────────────────────────────── */}
      <div>
        <p className="text-xs text-indigo-400/70 uppercase tracking-widest font-medium mb-5">
          What we stand for
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar) => {
            const isOpen = activePillar === pillar.id;
            return (
              <motion.button
                key={pillar.id}
                onClick={() => setActivePillar(isOpen ? null : pillar.id)}
                className="text-left rounded-xl p-5 backdrop-blur-sm transition-all duration-200"
                style={{
                  background: isOpen
                    ? "oklch(0.52 0.24 264 / 0.08)"
                    : "oklch(1 0 0 / 0.03)",
                  border: isOpen
                    ? "1px solid oklch(0.52 0.24 264 / 0.5)"
                    : "1px solid oklch(1 0 0 / 0.05)",
                  boxShadow: isOpen ? "inset 0 0 20px oklch(0.52 0.24 264 / 0.1)" : "none",
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-lg"
                    style={{
                      background: "oklch(0.52 0.24 264 / 0.12)",
                      border: "1px solid oklch(0.52 0.24 264 / 0.3)",
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={pillar.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white uppercase tracking-wider">
                    {pillar.label}
                  </span>
                  <motion.span
                    className="ml-auto text-gray-600 text-lg leading-none"
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
                  <p className="text-sm text-gray-400 leading-relaxed pt-1">
                    {pillar.content}
                  </p>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 pt-2">
        <a
          href="https://wa.me/254111480091"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black transition-colors duration-200"
          style={{ background: "oklch(0.55 0.18 145)" }}
        >
          Start a conversation ➜
        </a>
        <span className="text-xs text-gray-600">
          Dentrix Apps · Remote-first · Global delivery
        </span>
      </div>
    </div>
  );
}
