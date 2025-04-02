"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blogData";
import { Input } from "@/components/ui/input";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params && typeof params.slug === 'string' ? params.slug : '';
    const post = getBlogPostBySlug(slug);
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

    if (!post) {
        // If post is not found, redirect to blog index
        setTimeout(() => {
            router.push('/blog');
        }, 100);

        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Post not found</h1>
                    <p className="text-gray-600 mt-2 mb-4">Redirecting to blog index...</p>
                    <div className="animate-spin h-8 w-8 border-4 border-green-dark border-t-transparent rounded-full mx-auto"></div>
                </div>
            </div>
        );
    }

    const relatedPosts = getRelatedPosts(post, 2);
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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
                    {/* Add post featured image as background with overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="relative w-full h-full">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover mix-blend-overlay opacity-30"
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-24 flex flex-col items-start">
                    <motion.div
                        className="max-w-3xl"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <Link href="/blog" className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 text-white/90 hover:text-white transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Blog
                        </Link>

                        <motion.span
                            className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full mb-4 md:mb-8"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="h-2 w-2 rounded-full bg-green-light mr-2 inline-block"></span>
                            <span className="text-sm font-medium">{post.category}</span>
                        </motion.span>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div
                            className="flex items-center text-white/80 mb-6 md:mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-dark font-bold text-sm mr-2">
                                    {post.author[0]}
                                </div>
                                <span className="mr-2">{post.author}</span>
                            </div>
                            <span className="mx-2 text-white/60">•</span>
                            <span>{formattedDate}</span>
                            <span className="mx-2 text-white/60">•</span>
                            <span>{post.readTime} min read</span>
                        </motion.div>
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

            {/* Main Content */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
                        {/* Content Column */}
                        <div className="lg:col-span-5">
                            <motion.article
                                className="bg-white p-6 md:p-10 rounded-xl shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Content */}
                                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-a:text-green-dark hover:prose-a:text-green-600 prose-img:rounded-lg">
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>

                                {/* Tags */}
                                <div className="mt-10 pt-6 border-t border-gray-100">
                                    <h3 className="text-gray-500 mb-3 text-sm">Tags:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <Link href={`/blog?tag=${tag}`} key={tag} legacyBehavior>
                                                <a className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors">
                                                    {tag}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>

                            {/* Share */}
                            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-medium mb-4">Share this article</h3>
                                <div className="flex space-x-3">
                                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                                        </svg>
                                        Facebook
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                                        </svg>
                                        Twitter
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                        </svg>
                                        LinkedIn
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-2">
                            {/* Related Posts */}
                            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">Related Posts</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map(relatedPost => (
                                        <div key={relatedPost.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                            <Link href={`/blog/${relatedPost.slug}`} legacyBehavior>
                                                <a className="group">
                                                    <div className="relative h-36 mb-2 rounded-md overflow-hidden">
                                                        <Image
                                                            src={relatedPost.imageUrl}
                                                            alt={relatedPost.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <h4 className="font-medium text-gray-900 group-hover:text-green-dark transition-colors">
                                                        {relatedPost.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {new Date(relatedPost.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </a>
                                            </Link>
                                        </div>
                                    ))}

                                    {relatedPosts.length === 0 && (
                                        <p className="text-gray-500 text-sm">No related posts found</p>
                                    )}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">Categories</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/blog?category=Sustainability" legacyBehavior>
                                            <a className="flex justify-between text-gray-700 hover:text-green-dark transition-colors">
                                                <span>Sustainability</span>
                                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                                                    2
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog?category=Technology" legacyBehavior>
                                            <a className="flex justify-between text-gray-700 hover:text-green-dark transition-colors">
                                                <span>Technology</span>
                                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                                                    1
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog?category=Industry" legacyBehavior>
                                            <a className="flex justify-between text-gray-700 hover:text-green-dark transition-colors">
                                                <span>Industry</span>
                                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                                                    0
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-green-dark text-white p-6 rounded-xl">
                                <h3 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h3>
                                <p className="text-white/90 text-sm mb-4">
                                    Get the latest articles and insights delivered to your inbox.
                                </p>
                                <form className="space-y-2">
                                    <Input
                                        type="email"
                                        placeholder="Your email address"
                                        required
                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                    />
                                    <Button className="w-full bg-white text-green-dark hover:bg-white/90">
                                        Subscribe
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-[#0A3622] to-[#155D36] rounded-xl p-8 md:p-12 text-white text-center overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/4"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Ship Sustainably?</h2>
                            <p className="mb-8 max-w-2xl mx-auto text-white/90">
                                Partner with Greenway for eco-friendly logistics solutions that benefit your business and the environment.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="bg-white text-green-dark hover:bg-white/90"
                                    asChild
                                >
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white text-white hover:bg-white/10"
                                    asChild
                                >
                                    <Link href="/quote">Get a Quote</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
