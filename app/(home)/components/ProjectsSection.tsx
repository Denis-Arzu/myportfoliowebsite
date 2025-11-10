'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

const ProjectsSection: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <section id="projects" className=" relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-900/20 to-black" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold text-blue-500 -rotate-8 underline underline-offset-8 decoration-4 decoration-blue-500 mb-8'>🚀My Projects<br />
            </h1>
          </div>

          {/* Tuandike Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mb-12"
            onClick={() => setIsClicked(!isClicked)}
          >
            {/* Project Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-green-500/20 group-hover:border-green-500/40 transition-all duration-300">
              <Image
                src="/images/projects/tuandike-screenshot.png"
                alt="Tuandike - Study Smarter with AI"
                fill
                className="object-contain bg-black"
                priority
              />
              
              {/* Overlay on hover/click */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isClicked ? 1 : 0 }}
                className="md:opacity-0 md:group-hover:opacity-100 absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center"
              >
                <a
                  href="https://www.tuandike.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Website
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;