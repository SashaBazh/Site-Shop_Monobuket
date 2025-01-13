import { styled } from '@mui/material/styles';
import { Box, Link, Select } from '@mui/material';

export const SubHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: '#ffffff', // Чёрный фон
  
  
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    filter: 'invert(1)'
  },
}));

export const FilterLink = styled(Link)(({ theme }) => ({
  color: '#ffffff', // Белый текст
  textDecoration: 'none',
  fontWeight: 400,

  
  '&:hover': {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none', // Скрываем на маленьких экранах
     filter: 'invert(1)'
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  display: 'none', // Скрываем на больших экранах
  
  color: '#ffffff',
  borderColor: '#ffffff',
  backgroundColor: '#ffffff',
  fontWeight: '200', // Жирный текст
  
  [theme.breakpoints.down('sm')]: {
    
    width: '100%',
    maxWidth: 250,
    margin: '0 auto',
     filter: 'invert(1)'
  },
}));
