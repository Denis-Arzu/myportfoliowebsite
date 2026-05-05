"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { pricingContent } from "@/lib/content-data";

export const PricingSection: React.FC = () => {
  const { sectionTitle, sectionSubtitle, tiers, customNote, customCta } = pricingContent;

  return (
    <section id="pricing" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white/80 tracking-tight mb-3">
            {sectionTitle}
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {tiers.map((tier, index) => {
            const isPopular = tier.popular;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-xl p-6 sm:p-7 flex flex-col ${
                  isPopular ? "md:-mt-2 md:mb-2" : ""
                }`}
                style={{
                  border: isPopular
                    ? "1px solid oklch(0.55 0.18 145 / 0.3)"
                    : "1px solid rgba(255,255,255,0.05)",
                  background: isPopular
                    ? "rgba(99, 102, 241, 0.03)"
                    : "transparent",
                  boxShadow: isPopular
                    ? "0 0 40px -10px oklch(0.55 0.18 145 / 0.15)"
                    : "none",
                }}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        background: "oklch(0.55 0.18 145 / 0.15)",
                        color: "oklch(0.85 0.3 150)",
                        border: "1px solid oklch(0.55 0.18 145 / 0.3)",
                      }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <h3 className="text-sm font-semibold text-white/70 tracking-wide mt-2">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-mono text-white/90 tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-xs text-white/30 font-mono ml-1">/{tier.period}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-white/35 leading-relaxed mb-6">{tier.description}</p>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "oklch(0.55 0.18 145 / 0.7)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-sm text-white/50 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isPopular
                      ? "bg-[oklch(0.55_0.18_145)] text-black hover:bg-[oklch(0.62_0.18_145)]"
                      : "border border-white/10 text-white/60 hover:border-white/20 hover:text-white/80"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Custom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-xs text-white/30 font-mono">
            {customNote}{" "}
            <a href="#contact" className="text-[oklch(0.85_0.3_150)] hover:underline">
              {customCta}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
