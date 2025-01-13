// src/pages/PaymentDeliveryPage/PaymentDeliveryPage.tsx

import React from "react";
import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { keyframes } from "@mui/system";

// ---------------------- Анимация появления ----------------------
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ---------------------- Стилизованные компоненты ----------------------
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#E2DCD3",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  animation: `${fadeIn} 1s ease-out`,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: theme.spacing(0, 2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
  animation: `${fadeIn} 1.5s ease-out`,
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  animation: `${fadeIn} 2s ease-out`,
}));

const TextSection = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 200,
  lineHeight: 1.8,
  color: theme.palette.text.primary,
  flex: 2,
  whiteSpace: "pre-line",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontWeight: 200,
  margin: theme.spacing(2, 0),
  color: theme.palette.primary.main,
  borderBottom: `1px solid black`,
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
  },
}));

const SectionTitle1 = styled(Typography)(({ theme }) => ({
  fontSize: "50px",
  fontWeight: 200,
  margin: theme.spacing(1, 0),
  color: theme.palette.primary.main,
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

const Image = styled("img")(({ theme }) => ({
  flex: 1,
  width: "100%",
  maxWidth: "400px",
  height: "auto",
  borderRadius: theme.spacing(2),
  objectFit: "contain",
  animation: `${fadeIn} 2.5s ease-out`,
}));

const PaymentMethodsImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  display: "block",
  height: "auto",
  animation: `${fadeIn} 3s ease-out`,
}));

const MapWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  margin: "20px auto",
  height: "400px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  animation: `${fadeIn} 3.5s ease-out`,
}));

// ---------------------- Компонент страницы ----------------------
const PaymentDeliveryPage: React.FC = () => {
  const theme = useTheme();

  return (
    <PageContainer>
      {/* Первый хедер (уже содержит изменения для корзины) */}
      <MainHeader />
      {/* Второй хедер (SubHeader) */}
      <SubHeader />

      {/* Основной контент */}
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
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          <SectionTitle1>Оплата и доставка</SectionTitle1>
        </Typography>

        <ContentWrapper>
          {/* Блок с текстом и картинкой чека */}
          <SectionWrapper>
            <Box>
              <SectionTitle>Оформление заказа</SectionTitle>
              <TextSection>
                Прием и обработка заказов по телефону осуществляется с 9.00 утра
                до 21.00 вечера, через корзину на сайте — круглосуточно. После
                оформления заказа на сайте с Вами свяжется администратор для
                уточнения всех деталей.
              </TextSection>

              <SectionTitle>Варианты оплаты</SectionTitle>
              <TextSection>
                В цветочной лавке Monobyket.by вы можете оплатить следующим
                образом:
                {"\n"}- Наличными в магазине
                {"\n"}- Наличными курьеру при доставке в будний день
                {"\n"}- Банковской карточкой в магазине
                {"\n"}- Банковской карточкой в интернет-магазине Monobyket.by
                {"\n"}- Через систему Epos ЕРИП по предоставленной ссылке
                {"\n"}- Безналичный расчет (ТН/ТТН)
              </TextSection>
            </Box>

            <Image src="/src/assets/images/receipt.jpg" alt="Receipt" />
          </SectionWrapper>

          <SectionWrapper>
            <Box>
              <SectionTitle>
                Образцы документов, подтверждающих оплату
              </SectionTitle>
              <TextSection>
                Банковской карточкой через Интернет. После нажатия кнопки
                "Оплатить" вы перейдете на специальную защищенную платежную
                страницу процессинговой системы bePaid.
                {"\n\n"}
                На платежной странице будет указан номер заказа и сумма платежа.
                Для оплаты вам необходимо ввести свои карточные данные и
                подтвердить платеж, нажав кнопку «оплатить».
                {"\n\n"}
                Если ваша карта поддерживает технологию 3-D Secure, вам будет
                предложено пройти стандартную одноминутную процедуру проверки
                владельца карты на сайте вашего банка (банк, выдавший вашу
                карту).
                {"\n\n"}
                После оплаты наш менеджер свяжется с вами указанным вами
                способом для уточнения деталей по доставке.
                {"\n\n"}
                Обращаем ваше внимание, что после проведения платежа на ваш
                электронный адрес придет подтверждение оплаты. Просим вас
                сохранять данные оплат.
                {"\n\n"}
                Мы принимаем платежи по следующим банковским картам: Visa, Visa
                Electron, MasterCard, Maestro, Белкарт.
              </TextSection>
            </Box>
          </SectionWrapper>

          {/* Картинка с методами оплаты */}
          <PaymentMethodsImage
            src="/src/assets/images/payment_methods.jpg"
            alt="Payment Methods"
          />

          <Box>
            <SectionTitle>Доставка</SectionTitle>
            <TextSection>
              Доставка выполняется с 9:30 до 20:00 в будние дни. Доставка в
              другое время оговаривается индивидуально с администратором
              цветочной лавки.
              {"\n"}
              <SectionTitle>Стоимость доставки</SectionTitle>
              {"\n"}- При сумме заказа более 100 BYN — бесплатно по городу
              Минску в пределах МКАД.
              {"\n"}- При сумме заказа менее 100 BYN — 10 рублей по городу
              Минску в пределах МКАД.
              {"\n"}- Доставка за пределы города Минска в пределах 10 км от
              МКАД — 15 рублей.
            </TextSection>
          </Box>

          {/* Карта */}
          <MapWrapper>
            <YMaps>
              <Map
                defaultState={{
                  center: [53.942595, 27.598719], // Координаты "Леонида Беды 4"
                  zoom: 16,
                }}
                width="100%"
                height="100%"
                options={{
                  suppressMapOpenBlock: true,
                  animation: "fadeIn 2s ease-out",
                }}
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

      {/* Подвал */}
      <Footer />
    </PageContainer>
  );
};

export default PaymentDeliveryPage;
