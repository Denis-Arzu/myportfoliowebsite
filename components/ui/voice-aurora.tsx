"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface VoiceAuroraProps {
  isMobile?: boolean;
  className?: string;
}

export const VoiceAurora: React.FC<VoiceAuroraProps> = ({
  isMobile = false,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollPosRef = useRef(0);
  const requestRef = useRef<number>(null);
  const timeRef = useRef(0);

  // Band configurations
  const bands = [
    {
      color: "oklch(0.55 0.18 145 / 0.12)", // Brand Green
      speed: 0.0004,
      amplitude: isMobile ? 30 : 50,
      frequency: 0.0015,
      offset: 0,
    },
    {
      color: "oklch(0.52 0.24 264 / 0.10)", // Brand Indigo
      speed: 0.0003,
      amplitude: isMobile ? 25 : 40,
      frequency: 0.002,
      offset: Math.PI / 3,
    },
    {
      color: "oklch(0.60 0.22 300 / 0.06)", // Brand Purple
      speed: 0.0005,
      amplitude: isMobile ? 35 : 60,
      frequency: 0.001,
      offset: Math.PI / 1.5,
    },
    {
      color: "rgba(255, 255, 255, 0.03)", // Shimmer
      speed: 0.0008,
      amplitude: isMobile ? 15 : 25,
      frequency: 0.003,
      offset: Math.PI,
    },
    {
      color: "oklch(0.55 0.18 145 / 0.08)", // Brand Green 2
      speed: 0.00035,
      amplitude: isMobile ? 20 : 35,
      frequency: 0.0018,
      offset: Math.PI / 4,
    },
  ];

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      const time = timeRef.current;
      const scrollY = scrollPosRef.current;
      
      // Parallax effect
      const parallaxOffset = scrollY * 0.12;
      
      // Fade out as we scroll deep
      const fadeStart = height * 0.7;
      const fadeEnd = height * 1.2;
      let globalOpacity = 1;
      
      if (scrollY > fadeStart) {
        globalOpacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }

      if (globalOpacity <= 0) return;

      ctx.globalAlpha = globalOpacity;
      ctx.globalCompositeOperation = "screen";

      bands.forEach((band, i) => {
        ctx.beginPath();
        
        const baseLine = height * 0.3 + (i * 40) - parallaxOffset;
        
        for (let x = 0; x <= width; x += 5) {
          const t = time * band.speed;
          const angle = x * band.frequency + t + band.offset;
          
          // Primary wave
          let y = Math.sin(angle) * band.amplitude;
          
          // Harmonic wave for organic feel
          y += Math.sin(angle * 0.5 + t * 0.7) * (band.amplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, baseLine + y);
          } else {
            ctx.lineTo(x, baseLine + y);
          }
        }

        // Create the band width by drawing back with a phase shift
        for (let x = width; x >= 0; x -= 5) {
          const t = time * band.speed;
          const angle = x * band.frequency + t + band.offset + 0.8; // Phase shift for width
          let y = Math.sin(angle) * (band.amplitude * 1.2);
          y += Math.sin(angle * 0.4 + t * 0.5) * (band.amplitude * 0.4);
          
          ctx.lineTo(x, baseLine + y + (isMobile ? 80 : 150));
        }

        ctx.closePath();

        // Vertical gradient for the aurora glow
        const gradient = ctx.createLinearGradient(0, baseLine - 100, 0, baseLine + 300);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.3, band.color);
        gradient.addColorStop(0.7, band.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Radial vignette to center the focus
      ctx.globalCompositeOperation = "multiply";
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2.5, 0,
        width / 2, height / 2, width * 0.8
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.4)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    },
    [bands, isMobile]
  );

  const animate = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      timeRef.current = time;
      draw(ctx, canvas.width, canvas.height);
      requestRef.current = requestAnimationFrame(animate);
    },
    [draw]
  );

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // If prefers-reduced-motion, draw one frame and stop
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const ctx = canvas.getContext("2d");
        if (ctx) draw(ctx, canvas.width, canvas.height);
      }
    };

    const handleScroll = () => {
      scrollPosRef.current = window.scrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleResize();
    handleScroll();

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate, draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};
