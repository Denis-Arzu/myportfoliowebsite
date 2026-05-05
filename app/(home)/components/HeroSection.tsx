"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroContent } from '@/lib/content-data';
import { TextSwap } from '@/components/ui/text-swap';

export default function HeroSection() {
  const { eyebrow, primaryHeadline, textSwapPhrases, subheadline, stats, primaryCta, secondaryCta } = heroContent;
  const raysRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!raysRef.current || !ambientRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;  // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2;

    raysRef.current.style.setProperty('--ray-x', `${50 + x * 8}%`);
    raysRef.current.style.setProperty('--ray-y', `${x * 3}deg`);
    ambientRef.current.style.setProperty('--glow-x', `${50 + x * 12}%`);
    ambientRef.current.style.setProperty('--glow-y', `${y * 8}%`);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Mouse-reactive light beams */}
      <div ref={raysRef} className="hero-light-rays" aria-hidden="true" />
      <div ref={ambientRef} className="hero-ambient" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">

        {/* Eyebrow — no box */}
        <p className="text-[11px] sm:text-xs font-medium text-white/30 uppercase tracking-[0.25em] mb-10">
          {eyebrow}
        </p>

        {/* Headline — single line */}
        <h1 className="text-2xl sm:text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-semibold leading-[1.15] tracking-tight mb-5">
          <span className="text-white sm:whitespace-nowrap">{primaryHeadline}</span>
          <br />
          <TextSwap
            phrases={textSwapPhrases}
            interval={3000}
            className="text-white/90"
          />
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheadline}
        </p>

        {/* CTA Buttons — clean, no heavy shadows */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#0A0A0B] rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02]"
          >
            {primaryCta.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href={secondaryCta.href}
            className="group inline-flex items-center gap-2 px-5 py-3.5 text-white/40 hover:text-white/60 font-medium text-sm transition-colors"
          >
            {secondaryCta.label}
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Stats — minimal, no boxes */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xl sm:text-2xl font-semibold text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-white/25 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade — blends into body black */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
