"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Define common props interface used by both components
type CommonProps = {
  children: React.ReactNode;
  duration?: number; // Animation duration in milliseconds
  [key: string]: unknown; // Allow additional props
};

/**
 * MovingBorderBtn - A button component with an animated moving border effect
 * @param borderRadius - Border radius of the button (default: "1.75rem")
 * @param children - Content to render inside the button
 * @param as - Component to render as (default: "div")
 * @param containerClassName - Additional classes for container
 * @param borderClassName - Additional classes for border
 * @param duration - Animation duration
 * @param className - Additional classes for main content
 */
export function MovingBorderBtn({
  borderRadius = "1.75rem",
  children,
  as: Component = "div",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: CommonProps & {
  borderRadius?: string;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
}) {
  return (
    <Component
      className={cn(
        "absolute h-16 w-70 overflow-hidden bg-transparent p-[1px]",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      {/* Border container with gradient background */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              " h-10 w-60 bg-[radial-gradient(#F8F8FF_20%,transparent_60%)] opacity-[0.2]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      {/* Main content container */}
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-green-800 bg-black-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

/**
 * MovingBorder - Creates an animated border effect using SVG and motion
 * @param children - Content to render with the moving border effect
 * @param duration - Animation duration in milliseconds (default: 3000)
 * @param rx - Horizontal border radius of SVG rect
 * @param ry - Vertical border radius of SVG rect
 */
export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: CommonProps & {
  rx?: string;
  ry?: string;
}) => {
  // Reference to SVG rect element for path calculations
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  // Animate the border movement
  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  // Transform progress value into x/y coordinates along the path
  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0
  );

  // Create transform template for positioning
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      {/* SVG container for the border path */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      {/* Animated element that follows the border path */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
