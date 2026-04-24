"use client";

import React, { useActionState } from "react";
import { motion } from "motion/react";

async function subscribeAction(
  _prev: { success: boolean; message: string } | null,
  formData: FormData
) {
  const email = formData.get("lead_email") as string;
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }
  // TODO: Integrate with Beehiiv/ConvertKit/Mailchimp
  console.log("[LeadMagnet] Email captured:", email, "at", new Date().toISOString());
  return { success: true, message: "You're in! Check your inbox for the checklist." };
}

export function LeadMagnet() {
  const [state, formAction, isPending] = useActionState(subscribeAction, null);

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[oklch(0.55_0.18_145/0.03)] to-black pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[oklch(0.55_0.18_145/0.2)] bg-black/60 backdrop-blur-xl p-6 sm:p-10 text-center relative overflow-hidden"
          style={{
            boxShadow:
              "0 0 80px oklch(0.55 0.18 145 / 0.05), inset 0 0 40px oklch(0.55 0.18 145 / 0.02)",
          }}
        >
          {/* Subtle ambient glow */}
          <motion.div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: "oklch(0.55 0.18 145 / 0.06)", filter: "blur(60px)" }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[oklch(0.55_0.18_145)] font-mono mb-3 sm:mb-4">
              Free Resource
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              The Automation Audit Checklist
            </h3>
            <p className="text-[13px] sm:text-sm text-gray-400 leading-relaxed mb-6 max-w-sm mx-auto">
              20 signs your business needs custom automation — and what it costs
              if you wait. A 2-page PDF to self-diagnose before spending a dime.
            </p>

            {state?.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="p-5 border border-green-500/30 bg-green-500/10 rounded-xl"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-400 font-bold text-sm">Check your inbox! 📬</span>
                </div>
                <p className="text-green-400/70 text-xs">{state.message}</p>
              </motion.div>
            ) : (
              <form action={formAction} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <label htmlFor="lead_email" className="sr-only">
                    Email address
                  </label>
                  {/* Envelope icon inside input */}
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    id="lead_email"
                    name="lead_email"
                    required
                    placeholder="you@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-[16px] sm:text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[oklch(0.55_0.18_145)] focus:ring-1 focus:ring-[oklch(0.55_0.18_145/0.3)] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="shrink-0 bg-[oklch(0.55_0.18_145)] text-black font-bold text-sm px-5 py-3.5 rounded-lg hover:bg-[oklch(0.6_0.18_145)] active:scale-[0.98] transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Get the Checklist →"
                  )}
                </button>
              </form>
            )}

            {state?.success === false && (
              <p role="alert" className="text-red-400 text-xs mt-2 font-mono">
                {state.message}
              </p>
            )}

            <p className="text-[10px] sm:text-[11px] text-gray-600 mt-4 font-mono leading-relaxed">
              No spam. Unsubscribe anytime. Used by traders, founders, and
              engineers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
