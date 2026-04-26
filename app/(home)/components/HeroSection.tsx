"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroContent } from '@/lib/content-data';
import { TextSwap } from '@/components/ui/text-swap';

export default function HeroSection() {
  const { subheadline, stats, primaryCta } = heroContent;
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
        <p className="text-[11px] sm:text-xs font-medium text-indigo-400/70 uppercase tracking-[0.25em] mb-10">
          Software Engineering Lab
        </p>

        {/* Headline — refined size */}
        <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] lg:text-[3.75rem] font-semibold leading-[1.15] tracking-tight mb-5">
          <span className="text-white">We Engineer Systems That</span>
          <br />
          <TextSwap
            phrases={[
              "Print Money.",
              "Save Time.",
              "Work While You Sleep.",
              "Scale Infinitely."
            ]}
            interval={3000}
            className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
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
            {primaryCta.text.replace(' →', '')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 px-5 py-3.5 text-gray-500 hover:text-gray-300 font-medium text-sm transition-colors"
          >
            {primaryCta.secondaryText.replace(' ↓', '')}
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Stats — minimal, no boxes */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xl sm:text-2xl font-semibold text-white tabular-nums">
                {stat.value}<span className="text-indigo-400/60 text-base font-normal ml-0.5">{stat.suffix}</span>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider mt-1">
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
