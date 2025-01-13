////////////////////////////////////////////////////////////////////////////////
// src/components/Bouquets/BouquetCard.styles.ts (Без изменений)
////////////////////////////////////////////////////////////////////////////////
import { styled, keyframes } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

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

// Контейнер для карточки
export const CardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  backgroundColor: '#dcc7bd',
  padding: theme.spacing(0),
  animation: `${fadeIn} 0.2s ease-in-out`,
}));

// Изображение
export const Image = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
}));

// Описание
export const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: '#000',
  fontWeight: 300,
  fontSize: '1rem',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  textOverflow: 'ellipsis',
  height: '3rem',
}));

// Нижняя часть (цена + кнопка)
export const CardBottom = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#000',
  fontSize: '1rem',
}));

export const BuyButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: '#443C41',
  color: '#fff',
  padding: theme.spacing(0.5, 2),
  fontSize: '1rem',
  fontWeight: 300,
  '&:hover': {
    backgroundColor: '#333',
  },
}));
