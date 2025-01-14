// src/api/cartAPI.ts

import axiosInstance from "./axiosInstance";

interface CartAPIItem {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  product?: {
    media?: string[];
    image?: string;
  };
}

interface CartResponse {
  items: CartAPIItem[];
  total_price: number;
}

// Получить корзину
export async function getCart(): Promise<CartResponse> {
  const res = await axiosInstance.get<CartResponse>("/cart");
  return res.data;
}

// Добавить товар в корзину
export async function addToCart(product_id: number, quantity: number) {
  await axiosInstance.post("/cart/", { product_id, quantity });
}

// Удалить товар из корзины
export async function removeFromCart(product_id: number) {
  await axiosInstance.delete("/cart/", { params: { product_id } });
}

// Обновить количество товара в корзине
export async function updateCartQuantity(product_id: number, quantity: number) {
  await axiosInstance.put("/cart/", { product_id, quantity });
}

// Оформить заказ
export async function createOrder(delivery_address: string) {
  const res = await axiosInstance.post("/cart/order", { delivery_address });
  return res.data;
}
