"use client";
import React from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    quote: "Dentrix transformed our legacy workflow into a high-speed SaaS platform. Our user retention jumped by 30% via AI-driven automation.",
    company: "SaaS Scaling Partners",
    role: "VP of Engineering",
    stars: 5,
  },
  {
    quote: "Scaling to 10k concurrent users was a nightmare until we partnered with Dentrix Apps. Their Next.js 16 architecture is rock solid.",
    company: "Enterprise Cloud Solutions",
    role: "Chief Technology Officer",
    stars: 5,
  },
  {
    quote: "The custom AI agents built for our internal tools have saved us 40+ manual hours weekly. It’s a structural advantage, not just code.",
    company: "Vanguard Tech",
    role: "Founder & CEO",
    stars: 5,
  },
];

const TestimonialCard = ({ item }: { item: typeof testimonials[0] }) => {
  return (
    <div className="relative w-[350px] sm:w-[400px] shrink-0 p-6 sm:p-8 rounded-2xl flex flex-col gap-4 backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl transition-transform duration-300 hover:scale-[1.02] cursor-default">
      {/* 5 Stars */}
      <div className="flex gap-1">
        {[...Array(item.stars)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-1">
        "{item.quote}"
      </p>

      {/* Author info */}
      <div className="pt-4 border-t border-white/5 flex flex-col">
        <span className="font-semibold text-white tracking-wide text-sm">{item.company}</span>
        <span className="text-xs text-indigo-400/80">{item.role}</span>
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-black">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-2xl font-bold text-indigo-400 underline underline-offset-8 decoration-4 decoration-indigo-500/60 mb-2">
          Impact & Partnerships
        </h2>
        <p className="text-sm text-gray-500">How Dentrix Apps accelerates ambitious companies.</p>
      </div>

      <div className="relative flex w-full overflow-hidden group">
        <div
          className="flex flex-shrink-0 gap-6 sm:gap-8 px-3 sm:px-4 animate-marquee hover:[animation-play-state:paused] transition-transform"
          style={{ width: "fit-content" }}
        >
          {/* Duplicate list to create seamless infinite scroll */}
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
