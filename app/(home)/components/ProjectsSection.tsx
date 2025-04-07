'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection: React.FC = () => {
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
          <div className=' flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold text-blue-500 -rotate-8 underline underline-offset-8 decoration-4 decoration-blue-500 mb-8'>🚀My Projects<br />
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-black/40 backdrop-blur-lg border border-indigo-500/20 rounded-2xl p-8 md:p-12 text-center overflow-hidden group"
          >
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-indigo-500/0 animate-gradient-x" />
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/0 via-purple-500/30 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-7xl mb-6"
            >
              🚧
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-transparent bg-clip-text group-hover:from-pink-300 group-hover:via-purple-300 group-hover:to-indigo-300 transition-all duration-500">
                Coming Soon
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto group-hover:text-gray-200 transition-colors duration-300"
            >
              I&apos;m currently working on some exciting projects. Stay tuned for updates!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-8 flex justify-center"
            >
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-500"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;