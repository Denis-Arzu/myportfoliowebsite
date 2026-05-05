"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

import { faqContent } from "@/lib/content-data";

const faqData = faqContent;

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
          className="text-base leading-none text-white/20 group-hover:text-[oklch(0.55_0.18_145)] transition-colors shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center"
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
            className="text-[10px] sm:text-xs text-white/25 uppercase tracking-widest font-mono mb-3"
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
            Questions? Answered.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[13px] sm:text-sm text-white/40 mt-3 max-w-lg mx-auto leading-relaxed"
          >
            Every question below is an objection handled before it's raised.
            No surprises. No hidden details.
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
          <p className="text-[11px] sm:text-xs text-white/30 font-mono">
            Still have questions?{" "}
            <a href="#contact" className="text-[oklch(0.55_0.18_145)] hover:underline">
              Send us a message
            </a>{" "}
            — we respond within 1 hour during business hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
