"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  
  }[];
}) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const handleImageClick = (id: number) => {
    setClickedIndex(clickedIndex === id ? null : id);
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="group relative"
          key={item.id}
        >
          {/* Main Profile Image */}
          <div 
            className="relative h-[60px] w-[60px] cursor-pointer"
            onClick={() => handleImageClick(item.id)}
          >
            <Image
              onMouseMove={handleMouseMove}
              fill
              src={item.image}
              alt={item.name}
              className="rounded-full border-2 border-green-500 object-cover object-top transition duration-500 group-hover:z-30 group-hover:scale-105"
            />
          </div>

          <AnimatePresence mode="popLayout">
            {clickedIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, x: -20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                }}
                className="absolute top-1/2 z-50 flex -translate-y-1/2 flex-col items-center justify-center rounded-md bg-black p-4 shadow-xl w-[250px] left-[105%] sm:left-[110%] md:left-[120%] max-w-[calc(100vw-80px)] sm:max-w-[250px]"
                onMouseMove={handleMouseMove}
              >
                {/* Tooltip Image Container - Adjusted to show full profile */}
                <div className="relative w-full h-[180px] sm:h-[150px] mb-3 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Gradient lines */}
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[60%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-5 z-30 h-px w-[80%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                
                {/* Text content */}
                <div className="relative z-30 text-xs sm:text-base font-bold text-green-400">
                  {item.name}
                </div>
                <div className="text-xs sm:text-sm text-white">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};
