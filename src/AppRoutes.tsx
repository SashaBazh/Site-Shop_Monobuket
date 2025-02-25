// src/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import PaymentDeliveryPage from "./pages/PaymentDeliveryPage/PaymentDeliveryPage";
import ProductDetailPage from "./components/ProductDetail/ProductDetailPage";
import CartPage from "./pages/Cart/CartPage";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/payment-delivery" element={<PaymentDeliveryPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
    </Routes>
  );
};