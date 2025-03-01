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

            <Image src="./assets/images/receipt.jpg" alt="Receipt" />
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

          <PaymentMethodsImage src="./assets/images/payment_methods.jpg" alt="Payment Methods" />

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
              {"\n"}- При сумме заказа менее 100 BYN — 15 рублей по городу
              Минску в пределах МКАД.
              {"\n"}- Доставка за пределы города Минска в пределах 10 км от
              МКАД — 20 рублей.
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
