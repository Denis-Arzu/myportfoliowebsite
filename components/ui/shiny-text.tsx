import React from "react";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  /** Animation duration in seconds. Default: 3 */
  speed?: number;
}

/**
 * Applies a sweeping highlight shimmer over any text node.
 * Uses the .shiny-text CSS class defined in globals.css.
 */
export function ShinyText({ children, className, speed = 3 }: ShinyTextProps) {
  return (
    <span
      className={cn("shiny-text", className)}
      style={{ animationDuration: `${speed}s` }}
    >
      {children}
    </span>
  );
}
