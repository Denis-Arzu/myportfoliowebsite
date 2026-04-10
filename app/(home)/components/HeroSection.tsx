"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { MovingBorderBtn } from "@/components/ui/moving-border";
import { BlurText } from "@/components/ui/blur-text";
import { FuzzyText } from "@/components/ui/fuzzy-text";
import { Magnetic } from "@/components/ui/magnetic";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { GlitchText } from "@/components/ui/glitch-text";
import RotatingText from "@/components/ui/rotating-text";
import RollingProgress from "./RollingProgress";
import { TypingText } from "@/components/ui/typing-text";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/* ─── 4-Card Marketing Board data ───────────────────────────────────────── */

interface Board {
  id: string;
  headline: string;        // drives the main H1
  sideDescription: string; // drives the description on the left
  tagline: string;         // DecryptedText heading inside card
  copy: string;            // body text
  waText: string;
  bgImage: string;
  gradient: string;        // CSS gradient for .card-bg-animated overlay
  accent: string;          // primary OKLCH border/text colour
  iconPath: string;
}

const boards: Board[] = [
  {
    id: "trading_bots",
    headline: "Maximize Profit with Ultra-Low Latency Quant Engines.",
    sideDescription: "Engineered trading infrastructure for financial edge. Our C++ execution core and Python quant models run 24/7 on hardened VPS — delivering alpha as a systems engineering outcome.",
    tagline: "Trading Bots",
    copy: "Custom bots for high-frequency execution and data node analysis.",
    waText: "Hi Dentrix Apps, I need a quote for an Automated Trading Bot/Algorithmic Engine.",
    bgImage: "/images/services/trading_bots_bg.png",
    gradient: "linear-gradient(135deg, oklch(0.65 0.15 60 / 0.18) 0%, oklch(0.10 0 0 / 0.0) 50%, oklch(0.52 0.24 264 / 0.10) 100%)",
    accent: "oklch(0.65 0.15 60)",
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    id: "web_dev",
    headline: "Scalable Web Applications Built for Growth.",
    sideDescription: "We build modern, high-performance web systems using React, Next.js, and solid architectures, prioritizing clean code structures for your digital presence.",
    tagline: "Web Development",
    copy: "Custom web development combining premium aesthetics with resilient foundations.",
    waText: "Hi Dentrix Apps, I need a quote for a Scalable Web Application project.",
    bgImage: "/images/services/web_dev_bg.png",
    gradient: "linear-gradient(135deg, oklch(0.52 0.24 264 / 0.18) 0%, oklch(0.10 0 0 / 0.0) 50%, oklch(0.60 0.22 300 / 0.12) 100%)",
    accent: "oklch(0.52 0.24 264)",
    iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    id: "mobile_app",
    headline: "Cross-platform Mobile Apps with Premium UX.",
    sideDescription: "Expand your reach with performant iOS and Android applications. We deliver holographic-level UI layers and friction-less user experiences on every device.",
    tagline: "Mobile Development",
    copy: "Mobile applications engineered for native-like performance and flawless user journeys.",
    waText: "Hi Dentrix Apps, I need a quote for a Cross-platform Mobile App.",
    bgImage: "/images/services/mobile_app_bg.png",
    gradient: "linear-gradient(135deg, oklch(0.65 0.15 150 / 0.18) 0%, oklch(0.10 0 0 / 0.0) 50%, oklch(0.52 0.24 264 / 0.10) 100%)",
    accent: "oklch(0.65 0.15 150)",
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    id: "ui_ux",
    headline: "Research-driven UI/UX Design for Global Markets.",
    sideDescription: "Abstract flowing interfaces that embody premium aesthetics. We treat intelligence as a first-class product feature, ensuring friction-less user flows that convert.",
    tagline: "UI/UX Design",
    copy: "Deep strategic design that aligns business objectives with compelling user experiences.",
    waText: "Hi Dentrix Apps, I need a quote for a Research-driven UI/UX Design project.",
    bgImage: "/images/services/ui_ux_bg.png",
    gradient: "linear-gradient(135deg, oklch(0.60 0.22 300 / 0.18) 0%, oklch(0.10 0 0 / 0.0) 50%, oklch(0.52 0.24 264 / 0.12) 100%)",
    accent: "oklch(0.60 0.22 300)",
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    id: "cloud_solutions",
    headline: "Resilient Cloud Infrastructure & Modern Migration.",
    sideDescription: "Architecting floating server-cluster nodes in vast data ecosystems. We harden your backend for scale, security, and enterprise-grade reliability.",
    tagline: "Cloud Solutions",
    copy: "Secure environment setups, DevOps, and robust cloud data-center deployment.",
    waText: "Hi Dentrix Apps, I need a quote for Cloud Infrastructure/Migration.",
    bgImage: "/images/services/cloud_solutions_bg.png",
    gradient: "linear-gradient(135deg, oklch(0.55 0.18 245 / 0.18) 0%, oklch(0.10 0 0 / 0.0) 50%, oklch(0.52 0.24 264 / 0.10) 100%)",
    accent: "oklch(0.55 0.18 245)",
    iconPath: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  },
  {
    id: "api_integration",
    headline: "System Integration & Workflow Automation.",
    sideDescription: "Mechanical gears of light interlocking perfectly. Connect siloed platforms and automate redundant tasks to unleash true operational efficiency.",
    tagline: "API Integration",
    copy: "Custom API development and seamless third-party software bridging.",
    waText: "Hi Dentrix Apps, I need a quote for System Integration/Workflow Automation.",
    bgImage: "/images/services/api_integration_bg.png",
    gradient: "linear-gradient(135deg, oklch(0.70 0.15 80 / 0.18) 0%, oklch(0.10 0 0 / 0.0) 50%, oklch(0.52 0.24 264 / 0.10) 100%)",
    accent: "oklch(0.70 0.15 80)",
    iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    id: "seo_marketing",
    headline: "Digital Marketing & Compounding Organic Growth.",
    sideDescription: "Elevate your visibility with glowing data visualization. We merge technical SEO with strategic marketing to drive targeted traffic and exponential growth.",
    tagline: "SEO & Marketing",
    copy: "Data-driven marketing and SEO strategies that dominate search engines.",
    waText: "Hi Dentrix Apps, I need a quote for a Digital Marketing/SEO Strategy.",
    bgImage: "/images/services/seo_marketing_bg.png",
    gradient: "linear-gradient(135deg, oklch(0.60 0.18 20 / 0.18) 0%, oklch(0.10 0 0 / 0.0) 50%, oklch(0.52 0.24 264 / 0.10) 100%)",
    accent: "oklch(0.60 0.18 20)",
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

const CYCLE_MS = 8000;

/* ─── Marketing Board card ───────────────────────────────────────────────── */

function BoardCard({ board, direction, isPriority }: { board: Board; direction: number; isPriority: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const sX = useSpring(spotX, { stiffness: 55, damping: 22 });
  const sY = useSpring(spotY, { stiffness: 55, damping: 22 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleQuoteClick = (text: string) => {
    window.open('https://wa.me/254111480091?text=' + encodeURIComponent(text), "_blank");
  };

  return (
    <motion.div
      ref={cardRef}
      key={board.id}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ 
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] // Faster flick ease
      }}
      onPointerMove={handlePointerMove}
      className="card-bg-animated relative w-full rounded-2xl overflow-hidden flex flex-col gap-4 p-6 cursor-default"
      style={{
        border: `1px solid ${board.accent.replace(")", " / 0.4)")}`,
      }}
    >
      <Image 
        src={board.bgImage} 
        alt={board.tagline} 
        fill 
        priority={isPriority}
        loading={isPriority ? "eager" : "lazy"}
        className="object-cover z-0" 
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" style={{ background: board.gradient }}></div>

      {/* Card-scoped cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl z-10"
        style={{
          background: `radial-gradient(ellipse 50% 40% at ${sX}% ${sY}%, ${board.accent.replace(")", " / 0.14)")} 0%, transparent 70%)`,
        }}
      />

      {/* Header row: icon + founder avatar */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
          style={{
            background: board.accent.replace(")", " / 0.12)"),
            border: `1px solid ${board.accent.replace(")", " / 0.45)")}`,
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke={board.accent} strokeWidth={1.6} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={board.iconPath} />
          </svg>
        </div>

        {/* Dentrix Logo Badge instead of Founder photo */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-md overflow-hidden p-1.5"
          style={{ boxShadow: `0 0 0 2px ${board.accent.replace(")", " / 0.4)")}`, border: `1px solid ${board.accent.replace(")", " / 0.4)")}`, background: 'oklch(0.1 0 0 / 0.6)' }}
        >
          <Image
            src="/images/home/dentrixappslg.png"
            alt="Dentrix Logo"
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Tagline — DecryptedText for technical feel */}
      <h3
        className="relative z-10 text-xl font-bold leading-snug font-mono"
        style={{ color: board.accent }}
      >
        <DecryptedText text={board.tagline} speed={28} scrambleCycles={3} />
      </h3>

      {/* Body */}
      <p className="relative z-10 text-sm text-gray-300 leading-relaxed flex-1">
        {board.copy}
      </p>

      {/* Mini CTA with Magnetic pull */}
      <div className="relative z-10">
        <Magnetic strength={0.35}>
          <div onClick={() => handleQuoteClick(board.waText)} className="cursor-pointer inline-block">
             <MovingBorderBtn
               containerClassName="h-10 p-[1px] rounded-full"
               borderClassName="h-10 w-full"
               borderRadius="9999px"
               className="px-4 text-sm font-semibold whitespace-nowrap bg-black/60 hover:bg-black/80 transition-colors"
             >
               Get a Quote
             </MovingBorderBtn>
          </div>
        </Magnetic>
      </div>
    </motion.div>
  );
}

/* ─── HeroSection ─────────────────────────────────────────────────────────── */

const HeroSection = () => {
  const [activeBoard, setActiveBoard] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 500], [0, -55]);

  // Advance logic: triggered by Heading completion + 1s delay
  const handleNextBoard = useCallback(() => {
    if (paused) return;
    setDirection(1);
    setActiveBoard((b) => (b + 1) % boards.length);
  }, [paused]);

  const onHeadingComplete = () => {
    // Wait 1.5 seconds after typing before instantly swiping another card
    const timer = setTimeout(() => {
      handleNextBoard();
    }, 1500);
    return () => clearTimeout(timer);
  };

  const goTo = (idx: number) => {
    setDirection(idx > activeBoard ? 1 : -1);
    setActiveBoard(idx);
  };

  const current = boards[activeBoard];

  return (
    <section id="home" className="relative w-full pt-4 sm:pt-32 md:pt-0 pb-10 overflow-x-hidden md:overflow-visible min-h-[100dvh] flex flex-col justify-center scroll-mt-32 md:scroll-mt-0">
      <div className="relative z-10 text-white flex flex-col lg:flex-row-reverse items-center justify-between gap-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Right: Marketing Board carousel ─────────────────────────── */}
        <div
          className="w-[calc(100vw-2rem)] sm:w-full sm:max-w-[400px] md:max-w-md shrink-0 min-w-0 max-w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Announcement chip */}
          <div className="mb-5 w-full">
            <MovingBorderBtn className="flex items-center justify-center p-4 hover:scale-105 transition-transform w-full">
              <div className="text-base text-gray-300 whitespace-nowrap flex items-center gap-3">
                {"⚡ "}
                <div className="flex items-center gap-2">
                  <FuzzyText
                    fontSize="1.1rem"
                    fontWeight={900}
                    color="oklch(0.55 0.18 145)"
                    baseIntensity={0.04}
                    hoverIntensity={0.25}
                    fps={24}
                    fuzzRange={8}
                    className="tracking-tight uppercase mt-0.5"
                  >
                    Creative
                  </FuzzyText>
                  <div 
                    className="px-2.5 py-1 rounded-lg border border-white/10"
                    style={{ background: "oklch(0.1 0.01 285 / 0.7)", backdropFilter: "blur(12px)" }}
                  >
                    <RotatingText
                      texts={[
                        "Thinking",
                        "Coding",
                        "Solutions"
                      ]}
                      mainClassName="font-bold text-white tracking-wide"
                      staggerDuration={0.03}
                      staggerFrom="first"
                      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                      rotationInterval={2500}
                    />
                  </div>
                </div>
              </div>
            </MovingBorderBtn>
          </div>

          {/* Card — vertical slide AnimatePresence */}
          <div className={`relative transition-opacity duration-300 ${isTooltipActive ? 'opacity-80' : 'opacity-100'}`} style={{ minHeight: 300 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <BoardCard
                key={current.id}
                board={current}
                direction={direction}
                isPriority={activeBoard < 3}
              />
            </AnimatePresence>
          </div>

          {/* Rolling ball S-curve progress indicator */}
          <RollingProgress
            activeIndex={activeBoard}
            boards={boards}
            onGoTo={goTo}
          />
        </div>

        {/* ── Left: text block ─────────────────────────────────────────── */}
        <div className="space-y-6 text-center lg:text-left max-w-full lg:max-w-lg min-w-0">
          {/* Founder tooltip + CTA */}
          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <AnimatedTooltip
              onHoverChange={setIsTooltipActive}
              items={[{
                id: 1,
                name: "Denis K.",
                designation: "Founder & CEO",
                image: "/images/home/profilepic.png",
              }]}
            />
            <Magnetic strength={0.3}>
              <a
                href="https://wa.me/254111480091"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center text-white bg-trust-gradient hover:scale-[1.02] font-bold tracking-wide transition-all duration-300 px-7 py-3 rounded-full text-sm backdrop-blur-md border border-white/10 group cursor-pointer"
                style={{ boxShadow: "0 0 30px -5px oklch(0.45 0.20 264 / 0.5)" }}
              >
                <GlitchText speed={0.4}>
                  Start a project ➜
                </GlitchText>
              </a>
            </Magnetic>
          </div>

          {/* H1 — synced with active board; parallax + dynamic transition */}
          <motion.div style={{ y: headlineY }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.headline}
                initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <TypingText
                  key={current.headline}
                  text={current.headline}
                  className="lg:text-5xl text-4xl font-bold leading-tight tracking-tight text-white break-words max-w-full"
                  speed={45} // Slower typing for "humble reading time"
                  delay={400} // Start typing sooner after the fast swipe
                  onComplete={onHeadingComplete}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <h2 className="text-xl font-semibold text-[oklch(0.55_0.18_145)] underline underline-offset-8 decoration-2 decoration-[oklch(0.55_0.18_145)/50%]">
            Engineering Infinite Leverage
          </h2>

          <AnimatePresence mode="wait">
            <motion.p 
              key={current.sideDescription}
              initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="text-gray-400 leading-relaxed md:text-lg"
            >
              {current.sideDescription}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
