// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser, getUserProfile } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

interface UserProfile {
  user_id: number;
  role_id: number; // 2 => админ
  name?: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isAdmin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh_token")
  );
  const [user, setUser] = useState<UserProfile | null>(null);

  const navigate = useNavigate();

  const isAuthenticated = !!accessToken;
  const isAdmin = user?.role_id === 2; // Проверяем, есть ли роль «админ»

  // При загрузке читаем токены из localStorage
  useEffect(() => {
    const storedAccess = localStorage.getItem("access_token");
    const storedRefresh = localStorage.getItem("refresh_token");
    if (storedAccess) setAccessToken(storedAccess);
    if (storedRefresh) setRefreshToken(storedRefresh);
  }, []);

  // Если есть токен, но нет user, то загружаем профиль
  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUserProfile().catch((err) => console.error(err));
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  /** Загрузить профиль текущего пользователя */
  async function fetchUserProfile() {
    try {
      if (!accessToken) return;
      // Устанавливаем заголовок авторизации (если нужно)
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      const profile = await getUserProfile();
      setUser(profile);
    } catch (err) {
      console.error("Ошибка при получении профиля:", err);
      logout();
    }
  }

  /** Логин */
  async function login(email: string, password: string) {
    try {
      const data = await loginUser({ email, password });
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // Устанавливаем заголовок для запросов
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;

      await fetchUserProfile(); // После логина получаем профиль
      navigate("/"); // Переход на главную
    } catch (error) {
      console.error("Ошибка при логине:", error);
      throw error;
    }
  }

  /** Регистрация */
  async function register(name: string, email: string, password: string) {
    try {
      const data = await registerUser({ name, email, password });
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;

      await fetchUserProfile();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      throw error;
    }
  }

  /** Выход */
  function logout() {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    delete axiosInstance.defaults.headers.common["Authorization"];

    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        accessToken,
        refreshToken,
        user,
        login,
        register,
        logout,
        fetchUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
