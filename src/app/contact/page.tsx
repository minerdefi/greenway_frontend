"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { submitContactMessage } from "@/services/contactService";

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
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

export default function ContactPage() {
    const [viewportHeight, setViewportHeight] = useState("100vh");
    const [isMobile, setIsMobile] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        service: "General Inquiry"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [contactId, setContactId] = useState("");

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

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Send data to backend via contactService
            const response = await submitContactMessage({
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                company: formState.company,
                subject: formState.service,
                message: formState.message
            });

            if (response.success) {
                setContactId(response.contact_id);
                setIsSubmitted(true);
                setFormState({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    message: "",
                    service: "General Inquiry"
                });
            } else {
                setError(response.message || "Failed to send message. Please try again.");
            }
        } catch (err: any) {
            const errorMessage = typeof err === 'string' ? err :
                err.message || "An error occurred. Please try again.";
            console.error("Error submitting form:", err);
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
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
                            <span className="text-sm font-medium text-white">We're Here to Help</span>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Contact <span className="text-green-light">Greenway</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            Get in touch with our team for inquiries, quotes, or to learn more about our sustainable logistics solutions.
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

            {/* Contact Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <motion.div
                            className="bg-white rounded-xl shadow-xl p-6 md:p-8 order-2 lg:order-1"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>

                            {isSubmitted ? (
                                <motion.div
                                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="mb-4 text-green-dark text-4xl">✓</div>
                                    <h3 className="text-xl font-semibold text-green-dark mb-2">Thank You!</h3>
                                    <p className="text-gray-700 mb-4">Your message has been sent successfully. We'll be in touch shortly.</p>
                                    {contactId && (
                                        <div className="mb-4 mt-2">
                                            <p className="text-sm text-gray-600">Reference ID:</p>
                                            <p className="font-mono font-medium text-green-dark">{contactId}</p>
                                        </div>
                                    )}
                                    <Button
                                        variant="outline"
                                        className="border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                        onClick={() => setIsSubmitted(false)}
                                    >
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                    initial="hidden"
                                    animate="visible"
                                    variants={staggerContainer}
                                >
                                    <motion.div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                        variants={staggerContainer}
                                    >
                                        <motion.div variants={fadeIn}>
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                className="mt-1"
                                            />
                                        </motion.div>
                                        <motion.div variants={fadeIn}>
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                className="mt-1"
                                            />
                                        </motion.div>
                                        <motion.div variants={fadeIn}>
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={formState.phone}
                                                onChange={handleChange}
                                                placeholder="+1 (555) 123-4567"
                                                className="mt-1"
                                            />
                                        </motion.div>
                                        <motion.div variants={fadeIn}>
                                            <Label htmlFor="company">Company</Label>
                                            <Input
                                                id="company"
                                                name="company"
                                                value={formState.company}
                                                onChange={handleChange}
                                                placeholder="Your Company Inc."
                                                className="mt-1"
                                            />
                                        </motion.div>
                                    </motion.div>

                                    <motion.div variants={fadeIn}>
                                        <Label htmlFor="service">Service of Interest</Label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formState.service}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Freight Services">Freight Services</option>
                                            <option value="Cargo Shipping">Cargo Shipping</option>
                                            <option value="Packaging & Storage">Packaging & Storage</option>
                                            <option value="Warehousing">Warehousing</option>
                                            <option value="Door to Door Delivery">Door to Door Delivery</option>
                                            <option value="Transportation">Transportation</option>
                                        </select>
                                    </motion.div>

                                    <motion.div variants={fadeIn}>
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formState.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="Please tell us about your needs..."
                                            className="mt-1 min-h-[150px]"
                                        />
                                    </motion.div>

                                    {error && (
                                        <motion.div
                                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <motion.div variants={fadeIn}>
                                        <Button
                                            type="submit"
                                            className="w-full text-white bg-gradient-to-r from-[#0A3622] to-[#155D36]"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </div>
                                            ) : "Send Message"}
                                        </Button>

                                        <p className="text-xs text-gray-500 text-center mt-3">
                                            By submitting this form, you agree to our <Link href="/privacy-policy" className="text-green-dark underline">Privacy Policy</Link>.
                                        </p>
                                    </motion.div>
                                </motion.form>
                            )}
                        </motion.div>

                        {/* Right Column: Contact Info + Locations */}
                        <div className="order-1 lg:order-2 space-y-12">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>

                                <motion.div
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {[
                                        {
                                            icon: "📍",
                                            title: "Main Address",
                                            content: "31-00 47th Ave,<br /> Long Island City, NY<br />United States"
                                        },
                                        {
                                            icon: "📞",
                                            title: "Phone Numbers",
                                            content: "<a href='tel:+1-901-445-0394' class='hover:text-green-dark transition-colors block mt-1 text-sm md:text-base'>Support: +1-901-445-0394</a>"
                                        },
                                        {
                                            icon: "✉️",
                                            title: "Email",
                                            content: "<a href='mailto:support@greenwaylogst.com' class='hover:text-green-dark transition-colors block text-sm md:text-base break-words'>support@greenwaylogst.com</a>"
                                        },
                                        {
                                            icon: "🕒",
                                            title: "Business Hours",
                                            content: "Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 1:00 PM<br />Sunday: Closed"
                                        }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white p-4 md:p-5 rounded-xl shadow-md flex items-start"
                                            variants={cardVariants}
                                            whileHover="hover"
                                        >
                                            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-green-50 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                                                <div className="text-green-dark text-base md:text-lg">{item.icon}</div>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-medium text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{item.title}</h4>
                                                <p className="text-gray-700 text-sm md:text-base break-words" dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Office Locations Section */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Location</h2>

                                <motion.div
                                    className="space-y-6"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        className="bg-white p-6 rounded-xl shadow-md"
                                        variants={cardVariants}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                            <div className="md:w-1/2">
                                                <h3 className="text-lg font-semibold mb-2">Main Headquarters</h3>
                                                <p className="text-gray-700 mb-4">
                                                    31-00 47th Ave,<br />
                                                    Long Island City, NY<br />
                                                    United States
                                                </p>
                                                <div className="flex items-center text-green-dark mb-2">
                                                    <svg className="h-4 w-4 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <a href="tel:+1-901-445-0394" className="hover:underline text-sm md:text-base">+1 (901) 445-0394</a>
                                                </div>
                                                <div className="flex items-center text-green-dark">
                                                    <svg className="h-4 w-4 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <a href="mailto:support@greenwaylogst.com" className="hover:underline text-sm md:text-base break-words">support@greenwaylogst.com</a>
                                                </div>
                                            </div>
                                            <div className="md:w-1/2 h-64 md:h-auto">
                                                <div className="h-full w-full rounded-md overflow-hidden bg-gray-200 flex items-center justify-center">
                                                    <div className="flex flex-col items-center justify-center p-4 text-center">
                                                        <svg className="h-8 w-8 md:h-10 md:w-10 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span className="text-gray-500 font-medium">Headquarters</span>
                                                        <span className="text-xs text-gray-400 mt-1">Interactive map coming soon</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-24">
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
                                Frequently Asked Questions
                            </span>
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Find answers to common questions about our services and processes
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                question: "How can I request a quote for logistics services?",
                                answer: "You can request a quote by filling out the contact form on this page, calling our customer service line, or using our online quote tool. Our team will respond within 24 hours with a customized solution."
                            },
                            {
                                question: "What makes Greenway's logistics services eco-friendly?",
                                answer: "We use electric and hybrid vehicles, optimize routes to reduce fuel consumption, implement packaging solutions with recyclable materials, and offset any unavoidable emissions through certified carbon offset programs."
                            },
                            {
                                question: "Do you offer international shipping services?",
                                answer: "Yes, we provide comprehensive international shipping solutions with proper documentation handling, customs clearance support, and tracking capabilities across global destinations."
                            },
                            {
                                question: "How do I track my shipment?",
                                answer: "Once your shipment is in our system, you'll receive a tracking number that can be used on our website or mobile app to monitor your package's journey in real-time."
                            },
                            {
                                question: "What size packages and loads can you accommodate?",
                                answer: "We handle everything from small packages to full truckload shipments, with specialized equipment for oversized or unusual items."
                            },
                            {
                                question: "How do you ensure the security of stored items?",
                                answer: "Our warehouses feature 24/7 surveillance, controlled access systems, alarm monitoring, regular security patrols, and comprehensive insurance coverage options."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-6"
                                variants={cardVariants}
                            >
                                <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                                <p className="text-gray-700 text-sm md:text-base">{faq.answer}</p>
                            </motion.div>
                        ))}
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
                                Ready for Sustainable Logistics?
                            </motion.h2>
                            <motion.p
                                className="mb-10 max-w-2xl mx-auto text-white/90 text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Partner with us to reduce your carbon footprint while improving your logistics efficiency.
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
                                    <Link href="/services">Explore Our Services</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white text-white hover:bg-white/20 rounded-full px-8 font-medium"
                                    asChild
                                >
                                    <Link href="/quote">Get a Quote</Link>
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
