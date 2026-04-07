"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onDone: () => void;
}

const Loader = ({ onDone }: LoaderProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated background pulse */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, oklch(0.52 0.24 264 / 12%) 0%, transparent 55%)',
                'radial-gradient(circle at 80% 50%, oklch(0.60 0.22 300 / 12%) 0%, transparent 55%)',
                'radial-gradient(circle at 20% 50%, oklch(0.52 0.24 264 / 12%) 0%, transparent 55%)',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Logo Image */}
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 mb-2">
                <Image
                  src="/images/home/dentrixappslg.png"
                  alt="Dentrix Apps Logo"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="h-px w-48 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[oklch(0.52_0.24_264)] via-[oklch(0.55_0.18_145)] to-[oklch(0.60_0.22_300)]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
