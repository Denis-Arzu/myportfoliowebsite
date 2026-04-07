"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShinyText } from "@/components/ui/shiny-text";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface Phase {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  systemPerformance: number;   // 0–100
  deliverables: string[];
  accentColor: string;
  icon: string;
  span: "double" | "single";
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const phases: Phase[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    tagline: "Understand before building.",
    description:
      "We open every engagement with structured discovery: stakeholder interviews, system audits, and threat-modelling sessions. This phase produces the blueprint that every subsequent decision references. No assumptions — only verified constraints.",
    systemPerformance: 95,
    deliverables: [
      "Technical requirements specification",
      "Architecture decision record (ADR)",
      "Risk register",
    ],
    accentColor: "oklch(0.52 0.24 264 / 0.55)",   // indigo
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    span: "single",
  },
  {
    id: "architecture",
    number: "02",
    title: "Architecture",
    tagline: "Design for the load you will carry.",
    description:
      "Dentrix Apps architects systems to absorb a 10× traffic spike without re-engineering. We specify data flows, API contracts, and infrastructure topologies before a single line of production code is written — eliminating costly late-stage pivots.",
    systemPerformance: 97,
    deliverables: [
      "System design diagrams (C4 model)",
      "API contract (OpenAPI / AsyncAPI)",
      "Infrastructure-as-code scaffolding",
    ],
    accentColor: "oklch(0.55 0.18 145 / 0.55)",   // green
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    span: "double",
  },
  {
    id: "intelligence",
    number: "03",
    title: "Intelligence",
    tagline: "AI that earns its place in the stack.",
    description:
      "We integrate AI as a first-class engineering concern — not a bolt-on. RAG pipelines are tuned for retrieval precision, LLM agents are constrained by typed tool schemas, and every model interaction is observable, auditable, and cost-bounded.",
    systemPerformance: 90,
    deliverables: [
      "RAG pipeline benchmarks",
      "Agent capability specification",
      "Model cost & latency SLA",
    ],
    accentColor: "oklch(0.60 0.22 300 / 0.55)",   // purple
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    span: "single",
  },
  {
    id: "optimization",
    number: "04",
    title: "Optimization",
    tagline: "Ship, measure, compound.",
    description:
      "Dentrix Apps treats the post-launch phase as the start of the value curve, not the end. We instrument every critical path, run structured performance reviews, and deliver iterative improvements driven by real data — not speculation.",
    systemPerformance: 92,
    deliverables: [
      "Observability dashboard (metrics + traces)",
      "Quarterly performance review",
      "Continuous delivery pipeline",
    ],
    accentColor: "oklch(0.65 0.15 60 / 0.55)",    // orange
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    span: "single",
  },
];

/* ─── Performance Arc ─────────────────────────────────────────────────────── */

function PerformanceArc({ value, accent }: { value: number; accent: string }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  const color = accent.replace("0.55)", "0.9)");

  return (
    <div className="flex flex-col items-center" title={`System performance: ${value}%`}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="2.2" />
        <motion.circle
          cx="22" cy="22" r={r}
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 22 22)"
          initial={{ strokeDasharray: `0 ${circ}` }}
          whileInView={{ strokeDasharray: `${dash} ${circ}` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
        <text x="22" y="26" textAnchor="middle" fontSize="9" fill={color} fontFamily="monospace" fontWeight="700">
          {value}%
        </text>
      </svg>
      <span className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5 font-medium">perf</span>
    </div>
  );
}

/* ─── Phase Card ─────────────────────────────────────────────────────────── */

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/55 flex flex-col gap-4 p-6
        ${phase.span === "double" ? "lg:col-span-2" : "col-span-1"}
      `}
      style={{ border: `1px solid ${phase.accentColor}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `radial-gradient(ellipse at 20% 30%, ${phase.accentColor.replace("0.55)", "0.09)")} 0%, transparent 65%)`,
        }}
      />

      {/* Header row: phase number + performance arc */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Phase number badge */}
          <div
            className="text-xs font-black font-mono px-2.5 py-1 rounded-lg shrink-0"
            style={{
              background: phase.accentColor.replace("0.55)", "0.12)"),
              border: `1px solid ${phase.accentColor}`,
              color: phase.accentColor.replace("0.55)", "0.95)"),
            }}
          >
            {phase.number}
          </div>

          {/* Icon */}
          <div
            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
            style={{
              background: phase.accentColor.replace("0.55)", "0.10)"),
              border: `1px solid ${phase.accentColor}`,
            }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={phase.icon} />
            </svg>
          </div>
        </div>

        <PerformanceArc value={phase.systemPerformance} accent={phase.accentColor} />
      </div>

      {/* Title + tagline */}
      <div className="relative z-10 space-y-1">
        <h3 className="text-lg font-bold">
          <ShinyText speed={hovered ? 2 : 5}>{phase.title}</ShinyText>
        </h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest">{phase.tagline}</p>
      </div>

      {/* Description */}
      <p className="relative z-10 text-sm text-gray-400 leading-relaxed flex-1">{phase.description}</p>

      {/* Deliverables toggle */}
      <div className="relative z-10">
        <button
          onClick={() => setOpen(o => !o)}
          className="text-xs text-gray-600 hover:text-gray-300 transition-colors flex items-center gap-1"
        >
          <motion.span animate={{ rotate: open ? 90 : 0 }} className="inline-block">
            ▶
          </motion.span>
          {open ? "Hide deliverables" : "View deliverables"}
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              key="deliverables"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-2 space-y-1"
            >
              {phase.deliverables.map((d) => (
                <li
                  key={d}
                  className="text-xs font-mono text-gray-500 leading-relaxed flex items-start gap-2"
                >
                  <span style={{ color: phase.accentColor.replace("0.55)", "0.8)") }} className="mt-0.5 shrink-0">→</span>
                  {d}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Section export ─────────────────────────────────────────────────────── */

export function EngineeringStandards() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center justify-center gap-2 mt-3 mb-6">
          <h2 className="text-2xl font-bold text-indigo-400 underline underline-offset-8 decoration-4 decoration-indigo-500/60">
            Engineering Standards
          </h2>
          <p className="text-sm text-gray-500 max-w-md text-center">
            Four non-negotiable phases that underpin every Dentrix Apps engagement.
          </p>
        </div>

        {/* Bento grid — asymmetric, mirrors Capabilities layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
