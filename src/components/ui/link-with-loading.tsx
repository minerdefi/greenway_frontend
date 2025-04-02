"use client";

import Link, { LinkProps } from "next/link";
import { useLoading } from "@/contexts/loading-context";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface LinkWithLoadingProps extends LinkProps {
    children: ReactNode;
    className?: string;
    showLoader?: boolean;
}

export function LinkWithLoading({
    children,
    className,
    showLoader = true,
    ...props
}: LinkWithLoadingProps) {
    const { startLoading } = useLoading();
    const router = useRouter();

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (showLoader) {
            e.preventDefault();
            startLoading();

            // Short delay to ensure loader appears
            setTimeout(() => {
                router.push(props.href.toString());
            }, 100);
        }
    }, [props.href, router, showLoader, startLoading]);

    return (
        <Link
            className={className}
            onClick={showLoader ? handleClick : undefined}
            {...props}
        >
            {children}
        </Link>
    );
}
