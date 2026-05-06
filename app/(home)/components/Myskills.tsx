"use client";
import React from "react";
import { motion } from "motion/react";
import { servicesContent } from "@/lib/content-data";
import { Mic, Copy, Globe, Phone, Code2 } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Mic: <Mic className="w-4 h-4" />,
  Copy: <Copy className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Phone: <Phone className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
};

function ServiceCard({ service, index }: { service: typeof servicesContent[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden flex flex-col gap-5 p-6 sm:p-7 min-h-[360px]"
      style={{
        border: "1px solid rgba(255,255,255,0.05)",
        background: "transparent",
      }}
    >
      {/* Icon */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0 text-white/25 border border-white/10">
          {iconMap[service.icon] || <Mic className="w-4 h-4" />}
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-white/25 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 space-y-1">
        <h3 className="text-base font-semibold text-white/80">{service.title}</h3>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-mono">{service.outcomeTitle}</p>
      </div>

      <p className="relative z-10 text-sm text-white/35 leading-relaxed flex-1">{service.description}</p>

      {/* Deliverables */}
      <div className="relative z-10 space-y-1.5">
        <p className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Deliverables</p>
        <ul className="space-y-1">
          {service.deliverables.map((d) => (
            <li key={d} className="text-xs text-white/30 flex items-start gap-2">
              <span className="text-white/15 mt-0.5 shrink-0">→</span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom row: price + delivery + CTA */}
      <div className="relative z-10 mt-auto pt-4 border-t border-white/5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-mono text-white/60">{service.startingPrice}</span>
          <span className="text-[10px] text-white/25 font-mono uppercase">{service.deliveryTime}</span>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-black transition-colors"
          style={{ background: "oklch(0.55 0.18 145)" }}
        >
          Get Started
        </a>
      </div>
    </motion.div>
  );
}

export const SkillsSection = () => (
  <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/* Inlined Myskillssectitle */}
      <div className='mt-3 mb-4 flex flex-col items-center justify-center gap-2'>
        <h2 className='text-xl font-semibold text-white/60 tracking-wide'>
          Services
        </h2>
        <p className='text-sm text-white/40 max-w-md text-center'>
          Every voice need, covered. From a single YouTube intro to a multilingual empire.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-16">
        {servicesContent.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  </div>
);
