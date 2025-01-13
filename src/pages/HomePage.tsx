// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Вот ваши компоненты
import MainHeader from '../components/Header/MainHeader';
import SubHeader from '../components/Header/SubHeader';
import SliderSection from '../components/Slider/SliderSection';
import BouquetSection from '../components/Bouquets/BouquetSection';
import AboutUsSection from '../components/AboutUs/AboutUsSection';
import TopSellersSection from '../components/TopSeller/TopSellersSection';
import FinalBlock from '../components/FinalBlock/FinalBlock';
import Footer from '../components/Footer/Footer';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Если не авторизован — сразу на /register
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/register");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box>
      <MainHeader />
      <SubHeader />

      <SliderSection />
      <BouquetSection />
      <AboutUsSection />
      <TopSellersSection />
      <FinalBlock />

      <Footer />
    </Box>
  );
}
