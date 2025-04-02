"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, JSX } from "react"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

// Simple fallback icons component
const renderIcon = (iconName: keyof typeof Icons, className?: string) => {
    const iconFallbacks: Record<string, () => JSX.Element> = {
        truck: () => <span>🚚</span>,
        search: () => <span>🔍</span>,
        menu: () => <span>☰</span>,
        x: () => <span>✕</span>,
    };

    const Icon = Icons[iconName];
    if (!Icon) {
        const Fallback = iconFallbacks[iconName];
        return Fallback ? <Fallback /> : null;
    }
    return <Icon className={className} />;
};

const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Tracking", href: "/tracking" },
    { name: "Contact", href: "/contact" },
    { name: "Quote", href: "/quote" },
    { name: "Admin", href: "/admin" },  // Add Admin link to navbar
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeLink, setActiveLink] = useState("/")
    const [showServicesDropdown, setShowServicesDropdown] = useState(false)

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        // Set active path on load
        setActiveLink(window.location.pathname)

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Track Shipment", href: "/tracking" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" }
    ]

    const serviceLinks = [
        { name: "Freight Services", href: "/services/freight" },
        { name: "Cargo Shipping", href: "/services/cargo-shipping" },
        { name: "Packaging & Storage", href: "/services/packaging-storage" },
        { name: "Warehousing", href: "/services/warehousing" },
        { name: "Door to Door Delivery", href: "/services/door-to-door" },
        { name: "Transportation", href: "/services/transportation" },
    ]

    // Mobile menu animation variants
    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.4,
                when: "beforeChildren",
                staggerChildren: 0.1,
                staggerDirection: 1
            }
        }
    };

    const menuItemVariants = {
        closed: { opacity: 0, y: -10 },
        open: { opacity: 1, y: 0 }
    };

    // Function to close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMenuOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "fixed w-full z-40 transition-all duration-300",
                scrolled
                    ? "bg-white/80 dark:bg-charcoal/80 backdrop-blur-md shadow-md"
                    : "bg-transparent dark:bg-transparent"
            )}
            style={{
                backdropFilter: scrolled ? "blur(12px)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(12px)" : "none"
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="relative h-12 w-auto" // Increased from h-10 to h-12
                            >
                                <Image
                                    src="/images/greenway_logo.png"
                                    alt="Greenway Logistics"
                                    width={150} // Increased from 120 to 150
                                    height={48} // Increased from 40 to 48
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                            <span
                                className={cn(
                                    "font-bold text-xl tracking-tight transition-colors duration-200 hidden sm:block",
                                    scrolled
                                        ? "text-green-dark dark:text-green-light"
                                        : "text-white"
                                )}
                                style={{ color: scrolled ? '#0A3622' : '#ffffff' }}
                            >

                            </span>
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="flex space-x-6 items-center">
                            {navLinks.map((link) => (
                                link.name === "Services" ? (
                                    <div
                                        key={link.href}
                                        className="relative"
                                        onMouseEnter={() => setShowServicesDropdown(true)}
                                        onMouseLeave={() => setShowServicesDropdown(false)}
                                    >
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "relative font-medium text-sm tracking-wide py-2 transition-colors flex items-center",
                                                scrolled
                                                    ? "text-gray-800 dark:text-gray-200"
                                                    : "text-white/90",
                                                activeLink === link.href && "font-semibold",
                                            )}
                                            style={{
                                                color: scrolled ? '#1A1A1A' : '#ffffff'
                                            }}
                                            onClick={() => setActiveLink(link.href)}
                                        >
                                            {link.name}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16" height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="ml-1 h-4 w-4"
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                            <span className={cn(
                                                "absolute inset-x-0 bottom-0 h-0.5 rounded-full origin-left transition-transform duration-300",
                                                (activeLink === link.href || activeLink.startsWith('/services/'))
                                                    ? "bg-green-medium scale-x-100"
                                                    : "bg-green-light scale-x-0 group-hover:scale-x-100"
                                            )}></span>
                                        </Link>

                                        {/* Services Dropdown */}
                                        <div
                                            className={cn(
                                                "absolute left-0 mt-2 w-64 rounded-md bg-white shadow-lg transition-all duration-200",
                                                scrolled ? "bg-white" : "bg-white",
                                                showServicesDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                                            )}
                                            style={{
                                                transitionProperty: 'opacity, transform',
                                                zIndex: 100
                                            }}
                                        >
                                            <div className="py-1 rounded-md overflow-hidden">
                                                {serviceLinks.map((service) => (
                                                    <Link
                                                        key={service.href}
                                                        href={service.href}
                                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-dark"
                                                        onClick={() => {
                                                            setActiveLink(service.href);
                                                            setShowServicesDropdown(false);
                                                        }}
                                                    >
                                                        {service.name}
                                                    </Link>
                                                ))}
                                                <div className="border-t border-gray-100 mt-1">
                                                    <Link
                                                        href="/services"
                                                        className="block px-4 py-2.5 text-sm text-green-dark font-medium"
                                                    >
                                                        View All Services
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "relative font-medium text-sm tracking-wide py-2 transition-colors",
                                            scrolled
                                                ? "text-gray-800 dark:text-gray-200"
                                                : "text-white/90",
                                            activeLink === link.href && "font-semibold",
                                        )}
                                        style={{
                                            color: scrolled ? '#1A1A1A' : '#ffffff'
                                        }}
                                        onClick={() => setActiveLink(link.href)}
                                    >
                                        {link.name}
                                        <span className={cn(
                                            "absolute inset-x-0 bottom-0 h-0.5 rounded-full origin-left transition-transform duration-300",
                                            activeLink === link.href
                                                ? "bg-green-medium scale-x-100"
                                                : "bg-green-light scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                )
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">


                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Button
                                    asChild
                                    variant="default"
                                    className="rounded-full bg-green-dark hover:bg-green-medium text-white shadow-md hover:shadow-lg transition-all duration-300"
                                    style={{ backgroundColor: '#0A3622' }}
                                >
                                    <Link href="/quote">Get a Quote</Link>
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <motion.button
                            id="menu-button"
                            type="button"
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "p-2 rounded-md focus:outline-none transition-colors",
                                scrolled
                                    ? "text-gray-600 dark:text-gray-300"
                                    : "text-white"
                            )}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                renderIcon("x", "h-6 w-6")
                            ) : (
                                renderIcon("menu", "h-6 w-6")
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="md:hidden bg-white dark:bg-charcoal overflow-hidden shadow-lg"
                    >
                        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                link.name === "Services" ? (
                                    <motion.div key={link.href} variants={menuItemVariants}>
                                        <button
                                            className={cn(
                                                "w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between",
                                                activeLink === link.href || activeLink.startsWith('/services/')
                                                    ? "bg-green-dark/10 text-green-dark dark:bg-green-dark/30 dark:text-green-light"
                                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                                            )}
                                            onClick={() => {
                                                setShowServicesDropdown(!showServicesDropdown);
                                            }}
                                        >
                                            {link.name}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16" height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={`h-4 w-4 transition-transform ${showServicesDropdown ? 'rotate-180' : ''}`}
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </button>

                                        {/* Mobile Services Dropdown */}
                                        <AnimatePresence>
                                            {showServicesDropdown && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg mx-2 mt-1 mb-2">
                                                        {serviceLinks.map((service) => (
                                                            <Link
                                                                key={service.href}
                                                                href={service.href}
                                                                className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                onClick={() => {
                                                                    setActiveLink(service.href);
                                                                    setIsMenuOpen(false);
                                                                }}
                                                            >
                                                                {service.name}
                                                            </Link>
                                                        ))}
                                                        <Link
                                                            href="/services"
                                                            className="block px-4 py-2.5 text-sm text-green-dark dark:text-green-light font-medium border-t border-gray-200 dark:border-gray-700"
                                                            onClick={() => {
                                                                setActiveLink('/services');
                                                                setIsMenuOpen(false);
                                                            }}
                                                        >
                                                            View All Services
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    <motion.div key={link.href} variants={menuItemVariants}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                                                activeLink === link.href
                                                    ? "bg-green-dark/10 text-green-dark dark:bg-green-dark/30 dark:text-green-light"
                                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                                            )}
                                            onClick={() => {
                                                setActiveLink(link.href);
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                )
                            ))}
                            <motion.div variants={menuItemVariants} className="pt-4 px-3">
                                <Button
                                    asChild
                                    variant="default"
                                    className="w-full py-3 text-white rounded-lg bg-green-dark hover:bg-green-medium flex items-center justify-center gap-2"
                                    style={{ backgroundColor: '#0A3622' }}
                                >
                                    <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                                        Get a Quote {renderIcon("chevronRight", "h-4 w-4 ml-1")}
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
