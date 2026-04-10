"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  className?: string;
  /** Speed in ms per character. Default: 40 */
  speed?: number;
  /** Delay before starting to type in ms. Default: 0 */
  delay?: number;
  /** Callback when typing is finished */
  onComplete?: () => void;
  /** Show a blinking cursor. Default: true */
  showCursor?: boolean;
}

export function TypingText({
  text,
  className,
  speed = 40,
  delay = 0,
  onComplete,
  showCursor = true,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setIsFinished(false);
    
    const startTyping = () => {
      let currentIdx = 0;
      const type = () => {
        if (currentIdx < text.length) {
          setDisplayedText(text.slice(0, currentIdx + 1));
          currentIdx++;
          timeoutRef.current = setTimeout(type, speed);
        } else {
          setIsFinished(true);
          onComplete?.();
        }
      };
      type();
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <div className={cn("inline-block", className)}>
      <span>{displayedText}</span>
      {showCursor && !isFinished && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="inline-block w-[2px] h-[1em] bg-[oklch(0.55_0.18_145)] ml-1 translate-y-[0.1em]"
        />
      )}
    </div>
  );
}
