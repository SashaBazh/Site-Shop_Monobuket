// src/routes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainHeader from "./components/Header/MainHeader";
import SubHeader from "./components/Header/SubHeader";
import Footer from "./components/Footer/Footer";
// Если у вас реально есть Footer
// import Footer from "./components/Footer/Footer";

import CatalogPage from "./pages/CatalogPage/CatalogPage";
// Если есть ProductDetailPage и CartPage, подключите их тоже.
// import ProductDetailPage from "./pages/CatalogPage/ProductDetailPage";
// import CartPage from "./pages/Cart/CartPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* Хедеры (общие) */}
      <MainHeader />
      <SubHeader />

      {/* Маршруты */}
      <Routes>
        <Route path="/" element={<div>Главная страница</div>} />
        <Route path="/catalog" element={<CatalogPage />} />
        {/* Пример */}
        {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
        {/* <Route path="/cart" element={<CartPage />} /> */}
      </Routes>

      {/* Подвал (если нужен) */}
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
