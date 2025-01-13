import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const AboutUsSection: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      id="about"
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '40px',
        padding: isMobile ? '20px' : '100px',
     
        backgroundColor: '#dcc7bd',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ flex: '1', minWidth: '300px', fontsize: "16px" }}>
        <Typography variant="h2" sx={{ marginBottom: '20px' }}>
          Цветочная подписка
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 200, fontSize: "30px"}}>
          Цветочная подписка – это с любовью подобранные цветы, которые станут приятным дополнением вашего интерьера.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 300, fontSize: "30px" }}>
          Каждую неделю вас будут радовать свежие сезонные цветы, состав которых мы можем согласовать с вами.
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 300, fontSize: "30px" }}>
          Это идеальный подарок для себя или для ваших близких.
        </Typography>
      </Box>
      <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-end' }}>
        <Box
          component="img"
          src="/src/assets/images/about_rect.jpg"
          alt="about-rect"
          sx={{
            width: isMobile ? '100%' : '80%',
            borderRadius: '8px',
          }}
        />
        
      </Box>
    </Box>
  );
};

export default AboutUsSection;
