"use client";

import { motion } from "motion/react";
import { Sparkles, Flame, Smile } from "lucide-react";

const demoItems = [
  {
    industry: "salon",
    icon: Sparkles,
    title: "Salon & Spa",
    description: "Warm, pampering, upselling treatments and booking appointments.",
    demoUrl: "https://ameerahspa.dentrixapps.com",
    ctaLabel: "Try Salon Demo",
    accentColor: "#D4AF37",
    bgGlow: "oklch(0.75 0.15 85 / 0.06)",
    borderGlow: "oklch(0.75 0.15 85 / 0.15)",
  },
  {
    industry: "gym",
    icon: Flame,
    title: "Gym & Fitness",
    description: "Energetic, motivating, crushing objections and booking tours.",
    demoUrl: "https://fitzone.dentrixapps.com",
    ctaLabel: "Try Gym Demo",
    accentColor: "#FF5722",
    bgGlow: "oklch(0.65 0.2 35 / 0.06)",
    borderGlow: "oklch(0.65 0.2 35 / 0.15)",
  },
  {
    industry: "dental",
    icon: Smile,
    title: "Dental Practice",
    description: "Professional, reassuring, easing anxiety and scheduling consultations.",
    demoUrl: "https://brightsmile.dentrixapps.com",
    ctaLabel: "Try Dental Demo",
    accentColor: "#2E86AB",
    bgGlow: "oklch(0.6 0.12 220 / 0.06)",
    borderGlow: "oklch(0.6 0.12 220 / 0.15)",
  },
];

const demoEasing = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: demoEasing },
  }),
};

export default function LiveDemosSection() {
  return (
    <section id="demos" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-[oklch(0.55_0.18_145/0.03)] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            See It Live
          </h2>
          <p className="mt-4 text-base text-white/40 max-w-lg mx-auto">
            Don&apos;t take our word for it. Chat with a real AI assistant right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.industry}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative group rounded-2xl border p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]"
                style={{
                  borderColor: item.borderGlow,
                  background: `linear-gradient(180deg, ${item.bgGlow}, transparent)`,
                }}
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full mb-6"
                  style={{ backgroundColor: `${item.accentColor}18` }}
                >
                  <Icon className="w-7 h-7" style={{ color: item.accentColor }} />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-8">
                  {item.description}
                </p>

                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 mt-auto"
                  style={{
                    backgroundColor: item.accentColor,
                    boxShadow: `0 0 20px ${item.accentColor}30`,
                  }}
                >
                  {item.ctaLabel}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-white/25 font-mono">
          These are live AI assistants powered by real business data. Try asking about services, pricing, or booking.
        </p>
      </div>
    </section>
  );
}
