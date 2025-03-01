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
        {/* Основной заголовок h1 для SEO */}
        <Typography
          variant="h1"
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
          <SectionTitle1>Оплата и доставка цветов в Минске | Monobyket</SectionTitle1>
        </Typography>

        <ContentWrapper>
          <SectionWrapper>
            <Box>
              {/* Подзаголовок h2 для SEO */}
              <SectionTitle>Оформление заказа на цветы</SectionTitle>
              <TextSection>
                Прием и обработка заказов по телефону осуществляется с 9:00 утра до 21:00 вечера. Через корзину на сайте — круглосуточно. После оформления заказа с вами свяжется администратор для уточнения всех деталей.
              </TextSection>

              <SectionTitle>Варианты оплаты для заказа цветов</SectionTitle>
              <TextSection>
                В интернет-магазине Monobyket.by вы можете оплатить заказ различными способами:
                {"\n"}- Наличными в магазине
                {"\n"}- Наличными курьеру при доставке
                {"\n"}- Банковской картой в магазине
                {"\n"}- Банковской картой на сайте Monobyket.by
                {"\n"}- Через систему ЕРИП по предоставленной ссылке
                {"\n"}- Безналичный расчет (ТН/ТТН)
              </TextSection>
            </Box>

            {/* Изображение для иллюстрации */}
            <Image src="./assets/images/receipt.jpg" alt="Документ подтверждения оплаты" />
          </SectionWrapper>

          <SectionWrapper>
            <Box>
              {/* Подзаголовок h2 для SEO */}
              <SectionTitle>Образцы документов, подтверждающих оплату</SectionTitle>
              <TextSection>
                При оплате банковской картой через Интернет, после нажатия кнопки "Оплатить" вы попадете на защищенную платежную страницу.
                {"\n\n"}Выберите способ подтверждения платежа в зависимости от вашего банка.
                {"\n\n"}После оплаты вы получите подтверждение на электронную почту.
              </TextSection>
            </Box>
          </SectionWrapper>

          <PaymentMethodsImage src="./assets/images/payment_methods.jpg" alt="Способы оплаты в Monobyket" />

          <Box>
            {/* Подзаголовок h2 для SEO */}
            <SectionTitle>Доставка цветов по Минску</SectionTitle>
            <TextSection>
              Доставка цветов в Минске выполняется с 9:30 до 20:00. Доставка в другое время оговаривается с администратором.
              {"\n"}<SectionTitle>Стоимость доставки</SectionTitle>
              {"\n"}- Бесплатная доставка при заказе более 100 BYN в пределах МКАД.
              {"\n"}- Стоимость доставки 15 рублей при заказе менее 100 BYN в пределах МКАД.
              {"\n"}- Доставка за пределы МКАД — 20 рублей.
            </TextSection>
          </Box>

          {/* Вставка карты для локализации */}
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
