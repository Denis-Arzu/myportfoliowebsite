"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { processContent } from "@/lib/content-data";

function ProcessCard({ step, index }: { step: typeof processContent.steps[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden p-6 flex flex-col gap-4"
      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.015) 0%, transparent 70%)" }}
      />

      <span className="text-xs font-mono text-white/20 tabular-nums relative z-10">{step.number}</span>

      <div className="relative z-10 space-y-1">
        <h3 className="text-base font-semibold text-white/80">{step.title}</h3>
      </div>

      <p className="relative z-10 text-sm text-white/35 leading-relaxed flex-1">
        {step.description}
      </p>

      <motion.div
        className="relative z-10 flex flex-wrap gap-2"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.25 }}
      >
        {step.deliverables.map((chip) => (
          <span
            key={chip}
            className="text-xs px-2 py-0.5 rounded-full text-white/30 font-mono"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {chip}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function MethodologySection() {
  const { sectionTitle, sectionSubtitle, steps } = processContent;

  return (
    <section id="services" className="relative py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl font-semibold text-white/60 tracking-wide mb-3">
            {sectionTitle}
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <ProcessCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
