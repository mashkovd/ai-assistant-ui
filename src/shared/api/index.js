import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000';

const baseApi = axios.create({
  baseURL,
});

baseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    return config;
  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
}, (error) => Promise.reject(error));

baseApi.interceptors.response.use((response) => response, async (error) => {
  const isError401 = error.response?.status === 401;

  if (isError401) {
    // Logout
    localStorage.removeItem('auth_token');
    window.location.reload();
  }

  return Promise.reject(error);
});

export default baseApi;
