"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "AI Assistant",
    price: "$299",
    period: "one-time setup",
    monthly: "+ $97/month",
    features: [
      "AI assistant built from your website",
      "Industry-specific personality & tone",
      "Lead capture with instant email notifications",
      "Reply-to leads directly from your inbox",
      "Branded widget (your colors, your logo)",
      "Analytics dashboard",
      "One line of code to install",
      "Cancel anytime — no contracts",
    ],
    ctaLabel: "Get Your Assistant Built",
    ctaHref: "/contact",
    highlighted: true,
  },
  {
    name: "AI Assistant + Landing Page",
    price: "$499",
    period: "one-time setup",
    monthly: "+ $97/month",
    features: [
      "Everything in AI Assistant",
      "Custom landing page for your business",
      "Your assistant is the page, not just a widget",
      "SEO-optimized for local search",
      "Mobile-responsive design",
      "No website needed — we build it for you",
    ],
    ctaLabel: "Get Assistant + Page",
    ctaHref: "/contact",
    highlighted: false,
  },
];

const pricingEasing = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: pricingEasing },
  }),
};

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-[oklch(0.55_0.18_145/0.03)] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Simple Pricing. No Surprises.
          </h2>
          <p className="mt-4 text-base text-white/40">
            Try it free. Pay only when you&apos;re convinced.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                tier.highlighted
                  ? "border-brand-green/30 bg-brand-green/[0.04] shadow-[0_0_40px_oklch(0.55_0.18_145/0.08)]"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-green text-black text-[10px] font-bold uppercase tracking-[0.15em] rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>

              <div className="mt-6 mb-1">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-sm text-white/40 ml-2">{tier.period}</span>
              </div>
              <p className="text-sm text-brand-green font-semibold mb-8">{tier.monthly}</p>

              <ul className="space-y-3 mb-10">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                    <Check className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`block w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tier.highlighted
                    ? "bg-brand-green text-black hover:brightness-110"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
              >
                {tier.ctaLabel}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/30 max-w-md mx-auto">
          Both plans include a free demo. We build your assistant first, you try it, then decide. No credit card required.
        </p>
      </div>
    </section>
  );
}
