"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { whyUsContent } from "@/lib/content-data";
import { Settings, Zap, Globe, ShieldCheck } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Settings: <Settings className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
};

function PillarCard({ pillar, index }: { pillar: typeof whyUsContent.pillars[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden flex flex-col gap-4 p-6"
      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.015) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="text-white/25">
          {iconMap[pillar.icon] || <Settings className="w-4 h-4" />}
        </div>
      </div>

      <div className="relative z-10 space-y-1">
        <h3 className="text-base font-semibold text-white/80">{pillar.title}</h3>
      </div>

      <p className="relative z-10 text-sm text-white/35 leading-relaxed flex-1">{pillar.description}</p>
    </motion.div>
  );
}

export function EngineeringStandards() {
  const { sectionTitle, sectionSubtitle, pillars } = whyUsContent;

  return (
    <div id="why-us" className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 mt-3 mb-6">
          <h2 className="text-xl font-semibold text-white/60 tracking-wide">
            {sectionTitle}
          </h2>
          <p className="text-sm text-white/40 max-w-md text-center">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
