"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackShipment } from "@/services/trackingService";

export function TrackingForm({ onResultReceived }: { onResultReceived: (data: any) => void }) {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!trackingNumber || trackingNumber.trim() === "") {
            setError("Please enter a tracking number");
            setIsLoading(false);
            return;
        }

        try {
            const result = await trackShipment(trackingNumber.trim());
            if (result.shipment) {
                onResultReceived(result.shipment);
            } else {
                setError(result.error || "Unable to track shipment. Please try again.");
            }
        } catch (err: any) {
            console.error("Tracking error:", err);
            setError(typeof err === 'string' ? err : err.message || "No shipment found with this tracking number.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow">
                    <Input
                        type="text"
                        placeholder="Enter tracking number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent"
                    />
                    {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="bg-green-dark hover:bg-green-medium text-white font-semibold transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Tracking...
                        </div>
                    ) : "Track Shipment"}
                </Button>
            </div>
        </form>
    );
}
