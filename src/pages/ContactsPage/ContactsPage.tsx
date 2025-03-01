import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  theme,
  PageContainer,
  ContactContainer,
  ContentWrapper,
  SectionTitle,
  SectionText,
  ImageContainer,
  MapContainer,
  StyledLink,
  StyledList,
} from "./ContactsPage.styles";

const MotionSectionText = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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

const ContactPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <MainHeader />
        <SubHeader />

        <ContactContainer>
          <ContentWrapper>
            <MotionSectionText>
              <SectionTitle variant="h2">Контакты Monobyket — Магазин цветов в Минске</SectionTitle>
            </MotionSectionText>

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
                    <strong>Instagram:</strong>{" "}
                    <StyledLink href="https://www.instagram.com/monobuket_by_mk/">monobuket_by_mk</StyledLink>
                  </SectionText>
                </MotionSectionText>
                <MotionSectionText>
                  <SectionText>
                    <strong>Как добраться:</strong>
                    <StyledList>
                      <li>Ст. м. «Московская»</li>
                      <li>Пять остановок автобусами №113ас, 113с, 143с, 145с, 37, 37д, 80</li>
                      <li>Или пешком 2800 м до остановки "Якуба Коласа"</li>
                      <li>Для автомобилистов — бесплатная парковка</li>
                      <li>Вход находится внутри здания</li>
                    </StyledList>
                  </SectionText>
                </MotionSectionText>
              </Grid>

              <Grid item xs={12} md={6}>
                <ImageContainer>
                  <motion.img
                    src="./assets/images/contacts_image.jpg"
                    alt="Контактное изображение магазина Monobyket"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </ImageContainer>
              </Grid>
            </Grid>

            <MapContainer>
              <iframe
                title="Карта местоположения Monobyket — Магазин цветов"
                src="https://yandex.ru/map-widget/v1/?ll=27.598719%2C53.942595&z=17&pt=27.598719,53.942595,pm2dgl"
              ></iframe>
            </MapContainer>
          </ContentWrapper>
        </ContactContainer>

        <Footer />
      </PageContainer>
    </ThemeProvider>
  );
};

export default ContactPage;
