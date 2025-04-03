import axios from 'axios';

// Ensure the API URL has the correct structure without trailing slashes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '') : 'http://localhost:8000';

/**
 * Submit a new quote request to the backend
 * @param quoteData The form data for the quote request
 */
export async function submitQuote(quoteData: any) {
    try {
        console.log(`Submitting quote to: ${API_BASE_URL}/api/quotes/submit/`);
        const response = await axios.post(`${API_BASE_URL}/api/quotes/submit/`, quoteData);
        return response.data;
    } catch (error: any) {
        console.error('Error submitting quote:', error);
        throw error.response?.data || error.message || 'Failed to submit quote';
    }
}

/**
 * Get the status of an existing quote by its ID
 * @param quoteId The ID of the quote to check
 */
export async function getQuoteStatus(quoteId: string) {
    try {
        console.log(`Getting quote status from: ${API_BASE_URL}/api/quotes/${quoteId}/`);
        const response = await axios.get(`${API_BASE_URL}/api/quotes/${quoteId}/`);
        return response.data;
    } catch (error: any) {
        console.error('Error retrieving quote status:', error);
        throw error.response?.data || error.message || 'Failed to retrieve quote status';
    }
}
