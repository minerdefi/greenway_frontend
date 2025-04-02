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

export default function TransportationPage() {
    // Add state for measuring viewport height
    const [viewportHeight, setViewportHeight] = useState("100vh");
    const [isMobile, setIsMobile] = useState(false);

    // Calculate correct viewport height on mount and resize
    useEffect(() => {
        function updateViewportHeight() {
            setViewportHeight(`${window.innerHeight}px`);
            setIsMobile(window.innerWidth < 768);
        }

        // Set initial height
        updateViewportHeight();

        // Add resize listener
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
                {/* Background elements */}
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
                            Transportation <span className="text-green-light">Services</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            Comprehensive transportation solutions using our fleet of eco-friendly vehicles.
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
                            src="/images/services/transportation.jpeg"
                            alt="Transportation Services"
                            fill
                            className="object-cover rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </div>

                {/* Bottom wave */}
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

            {/* Our Fleet Section - Reduced images with more focus on text content */}
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
                                Standard Transportation Services
                            </span>
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            We provide a comprehensive range of transportation solutions powered by our eco-friendly fleet, designed to meet diverse logistics needs.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 gap-8 mb-12"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl overflow-hidden shadow-lg"
                            variants={cardVariants}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                                <div className="h-64 md:h-auto relative md:col-span-1">
                                    <Image
                                        src="/images/services/eco-fleet.jpg"
                                        alt="Eco-friendly Fleet"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6 md:col-span-2">
                                    <h3 className="text-2xl font-semibold mb-4 text-green-dark">Our Standard Transportation Services</h3>
                                    <p className="text-gray-700 mb-4">
                                        Greenway offers a complete range of standard transportation services with sustainability at the core. Our eco-friendly fleet combines efficiency with environmental responsibility, providing reliable logistics solutions for businesses of all sizes.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        <div>
                                            <h4 className="font-semibold text-lg mb-3 text-gray-900">Road Transportation</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                                    <span>Full truckload (FTL) services</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                                    <span>Less-than-truckload (LTL) options</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                                    <span>Expedited delivery services</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                                    <span>Last-mile delivery solutions</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-3 text-gray-900">Specialized Transport</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                                    <span>Temperature-controlled shipping</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                                    <span>Heavy and oversized cargo</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                                    <span>Hazardous materials handling</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                                    <span>High-value goods transport</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {[
                            {
                                icon: "🚚",
                                title: "Electric & Hybrid Vehicles",
                                description: "Our fleet includes modern electric and hybrid vehicles that significantly reduce carbon emissions while maintaining efficient delivery schedules and payload capacity."
                            },
                            {
                                icon: "🛣️",
                                title: "Route Optimization",
                                description: "Advanced software plans the most efficient routes, reducing fuel consumption, minimizing emissions, and ensuring timely deliveries even in complex logistics scenarios."
                            },
                            {
                                icon: "📊",
                                title: "Carbon Footprint Tracking",
                                description: "We provide detailed reports of carbon emissions saved with each shipment and offer carbon offset options for any remaining environmental impact."
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
                                <p className="text-gray-700">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Transportation Services Section - Modified to focus more on standard services */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold mb-5">Service Categories</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Our versatile transportation services are tailored to meet your specific business needs and timelines.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 gap-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                                <div className="md:col-span-2 order-2 md:order-1 p-8">
                                    <h3 className="text-2xl font-semibold mb-4">Local Distribution</h3>
                                    <p className="text-gray-700 mb-4">
                                        Our local distribution services provide efficient, eco-friendly transportation within metropolitan areas and surrounding regions. We focus on optimized routes and timely deliveries to ensure your goods reach their destination promptly.
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-start">
                                            <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                            <span>Same-day and next-day delivery options</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                            <span>Route optimization for minimal emissions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                            <span>Real-time tracking for all shipments</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                            <span>Flexible scheduling options</span>
                                        </li>
                                    </ul>
                                    <Button
                                        variant="outline"
                                        className="border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                        asChild
                                    >
                                        <Link href="/quote">Request a Quote</Link>
                                    </Button>
                                </div>
                                <div className="relative h-64 md:h-auto md:col-span-3 order-1 md:order-2">
                                    <Image
                                        src="/images/services/local-distribution.png"
                                        alt="Local Distribution"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                                <div className="relative h-64 md:h-auto md:col-span-3">
                                    <Image
                                        src="/images/services/long-distance.png"
                                        alt="Long Distance Transport"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="md:col-span-2 p-8">
                                    <h3 className="text-2xl font-semibold mb-4">Long-Distance Transport</h3>
                                    <p className="text-gray-700 mb-4">
                                        Our long-distance transportation services connect cities and regions with reliable, scheduled routes. We utilize hybrid vehicles and efficient logistics planning to reduce carbon footprint while maintaining dependable delivery schedules.
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-start">
                                            <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                            <span>Nationwide coverage with dedicated routes</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                            <span>Regular scheduled service</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                            <span>Carbon offset options for all shipments</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="h-5 w-5 text-green-medium mt-0.5 mr-2 flex-shrink-0">✓</div>
                                            <span>Intermodal transport solutions</span>
                                        </li>
                                    </ul>
                                    <Button
                                        variant="outline"
                                        className="border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                        asChild
                                    >
                                        <Link href="/quote">Request a Quote</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Standard Service Tiers section - New section */}
                    <motion.div
                        className="mt-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center">Standard Service Tiers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-green-light">
                                <h4 className="text-xl font-semibold mb-2">Standard Delivery</h4>
                                <p className="text-green-dark font-medium mb-3">Economical & Reliable</p>
                                <p className="text-gray-700 mb-5">Our cost-effective standard delivery services provide reliable transportation with 2-3 business day delivery windows.</p>
                                <ul className="space-y-2 mb-8">
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>2-3 business day delivery</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Standard tracking updates</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Carbon-neutral shipping option</span>
                                    </li>
                                </ul>
                                <Button
                                    variant="outline"
                                    className="w-full border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                    asChild
                                >
                                    <Link href="/quote">Get a Quote</Link>
                                </Button>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-dark relative transform md:-translate-y-4">
                                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                    <span className="bg-green-dark text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">Most Popular</span>
                                </div>
                                <h4 className="text-xl font-semibold mb-2">Express Delivery</h4>
                                <p className="text-green-dark font-medium mb-3">Fast & Efficient</p>
                                <p className="text-gray-700 mb-5">Our express delivery service offers next-day delivery with priority routing for time-sensitive shipments.</p>
                                <ul className="space-y-2 mb-8">
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Next-day delivery guarantee</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Real-time tracking</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Priority handling</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Scheduled delivery windows</span>
                                    </li>
                                </ul>
                                <Button
                                    className="w-full bg-gradient-to-r from-[#0A3622] to-[#1C7C4A] text-white"
                                    asChild
                                >
                                    <Link href="/quote">Get a Quote</Link>
                                </Button>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-green-light">
                                <h4 className="text-xl font-semibold mb-2">Premium Logistics</h4>
                                <p className="text-green-dark font-medium mb-3">Comprehensive & Customized</p>
                                <p className="text-gray-700 mb-5">End-to-end logistics solutions with dedicated account management for complex transportation needs.</p>
                                <ul className="space-y-2 mb-8">
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Dedicated account manager</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Custom transportation planning</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Priority support 24/7</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="h-5 w-5 text-green-medium mt-0.5 mr-2">✓</div>
                                        <span>Enhanced reporting & analytics</span>
                                    </li>
                                </ul>
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
                </div>
            </section>

            {/* Why Choose Us Section - Removed some images and streamlined */}
            <section className="py-16 lg:py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold mb-5">Why Choose Our Transportation Services</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Our commitment to sustainability, reliability, and customer satisfaction sets us apart in the transportation industry.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {[{
                            icon: "🌱",
                            title: "Eco-Friendly Approach",
                            description: "Our sustainable fleet and carbon offset programs help reduce environmental impact without compromising on service quality or reliability."
                        },
                        {
                            icon: "⏱️",
                            title: "On-Time Performance",
                            description: "We maintain a 98.7% on-time delivery rate through advanced logistics planning, proactive monitoring, and contingency planning."
                        },
                        {
                            icon: "📊",
                            title: "End-to-End Visibility",
                            description: "Our real-time tracking and reporting tools give you complete transparency into your shipment's journey from origin to destination."
                        },
                        {
                            icon: "🔄",
                            title: "Flexible Solutions",
                            description: "Our diverse fleet and customizable services allow us to adapt to your unique transportation requirements and schedule."
                        },
                        {
                            icon: "👥",
                            title: "Expert Team",
                            description: "Our drivers and logistics specialists are highly trained professionals with extensive experience in transportation and customer service."
                        },
                        {
                            icon: "💰",
                            title: "Competitive Pricing",
                            description: "Our efficient operations and route optimization allow us to offer eco-friendly transportation at competitive market rates."
                        }].map((feature, index) => (
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
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%">
                                <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                                    <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="2" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
                            </svg>
                        </div>

                        {/* Background circles */}
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
                                Ready for Sustainable Transportation?
                            </motion.h2>
                            <motion.p
                                className="mb-10 max-w-2xl mx-auto text-white/90 text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Contact us today to discuss your transportation needs and learn how our eco-friendly solutions can benefit your business.
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
