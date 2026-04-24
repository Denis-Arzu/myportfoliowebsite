"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ShinyText } from "@/components/ui/shiny-text";
import { servicesContent } from "@/lib/content-data";

const colors = [
  "oklch(0.52 0.24 264 / 0.55)", // indigo
  "oklch(0.55 0.18 145 / 0.55)", // green
  "oklch(0.65 0.15 60 / 0.55)", // orange
  "oklch(0.60 0.22 300 / 0.55)", // purple
  "oklch(0.65 0.15 150 / 0.55)", // cyan
  "oklch(0.70 0.15 80 / 0.55)", // yellow/lime
  "oklch(0.55 0.18 245 / 0.55)", // blue
  "oklch(0.52 0.24 264 / 0.55)", // indigo (repeat)
];

const spans = [
  "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", // row 1: 3 items
  "lg:col-span-6", "lg:col-span-6", // row 2: 2 items
  "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", // row 3: 3 items
];

function ServiceCard({ service, index }: { service: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accentColor = colors[index % colors.length];
  const span = spans[index % spans.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl overflow-hidden bg-[oklch(0_0_0/0.9)] flex flex-col gap-5 p-6 sm:p-7 min-h-[400px] ${span}`}
      style={{
        border: `1px solid ${accentColor.replace("0.55)", "0.3)")}`,
        boxShadow: `0 0 0 1px ${accentColor.replace("0.55)", "0.08)")}, inset 0 0 30px ${accentColor.replace("0.55)", "0.05)")}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0.55 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `radial-gradient(ellipse at 22% 18%, ${accentColor.replace("0.55)", "0.14)")} 0%, transparent 62%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />

      <div className="relative z-10 flex items-start justify-between">
        <div
          className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0 text-xl"
          style={{
            background: accentColor.replace("0.55)", "0.12)"),
            border: `1px solid ${accentColor}`,
          }}
        >
          {service.icon}
        </div>
      </div>

      <div className="relative z-10 space-y-1">
        <h3 className="text-lg font-bold">
          <ShinyText speed={hovered ? 2 : 5}>{service.title}</ShinyText>
        </h3>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{service.price_anchor}</p>
      </div>

      <p className="relative z-10 text-sm text-gray-400 leading-relaxed flex-1">{service.outcome_description}</p>

      {service.live_product && (
        <div className="relative z-10 flex flex-wrap gap-1.5 mt-2">
          <span className="text-xs text-gray-500 italic" style={{ color: accentColor.replace("0.55)", "0.9)") }}>
            ↳ Live: {service.live_product}
          </span>
        </div>
      )}

      <div className="relative z-10 mt-2">
         <p className="text-[10px] text-gray-500 uppercase mb-2">Tech Stack</p>
         <div className="flex flex-wrap gap-2">
          {service.tech_stack.map((tech: string) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full text-gray-300 font-mono"
              style={{
                background: accentColor.replace("0.55)", "0.08)"),
                border: `1px solid ${accentColor.replace("0.55)", "0.3)")}`,
              }}
            >
              {tech}
            </span>
          ))}
         </div>
      </div>

      <div className="relative z-10 mt-4 border-t border-white/10 pt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500 italic line-clamp-1 flex-1 pr-2">Best for: {service.ideal_for}</p>
        <a 
          href="#contact"
          className="text-xs font-bold shrink-0 hover:underline"
          style={{ color: accentColor.replace("0.55)", "0.9)") }}
        >
          {service.cta_label}
        </a>
      </div>
    </motion.div>
  );
}

export const SkillsSection = () => (
  <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 py-16">
        {servicesContent.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  </div>
);
