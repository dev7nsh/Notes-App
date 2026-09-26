import axios from "axios";

export const getBaseURL = () => {
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    if (typeof window !== "undefined" && window.location) {
        return `${window.location.protocol}//${window.location.hostname}:8086`;
    }
    return "http://localhost:8086";
};

const API = axios.create();

API.interceptors.request.use((config) => {
    config.baseURL = getBaseURL();
    return config;
});

const baseURL = getBaseURL();

export { axios, API, baseURL };