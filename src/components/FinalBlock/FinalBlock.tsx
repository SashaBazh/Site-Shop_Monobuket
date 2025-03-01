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
        <StyledImage src="./assets/images/final_rect.jpg" alt="final-rect" />
      </ImagesContainer>

      <TextContainer>
        <Title variant="h2">Цветы и букеты с доставкой</Title>
        <Paragraph variant="body1">
          Мы – команда настоящих энтузиастов, которые обожают цветы и знают, как
          сделать ваш день ярче!
        </Paragraph>
        <Paragraph variant="body1">
          Каждую неделю мы осуществляем свежие поставки цветов 3-4 раза, чтобы у
          нас всегда были самые лучшие и красивые букеты для вас.
        </Paragraph>
        <Paragraph variant="body1">
          Мы готовы доставить цветы прямо к Вашему порогу – быстро и удобно. При
          этом доставка бесплатна при заказе от 120 рублей.
        </Paragraph>
      </TextContainer>
    </FinalBlockContainer>
  );
};

export default FinalBlock;
