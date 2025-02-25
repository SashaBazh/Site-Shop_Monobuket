export interface ProductType {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;   // Абсолютный путь к изображению на сервере
    media?: string[]; // Массив путей к изображениям
    category_id?: number;
  }
  