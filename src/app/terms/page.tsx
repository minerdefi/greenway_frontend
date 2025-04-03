"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/ui/footer";
import { useState, useEffect } from "react";
import Link from "next/link";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TermsPage() {
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
                    minHeight: isMobile ? "auto" : "40vh"
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20 flex flex-col items-center text-center">
                    <motion.div
                        className="max-w-3xl"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Terms of Service
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            The rules and guidelines for using our logistics services
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

            {/* Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm">
                        <div className="prose prose-green max-w-none">
                            <p className="text-sm text-gray-500">Last updated: June 1, 2024</p>

                            <h2>1. Agreement to Terms</h2>
                            <p>
                                By accessing or using the services provided by Greenway Logistics ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use our services.
                            </p>

                            <h2>2. Description of Services</h2>
                            <p>
                                Greenway Logistics provides eco-friendly shipping, logistics, and transportation services, including but not limited to freight forwarding, cargo shipping, packaging and storage, warehousing, door-to-door delivery, and transportation services.
                            </p>

                            <h2>3. User Responsibilities</h2>
                            <p>By using our services, you agree to:</p>
                            <ul>
                                <li>Provide accurate and complete information when creating accounts or requesting services</li>
                                <li>Maintain the security of your account information</li>
                                <li>Comply with all applicable laws and regulations</li>
                                <li>Not engage in any activity that may damage, disable, or impair our services</li>
                                <li>Not attempt to gain unauthorized access to our systems or networks</li>
                                <li>Not use our services for any illegal or unauthorized purpose</li>
                                <li>Not share any account credentials with third parties</li>
                            </ul>

                            <h2>4. Shipping and Logistics Terms</h2>
                            <h3>4.1 Shipping Information</h3>
                            <p>
                                You must provide accurate and complete information for all shipments, including but not limited to:
                            </p>
                            <ul>
                                <li>Complete sender and recipient information</li>
                                <li>Accurate description of goods</li>
                                <li>Correct weight and dimensions</li>
                                <li>Proper declaration of any hazardous materials</li>
                                <li>All required customs documentation for international shipments</li>
                            </ul>

                            <h3>4.2 Prohibited Items</h3>
                            <p>
                                You may not ship items that are prohibited by law or our policies, including but not limited to:
                            </p>
                            <ul>
                                <li>Illegal substances or items</li>
                                <li>Firearms, weapons, or explosives</li>
                                <li>Hazardous materials not properly declared and packaged</li>
                                <li>Counterfeit goods</li>
                                <li>Human remains or ashes</li>
                                <li>Live animals (unless specifically arranged with specialized services)</li>
                                <li>Perishable items that would spoil during normal transit times</li>
                            </ul>

                            <h3>4.3 Liability Limitations</h3>
                            <p>
                                Our liability for loss, damage, or delay of shipments is limited as follows:
                            </p>
                            <ul>
                                <li>Domestic shipments: Up to $100 per package unless additional insurance is purchased</li>
                                <li>International shipments: As per the terms of the Montreal Convention or Warsaw Convention</li>
                                <li>We are not liable for indirect, special, or consequential damages</li>
                                <li>Claims must be filed within 30 days of delivery or expected delivery date</li>
                            </ul>

                            <h2>5. Payment Terms</h2>
                            <p>
                                By engaging our services, you agree to:
                            </p>
                            <ul>
                                <li>Pay all applicable fees and charges for services rendered</li>
                                <li>Pay any additional charges incurred (such as customs duties, taxes, or storage fees)</li>
                                <li>Payment is due upon invoice receipt unless credit terms have been established</li>
                                <li>We reserve the right to charge interest on overdue payments</li>
                            </ul>

                            <h2>6. Intellectual Property</h2>
                            <p>
                                All content, designs, logos, and other intellectual property displayed on our website or materials are the property of Greenway Logistics or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or distribute our intellectual property without our prior written consent.
                            </p>

                            <h2>7. Privacy Policy</h2>
                            <p>
                                Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our <Link href="/privacy-policy" className="text-green-dark">Privacy Policy</Link> to understand our practices.
                            </p>

                            <h2>8. Modification of Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes indicates your acceptance of the modified Terms.
                            </p>

                            <h2>9. Termination</h2>
                            <p>
                                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use our services will immediately cease.
                            </p>

                            <h2>10. Limitation of Liability</h2>
                            <p>
                                To the maximum extent permitted by law, in no event shall Greenway Logistics, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                            </p>
                            <ul>
                                <li>Your use or inability to use our services</li>
                                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                                <li>Any interruption or cessation of transmission to or from our services</li>
                                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our service</li>
                            </ul>

                            <h2>11. Indemnification</h2>
                            <p>
                                You agree to defend, indemnify, and hold harmless Greenway Logistics and its subsidiaries, affiliates, officers, agents, employees, partners, and licensors from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your use of our services or your violation of these Terms.
                            </p>

                            <h2>12. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. You agree to submit to the personal jurisdiction of the courts located in New York County, New York.
                            </p>

                            <h2>13. Force Majeure</h2>
                            <p>
                                We shall not be liable for any failure to perform our obligations where such failure is as a result of acts of nature (including fire, flood, earthquake, storm, hurricane, or other natural disasters), war, invasion, act of foreign enemies, hostilities (whether war is declared or not), civil war, rebellion, revolution, insurrection, military or usurped power or confiscation, terrorist activities, nationalization, government sanction, blockage, embargo, labor dispute, strike, lockout or interruption or failure of electricity or telephone service.
                            </p>

                            <h2>14. Severability</h2>
                            <p>
                                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect and enforceable.
                            </p>

                            <h2>15. Entire Agreement</h2>
                            <p>
                                These Terms constitute the entire agreement between you and Greenway Logistics regarding the use of our services, superseding any prior agreements between you and us (including, but not limited to, any prior versions of the Terms).
                            </p>

                            <h2>16. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <p>
                                <strong>Email:</strong> <a href="mailto:support@greenwaylogst.com">support@greenwaylogst.com</a><br />
                                <strong>Phone:</strong> +1 (901) 445-0394<br />
                                <strong>Address:</strong> 31-00 47th Ave, Long Island City, NY, United States
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <Link href="/" className="text-green-dark hover:text-green-800 font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
