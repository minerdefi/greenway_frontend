"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// MapHub type definition
export type MapHub = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    type: string;
};

// MapProps interface
interface MapProps {
    className?: string;
    height?: string;
    hubs?: MapHub[];
    zoom?: number;
    center?: [number, number]; // [latitude, longitude]
}

// Dynamic imports for Leaflet in client component
export default function Map({
    className,
    height = "500px",
    hubs = [],
    zoom = 2,
    center = [20, 0]
}: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapInitializedRef = useRef(false);

    // Lazy load Leaflet on client
    useEffect(() => {
        // Only run initialization once
        if (mapInitializedRef.current) return;

        // Add a unique ID to the map container to avoid initialization conflicts
        const mapId = `map-${Math.random().toString(36).substring(2, 9)}`;
        if (mapRef.current) {
            mapRef.current.id = mapId;
        }

        const initMap = async () => {
            try {
                // Dynamically import Leaflet
                const L = (await import('leaflet')).default;

                // Import CSS using link tag if it doesn't exist yet
                if (!document.querySelector('link[href*="leaflet.css"]')) {
                    const linkElement = document.createElement('link');
                    linkElement.rel = 'stylesheet';
                    linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                    linkElement.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
                    linkElement.crossOrigin = '';
                    document.head.appendChild(linkElement);
                }

                // Make sure we have the map container
                if (!mapRef.current) return;

                // Add a short delay to ensure DOM is ready
                setTimeout(() => {
                    if (!mapRef.current) return;

                    // Cleanup any existing map on the container
                    if (mapInstanceRef.current) {
                        mapInstanceRef.current.remove();
                        mapInstanceRef.current = null;
                    }

                    // Create a new map instance with the unique ID
                    try {
                        const map = L.map(mapRef.current, {
                            zoomControl: true,
                            attributionControl: false
                        }).setView(center, zoom);

                        mapInstanceRef.current = map;
                        mapInitializedRef.current = true;

                        // Add OpenStreetMap tile layer
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                        }).addTo(map);

                        // Add continent labels
                        hubs.forEach(hub => {
                            // Create a custom divIcon for text labels
                            const continentIcon = L.divIcon({
                                className: 'continent-label',
                                html: `<div style="
                                    background-color: rgba(10, 54, 34, 0.7);
                                    color: white;
                                    padding: 5px 10px;
                                    border-radius: 4px;
                                    font-weight: bold;
                                    white-space: nowrap;
                                    font-family: sans-serif;
                                    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                                ">${hub.name}</div>`,
                                iconSize: [100, 40],
                                iconAnchor: [50, 20]
                            });

                            // Create a marker with the divIcon
                            L.marker([hub.lat, hub.lng], { icon: continentIcon }).addTo(map);
                        });

                        // Add shipping route lines between hubs
                        if (hubs.length > 1) {
                            const points = hubs.map(hub => [hub.lat, hub.lng]);
                            L.polyline(points as [number, number][], {
                                color: '#0A3622',
                                dashArray: '5, 10',
                                weight: 2,
                                opacity: 0.7
                            }).addTo(map);
                        }

                        // Add subtle dots for hub locations
                        hubs.forEach(hub => {
                            L.circleMarker([hub.lat, hub.lng], {
                                radius: 4,
                                fillColor: '#0A3622',
                                color: '#ffffff',
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                            }).addTo(map);
                        });

                        setMapLoaded(true);
                    } catch (error) {
                        console.error('Error creating map instance:', error);
                    }
                }, 100);
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        };

        initMap();

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                try {
                    mapInstanceRef.current.remove();
                    mapInstanceRef.current = null;
                    mapInitializedRef.current = false;
                } catch (error) {
                    console.error('Error cleaning up map:', error);
                }
            }
        };
    }, []); // Empty dependency array to ensure initialization runs only once

    return (
        <div
            ref={mapRef}
            className={cn("relative rounded-lg overflow-hidden border border-gray-200", className)}
            style={{
                height,
                width: '100%',
                zIndex: 1
            }}
        >
            {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-gray-500">Loading map...</div>
                </div>
            )}
        </div>
    );
}
