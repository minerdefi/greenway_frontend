"use client"

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

// Define stats items with more detailed information
const stats = [
    {
        value: 98,
        suffix: "%",
        label: "On-time delivery",
        icon: "clock",
        description: "Consistently reliable service",
        color: "#0A3622" // Dark green
    },
    {
        value: 25,
        suffix: "K+",
        label: "Daily shipments",
        icon: "package",
        description: "Global shipment capacity",
        color: "#155D36" // Medium green
    },
    {
        value: 30,
        prefix: "-",
        suffix: "%",
        label: "Carbon emissions",
        icon: "leaf",
        description: "Reduced environmental impact",
        color: "#1C7C4A" // Light green
    },
    {
        value: 150,
        suffix: "+",
        label: "Countries served",
        icon: "globe",
        description: "Worldwide service network",
        color: "#0A3622" // Dark green
    }
];

// Counter component with animation from 0 to target value
function AnimatedCounter({ value, prefix = "", suffix = "", duration = 2 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        // First set to 0
        setCount(start);

        // Find duration per increment
        const incrementTime = (duration * 1000) / value;

        // Don't use setInterval for smoother animation
        let timer: number | undefined;

        const updateCounter = () => {
            start += 1;
            setCount(start);

            if (start < value) {
                timer = window.setTimeout(updateCounter, incrementTime);
            }
        };

        timer = window.setTimeout(updateCounter, incrementTime);

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [value, duration, isInView]);

    return (
        <span ref={ref}>{prefix}{count}{suffix}</span>
    );
}

export default function StatsSection() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-charcoal/80 dark:to-charcoal/90 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: "radial-gradient(#0A3622 2px, transparent 2px)",
                    backgroundSize: "30px 30px"
                }}></div>
            </div>

            {/* Background blobs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-dark/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-medium/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center rounded-full mb-3"
                        style={{
                            background: 'linear-gradient(to right, rgba(10, 54, 34, 0.1), rgba(28, 124, 74, 0.1))',
                            padding: '10px 20px'
                        }}
                    >
                        <span
                            className="h-2 w-2 rounded-full mr-2"
                            style={{
                                background: 'linear-gradient(to right, #0A3622, #1C7C4A)'
                            }}
                        ></span>
                        <span className="text-sm text-green-dark dark:text-green-light font-medium">Our Impact</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-white mb-5">
                        Delivering <span className="text-green-medium">Results</span> That Matter
                    </h2>

                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
                        Our commitment to excellence and sustainability delivers measurable benefits to our clients and the environment
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="group hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={cn(
                                "bg-white dark:bg-charcoal/30 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all h-full relative",
                                "border border-gray-100 dark:border-gray-800"
                            )}>
                                {/* Top colored accent */}
                                <div
                                    className="absolute h-1 w-full top-0 left-0 transition-all duration-300 group-hover:h-1.5"
                                    style={{ backgroundColor: stat.color }}
                                />

                                <div className="p-8">
                                    <div className="mb-6 rounded-full w-14 h-14 flex items-center justify-center" style={{
                                        backgroundColor: `${stat.color}15`
                                    }}>
                                        {(() => {
                                            const IconComponent = Icons[stat.icon as keyof typeof Icons];
                                            return IconComponent ?
                                                <IconComponent className="w-7 h-7" style={{ color: stat.color }} /> : null;
                                        })()}
                                    </div>

                                    <h3 className="text-4xl font-bold mb-2 text-charcoal dark:text-white transition-colors group-hover:text-green-dark">
                                        <AnimatedCounter
                                            value={stat.value}
                                            prefix={stat.prefix || ""}
                                            suffix={stat.suffix || ""}
                                            duration={2.5}
                                        />
                                    </h3>

                                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        {stat.label}
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
