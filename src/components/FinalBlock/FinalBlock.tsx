import React from "react";
import {
  FinalBlockContainer,
  ImagesContainer,
  StyledImage,
  TextContainer,
  Title,
  Paragraph,
} from "./FinalBlock.styles";

const FinalBlock: React.FC = () => {
  return (
    <FinalBlockContainer>
      <ImagesContainer>
        <StyledImage 
          src="./assets/images/final_rect.jpg" 
          alt="Цветы и букеты с доставкой по Минску" 
          title="Цветы с доставкой в Минске"
        />
      </ImagesContainer>

      <TextContainer>
        <Title variant="h2">
          Цветы и букеты с доставкой по Минску – Удобно и быстро
        </Title>
        <Paragraph variant="body1">
          Мы – команда профессионалов и энтузиастов, которые обожают цветы и
          знают, как сделать ваш день ярче с помощью свежих букетов, доставленных
          прямо к вашему порогу.
        </Paragraph>
        <Paragraph variant="body1">
          Каждую неделю мы получаем свежие поставки цветов 3-4 раза, чтобы
          предложить вам только самые лучшие и красивые букеты для вашего дома,
          офиса или в подарок.
        </Paragraph>
        <Paragraph variant="body1">
          Мы обеспечиваем быструю доставку цветов по Минску, а также предлагаем
          бесплатную доставку при заказе от 120 рублей. Сделайте заказ и получите
          великолепные букеты с доставкой прямо на дом.
        </Paragraph>
      </TextContainer>
    </FinalBlockContainer>
  );
};

export default FinalBlock;
