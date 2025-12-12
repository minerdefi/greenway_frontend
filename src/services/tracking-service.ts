import trackingData from '@/data/trackingData.json';

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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const shipment = trackingData.find(
            (item: any) => item.trackingNumber.toLowerCase() === trackingNumber.toLowerCase()
        );

        if (!shipment) {
            return {
                shipment: null,
                error: 'No shipment found with this tracking number'
            };
        }

        return { shipment };
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
    // This is a mock implementation since we can't write to the JSON file in the browser/client
    console.log('Mock adding event:', trackingNumber, event);
    return {
        shipment: null,
        error: 'Update functionality is not available in demo mode'
    };
}
