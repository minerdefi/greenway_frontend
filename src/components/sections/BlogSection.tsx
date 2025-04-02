"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// Sample blog post data with author avatars
const blogPosts = [
    {
        id: "sustainable-logistics",
        title: "5 Ways We're Making Logistics More Sustainable",
        excerpt: "Discover how Greenway is revolutionizing the logistics industry with eco-friendly practices and innovative solutions.",
        image: "/images/blog/sustainable-logistics.jpg",
        date: "May 15, 2023",
        category: "Sustainability",
        author: "Emma Elsen",
        authorRole: "Head of Sustainability",
        authorAvatar: "/images/avatars/emma-green.jpg"
    },
    {
        id: "supply-chain-innovation",
        title: "Supply Chain Innovations for 2023 and Beyond",
        excerpt: "Learn about cutting-edge technologies and methodologies that are transforming global supply chains.",
        image: "/images/blog/supply-chain.jpg",
        date: "June 2, 2023",
        category: "Innovation",
        author: "Michael Chen",
        authorRole: "Chief Technology Officer",
        authorAvatar: "/images/avatars/michael-chen.jpg"
    },
    {
        id: "carbon-neutral-shipping",
        title: "Our Journey to Carbon-Neutral Shipping",
        excerpt: "How we've reduced our carbon footprint by 75% and our roadmap to complete carbon neutrality by 2025.",
        image: "/images/blog/carbon-neutral.jpg",
        date: "April 10, 2023",
        category: "Environment",
        author: "Sarah Johnson",
        authorRole: "Environmental Director",
        authorAvatar: "/images/avatars/sarah-johnson.jpg"
    }
];

// Create a client component for blog post image with error handling
const BlogImage = ({ post }: { post: any }) => {
    const [imgSrc, setImgSrc] = useState(post.image);

    return (
        <div className="relative h-48 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-gray-900/0 z-10"></div>
            <Image
                src={imgSrc}
                alt={post.title}
                fill
                className="object-cover"
                onError={() => setImgSrc(`/images/blog/placeholder.jpg`)}
            />
            <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-dark/70 text-white backdrop-blur-sm">
                    {post.category}
                </span>
            </div>
        </div>
    );
};

// Enhanced AuthorAvatar component with better fallback handling
const AuthorAvatar = ({ author }: { author: any }) => {
    const [avatarError, setAvatarError] = useState(false);
    const [avatarReady, setAvatarReady] = useState(false);

    // Get initials for fallback
    const initials = author.author
        .split(' ')
        .map((n: string) => n[0])
        .join('');

    if (avatarError) {
        return (
            <div className="h-8 w-8 rounded-full bg-green-medium/20 flex items-center justify-center text-green-medium text-xs font-medium">
                {initials}
            </div>
        );
    }

    return (
        <div className={cn(
            "relative h-8 w-8 rounded-full overflow-hidden",
            !avatarReady && "bg-gray-200 animate-pulse"
        )}>
            <Image
                src={author.authorAvatar}
                alt={author.author}
                fill
                sizes="32px"
                priority
                className={cn(
                    "object-cover transition-opacity duration-300",
                    avatarReady ? "opacity-100" : "opacity-0"
                )}
                onError={() => setAvatarError(true)}
                onLoad={() => setAvatarReady(true)}
            />
        </div>
    );
};

export default function BlogSection() {
    // Ensure avatars are pre-loaded correctly
    useEffect(() => {
        blogPosts.forEach(post => {
            const img = new window.Image();
            img.src = post.authorAvatar;
        });
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15
            }
        }
    };

    return (
        <section
            className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white"
            style={{
                background: 'linear-gradient(135deg, #0A3622 0%, #155D36 50%, #0A3622 100%)',
            }}
        >
            {/* Background grid pattern - larger grid size, no dots */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                    backgroundSize: "80px 80px" // Increased from 40px to 80px
                }}></div>
            </div>

            {/* Background accent elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3">
                        <span className="h-2 w-2 rounded-full bg-green-light mr-2"></span>
                        <span className="text-sm text-white font-medium">Latest Updates</span>
                    </div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        News & <span className="text-green-light">Insights</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="max-w-2xl mx-auto text-white/80 text-lg"
                    >
                        Stay informed about the latest trends in sustainable logistics and company announcements
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={index}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                                <BlogImage post={post} />

                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <Icons.clock className="h-4 w-4 mr-1" />
                                        <span>{post.date}</span>
                                    </div>

                                    <h3 className="font-bold text-gray-900  text-xl mb-2 line-clamp-2 text-charcoal group-hover:text-green-medium">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center">
                                            <AuthorAvatar author={post} />
                                            <div className="ml-2">
                                                <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                                <p className="text-xs text-gray-500">{post.authorRole}</p>
                                            </div>
                                        </div>

                                        <Button
                                            asChild
                                            variant="ghost"
                                            className="p-0 hover:bg-transparent text-green-medium hover:text-green-dark"
                                        >
                                            <Link href={`/blog/${post.id}`} className="flex items-center">
                                                Read
                                                <Icons.chevronRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-white hover:border-white hover:bg-white/10 text-white"
                        asChild
                    >
                        <Link href="/blog">
                            View All Articles
                            <Icons.chevronRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
