// src/api/axiosInstance.ts
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { BASE_URL } from './config';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Определение типа для элементов очереди
interface QueueItem {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}

// Флаг, чтобы избежать бесконечных циклов обновления токена
let isRefreshing = false;
// Очередь запросов, ожидающих обновления токена
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Интерцептор запросов
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Интерцептор ответов
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Если ошибка 401 и это не запрос на обновление токена и запрос еще не повторялся
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        originalRequest.url && !originalRequest.url.includes('/token/refresh')) {
      
      if (isRefreshing) {
        // Если токен уже обновляется, добавим запрос в очередь
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers && token) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        
        const response = await axios.post(`${BASE_URL}/token/refresh`, { 
          refresh_token: refreshToken 
        });
        
        const { access_token, refresh_token } = response.data;
        
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        
        // Обновляем заголовок авторизации для текущего запроса
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        }
        
        // Обрабатываем очередь запросов
        processQueue(null, access_token);
        isRefreshing = false;
        
        // Повторяем изначальный запрос с новым токеном
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Если обновление токена не удалось, очищаем localStorage и отклоняем все запросы
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        
        processQueue(refreshError instanceof Error ? refreshError : new Error('Failed to refresh token'), null);
        isRefreshing = false;
        
        // Можно также перенаправить на страницу логина
        // window.location.href = '/admin/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;