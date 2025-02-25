export interface CartAPIItem {
    product_id: number;
    product_name: string;
    price: number;
    quantity: number;
    product?: {
      media?: string[];
      image?: string;
    };
  }
  
  export interface CartResponse {
    items: CartAPIItem[];
    total_price: number;
  }

  export interface CartItem {
    id: number;
    quantity: number;
    name: string;
    price: number;
    image?: string;
  }

export interface CartItemResponse {
  product_id: number;
  product_name: string;
  product?: {
    media?: string[]; // Исправлено: теперь `media` всегда массив строк
    image?: string;
  };
  price: number;
  quantity: number;
}

export interface CartContextValue {
  cartItems: CartItem[];
  addItem: (productId: number, quantity: number, productDetails: Omit<CartItem, 'id' | 'quantity'>) => void;
  updateItemQty: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  totalPrice: number;
  checkout: (deliveryAddress: string) => Promise<void>;
  clearCart: () => void;
}

