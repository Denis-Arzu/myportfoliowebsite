"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShinyText } from "@/components/ui/shiny-text";
import {
  SiNextdotjs, SiReact, SiTypescript, SiPython,
  SiNodedotjs, SiFlutter, SiCplusplus,
} from "react-icons/si";
import { FaServer } from "react-icons/fa";

/* ─── Data ──────────────────────────────────────────────────────────────── */

interface TechChip {
  label: string;
  icon?: React.ReactNode;
}

interface Capability {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detail: string;
  mainProficiency: number;   // capability confidence (0–100)
  poweredBy: string[];       // product references
  chips: TechChip[];
  accentColor: string;       // oklch accent for border + glow
  span: "double" | "single"; // bento column span
  icon: string;              // SVG path
}

const capabilities: Capability[] = [
  {
    id: "ai-lab",
    title: "AI Intelligence Lab",
    tagline: "Custom agents. Intelligent products. Real outcomes.",
    description:
      "Dentrix Apps designs and ships AI-first SaaS platforms — from custom LLM agents and RAG pipelines to full-stack products like Tuandike, our AI-powered study platform. We treat intelligence as a first-class product feature, not an afterthought.",
    detail:
      "LLM fine-tuning · RAG architecture · AI agents · Next.js 16 · Python ML pipelines · Real-time inference · OpenAI / Anthropic APIs",
    mainProficiency: 90,
    poweredBy: ["Tuandike — AI Study Platform"],
    chips: [
      { label: "Next.js 16", icon: <SiNextdotjs className="text-white" /> },
      { label: "React 19",   icon: <SiReact className="text-blue-400" /> },
      { label: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
      { label: "Python",     icon: <SiPython className="text-yellow-400" /> },
      { label: "Node.js",    icon: <SiNodedotjs className="text-green-400" /> },
    ],
    accentColor: "oklch(0.52 0.24 264 / 0.55)",   // indigo
    span: "double",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    id: "quant",
    title: "Quantitative Systems",
    tagline: "Low-latency execution. Machine-speed alpha.",
    description:
      "Our C++ and Python trading engines form the backbone of Maganji — a high-performance algorithmic trading system. We architect quantitative strategies, backtest rigorously, and deploy onto hardened VPS infrastructure for 24/7 unattended operation.",
    detail:
      "C++ execution core · Expert Advisors · Python quant modelling · Deriv API · ZeroMQ · VPS deployment",
    mainProficiency: 88,
    poweredBy: ["Maganji Engine — Algorithmic Trading"],
    chips: [
      { label: "C++",     icon: <SiCplusplus className="text-blue-500" /> },
      { label: "Python",  icon: <SiPython className="text-yellow-400" /> },
      { label: "Systems", icon: <FaServer className="text-gray-400" /> },
    ],
    accentColor: "oklch(0.55 0.18 145 / 0.55)",   // green
    span: "single",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    id: "infra",
    title: "Scalable Infrastructure",
    tagline: "One codebase. Every platform. Zero compromise.",
    description:
      "We build the plumbing that enterprises rely on — from cross-platform Flutter mobile apps to serverless Next.js 16 backends. Our infrastructure decisions are made for the long term: maintainable, observable, and built to absorb growth.",
    detail:
      "Flutter (iOS & Android) · Next.js 16 SSR/SSG · Docker · CI/CD · REST & WebSocket APIs · Supabase · Vercel / Railway",
    mainProficiency: 85,
    poweredBy: ["Cross-platform mobile", "Enterprise web apps"],
    chips: [
      { label: "Flutter",    icon: <SiFlutter className="text-cyan-400" /> },
      { label: "Next.js 16", icon: <SiNextdotjs className="text-white" /> },
      { label: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
    ],
    accentColor: "oklch(0.65 0.15 60 / 0.55)",    // orange
    span: "single",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
];

/* ─── Individual Card ────────────────────────────────────────────────────── */

function CapabilityCard({ cap }: { cap: Capability }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/55 flex flex-col gap-5 p-6
        ${cap.span === "double" ? "lg:col-span-2" : "col-span-1"}
      `}
      style={{
        border: `1px solid ${cap.accentColor.replace("0.55)", "0.3)")}`,
        boxShadow: `inset 0 0 20px ${cap.accentColor.replace("0.55)", "0.05)")}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial glow — fades in on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `radial-gradient(ellipse at 25% 35%, ${cap.accentColor.replace("0.55)", "0.1)")} 0%, transparent 65%)`,
        }}
      />

      {/* Proficiency arc + icon row */}
      <div className="relative z-10 flex items-start justify-between">
        <div
          className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0"
          style={{
            background: cap.accentColor.replace("0.55)", "0.12)"),
            border: `1px solid ${cap.accentColor}`,
          }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={cap.icon} />
          </svg>
        </div>

        {/* Proficiency arc badge */}
        <ProficiencyArc value={cap.mainProficiency} accent={cap.accentColor} />
      </div>

      {/* Title — ShinyText for premium lustre */}
      <div className="relative z-10 space-y-1">
        <h3 className="text-lg font-bold">
          <ShinyText speed={hovered ? 2 : 5}>{cap.title}</ShinyText>
        </h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest">{cap.tagline}</p>
      </div>

      {/* Description */}
      <p className="relative z-10 text-sm text-gray-400 leading-relaxed flex-1">{cap.description}</p>

      {/* Powered-by label */}
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {cap.poweredBy.map((p) => (
          <span
            key={p}
            className="text-xs text-gray-500 italic"
            style={{ color: cap.accentColor.replace("0.55)", "0.9)") }}
          >
            ↳ {p}
          </span>
        ))}
      </div>

      {/* Tech chips */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {cap.chips.map((chip) => (
          <span
            key={chip.label}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full text-gray-300 font-mono"
            style={{
              background: cap.accentColor.replace("0.55)", "0.08)"),
              border: `1px solid ${cap.accentColor.replace("0.55)", "0.3)")}`,
            }}
          >
            {chip.icon && <span className="text-sm">{chip.icon}</span>}
            {chip.label}
          </span>
        ))}
      </div>

      {/* Expandable detail — toggle */}
      <div className="relative z-10">
        <button
          onClick={() => setExpanded(e => !e)}
          className="text-xs text-gray-600 hover:text-gray-300 transition-colors flex items-center gap-1"
        >
          <motion.span animate={{ rotate: expanded ? 90 : 0 }} className="inline-block">
            ▶
          </motion.span>
          {expanded ? "Less detail" : "Full stack"}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.p
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden text-xs text-gray-500 mt-2 leading-relaxed font-mono"
            >
              {cap.detail}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── SVG Proficiency Arc ────────────────────────────────────────────────── */

function ProficiencyArc({ value, accent }: { value: number; accent: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  const color = accent.replace("0.55)", "0.9)");

  return (
    <div className="flex flex-col items-center gap-0.5" title={`${value}% capability`}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        {/* Track */}
        <circle cx="24" cy="24" r={r} fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="2.5" />
        {/* Fill */}
        <motion.circle
          cx="24" cy="24" r={r}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 24 24)"
          initial={{ strokeDasharray: `0 ${circ}` }}
          whileInView={{ strokeDasharray: `${dash} ${circ}` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
        <text x="24" y="28" textAnchor="middle" fontSize="10" fill={color} fontFamily="monospace" fontWeight="700">
          {value}%
        </text>
      </svg>
    </div>
  );
}

/* ─── Section export ─────────────────────────────────────────────────────── */

export const SkillsSection = () => (
  <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/*
        Asymmetric 3-column bento:
        Row 1: AI Intelligence Lab (2 cols) | Quantitative Systems (1 col)
        Row 2: Scalable Infrastructure (1 col) — centred or left
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
        {capabilities.map((cap) => (
          <CapabilityCard key={cap.id} cap={cap} />
        ))}
      </div>
    </div>
  </div>
);
