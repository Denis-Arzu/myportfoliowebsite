"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  className?: string;
  /** Base speed in ms per character. Default: 40 */
  speed?: number;
  /** Delay before starting to type in ms. Default: 0 */
  delay?: number;
  /** Callback when typing is finished */
  onComplete?: () => void;
  /** Show a blinking cursor. Default: true */
  showCursor?: boolean;
  /** Frequency of mistakes (0 to 1). Default: 0.1 */
  mistakeProbability?: number;
}

export function TypingText({
  text,
  className,
  speed = 40,
  delay = 0,
  onComplete,
  showCursor = true,
  mistakeProbability = 0.1,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayedText("");
    setIsFinished(false);

    let currentIdx = 0;
    let isCorrecting = false;

    const getRandomSpeed = (base: number) => {
      // Variance of +/- 40% for human feel
      return base + (Math.random() - 0.5) * base * 0.8;
    };

    const type = () => {
      if (currentIdx < text.length) {
        // Decide if we should make a mistake (only if not currently correcting)
        if (!isCorrecting && Math.random() < mistakeProbability && currentIdx > 0 && currentIdx < text.length - 1) {
          const chars = "abcdefghijklmnopqrstuvwxyz";
          const typo = chars.charAt(Math.floor(Math.random() * chars.length));
          setDisplayedText(text.slice(0, currentIdx) + typo);
          isCorrecting = true;
          
          // Wait slightly longer after a typo
          timeoutRef.current = setTimeout(() => {
            // Backspace to correct
            setDisplayedText(text.slice(0, currentIdx));
            timeoutRef.current = setTimeout(() => {
              isCorrecting = false;
              type(); // Continue typing normally
            }, getRandomSpeed(speed * 2));
          }, getRandomSpeed(speed * 3));
          return;
        }

        const nextChar = text.charAt(currentIdx);
        setDisplayedText(text.slice(0, currentIdx + 1));
        currentIdx++;
        
        // Slower speed for punctuation/spaces
        const waitTime = [".", ",", "!", "?", " "].includes(nextChar) 
          ? getRandomSpeed(speed * 2.5) 
          : getRandomSpeed(speed);

        timeoutRef.current = setTimeout(type, waitTime);
      } else {
        setIsFinished(true);
        onComplete?.();
      }
    };

    const initialDelay = setTimeout(type, delay);

    return () => {
      clearTimeout(initialDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay, onComplete, mistakeProbability]);

  return (
    <div className={cn("inline-flex items-center flex-wrap min-h-[1.2em]", className)}>
      <span className="whitespace-pre-wrap">{displayedText}</span>
      {showCursor && (
        <motion.span
          animate={isFinished ? { opacity: [1, 0] } : { opacity: 1 }}
          transition={isFinished ? { duration: 1, repeat: Infinity, repeatDelay: 0.5 } : { duration: 0.1 }}
          className={cn(
            "inline-block w-[3px] h-[1.1em] bg-[oklch(0.55_0.18_145)] ml-1 shadow-[0_0_8px_oklch(0.55_0.18_145)]",
            !isFinished && "animate-pulse"
          )}
        />
      )}
    </div>
  );
}
