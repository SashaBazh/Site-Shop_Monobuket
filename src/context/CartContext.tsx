import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import Cookies from 'js-cookie';
import { CartItem, CartContextValue } from "../types/Cart.types";
import axiosInstance from "../api/axiosInstance";

const CART_COOKIE_NAME = "shopping_cart";
const CART_EXPIRY_DAYS = 7;

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart должен быть использован внутри CartProvider");
  }
  return context;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    loadCartFromCookies();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems, calculateTotalPrice]);

  const loadCartFromCookies = () => {
    try {
      const savedCart = Cookies.get(CART_COOKIE_NAME);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch {
      Cookies.remove(CART_COOKIE_NAME);
    }
  };

  const saveCartToCookies = (items: CartItem[]) => {
    try {
      Cookies.set(CART_COOKIE_NAME, JSON.stringify(items), { expires: CART_EXPIRY_DAYS });
    } catch { /* empty */ }
  };

  const addItem = (
    productId: number, 
    quantity: number, 
    productDetails: Omit<CartItem, 'id' | 'quantity'>
  ) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item.id === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prev, { 
          id: productId, 
          quantity,
          ...productDetails
        }];
      }

      saveCartToCookies(updatedCart);
      return updatedCart;
    });
  };

  const updateItemQty = (productId: number, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCartToCookies(updatedCart);
      return updatedCart;
    });
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== productId);
      saveCartToCookies(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    Cookies.remove(CART_COOKIE_NAME);
  };

  const checkout = async (deliveryAddress: string) => {
    try {
      await axiosInstance.post('/orders', {
        items: cartItems,
        deliveryAddress,
        totalAmount: totalPrice
      });
      clearCart();
    } catch {
      throw new Error('Ошибка при оформлении заказа');
    }
  };

  const value: CartContextValue = {
    cartItems,
    addItem,
    updateItemQty,
    removeItem,
    totalPrice,
    checkout,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
