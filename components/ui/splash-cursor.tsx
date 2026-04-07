"use client";
import React, { useEffect, useRef } from "react";

// Brand colours in rgba (canvas-safe)
const BRAND_COLORS: [number, number, number][] = [
  [99, 102, 241],   // indigo
  [139, 92, 246],   // purple
  [234, 140, 30],   // orange
  [22, 163, 74],    // green
];

interface Drop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: [number, number, number];
}

interface SplashCursorProps {
  /**
   * Controls peak opacity and density of drops. 0 = invisible, 1 = full.
   * Default: 0.4 for a subtle premium feel.
   */
  intensity?: number;
}

/**
 * Canvas overlay that renders expanding ink-drop ripples following the cursor.
 * Purely visual — pointer-events: none.
 */
export function SplashCursor({ intensity = 0.4 }: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drops: Drop[] = [];
    let raf: number;
    let lastX = -1;
    let lastY = -1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      // Only spawn a drop when the cursor has moved enough
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < 200) return;
      lastX = e.clientX;
      lastY = e.clientY;

      const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
      drops.push({
        x: e.clientX,
        y: e.clientY,
        radius: 1,
        maxRadius: 28 + Math.random() * 28,
        opacity: intensity * 0.7,
        color,
      });
      // Cap pool size
      if (drops.length > 30) drops.splice(0, drops.length - 30);
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        const progress = d.radius / d.maxRadius;

        // Expand
        d.radius += (d.maxRadius - d.radius) * 0.06 + 0.4;
        // Fade out accelerates near maxRadius
        d.opacity -= 0.012 + progress * 0.018;

        if (d.opacity <= 0) { drops.splice(i, 1); continue; }

        const [r, g, b] = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${d.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner fill — very subtle
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${d.opacity * 0.15})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}
