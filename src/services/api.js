import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // 👈 cambia esto si tu backend corre en otro puerto
});

// Interceptor para añadir token en cada request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
