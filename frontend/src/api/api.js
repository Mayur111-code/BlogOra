import axios from "axios";

// Base URL define karein (Environment variables use karna best practice hai)
export const BASE_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor: Taaki har request mein token automatic chala jaye
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Aapke backend ke hisaab se header key 'token' rakhi hai
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;