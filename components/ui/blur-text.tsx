"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  /**
   * Delay between each CHARACTER in seconds. Default: 0.05
   * Creates the cinematic per-letter "camera-focusing" effect.
   */
  stagger?: number;
  /** Initial blur radius in px. Default: 12 */
  blurAmount?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function BlurText({
  text,
  className,
  stagger = 0.05,
  blurAmount = 12,
  as: Tag = "h1",
}: BlurTextProps) {
  // Split into words, each word into characters — preserves natural word-wrapping
  const words = text.split(" ");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: `blur(${blurAmount}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  // Pre-compute a flat character index for stagger timing
  let charIndex = 0;

  return (
    // @ts-expect-error dynamic tag ref
    <Tag ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex mr-[0.25em] last:mr-0">
          {Array.from(word).map((char) => {
            const delay = charIndex++ * stagger;
            return (
              <motion.span
                key={`${wIdx}-${delay}`}
                variants={charVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{
                  duration: 0.55,
                  delay,
                  // power4.out cubic-bezier approximation
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
