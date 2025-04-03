import axios from 'axios';

// Ensure the API URL has the correct structure without trailing slashes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '') : 'http://localhost:8000';

/**
 * Track a shipment using its tracking number
 * @param trackingNumber The tracking number to look up
 */
export async function trackShipment(trackingNumber: string) {
    try {
        console.log(`Tracking shipment at: ${API_BASE_URL}/api/tracking/?tracking=${trackingNumber}`);
        const response = await axios.get(`${API_BASE_URL}/api/tracking/`, {
            params: { tracking: trackingNumber }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error tracking shipment:', error);
        throw error.response?.data || error.message || 'Failed to track shipment';
    }
}

/**
 * Add a new tracking event to a shipment
 * @param trackingNumber The shipment's tracking number
 * @param eventData The event data to add
 */
export async function addTrackingEvent(trackingNumber: string, eventData: any) {
    try {
        console.log(`Adding tracking event at: ${API_BASE_URL}/api/tracking/event/`);
        const response = await axios.post(`${API_BASE_URL}/api/tracking/event/`, {
            tracking_number: trackingNumber,
            event: eventData
        });
        return response.data;
    } catch (error: any) {
        console.error('Error adding tracking event:', error);
        throw error.response?.data || error.message || 'Failed to add tracking event';
    }
}
