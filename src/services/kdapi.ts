// src/services/apiService.js
import axios from "axios";

const API_BASE_URL = "/api/v1/kd";
// replace with your backend URL

// Create axios instance with default headers
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token automatically (you can store token in localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
