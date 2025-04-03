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

export default function PrivacyPolicyPage() {
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
                            Privacy Policy
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            How we collect, use, and protect your personal information
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

                            <h2>Introduction</h2>
                            <p>
                                Greenway Logistics ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
                            </p>
                            <p>
                                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access our services.
                            </p>

                            <h2>Information We Collect</h2>
                            <p>We collect information in the following ways:</p>

                            <h3>Personal Information You Provide</h3>
                            <p>We may collect personal information that you voluntarily provide to us when you:</p>
                            <ul>
                                <li>Fill out forms on our website (including contact forms, quote requests, etc.)</li>
                                <li>Create an account</li>
                                <li>Send us correspondence</li>
                                <li>Subscribe to our newsletter</li>
                                <li>Request customer support</li>
                                <li>Use our shipping and tracking services</li>
                            </ul>
                            <p>The personal information we collect may include:</p>
                            <ul>
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Business name</li>
                                <li>Physical address</li>
                                <li>Shipment details</li>
                                <li>Payment information (for services rendered)</li>
                            </ul>

                            <h3>Information Automatically Collected</h3>
                            <p>When you access our website or services, we may automatically collect certain information, including:</p>
                            <ul>
                                <li>Device information (device type, operating system, browser type)</li>
                                <li>Usage data (pages visited, time spent on pages, click patterns)</li>
                                <li>IP address</li>
                                <li>Location data</li>
                                <li>Cookies and similar technologies</li>
                            </ul>

                            <h2>How We Use Your Information</h2>
                            <p>We may use your information for the following purposes:</p>
                            <ul>
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process transactions and send related information</li>
                                <li>Respond to your comments, questions, and requests</li>
                                <li>Send you technical notices, updates, security alerts, and administrative messages</li>
                                <li>Track and analyze trends, usage, and activities in connection with our services</li>
                                <li>Detect, prevent, and address technical issues</li>
                                <li>Protect against harmful, unauthorized, or illegal activity</li>
                                <li>Communicate with you about products, services, offers, and events</li>
                                <li>Provide customer support</li>
                                <li>Comply with legal obligations</li>
                            </ul>

                            <h2>Disclosure of Your Information</h2>
                            <p>We may share your information in the following situations:</p>
                            <ul>
                                <li><strong>Service Providers:</strong> With third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                                <li><strong>Partners and Affiliates:</strong> With our business partners and affiliates to offer you certain products, services, or promotions</li>
                                <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid legal requests</li>
                                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business</li>
                                <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, and that of our users or others</li>
                            </ul>

                            <h2>Your Privacy Choices</h2>
                            <p>You have several choices regarding the use of your information:</p>
                            <ul>
                                <li><strong>Opt-Out:</strong> You may opt out of receiving promotional communications from us by following the instructions in those messages</li>
                                <li><strong>Access and Update:</strong> You can access and update your personal information through your account settings or by contacting us</li>
                                <li><strong>Cookies:</strong> Most web browsers accept cookies by default. You can set your browser to reject or remove cookies</li>
                                <li><strong>Do Not Track:</strong> We do our best to honor any Do Not Track signals sent by your browser</li>
                            </ul>

                            <h2>Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to maintain the security of your personal information, including safeguards designed to protect your information from accidental loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                            </p>
                            <p>
                                However, no network, server, database, or Internet transmission is completely secure. We cannot guarantee that your information will not be disclosed, misused, or lost by accident or by unauthorized access.
                            </p>

                            <h2>Data Retention</h2>
                            <p>
                                We will retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including to satisfy any legal, accounting, or reporting requirements.
                            </p>
                            <p>
                                To determine the appropriate retention period for personal information, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure of your personal information, the purposes for which we process your personal information, and applicable legal requirements.
                            </p>

                            <h2>Children's Privacy</h2>
                            <p>
                                Our services are not intended for individuals under the age of 18. We do not knowingly collect or solicit personal information from anyone under the age of 18. If we learn that we have collected personal information from a child under 18, we will delete that information as quickly as possible. If you believe that we might have any information from or about a child under 18, please contact us.
                            </p>

                            <h2>Third-Party Links and Services</h2>
                            <p>
                                Our website may contain links to third-party websites, products, or services. We are not responsible for the content or practices of those websites, products, or services. The collection, use, and disclosure of your information will be subject to the privacy policies of the third party, not this Privacy Policy. We encourage you to read the privacy policy of any website you visit.
                            </p>

                            <h2>International Data Transfers</h2>
                            <p>
                                Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
                            </p>
                            <p>
                                If you are located outside the United States and choose to provide information to us, please note that we transfer the data to the United States and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                            </p>

                            <h2>Changes to This Privacy Policy</h2>
                            <p>
                                We may update this policy from time to time. The "Last Updated" date at the top of this page indicates when this Privacy Policy was last revised. We will notify you of any significant changes by posting a notice on our website or sending you an email. We encourage you to review this Privacy Policy periodically.
                            </p>

                            <h2>Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy or our practices, please contact us at:
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
