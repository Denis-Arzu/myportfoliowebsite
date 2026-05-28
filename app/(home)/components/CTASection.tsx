"use client";

import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";

interface CTASectionProps {
  onOpenChat: () => void;
}

export default function CTASection({ onOpenChat }: CTASectionProps) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow matching the hero */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.12_145/0.12),transparent)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
          Stop Losing Customers to Silent Websites.
        </h2>
        <p className="mt-6 text-base sm:text-lg text-white/40 max-w-lg mx-auto">
          Your AI assistant is ready. We build it for you. You try it free. What are you waiting for?
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 min-w-[220px] px-8 py-3.5 bg-white text-[#0A0A0B] rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-white/90"
          >
            Get Your AI Assistant
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={onOpenChat}
            className="group inline-flex items-center justify-center gap-2 min-w-[220px] px-8 py-3.5 border border-white/12 text-white rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20"
          >
            <MessageSquare className="w-4 h-4 text-white/70" />
            Talk to Our AI First
          </button>
        </div>
      </div>
    </section>
  );
}
