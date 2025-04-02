"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define feature items
const features = [
    {
        icon: "leaf",
        title: "Eco-Friendly Solutions",
        description: "Our carbon-neutral shipping options reduce environmental impact without compromising on service quality.",
        link: "/services/eco-friendly"
    },
    {
        icon: "clock",
        title: "Real-Time Tracking",
        description: "Advanced tracking technology keeps you informed about your shipment's location at every step of the journey.",
        link: "/tracking"
    },
    {
        icon: "globe",
        title: "Global Network",
        description: "With partners worldwide, we deliver to over 200 countries efficiently and reliably, regardless of destination.",
        link: "/services/global"
    },
];

// Enhance service items with more details
const serviceItems = [
    {
        name: "Freight",
        description: "Reliable and eco-friendly freight services for businesses of all sizes.",
        icon: "truck",
        href: "/services/freight",
        color: "#0A3622" // Dark green
    },
    {
        name: "Cargo Shipping",
        description: "Sustainable shipping solutions across land, sea, and air.",
        icon: "ship",
        href: "/services/cargo-shipping",
        color: "#155D36" // Medium green
    },
    {
        name: "Packaging & Storage",
        description: "Secure packaging and environmentally friendly storage options.",
        icon: "package",
        href: "/services/packaging-storage",
        color: "#1C7C4A" // Light green
    },
    {
        name: "Warehousing",
        description: "Modern facilities with advanced inventory management systems.",
        icon: "warehouse",
        href: "/services/warehousing",
        color: "#0A3622" // Dark green
    },
    {
        name: "Door to Door Delivery",
        description: "Complete logistics from pickup to final destination with tracking.",
        icon: "home",
        href: "/services/door-to-door",
        color: "#155D36" // Medium green
    },
    {
        name: "Transportation",
        description: "Comprehensive solutions using our eco-friendly vehicle fleet.",
        icon: "truck",
        href: "/services/transportation",
        color: "#1C7C4A" // Light green
    },
];

// Safely render icons with explicit color styles
const renderIcon = (iconName: keyof typeof Icons | string, className?: string, colorStyle?: React.CSSProperties) => {
    const Icon = Icons[iconName as keyof typeof Icons];
    if (!Icon) {
        // Fallback to truck icon if the icon doesn't exist
        return Icons.truck ? <Icons.truck className={className} style={colorStyle} /> : null;
    }
    return <Icon className={className} style={colorStyle} />;
};

export default function FeaturesSection() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const iconContainerVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                delay: 0.2
            }
        }
    };

    const backgroundCircleVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (custom: number) => ({
            scale: 1,
            opacity: 0.15,
            transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.3 + (custom * 0.1)
            }
        })
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.2 }}
            className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-softer dark:bg-charcoal relative overflow-hidden"
        >
            {/* Decorative background elements */}
            <motion.div
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-light/5 -translate-y-1/2 translate-x-1/4"
                variants={backgroundCircleVariants}
                custom={0}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-green-dark/5 translate-y-1/3 -translate-x-1/3"
                variants={backgroundCircleVariants}
                custom={1}
            />

            {/* Fixed dot pattern with inline styles to ensure it renders correctly */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    opacity: 0.03,
                    backgroundImage: `radial-gradient(#0A3622 2px, transparent 2px)`,
                    backgroundSize: `30px 30px`
                }}
            ></div>

            {/* Hexagon pattern overlay - Using SVG filter for better rendering */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg width="100%" height="100%" className="opacity-[0.02]">
                    <defs>
                        <pattern id="hexagonPattern" x="0" y="0" width="60" height="104" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
                            <path d="M30 0L60 17.32v34.64L30 69.28L0 51.96V17.32L30 0z" fill="none" stroke="#0A3622" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
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
                        <span className="text-sm text-green-dark dark:text-green-light font-medium">Features</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-white mb-4">
                        Why Choose <span className="text-green-medium">Greenway</span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
                        We combine cutting-edge technology with sustainable practices to deliver
                        the future of logistics today.
                    </p>
                </motion.div>

                {/* Improved mobile layout for features */}
                <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-6 lg:gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="h-full"
                        >
                            <Card className="border-0 bg-white dark:bg-charcoal/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden group">
                                <CardHeader className="relative pb-4">
                                    <motion.div
                                        className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br from-green-light/20 to-green-dark/20 group-hover:from-green-light/30 group-hover:to-green-dark/30 transition-colors"
                                        variants={iconContainerVariants}
                                    >
                                        {renderIcon(feature.icon as keyof typeof Icons, "h-7 w-7 text-green-medium group-hover:text-green-dark transition-colors")}
                                    </motion.div>
                                    <CardTitle className="text-xl text-charcoal dark:text-white group-hover:text-green-medium transition-colors">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </CardContent>

                                {/* Added mobile-friendly padding for touch targets */}


                                {/* Bottom border accent */}
                                <motion.div
                                    className="h-1 bg-gradient-to-r from-green-light/50 to-green-dark/50 w-0 group-hover:w-full transition-all duration-300"
                                    style={{ position: 'absolute', bottom: 0, left: 0 }}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Services Section - Improved styling for mobile */}
                <motion.div
                    variants={itemVariants}
                    className="mt-24 relative"
                >
                    {/* Background accent elements */}
                    <div className="absolute -top-20 right-0 w-32 h-32 bg-green-light/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 -left-10 w-40 h-40 bg-green-dark/5 rounded-full blur-3xl"></div>

                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
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
                            <span className="text-sm text-green-dark dark:text-green-light font-medium">Explore Our Services</span>
                        </motion.div>

                        <h3 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-white">
                            Our <span className="gradient-text">Services</span>
                        </h3>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Discover our full range of logistics and transportation solutions
                        </p>
                    </div>

                    {/* Improved service cards layout for mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
                        {serviceItems.map((service, idx) => (
                            <motion.div
                                key={service.name}
                                variants={itemVariants}
                                custom={idx}
                                whileHover={{
                                    y: -8,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                            >
                                <Link href={service.href} className="block h-full">
                                    <div className="relative bg-white dark:bg-charcoal/20 rounded-xl overflow-hidden shadow-lg transition-all 
                                        h-full group border-t border-gray-100 dark:border-gray-800 hover:shadow-xl">
                                        {/* Top colored accent */}
                                        <div
                                            className="absolute h-1.5 w-full top-0 left-0 transition-all duration-300 group-hover:h-2"
                                            style={{ backgroundColor: service.color }}
                                        ></div>

                                        {/* Corner accent */}
                                        <div className="absolute right-0 top-0 w-16 h-16 overflow-hidden">
                                            <div
                                                className="absolute top-0 right-0 w-6 h-24 origin-top-right rotate-45 translate-y-[-50%]"
                                                style={{ backgroundColor: service.color, opacity: 0.1 }}
                                            ></div>
                                        </div>

                                        <div className="p-6 sm:p-7">
                                            <div className="flex items-start mb-5">
                                                <div
                                                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform"
                                                    style={{ backgroundColor: `${service.color}15` }}
                                                >
                                                    {renderIcon(service.icon, "h-5 w-5 sm:h-6 sm:w-6", { color: service.color })}
                                                </div>
                                                <h4 className="font-bold text-lg sm:text-xl text-gray-800 dark:text-white group-hover:text-green-medium transition-colors">
                                                    {service.name}
                                                </h4>
                                            </div>

                                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                                                {service.description}
                                            </p>

                                            <div className="mt-5 flex items-center font-medium text-sm" style={{ color: service.color }}>
                                                <span className="mr-1">Learn more</span>
                                                <motion.span
                                                    className="inline-block"
                                                    initial={{ x: 0 }}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 500 }}
                                                >
                                                    {renderIcon("chevronRight", "h-3.5 w-3.5", { color: service.color })}
                                                </motion.span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA button - Mobile optimized */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 text-center"
                    >
                        <Button
                            variant="default"
                            size="lg"
                            className="text-white rounded-full px-8 py-6 sm:px-10 sm:py-6 shadow-md hover:shadow-xl transition-all w-full sm:w-auto"
                            style={{
                                background: 'linear-gradient(to right, #0A3622, #1C7C4A)',
                            }}
                            asChild
                        >
                            <Link href="/services" className="flex items-center justify-center gap-2">
                                <span>View All Services</span>
                                <motion.span
                                    initial={{ x: 0 }}
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        duration: 1.5,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {renderIcon("chevronRight", "h-5 w-5")}
                                </motion.span>
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
