"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "1",
    title: "Give Us Your Website URL",
    description: "That's it. One link. We handle everything from there.",
  },
  {
    number: "2",
    title: "We Build Your AI Assistant",
    description: "We scrape your site, train the AI on your services, pricing, hours, and team. Same day. Your bot already knows your business.",
  },
  {
    number: "3",
    title: "Try It Free. Then Go Live.",
    description: "We send you a demo link. Chat with your AI. If it blows your mind, add one line of code to your website. That's it. You're live.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardEasing = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: cardEasing } },
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[oklch(0.55_0.18_145/0.02)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            How It Works
          </h2>
          <p className="mt-4 text-base text-white/40 max-w-md mx-auto">
            You don&apos;t build anything. We do it all.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative"
        >
          {/* Desktop connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-brand-green/0 via-brand-green/30 to-brand-green/0" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] transition-colors"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-green/10 text-brand-green text-2xl font-bold mb-6 border border-brand-green/20">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
