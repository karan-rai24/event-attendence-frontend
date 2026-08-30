import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(handler: () => void) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    if (error.response?.status === 401 && !url.includes("/auth/me")) {
      onUnauthorized?.();
    }
    return Promise.reject(error);
  }
);

export default api;
