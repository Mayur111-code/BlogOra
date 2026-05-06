import axios from "axios";

export const BASE_URL = "https://blogora-q83s.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 402 || status === 403) {
      if (typeof onUnauthorized === "function") {
        onUnauthorized(status);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
