import React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Typography, Grid, Link } from '@mui/material';
import MainHeader from '../../components/Header/MainHeader';
import SubHeader from '../../components/Header/SubHeader';
import Footer from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Создание темы
const theme = createTheme({
  palette: {
    primary: {
      main: '#dcc7bd',
    },
    text: {
      primary: '#000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h2: {
      fontSize: '36px',
      fontWeight: 300,
    },
    body1: {},
  },
});

// Переопределенные компоненты
const ContactContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#dcc7bd',
  textAlign: 'center',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowX: 'hidden',
  color: theme.palette.text.primary,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    padding: '20px 15px',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: '20px 0',
  fontSize: '50px', // Увеличен размер заголовка
  fontWeight: 300,
}));

const SectionText = styled(Typography)(({ theme }) => ({
  margin: '10px 0',
  fontSize: '25px',
  fontWeight: 300,
  lineHeight: '1.5',
  textAlign: 'left',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (max-width: 768px)': {
    fontSize: '25px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  margin: '20px auto',
  textAlign: 'center',
  img: {
    width: '100%',
    height: 'auto',
   
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover', // Гарантируем, что изображение заполнит контейнер аккуратно
  },
  '@media (max-width: 768px)': {
    img: {
      maxHeight: '250px', // Ещё меньше высота на узких экранах
    },
  },
}));


const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  height: '400px',
  margin: '20px auto',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: '#535bf2',
    textDecoration: 'underline',
  },
}));

// Анимация появления текста
const MotionSectionText = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

// Компонент страницы
const ContactPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: '#dcc7bd', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
        {/* Заголовки */}
        <MainHeader />
        <SubHeader />

        <ContactContainer>
          <ContentWrapper>
            {/* Заголовок */}
            <MotionSectionText>
              <SectionTitle variant="h2">Контакты</SectionTitle>
            </MotionSectionText>

            {/* Контактная информация */}
            <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
              <Grid item xs={12} md={6}>
                <MotionSectionText>
                  <SectionText>
                    <strong>Адрес:</strong> Г. Минск, ул. Леонида Беды 46, ТЦ "4 сезона"
                  </SectionText>
                </MotionSectionText>
                <MotionSectionText>
                  <SectionText>
                    <strong>Часы работы:</strong> Пн-вс с 9:00 до 21:00
                  </SectionText>
                </MotionSectionText>
                <MotionSectionText>
                  <SectionText>
                    <strong>Телефон:</strong> +375 (33) 602-93-59
                  </SectionText>
                </MotionSectionText>
                <MotionSectionText>
                  <SectionText>
                    <strong>Instagram:</strong> <StyledLink href="https://www.instagram.com/monobuket_by_mk/">monobuket_by_mk</StyledLink>
                  </SectionText>
                </MotionSectionText>
                <MotionSectionText>
                  <SectionText>
                    <strong>Как добраться:</strong>
                    <ul style={{ paddingLeft: '20px', textAlign: 'left' }}>
                      <li>Ст. м. «Московская»</li>
                      <li>Пять остановок автобусами №113ас, 113с, 143с, 145с, 37, 37д, 80</li>
                      <li>Или пешком 2800 м до остановки "Якуба Коласа"</li>
                      <li>Для автомобилистов — бесплатная парковка</li>
                      <li>Вход находится внутри здания</li>
                    </ul>
                  </SectionText>
                </MotionSectionText>
              </Grid>

              {/* Изображение */}
              <Grid item xs={12} md={6}>
                <ImageContainer>
                  <motion.img
                    src="/src/assets/images/contacts_image.jpg" // Укажите правильный путь к изображению
                    alt="Контактное изображение"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </ImageContainer>
              </Grid>
            </Grid>

            {/* Карта */}
            <MapContainer>
              <iframe
                title="Yandex Map"
                src="https://yandex.ru/map-widget/v1/?ll=27.598719%2C53.942595&z=17&pt=27.598719,53.942595,pm2dgl"
              ></iframe>
            </MapContainer>
          </ContentWrapper>
        </ContactContainer>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default ContactPage;
