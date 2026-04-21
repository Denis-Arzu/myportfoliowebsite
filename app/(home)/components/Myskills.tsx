"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShinyText } from "@/components/ui/shiny-text";
import {
  SiNextdotjs, SiReact, SiTypescript, SiPython,
  SiNodedotjs, SiFlutter, SiCplusplus,
} from "react-icons/si";
import { FaServer } from "react-icons/fa";

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
  poweredBy: string[];
  chips: TechChip[];
  accentColor: string;
  span: "double" | "single";
  icon: string;
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
    poweredBy: ["Tuandike — AI Study Platform"],
    chips: [
      { label: "Next.js 16", icon: <SiNextdotjs className="text-white" /> },
      { label: "React 19", icon: <SiReact className="text-blue-400" /> },
      { label: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
      { label: "Python", icon: <SiPython className="text-yellow-400" /> },
      { label: "Node.js", icon: <SiNodedotjs className="text-green-400" /> },
    ],
    accentColor: "oklch(0.52 0.24 264 / 0.55)",
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
    poweredBy: ["Maganji Engine — Algorithmic Trading"],
    chips: [
      { label: "C++", icon: <SiCplusplus className="text-blue-500" /> },
      { label: "Python", icon: <SiPython className="text-yellow-400" /> },
      { label: "Systems", icon: <FaServer className="text-gray-400" /> },
    ],
    accentColor: "oklch(0.55 0.18 145 / 0.55)",
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
    poweredBy: ["Cross-platform mobile", "Enterprise web apps"],
    chips: [
      { label: "Flutter", icon: <SiFlutter className="text-cyan-400" /> },
      { label: "Next.js 16", icon: <SiNextdotjs className="text-white" /> },
      { label: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
    ],
    accentColor: "oklch(0.65 0.15 60 / 0.55)",
    span: "single",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
];

function CapabilityCard({ cap }: { cap: Capability }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl overflow-hidden bg-[oklch(0_0_0/0.9)] flex flex-col gap-5 p-6 sm:p-7 min-h-[420px]
        ${cap.span === "double" ? "lg:col-span-8" : "lg:col-span-4"}
      `}
      style={{
        border: `1px solid ${cap.accentColor.replace("0.55)", "0.3)")}`,
        boxShadow: `0 0 0 1px ${cap.accentColor.replace("0.55)", "0.08)")}, inset 0 0 30px ${cap.accentColor.replace("0.55)", "0.05)")}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0.55 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `radial-gradient(ellipse at 22% 18%, ${cap.accentColor.replace("0.55)", "0.14)")} 0%, transparent 62%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />

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
      </div>

      <div className="relative z-10 space-y-1">
        <h3 className="text-lg font-bold">
          <ShinyText speed={hovered ? 2 : 5}>{cap.title}</ShinyText>
        </h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest">{cap.tagline}</p>
      </div>

      <p className="relative z-10 text-sm text-gray-400 leading-relaxed flex-1">{cap.description}</p>

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

      <div className="relative z-10">
        <button
          onClick={() => setExpanded((e) => !e)}
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

export const SkillsSection = () => (
  <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 py-16">
        {capabilities.map((cap) => (
          <CapabilityCard key={cap.id} cap={cap} />
        ))}
      </div>
    </div>
  </div>
);
