import React, { useState } from "react";
import {
  CardContainer,
  Image,
  Description,
  Price,
  BuyButton,
  CardBottom,
} from "./BouquetCard.styles";
import { Snackbar, Alert } from "@mui/material";

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
        <Image src={img} alt="bouquet" />
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

export default BouquetCard;
