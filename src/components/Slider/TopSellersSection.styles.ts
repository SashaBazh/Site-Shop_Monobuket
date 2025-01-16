import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

// Контейнер слайдера
export const SliderContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  // Задаём фиксированную высоту (или более гибкую) для всего слайдера
  height: "90vh", // При больших экранах
  [theme.breakpoints.down("md")]: {
    height: "60vh", // На средних экранах (таблеты)
  },
  [theme.breakpoints.down("sm")]: {
    height: "40vh", // На телефонах
  },
}));

// Кнопки стрелок
export const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  color: "#000",
  backgroundColor: "transparent",
   filter: 'invert(1)',
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
}));
