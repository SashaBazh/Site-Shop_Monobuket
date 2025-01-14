import { styled, keyframes } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

// Анимация появления карточки
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Контейнер для карточки с базовыми стилями
export const CardContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "280px", // Максимальная ширина карточки
  display: "flex",
  flexDirection: "column",
  textAlign: "left", // Выравнивание текста по левому краю
  backgroundColor: "#E2DCD3",
  padding: theme.spacing(0.2), // Общие отступы внутри карточки
  animation: `${fadeIn} 0.2s ease-in-out`, // Применение анимации
  borderRadius: "8px", // Слегка закругленные углы

  transition: "box-shadow 0.3s ease-in-out", // Плавное изменение тени при наведении
  "&:hover": {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)", // Увеличенная тень при наведении
  },
}));

// Стили для изображения в карточке
export const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "200px", // Фиксированная высота для всех изображений
  objectFit: "cover", // Центрирование и обрезка изображения
  borderRadius: "4px", // Слегка закругленные углы изображения
  marginBottom: theme.spacing(2),
}));

// Стили для описания карточки
export const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: "#000",
  fontWeight: 300,
  fontSize: "1rem",
  overflow: "hidden", // Скрытие избыточного текста
  display: "-webkit-box", // Использование веб-кит боксов для ограничения строк
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // Ограничение текста в 2 строки
  textOverflow: "ellipsis", // Добавление троеточия
  height: "3rem", // Фиксированная высота для одинакового размера
}));

// Контейнер для нижней части карточки (цена и кнопка)
export const CardBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
}));

// Стили для текста цены
export const Price = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#000",
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem", // Например, ~14px
  },
}));

// Стили для кнопки "Купить"
export const BuyButton = styled(Button)(({ theme }) => ({
  textTransform: "none", // Отключение преобразования текста в верхний регистр
  backgroundColor: "#443C41", // Чёрный фон кнопки
  color: "#fff", // Белый текст
  padding: theme.spacing(0.5, 2), // Отступы кнопки
  fontSize: "1rem",
  fontWeight: 300,
  borderRadius: "4px", // Небольшое закругление кнопки
  "&:hover": {
    backgroundColor: "#333", // Тёмный фон при наведении
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem", // Например, ~14px
  },
}));

