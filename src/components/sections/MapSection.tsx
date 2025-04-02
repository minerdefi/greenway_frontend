"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Import Map component with dynamic import (no SSR)
const Map = dynamic(() => import("@/components/ui/map"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center bg-gray-50 rounded-lg w-full h-[400px] md:h-[500px] animate-pulse">
            <div className="text-gray-400">Loading map...</div>
        </div>
    )
});

export default function MapSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15
            }
        }
    };

    // Logistics hubs with coordinates for the map
    const hubs = [
        { id: "na", name: "North America", lat: 37.09, lng: -95.71, type: "Regional HQ" },
        { id: "eu", name: "Europe", lat: 51.51, lng: 0.13, type: "Distribution Center" },
        { id: "as", name: "Asia", lat: 35.69, lng: 139.69, type: "Operations Hub" },
        { id: "af", name: "Africa", lat: -1.29, lng: 36.82, type: "Emerging Market" },
        { id: "sa", name: "South America", lat: -23.55, lng: -46.63, type: "Logistics Center" },
        { id: "au", name: "Australia", lat: -33.87, lng: 151.21, type: "Pacific Hub" }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-0">
            {/* Improved background pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>

            {/* Fine grid pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                    <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0A3622" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#mapGrid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center bg-green-light/10 px-4 py-1.5 rounded-full mb-3">
                        <span className="h-2 w-2 rounded-full bg-green-medium mr-2"></span>
                        <span className="text-sm text-green-dark font-medium">Global Network</span>
                    </div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-charcoal mb-4"
                    >
                        Our <span className="text-green-medium">Worldwide</span> Presence
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="max-w-2xl mx-auto text-gray-600 text-lg"
                    >
                        With strategic logistics hubs on six continents, we deliver sustainable shipping solutions globally
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Interactive Leaflet Map */}
                    <motion.div
                        className="relative order-2 lg:order-1 z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Suspense fallback={
                            <div className="flex items-center justify-center bg-gray-50 rounded-lg w-full h-[400px] md:h-[500px]">
                                <div className="text-gray-400">Loading map...</div>
                            </div>
                        }>
                            <Map
                                hubs={hubs}
                                height="500px"
                                className="shadow-lg"
                                zoom={2}
                                center={[20, 0]}
                            />
                        </Suspense>
                    </motion.div>

                    {/* Stats & info column with better styling */}
                    <motion.div
                        variants={containerVariants}
                        className="order-1 lg:order-2"
                    >
                        <motion.h3
                            variants={itemVariants}
                            className="text-2xl font-bold text-charcoal mb-6 lg:pr-10"
                        >
                            Connecting Businesses Globally with <span className="text-green-medium">Sustainable Logistics</span>
                        </motion.h3>

                        {/* Network stat cards */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4 mb-8"
                        >
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="text-green-dark text-2xl font-bold mb-1">6</div>
                                <div className="text-gray-600 text-sm">Continents</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="text-green-dark text-2xl font-bold mb-1">25+</div>
                                <div className="text-gray-600 text-sm">Major Hubs</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="text-green-dark text-2xl font-bold mb-1">150+</div>
                                <div className="text-gray-600 text-sm">Countries</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="text-green-dark text-2xl font-bold mb-1">24/7</div>
                                <div className="text-gray-600 text-sm">Operations</div>
                            </div>
                        </motion.div>

                        <motion.div variants={containerVariants} className="space-y-6 mb-8">
                            {/* Feature points */}
                            <motion.div variants={itemVariants} className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-dark/10 flex items-center justify-center mr-4">
                                    <Icons.globe className="h-5 w-5 text-green-medium" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-charcoal mb-1">Global Coverage</h4>
                                    <p className="text-gray-600">
                                        Our network spans over 200 countries with local expertise in major economic regions.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-dark/10 flex items-center justify-center mr-4">
                                    <Icons.clock className="h-5 w-5 text-green-medium" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-charcoal mb-1">Fast Transit Times</h4>
                                    <p className="text-gray-600">
                                        Strategic hub locations ensure optimal routing and reduced delivery times.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-dark/10 flex items-center justify-center mr-4">
                                    <Icons.leaf className="h-5 w-5 text-green-medium" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-charcoal mb-1">Local Sustainability</h4>
                                    <p className="text-gray-600">
                                        Each regional hub operates with eco-friendly practices adapted to local conditions.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                variant="default"
                                size="lg"
                                className="rounded-full px-8 py-6 shadow-md hover:shadow-lg transition-all text-white"
                                style={{
                                    background: 'linear-gradient(to right, #0A3622, #1C7C4A)',
                                }}
                                asChild
                            >
                                <Link href="/network" className="flex items-center gap-2">
                                    <span>Explore Our Network</span>
                                    <Icons.chevronRight className="h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
