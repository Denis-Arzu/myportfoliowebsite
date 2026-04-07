"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Brand-aligned particle colours (rgba-safe for canvas)
const PARTICLE_COLORS: [number, number, number][] = [
  [99,  102, 241],  // indigo
  [139, 92,  246],  // purple
  [234, 140, 30],   // orange (accent — fewer particles)
  [99,  102, 241],  // indigo (weighted)
  [139, 92,  246],  // purple (weighted)
  [22,  163, 74],   // green (sparse)
];

interface Particle {
  angle: number;       // current angle around the vortex centre
  orbitRadius: number; // distance from centre
  speed: number;       // angular velocity (rad/frame)
  size: number;        // dot radius in px
  opacity: number;
  color: [number, number, number];
  drift: number;       // slight radial drift so orbits breathe
  driftPhase: number;
}

interface VortexProps {
  className?: string;
  /** Number of particles. Default: 140 */
  particleCount?: number;
  /** Base opacity multiplier. Default: 1 */
  intensity?: number;
}

/**
 * Canvas-based particle vortex. Particles orbit a centre point that
 * lazily follows the mouse — symbolising "Intelligence in motion".
 * Replaces the static Spotlight as the atmospheric page background.
 */
export function Vortex({ className, particleCount = 140, intensity = 1 }: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const centreRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Setup ──────────────────────────────────────────────────────────
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centreRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      if (mouseRef.current.x < 0) mouseRef.current = { ...centreRef.current };
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    // ── Initialise particles ───────────────────────────────────────────
    const maxOrbit = Math.min(canvas.width, canvas.height) * 0.42;

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      orbitRadius: 40 + Math.random() * maxOrbit,
      speed: (0.0008 + Math.random() * 0.002) * (Math.random() < 0.5 ? 1 : -1),
      size: 0.6 + Math.random() * 1.6,
      opacity: (0.08 + Math.random() * 0.35) * intensity,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      drift: 0.5 + Math.random() * 1.5,
      driftPhase: Math.random() * Math.PI * 2,
    }));

    // ── Draw loop ──────────────────────────────────────────────────────
    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Centre lerps toward mouse slowly (intelligence gravity)
      const target = mouseRef.current;
      centreRef.current.x += (target.x - centreRef.current.x) * 0.018;
      centreRef.current.y += (target.y - centreRef.current.y) * 0.018;

      const cx = centreRef.current.x;
      const cy = centreRef.current.y;

      for (const p of particles) {
        // Advance angle
        p.angle += p.speed;

        // Radial breathing
        const r = p.orbitRadius + Math.sin(frame * 0.003 + p.driftPhase) * p.drift * 8;

        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * r;

        const [red, green, blue] = p.color;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${red},${green},${blue},${p.opacity})`;
        ctx.fill();
      }

      // Subtle radial glow at centre — drawn with a gradient circle
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
      grad.addColorStop(0, `rgba(99,102,241,${0.06 * intensity})`);
      grad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, [particleCount, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
    />
  );
}
