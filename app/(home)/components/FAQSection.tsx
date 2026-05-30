"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageSquare } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to get my AI assistant?",
    a: "Same day. You give us your website URL, we build the assistant and send you a demo link within hours. If you decide to go live, adding the widget to your website takes 2 minutes.",
  },
  {
    q: "Do I need to know anything about AI or chatbots?",
    a: "No. We build everything for you. You don't configure prompts, write responses, or set up conversation flows. We use your website data to create an assistant that already knows your business.",
  },
  {
    q: "What if I don't have a website?",
    a: "We can build you a simple landing page with the AI assistant as the core feature. Visitors land on your page, chat with the assistant, and book directly. The landing page plan is $499 one-time + $97/month.",
  },
  {
    q: "How does the AI know about my business?",
    a: "We scrape your website - services, pricing, hours, team, location, FAQs - and feed it into the AI. It only answers based on your real data. It never makes things up.",
  },
  {
    q: "What happens when a lead is captured?",
    a: "You get an email instantly with the visitor's name, email, phone, and the conversation snippet. You can hit Reply in your email to respond directly to the lead.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no cancellation fees. Cancel and we take your assistant offline. You keep any leads you've already received.",
  },
  {
    q: "What if the AI says something wrong?",
    a: "Our assistants are trained to never make up information. If they don't know the answer, they offer to connect the visitor with your team. You can also update your knowledge base anytime through our admin dashboard.",
  },
  {
    q: "Does it work on my website platform?",
    a: "Yes. We give you a single line of HTML that works on WordPress, Shopify, Wix, Squarespace, Webflow, and any platform that lets you add custom HTML. If you're not sure, just ask us - we'll help.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Questions? We&apos;ve Got Answers.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors hover:border-white/[0.12]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-white/80">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-white/30" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-sm text-white/40 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center space-y-3">
          <p className="text-sm text-white/40">
            Still have questions?{" "}
            <button
              type="button"
              onClick={() => {
                const event = new CustomEvent("open-chat");
                window.dispatchEvent(event);
              }}
              className="inline-flex items-center gap-1.5 text-brand-green hover:text-brand-green/80 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Talk to our AI
            </button>
          </p>
          <p className="text-sm text-white/30">
            Or{" "}
            <a href="/contact" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
              contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
