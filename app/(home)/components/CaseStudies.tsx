"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface CaseStudy {
  id: string;
  title: string;
  visual: string;
  visualAlt: string;
  problem: string;
  process: string;
  stack: string;
  impact: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "maganji-engine",
    title: "Maganji Engine | Quant Execution Platform",
    visual: "/images/projects/maganji-screenshot.png",
    visualAlt: "Maganji Engine dashboard screenshot",
    problem:
      "US-focused trading teams required low-latency execution reliability under volatile market conditions.",
    process:
      "Implemented modular execution services, hardened fault-tolerant order flows, and telemetry-driven optimization loops.",
    stack: "Python, FastAPI, Redis, Next.js, AWS",
    impact:
      "Reduced order round-trip latency by 38% and increased strategy deployment throughput by 2.1x.",
  },
  {
    id: "tuandike-platform",
    title: "Tuandike | AI Learning Infrastructure",
    visual: "/images/projects/tuandike-screenshot.png",
    visualAlt: "Tuandike platform screenshot",
    problem:
      "A growing digital learning product needed scalable content generation and dependable user experience at peak load.",
    process:
      "Refactored service boundaries, introduced queue-based AI workloads, and shipped performance-focused UI sessions.",
    stack: "Next.js, TypeScript, Python, PostgreSQL, AWS",
    impact:
      "Increased active session stability to 99.9% and improved content response speed by 46%.",
  },
];

const logos = ["React", "Next.js", "Python", "AWS"];

const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 terminal-scanlines opacity-60 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-[oklch(0.85_0.3_150)] text-xs tracking-[0.2em] uppercase">
            Enterprise Delivery Evidence
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
            Case Studies / Engineering Outcomes
          </h2>
          <p className="mt-3 text-sm text-[oklch(0.85_0_0)]/85 max-w-3xl">
            Built for decision-makers seeking measurable software outcomes across compliance,
            uptime, and infrastructure performance.
          </p>
        </header>

        <div className="space-y-6">
          {caseStudies.map((study, idx) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="grid grid-cols-1 lg:grid-cols-2 terminal-panel"
            >
              <div className="relative min-h-[260px] border-b lg:border-b-0 lg:border-r border-[oklch(0.85_0.3_150/0.25)]">
                <Image
                  src={study.visual}
                  alt={study.visualAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={idx === 0}
                />
                <div className="absolute inset-x-0 bottom-0 bg-[oklch(0_0_0/0.88)] border-t border-[oklch(0.85_0.3_150/0.3)] px-4 py-2">
                  <p className="text-xs text-[oklch(0.9_0.03_150)] tracking-wider uppercase">
                    {study.title}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 font-mono text-sm space-y-3">
                <p className="text-[oklch(0.9_0.03_150)]">[Problem_Identified]</p>
                <p className="text-white/90">{study.problem}</p>

                <p className="text-[oklch(0.9_0.03_150)]">[Engineering_Process]</p>
                <p className="text-white/90">{study.process}</p>

                <p className="text-[oklch(0.9_0.03_150)]">[Tech_Stack]</p>
                <p className="text-white/90">{study.stack}</p>

                <p className="text-[oklch(0.9_0.03_150)]">[Measurable_Impact]</p>
                <p className="text-white/90">{study.impact}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden border border-[oklch(0.85_0.3_150/0.25)] bg-black">
          <div className="flex min-w-max animate-marquee gap-6 px-3 py-3">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="text-sm font-mono text-white/85 border border-white/20 px-4 py-1"
                aria-label={`${logo} technology competency`}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
