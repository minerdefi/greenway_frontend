"use client"

import { motion } from "framer-motion";
import Image from "next/image";

// Partner logo data
const partners = [
    { name: "EcoShip", logo: "/images/partners/ecoship.png" },
    { name: "GreenTech", logo: "/images/partners/greentech.png" },
    { name: "SustainCargo", logo: "/images/partners/sustaincargo.png" },
    { name: "EcoTransport", logo: "/images/partners/ecotransport.png" },
    { name: "CleanFreight", logo: "/images/partners/cleanfreight.png" },
    { name: "ZeroCarbon", logo: "/images/partners/zerocarbon.png" },
];

// Partner logo component with error handling
const PartnerLogo = ({ partner }: { partner: { name: string; logo: string } }) => {
    return (
        <div className="bg-white rounded-lg p-4 h-24 w-full flex items-center justify-center">
            <div className="relative h-12 w-full">
                <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    priority
                    onError={(e) => {
                        // If image fails, replace with partner name text
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                            // Create text fallback
                            const text = document.createElement('div');
                            text.className = "font-medium text-green-dark text-lg text-center flex items-center justify-center h-full";
                            text.textContent = partner.name;
                            parent.appendChild(text);
                            target.style.display = 'none';
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default function PartnersSection() {
    return (
        <section
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
        >
            {/* Background grid pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(#0A3622 1px, transparent 1px), linear-gradient(90deg, #0A3622 1px, transparent 1px)",
                    backgroundSize: "80px 80px"
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
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
                        <span className="text-sm text-green-dark dark:text-green-light font-medium">Trusted Partners</span>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners & Sponsors</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Working together with industry leaders to deliver sustainable logistics solutions
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 items-center"
                >
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            className="transition-all duration-300"
                        >
                            <PartnerLogo partner={partner} />
                        </motion.div>
                    ))}
                </motion.div>


            </div>
        </section>
    );
}
