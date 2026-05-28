"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, ExternalLink } from "lucide-react";
import { heroContent } from "@/lib/content-data";
import { scrollToSection } from "@/lib/smooth-scroll";

interface HeroSectionProps {
  onOpenChat: () => void;
}

export default function HeroSection({ onOpenChat }: HeroSectionProps) {
  const { eyebrow, headline, subheadline, primaryCta, secondaryCta, tertiaryCta } =
    heroContent;

  const handleScrollToDemos = () => {
    scrollToSection("demos");
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-2">
      <span className="inline-block px-4 py-1.5 mb-6 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40 border border-white/10 rounded-full bg-white/[0.03]">
        {eyebrow}
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.08] tracking-tight text-white max-w-3xl">
        {headline}
      </h1>

      <p className="mt-6 text-base sm:text-lg text-white/45 max-w-xl leading-relaxed font-sans">
        {subheadline}
      </p>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <button
          type="button"
          onClick={handleScrollToDemos}
          className="group inline-flex items-center justify-center gap-2 min-w-[200px] px-8 py-3.5 bg-white text-[#0A0A0B] rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-white/90"
        >
          {primaryCta.label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={onOpenChat}
          className="group inline-flex items-center justify-center gap-2 min-w-[200px] px-8 py-3.5 bg-brand-green text-white rounded-lg font-semibold text-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
        >
          <MessageSquare className="w-4 h-4" />
          {secondaryCta.label}
        </button>

        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-2 min-w-[200px] px-8 py-3.5 border border-white/12 text-white rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20"
        >
          <ExternalLink className="w-4 h-4 text-white/70" />
          {tertiaryCta.label}
        </Link>
      </div>
    </section>
  );
}
