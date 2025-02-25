import React from "react";
import { motion } from "framer-motion";
import { AboutUsContainer, TextContainer, Title, Paragraph, ImagesContainer, RectImage } from './AboutUsSection.styles';

const AboutUsSection: React.FC = () => {

  const MotionBox = motion(AboutUsContainer);

  return (
    <MotionBox
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <TextContainer>
        <Title variant="h2">Цветочная подписка</Title>
        <Paragraph variant="body1">
          Цветочная подписка – это с любовью подобранные цветы, которые станут
          приятным дополнением вашего интерьера.
        </Paragraph>
        <Paragraph variant="body1">
          Каждую неделю вас будут радовать свежие сезонные цветы, состав которых
          мы можем согласовать с вами.
        </Paragraph>
        <Paragraph variant="body1">
          Это идеальный подарок для себя или для ваших близких.
        </Paragraph>
      </TextContainer>
      <ImagesContainer>
        <RectImage
          src="./assets/images/about_rect.jpg"
          alt="about-rect"
        />
      </ImagesContainer>
    </MotionBox>
  );
};

export default AboutUsSection;
