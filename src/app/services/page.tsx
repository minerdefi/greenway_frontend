"use client"; // Convert to client component since we need interactivity

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const services = [
    {
        id: "freight",
        title: "Freight Services",
        description: "Reliable freight services for businesses of all sizes with eco-friendly transportation options.",
        image: "/images/services/freight.jpg",
        color: "#0A3622", // Dark green
        icon: "truck",
        features: ["Eco-friendly vehicles", "Full & partial load", "International freight", "Custom solutions", "Carbon offset program"]
    },
    {
        id: "cargo-shipping",
        title: "Cargo Shipping",
        description: "Efficient cargo shipping solutions across land, sea, and air with sustainability at the core.",
        image: "/images/services/cargo-shipping.jpg",
        color: "#155D36", // Medium green
        icon: "ship",
        features: ["Sea freight", "Air freight", "Rail transport", "Sustainable shipping options", "Container solutions"]
    },
    {
        id: "packaging-storage",
        title: "Packaging & Storage",
        description: "Secure and eco-friendly packaging and storage solutions to keep your goods safe.",
        image: "/images/services/packaging-storage.jpeg",
        color: "#1C7C4A", // Light green
        icon: "package",
        features: ["Recyclable materials", "Custom packaging", "Climate-controlled storage", "Short & long term options", "Inventory management"]
    },
    {
        id: "warehousing",
        title: "Warehousing",
        description: "Modern warehousing facilities with advanced inventory management and security.",
        image: "/images/services/warehousing.jpeg",
        color: "#0A3622", // Dark green
        icon: "warehouse",
        features: ["Strategic locations", "Solar-powered facilities", "24/7 security", "Inventory tracking", "Flexible space options"]
    },
    {
        id: "door-to-door",
        title: "Door to Door Delivery",
        description: "Complete logistics solutions from pickup to final delivery with real-time tracking.",
        image: "/images/services/door-to-door.jpeg",
        color: "#155D36", // Medium green
        icon: "home",
        features: ["Scheduled pickups", "Real-time tracking", "Last-mile delivery", "Proof of delivery", "Customer notifications"]
    },
    {
        id: "transportation",
        title: "Transportation",
        description: "Comprehensive transportation solutions using our fleet of eco-friendly vehicles.",
        image: "/images/services/transportation.jpeg",
        color: "#1C7C4A", // Light green
        icon: "truck",
        features: ["Electric & hybrid fleet", "Route optimization", "Scheduled services", "Express options", "Specialized transport"]
    }
];

// Fixed renderIcon function to avoid license conflicts
const renderIcon = (iconName: string, className?: string, colorStyle?: React.CSSProperties) => {
    // Replace with simple characters/emoji to avoid license conflicts
    const iconMap: Record<string, React.ReactNode> = {
        truck: "🚚",
        ship: "🚢",
        package: "📦",
        warehouse: "🏭",
        home: "🏠",
        chevronRight: "→"
    };

    return (
        <span className={className} style={colorStyle}>
            {iconMap[iconName] || "•"}
        </span>
    );
};

// Service card with improved text contrast
const ServiceImage = ({ service }: { service: any }) => {
    const [imgSrc, setImgSrc] = useState(service.image);

    return (
        <div className="h-52 relative">
            {/* Image overlay gradient */}
            <div
                className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent 
                    group-hover:from-black/60 group-hover:opacity-90 transition-all duration-500"
                style={{
                    backgroundImage: `linear-gradient(to top, ${service.color}CC, transparent)`,
                    opacity: 0.8
                }}
            ></div>
            <Image
                src={imgSrc}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setImgSrc(`/images/services/${service.id}.svg`)}
            />

            {/* Service icon on the image with improved contrast */}
            <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-lg bg-white/30 backdrop-blur-sm 
                flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                {renderIcon(service.icon, "h-5 w-5 group-hover:text-[#0A3622] transition-colors duration-300", {
                    color: "white"
                })}
            </div>

            {/* Title on image with better visibility */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white drop-shadow-md group-hover:translate-y-[-5px] transition-transform duration-300">
                    {service.title}
                </h3>
            </div>
        </div>
    );
};

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
            staggerChildren: 0.2
        }
    }
};

const serviceCardVariants = {
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

export default function ServicesPage() {
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
            {/* Hero Section with increased height for desktop */}
            <section
                className="relative text-white w-full overflow-hidden pt-20"
                style={{
                    background: 'linear-gradient(135deg, #0A3622 0%, #155D36 50%, #0A3622 100%)',
                    minHeight: isMobile ? "auto" : `calc(${viewportHeight})` // Increased height in desktop view
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-24 lg:py-32 flex items-center"> {/* Increased vertical padding */}
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
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
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Our <span className="text-green-light">Services</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            Comprehensive logistics solutions designed with sustainability in mind
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white hover:bg-white/10 text-white rounded-full shadow-lg mb-12 md:mb-0"
                                asChild
                            >
                                <Link href="/quote">Get a Custom Quote</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom wave - Fixed positioning with reduced size for mobile */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        className="w-full"
                        style={{
                            display: 'block',
                            height: isMobile ? '60px' : '120px' // Increased height for desktop
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

            {/* Services Grid */}
            <section className="py-16 lg:py-24 bg-gray-100 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl font-bold mb-5 flex flex-col sm:flex-row items-center justify-center gap-2">
                            <span className="text-gray-900">Our Comprehensive</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A3622] to-[#1C7C4A]">Service Offerings</span>
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            From transportation to storage, we offer end-to-end sustainable logistics solutions
                            tailored to your business needs.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                className="group rounded-xl overflow-hidden transition-all duration-300 bg-white"
                                variants={serviceCardVariants}
                                whileHover="hover"
                            >
                                <ServiceImage service={service} />

                                <div className="p-6">
                                    <p className="text-gray-700 mb-5">{service.description}</p>

                                    <div className="space-y-2 mb-6">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-center">
                                                <div
                                                    className="h-1.5 w-1.5 rounded-full mr-2"
                                                    style={{ backgroundColor: service.color }}
                                                ></div>
                                                <span className="text-sm text-gray-800">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        className="group-hover:bg-gradient-to-r group-hover:from-green-dark group-hover:to-green-medium group-hover:text-white p-0 h-auto rounded-full hover:text-white"
                                        style={{ color: service.color }}
                                        asChild
                                    >
                                        <Link href={`/services/${service.id}`} className="flex items-center px-5 py-2">
                                            <span className="font-medium">Learn more</span>
                                            <span className="ml-2 transition-transform group-hover:translate-x-1">
                                                {renderIcon("chevronRight", "h-4 w-4", { color: "currentColor" })}
                                            </span>
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-softer w-full">
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
                                Need a Custom Solution?
                            </motion.h2>
                            <motion.p
                                className="mb-10 max-w-2xl mx-auto text-white/90 text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                Our logistics experts can design tailored solutions to meet your specific business requirements.
                            </motion.p>
                            <motion.div
                                className="flex flex-wrap gap-4 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="bg-white text-green-dark hover:bg-white/90 rounded-full shadow-lg px-8 font-medium"
                                    asChild
                                >
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white text-white hover:bg-white/20 rounded-full px-8 font-medium"
                                    asChild
                                >
                                    <Link href="/quote">Request a Quote</Link>
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
