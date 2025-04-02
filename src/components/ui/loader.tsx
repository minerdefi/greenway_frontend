"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const leafVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }),
    exit: (i: number) => ({
        opacity: 0,
        scale: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.4,
            ease: [0.215, 0.61, 0.355, 1]
        }
    })
};

const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.6,
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.3,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }
};

const containerVariants = {
    exit: {
        opacity: 0,
        transition: {
            delay: 0.8,
            duration: 0.5,
            ease: "easeInOut",
            when: "afterChildren",
        }
    }
};

export interface LoaderProps {
    onLoadingComplete?: () => void;
    duration?: number;
    className?: string;
    showText?: boolean;
}

export function Loader({
    onLoadingComplete,
    duration = 3000,
    className,
    showText = true
}: LoaderProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (onLoadingComplete) {
                onLoadingComplete();
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onLoadingComplete]);

    // SVG leaf elements for the animated logo
    const leaves = [
        {
            path: "M20,10 C20,15.52 15.52,20 10,20 C4.48,20 0,15.52 0,10 C0,4.48 4.48,0 10,0 C15.52,0 20,4.48 20,10 Z",
            color: "#0A3622",
            x: 0,
            y: 0,
            rotate: 0
        },
        {
            path: "M15,7.5 C15,11.64 11.64,15 7.5,15 C3.36,15 0,11.64 0,7.5 C0,3.36 3.36,0 7.5,0 C11.64,0 15,3.36 15,7.5 Z",
            color: "#155D36",
            x: 15,
            y: 13,
            rotate: 15
        },
        {
            path: "M12,6 C12,9.31 9.31,12 6,12 C2.69,12 0,9.31 0,6 C0,2.69 2.69,0 6,0 C9.31,0 12,2.69 12,6 Z",
            color: "#1C7C4A",
            x: 26,
            y: 8,
            rotate: 30
        },
    ];

    return (
        <motion.div
            className={cn(
                "fixed inset-0 flex flex-col items-center justify-center z-50 bg-white",
                className
            )}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={containerVariants.exit}
        >
            <div className="relative flex items-center justify-center w-32 h-32">
                {leaves.map((leaf, index) => (
                    <motion.div
                        key={index}
                        initial="initial"
                        animate={loading ? "animate" : "exit"}
                        custom={index}
                        variants={leafVariants}
                        className="absolute"
                    >
                        <svg
                            width={leaf.x + 20}
                            height={leaf.y + 20}
                            viewBox={`0 0 ${leaf.x + 20} ${leaf.y + 20}`}
                            style={{
                                transform: `translate(${-leaf.x / 2}px, ${-leaf.y / 2}px) rotate(${leaf.rotate}deg)`
                            }}
                        >
                            <path d={leaf.path} fill={leaf.color} />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {showText && (
                <motion.div
                    className="mt-6 flex flex-col items-center"
                    initial="initial"
                    animate={loading ? "animate" : "exit"}
                    variants={textVariants}
                >
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0A3622] to-[#1C7C4A]">
                        Greenway
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">Sustainable Logistics</p>
                </motion.div>
            )}
        </motion.div>
    );
}
