// src/components/Header/MainHeader.styles.tsx

import { styled } from '@mui/material/styles';
import { Box, Link, Button } from '@mui/material';

// Стили для основного контейнера Header
export const MainHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 4),
  backgroundColor: '#dcc7bd',
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(1, 2),
  },
}));

// Стили для правой части навигации
export const NavRightContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: theme.spacing(1),
    color: "#fff",
    fontWeight: '200',
    fontSize: "20px",
  },
}));

// Стили для ссылок навигации
export const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontWeight: 300,
  fontSize: '16px',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

// Стили для логотипа
export const Logo = styled('img')(({ theme }) => ({
  height: '50px',
  objectFit: 'contain',
  fontWeight: 300,
  [theme.breakpoints.down('sm')]: {
    height: '40px',
  },
}));

// Стили для Logout-кнопки
export const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#333', // Тёмный фон
  color: '#fff',
  textTransform: 'none',
  fontWeight: 300,
  fontSize: '16px',
  borderRadius: '8px',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: '#555',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    fontSize: '14px',
    padding: theme.spacing(0.5, 1),
  },
}));
