"use client";

import React, { useActionState, useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { contactContent } from "@/lib/content-data";
import { submitContactForm } from "@/app/actions/contact";
import type { ContactFormState } from "@/app/actions/contact";

const MAX_MESSAGE = 2000;

export function ContactSection() {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(submitContactForm, null);
  const formRef = useRef<HTMLFormElement>(null);
  const [charCount, setCharCount] = useState(0);

  // Focus first error field on validation failure
  useEffect(() => {
    if (state?.errors && formRef.current) {
      const firstErrorField = Object.keys(state.errors)[0];
      if (firstErrorField) {
        const el = formRef.current.querySelector<HTMLElement>(`[name="${firstErrorField}"]`);
        el?.focus();
      }
    }
  }, [state]);

  const fieldError = (name: string) => {
    if (!state?.errors?.[name]) return null;
    return (
      <p id={`${name}-error`} role="alert" className="text-red-400 text-xs mt-1 font-mono">
        {state.errors[name][0]}
      </p>
    );
  };

  // 16px on mobile prevents iOS auto-zoom on focus
  const inputCls = (name: string) =>
    `w-full bg-white/5 border rounded-lg px-4 py-3.5 text-[16px] sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[oklch(0.55_0.18_145/0.3)] transition-all ${
      state?.errors?.[name]
        ? "border-red-500/60 focus:border-red-400 focus:ring-red-400/30"
        : "border-white/10 focus:border-[oklch(0.55_0.18_145)]"
    }`;

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24 bg-black">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[oklch(0.55_0.18_145/0.05)] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 terminal-scanlines opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[oklch(0.55_0.18_145/0.3)] bg-[oklch(0.55_0.18_145/0.1)] text-xs font-mono text-[oklch(0.85_0.3_150)]"
          >
            <span>{contactContent.availabilityIndicator.status}</span>
            <span className="opacity-60 hidden sm:inline">|</span>
            <span className="opacity-80">{contactContent.availabilityIndicator.details}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            {contactContent.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            {contactContent.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl relative"
          >
            <h3 className="text-xl font-semibold text-white mb-1">Project Brief</h3>
            <p className="text-sm text-gray-500 mb-6">{contactContent.contactMethods[0].label}</p>

            {state?.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 border border-green-500/30 bg-green-500/10 rounded-xl text-center"
              >
                <p className="text-green-400 font-medium mb-2">✓ Message Received</p>
                <p className="text-sm text-green-400/80">{state.message}</p>
              </motion.div>
            ) : (
              <form ref={formRef} action={formAction} className="space-y-4" noValidate>
                {/* Honeypot — hidden from humans, bots fill it */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      className={inputCls("name")}
                      placeholder="Jane Doe"
                      aria-describedby={state?.errors?.name ? "name-error" : undefined}
                      aria-invalid={!!state?.errors?.name}
                    />
                    {fieldError("name")}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      className={inputCls("email")}
                      placeholder="jane@company.com"
                      aria-describedby={state?.errors?.email ? "email-error" : undefined}
                      aria-invalid={!!state?.errors?.email}
                    />
                    {fieldError("email")}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="company" className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className={inputCls("company")}
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="budget" className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[oklch(0.55_0.18_145)] transition-colors appearance-none"
                    >
                      <option value="">Select a range...</option>
                      <option value="Under $500">Under $500</option>
                      <option value="$500-$2k">$500 - $2k</option>
                      <option value="$2k-$5k">$2k - $5k</option>
                      <option value="$5k-$10k">$5k - $10k</option>
                      <option value="$10k+">$10k+</option>
                      <option value="Not sure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="description" className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Project Details <span className="text-red-400">*</span>
                    </label>
                    <span className={`text-[10px] font-mono transition-colors ${charCount > MAX_MESSAGE ? 'text-red-400' : 'text-gray-600'}`}>
                      {charCount}/{MAX_MESSAGE}
                    </span>
                  </div>
                  <textarea
                    required
                    id="description"
                    name="description"
                    rows={4}
                    maxLength={MAX_MESSAGE + 500}
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className={inputCls("description") + " resize-y min-h-[120px]"}
                    placeholder="Tell us what you're trying to build, the problem it solves, and your ideal timeline..."
                    aria-describedby={state?.errors?.description ? "description-error" : undefined}
                    aria-invalid={!!state?.errors?.description}
                  />
                  {fieldError("description")}
                </div>

                {state?.success === false && !state?.errors && (
                  <div role="alert" className="p-3 border border-red-500/30 bg-red-500/10 rounded-lg">
                    <p className="text-red-400 text-sm">{state.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-white text-black hover:bg-gray-200 transition-colors py-3 rounded-lg font-bold text-sm disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Initialize Engagement →"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Pricing Box */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-1">{contactContent.pricingTransparencyBox.heading}</h4>
              <p className="text-sm text-gray-400 mb-5">{contactContent.pricingTransparencyBox.subheading}</p>
              <div className="space-y-3">
                {contactContent.pricingTransparencyBox.tiers.map((tier, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-white">{tier.type}</p>
                      <p className="text-xs text-gray-500 font-mono">{tier.timeline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-[oklch(0.55_0.18_145)]">{tier.range}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">{contactContent.pricingTransparencyBox.note}</p>
            </div>

            {/* Other Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={contactContent.contactMethods[1].url}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group flex flex-col gap-2"
              >
                <span className="text-xl">📅</span>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-[oklch(0.52_0.24_264)] transition-colors">
                    {contactContent.contactMethods[1].label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Schedule directly via Calendly</p>
                </div>
              </a>
              <a
                href={`https://wa.me/${contactContent.contactMethods[2].number?.replace("+", "")}?text=${encodeURIComponent(contactContent.contactMethods[2].prefilledMessage || "")}`}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group flex flex-col gap-2"
              >
                <span className="text-xl">💬</span>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                    {contactContent.contactMethods[2].label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-mono">{contactContent.contactMethods[2].number}</p>
                </div>
              </a>
            </div>

            {/* Trust Signals */}
            <div className="mt-2 space-y-2">
              {contactContent.trustSignals.map((signal, i) => (
                <p key={i} className="text-xs text-gray-500 font-mono flex gap-2">
                  <span className="opacity-50">›</span> {signal}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
