"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ShinyText } from "@/components/ui/shiny-text";

interface BentoCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detail: string;       // expanded detail shown on hover/focus
  icon: string;         // SVG path(s) rendered inline
  accentColor: string;  // oklch border accent
  span: "single" | "double";
}

const cards: BentoCard[] = [
  {
    id: "architecture",
    title: "System Architecture",
    tagline: "Built for scale from day one.",
    description:
      "We design infrastructure that grows with your ambitions. Every system is modelled for fault-tolerance, horizontal scaling, and zero-downtime deployments before a single line of product code is written.",
    detail:
      "Microservices · Event-driven pipelines · VPS + edge deployment · 99.9% SLA design · ZeroMQ message queuing",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accentColor: "oklch(0.52 0.24 264 / 0.5)",   // indigo
    span: "double",
  },
  {
    id: "ai",
    title: "AI Integration",
    tagline: "Intelligence as a first-class feature.",
    description:
      "We embed AI at the product level — not bolted on after the fact. From LLM-powered features to custom model fine-tuning, we make your software think.",
    detail:
      "LLM APIs · RAG pipelines · AI agents · Python ML stack · Real-time inference",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    accentColor: "oklch(0.55 0.18 145 / 0.5)",   // green
    span: "single",
  },
  {
    id: "trading",
    title: "Algorithmic Scalability",
    tagline: "Execute at machine speed.",
    description:
      "Our trading engines are built in C++ for microsecond-level execution. We architect systems that operate 24/7, handling thousands of signals per second without degradation.",
    detail:
      "C++ core engines · Expert Advisors · Deriv API · Backtesting frameworks · Low-latency VPS",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    accentColor: "oklch(0.65 0.15 60 / 0.5)",    // orange
    span: "single",
  },
  {
    id: "deployment",
    title: "Global Deployment",
    tagline: "Ship anywhere. Run everywhere.",
    description:
      "From the first commit to production — we handle CI/CD, containerisation, and multi-region deployment. Your software reaches users worldwide with minimal latency.",
    detail:
      "Docker · CI/CD pipelines · Multi-region edge · Domain + SSL · Monitoring & alerting",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accentColor: "oklch(0.52 0.24 264 / 0.5)",   // indigo
    span: "double",
  },
];

function BentoCardItem({ card }: { card: BentoCard }) {
  // Each card owns its own independent hover state (satisfies Issue #1)
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/50 p-6 flex flex-col gap-4 cursor-default
        ${card.span === "double" ? "lg:col-span-2" : "col-span-1"}
      `}
      style={{ border: `1px solid ${card.accentColor}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${card.accentColor.replace("0.5)", "0.12)")} 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl"
        style={{ background: card.accentColor.replace("0.5)", "0.12)"), border: `1px solid ${card.accentColor}` }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
        </svg>
      </div>

      {/* Title — ShinyText for premium lustre */}
      <div className="relative z-10 space-y-1">
        <h3 className="text-lg font-bold">
          <ShinyText speed={hovered ? 2 : 5}>
            {card.title}
          </ShinyText>
        </h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
          {card.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="relative z-10 text-sm text-gray-400 leading-relaxed flex-1">
        {card.description}
      </p>

      {/* Detail chips — slide in on hover */}
      <motion.div
        className="relative z-10 flex flex-wrap gap-2"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.25 }}
      >
        {card.detail.split(" · ").map((chip) => (
          <span
            key={chip}
            className="text-xs px-2 py-0.5 rounded-full text-gray-300 font-mono"
            style={{ background: card.accentColor.replace("0.5)", "0.1)"), border: `1px solid ${card.accentColor.replace("0.5)", "0.3)")}` }}
          >
            {chip}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function MethodologySection() {
  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-indigo-400 underline underline-offset-8 decoration-4 decoration-indigo-500/60 mb-3">
            The Dentrix Methodology
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Four pillars that underpin every engagement — from first brief to final deployment.
          </p>
        </motion.div>

        {/*
          Asymmetric Bento Grid — 3 columns on lg:
          Row 1: Architecture (2 cols) | AI Integration (1 col)
          Row 2: Algo Scalability (1 col) | Global Deployment (2 cols)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <BentoCardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
