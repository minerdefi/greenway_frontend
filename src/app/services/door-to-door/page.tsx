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

export default function DoorToDoorPage() {
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
                            Door to Door <span className="text-green-light">Delivery</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            Complete logistics solutions from pickup to final delivery with real-time tracking.
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
                            src="/images/services/door-to-door.jpg"
                            alt="Door to Door Delivery Services"
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
                                Door to Door Service Features
                            </span>
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Our comprehensive door-to-door delivery solutions ensure your shipments arrive safely and on time, with sustainability at the core of our operations.
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
                            { icon: "📅", title: "Scheduled Pickups", description: "Convenient pickup scheduling that fits your timeline, with precise time windows to minimize wait times." },
                            { icon: "🚚", title: "Eco-Friendly Fleet", description: "Our deliveries are made using electric and hybrid vehicles whenever possible, reducing carbon emissions without compromising service." },
                            { icon: "🔍", title: "Real-Time Tracking", description: "Monitor your shipments in real-time through our advanced tracking system, accessible via web or mobile app." },
                            { icon: "🔔", title: "Customer Notifications", description: "Automated updates via email or SMS at key delivery milestones, including pickup confirmation and delivery ETAs." },
                            { icon: "🛣️", title: "Last-Mile Delivery", description: "Specialized last-mile delivery services using the most efficient transportation methods for urban, suburban, and rural areas." },
                            { icon: "📝", title: "Proof of Delivery", description: "Digital proof of delivery with electronic signatures, time stamps, and delivery photos for complete transparency." }
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

            {/* Delivery Process Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold mb-5">Our Door-to-Door Process</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            A seamless end-to-end logistics solution designed for reliability and customer satisfaction.
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0A3622] to-[#1C7C4A] hidden md:block"></div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-5 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                { step: "1", title: "Order Placement", description: "Book your shipment online or by phone with all necessary details." },
                                { step: "2", title: "Pickup", description: "Our courier arrives at your location to collect the shipment within the scheduled window." },
                                { step: "3", title: "Transportation", description: "Your shipment is transported via the most efficient and eco-friendly route to its destination." },
                                { step: "4", title: "Last-Mile", description: "The final leg of delivery, optimized for speed and efficiency to the recipient's door." },
                                { step: "5", title: "Delivery", description: "Shipment is delivered to the recipient with digital confirmation and proof of delivery." }
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

            {/* Service Types Section */}
            <section className="py-16 lg:py-24 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold mb-5">Delivery Service Options</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            We offer a range of door-to-door delivery services to meet different timeline and budget requirements.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-xl overflow-hidden shadow-lg"
                            whileHover="hover"
                        >
                            <div className="absolute -top-4 inset-x-0 flex justify-center">
                                <span className="bg-green-light text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                            </div>
                            <div className="bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white p-6">
                                <h3 className="text-2xl font-bold">Standard Delivery</h3>
                                <p className="mt-2 opacity-90">Cost-effective and reliable</p>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>1-3 business days delivery timeframe</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Real-time tracking updates</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Eco-friendly delivery methods</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Digital proof of delivery</span>
                                    </li>
                                </ul>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <Button
                                        variant="outline"
                                        className="w-full border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                        asChild
                                    >
                                        <Link href="/quote">Get a Quote</Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-xl overflow-hidden shadow-lg transform md:-translate-y-4 relative z-10"
                            whileHover="hover"
                        >
                            <div className="absolute -top-4 inset-x-0 flex justify-center">
                                <span className="bg-green-light text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                            </div>
                            <div className="bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white p-6">
                                <h3 className="text-2xl font-bold">Express Delivery</h3>
                                <p className="mt-2 opacity-90">Fast and efficient service</p>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Next-day delivery guaranteed</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Priority handling and routing</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Advanced real-time tracking</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Delivery time windows (AM/PM)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Carbon offset included</span>
                                    </li>
                                </ul>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <Button
                                        variant="default"
                                        className="w-full bg-gradient-to-r from-[#0A3622] to-[#155D36]"
                                        asChild
                                    >
                                        <Link href="/quote" className="text-white">Get a Quote</Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-xl overflow-hidden shadow-lg"
                            whileHover="hover"
                        >
                            <div className="absolute -top-4 inset-x-0 flex justify-center">
                                <span className="bg-green-light text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                            </div>
                            <div className="bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white p-6">
                                <h3 className="text-2xl font-bold">Same-Day Delivery</h3>
                                <p className="mt-2 opacity-90">For urgent shipments</p>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Delivery within hours</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Dedicated vehicle assignment</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Live GPS tracking</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Direct courier contact</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-green-medium mt-0.5 mr-3 flex-shrink-0">✓</div>
                                        <span>Priority customer support</span>
                                    </li>
                                </ul>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <Button
                                        variant="outline"
                                        className="w-full border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                        asChild
                                    >
                                        <Link href="/quote">Get a Quote</Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
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
                                Ready to Schedule a Delivery?
                            </motion.h2>
                            <motion.p
                                className="mb-10 max-w-2xl mx-auto text-white/90 text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Experience our efficient and eco-friendly door-to-door delivery service today.
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
                                    <Link href="/quote">Schedule Now</Link>
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
