"use client";

import React from "react";
import { motion } from "motion/react";

const builds = [
  "> Deploying Logistics Patch... [In Progress 78%]",
  "> Running ADA Contrast Audit... [Pass]",
  "> Validating SLA Monitoring Hooks... [Pass]",
  "> Building US-Regional API Cache Layer... [In Progress 64%]",
  "> Security Signature Check... [Pass]",
];

const ActiveBuilds: React.FC = () => {
  return (
    <section id="active-builds" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="terminal-panel p-4 sm:p-6">
          <h3 className="text-[oklch(0.85_0.3_150)] text-sm tracking-[0.2em] uppercase mb-4">
            Active Build Logs
          </h3>
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            {builds.map((line, idx) => (
              <motion.p
                key={`${line}-${idx}`}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.25, delay: idx * 0.08 }}
                className="text-white/90 border-b border-[oklch(0.85_0.3_150/0.15)] pb-2 last:border-b-0"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActiveBuilds;
