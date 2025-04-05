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

// Shared types to avoid duplication
type CommonProps = {
  children: React.ReactNode;
  duration?: number;
  [key: string]: unknown;
};

// Component for the outer border container
export function MovingBorderBtn({
  borderRadius = "1.75rem",
  children,
  as: Component = "div", // Changed default from "MovingBorder" to "div"
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: CommonProps & {
  borderRadius?: string;
  as?: React.ElementType; // More specific type than 'any'
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
}) {
  return (
    <Component
      className={cn(
        "absolute h-13 w-50 overflow-hidden bg-transparent p-[1px]",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              " h-10 w-50 bg-[radial-gradient(#F8F8FF_20%,transparent_60%)] opacity-[0.2]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

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

// Component for the moving border animation
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
  const pathRef = useRef<SVGRectElement>(null); // More specific type
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
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
