import Link from "next/link";
import Image from "next/image";
import React from "react";

// Define footer links
type ContactItem = {
    icon: React.ReactElement;
    text: string;
}

const footerLinks = {
    services: [
        { name: "Freight", href: "/services/freight" },
        { name: "Cargo Shipping", href: "/services/cargo-shipping" },
        { name: "Packaging & Storage", href: "/services/packaging-storage" },
        { name: "Warehousing", href: "/services/warehousing" },
        { name: "Door to Door Delivery", href: "/services/door-to-door" },
        { name: "Transportation", href: "/services/transportation" },
    ],
    company: [
        { name: "About Us", href: "/about" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Careers", href: "/careers" },
    ],
    resources: [
        { name: "Blog", href: "/blog" },
        { name: "FAQs", href: "/faq" },
        { name: "Partners", href: "/partners" },
    ],
    contact: [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            text: "support@greenwaylogistics.com"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            text: "+1 (901)445-0394"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            text: "123 Green Street, Eco City"
        },
    ],
};

export function Footer() {
    return (
        <footer className="bg-charcoal text-white py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A1A1A' }}>
            <div className="max-w-7xl mx-auto">
                {/* Logo section */}
                <div className="flex flex-col items-center mb-10">
                    <Image
                        src="/images/greenway_logo.png"
                        alt="Greenway Logistics"
                        width={200} // Increased from 160 to 200
                        height={62} // Increased from 50 to 62
                        className="object-contain mb-4"
                    />
                    <p className="text-sm text-gray-400 max-w-md text-center">
                        Providing sustainable shipping solutions and eco-friendly logistics services worldwide.
                    </p>
                </div>

                {/* Links grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:underline hover:text-green-light transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:underline hover:text-green-light transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:underline hover:text-green-light transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            {footerLinks.contact.map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {React.cloneElement(item.icon, { className: "h-5 w-5 text-green-light", style: { color: '#1C7C4A' } })}
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Greenway Logistics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
