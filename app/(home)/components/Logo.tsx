"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

/**
 * Logo Component
 * - Green Android head (oklch(0.55 0.18 145))
 * - Bold stylized 'A' (text-white/foreground)
 * - Motion animations for entrance and hover
 */
const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <Link 
      href="#home" 
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer group ${className}`}
    >
      {/* Vector Branding - Head + Stylized 'A' */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ 
          duration: 0.5, 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        className="relative z-10 shrink-0"
      >
        <svg
          viewBox="0 0 100 160"
          className="w-auto h-8 lg:h-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.2)]"
        >
          {/* Android Head - Brand Dark Green */}
          <g fill="#006400">
            {/* Antennas */}
            <motion.path
              d="M32 20 L22 4"
              stroke="#006400"
              strokeWidth="4"
              strokeLinecap="round"
              animate="initial"
              whileHover="hover"
              variants={{
                initial: { rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
                hover: { rotate: [-10, 10, -10], transition: { repeat: Infinity, duration: 0.4 } }
              }}
              style={{ originX: "32px", originY: "20px" }}
            />
            <motion.path
              d="M68 20 L78 4"
              stroke="#006400"
              strokeWidth="4"
              strokeLinecap="round"
              animate="initial"
              whileHover="hover"
              variants={{
                initial: { rotate: [2, -2, 2], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
                hover: { rotate: [10, -10, 10], transition: { repeat: Infinity, duration: 0.4 } }
              }}
              style={{ originX: "68px", originY: "20px" }}
            />
            {/* Head Dome */}
            <path
              d="M20 54C20 38.5 33.5 26 50 26C66.5 26 80 38.5 80 54H20Z"
            />
            {/* Eyes */}
            <circle cx="40" cy="42" r="3.5" fill="black" />
            <circle cx="60" cy="42" r="3.5" fill="black" />
          </g>

          {/* Stylized 'A' - Precise Vector Reconstruction */}
          <path
            d="M50 65 L25 148 H40 L50 115 L60 148 H75 L50 65 Z M50 82 L58 106 H42 L50 82 Z"
            fill="currentColor"
            className="text-white drop-shadow-lg"
          />
        </svg>
      </motion.div>
    </Link>
  );
};

export default Logo;
