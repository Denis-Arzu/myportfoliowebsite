'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { TrueFocus } from '@/components/ui/true-focus';

interface Project {
  id: string;
  title: string;
  tagline: string;
  url: string;
  image: string;
  alt: string;
  accentColor: string;   // Tailwind border/button colour token
  buttonColor: string;   // bg class for the CTA button
}

const projects: Project[] = [
  {
    id: "tuandike",
    title: "Tuandike",
    tagline: "Study Smarter with AI",
    url: "https://www.tuandike.online",
    image: "/images/projects/tuandike-screenshot.png",
    alt: "Tuandike — AI-powered study platform",
    accentColor: "border-green-500/30 group-hover:border-green-500/60",
    buttonColor: "bg-green-600 hover:bg-green-500",
  },
  {
    id: "maganji",
    title: "Maganji Engine",
    tagline: "High-Performance Algorithmic Trading Engine",
    url: "https://www.maganji.site",
    image: "/images/projects/maganji-screenshot.png",
    alt: "Maganji Engine — algorithmic trading system",
    accentColor: "border-indigo-500/30 group-hover:border-indigo-500/60",
    buttonColor: "bg-indigo-600 hover:bg-indigo-500",
  },
];

const ProjectsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/15 to-black" />
      <motion.div
        className="absolute inset-0 opacity-25 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, oklch(0.52 0.24 264 / 18%) 0%, transparent 55%)',
            'radial-gradient(circle at 80% 50%, oklch(0.60 0.22 300 / 18%) 0%, transparent 55%)',
            'radial-gradient(circle at 20% 50%, oklch(0.52 0.24 264 / 18%) 0%, transparent 55%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl font-bold text-indigo-400 underline underline-offset-8 decoration-4 decoration-indigo-500/60 mb-2">
            Our Products
          </h2>
          <p className="text-sm text-gray-400 text-center">
            Live, production software built by Dentrix Apps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent shadow-[0_25px_80px_-35px_rgba(79,70,229,0.6)]"
            >
              <div className="relative h-full rounded-3xl border border-white/10 bg-[oklch(0.09_0.015_285/0.8)] backdrop-blur-2xl p-6 sm:p-7">
                <div className="mb-5">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400">{project.tagline}</p>
                </div>

                <TrueFocus blurAmount={2} restOpacity={0.72}>
                  <div
                    className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/70"
                    onClick={() => setActiveId(prev => (prev === project.id ? null : project.id))}
                  >
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain bg-black transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      priority={i === 0}
                    />
                    <div
                      className={`
                        absolute inset-0 flex items-center justify-center
                        transition-opacity duration-300
                        ${activeId === project.id ? 'opacity-100' : 'opacity-0'}
                        md:opacity-0 md:group-hover:opacity-100
                      `}
                      style={{
                        background: 'oklch(0.05 0.005 285 / 0.72)',
                        backdropFilter: 'blur(18px)',
                        WebkitBackdropFilter: 'blur(18px)',
                      }}
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className={`inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 shadow-lg ${project.buttonColor}`}
                      >
                        Visit Website
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </TrueFocus>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
