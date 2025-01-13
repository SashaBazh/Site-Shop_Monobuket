// src/api/authAPI.ts

import axiosInstance from "./axiosInstance";

interface LoginPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string; // "bearer"
}

/**
 * Логин: вызывает POST /auth
 * @param payload { email, password }
 * @returns { access_token, refresh_token, token_type }
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await axiosInstance.post<AuthResponse>("/auth", payload);
  return res.data;
}

/**
 * Регистрация: вызывает POST /register
 * @param payload { name, email, password }
 * @returns { access_token, refresh_token, token_type }
 */
export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await axiosInstance.post<AuthResponse>("/register", payload);
  return res.data;
}

/** Получаем профиль пользователя ( /user/profile ) */
export async function getUserProfile(): Promise<any> {
  // Бэк должен вернуть { role_id: number, user_id: number, ... }
  const res = await axiosInstance.get("/user/profile");
  return res.data;
}
