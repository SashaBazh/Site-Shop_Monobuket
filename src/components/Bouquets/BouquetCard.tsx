// src/components/Bouquets/BouquetCard.tsx

import React from "react";
import {
  CardContainer,
  Image,
  Description,
  Price,
  BuyButton,
  CardBottom,
} from "./BouquetCard.styles";

// Интерфейс для пропсов карточки
interface BouquetCardProps {
  img: string; // Полный URL к изображению
  desc: string; // Описание букета
  price: string; // Цена букета
  onCardClick: () => void; // Клик по карточке
  onBuyClick: () => void; // Кнопка "Купить"
}

const BouquetCard: React.FC<BouquetCardProps> = ({
  img,
  desc,
  price,
  onCardClick,
  onBuyClick,
}) => (
  <CardContainer onClick={onCardClick}>
    <Image src={img} alt="bouquet" />
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

export default BouquetCard;
