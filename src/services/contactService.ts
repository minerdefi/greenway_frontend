import axios from 'axios';

// Ensure the API URL has the correct structure without trailing slashes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '') : 'http://localhost:8000';

/**
 * Submit a contact form message to the backend
 * @param contactData The form data for the contact message
 */
export async function submitContactMessage(contactData: any) {
    try {
        console.log(`Submitting contact form to: ${API_BASE_URL}/api/contact/submit/`);
        const response = await axios.post(`${API_BASE_URL}/api/contact/submit/`, contactData);
        return response.data;
    } catch (error: any) {
        console.error('Error submitting contact message:', error);
        throw error.response?.data || error.message || 'Failed to send message';
    }
}
