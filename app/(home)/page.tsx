"use client";
import React, { useState } from "react";
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
import ProjectsSection from './components/ProjectsSection';
import MethodologySection from "./components/MethodologySection";
import { GlobalImpact } from "./components/GlobalImpact";
import { EngineeringStandards } from "./components/EngineeringStandards";
import { TestimonialsSection } from "./components/Testimonials";
import { Footer } from "./components/Footer";

const Page: React.FC = () => {
  const [pageReady, setPageReady] = useState(false);

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
            {/* ── Canvas background: solid black + vortex particles ─── */}
            <div className="fixed inset-0 bg-black" />
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
              <Vortex particleCount={130} intensity={0.85} />
            </div>

            {/* ── Subtle cursor splash ripples ─────────────────────── */}
            <SplashCursor intensity={0.4} />

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
                  className="mt-4 p-6 md:p-8 rounded-xl relative z-10 backdrop-blur-xl bg-black/60 text-gray-300"
                  style={{ border: "1px solid oklch(1 0 0 / 0.1)" }}
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

            {/* ── Products ─────────────────────────────────────────── */}
            <motion.div
              className="min-h-[100dvh] flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 85, damping: 20 }}
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

            {/* ── Footer ───────────────────────────────────────────── */}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Page;
