// src/pages/Cart/CartPage.tsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";

import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

// ==================== Стили ======================
const CartContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#dcc7bd",
  minHeight: "100vh",
  padding: theme.spacing(4),
  fontFamily: "'Roboto', sans-serif",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

// Заголовок в центре
const CartTitle = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontWeight: 300,
  marginBottom: theme.spacing(3),
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
    marginBottom: theme.spacing(2),
  },
}));

const CartItemRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  backgroundColor: "#E2DCD3",
  padding: theme.spacing(2),
  borderRadius: 8,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const ProductImage = styled("img")(({ theme }) => ({
  width: "110px",
  height: "110px",
  objectFit: "cover",
  borderRadius: 8,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(1),
  },
}));

const TextBlock = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 300,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const RightBlock = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
  },
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  color: "#333",
  fontSize: "1rem",
  fontWeight: 300,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const QuantityBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const PinkIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#1D232C",
  color: "#000",
  filter: "invert(1)",
  "&:hover": {
    filter: "invert(1)",
  },
  fontSize: "1.2rem",
}));

const DeleteBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const TotalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(4),
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const ButtonsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  mt: 3,
  flexWrap: "wrap",
}));

const NoticeBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: "#E2DCD3",
  padding: theme.spacing(3),
  borderRadius: 8,
}));
// ==================== /Стили ======================

const CartPage: React.FC = () => {
  const { cartItems, removeItem, updateItemQty, totalPrice, checkout } =
    useCart();

  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Обработка оформления заказа
  const handleCheckout = async () => {
    const deliveryAddress = prompt("Введите адрес доставки:");
    if (deliveryAddress) {
      try {
        await checkout(deliveryAddress);
        setShowOrderSuccess(true);
      } catch (err) {
        alert("Ошибка при оформлении заказа. Попробуйте снова.");
      }
    }
  };

  return (
    <>
      <MainHeader />
      <SubHeader />

      <CartContainer>
        <CartTitle>Ваша корзина</CartTitle>

        {cartItems.length === 0 ? (
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 300 }}>
            Корзина пуста
          </Typography>
        ) : (
          <Box>
            {cartItems.map((item) => {
              // Формируем URL для изображения
              // Если в item.image путь пустой, подставляем дефолтное
              const imagePath = item.image
                ? `http://localhost:8000/api/data/image?image_path=${encodeURIComponent(
                    item.image
                  )}`
                : "http://localhost:8000/api/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg";

              return (
                <CartItemRow key={item.id}>
                  <ProductImage src={imagePath} alt={item.name} />

                  <TextBlock>
                    <ProductName>{item.name}</ProductName>
                    {/* Можно добавить описание или другие детали */}
                  </TextBlock>

                  <RightBlock>
                    <QuantityBox>
                      <PinkIconButton
                        onClick={() => {
                          const newQty = Math.max(item.quantity - 1, 1);
                          updateItemQty(item.id, newQty);
                        }}
                        aria-label="Уменьшить количество"
                      >
                        -
                      </PinkIconButton>

                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value, 10);
                          if (newQty > 0) {
                            updateItemQty(item.id, newQty);
                          }
                        }}
                        inputProps={{
                          min: 1,
                          max: 999,
                        }}
                        sx={{
                          width: "60px",
                          "& input": {
                            textAlign: "center",
                            fontSize: "1rem",
                            fontWeight: 300,
                          },
                        }}
                      />

                      <PinkIconButton
                        onClick={() => updateItemQty(item.id, item.quantity + 1)}
                        aria-label="Увеличить количество"
                      >
                        +
                      </PinkIconButton>
                    </QuantityBox>

                    <PriceTypography>{item.price} руб.</PriceTypography>
                  </RightBlock>

                  <DeleteBox>
                    <IconButton
                      onClick={() => removeItem(item.id)}
                      aria-label="Удалить товар"
                      sx={{
                        "&:hover": { color: "#C06193" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </DeleteBox>
                </CartItemRow>
              );
            })}

            <Divider sx={{ my: 3 }} />

            {/* Итого */}
            <TotalBox>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 300,
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                }}
              >
                Итого:
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 300,
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                }}
              >
                {totalPrice} руб.
              </Typography>
            </TotalBox>

            {/* Кнопки */}
            <ButtonsBox>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#B07889",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#FFB5C1",
                  },
                  fontWeight: 300,
                  padding: { xs: "8px 16px", sm: "10px 20px" },
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  textTransform: "none",
                }}
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>

              <Button
                variant="contained"
                component={Link}
                to="/catalog"
                sx={{
                  backgroundColor: "#F5EDEB",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#FFC7CD",
                  },
                  fontWeight: 300,
                  padding: { xs: "8px 16px", sm: "10px 20px" },
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  textTransform: "none",
                }}
              >
                Продолжить покупки
              </Button>
            </ButtonsBox>

            {/* Информация для клиента */}
            <NoticeBox>
              <Typography
                variant="body2"
                sx={{
                  marginBottom: 1,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: 300,
                }}
              >
                <strong>Обратите внимание:</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: 300,
                }}
              >
                • Доставка по Минску при сумме заказа от 120 рублей осуществляется
                бесплатно. При заказе на меньшую сумму сайт автоматически добавит
                в итоговую сумму покупки стоимость доставки – 15 рублей.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: 300,
                }}
              >
                • Возможна доставка за МКАД (до 15 км): стоимость доставки – 25
                рублей независимо от суммы заказа.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: 300,
                }}
              >
                • Самовывоз производится с Неманской, 2 (ежедневно до 20.00).
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: 300,
                }}
              >
                • Получить актуальное фото растения или задать интересующие
                вопросы можно звонком по телефону +375 (29) 647-33-33,
                либо в любом мессенджере по этому же номеру.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: 300,
                }}
              >
                • После оформления заказа с вами свяжется менеджер салона.
              </Typography>
            </NoticeBox>
          </Box>
        )}
      </CartContainer>

      <Footer />

      {/* Уведомление о том, что заказ оформлен */}
      <Snackbar
        open={showOrderSuccess}
        autoHideDuration={1500}
        onClose={() => setShowOrderSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setShowOrderSuccess(false)}
          sx={{ width: "100%" }}
        >
          Заказ оформлен успешно!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CartPage;
