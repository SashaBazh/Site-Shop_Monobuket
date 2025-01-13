// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import HomePage from "./pages/HomePage"; 
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";

// Прочие страницы
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import PaymentDeliveryPage from "./pages/PaymentDeliveryPage/PaymentDeliveryPage";
import ProductDetailPage from "./pages/CatalogPage/ProductDetailPage";
import CartPage from "./pages/Cart/CartPage";

// Админ-панель
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import RequireAdmin from "./pages/AdminPanel/RequireAdmin";

// (Опционально) Страница «нет доступа»
import NotAuthorizedPage from "./pages/NotAuthorizedPage";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#dcc7bd" },
    text: { primary: "#000000" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Публичные страницы */}
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/payment-delivery" element={<PaymentDeliveryPage />} />

              {/* Авторизация / Регистрация */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Приватная страница корзины */}
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                }
              />

              {/* Админ-панель (доступ только админу) */}
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />

              {/* Нет доступа (опционально) */}
              <Route path="/not-authorized" element={<NotAuthorizedPage />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
