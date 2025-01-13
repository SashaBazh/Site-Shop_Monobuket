import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import MainHeader from '../../components/Header/MainHeader';
import SubHeader from '../../components/Header/SubHeader';
import Footer from '../../components/Footer/Footer';
import { 
  AboutContainer, 
  AboutImage, 
  AboutImage1,
  CircleItem, 
  SectionTitle, 
  SectionSubtitle, 
  SectionText, 
  CircleText,
  ContentWrapper,
  SectionSubtitle1,
  CircleText1
} from './AboutUsPage.styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Импортируем изображения как переменные
import aboutImage1 from '../../assets/images/about_image1.jpg';
import aboutImage2 from '../../assets/images/about_image2.jpg';
import aboutImage3 from '../../assets/images/about_image3.jpg';

const AboutUsPage: React.FC = () => {
  const { ref: sectionRef1, inView: inViewSection1 } = useInView({
    triggerOnce: true, // Анимация запускается один раз, когда элемент появляется
    threshold: 0.5, // Элемент должен быть на 50% видим
  });
  const { ref: sectionRef2, inView: inViewSection2 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: sectionRef3, inView: inViewSection3 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <Box sx={{ backgroundColor: '#dcc7bd', width: '100%' }}>
      <MainHeader />
      <SubHeader />

      <AboutContainer>
        <ContentWrapper>
          {/* Первый блок */}
          <motion.div
            ref={sectionRef1}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inViewSection1 ? 1 : 0, y: inViewSection1 ? 0 : 50 }}
            transition={{ duration: 1 }}
          >
            <SectionTitle variant="h2">Что такое МОНОБУКЕТ</SectionTitle>
            <SectionText variant="body1">
              МОНОБУКЕТ - мы создаем не просто букеты, а настоящие произведения искусства. Влюбленные в свое дело, мы знаем всё о цветах и поможем создать именно тот букет, который расскажет вашу историю. Мы живем цветами и точно знаем, как превратить любой повод в незабываемый момент с помощью идеально подобранной композиции.
            </SectionText>
            <AboutImage src={aboutImage1} alt="about_image1" />
          </motion.div>
        </ContentWrapper>

        <ContentWrapper>
          {/* Второй блок */}
          <motion.div
            ref={sectionRef2}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inViewSection2 ? 1 : 0, x: inViewSection2 ? 0 : -50 }}
            transition={{ duration: 1 }}
          >
            <SectionSubtitle1 variant="h2">Рады представить вам:</SectionSubtitle1>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <CircleItem>
                  <CircleText>1</CircleText>
                </CircleItem>
                <CircleText1>
                  Подписка на букеты
                </CircleText1>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CircleItem>   
                  <CircleText>2</CircleText>
                </CircleItem>
                <CircleText1>
                  Цветочное оформление
                </CircleText1>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CircleItem>
                  <CircleText>3</CircleText>
                </CircleItem>
                <CircleText1>
                  Букеты, цветочные композиции
                </CircleText1>
              </Grid>
            </Grid>
            <AboutImage src={aboutImage2} alt="about_image2" />
          </motion.div>
        </ContentWrapper>

        <ContentWrapper>
          {/* Третий блок */}
          <motion.div
            ref={sectionRef3}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inViewSection3 ? 1 : 0, y: inViewSection3 ? 0 : 50 }}
            transition={{ duration: 1 }}
          >
            <SectionSubtitle variant="h2">Почему именно мы</SectionSubtitle>
            <SectionText variant="body1">
              В "Монобукете" мы уверены, что выбор букета требует такого же профессионального подхода, как и выбор автомобиля или дорогих украшений. Наши флористы-эксперты помогут вам создать именно ту цветочную композицию, которая идеально подойдет для вашего особенного случая.
            </SectionText>
            <AboutImage1 src={aboutImage3} alt="about_image3" />
          </motion.div>
        </ContentWrapper>
      </AboutContainer>

      <Footer />
    </Box>
  );
};

export default AboutUsPage;
