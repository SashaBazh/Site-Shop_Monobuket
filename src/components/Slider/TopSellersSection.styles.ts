// SliderSection.styles.ts
import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material'; // Добавляем импорт IconButton

export const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '#dcc7bd',
  [theme.breakpoints.down('sm')]: {
    height: '60vh', // уменьшаем высоту на мобильных
    
  },
}));

// Стиль для кнопок стрелок
export const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  color: '#fff',
  zIndex: 10,
  transform: 'translateY(-50%)',
  filter: 'invert(1)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem', // Уменьшаем размер стрелок для мобильных

  },
}));
