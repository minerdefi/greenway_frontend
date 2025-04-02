"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { brandColors } from "@/lib/color-utils";

// Simple testimonial data with updated colors
const testimonials = [
    {
        id: "1",
        quote: "Switching to Greenway helped us reduce our carbon footprint by 40% while maintaining reliable shipping times.",
        author: "Sarah Reynolds",
        position: "EcoTech Solutions",
        initials: "SR", // Use initials directly
        color: brandColors.greenLight // Use brand colors for SVG avatar
    },
    {
        id: "2",
        quote: "Their global network has transformed how we manage our supply chain. A truly reliable partner for international shipping.",
        author: "Michael Wong",
        position: "Global Retail Group",
        initials: "MW",
        color: brandColors.greenMedium
    },
    {
        id: "3",
        quote: "We've been impressed with Greenway's commitment to sustainability. Their carbon-offset program has been invaluable for our CSR goals.",
        author: "Elena Martinez",
        position: "Sustainable Brands Co.",
        initials: "EM",
        color: brandColors.greenDark
    }
];

// SVG Avatar component that generates directly in the component
const SvgAvatar = ({ initials, bgColor }: { initials: string; bgColor: string }) => {
    return (
        <div className="w-12 h-12 rounded-full overflow-hidden">
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id={`grad-${initials}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={bgColor} stopOpacity="1" />
                        <stop offset="100%" stopColor={bgColor} stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                <rect width="48" height="48" fill={`url(#grad-${initials})`} />
                <text
                    x="24"
                    y="28"
                    fontFamily="Arial, sans-serif"
                    fontSize="18"
                    fontWeight="bold"
                    fill="white"
                    textAnchor="middle"
                >
                    {initials}
                </text>
            </svg>
        </div>
    );
};

// Add logistics industry certifications
const logisticsCertifications = [
    {
        name: "ISO 14001",
        description: "Environmental Management",
        image: "/images/certifications/iso-14001.png"
    },
    {
        name: "LEED",
        description: "Green Building Certification",
        image: "/images/certifications/leed.png"
    },
    {
        name: "SmartWay",
        description: "EPA Transport Partnership",
        image: "/images/certifications/smartway.png"
    },
    {
        name: "IATA",
        description: "Air Transport Association",
        image: "/images/certifications/iata.png"
    }
];

// Certification badge component
const CertificationBadge = ({ certification }: { certification: typeof logisticsCertifications[0] }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-2 relative">
                {imageError ? (
                    <div className="w-full h-full bg-green-dark/10 flex items-center justify-center rounded-full">
                        <span className="text-xs font-bold text-green-dark">{certification.name}</span>
                    </div>
                ) : (
                    <Image
                        src={certification.image}
                        alt={certification.name}
                        fill
                        className="object-contain"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <div className="text-center">
                <div className="font-semibold text-sm">{certification.name}</div>
                <div className="text-xs text-gray-500">{certification.description}</div>
            </div>
        </div>
    );
};

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);

    // Auto-advance testimonials
    useEffect(() => {
        if (!isAutoplay) return;
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [isAutoplay]);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Background element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-green-light/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-green-dark/5 blur-3xl"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section heading */}
                <div className="text-center mb-10">
                    <span className="inline-block px-3 py-1 bg-green-dark/10 rounded-full text-green-dark text-sm font-medium mb-3">
                        Client Stories
                    </span>
                    <h2 className="text-3xl font-bold text-charcoal mb-2">What Our Clients Say</h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        See how our sustainable logistics solutions are making a difference for businesses worldwide
                    </p>
                </div>

                {/* Testimonial card with improved design */}
                <div className="relative">
                    <div className="bg-white rounded-xl shadow-lg p-8 relative z-10">

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={testimonials[activeIndex].id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Rating stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Icons.star key={i} className="h-5 w-5 text-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-xl text-gray-700 text-center mb-8 max-w-2xl mx-auto leading-relaxed">
                                        "{testimonials[activeIndex].quote}"
                                    </blockquote>

                                    {/* Avatar and author info */}
                                    <div className="flex items-center gap-4">
                                        <SvgAvatar
                                            initials={testimonials[activeIndex].initials}
                                            bgColor={testimonials[activeIndex].color}
                                        />
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900">
                                                {testimonials[activeIndex].author}
                                            </div>
                                            <div className="text-green-dark text-sm">
                                                {testimonials[activeIndex].position}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Navigation controls */}
                    <div className="flex justify-between items-center mt-8">
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsAutoplay(false);
                                    }}
                                    className={cn(
                                        "w-8 h-2 rounded-full transition-all",
                                        activeIndex === index
                                            ? "bg-green-dark"
                                            : "bg-gray-300 hover:bg-gray-400"
                                    )}
                                    style={{
                                        backgroundColor: activeIndex === index ? brandColors.greenDark : undefined
                                    }}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
                                    setIsAutoplay(false);
                                }}
                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-dark hover:text-white hover:border-green-dark transition-all"
                            >
                                <Icons.chevronLeft className="h-5 w-5" />
                            </button>

                            <button
                                onClick={() => {
                                    setActiveIndex((current) => (current + 1) % testimonials.length);
                                    setIsAutoplay(false);
                                }}
                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-dark hover:text-white hover:border-green-dark transition-all"
                            >
                                <Icons.chevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Industry Certifications */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-bold text-charcoal mb-2">Industry Certifications</h3>
                        <p className="text-gray-600 text-sm">Our logistics services meet the highest industry standards</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {logisticsCertifications.map((cert, index) => (
                            <motion.div
                                key={cert.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <CertificationBadge certification={cert} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
