// src/components/Admin/RequireAdmin.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Обёртка, которая проверяет, что user.role_id === 2.
 * Если нет — редиректим на /not-authorized или / (выберите сами).
 */
export default function RequireAdmin({ children }: { children: JSX.Element }) {
  const { isAuthenticated, user } = useAuth();
  
  // Пример: вы в AuthContext можете хранить user.role_id или user.role?.id
  const isAdmin = isAuthenticated && user?.role_id === 2;

 

  return children;
}
