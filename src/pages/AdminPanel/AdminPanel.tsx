// src/pages/AdminPanel/AdminPanel.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import axiosInstance from "../../api/axiosInstance";
// Или adminAPI.ts, если есть

export default function AdminPanel() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [someData, setSomeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // если пользователь не админ, перенаправляем
    if (!isAuthenticated || !isAdmin) {
      navigate("/"); // или показываем ошибку
      return;
    }
    // Иначе грузим данные для админки
    (async () => {
      try {
        setLoading(true);
        // запрос на /products?limit=... (пример)
        const res = await axiosInstance.get("/products/category/0?limit=100");
        setSomeData(res.data);
      } catch (err: any) {
        setError("Ошибка при загрузке админ-данных");
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated, isAdmin, navigate]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Админ-панель</h1>
      <hr />
      <AdminDashboard data={someData} />
    </div>
  );
}
