// src/context/CartContext.tsx

import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  addToCart as apiAddToCart,
  removeFromCart,
  updateCartQuantity,
  createOrder,
} from "../api/cartAPI";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  totalPrice: number;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  addToCart: (product: { id: number }) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateItemQty: (productId: number, quantity: number) => Promise<void>;
  checkout: (deliveryAddress: string) => Promise<any>;
}

export const CartContext = createContext<CartContextValue>({} as CartContextValue);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Запрашиваем корзину с сервера
  async function fetchCart() {
    if (!isAuthenticated) {
      setCartItems([]);
      setTotalPrice(0);
      return;
    }
    try {
      const data = await getCart(); // Структура: { items, total_price }
      // Адаптируем данные
      const adapted: CartItem[] = data.items.map((item: any) => ({
        id: item.product_id,
        name: item.product_name,
        // Предполагаем, что изображения хранятся в product.media[0] или product.image
        image: item.product?.media?.[0] || item.product?.image || "",
        price: item.price,
        quantity: item.quantity,
      }));

      setCartItems(adapted);

      // Пересчитываем totalPrice на фронтенде
      const computedTotal = adapted.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
      setTotalPrice(computedTotal);
    } catch (err) {
      console.error("Ошибка при получении корзины:", err);
      setCartItems([]);
      setTotalPrice(0);
    }
  }

  // При логине/логауте обновляем корзину
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalPrice(0);
    }
  }, [isAuthenticated]);

  // Добавить товар (productId, quantity)
  async function addItem(productId: number, quantity: number) {
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }
    try {
      await apiAddToCart(productId, quantity);
      await fetchCart();
    } catch (err) {
      console.error("Ошибка при добавлении товара:", err);
    }
  }

  // Упрощённый метод для onBuyClick
  async function addToCart(product: { id: number }) {
    await addItem(product.id, 1);
  }

  // Удалить товар
  async function removeItem(productId: number) {
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }
    try {
      await removeFromCart(productId);
      await fetchCart();
    } catch (err) {
      console.error("Ошибка при удалении товара:", err);
    }
  }

  // Обновить количество
  async function updateItemQty(productId: number, quantity: number) {
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }
    try {
      await updateCartQuantity(productId, quantity);
      await fetchCart();
    } catch (err) {
      console.error("Ошибка при обновлении количества:", err);
    }
  }

  // Оформить заказ
  async function checkout(deliveryAddress: string) {
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }
    try {
      const res = await createOrder(deliveryAddress);
      await fetchCart();
      return res;
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
      throw err;
    }
  }

  const value: CartContextValue = {
    cartItems,
    totalPrice,
    fetchCart,
    addItem,
    addToCart,
    removeItem,
    updateItemQty,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
