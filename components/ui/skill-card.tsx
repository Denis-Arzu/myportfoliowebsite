"use client";
import React, { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, ArrowLeft } from 'lucide-react';
import { SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';

type Technology = {
  name: string;
  icon: ReactNode;
  description: string;
  proficiency: number;
}

type Skill = {
  type: string;
  icon: ReactNode;
  description: string;
  technologies: Technology[];
}

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const totalSlides = skill.technologies.length + 1; // +1 for overview

  const handleOpen = () => {
    setCurrentSlide(0); // Reset to overview slide
    setIsOpen(true);
  };

  return (
    <div className="relative w-full max-w-sm min-h-[400px] h-auto rounded-xl overflow-hidden">
      {/* Main Card */}
      <motion.div
        className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center"
        animate={{ x: isOpen ? '-100%' : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative w-16 h-16 mb-4">
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {skill.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-green-400 mb-4">{skill.type}</h3>
        <button
          onClick={handleOpen}
          className="group flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
        >
          View More
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Sliding Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden"
          >
            {/* Navigation - Fixed at top */}
            <div className="sticky top-0 z-10 bg-gray-900/90 p-6 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">
                    {currentSlide + 1}/{totalSlides}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                      disabled={currentSlide === 0}
                    >
                      ◀
                    </button>
                    <button
                      onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                      disabled={currentSlide === totalSlides - 1}
                    >
                      ▶
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(100%-5rem)] p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  {currentSlide === 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-green-400">Overview</h3>
                      <p className="text-gray-300">{skill.description}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">
                          {skill.technologies[currentSlide - 1].icon}
                        </div>
                        <h3 className="text-xl font-bold text-green-400">
                          {skill.technologies[currentSlide - 1].name}
                        </h3>
                      </div>
                      <p className="text-gray-300">
                        {skill.technologies[currentSlide - 1].description}
                      </p>
                      <div className="space-y-2">
                        <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.technologies[currentSlide - 1].proficiency}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-orange-400"
                          />
                        </div>
                        <span className="text-sm text-gray-400">
                          {skill.technologies[currentSlide - 1].proficiency}% Proficient
                        </span>
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