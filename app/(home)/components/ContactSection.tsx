"use client";

import React, {
  useActionState,
  useRef,
  useEffect,
  useState,
  useCallback,
  useTransition,
} from "react";
import { motion } from "motion/react";
import { contactContent } from "@/lib/content-data";
import { submitContactForm } from "@/app/actions/contact";
import type { ContactFormState } from "@/app/actions/contact";
import { CONTACT_UPLOAD } from "@/lib/contact-upload";
import { ProjectFileUpload } from "@/app/(home)/components/ProjectFileUpload";
import { Mail, Calendar } from "lucide-react";

const MAX_MESSAGE = 2000;

interface ContactSectionProps {
  onOpenChat?: () => void;
}

export function ContactSection({ onOpenChat }: ContactSectionProps) {
  const [state, formAction, actionPending] = useActionState<
    ContactFormState,
    FormData
  >(submitContactForm, null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [projectFiles, setProjectFiles] = useState<File[]>([]);
  const submitting = actionPending || isPending;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.delete(CONTACT_UPLOAD.fieldName);
      for (const file of projectFiles) {
        formData.append(CONTACT_UPLOAD.fieldName, file);
      }
      startTransition(() => {
        formAction(formData);
      });
    },
    [formAction, projectFiles, startTransition],
  );

  useEffect(() => {
    if (!state?.success) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setProjectFiles([]);
      formRef.current?.reset();
      setCharCount(0);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [state?.success]);

  useEffect(() => {
    if (state?.errors && formRef.current) {
      const firstErrorField = Object.keys(state.errors)[0];
      if (firstErrorField) {
        const el = formRef.current.querySelector<HTMLElement>(
          `[name="${firstErrorField}"]`,
        );
        el?.focus();
      }
    }
  }, [state]);

  const fieldError = (name: string) => {
    if (!state?.errors?.[name]) return null;
    return (
      <p
        id={`${name}-error`}
        role="alert"
        className="text-red-400 text-xs mt-1 font-mono"
      >
        {state.errors[name][0]}
      </p>
    );
  };

  const inputCls = (name: string) =>
    `w-full bg-white/5 border rounded-lg px-4 py-3.5 text-[16px] sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[oklch(0.55_0.18_145/0.3)] transition-all ${
      state?.errors?.[name]
        ? "border-red-500/60 focus:border-red-400 focus:ring-red-400/30"
        : "border-white/10 focus:border-[oklch(0.55_0.18_145)]"
    }`;

  const {
    heading,
    subheading,
    serviceTypes,
    budgetRanges,
    trustSignals,
    contactMethods,
  } = contactContent;

  const emailMethod = contactMethods.find((m) => m.type === "email");
  const calendlyMethod = contactMethods.find((m) => m.type === "calendly");

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-24 bg-black"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[oklch(0.55_0.18_145/0.05)] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 terminal-scanlines opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            {heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-2xl mx-auto text-sm md:text-base"
          >
            {subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/5 shadow-2xl relative"
          >
            <h3 className="text-xl font-semibold text-white/80 mb-1">
              Get Started
            </h3>
            <p className="text-sm text-white/30 mb-6">
              Tell us what you need and we will respond within 1 hour.
            </p>

            {state?.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 border border-[oklch(0.55_0.18_145/0.3)] bg-[oklch(0.55_0.18_145/0.1)] rounded-xl text-center"
              >
                <p className="text-[oklch(0.85_0.3_150)] font-medium mb-2">
                  Message Received
                </p>
                <p className="text-sm text-white/50">{state.message}</p>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="text-xs font-mono text-white/30 uppercase tracking-wider"
                    >
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      className={inputCls("name")}
                      placeholder="Jane Doe"
                      aria-describedby={
                        state?.errors?.name ? "name-error" : undefined
                      }
                      aria-invalid={!!state?.errors?.name}
                    />
                    {fieldError("name")}
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="text-xs font-mono text-white/30 uppercase tracking-wider"
                    >
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      className={inputCls("email")}
                      placeholder="jane@company.com"
                      aria-describedby={
                        state?.errors?.email ? "email-error" : undefined
                      }
                      aria-invalid={!!state?.errors?.email}
                    />
                    {fieldError("email")}
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="company"
                    className="text-xs font-mono text-white/30 uppercase tracking-wider"
                  >
                    Agency / Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={inputCls("company")}
                    placeholder="Dentrix Realty"
                    aria-describedby={
                      state?.errors?.company ? "company-error" : undefined
                    }
                    aria-invalid={!!state?.errors?.company}
                  />
                  {fieldError("company")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="serviceType"
                      className="text-xs font-mono text-white/30 uppercase tracking-wider"
                    >
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[oklch(0.55_0.18_145)] transition-colors appearance-none"
                    >
                      <option value="">Select a service...</option>
                      {serviceTypes.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="budget"
                      className="text-xs font-mono text-white/30 uppercase tracking-wider"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[oklch(0.55_0.18_145)] transition-colors appearance-none"
                    >
                      <option value="">Select a range...</option>
                      {budgetRanges.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="description"
                      className="text-xs font-mono text-white/30 uppercase tracking-wider"
                    >
                      Project Details <span className="text-red-400">*</span>
                    </label>
                    <span
                      className={`text-[10px] font-mono transition-colors ${charCount > MAX_MESSAGE ? "text-red-400" : "text-white/20"}`}
                    >
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
                    className={
                      inputCls("description") + " resize-y min-h-[120px]"
                    }
                    placeholder="Your market, website URL, listings volume, and what you want the chatbot to handle…"
                    aria-describedby={
                      state?.errors?.description
                        ? "description-error"
                        : undefined
                    }
                    aria-invalid={!!state?.errors?.description}
                  />
                  {fieldError("description")}
                </div>

                <ProjectFileUpload
                  files={projectFiles}
                  onChange={setProjectFiles}
                  disabled={submitting}
                  error={state?.errors?.attachments?.[0] ?? null}
                />

                {state?.success === false && !state?.errors && (
                  <div
                    role="alert"
                    className="p-3 border border-red-500/30 bg-red-500/10 rounded-lg"
                  >
                    <p className="text-red-400 text-sm">{state.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-white text-black hover:bg-gray-200 transition-colors py-3 rounded-lg font-bold text-sm disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message →"
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
            {/* AI Agent CTA */}
            <div
              role="button"
              tabIndex={0}
              onClick={onOpenChat}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onOpenChat?.();
              }}
              className="p-5 rounded-xl border border-[oklch(0.55_0.18_145)/0.2] bg-[oklch(0.55_0.18_145/0.05)] hover:bg-[oklch(0.55_0.18_145/0.1)] transition-all cursor-pointer group flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-xs font-mono text-brand-green uppercase tracking-widest">
                  AI Assistant
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/90 group-hover:text-brand-green transition-colors">
                  Questions? Chat with our AI assistant.
                </p>
                <p className="text-xs text-white/35 mt-1 font-mono uppercase tracking-tight">
                  Instant answers · Real estate focus
                </p>
              </div>
            </div>

            {calendlyMethod && (
              <a
                href={calendlyMethod.href}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.07] transition-colors group flex flex-col gap-2"
              >
                <Calendar className="w-5 h-5 text-white/25" />
                <div>
                  <p className="text-sm font-bold text-white/70 group-hover:text-[oklch(0.85_0.3_150)] transition-colors">
                    {calendlyMethod.label}
                  </p>
                  <p className="text-xs text-white/25 mt-1">
                    Schedule directly via Calendly
                  </p>
                </div>
              </a>
            )}

            {/* Email direct */}
            {emailMethod && (
              <a
                href={`mailto:${emailMethod.label}`}
                className="p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.07] transition-colors group flex items-center gap-4"
              >
                <Mail className="w-5 h-5 text-white/25" />
                <div>
                  <p className="text-sm font-bold text-white/70 group-hover:text-[oklch(0.85_0.3_150)] transition-colors">
                    {emailMethod.label}
                  </p>
                  <p className="text-xs text-white/25 mt-1">
                    Direct email — fastest for complex projects
                  </p>
                </div>
              </a>
            )}

            {/* Trust Signals */}
            <div className="mt-2 space-y-2">
              {trustSignals.map((signal, i) => (
                <p
                  key={i}
                  className="text-xs text-white/30 font-mono flex gap-2"
                >
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
