"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CommonProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

interface MovingBorderBtnProps extends CommonProps {
  borderRadius?: string;
  as?: React.ElementType;
  borderClassName?: string;
}

export function MovingBorderBtn({
  borderRadius = "1.75rem",
  children,
  as: Component = "div",
  containerClassName,
  borderClassName,
  className,
  ...otherProps
}: MovingBorderBtnProps) {
  return (
    <Component
      className={cn(
        "relative h-16 w-70 overflow-hidden bg-transparent p-[1px]",
        containerClassName
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
        <MovingBorder
          className={borderClassName}
          containerClassName="h-10 w-60 bg-[radial-gradient(#F8F8FF_20%,transparent_60%)] opacity-[0.2]"
        >
          <div />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-indigo-500/20 bg-black/40 text-sm text-white antialiased backdrop-blur-xl",
          className
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

export const MovingBorder = ({
  children,
  className,
  containerClassName,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl p-[1px]",
        containerClassName
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute inset-[1px] rounded-xl bg-black"
          animate={{
            background: [
              "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 100%)",
              "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.9) 100%)",
              "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 100%)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
