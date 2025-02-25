import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

// Импорт стилей
import { 
  PageContainer, ContentWrapper, SectionWrapper, TextSection, 
  SectionTitle, SectionTitle1, Image, PaymentMethodsImage, MapWrapper 
} from "./PaymentDeliveryPage.styles";

const PaymentDeliveryPage: React.FC = () => {
  const theme = useTheme();

  return (
    <PageContainer>
      <MainHeader />
      <SubHeader />

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            fontWeight: 400,
            fontSize: "50px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "30px",
            },
          }}
        >
          <SectionTitle1>Оплата и доставка</SectionTitle1>
        </Typography>

        <ContentWrapper>
          <SectionWrapper>
            <Box>
              <SectionTitle>Оформление заказа</SectionTitle>
              <TextSection>
                Прием и обработка заказов по телефону осуществляется с 9.00 утра
                до 21.00 вечера, через корзину на сайте — круглосуточно.
              </TextSection>

              <SectionTitle>Варианты оплаты</SectionTitle>
              <TextSection>
                Варианты оплаты: 
                {"\n"}- Наличными в магазине 
                {"\n"}- Банковской картой 
                {"\n"}- Через систему ЕРИП 
              </TextSection>
            </Box>

            <Image src="./assets/images/receipt.jpg" alt="Receipt" />
          </SectionWrapper>

          <SectionWrapper>
            <Box>
              <SectionTitle>Образцы документов</SectionTitle>
              <TextSection>
                Банковской карточкой через Интернет. После нажатия кнопки
                "Оплатить" вы перейдете на защищенную платежную страницу.
              </TextSection>
            </Box>
          </SectionWrapper>

          <PaymentMethodsImage src="./assets/images/payment_methods.jpg" alt="Payment Methods" />

          <Box>
            <SectionTitle>Доставка</SectionTitle>
            <TextSection>
              Доставка выполняется с 9:30 до 20:00 в будние дни. 
              {"\n"}Стоимость доставки:
              {"\n"}- При заказе от 100 BYN — бесплатно по Минску.
              {"\n"}- Менее 100 BYN — 10 BYN по Минску.
            </TextSection>
          </Box>

          <MapWrapper>
            <YMaps>
              <Map
                defaultState={{ center: [53.942595, 27.598719], zoom: 16 }}
                width="100%"
                height="100%"
              >
                <Placemark
                  geometry={[53.942595, 27.598719]}
                  properties={{
                    hintContent: "Monobyket",
                    balloonContent: "Г. Минск, Ул. Леонида Беды 4",
                  }}
                  options={{
                    preset: "islands#icon",
                    iconColor: "#0095b6",
                  }}
                />
              </Map>
            </YMaps>
          </MapWrapper>
        </ContentWrapper>
      </Box>

      <Footer />
    </PageContainer>
  );
};

export default PaymentDeliveryPage;
