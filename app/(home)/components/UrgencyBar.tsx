"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function UrgencyBar() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem("urgencyBarDismissed");
    if (wasDismissed === "true") setDismissed(true);
    setMounted(true);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("urgencyBarDismissed", "true");
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[300] overflow-hidden"
          style={{ willChange: "height, opacity" }}
        >
          <div className="bg-[oklch(0.06_0.01_285)] border-b border-[oklch(0.55_0.18_145/0.2)]">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 sm:gap-4">
              {/* Green pulse indicator */}
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-green-400 shrink-0 text-[10px] sm:text-xs"
                aria-hidden="true"
              >
                🟢
              </motion.span>

              {/* Mobile: compact text */}
              <span className="sm:hidden text-[10px] font-mono tracking-wide text-gray-300">
                <span className="font-bold text-white">2 Slots Open</span>
                <span className="text-gray-600 mx-1">·</span>
                <span className="text-gray-400">&lt;12hr Response</span>
              </span>

              {/* Desktop: full text */}
              <span className="hidden sm:flex items-center gap-3 text-xs font-mono tracking-wide">
                <span className="text-gray-300">
                  Q2 2026:{" "}
                  <span className="font-bold text-white">2 Engagement Slots Remaining</span>
                </span>
                <span className="text-gray-600">·</span>
                <span className="text-gray-400">
                  Response Time{" "}
                  <span className="text-[oklch(0.55_0.18_145)] font-bold">&lt;12 Hours</span>{" "}
                  Guaranteed
                </span>
              </span>

              {/* CTA */}
              <a
                href="#contact"
                className="shrink-0 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[oklch(0.55_0.18_145)] text-black hover:bg-[oklch(0.6_0.18_145)] transition-colors"
              >
                Book Now
              </a>

              {/* Dismiss — 44px touch target */}
              <button
                onClick={handleDismiss}
                aria-label="Dismiss availability banner"
                className="shrink-0 w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-gray-600 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
