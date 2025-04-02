"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    hover: {
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

export default function FreightServicePage() {
    const [viewportHeight, setViewportHeight] = useState("100vh");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function updateViewportHeight() {
            setViewportHeight(`${window.innerHeight}px`);
            setIsMobile(window.innerWidth < 768);
        }

        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);

        return () => window.removeEventListener('resize', updateViewportHeight);
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section
                className="relative text-white w-full overflow-hidden pt-20"
                style={{
                    background: 'linear-gradient(135deg, #0A3622 0%, #155D36 50%, #0A3622 100%)',
                    minHeight: isMobile ? "auto" : `calc(${viewportHeight} * 0.7)`
                }}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-[600px] h-[600px] rounded-full bg-white/5 -top-[300px] -right-[300px]"></div>
                    <div className="absolute w-[300px] h-[300px] rounded-full bg-green-medium/10 bottom-[10%] -left-[150px]"></div>
                    <div className="absolute inset-0" style={{
                        backgroundImage: "radial-gradient(circle at 20% 70%, rgba(28, 124, 74, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(28, 124, 74, 0.15) 0%, transparent 50%)"
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-24 flex flex-col md:flex-row items-center">
                    <motion.div
                        className="md:w-1/2 text-center md:text-left md:pr-8 mb-8 md:mb-0"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <motion.div
                            className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 md:mb-8"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="h-2 w-2 rounded-full bg-green-light mr-2"></span>
                            <span className="text-sm font-medium text-white">Logistics Solutions</span>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Freight <span className="text-green-light">Services</span>
                        </motion.h1>

                        <p className="text-lg md:text-xl mb-6 md:mb-8 text-white/80">
                            Reliable freight services for businesses of all sizes with eco-friendly transportation options.
                        </p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center md:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white hover:bg-white/10 text-white rounded-full shadow-lg"
                                asChild
                            >
                                <Link href="/quote">Get a Quote</Link>
                            </Button>
                            <Button
                                variant="default"
                                size="lg"
                                className="bg-white text-green-dark hover:bg-white/90 rounded-full shadow-lg"
                                asChild
                            >
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="md:w-1/2 relative h-64 md:h-96 w-full"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <Image
                            src="/images/services/freight.jpg"
                            alt="Freight Services"
                            fill
                            className="object-cover rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        className="w-full"
                        style={{
                            display: 'block',
                            height: isMobile ? '60px' : '120px'
                        }}
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#f9fafb"
                            fillOpacity="1"
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,106.7C672,85,768,75,864,90.7C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* Service Features Section */}
            <section className="py-16 lg:py-24 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold mb-5">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A3622] to-[#1C7C4A]">
                                Freight Service Features
                            </span>
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Our comprehensive freight services are designed to provide reliable, eco-friendly transportation solutions for businesses of all sizes.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {[
                            {
                                icon: "🚚",
                                title: "Eco-friendly Fleet",
                                description: "We operate a modern fleet of electric and hybrid vehicles that reduce carbon emissions while maintaining reliable delivery schedules."
                            },
                            {
                                icon: "📦",
                                title: "Full & Partial Load",
                                description: "Whether you need full truckload (FTL) or less-than-truckload (LTL) services, our solutions are scalable to your freight volume."
                            },
                            {
                                icon: "🌎",
                                title: "International Freight",
                                description: "Our international freight services connect your business to global markets with efficient customs handling and documentation."
                            },
                            {
                                icon: "⚙️",
                                title: "Custom Solutions",
                                description: "Every business has unique needs. We develop custom freight solutions that adapt to your specific requirements and schedule."
                            },
                            {
                                icon: "🌱",
                                title: "Carbon Offset Program",
                                description: "Our carbon offset program allows you to neutralize the environmental impact of your freight transportation."
                            },
                            {
                                icon: "🗺️",
                                title: "Route Optimization",
                                description: "Our advanced routing technology ensures your freight takes the most efficient path, reducing fuel consumption and delivery time."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                                    <div className="text-green-dark text-xl">{feature.icon}</div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-700">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold mb-5">How Our Freight Services Work</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            A simple, efficient process designed to get your freight where it needs to go, when it needs to be there.
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0A3622] to-[#1C7C4A] hidden md:block"></div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-4 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                {
                                    step: "1",
                                    title: "Request Quote",
                                    description: "Contact us with your freight details for a custom quote tailored to your needs."
                                },
                                {
                                    step: "2",
                                    title: "Schedule Pickup",
                                    description: "We'll arrange pickup at your location at a time that works for your schedule."
                                },
                                {
                                    step: "3",
                                    title: "Transport & Track",
                                    description: "Your freight is transported while you monitor its progress with real-time tracking."
                                },
                                {
                                    step: "4",
                                    title: "Delivery & Confirmation",
                                    description: "Your freight is delivered on time with digital confirmation and proof of delivery."
                                }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center text-center"
                                    variants={cardVariants}
                                >
                                    <div className="h-12 w-12 rounded-full bg-green-dark text-white flex items-center justify-center mb-4 z-10">
                                        <span className="text-xl font-bold">{step.step}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                    <p className="text-gray-700">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="bg-gradient-to-r from-[#0A3622] to-[#155D36] rounded-2xl p-8 md:p-12 text-white text-center overflow-hidden relative"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%">
                                <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                                    <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="2" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
                            </svg>
                        </div>

                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/4"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4"></div>

                        <div className="relative z-10">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold mb-4 text-white"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                Ready to Ship Your Freight?
                            </motion.h2>
                            <motion.p
                                className="mb-10 max-w-2xl mx-auto text-white/90 text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Get in touch with our team for a custom freight quote tailored to your specific needs.
                            </motion.p>
                            <motion.div
                                className="flex flex-wrap gap-4 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="bg-white text-green-dark hover:bg-white/90 rounded-full shadow-lg px-8 font-medium"
                                    asChild
                                >
                                    <Link href="/quote">Get a Quote</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white text-white hover:bg-white/20 rounded-full px-8 font-medium"
                                    asChild
                                >
                                    <Link href="/services">View All Services</Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
