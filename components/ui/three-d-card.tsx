"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees. Default: 14 */
  maxTilt?: number;
  /** Scale on hover. Default: 1.04 */
  hoverScale?: number;
}

/**
 * CSS 3D perspective tilt card.
 * Tracks mouse position relative to the card centre and applies
 * rotateX / rotateY with spring physics.
 */
export function ThreeDCard({
  children,
  className,
  maxTilt = 14,
  hoverScale = 1.04,
}: ThreeDCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Normalised −0.5 → +0.5 mouse position inside the card
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 160, damping: 22, mass: 0.6 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);

  // Map to degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  // Subtle specular glint follows mouse
  const glintX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glintY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={ref}
      className={cn("perspective-1000 cursor-pointer", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: hoverScale }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
        className="relative w-full h-full"
      >
        {children}

        {/* Specular glint layer — sits above content in 3D z-space */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glintX.get()} ${glintY.get()}, oklch(1 0 0 / 0.08) 0%, transparent 60%)`,
            transform: "translateZ(2px)",
          }}
        />
      </motion.div>
    </div>
  );
}
