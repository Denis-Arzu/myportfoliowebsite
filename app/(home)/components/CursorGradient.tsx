"use client";

import React, { useEffect, useRef } from "react";

export function CursorGradient() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If user prefers reduced motion, render a subtle static gradient and skip listeners
    if (prefersReduced) {
      el.style.setProperty("--cursor-x", `50%`);
      el.style.setProperty("--cursor-y", `50%`);
      el.style.transition = "none";
      el.style.backgroundImage =
        "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 25%), linear-gradient(180deg, rgba(2,6,23,0.6), rgba(10,7,20,0.85))";

      return;
    }

    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const { x, y } = pos.current;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const px = (x / w) * 100;
        const py = (y / h) * 100;
        el.style.setProperty("--cursor-x", `${px}%`);
        el.style.setProperty("--cursor-y", `${py}%`);
      });
    };

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      schedule();
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pos.current.x = t.clientX;
      pos.current.y = t.clientY;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
      style={{
        backgroundImage:
          "radial-gradient(circle at var(--cursor-x,50%) var(--cursor-y,50%), rgba(34,197,94,0.12) 0%, transparent 25%), radial-gradient(circle at calc(var(--cursor-x,50%) + 18%) calc(var(--cursor-y,50%) - 8%), rgba(16,185,129,0.08) 0%, transparent 22%), linear-gradient(180deg, rgba(2,6,23,0.6), rgba(10,7,20,0.85))",
        transition: "background-position 0.12s linear, opacity 0.7s linear",
      }}
    />
  );
}
