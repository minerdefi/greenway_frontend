"use client";

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

interface LeafletMapProps {
    center: [number, number];
    zoom: number;
    currentLocation: [number, number];
    route?: [number, number][];
    originLocation?: [number, number];
    destinationLocation?: [number, number];
    status: string;
}

export default function LeafletMap({
    center,
    zoom,
    currentLocation,
    route = [],
    originLocation,
    destinationLocation,
    status
}: LeafletMapProps) {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Create map instance if it doesn't exist
        if (!mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                center: center,
                zoom: zoom,
                layers: [
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    })
                ],
                zoomControl: true,
            });
        } else {
            // Update center and zoom if map already exists
            mapRef.current.setView(center, zoom);
        }

        // Clear previous layers except the base tile layer
        const map = mapRef.current;
        map.eachLayer(layer => {
            if (!(layer instanceof L.TileLayer)) {
                map.removeLayer(layer);
            }
        });

        // Add basemap layer if it doesn't exist
        let tileLayerExists = false;
        map.eachLayer(layer => {
            if (layer instanceof L.TileLayer) {
                tileLayerExists = true;
            }
        });

        if (!tileLayerExists) {
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        // Create custom icons
        const originIcon = createCustomIcon('#155D36', 'A', 'Origin');
        const currentIcon = createCustomIcon('#3498db', 'B', 'Current');
        const destIcon = createCustomIcon('#e74c3c', 'C', 'Destination');

        // Collect all points for bounding calculation
        const allPoints: [number, number][] = [];

        // Add origin marker if available
        if (originLocation && isValidCoordinate(originLocation)) {
            allPoints.push(originLocation);
            L.marker(originLocation, { icon: originIcon })
                .addTo(map)
                .bindPopup('<strong>Origin</strong>')
                .bindTooltip('Origin', { permanent: false, direction: 'top' });
        }

        // Add destination marker if available
        if (destinationLocation && isValidCoordinate(destinationLocation)) {
            allPoints.push(destinationLocation);
            L.marker(destinationLocation, { icon: destIcon })
                .addTo(map)
                .bindPopup('<strong>Destination</strong>')
                .bindTooltip('Destination', { permanent: false, direction: 'top' });
        }

        // Add current location marker if valid
        if (currentLocation && isValidCoordinate(currentLocation)) {
            allPoints.push(currentLocation);
            L.marker(currentLocation, { icon: currentIcon })
                .addTo(map)
                .bindPopup(`<strong>Current Location</strong><br>${status === "delivered" ? "Delivered" : "In Transit"}`)
                .bindTooltip('Current Location', { permanent: false, direction: 'top' })
                .openPopup();
        }

        // Add route polyline if there are multiple valid points
        const validRoutePoints = route.filter(isValidCoordinate);
        if (validRoutePoints.length > 1) {
            allPoints.push(...validRoutePoints);

            const polyline = L.polyline(validRoutePoints, {
                color: '#155D36',
                weight: 3,
                opacity: 0.8,
                dashArray: '8, 8',
                lineCap: 'round'
            }).addTo(map);
        }

        // If we have multiple points, fit bounds
        if (allPoints.length > 1) {
            try {
                const bounds = L.latLngBounds(allPoints);
                map.fitBounds(bounds, { padding: [30, 30] });
            } catch (error) {
                console.error("Error setting map bounds:", error);
                // Fallback to center view if bounds fails
                map.setView(center, zoom);
            }
        } else if (allPoints.length === 1) {
            // If only one point, center on it
            map.setView(allPoints[0], zoom);
        } else {
            // Fallback: use provided center and zoom
            map.setView(center, zoom);
        }

        return () => {
            // Cleanup not needed since we're reusing the map instance
        };
    }, [center, zoom, currentLocation, route, originLocation, destinationLocation, status]);

    // Function to create a custom marker icon
    function createCustomIcon(color: string, letter: string, title: string) {
        return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 0 5px rgba(0,0,0,0.3); font-size: 12px;" title="${title}">${letter}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });
    }

    // Validate coordinates to avoid map errors
    function isValidCoordinate(coord: [number, number]): boolean {
        return Array.isArray(coord) &&
            coord.length === 2 &&
            !isNaN(coord[0]) &&
            !isNaN(coord[1]) &&
            coord[0] >= -90 && coord[0] <= 90 &&
            coord[1] >= -180 && coord[1] <= 180;
    }

    return <div ref={mapContainerRef} className="h-full w-full" />;
}
