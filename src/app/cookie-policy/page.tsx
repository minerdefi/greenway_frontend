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

export default function CookiePolicyPage() {
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
                            Cookie Policy
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl mb-6 md:mb-8 text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            How we use cookies and similar technologies
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
                                This Cookie Policy explains how Greenway Logistics ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at greenwaylogistics.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                            </p>

                            <h2>What Are Cookies?</h2>
                            <p>
                                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                            </p>
                            <p>
                                Cookies set by the website owner (in this case, Greenway Logistics) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
                            </p>

                            <h2>Why Do We Use Cookies?</h2>
                            <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.</p>

                            <h2>Types of Cookies We Use</h2>
                            <p>The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:</p>

                            <h3>Essential Website Cookies</h3>
                            <p>These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions.</p>

                            <h3>Performance and Functionality Cookies</h3>
                            <p>These cookies are used to enhance the performance and functionality of our Website but are non-essential to its use. However, without these cookies, certain functionality may become unavailable.</p>

                            <h3>Analytics and Customization Cookies</h3>
                            <p>These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</p>

                            <h3>Advertising Cookies</h3>
                            <p>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p>

                            <h3>Social Media Cookies</h3>
                            <p>These cookies are used to enable you to share pages and content that you find interesting on our Website through third-party social networking and other websites. These cookies may also be used for advertising purposes.</p>

                            <h2>How Can You Control Cookies?</h2>
                            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
                            <p>You can also set or amend your web browser controls to accept or refuse cookies. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
                            <p>Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. Below are links to instructions on how to manage cookies in popular web browsers:</p>
                            <ul>
                                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-green-dark">Google Chrome</a></li>
                                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-green-dark">Mozilla Firefox</a></li>
                                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-green-dark">Safari</a></li>
                                <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-green-dark">Internet Explorer</a></li>
                                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-green-dark">Microsoft Edge</a></li>
                            </ul>

                            <h2>What About Other Tracking Technologies?</h2>
                            <p>Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Website or opened an email that we have sent them. This allows us, for example, to monitor the traffic patterns of users from one page within our Website to another, to deliver or communicate with cookies, to understand whether you have come to our Website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.</p>

                            <h2>Do You Serve Targeted Advertising?</h2>
                            <p>Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other personally identifying details unless you choose to provide these.</p>

                            <h2>How Often Will You Update This Cookie Policy?</h2>
                            <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
                            <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>

                            <h2>Where Can You Get Further Information?</h2>
                            <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
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
