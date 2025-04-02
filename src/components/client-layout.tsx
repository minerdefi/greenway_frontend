"use client";

import { Navbar } from "@/components/ui/navbar";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/ui/loader";
import { LoadingProvider } from "@/contexts/loading-context";

export function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [initialLoading, setInitialLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LoadingProvider>
            <AnimatePresence mode="wait">
                {initialLoading ? (
                    <Loader key="initial-loader" duration={2000} onLoadingComplete={() => setInitialLoading(false)} />
                ) : pageLoading ? (
                    <Loader key="page-loader" duration={1000} showText={false} className="bg-white/90 backdrop-blur-sm" />
                ) : null}
            </AnimatePresence>
            {!initialLoading && (
                <>
                    <Navbar />
                    <main className="w-full">
                        {children}
                    </main>
                </>
            )}
        </LoadingProvider>
    );
}
