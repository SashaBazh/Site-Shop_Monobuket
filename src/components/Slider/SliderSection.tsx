import React, { useState, useEffect } from "react";
import { SliderContainer, ArrowButton, SlidesWrapper, Slide } from "./SliderSection.styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const slides = [
  "../../assets/images/slider1.jpg",
  "../../assets/images/slider2.jpg",
  "../../assets/images/slider3.jpg",
];

const SliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <ArrowButton onClick={handlePrev} sx={{ left: "20px" }}>
        <ArrowBackIosIcon />
      </ArrowButton>

      <SlidesWrapper sx={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, idx) => (
          <Slide key={idx} sx={{ backgroundImage: `url(${slide})` }} />
        ))}
      </SlidesWrapper>

      <ArrowButton onClick={handleNext} sx={{ right: "20px" }}>
        <ArrowForwardIosIcon />
      </ArrowButton>
    </SliderContainer>
  );
};

export default SliderSection;
