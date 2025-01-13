// Пример массива товаров
export interface ProductType {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string; // Добавляем свойство description
  categories?: string[];
}

export const mockProduct = {
  id: "1",
  name: "Пример продукта",
  price: 500,
  image: "/path/to/image.jpg",
  description: "Описание продукта",
  categories: ["Категория1"],
};

export const PRODUCTS_MOCK: ProductType[] = [
  {
    id: "1",
    name: "Букет #464 французская роза и гвоздика",
    price: 350,
    image: "/src/assets/images/bouquet1.jpg",
    categories: ["Букеты", "Монобукеты"],
  },
  {
    id: "2",
    name: "Большой Букет Пионов",
    price: 1500,
    image: "/src/assets/images/bouquet2.jpg",
    categories: ["Сезонные", "Композиции"],
  },
  {
    id: "3",
    name: "Букет в стаканчике",
    price: 700,
    image: "/src/assets/images/bouquet3.jpg",
    categories: ["Стаканчики с цветами"],
  },
  {
    id: "4",
    name: "Летний букет с подсолнухами",
    price: 900,
    image: "/src/assets/images/bouquet4.jpg",
    categories: ["Букеты", "Сезонные"],
  },
  {
    id: "5",
    name: "Монобукет из роз",
    price: 1200,
    image: "/src/assets/images/bouquet5.jpg",
    categories: ["Монобукеты"],
  },
  {
    id: "6",
    name: "Композиция в коробке",
    price: 1800,
    image: "/src/assets/images/bouquet3.jpg",
    categories: ["Композиции"],
  },
  {
    id: "7",
    name: "Весенний букет с тюльпанами",
    price: 800,
    image: "/src/assets/images/bouquet2.jpg",
    categories: ["Сезонные", "Букеты"],
  },
  {
    id: "8",
    name: "Мини-букет из лаванды",
    price: 450,
    image: "/src/assets/images/bouquet1.jpg",
    categories: ["Букеты"],
  },
  {
    id: "9",
    name: "Букет в кружке",
    price: 600,
    image: "/src/assets/images/bouquet1.jpg",
    categories: ["Стаканчики с цветами"],
  },
  {
    id: "10",
    name: "Романтический букет из роз",
    price: 1400,
    image: "/src/assets/images/bouquet2.jpg",
    categories: ["Букеты", "Монобукеты"],
  },
  {
    id: "11",
    name: "Букет в шляпной коробке",
    price: 2200,
    image: "/src/assets/images/bouquet3.jpg",
    categories: ["Композиции"],
  },
  {
    id: "12",
    name: "Осенний букет с хризантемами",
    price: 950,
    image: "/src/assets/images/bouquet4.jpg",
    categories: ["Сезонные", "Букеты"],
  },
  {
    id: "1",
    name: "Букет #464 французская роза и гвоздика",
    price: 350,
    image: "/src/assets/images/bouquet1.jpg",
    categories: ["Букеты", "Монобукеты"],
  },
  {
    id: "2",
    name: "Большой Букет Пионов",
    price: 1500,
    image: "/src/assets/images/bouquet2.jpg",
    categories: ["Сезонные", "Композиции"],
  },
  {
    id: "3",
    name: "Букет в стаканчике",
    price: 700,
    image: "/src/assets/images/bouquet3.jpg",
    categories: ["Стаканчики с цветами"],
  },
  {
    id: "4",
    name: "Летний букет с подсолнухами",
    price: 900,
    image: "/src/assets/images/bouquet4.jpg",
    categories: ["Букеты", "Сезонные"],
  },
  {
    id: "5",
    name: "Монобукет из роз",
    price: 1200,
    image: "/src/assets/images/bouquet5.jpg",
    categories: ["Монобукеты"],
  },
  {
    id: "6",
    name: "Композиция в коробке",
    price: 1800,
    image: "/src/assets/images/bouquet3.jpg",
    categories: ["Композиции"],
  },
  {
    id: "7",
    name: "Весенний букет с тюльпанами",
    price: 800,
    image: "/src/assets/images/bouquet2.jpg",
    categories: ["Сезонные", "Букеты"],
  },
  {
    id: "8",
    name: "Мини-букет из лаванды",
    price: 450,
    image: "/src/assets/images/bouquet1.jpg",
    categories: ["Букеты"],
  },
  {
    id: "9",
    name: "Букет в кружке",
    price: 600,
    image: "/src/assets/images/bouquet1.jpg",
    categories: ["Стаканчики с цветами"],
  },
  {
    id: "10",
    name: "Романтический букет из роз",
    price: 1400,
    image: "/src/assets/images/bouquet2.jpg",
    categories: ["Букеты", "Монобукеты"],
  },
  {
    id: "11",
    name: "Букет в шляпной коробке",
    price: 2200,
    image: "/src/assets/images/bouquet3.jpg",
    categories: ["Композиции"],
  },
  {
    id: "12",
    name: "Осенний букет с хризантемами",
    price: 950,
    image: "/src/assets/images/bouquet4.jpg",
    categories: ["Сезонные", "Букеты"],
  },
];
