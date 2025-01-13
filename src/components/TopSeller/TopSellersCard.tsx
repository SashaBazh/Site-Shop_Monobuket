// src/components/TopSeller/TopSellersCard.tsx

import React from "react";
import {
  CardContainer,
  Image,
  Description,
  Price,
  BuyButton,
  CardBottom,
} from "./TopSellersCard.styles";

// Интерфейс для пропсов карточки
interface TopSellersCardProps {
  img: string; // Полный URL к изображению
  desc: string; // Описание товара
  price: string; // Цена товара
  onCardClick: () => void; // Клик по карточке
  onBuyClick: () => void; // Кнопка "Купить"
}

const TopSellersCard: React.FC<TopSellersCardProps> = ({
  img,
  desc,
  price,
  onCardClick,
  onBuyClick,
}) => (
  <CardContainer onClick={onCardClick}>
    <Image src={img} alt="top-seller" />
    <Description>{desc}</Description>
    <CardBottom>
      <Price>{price}</Price>
      <BuyButton
        onClick={(e) => {
          e.stopPropagation();
          onBuyClick();
        }}
      >
        Купить
      </BuyButton>
    </CardBottom>
  </CardContainer>
);

export default TopSellersCard;
