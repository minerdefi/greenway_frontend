"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function HeroSection() {
    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);

    // Image carousel data
    const carouselImages = [
        {
            src: "/images/logistics-1.jpg", // You'll need to add these images to your public folder
            alt: "Sustainable logistics fleet",
        },
        {
            src: "/images/logistics-2.jpg",
            alt: "Green shipping solutions",
        },
        {
            src: "/images/logistics-3.jpg",
            alt: "Eco-friendly delivery",
        },
    ];

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [carouselImages.length]);

    // Staggered animation for children elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                delay: 1 + (i * 0.1)
            }
        })
    };

    const floatingIcons = [
        { icon: "leaf", position: "top-[20%] left-[15%]", size: "w-10 h-10", color: "text-green-light/30" },
        { icon: "globe", position: "top-[15%] right-[20%]", size: "w-12 h-12", color: "text-white/20" },
        { icon: "truck", position: "bottom-[35%] left-[10%]", size: "w-14 h-14", color: "text-white/20" },
        { icon: "clock", position: "bottom-[30%] right-[15%]", size: "w-8 h-8", color: "text-green-light/30" },
    ];

    return (
        <div
            className="w-full relative overflow-hidden bg-[#0A3622]"
            style={{
                backgroundImage: 'linear-gradient(135deg, #0A3622 0%, #155D36 50%, #0A3622 100%)',
            }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full py-32 md:py-36 lg:py-30 px-4 sm:px-6 lg:px-8" // Reduced padding from py-32 md:py-40 lg:py-48
                role="banner"
            >
                {/* Floating animated background icons */}
                {floatingIcons.map((item, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                        className={cn("absolute z-0 opacity-20", item.position, item.size, item.color)}
                    >
                        {(() => {
                            const IconComponent = Icons[item.icon as keyof typeof Icons];
                            return IconComponent ? <IconComponent className="w-full h-full" /> : null;
                        })()}
                    </motion.div>
                ))}

                {/* Background pattern - improved grid */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "30px 30px"
                    }}></div>
                </div>

                {/* Content container */}
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left column: Text content */}
                        <motion.div
                            className="text-left lg:pr-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Branded highlight badge */}
                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-green-light mr-2"></span>
                                <span className="text-sm font-medium text-white tracking-wide">Eco-friendly logistics solutions</span>
                            </motion.div>

                            {/* Main headline */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
                            >
                                <span className="block">Sustainable shipping for</span>
                                <span className="block mt-2">
                                    a <span className="text-green-light">greener</span> tomorrow
                                </span>
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                variants={itemVariants}
                                className="mt-6 text-lg text-white/90 leading-relaxed"
                            >
                                Cutting-edge logistics that reduce carbon footprint while maintaining exceptional delivery standards.
                            </motion.p>

                            {/* CTA buttons with improved animations */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-8 flex flex-wrap gap-4"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="default"
                                        size="lg"
                                        asChild
                                        className="text-base bg-white text-green-dark hover:bg-white/90 shadow-xl px-8 rounded-full"
                                    >
                                        <Link href="/tracking">Track Shipment</Link>
                                    </Button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        asChild
                                        className="text-base border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 rounded-full"
                                    >
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Right column: Image carousel */}
                        <div className="hidden lg:block relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-dark/40 to-transparent z-10 rounded-2xl"></div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={carouselImages[currentSlide].src}
                                        alt={carouselImages[currentSlide].alt}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Carousel indicators */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 gap-2">
                                {carouselImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={cn(
                                            "w-2.5 h-2.5 rounded-full transition-all",
                                            currentSlide === index
                                                ? "bg-white scale-110"
                                                : "bg-white/40 hover:bg-white/60"
                                        )}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced wave effect - moved higher in the view */}
                <div className="absolute -bottom-1 left-0 right-0 w-full mt-12">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,106.7C672,107,768,149,864,154.7C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}
