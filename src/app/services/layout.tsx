import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services - Greenway Logistics",
    description: "Explore our comprehensive range of eco-friendly logistics and shipping services",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col">
            {children}
        </div>
    );
}
