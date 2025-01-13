// src/api/axiosInstance.ts

import axios from "axios";

// Бэкенд на http://localhost:8000
// Если ваш бэкенд на другом URL, меняйте тут
const BASE_URL = "https://course.excellentjewellery.ru/flowers/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      // Bearer <access_token>
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Если нужно — тут обрабатываем 401, refresh и т.д.
    return Promise.reject(error);
  }
);

export default axiosInstance;
