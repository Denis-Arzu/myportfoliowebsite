"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { TrueFocus } from "@/components/ui/true-focus";
import { projectsContent } from "@/lib/content-data";

const colors = [
  { accent: "border-green-500/30 group-hover:border-green-500/60", btn: "bg-green-600 hover:bg-green-500", text: "text-green-400" },
  { accent: "border-indigo-500/30 group-hover:border-indigo-500/60", btn: "bg-indigo-600 hover:bg-indigo-500", text: "text-indigo-400" },
  { accent: "border-orange-500/30 group-hover:border-orange-500/60", btn: "bg-orange-600 hover:bg-orange-500", text: "text-orange-400" },
];

export const ProjectsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/15 to-black" />
      <motion.div
        className="absolute inset-0 opacity-25 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, oklch(0.52 0.24 264 / 18%) 0%, transparent 55%)",
            "radial-gradient(circle at 80% 50%, oklch(0.60 0.22 300 / 18%) 0%, transparent 55%)",
            "radial-gradient(circle at 20% 50%, oklch(0.52 0.24 264 / 18%) 0%, transparent 55%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl font-bold text-indigo-400 underline underline-offset-8 decoration-4 decoration-indigo-500/60 mb-2">
            Enterprise Delivery Evidence
          </h2>
          <p className="text-sm text-gray-400 text-center max-w-xl">
            Live, production software built by Dentrix Apps. We don't just build presence — we build performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsContent.map((project, i) => {
            const color = colors[i % colors.length];
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent shadow-[0_25px_80px_-35px_rgba(79,70,229,0.2)] ${project.is_coming_soon ? "opacity-90 grayscale-[30%]" : ""}`}
              >
                <div className={`relative h-full rounded-3xl border ${color.accent} bg-[oklch(0.09_0.015_285/0.8)] backdrop-blur-2xl p-6 flex flex-col`}>
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white tracking-tight leading-tight">
                        {project.name}
                      </h3>
                      <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-white/10 ${color.text} bg-black/50 shrink-0 text-center`}>
                        {project.status.split("—")[0].trim()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed min-h-[36px]">{project.tagline}</p>
                  </div>

                  <TrueFocus blurAmount={2} restOpacity={0.72}>
                    <div
                      className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/70 mb-5"
                      onClick={() => setActiveId((prev) => (prev === project.id ? null : project.id))}
                    >
                      <Image
                        src={project.image_path}
                        alt={project.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className={`object-cover bg-black transition-transform duration-500 ease-out group-hover:scale-[1.02] ${project.is_coming_soon ? "blur-[2px] opacity-60" : ""}`}
                        priority={i === 0}
                      />
                      {project.is_coming_soon && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="px-4 py-2 bg-black/80 border border-white/20 rounded-md text-white font-mono text-xs tracking-widest backdrop-blur-md">
                            IN DEVELOPMENT
                          </span>
                        </div>
                      )}
                      {!project.is_coming_soon && (
                        <div
                          className={`
                            absolute inset-0 flex items-center justify-center
                            transition-opacity duration-300
                            ${activeId === project.id ? "opacity-100" : "opacity-0"}
                            md:opacity-0 md:group-hover:opacity-100
                          `}
                          style={{
                            background: "oklch(0.05 0.005 285 / 0.72)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                          }}
                        >
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold text-xs rounded-full transition-all duration-300 hover:scale-105 shadow-lg ${color.btn}`}
                          >
                            Visit Website
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </TrueFocus>

                  <div className="flex-1 flex flex-col space-y-4">
                    <p className="text-xs text-gray-400 leading-relaxed">{project.description}</p>
                    
                    <div className="space-y-1.5 mt-auto">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">Measurable Impact</p>
                      <div className="grid grid-cols-3 gap-2">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
                            <p className={`text-sm font-bold ${color.text}`}>{m.value}</p>
                            <p className="text-[8px] text-gray-500 leading-tight mt-0.5 uppercase">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                       <div className="flex flex-wrap gap-1.5">
                         {project.stack.map((s, idx) => (
                           <span key={idx} className="text-[9px] px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-300 font-mono">
                             {s}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
