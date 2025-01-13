import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import finalRect from '../../assets/images/final_rect.jpg'; // Импортируем изображение как переменную

const FinalBlock: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '40px',
        padding: isMobile ? '20px' : '60px',
        backgroundColor: '#E2DCD3',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box
          component="img"
          src={finalRect} // Используем переменную
          alt="final-rect"
          sx={{
            width: isMobile ? '100%' : '80%',
            borderRadius: '8px',
          }}
        />
      </Box>

      <Box sx={{ flex: '1', minWidth: '300px' }}>
        <Typography variant="h2" sx={{ marginBottom: '20px' }}>
          Цветы и букеты с доставкой
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 300, fontSize: '30px' }}>
          Мы – команда настоящих энтузиастов, которые обожают цветы и знают, как сделать ваш день ярче!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 300, fontSize: '30px' }}>
          Каждую неделю мы осуществляем свежие поставки цветов 3-4 раза, чтобы у нас всегда были самые лучшие и красивые букеты для вас.
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 300, fontSize: '30px' }}>
          Мы готовы доставить цветы прямо к Вашему порогу – быстро и удобно. При этом доставка бесплатна при заказе от 120 рублей.
        </Typography>
      </Box>
    </Box>
  );
};

export default FinalBlock;
