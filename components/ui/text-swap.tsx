"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TextSwapProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

export function TextSwap({ phrases, interval = 3000, className = "" }: TextSwapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval, mounted]);

  // Show static text on SSR/first render to avoid hydration mismatch
  if (!mounted) {
    return <span className={`inline-block ${className}`}>{phrases[0]}</span>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={currentIndex}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={`inline-block ${className}`}
        style={{ willChange: "transform, opacity" }}
      >
        {phrases[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
}

interface TypewriterSwapProps {
  phrases: string[];
  interval?: number;
  typingSpeed?: number;
  className?: string;
}

export function TypewriterSwap({ 
  phrases, 
  interval = 4000, 
  typingSpeed = 80,
  className = "" 
}: TypewriterSwapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1500);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      const deleteTimer = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, typingSpeed / 2);
      return () => clearTimeout(deleteTimer);
    }

    if (displayText === currentPhrase) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setDisplayText(currentPhrase.slice(0, displayText.length + 1));
    }, typingSpeed);

    return () => clearTimeout(typeTimer);
  }, [displayText, isDeleting, isPaused, currentIndex, phrases, typingSpeed]);

  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-block"
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
        />
      </motion.span>
    </span>
  );
}

interface SlideSwapProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

export function SlideSwap({ phrases, interval = 3500, className = "" }: SlideSwapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span className={`relative inline-flex flex-col h-[1.2em] overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={{ y: "100%", opacity: 0, rotateX: -45 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-100%", opacity: 0, rotateX: 45 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {phrases[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
