"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqData = [
  {
    question: "Where are you based? Can you work with international clients?",
    answer:
      "We're headquartered in Nairobi, Kenya (UTC+3). We serve clients globally across 4 continents — Kenya, UK, USA, Singapore, and growing. The timezone difference is an advantage: we deliver working features while you sleep. All communication is in English. Payment via Wise (preferred), PayPal, Payoneer, or USDT.",
  },
  {
    question: "What's your typical project timeline?",
    answer:
      "It depends on complexity. Simple scripts/bots: 1-5 days. Full applications: 1-4 weeks. Trading systems: 1-3 weeks. We consistently deliver 30-50% faster than agency estimates because we don't have meetings overhead. You get a dedicated engineer, not a project manager.",
  },
  {
    question: "Do you offer ongoing support after delivery?",
    answer:
      "Yes. Every project includes 30 days of post-delivery bug fixes and adjustments at no extra cost. Beyond that, we offer retainer arrangements ($500-$2,000/month) for ongoing development, monitoring, and feature additions. Many clients opt for this because it's cheaper than hiring a full-time developer.",
  },
  {
    question: "How does payment work? Do I pay upfront?",
    answer:
      "For projects under $1,000: 100% upfront or 50%/50% (before/after delivery). For projects over $1,000: 40% deposit to start, 30% at midpoint demo, 30% on completion. For ongoing retainers: Monthly invoicing on the 1st of each month. We accept Wise (best rates), PayPal, Payoneer, bank transfer (Kenya), or cryptocurrency.",
  },
  {
    question: "Can I see examples of past work before committing?",
    answer:
      "Absolutely. Three live products are showcased on this page: maganji.site (trading platform), tuandike.online (AI study app), and we're building CreatorOS (YouTube intelligence tool). We can also arrange a 15-minute screen-share call to walk through relevant past projects similar to what you need. No cost, no pressure.",
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer:
      "We've never had a client refuse final delivery because our process includes check-ins at 25%, 50%, and 75% completion. If something isn't matching expectations, we fix it before moving forward. If after delivery there are issues, the 30-day post-delivery support period covers fixes. We're building long-term relationships, not one-night stands.",
  },
  {
    question: "Are you a one-person team or an agency?",
    answer:
      "Currently, Dentrix Apps is a lean engineering operation led by the founder (Denis K.) with selective contractor partnerships for larger projects. This means when you hire Dentrix Apps, you're getting the principal engineer — not a junior dev who was assigned your project. For enterprise engagements requiring larger teams, we scale through a vetted contractor network.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, absolutely. We're NDA-friendly by default. Many of our trading system clients require strict confidentiality. We can sign your NDA before any discussion begins, or use ours. Code ownership transfers to you upon final payment. We don't hold your code hostage.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqData)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    onToggle();
    // Scroll into view on mobile when opening
    if (!isOpen) {
      setTimeout(() => {
        answerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 350);
    }
  }, [isOpen, onToggle]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="w-full text-left min-h-[56px] py-4 sm:py-5 flex items-start gap-3 sm:gap-4 group"
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base leading-none text-gray-600 group-hover:text-[oklch(0.55_0.18_145)] transition-colors shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center"
          aria-hidden="true"
        >
          +
        </motion.span>
        <span
          className={`text-[13px] sm:text-sm font-semibold tracking-tight leading-snug transition-colors duration-200 ${
            isOpen ? "text-white" : "text-gray-300 group-hover:text-white"
          }`}
        >
          {item.question}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={answerRef}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
            style={{ willChange: "height" }}
          >
            <p className="text-[13px] sm:text-sm text-gray-400 leading-[1.7] pb-5 pl-8 pr-2 sm:pr-4">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-px bg-white/5" />
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/5 to-black pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs text-indigo-400/70 uppercase tracking-widest font-mono mb-3"
          >
            Common Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight"
          >
            Before You Reach Out
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[13px] sm:text-sm text-gray-400 mt-3 max-w-lg mx-auto leading-relaxed"
          >
            Answers to the 8 questions every enterprise buyer asks. We'd rather
            be transparent upfront than waste your time on a call.
          </motion.p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm px-4 sm:px-8">
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10"
        >
          <p className="text-[11px] sm:text-xs text-gray-500 font-mono">
            Still have questions?{" "}
            <a href="#contact" className="text-[oklch(0.55_0.18_145)] hover:underline">
              Send us a message
            </a>{" "}
            — we respond within 12 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
