// The backend is running on port 5000, and this React app is served on 3000.
// In a production Docker environment, they are on the same network.
// For local development, the browser will make a cross-origin request.
// We configure the API_URL to point to the backend server.
const API_URL = 'http://localhost:5000/api';

export const emailService = {
  getEmails: async ({ account = 'all', folder = 'inbox', page = 1, limit = 50 }) => {
    const response = await fetch(`${API_URL}/emails?account=${account}&folder=${folder}&page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  
  searchEmails: async (query) => {
    if(!query) return [];
    const response = await fetch(`${API_URL}/emails/search?q=${encodeURIComponent(query)}`);
    if(!response.ok) {
        throw new Error('Search request failed');
    }
    return response.json();
  }
};
