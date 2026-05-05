"use client";

import React from "react";
import { motion } from "motion/react";
import { voiceDemosContent } from "@/lib/content-data";
import { AudioPlayer } from "./AudioPlayer";
import { ArrowRight } from "lucide-react";

export const VoiceDemoSection: React.FC = () => {
  const { sectionTitle, sectionSubtitle, demos, sectionCta } = voiceDemosContent;

  return (
    <section id="portfolio" className="relative py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white/80 tracking-tight mb-3">
            {sectionTitle}
          </h2>
          <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Demo rows */}
        <div className="space-y-4">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <AudioPlayer
                src={demo.audioFile}
                title={demo.title}
                voice={demo.voice}
                duration={demo.duration}
                badge={demo.badge}
                tags={demo.tags}
              />
              {/* Description is not in AudioPlayer props, show below */}
              <p className="text-xs text-white/35 leading-relaxed mt-1 px-4 sm:px-5 max-w-3xl">
                {demo.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href={sectionCta.href}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            {sectionCta.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceDemoSection;
