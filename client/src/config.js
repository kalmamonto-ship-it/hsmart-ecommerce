// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || '';

// Helper function untuk membuat API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

