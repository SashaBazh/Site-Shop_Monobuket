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
      aria-labelledby="about-title"
    >
      <TextContainer>
        <Title variant="h2" id="about-title">
          Цветочная подписка в Минске: Лучшие букеты для вашего интерьера
        </Title>
        <Paragraph variant="body1">
          Цветочная подписка в Минске – это с любовью подобранные цветы, которые станут
          идеальным дополнением вашего интерьера, создавая уют и красоту в вашем доме или офисе.
        </Paragraph>
        <Paragraph variant="body1">
          Каждую неделю мы будем радовать вас свежими сезонными цветами. Мы можем согласовать
          состав букета с вами, чтобы он всегда подходил под ваш стиль и настроение.
        </Paragraph>
        <Paragraph variant="body1">
          Цветочная подписка – это идеальный подарок для себя или ваших близких, который
          станет приятным сюрпризом и подарит радость каждый день.
        </Paragraph>
      </TextContainer>
      <ImagesContainer>
        <RectImage
          src="./assets/images/about_rect.jpg"
          alt="Цветочная подписка"
          title="Цветочная подписка для вашего интерьера"
        />
      </ImagesContainer>
    </MotionBox>
  );
};

export default AboutUsSection;
