import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { refreshAccessToken } from "../api/userAPI";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch {
        try {
          await refreshAccessToken();
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="loading">Проверка авторизации...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
