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

export default function PackagingStoragePage() {
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
                            Packaging & <span className="text-green-light">Storage</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            Secure and eco-friendly packaging and storage solutions to keep your goods safe.
                        </motion.p>

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
                            src="/images/services/packaging-storage.jpeg"
                            alt="Packaging and Storage Services"
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
                                Packaging & Storage Solutions
                            </span>
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Our sustainable packaging and secure storage options protect your items while minimizing environmental impact.
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
                            { icon: "♻️", title: "Recyclable Materials", description: "We use eco-friendly, recyclable packaging materials that provide reliable protection with minimal environmental impact." },
                            { icon: "📦", title: "Custom Packaging", description: "Tailored packaging solutions designed specifically for your products, ensuring optimal protection during transport and storage." },
                            { icon: "🌡️", title: "Climate-Controlled Storage", description: "Temperature and humidity-controlled facilities to protect sensitive goods from environmental damage." },
                            { icon: "📅", title: "Short & Long Term Options", description: "Flexible storage solutions ranging from overnight to long-term storage, all with advanced security and inventory management." },
                            { icon: "📋", title: "Inventory Management", description: "Digital inventory tracking system that gives you real-time access to your stored items with detailed reporting." },
                            { icon: "🛡️", title: "Enhanced Security", description: "State-of-the-art security systems with 24/7 monitoring, controlled access, and comprehensive insurance options." }
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
                                <p className="text-gray-700">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Storage Options Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold mb-5">Storage Options</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            We offer a range of storage solutions to meet different needs and requirements.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="bg-gray-50 rounded-xl overflow-hidden shadow-md"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="h-48 relative">
                                <Image
                                    src="/images/services/short-term-storage.png"
                                    alt="Short-term Storage"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3">Short-term Storage</h3>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Ideal for seasonal inventory or temporary needs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Flexible rental terms from days to months</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Quick access to your goods when needed</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 rounded-xl overflow-hidden shadow-md"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="h-48 relative">
                                <Image
                                    src="/images/services/long-term-storage.png"
                                    alt="Long-term Storage"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3">Long-term Storage</h3>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Cost-effective solution for extended storage needs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Climate-controlled environment for preservation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Regular inventory checks and condition reports</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 rounded-xl overflow-hidden shadow-md"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="h-48 relative">
                                <Image
                                    src="/images/services/specialized-storage.png"
                                    alt="Specialized Storage"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3">Specialized Storage</h3>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Temperature-sensitive items (pharmaceutical, food)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>High-value goods with enhanced security</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Hazardous materials with proper safety measures</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
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
                                Need Packaging or Storage Solutions?
                            </motion.h2>
                            <motion.p
                                className="mb-10 max-w-2xl mx-auto text-white/90 text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Contact us today to learn how our eco-friendly packaging and secure storage can help your business.
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
