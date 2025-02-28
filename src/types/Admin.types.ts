export interface Category {
  id: number;
  name: string;
}

export interface Product {
  media: File[];
  id: number;
  name: string;  // Заменено с title на name для соответствия с базой данных
  price: number;
  description: string;
  category_id: number;  // Это поле теперь имеет название category_id, как в модели
  image_url?: string;  // Добавляем поле для URL изображения, которое будет хранить картинку
}

export interface CategoryFormData {
  name: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category_id: string;
  media: File[]; // Добавьте это поле для хранения изображений
}

export interface ProductUpdateData {
  id: number | null;
  name: string;
  price: string;
  description: string;
  category_id: string;
  media: File[];
}

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  DELIVERY = "delivery",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface Order {
  id: number;
  sender_name: string;
  email: string | null;
  total_price: number;
  items: { product: { name: string } }[];
  created_at: string;
  pickup_address: string | null;
  delivery_address: string | null;
  status: OrderStatus;
}
