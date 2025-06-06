import React from "react";
import { Grid } from "@mui/material";
import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";
import {
  AboutContainer,
  AboutImage,
  AboutImage1,
  CircleItem,
  SectionTitle,
  ContentWrapper,
  SubtitleText,
  MainText,
  CircleTextStyled,
} from "./AboutUsPage.styles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUsPage: React.FC = () => {
  const { ref: sectionRef2, inView: inViewSection2 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <>
      <MainHeader />
      <SubHeader />
      <AboutContainer>
        <ContentWrapper>
          <SectionTitle variant="h2" id="what-is-monobuket">
            Что такое МОНОБУКЕТ – Уникальные букеты и цветочные композиции
          </SectionTitle>
          <MainText>
            МОНОБУКЕТ – мы создаем не просто букеты, а настоящие произведения
            искусства. Влюбленные в свое дело, мы знаем всё о цветах и поможем
            создать именно тот букет, который расскажет вашу историю. Мы живем
            цветами и точно знаем, как превратить любой повод в незабываемый
            момент с помощью идеально подобранной композиции.
          </MainText>
          <AboutImage
            src="/assets/images/about_image1.jpg"
            alt="Уникальные букеты и цветочные композиции"
            title="МОНОБУКЕТ: Прекрасные букеты на заказ"
          />
        </ContentWrapper>

        <ContentWrapper>
          <motion.div
            ref={sectionRef2}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: inViewSection2 ? 1 : 0,
              x: inViewSection2 ? 0 : -50,
            }}
            transition={{ duration: 1 }}
          >
            <SubtitleText>Рады представить вам:</SubtitleText>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <CircleItem>
                  <CircleTextStyled>1</CircleTextStyled>
                </CircleItem>
                <CircleTextStyled>Подписка на букеты</CircleTextStyled>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CircleItem>
                  <CircleTextStyled>2</CircleTextStyled>
                </CircleItem>
                <CircleTextStyled>Цветочное оформление</CircleTextStyled>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CircleItem>
                  <CircleTextStyled>3</CircleTextStyled>
                </CircleItem>
                <CircleTextStyled>
                  Букеты, цветочные композиции
                </CircleTextStyled>
              </Grid>
            </Grid>

            <AboutImage
              src="/assets/images/about_image2.jpg"
              alt="Цветочные композиции и оформление на заказ"
              title="Цветочное оформление и композиции от МОНОБУКЕТ"
            />
          </motion.div>
        </ContentWrapper>

        <ContentWrapper>
          <SubtitleText>Почему именно мы</SubtitleText>
          <MainText>
            В "Монобукете" мы уверены, что выбор букета требует такого же
            профессионального подхода, как и выбор автомобиля или дорогих
            украшений. Наши флористы-эксперты помогут вам создать именно ту
            цветочную композицию, которая идеально подойдет для вашего
            особенного случая.
          </MainText>
          <AboutImage1
            src="/assets/images/about_image3.jpg"
            alt="Флористы-эксперты Монобукет создают идеальные композиции"
            title="Флористы Монобукет создают идеальные букеты"
          />
        </ContentWrapper>
      </AboutContainer>
      <Footer />
    </>
  );
};

export default AboutUsPage;
