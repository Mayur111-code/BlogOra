import axios from "axios";

export const BASE_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Backend ke 'isAuthenticated' middleware ke hisaab se format set kiya:
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;