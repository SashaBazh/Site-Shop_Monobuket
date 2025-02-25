export interface TopSellersCardProps {
    img: string; // Полный URL к изображению
    desc: string; // Описание товара
    price: string; // Цена товара
    onCardClick: () => void; // Клик по карточке
    onBuyClick: () => void; // Кнопка "Купить"
  }
  