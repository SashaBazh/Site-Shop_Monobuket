import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material'; // Импортируем useTheme
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SliderContainer, ArrowButton } from './TopSellersSection.styles';

// Импортируем изображения слайдов как переменные
import slider1 from '../../assets/images/slider1.jpg';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.jpg';

const slides = [slider1, slider2, slider3];

const SliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme(); // Используем useTheme для получения theme

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 7000); // Смена слайда каждые 7 секунд

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <SliderContainer>
      <ArrowButton
        onClick={handlePrev}
        sx={{
          left: '20px',
        }}
      >
        <ArrowBackIosIcon />
      </ArrowButton>

      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`, // Плавный сдвиг слайдов
        }}
      >
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            component="img"
            src={slide} // Используем импортированное изображение
            alt={`slide-${idx}`}
            sx={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              [theme.breakpoints.down('sm')]: {
                height: '60vh', // уменьшение размера на мобильных
              },
            }}
          />
        ))}
      </Box>

      <ArrowButton
        onClick={handleNext}
        sx={{
          right: '20px',
        }}
      >
        <ArrowForwardIosIcon />
      </ArrowButton>
    </SliderContainer>
  );
};

export default SliderSection;
