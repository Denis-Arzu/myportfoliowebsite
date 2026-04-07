"use client";
import React, { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X, ArrowLeft } from 'lucide-react';
import { Magnetic } from '@/components/ui/magnetic';

type Technology = {
  name: string;
  businessValue: string;
  icon: ReactNode;
  description: string;
  proficiency: number;
}

type Skill = {
  type: string;
  icon: ReactNode;
  description: string;
  mainProficiency: number;
  technologies: Technology[];
}

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = skill.technologies.length + 1; // 0 = overview

  const handleOpen = () => {
    setCurrentSlide(0);
    setIsOpen(true);
  };

  const currentTech = skill.technologies[currentSlide - 1];

  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden">

      {/* ── Closed face ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 bg-gray-950/80 backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center gap-6"
        style={{ border: "1px solid oklch(1 0 0 / 0.1)" }}
        animate={{ x: isOpen ? '-100%' : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-16 h-16 flex items-center justify-center text-4xl rounded-xl border border-white/10 bg-white/5">
          {skill.icon}
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-white">{skill.type}</h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{skill.description}</p>
        </div>
        <Magnetic strength={0.3}>
          <button
            onClick={handleOpen}
            className="group flex items-center gap-2 border border-white/15 rounded-full px-5 py-2 text-sm text-gray-400 hover:text-white hover:border-indigo-500/60 transition-all duration-200"
          >
            Explore Capabilities
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Magnetic>
      </motion.div>

      {/* ── Open detail panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-md rounded-xl overflow-hidden"
            style={{ border: "1px solid oklch(1 0 0 / 0.1)" }}
          >
            {/* Nav bar */}
            <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md px-5 py-4 flex justify-between items-center" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.1)" }}>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-500 font-mono">
                {currentSlide + 1} / {totalSlides}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentSlide(p => Math.max(0, p - 1))}
                  disabled={currentSlide === 0}
                  className="text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
                >
                  ◀
                </button>
                <button
                  onClick={() => setCurrentSlide(p => Math.min(totalSlides - 1, p + 1))}
                  disabled={currentSlide === totalSlides - 1}
                  className="text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
                >
                  ▶
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide content */}
            <div className="overflow-y-auto h-[calc(100%-3.5rem)] p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  {currentSlide === 0 ? (
                    /* Overview slide */
                    <div className="space-y-4 text-center">
                      <div className="text-4xl mx-auto w-fit">{skill.icon}</div>
                      <h3 className="text-lg font-bold text-white">{skill.type}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                      <p className="text-xs text-indigo-400/70 italic">
                        Use ▶ to explore individual capabilities →
                      </p>
                    </div>
                  ) : (
                    /* Technology slide */
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{currentTech.icon}</div>
                        <div>
                          {/* Business value label (replaces raw "Node.js Knowledge") */}
                          <p className="text-xs text-indigo-400 uppercase tracking-widest font-medium">
                            {currentTech.businessValue}
                          </p>
                          <h3 className="text-lg font-bold text-white">{currentTech.name}</h3>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 leading-relaxed">
                        {currentTech.description}
                      </p>

                      {/* Proficiency bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Proficiency</span>
                          <span className="font-mono text-white">{currentTech.proficiency}%</span>
                        </div>
                        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${currentTech.proficiency}%` }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-indigo-500 via-[oklch(0.55_0.18_145)] to-green-400 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillCard;
