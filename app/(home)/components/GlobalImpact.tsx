"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { DecryptedText } from "@/components/ui/decrypted-text";

interface Stat {
  value: string;
  label: string;
  icon: string;
  accent: string;
}

const stats: Stat[] = [
  {
    value: "5+",
    label: "Products Shipped",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    accent: "oklch(0.52 0.24 264)",
  },
  {
    value: "99.9%",
    label: "Uptime Target",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    accent: "oklch(0.55 0.18 145)",
  },
  {
    value: "2",
    label: "Markets: Kenya & Global",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: "oklch(0.65 0.15 60)",
  },
];

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl backdrop-blur-md bg-black/40 flex-1 min-w-[180px]"
      style={{ border: `1px solid ${stat.accent.replace(")", " / 0.25)")}` }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 flex items-center justify-center rounded-xl mb-1"
        style={{
          background: stat.accent.replace(")", " / 0.1)"),
          border: `1px solid ${stat.accent.replace(")", " / 0.3)")}`,
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke={stat.accent} strokeWidth={1.6} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
        </svg>
      </div>

      {/* Value */}
      <span
        className="text-3xl font-black tracking-tight font-mono"
        style={{ color: stat.accent }}
      >
        {visible ? (
          <DecryptedText text={stat.value} speed={45} scrambleCycles={6} />
        ) : (
          <span className="opacity-0">{stat.value}</span>
        )}
      </span>

      {/* Label */}
      <span className="text-xs text-gray-500 uppercase tracking-widest text-center font-medium">
        {stat.label}
      </span>
    </motion.div>
  );
}

export function GlobalImpact() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="text-xs text-gray-600 uppercase tracking-widest text-center mb-5 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Dentrix Apps · By the numbers
        </motion.p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Horizontal rule */}
        <motion.div
          className="mt-8 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
