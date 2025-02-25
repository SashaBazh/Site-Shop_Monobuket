export interface Address {
    street: string;
    house: string;
    apartment: string;
    city: string;
  }
  
  export interface FormData {
    sender_name: string;
    sender_phone: string;
    email: string;
    delivery_type: "pickup" | "delivery";
    delivery_address: string;
    pickup_address: string | null;
    room: string;
    floor: string;
    receiver_name: string;
    receiver_phone: string;
    comment: string;
    payment_method: "cash" | "webpay";
  }
  
  export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }
  
  export interface OrderDetails {
    items: CartItem[];
    deliveryInfo: string;
  }

  interface AddProduct {
    product_id: number;
    quantity: number;
    // Добавляем опциональное поле price, которое бэкенд может игнорировать
    price?: number;
  }
  
  export interface OrderCreateRequest {
    delivery_address: string | null;
    pickup_address: string | null;
    payment_method: "cash" | "webpay";
    sender_name: string;
    receiver_name: string | null;
    email: string | null;
    sender_phone: string;
    receiver_phone: string | null;
    room: number | null;
    floor: number | null;
    comment: string | null;
    items: AddProduct[];
  }
  
  export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }