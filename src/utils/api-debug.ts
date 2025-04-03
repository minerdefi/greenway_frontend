/**
 * Utility to help debug API connectivity in production environments
 */

export function checkApiConnection() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://greenwaylogst.pythonanywhere.com';

    console.log('Environment:', process.env.NODE_ENV);
    console.log('API URL from env:', process.env.NEXT_PUBLIC_API_URL);
    console.log('Normalized API URL:', apiUrl);

    // Test connection with a simple request
    return fetch(`${apiUrl}/api/health-check/`)
        .then(response => {
            console.log('API health check response status:', response.status);
            return response.ok;
        })
        .catch(error => {
            console.error('API health check error:', error);
            return false;
        });
}
