"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const MIN_DISPLAY_MS = 1800;
const MAX_DISPLAY_MS = 3500;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const dismissRef = useRef(false);

  useEffect(() => {
    const startTime = Date.now();

    function dismiss() {
      if (dismissRef.current) return;
      dismissRef.current = true;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => setVisible(false), remaining);
    }

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    const safety = setTimeout(() => {
      if (!dismissRef.current) dismiss();
    }, MAX_DISPLAY_MS);

    return () => {
      window.removeEventListener("load", dismiss);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050506]"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.55 0.18 145 / 0.08), transparent 70%)",
            }}
          />

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white/90 font-[family-name:var(--font-geist-sans)]">
              Dentrix
            </span>
            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[oklch(0.55_0.18_145)] font-[family-name:var(--font-geist-sans)]">
              Apps
            </span>
          </motion.div>

          {/* Loading bar */}
          <div className="mt-8 h-[1px] w-32 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                repeat: Infinity,
              }}
              className="h-full w-full bg-gradient-to-r from-transparent via-[oklch(0.55_0.18_145/0.6)] to-transparent"
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="mt-5 text-[11px] font-mono uppercase tracking-[0.2em] text-white/20"
          >
            AI Assistants for Salons, Gyms & Dental
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
