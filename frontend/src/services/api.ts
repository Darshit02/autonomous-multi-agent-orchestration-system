import axios from "axios";
import { useAppStore } from "../store/useAppStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = useAppStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAppStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);