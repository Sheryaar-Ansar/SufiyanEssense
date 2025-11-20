// src/services/api.js
import axios from 'axios';

// Create a single Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  withCredentials: true
});

// Optionally, add interceptors (auth, error handling, etc.)
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
api.interceptors.request.use(config => {
  const fullUrl =
    config.baseURL +
    config.url +
    (config.params ? `?${new URLSearchParams(config.params)}` : "");

  console.log("🔥 FULL REQUEST URL:", fullUrl);

  return config;
});


export default api;
