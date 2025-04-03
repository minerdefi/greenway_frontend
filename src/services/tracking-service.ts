/**
 * Service for tracking-related API calls
 */

// Base API URL - Set this based on your Django development server
const API_BASE_URL = 'greenwaylogst.pythonanywhere.com' + '/api' || 'http://localhost:8000/api';

export interface TrackingResponse {
    shipment: any;
    error?: string;
}

/**
 * Get tracking information for a shipment
 * @param trackingNumber The tracking number to search for
 * @returns Tracking information or error
 */
export async function getTrackingInfo(trackingNumber: string): Promise<TrackingResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/tracking/?tracking=${encodeURIComponent(trackingNumber)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                shipment: null,
                error: data.error || 'Failed to retrieve tracking information'
            };
        }

        return { shipment: data.shipment };
    } catch (error) {
        console.error('Error fetching tracking data:', error);
        return {
            shipment: null,
            error: 'An unexpected error occurred. Please try again.'
        };
    }
}

/**
 * Add a tracking event to a shipment (for admin use)
 * @param trackingNumber The tracking number to update
 * @param event The event to add
 * @returns Updated shipment data or error
 */
export async function addTrackingEvent(trackingNumber: string, event: any): Promise<TrackingResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/tracking/event/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tracking_number: trackingNumber, event }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                shipment: null,
                error: data.error || 'Failed to update tracking information'
            };
        }

        return { shipment: data.shipment };
    } catch (error) {
        console.error('Error updating tracking data:', error);
        return {
            shipment: null,
            error: 'An unexpected error occurred. Please try again.'
        };
    }
}
