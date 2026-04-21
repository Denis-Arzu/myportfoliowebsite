"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { MovingBorderBtn } from "@/components/ui/moving-border";
import { FuzzyText } from "@/components/ui/fuzzy-text";
import { Magnetic } from "@/components/ui/magnetic";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { GlitchText } from "@/components/ui/glitch-text";
import RotatingText from "@/components/ui/rotating-text";
import { TypingText } from "@/components/ui/typing-text";
import { ServiceIcon } from "@/components/ui/service-icon";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "motion/react";

/* ─── Service Board Data ────────────────────────────────────────────────── */

interface Board {
  id: string;
  tagline: string;
  copy: string;
  waText: string;
  bgImage: string;
  gradient: string;
  accent: string;
  iconPath: string;
  span?: string;
}

interface Slide {
  id: string;
  headline: string;
  sideDescription: string;
  boards: Board[];
}

const slides: Slide[] = [
  {
    id: "engineering-core",
    headline: "Engineering High-Performance Trading & Web Ecosystems.",
    sideDescription: "We build the mechanical gears of digital leverage. From quantitative engines requiring extreme latency optimization to scalable cloud computing architectures, our advanced deployment pipelines deliver technical edge as a product.",
    boards: [
      {
        id: "trading_bots",
        tagline: "Trading Bots",
        copy: "Ultra-low latency quant engines for 24/7 alpha.",
        waText: "I need a quote for an Automated Trading Bot.",
        bgImage: "/images/services/trading_bots_bg.png",
        gradient: "linear-gradient(135deg, oklch(0.65 0.15 60 / 0.8) 0%, oklch(0.15 0.05 60 / 0.9) 100%)",
        accent: "oklch(0.65 0.15 60)",
        iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
        span: "col-span-2",
      },
      {
        id: "web_dev",
        tagline: "Web Dev",
        copy: "Scalable apps with resilient foundations.",
        waText: "I need a quote for a Web Application.",
        bgImage: "/images/services/web_dev_bg.png",
        gradient: "linear-gradient(135deg, oklch(0.52 0.24 264 / 0.8) 0%, oklch(0.15 0.05 264 / 0.9) 100%)",
        accent: "oklch(0.52 0.24 264)",
        iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
        span: "col-span-1",
      },
      {
        id: "ui_ux",
        tagline: "UI/UX",
        copy: "Premium aesthetics for global conversion.",
        waText: "I need a quote for UI/UX Design.",
        bgImage: "/images/services/ui_ux_bg.png",
        gradient: "linear-gradient(135deg, oklch(0.60 0.22 300 / 0.8) 0%, oklch(0.15 0.05 300 / 0.9) 100%)",
        accent: "oklch(0.60 0.22 300)",
        iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        span: "col-span-1",
      },
    ]
  },
  {
    id: "digital-expansion",
    headline: "Scaling Your Impact through Mobile & Cloud Ecosystems.",
    sideDescription: "Reach every device, everywhere. We architect resilient mobile applications and secure cloud computing infrastructures with automated deployment pipelines that scale at the speed of your ambition.",
    boards: [
      {
        id: "mobile_app",
        tagline: "Mobile",
        copy: "Cross-platform reach with native performance.",
        waText: "I need a quote for a Mobile App.",
        bgImage: "/images/services/mobile_app_bg.png",
        gradient: "linear-gradient(135deg, oklch(0.65 0.15 150 / 0.8) 0%, oklch(0.15 0.05 150 / 0.9) 100%)",
        accent: "oklch(0.65 0.15 150)",
        iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
        span: "col-span-1",
      },
      {
        id: "api_integration",
        tagline: "API/Systems",
        copy: "Seamless bridging of siloed architectures.",
        waText: "I need a quote for API Integrations.",
        bgImage: "/images/services/api_integration_bg.png",
        gradient: "linear-gradient(135deg, oklch(0.70 0.15 80 / 0.8) 0%, oklch(0.15 0.05 80 / 0.9) 100%)",
        accent: "oklch(0.70 0.15 80)",
        iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        span: "col-span-1",
      },
      {
        id: "cloud_solutions",
        tagline: "Cloud",
        copy: "Hardened environments for enterprise scale.",
        waText: "I need a quote for Cloud Solutions.",
        bgImage: "/images/services/cloud_solutions_bg.png",
        gradient: "linear-gradient(135deg, oklch(0.55 0.18 245 / 0.8) 0%, oklch(0.15 0.05 245 / 0.9) 100%)",
        accent: "oklch(0.55 0.18 245)",
        iconPath: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
        span: "col-span-2",
      },
    ]
  }
];

/* ─── Grid Button component ────────────────────────────────────────────── */

const GridButton = ({ onClick, color }: { onClick: () => void; color: string }) => (
  <Magnetic strength={0.3}>
    <button 
      onClick={onClick}
      className="relative p-1 group/btn overflow-hidden rounded-md transition-transform hover:scale-110 active:scale-95 shadow-[0_4px_10px_oklch(0_0_0/0.3)]"
    >
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px] p-[2px] opacity-30 group-hover/btn:opacity-60 transition-opacity z-0">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/40 rounded-[1px]" />
        ))}
      </div>
      <div 
        className="relative z-10 px-3 py-1.5 rounded-[4px] text-[9px] font-black uppercase tracking-widest text-white border border-white/20 backdrop-blur-md"
        style={{ background: `linear-gradient(135deg, ${color.replace(')', ' / 0.9)')}, ${color.replace(')', ' / 0.4)')})` }}
      >
        Quote
      </div>
    </button>
  </Magnetic>
);

/* ─── Service Bento Card ────────────────────────────────────────────────── */

function ServiceBentoCard({ board, isPriority }: { board: Board; isPriority: boolean }) {
  const handleQuoteClick = (text: string) => {
    window.open('https://wa.me/254111480091?text=' + encodeURIComponent(text), "_blank");
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative group rounded-xl overflow-hidden flex flex-col justify-end p-4 min-h-[140px] border border-white/10 ${board.span || "col-span-1"}`}
    >
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
        <Image
          src={board.bgImage}
          alt={board.tagline}
          fill
          priority={isPriority || board.id === "cloud_solutions"}
          loading={isPriority || board.id === "cloud_solutions" ? "eager" : undefined}
          sizes="(max-width: 768px) 50vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div 
        className="absolute inset-0 z-0 opacity-85 transition-opacity duration-500 group-hover:opacity-100 placeholder-glow" 
        style={{ background: board.gradient }}
      />

      {/* Top-Right Anchored Button */}
      <div className="absolute top-2 right-2 z-20">
        <GridButton onClick={() => handleQuoteClick(board.waText)} color={board.accent} />
      </div>

      <div className="relative z-10 space-y-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
          <ServiceIcon path={board.iconPath} color={board.accent} size={16} />
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-white mb-0.5 leading-tight"><DecryptedText text={board.tagline} /></h4>
          <p className="text-[10px] text-white/70 leading-tight line-clamp-2">{board.copy}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── HeroSection ─────────────────────────────────────────────────────────── */

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  const handleNextSlide = useCallback(() => {
    if (paused) return;
    setDirection(1);
    setActiveSlide((s) => (s + 1) % slides.length);
  }, [paused]);

  const onHeadingComplete = () => {
    const timer = setTimeout(() => {
      handleNextSlide();
    }, 4000);
    return () => clearTimeout(timer);
  };

  const goTo = (idx: number) => {
    setDirection(idx > activeSlide ? 1 : -1);
    setActiveSlide(idx);
  };

  const current = slides[activeSlide];

  return (
    <section id="home" className="relative w-full pt-12 pb-20 overflow-x-hidden min-h-[100dvh] flex flex-col justify-center">
      <div className="relative z-10 text-white flex flex-col lg:flex-row-reverse items-center justify-between gap-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Right: Bento Carousel ──────────────────────────────────── */}
        <div
          className="w-full lg:max-w-xl shrink-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Status Badge */}
          <div className="mb-6 w-full">
            <MovingBorderBtn containerClassName="h-10 w-full" className="flex items-center justify-center bg-black/40 border border-[oklch(0.85_0.3_150/0.3)] shrink-0 px-1 sm:px-4">
              <div className="flex items-center gap-1 sm:gap-3 max-w-full overflow-hidden">
                <span className="animate-pulse text-green-400 shrink-0 text-[10px]">●</span>
                <FuzzyText 
                  fontSize="clamp(0.5rem, 2.4vw, 0.75rem)" 
                  fontWeight={700} 
                  color="oklch(0.55 0.18 145)"
                  className="whitespace-nowrap"
                >
                  ENGINEERING THE FUTURE
                </FuzzyText>
                <div className="hidden xs:block h-3 w-px bg-white/10 shrink-0" />
                <RotatingText
                   texts={["INNOVATION", "LEVERAGE", "VELOCITY"]}
                   mainClassName="font-mono text-[7px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.2em] text-white/50 whitespace-nowrap"
                   rotationInterval={3000}
                />
              </div>
            </MovingBorderBtn>
          </div>

          {/* Bento Grid Carousel - Uniform 2-Column Packing */}
          <div className="relative min-h-[360px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 50 * direction, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -50 * direction, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 gap-3"
              >
                {current.boards.map((board, bIdx) => (
                  <ServiceBentoCard key={board.id} board={board} isPriority={activeSlide === 0 && bIdx < 2} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Controls */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeSlide === i ? "w-8 bg-green-400" : "w-1 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Left: Text Block ─────────────────────────────────────────── */}
        <div className="space-y-6 text-center lg:text-left flex-1 max-w-2xl px-2">
          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <AnimatedTooltip
              onHoverChange={setIsTooltipActive}
              items={[{
                id: 1,
                name: "Denis K.",
                designation: "Founder & CEO",
                image: "/images/home/profilepic.png",
                sizes: "56px",
              }]}
            />
            <Magnetic strength={0.3}>
              <a
                href="https://wa.me/254111480091"
                className="group relative px-6 py-3 border border-[oklch(0.85_0.3_150/0.5)] bg-[oklch(0.85_0.3_150)] text-black font-bold text-[12px] tracking-tight transition-all hover:scale-105"
              >
                <GlitchText speed={0.3}>{"\u003E Execute_Custom_Quote"}</GlitchText>
              </a>
            </Magnetic>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.headline}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <TypingText
                  text={"> Initializing High-Performance Global Infrastructure..."}
                  className="text-3xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white"
                  speed={32}
                  delay={250}
                  onComplete={onHeadingComplete}
                />
              </motion.div>
            </AnimatePresence>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 w-20 bg-green-400 mx-auto lg:mx-0 origin-left"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={current.sideDescription}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-gray-400 text-sm lg:text-lg leading-relaxed font-medium"
            >
              {current.sideDescription}
            </motion.p>
          </AnimatePresence>

          <div className="border border-[oklch(0.85_0.3_150/0.3)] bg-[oklch(0_0_0/0.9)] px-4 py-2 text-[10px] sm:text-xs text-[oklch(0.9_0.03_150)] tracking-wide font-mono inline-flex mx-auto lg:mx-0">
            [Status: 100% WCAG Compliant] | [Uptime SLA: 99.9%]
          </div>

          <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
            {[
              { label: "VELOCITY", value: "10x" },
              { label: "PRECISION", value: "99%" },
              { label: "UPTIME", value: "24/7" }
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-[9px] font-bold text-gray-500 tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
