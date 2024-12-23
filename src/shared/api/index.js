import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000';

const baseApi = axios.create({
  baseURL,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default baseApi;
