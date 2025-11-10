"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
    // Track which tooltip is currently shown
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Handle clicks outside tooltip to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Close tooltip if click is outside tooltip area
            if (!target.closest('.tooltip-area')) {
                setHoveredIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>
            {items.map((item, idx) => (
                <div
                    className="group relative tooltip-area"
                    key={item.id}
                    onClick={() => setHoveredIndex(hoveredIndex === idx ? null : idx)} // Toggle tooltip on click
                >
                    {/* Main Profile Image */}
                    <div 
                        className="relative h-[60px] w-[60px] cursor-pointer"
                    >
                        <Image
                            fill
                            src={item.image}
                            alt={item.name}
                            className="rounded-full border-2 border-gray-400 object-cover object-top transition duration-500 group-hover:z-30 group-hover:scale-105"
                        />
                        {/* Online Badge - Shows active status */}
                        <span className="absolute animate-pulse top-1 right-1 h-3.5 w-3.5 rounded-full border-2 bg-green-500">
                            <span className="absolute inset-0 rounded-full bg-green-500 opacity-75"></span>
                        </span>
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 10,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="absolute top-0 z-50 flex -translate-y-1/2 flex-col items-center justify-center rounded-md bg-black p-4 shadow-xl w-[250px] left-[105%] sm:left-[110%] md:left-[120%] max-w-[calc(100vw-80px)] sm:max-w-[250px] tooltip-area"
                            >
                                {/* Expanded Profile Image */}
                                <div className="relative w-full h-[180px] sm:h-[150px] mb-3 rounded-md overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                
                                {/* Decorative Gradient Lines */}
                                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[60%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                                <div className="absolute -bottom-px left-5 z-30 h-px w-[80%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                                
                                {/* User Information */}
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
