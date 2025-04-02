"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/ui/footer";
import { TrackingResults } from "@/components/tracking/tracking-results";
import { cn } from "@/lib/utils";
import { getTrackingInfo } from "@/services/tracking-service";

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

// Demo tracking numbers for easy testing
const demoTrackingNumbers = [
    { id: "GW987654321", status: "Delivered", description: "USA Domestic" },
    { id: "GW456789123", status: "Processing", description: "USA Domestic" },
    { id: "GWINT123456", status: "In Transit", description: "UK to France (Cleared)" },
    { id: "GWASIA7890", status: "In Transit", description: "Japan to Korea (In Customs)" },
    { id: "GWCUST5678", status: "In Transit", description: "Germany to USA (Customs Hold)" }
];

export default function TrackingPage() {
    const [viewportHeight, setViewportHeight] = useState("100vh");
    const [isMobile, setIsMobile] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [shipmentData, setShipmentData] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isAPIMode, setIsAPIMode] = useState(true);

    useEffect(() => {
        function updateViewportHeight() {
            setViewportHeight(`${window.innerHeight}px`);
            setIsMobile(window.innerWidth < 768);
        }

        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);

        // Load recent searches from localStorage
        const savedSearches = localStorage.getItem('recentTrackingSearches');
        if (savedSearches) {
            try {
                setRecentSearches(JSON.parse(savedSearches));
            } catch (e) {
                console.error("Failed to parse recent searches from localStorage");
            }
        }

        return () => window.removeEventListener('resize', updateViewportHeight);
    }, []);

    const handleSearch = async (e: React.FormEvent, searchValue?: string) => {
        e.preventDefault();
        const numberToSearch = searchValue || trackingNumber.trim();

        if (!numberToSearch) {
            setError("Please enter a tracking number");
            return;
        }

        setIsSearching(true);
        setError("");

        try {
            if (isAPIMode) {
                // Call the backend API service
                const result = await getTrackingInfo(numberToSearch);

                if (result.error) {
                    setError(result.error);
                    setShipmentData(null);
                } else {
                    setShipmentData(result.shipment);

                    // Save to recent searches
                    updateRecentSearches(numberToSearch);
                }
            } else {
                // Use mock data for demo/fallback
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

                // Check if tracking number exists in our mock data
                const mockData = demoTrackingNumbers.find(item => item.id === numberToSearch);
                if (mockData) {
                    // Get the detailed mock data
                    // @ts-ignore - Access mock shipment data by tracking number
                    const mockShipment = shipmentStatuses[numberToSearch];
                    setShipmentData(mockShipment);

                    // Save to recent searches
                    updateRecentSearches(numberToSearch);
                } else {
                    setError("No shipment found with this tracking number");
                    setShipmentData(null);
                }
            }
        } catch (err) {
            setError("An error occurred while tracking your shipment");
            setShipmentData(null);
        } finally {
            setIsSearching(false);
        }
    };

    const updateRecentSearches = (newSearch: string) => {
        const updatedSearches = [
            newSearch,
            ...recentSearches.filter(item => item !== newSearch)
        ].slice(0, 5);

        setRecentSearches(updatedSearches);
        localStorage.setItem('recentTrackingSearches', JSON.stringify(updatedSearches));
    };

    const clearSearch = () => {
        setTrackingNumber("");
        setShipmentData(null);
        setError("");
    };

    // Toggle between API and mock data mode (for development/testing)
    const toggleMode = () => {
        setIsAPIMode(!isAPIMode);
        clearSearch();
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section
                className="relative text-white w-full overflow-hidden pt-20"
                style={{
                    background: 'linear-gradient(135deg, #0A3622 0%, #155D36 50%, #0A3622 100%)',
                    minHeight: isMobile ? "auto" : `calc(${viewportHeight} * 0.5)`
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-24 flex flex-col items-center text-center">
                    <motion.div
                        className="max-w-3xl"
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
                            <span className="text-sm font-medium text-white">Track & Trace</span>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Track Your <span className="text-green-light">Shipment</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            Enter your tracking number to get real-time updates on your shipment
                        </motion.p>
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

            {/* Tracking Form Section */}
            <section className="py-12 lg:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Enter Tracking Number</h2>

                            {/* Only show mode toggle in development */}
                            {process.env.NODE_ENV === 'development' && (
                                <div
                                    className="text-xs px-2 py-1 rounded bg-gray-100 cursor-pointer hover:bg-gray-200"
                                    onClick={toggleMode}
                                    title="Toggle between API and mock data"
                                >
                                    {isAPIMode ? 'Using API' : 'Using Mock Data'}
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <Input
                                    type="text"
                                    placeholder="e.g. GW123456789"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                                    className="flex-1 focus:border-green-medium focus:ring-green-light"
                                />
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white sm:w-auto w-full"
                                    disabled={isSearching}
                                >
                                    {isSearching ? "Searching..." : "Track"}
                                </Button>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            {recentSearches.length > 0 && !shipmentData && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Tracking Numbers</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearches.map((number) => (
                                            <Button
                                                key={number}
                                                variant="outline"
                                                size="sm"
                                                className="text-gray-700 hover:text-green-dark"
                                                onClick={(e) => {
                                                    setTrackingNumber(number);
                                                    handleSearch(e as any, number);
                                                }}
                                            >
                                                {number}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </form>
                    </motion.div>

                    {/* Tracking Results */}
                    {shipmentData && <TrackingResults shipment={shipmentData} onBackClick={clearSearch} />}

                    {/* Demo tracking numbers */}
                    {!shipmentData && (
                        <motion.div
                            className="max-w-3xl mx-auto mt-12 p-6 bg-green-50 rounded-lg border border-green-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <h3 className="font-medium text-green-dark mb-3">Demo Tracking Numbers</h3>
                            <p className="text-gray-700 mb-4">Try these sample tracking numbers to see different shipment statuses:</p>
                            <div className="space-y-2">
                                {demoTrackingNumbers.map((item) => (
                                    <div key={item.id} className="flex flex-col xs:flex-row xs:items-center xs:justify-between p-3 bg-white rounded-md">
                                        <div className="mb-2 xs:mb-0">
                                            <span className="font-medium">{item.id}</span>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{item.status}</span>
                                                <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{item.description}</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-green-dark hover:text-green-dark hover:bg-green-50 w-full xs:w-auto"
                                            onClick={(e) => {
                                                setTrackingNumber(item.id);
                                                handleSearch(e as any, item.id);
                                            }}
                                        >
                                            Track
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Additional Info Section */}
            {!shipmentData && (
                <section className="py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left Column: Tracking Info */}
                            <div className="lg:col-span-7 space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Track Your Shipment</h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                        {[
                                            {
                                                step: "1",
                                                title: "Enter Your Tracking Number",
                                                description: "Input your unique tracking number in the search field above."
                                            },
                                            {
                                                step: "2",
                                                title: "View Real-Time Updates",
                                                description: "Get immediate information about your shipment's current status and location."
                                            },
                                            {
                                                step: "3",
                                                title: "Check Estimated Delivery",
                                                description: "See the expected delivery date based on current transit information."
                                            },
                                            {
                                                step: "4",
                                                title: "Track Environmental Impact",
                                                description: "See how much CO2 emissions we've saved with your eco-friendly shipping."
                                            }
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-green-100 text-green-dark flex items-center justify-center font-bold text-sm mb-4">
                                                    {item.step}
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                                <p className="text-gray-600">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gray-100 p-6 rounded-lg">
                                        <h3 className="font-semibold text-lg mb-4">Where to Find Your Tracking Number</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start">
                                                <span className="h-5 w-5 text-green-dark mr-2 flex-shrink-0">•</span>
                                                <span>In your order confirmation email</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="h-5 w-5 text-green-dark mr-2 flex-shrink-0">•</span>
                                                <span>On your shipping notification</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="h-5 w-5 text-green-dark mr-2 flex-shrink-0">•</span>
                                                <span>Within your account dashboard if you're a registered client</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="h-5 w-5 text-green-dark mr-2 flex-shrink-0">•</span>
                                                <span>On your printed shipping label or receipt</span>
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Column: Sustainable Tracking */}
                            <div className="lg:col-span-5">
                                <motion.div
                                    className="bg-white p-6 rounded-xl shadow-lg"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Sustainable Tracking</h2>

                                    <div className="mb-6 relative h-52 overflow-hidden rounded-lg">
                                        <Image
                                            src="/images/services/eco-fleet.jpg"
                                            fill
                                            alt="Sustainable Tracking"
                                            className="object-cover"
                                        />
                                    </div>

                                    <p className="text-gray-700 mb-4">
                                        At Greenway, we don't just track your packages - we track our environmental impact too. With every shipment, you'll see:
                                    </p>

                                    <ul className="space-y-2 mb-6 text-gray-700">
                                        {[
                                            "Carbon emissions saved compared to traditional shipping",
                                            "Total renewable energy used for your delivery",
                                            "Eco-friendly packaging materials utilized",
                                            "Contribution to our carbon offset initiatives"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="h-5 w-5 rounded-full bg-green-100 text-green-dark flex items-center justify-center text-xs mt-0.5 mr-2">✓</div>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-green-dark mb-2">Did You Know?</h3>
                                        <p className="text-gray-700 text-sm">
                                            Our eco-friendly shipping options have helped reduce carbon emissions by over 75% compared to traditional logistics providers.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="mt-8 bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white p-6 rounded-xl shadow-lg"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                >
                                    <h3 className="font-semibold text-xl mb-4">Need More Help?</h3>
                                    <p className="mb-6">
                                        Our customer support team is available to assist you with any tracking questions or concerns.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            variant="outline"
                                            className="border-white text-white hover:bg-white/20"
                                            asChild
                                        >
                                            <Link href="/contact">Contact Support</Link>
                                        </Button>
                                        <Button
                                            className="bg-white text-green-dark hover:bg-white/90"
                                            asChild
                                        >
                                            <Link href="/quote">Request a Quote</Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {!shipmentData && (
                <section className="py-16 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold mb-5">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A3622] to-[#1C7C4A]">
                                    Frequently Asked Questions
                                </span>
                            </h2>
                            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                                Find answers to common questions about our tracking system
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                {
                                    question: "How often is tracking information updated?",
                                    answer: "Our tracking system updates in real-time as your shipment moves through our network. You can expect multiple updates per day for active shipments."
                                },
                                {
                                    question: "What if my tracking number doesn't work?",
                                    answer: "If your tracking number isn't recognized, please double-check for typos. New shipments may take up to 24 hours to appear in our system. For further assistance, contact our customer support."
                                },
                                {
                                    question: "Can I track international shipments?",
                                    answer: "Yes, our tracking system supports international shipments across all regions we serve. International tracking provides the same detailed information as domestic tracking."
                                },
                                {
                                    question: "How do I track multiple packages at once?",
                                    answer: "Corporate clients can access our bulk tracking feature through their account dashboard. For individual customers, you'll need to track each shipment separately."
                                },
                                {
                                    question: "Is the CO₂ emissions data accurate?",
                                    answer: "Yes, we calculate CO₂ savings based on verified data comparing our green fleet to industry standard transportation methods. These calculations are regularly audited by third-party environmental agencies."
                                },
                                {
                                    question: "Can I share my tracking information?",
                                    answer: "Yes, you can share tracking details via email, SMS, or by generating a shareable link from the tracking results page."
                                }
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md p-6"
                                    variants={fadeIn}
                                >
                                    <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                                    <p className="text-gray-700">{faq.answer}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
