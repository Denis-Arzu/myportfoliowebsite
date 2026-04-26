"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from 'next/dynamic';
const HeavyVortex = dynamic(() => import('@/components/ui/vortex').then((m) => m.Vortex), { ssr: false });
const HeavySplashCursor = dynamic(() => import('@/components/ui/splash-cursor').then((m) => m.SplashCursor), { ssr: false });
const HeavyGlobalImpact = dynamic(() => import('./components/GlobalImpact').then((m) => m.GlobalImpact), { ssr: false });
const HeavyMethodologySection = dynamic(() => import('./components/MethodologySection').then((m) => m.default), { ssr: false });
const HeavyEngineeringStandards = dynamic(() => import('./components/EngineeringStandards').then((m) => m.EngineeringStandards), { ssr: false });
const HeavyTestimonials = dynamic(() => import('./components/Testimonials').then((m) => m.TestimonialsSection), { ssr: false });
const HeavyFAQ = dynamic(() => import('./components/FAQSection').then((m) => m.FAQSection), { ssr: false });
const HeavyLeadMagnet = dynamic(() => import('./components/LeadMagnet').then((m) => m.LeadMagnet), { ssr: false });
const HeavyContact = dynamic(() => import('./components/ContactSection').then((m) => m.ContactSection), { ssr: false });
const HeavyProjects = dynamic(() => import('./components/ProjectsSection').then((m) => m.default ?? m.ProjectsSection), { ssr: false });
const HeavyFooter = dynamic(() => import('./components/Footer').then((m) => m.Footer), { ssr: false });
// HeavyUrgencyBar removed per emergency repair plan
import Navbar from "./components/navbar";
const LazyHeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false });
import { About } from "./components/about";
import AboutSectitle from "./components/aboutsectitle";
import Myskillssectitle from "./components/Myskillssectitle";
import { SkillsSection } from "./components/Myskills";
import Loader from "./components/loader";

// Static imports for heavy sections removed in favor of dynamic imports for performance

const Page: React.FC = () => {
  const [pageReady, setPageReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <Loader onDone={() => setPageReady(true)} />

      <AnimatePresence>
        {pageReady && (
          <motion.main
            key="main"
            className="relative text-foreground"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Urgency Bar removed: no banner */}

            {/* ── Canvas background: solid black + vortex particles ─── */}
            <div className="fixed inset-0 bg-black" />
              <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                <HeavyVortex particleCount={isMobile ? 60 : 130} intensity={isMobile ? 0.5 : 0.85} />
              </div>

            {/* ── Subtle cursor splash ripples (desktop only) ────────── */}
              {!isMobile && <HeavySplashCursor intensity={0.4} />}

            {/* ── Hero ─────────────────────────────────────────────── */}
            <div
              id="home"
              className="relative z-10 min-h-[100dvh] flex flex-col justify-center"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <Navbar />
                <div className="pt-24 pb-8">
                  <LazyHeroSection />
                </div>
              </div>
              <div className="h-20 xl:h-32 bg-gradient-to-t from-black absolute bottom-0 left-0 w-full pointer-events-none" />
            </div>

            {/* ── Global Impact ────────────────────────────────────── */}
            <motion.div
              id="impact"
              className="relative z-10 min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <HeavyGlobalImpact />
            </motion.div>

            {/* ── Methodology ──────────────────────────────────────── */}
            <motion.div
              id="methodology"
              className="min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, x: 80, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 90, damping: 22 }}
            >
              <HeavyMethodologySection />
            </motion.div>

            {/* ── About ────────────────────────────────────────────── */}
            <motion.section
              id="about"
              className="relative py-10 min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 90, damping: 22 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AboutSectitle />
                <div
                  className="mt-4 p-6 md:p-8 rounded-xl relative z-10 bg-[oklch(0_0_0/0.92)] text-[oklch(1_0_0)]"
                  style={{ border: "1px solid oklch(0.85 0.3 150 / 0.3)" }}
                >
                  <About />
                </div>
              </div>
            </motion.section>

            {/* ── Capabilities ─────────────────────────────────────── */}
            <motion.section
              id="skills"
              className="relative py-10 min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Myskillssectitle />
                <SkillsSection />
              </div>
            </motion.section>

            {/* ── Engineering Standards ────────────────────────────── */}
            <motion.section
              id="standards"
              className="relative py-10 min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 85, damping: 20 }}
            >
              <HeavyEngineeringStandards />
            </motion.section>

            {/* ── Projects ─────────────────────────────────────────── */}
            <motion.div
              className="min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <HeavyProjects />
            </motion.div>

            {/* ── Testimonials ─────────────────────────────────────── */}
            <motion.div
              className="min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <HeavyTestimonials />
            </motion.div>

            {/* ── FAQ ──────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <HeavyFAQ />
            </motion.div>

            {/* ── Lead Magnet ─────────────────────────────────────── */}
            <HeavyLeadMagnet />

            {/* ── Contact ──────────────────────────────────────────── */}
            <HeavyContact />

            {/* ── Footer ───────────────────────────────────────────── */}
            <HeavyFooter />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Page;
