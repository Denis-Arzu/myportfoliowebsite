"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TrueFocusProps {
  children: React.ReactNode;
  className?: string;
  /** Blur amount (px) applied to the element when NOT focused. Default: 3 */
  blurAmount?: number;
  /** Opacity when not focused. Default: 0.65 */
  restOpacity?: number;
}

/**
 * Wraps any element with a "depth-of-field" feel:
 * blurred + dimmed at rest, sharp + full opacity on hover/focus.
 */
export function TrueFocus({
  children,
  className,
  blurAmount = 3,
  restOpacity = 0.65,
}: TrueFocusProps) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className={cn("relative", className)}
      animate={{
        filter: focused ? "blur(0px)" : `blur(${blurAmount}px)`,
        opacity: focused ? 1 : restOpacity,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </motion.div>
  );
}
