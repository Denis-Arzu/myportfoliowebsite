"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  /**
   * Primary colour (indigo-leaning). Default: oklch(0.6 0.2 285 / 0.15)
   */
  fill?: string;
  /**
   * Secondary warm accent colour. Default: oklch(0.65 0.15 60 / 0.08) — soft orange.
   * Renders as a second, offset ellipse for the indigo/orange depth mix.
   */
  fillWarm?: string;
}

export function Spotlight({
  className,
  fill = "oklch(0.6 0.2 285 / 0.15)",
  fillWarm = "oklch(0.65 0.15 60 / 0.08)",
}: SpotlightProps) {
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const springX = useSpring(mouseX, { stiffness: 55, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 22 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}
      style={{ x: springX, y: springY }}
    >
      <svg
        className="absolute -top-[40%] -left-[40%] h-[180%] w-[180%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cool indigo cone */}
          <radialGradient id="spot-cool" cx="50%" cy="50%" r="40%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={fill} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Warm orange accent — offset slightly */}
          <radialGradient id="spot-warm" cx="55%" cy="52%" r="28%" fx="55%" fy="52%">
            <stop offset="0%" stopColor={fillWarm} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Primary indigo ellipse */}
        <ellipse cx="50%" cy="50%" rx="36%" ry="26%" fill="url(#spot-cool)" />
        {/* Warm accent — slightly offset for depth */}
        <ellipse cx="54%" cy="52%" rx="22%" ry="16%" fill="url(#spot-warm)" />
      </svg>
    </motion.div>
  );
}
