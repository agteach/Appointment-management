import axios from "axios";
import useAuthStore from "../store/authStore";

const normalizeApiBaseUrl = (value) => {
    const trimmed = value.trim().replace(/\/+$/, "");

    if (!trimmed) {
        return "/api";
    }

    return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

const resolveApiBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;

    if (envUrl) {
        return normalizeApiBaseUrl(envUrl);
    }

    if (typeof window === "undefined") {
        return "/api";
    }

    const hostname = window.location.hostname;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

    return isLocalhost ? "http://localhost:5000/api" : "/api";
};

const api = axios.create({
    baseURL: resolveApiBaseUrl(),
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
