"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Vortex } from "@/components/ui/vortex";
import { SplashCursor } from "@/components/ui/splash-cursor";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import { About } from "./components/about";
import AboutSectitle from "./components/aboutsectitle";
import Myskillssectitle from "./components/Myskillssectitle";
import { SkillsSection } from "./components/Myskills";
import Loader from "./components/loader";

import MethodologySection from "./components/MethodologySection";
import { GlobalImpact } from "./components/GlobalImpact";
import { EngineeringStandards } from "./components/EngineeringStandards";
import { TestimonialsSection } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { ContactSection } from "./components/ContactSection";
import ProjectsSection from "./components/ProjectsSection";
import { UrgencyBar } from "./components/UrgencyBar";
import { FAQSection } from "./components/FAQSection";
import { LeadMagnet } from "./components/LeadMagnet";

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
            {/* ── Urgency Bar ──────────────────────────────────────── */}
            <UrgencyBar />

            {/* ── Canvas background: solid black + vortex particles ─── */}
            <div className="fixed inset-0 bg-black" />
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
              <Vortex particleCount={isMobile ? 60 : 130} intensity={isMobile ? 0.5 : 0.85} />
            </div>

            {/* ── Subtle cursor splash ripples (desktop only) ────────── */}
            {!isMobile && <SplashCursor intensity={0.4} />}

            {/* ── Hero ─────────────────────────────────────────────── */}
            <div
              id="home"
              className="relative z-10 min-h-[100dvh] flex flex-col justify-center"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <Navbar />
                <div className="pt-24 pb-8">
                  <HeroSection />
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
              <GlobalImpact />
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
              <MethodologySection />
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
              <EngineeringStandards />
            </motion.section>

            {/* ── Projects ─────────────────────────────────────────── */}
            <motion.div
              className="min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <ProjectsSection />
            </motion.div>

            {/* ── Testimonials ─────────────────────────────────────── */}
            <motion.div
              className="min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <TestimonialsSection />
            </motion.div>

            {/* ── FAQ ──────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <FAQSection />
            </motion.div>

            {/* ── Lead Magnet ─────────────────────────────────────── */}
            <LeadMagnet />

            {/* ── Contact ──────────────────────────────────────────── */}
            <ContactSection />

            {/* ── Footer ───────────────────────────────────────────── */}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Page;
