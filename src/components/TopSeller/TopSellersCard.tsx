import React, { useState } from "react";
import {
  CardContainer,
  Image,
  Description,
  Price,
  BuyButton,
  CardBottom,
} from "./TopSellersCard.styles";
import { Snackbar, Alert } from "@mui/material";

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
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Открытие уведомления
  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    onBuyClick(); // Вызываем переданный обработчик "Купить"
    setSnackbarOpen(true); // Показываем уведомление
  };

  // Закрытие уведомления
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return; // Игнорируем закрытие при клике вне уведомления
    }
    setSnackbarOpen(false); // Закрываем уведомление
  };

  return (
    <>
      <CardContainer onClick={onCardClick}>
        <Image src={img} alt="top-seller" />
        <Description>{desc}</Description>
        <CardBottom>
          <Price>{price}</Price>
          <BuyButton onClick={handleBuyClick}>Купить</BuyButton>
        </CardBottom>
      </CardContainer>

      {/* Уведомление */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Товар добавлен в корзину!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TopSellersCard;
