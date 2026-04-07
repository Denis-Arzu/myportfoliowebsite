"use client";
import React, { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

interface DecryptedTextProps {
  text: string;
  className?: string;
  /**
   * Milliseconds between each frame tick. Default: 35
   */
  speed?: number;
  /**
   * Frames of scrambling before each character resolves. Default: 6
   */
  scrambleCycles?: number;
}

/**
 * On mount (and when the element enters the viewport), each character
 * cycles through random glyphs before snapping to its final value — left
 * to right, creating a "decryption" reveal effect.
 */
export function DecryptedText({
  text,
  className,
  speed = 35,
  scrambleCycles = 6,
}: DecryptedTextProps) {
  const chars = Array.from(text);
  const [display, setDisplay] = useState<string[]>(
    chars.map(c => (/[\s.,+%]/.test(c) ? c : SCRAMBLE_CHARS[0]))
  );
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Trigger when element scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const resolved = new Array(chars.length).fill(false);
    let tick = 0;

    const interval = setInterval(() => {
      tick++;
      // Resolve characters left-to-right, one every `scrambleCycles` ticks
      const resolveIdx = Math.floor(tick / scrambleCycles);
      if (resolveIdx < chars.length) resolved[resolveIdx] = true;

      if (resolved.every(Boolean)) {
        setDisplay(chars);
        clearInterval(interval);
        return;
      }

      setDisplay(
        chars.map((char, i) => {
          if (resolved[i] || /[\s.,+%]/.test(char)) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
      );
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display.map((char, i) => (
        <span
          key={i}
          className={
            display[i] !== chars[i]
              ? "text-[oklch(0.55_0.18_145)] font-mono"
              : ""
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
}
