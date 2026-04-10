"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface Board {
  id: string;
  accent: string;
  tagline: string;
}

interface RollingProgressProps {
  activeIndex: number;
  boards: Board[];
  onGoTo: (index: number) => void;
}

/* ─── SVG geometry constants ─────────────────────────────────────────────── */

const SVG_WIDTH = 400;
const SVG_HEIGHT = 36;
const PADDING_X = 16;
const AMPLITUDE = 9;
const Y_CENTER = SVG_HEIGHT / 2;
const BALL_SIZE = 14;

/* ─── Path builder: generates a smooth sine wave with N peaks ────────────── */

function buildSinePath(numPeaks: number): {
  pathD: string;
  peakPoints: { x: number; y: number }[];
} {
  const usableWidth = SVG_WIDTH - PADDING_X * 2;
  const segmentWidth = usableWidth / (numPeaks - 1);

  // Peak positions (top of waves)
  const peakPoints: { x: number; y: number }[] = [];
  for (let i = 0; i < numPeaks; i++) {
    peakPoints.push({
      x: PADDING_X + i * segmentWidth,
      y: Y_CENTER - AMPLITUDE,
    });
  }

  // Build smooth cubic bezier S-curve through peaks and valleys
  let d = `M ${peakPoints[0].x} ${peakPoints[0].y}`;

  for (let i = 0; i < numPeaks - 1; i++) {
    const peakX = peakPoints[i].x;
    const peakY = peakPoints[i].y;
    const nextPeakX = peakPoints[i + 1].x;
    const nextPeakY = peakPoints[i + 1].y;
    const valleyY = Y_CENTER + AMPLITUDE;
    const midX = (peakX + nextPeakX) / 2;

    // First half: peak → valley (control points pull down)
    const cp1x = peakX + segmentWidth * 0.35;
    const cp1y = peakY;
    const cp2x = midX - segmentWidth * 0.35;
    const cp2y = valleyY;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${midX} ${valleyY}`;

    // Second half: valley → next peak (control points pull up)
    const cp3x = midX + segmentWidth * 0.35;
    const cp3y = valleyY;
    const cp4x = nextPeakX - segmentWidth * 0.35;
    const cp4y = nextPeakY;
    d += ` C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${nextPeakX} ${nextPeakY}`;
  }

  return { pathD: d, peakPoints };
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function RollingProgress({
  activeIndex,
  boards,
  onGoTo,
}: RollingProgressProps) {
  const numPeaks = boards.length;
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const [ballPos, setBallPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [totalLength, setTotalLength] = useState(0);

  const { pathD, peakPoints } = useMemo(
    () => buildSinePath(numPeaks),
    [numPeaks]
  );

  // Compute the arc-length position for each peak on the SVG path
  const peakDistances = useMemo(() => {
    if (!pathRef.current) return [];
    const path = pathRef.current;
    const total = path.getTotalLength();
    const distances: number[] = [];

    for (const peak of peakPoints) {
      // Binary search for closest point on path to each peak coordinate
      let bestDist = Infinity;
      let bestLen = 0;
      const steps = 500;
      for (let s = 0; s <= steps; s++) {
        const len = (s / steps) * total;
        const pt = path.getPointAtLength(len);
        const dx = pt.x - peak.x;
        const dy = pt.y - peak.y;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          bestLen = len;
        }
      }
      distances.push(bestLen);
    }
    return distances;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathD, peakPoints, totalLength]);

  // Measure total path length on mount
  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  // Animated offset-distance via spring
  const targetDistance = peakDistances.length > 0 ? peakDistances[activeIndex] ?? 0 : 0;
  const springDistance = useSpring(targetDistance, {
    stiffness: 45,
    damping: 18,
    mass: 1.2,
  });

  // Update spring target when activeIndex changes
  useEffect(() => {
    if (peakDistances.length > 0 && peakDistances[activeIndex] !== undefined) {
      springDistance.set(peakDistances[activeIndex]);
    }
  }, [activeIndex, peakDistances, springDistance]);

  // Track ball position on path for visual rendering
  useEffect(() => {
    const unsub = springDistance.on("change", (val) => {
      if (pathRef.current) {
        const pt = pathRef.current.getPointAtLength(val);
        setBallPos({ x: pt.x, y: pt.y });
      }
    });
    return unsub;
  }, [springDistance, pathD]);

  // Initialize ball position
  useEffect(() => {
    if (pathRef.current && peakDistances.length > 0) {
      const pt = pathRef.current.getPointAtLength(peakDistances[activeIndex] ?? 0);
      setBallPos({ x: pt.x, y: pt.y });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalLength]);

  // Animated trail: stroke-dashoffset based on ball position
  const trailOffset = useTransform(springDistance, (val) => {
    if (totalLength === 0) return totalLength;
    return totalLength - val;
  });

  const currentAccent = boards[activeIndex]?.accent ?? "oklch(0.55 0.18 145)";
  // Derive a softer accent for the glow
  const glowAccent = currentAccent.replace(")", " / 0.5)");
  const trailAccent = currentAccent.replace(")", " / 0.6)");

  return (
    <div className="relative w-full mt-5" style={{ height: SVG_HEIGHT + BALL_SIZE }}>
      {/* SVG container */}
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full"
        style={{ height: SVG_HEIGHT, overflow: "visible" }}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Defs: glow filter for the trail */}
        <defs>
          <filter id="trail-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ball-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1: Base guide line */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="oklch(1 0 0 / 0.07)"
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* Layer 2: Glowing trail that follows the ball */}
        {totalLength > 0 && (
          <motion.path
            ref={trailRef}
            d={pathD}
            stroke={trailAccent}
            strokeWidth={3.5}
            strokeLinecap="round"
            fill="none"
            filter="url(#trail-glow)"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={totalLength}
            style={{ strokeDashoffset: trailOffset }}
            transition={{ type: "spring", stiffness: 45, damping: 18 }}
          />
        )}

        {/* Layer 3: Peak dots — clickable hit targets */}
        {peakPoints.map((peak, i) => (
          <g key={boards[i]?.id ?? i} className="cursor-pointer" onClick={() => onGoTo(i)}>
            {/* Invisible hit area */}
            <circle
              cx={peak.x}
              cy={peak.y}
              r={10}
              fill="transparent"
              className="pointer-events-auto"
            />
            {/* Visible peak dot */}
            <circle
              cx={peak.x}
              cy={peak.y}
              r={i === activeIndex ? 3.5 : 2}
              fill={i === activeIndex ? currentAccent : "oklch(1 0 0 / 0.15)"}
              style={{
                transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                filter: i === activeIndex ? "url(#ball-glow)" : "none",
              }}
            />
          </g>
        ))}
      </svg>

      {/* Layer 4: Rolling ball (DOM element for richer effects) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: BALL_SIZE,
          height: BALL_SIZE,
          // Position ball centered on SVG coordinates
          // We need to convert SVG coordinates to percentage-based positioning
          left: `calc(${(ballPos.x / SVG_WIDTH) * 100}% - ${BALL_SIZE / 2}px)`,
          top: `calc(${(ballPos.y / SVG_HEIGHT) * SVG_HEIGHT}px - ${BALL_SIZE / 2}px + 0px)`,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, oklch(1 0 0 / 0.9), ${currentAccent})`,
          boxShadow: `
            0 0 12px 4px ${glowAccent},
            0 0 30px 8px ${currentAccent.replace(")", " / 0.25)")},
            inset 0 -2px 4px ${currentAccent.replace(")", " / 0.3)")}
          `,
          border: `1px solid ${currentAccent.replace(")", " / 0.7)")}`,
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            top: 3,
            left: 4,
            background: "oklch(1 0 0 / 0.7)",
            filter: "blur(1px)",
          }}
        />
      </motion.div>
    </div>
  );
}
