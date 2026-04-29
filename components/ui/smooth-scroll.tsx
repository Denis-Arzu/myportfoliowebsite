"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.035, duration: 2.2, smoothWheel: true, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children}
    </ReactLenis>
  );
}
