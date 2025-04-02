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
import { submitQuote } from "@/services/quoteService";

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

export default function QuotePage() {
    const [viewportHeight, setViewportHeight] = useState("100vh");
    const [isMobile, setIsMobile] = useState(false);
    const [step, setStep] = useState(1);
    const [formState, setFormState] = useState({
        // Step 1: Personal Information
        name: "",
        email: "",
        phone: "",
        company: "",
        // Step 2: Shipment Details
        serviceType: "freight",
        weight: "",
        dimensions: "",
        pickupLocation: "",
        deliveryLocation: "",
        pickupDate: "",
        specialRequirements: "",
        // Step 3: Additional Information
        insuranceNeeded: false,
        packagingNeeded: false,
        expectedFrequency: "one-time",
        additionalNotes: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [quoteId, setQuoteId] = useState("");

    useEffect(() => {
        function updateViewportHeight() {
            setViewportHeight(`${window.innerHeight}px`);
            setIsMobile(window.innerWidth < 768);
        }
        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);
        return () => window.removeEventListener('resize', updateViewportHeight);
    }, []);

    const handleChange = (e: { target: { name: string; value: any; type?: string; checked?: boolean } }) => {
        const { name, value, type, checked } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Submit the form data to our backend API
            const response = await submitQuote(formState);
            if (response.success) {
                setQuoteId(response.quote_id);
                setIsSubmitted(true);
            } else {
                setError(response.message || "Failed to submit quote request. Please try again.");
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
                            <span className="text-sm font-medium text-white">Request a Quote</span>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Get a <span className="text-green-light">Custom Quote</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            Tell us about your logistics needs and we'll provide a tailored sustainable solution
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

            {/* Quote Form Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-12">
                        <div className="w-full max-w-3xl">
                            <div className="flex items-center justify-between mb-8">
                                {[1, 2, 3].map((stepNumber) => (
                                    <div key={stepNumber} className="flex flex-col items-center relative">
                                        {/* Connecting line */}
                                        {stepNumber < 3 && (
                                            <div className={`absolute left-[50%] w-full h-1 top-4 -translate-y-1/2 ${step > stepNumber ? "bg-green-dark" : "bg-gray-300"}`}></div>
                                        )}
                                        {/* Step circle */}
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 ${step >= stepNumber ? "bg-green-dark text-white" : "bg-gray-300 text-gray-600"}`}>
                                            {stepNumber}
                                        </div>
                                        {/* Step name */}
                                        <span className={`mt-2 text-sm font-medium ${step >= stepNumber ? "text-green-dark" : "text-gray-500"}`}>
                                            {stepNumber === 1 ? "Your Info" : stepNumber === 2 ? "Shipment Details" : "Additional Info"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <motion.div
                            className="bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-3xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {isSubmitted ? (
                                <motion.div
                                    className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                        <div className="text-green-dark text-3xl">✓</div>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-green-dark mb-4">Quote Request Received!</h3>
                                    <p className="text-gray-700 mb-3">
                                        Thank you for requesting a quote from Greenway. Our team will review your requirements and get back to you within 24 hours with a custom quote.
                                    </p>
                                    {quoteId && (
                                        <div className="bg-white p-3 rounded-md inline-block mb-6">
                                            <p className="text-sm text-gray-500 mb-1">Your Quote Reference ID:</p>
                                            <p className="font-mono font-bold text-lg text-green-dark">{quoteId}</p>
                                            <p className="text-xs text-gray-500 mt-1">Please keep this ID for future reference</p>
                                        </div>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button
                                            variant="outline"
                                            className="border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                            asChild
                                        >
                                            <Link href="/">Return to Home</Link>
                                        </Button>
                                        <Button
                                            className="bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white"
                                            asChild
                                        >
                                            <Link href="/services">Explore Our Services</Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                                    {/* Step 1: Personal Information */}
                                    {step === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Personal Information</h2>

                                            <div>
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
                                            </div>

                                            <div>
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
                                            </div>

                                            <div>
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formState.phone}
                                                    onChange={handleChange}
                                                    placeholder="+1 (555) 123-4567"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="company">Company Name</Label>
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    value={formState.company}
                                                    onChange={handleChange}
                                                    placeholder="Your Company Ltd."
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="pt-6">
                                                <Button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white"
                                                >
                                                    Next: Shipment Details
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Shipment Details */}
                                    {step === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipment Details</h2>

                                            <div>
                                                <Label htmlFor="serviceType">Service Type *</Label>
                                                <select
                                                    id="serviceType"
                                                    name="serviceType"
                                                    value={formState.serviceType}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-light focus-visible:ring-offset-2"
                                                >
                                                    <option value="freight">Freight Services</option>
                                                    <option value="cargo-shipping">Cargo Shipping</option>
                                                    <option value="packaging-storage">Packaging & Storage</option>
                                                    <option value="warehousing">Warehousing</option>
                                                    <option value="door-to-door">Door to Door Delivery</option>
                                                    <option value="transportation">Transportation</option>
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <Label htmlFor="weight">Estimated Weight</Label>
                                                    <Input
                                                        id="weight"
                                                        name="weight"
                                                        value={formState.weight}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 500 kg, 2 tons"
                                                        className="mt-1"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="dimensions">Dimensions</Label>
                                                    <Input
                                                        id="dimensions"
                                                        name="dimensions"
                                                        value={formState.dimensions}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 2m x 3m x 1m"
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="pickupLocation">Pickup Location *</Label>
                                                <Input
                                                    id="pickupLocation"
                                                    name="pickupLocation"
                                                    value={formState.pickupLocation}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Full address"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                                                <Input
                                                    id="deliveryLocation"
                                                    name="deliveryLocation"
                                                    value={formState.deliveryLocation}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Full address"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="pickupDate">Preferred Pickup Date</Label>
                                                <Input
                                                    id="pickupDate"
                                                    name="pickupDate"
                                                    type="date"
                                                    value={formState.pickupDate}
                                                    onChange={handleChange}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="specialRequirements">Special Requirements</Label>
                                                <Textarea
                                                    id="specialRequirements"
                                                    name="specialRequirements"
                                                    value={formState.specialRequirements}
                                                    onChange={handleChange}
                                                    placeholder="Any special handling instructions or requirements"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="flex justify-between pt-6 gap-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="w-1/2 border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                                    onClick={prevStep}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="w-1/2 bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white"
                                                >
                                                    Next: Additional Info
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Additional Information */}
                                    {step === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Additional Information</h2>

                                            <div className="space-y-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="insuranceNeeded"
                                                        name="insuranceNeeded"
                                                        type="checkbox"
                                                        checked={formState.insuranceNeeded}
                                                        onChange={handleChange}
                                                        className="h-4 w-4 text-green-dark focus:ring-green-light border-gray-300 rounded"
                                                    />
                                                    <Label htmlFor="insuranceNeeded" className="ml-2">
                                                        I'm interested in shipment insurance
                                                    </Label>
                                                </div>

                                                <div className="flex items-center">
                                                    <input
                                                        id="packagingNeeded"
                                                        name="packagingNeeded"
                                                        type="checkbox"
                                                        checked={formState.packagingNeeded}
                                                        onChange={handleChange}
                                                        className="h-4 w-4 text-green-dark focus:ring-green-light border-gray-300 rounded"
                                                    />
                                                    <Label htmlFor="packagingNeeded" className="ml-2">
                                                        I need eco-friendly packaging solutions
                                                    </Label>
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="expectedFrequency">Expected Shipping Frequency</Label>
                                                <select
                                                    id="expectedFrequency"
                                                    name="expectedFrequency"
                                                    value={formState.expectedFrequency}
                                                    onChange={handleChange}
                                                    className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-light focus-visible:ring-offset-2"
                                                >
                                                    <option value="one-time">One-time shipment</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="bi-weekly">Bi-weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="quarterly">Quarterly</option>
                                                    <option value="custom">Custom schedule</option>
                                                </select>
                                            </div>

                                            <div>
                                                <Label htmlFor="additionalNotes">Additional Notes</Label>
                                                <Textarea
                                                    id="additionalNotes"
                                                    name="additionalNotes"
                                                    value={formState.additionalNotes}
                                                    onChange={handleChange}
                                                    placeholder="Any other information that might be helpful for your quote"
                                                    className="mt-1 min-h-[120px]"
                                                />
                                            </div>

                                            {error && (
                                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                                    {error}
                                                </div>
                                            )}

                                            <div className="flex justify-between pt-6 gap-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="w-1/2 border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                                                    onClick={prevStep}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="w-1/2 bg-gradient-to-r from-[#0A3622] to-[#155D36] text-white"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <div className="flex items-center">
                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Submitting...
                                                        </div>
                                                    ) : "Submit Request"}
                                                </Button>
                                            </div>

                                            <p className="text-xs text-gray-500 text-center mt-3">
                                                By submitting this form, you agree to our <Link href="/privacy-policy" className="text-green-dark underline">Privacy Policy</Link>.
                                            </p>
                                        </motion.div>
                                    )}
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Services Overview */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Services</h2>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="grid grid-cols-1 divide-y divide-gray-200">
                                    {[
                                        {
                                            title: "Freight Services",
                                            description: "Cost-effective freight solutions for businesses of all sizes."
                                        },
                                        {
                                            title: "Cargo Shipping",
                                            description: "Reliable shipping for your cargo by land, sea, or air."
                                        },
                                        {
                                            title: "Packaging & Storage",
                                            description: "Eco-friendly packaging and secure storage facilities."
                                        },
                                        {
                                            title: "Warehousing",
                                            description: "Modern warehousing with inventory management systems."
                                        },
                                        {
                                            title: "Door to Door Delivery",
                                            description: "Complete logistics from pickup to final delivery."
                                        },
                                        {
                                            title: "Transportation",
                                            description: "Transportation solutions with our eco-friendly fleet."
                                        }
                                    ].map((service, index) => (
                                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                            <h3 className="font-medium text-gray-900">{service.title}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        question: "How soon will I receive my quote?",
                                        answer: "We typically provide quotes within 24 business hours of your request submission."
                                    },
                                    {
                                        question: "What information is needed for an accurate quote?",
                                        answer: "The more details you provide about your shipment (dimensions, weight, locations, timeline), the more accurate your quote will be."
                                    },
                                    {
                                        question: "Are there any hidden fees?",
                                        answer: "No, our quotes are transparent and include all applicable costs. Any potential additional charges will be clearly explained upfront."
                                    },
                                    {
                                        question: "How are shipping rates calculated?",
                                        answer: "Rates are based on distance, weight, dimensions, service type, and any special handling requirements for your shipment."
                                    }
                                ].map((faq, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-sm p-5">
                                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                        <p className="text-gray-700">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-[#0A3622] to-[#155D36] rounded-xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help With Your Quote?</h2>
                        <p className="mb-6 max-w-2xl mx-auto text-white/90">
                            Our logistics experts are ready to assist you with your quote request or answer any questions.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
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
                                <a href="tel:+19014450394">Call Us: (901) 445-0394</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
