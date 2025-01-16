import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SliderContainer, ArrowButton } from "./TopSellersSection.styles";

import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";

const slides = [slider1, slider2, slider3];

const SliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <SliderContainer>
      <ArrowButton
        onClick={handlePrev}
        sx={{
          left: "20px",
        }}
      >
        <ArrowBackIosIcon />
      </ArrowButton>

      {/* ВРАППЕР ДЛЯ ВСЕХ СЛАЙДОВ */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",  // ВАЖНО: чтобы картинки растягивались по высоте контейнера
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            sx={{
              width: "100%",
              height: "100%",
              flexShrink: 0,
              backgroundImage: `url(${slide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </Box>

      <ArrowButton
        onClick={handleNext}
        sx={{
          right: "20px",
        }}
      >
        <ArrowForwardIosIcon />
      </ArrowButton>
    </SliderContainer>
  );
};

export default SliderSection;
