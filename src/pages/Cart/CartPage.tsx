import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";
import Cookies from "js-cookie";
import { getImageUrl } from "../../api/config";
import {
  Box,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  CartContainer,
  CartTitle,
  CartItemRow,
  ProductImage,
  TextBlock,
  ProductName,
  RightBlock,
  PriceTypography,
  QuantityBox,
  PinkIconButton,
  DeleteBox,
  TotalBox,
  ButtonsBox,
  NoticeBox,
  EmptyCartTypography,
  QuantityTextField,
  DeleteIconButton,
  CheckoutButton,
  ContinueShoppingButton,
  NoticeTitle,
  NoticeText,
  TotalTypography,
  StyledLink
} from "./CartPage.styles";

const CartPage: React.FC = () => {
  const { cartItems, removeItem, updateItemQty, totalPrice } = useCart();
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    const cartData = cartItems.map((item) => ({
      ...item,
      image: item.image || undefined,
    }));
    Cookies.set("cartItems", JSON.stringify(cartData), { expires: 1 });
    navigate("/checkout");
  };

  return (
    <>
      <MainHeader />
      <SubHeader />
      <CartContainer>
        <CartTitle>Ваша корзина</CartTitle>
        {cartItems.length === 0 ? (
          <EmptyCartTypography>Корзина пуста</EmptyCartTypography>
        ) : (
          <Box>
            {cartItems.map((item) => (
              <CartItemRow key={item.id}>
                <ProductImage src={getImageUrl(item.image)} alt={item.name} />
                <TextBlock>
                  <ProductName>{item.name}</ProductName>
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
                    <QuantityTextField
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
                  <DeleteIconButton
                    onClick={() => removeItem(item.id)}
                    aria-label="Удалить товар"
                  >
                    <DeleteIcon />
                  </DeleteIconButton>
                </DeleteBox>
              </CartItemRow>
            ))}
            <Divider sx={{ my: 3 }} />
            <TotalBox>
              <TotalTypography>Итого:</TotalTypography>
              <TotalTypography>{totalPrice} руб.</TotalTypography>
            </TotalBox>
            <ButtonsBox>
              <CheckoutButton
                variant="contained"
                onClick={handleCheckout}
              >
                Оформить заказ
              </CheckoutButton>
              <StyledLink to="/catalog">
                <ContinueShoppingButton variant="contained">
                  Продолжить покупки
                </ContinueShoppingButton>
              </StyledLink>
            </ButtonsBox>
            <NoticeBox>
              <NoticeTitle>
                <strong>Обратите внимание:</strong>
              </NoticeTitle>
              <NoticeText>
                1. Для успешного оформления заказа убедитесь, что все товары в
                корзине правильно выбраны.
              </NoticeText>
              <NoticeText>
                2. Убедитесь, что у вас есть актуальный адрес доставки.
              </NoticeText>
            </NoticeBox>
          </Box>
        )}
      </CartContainer>
      <Footer />
      <Snackbar
        open={showOrderSuccess}
        autoHideDuration={6000}
        onClose={() => setShowOrderSuccess(false)}
      >
        <Alert
          onClose={() => setShowOrderSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Ваш заказ успешно оформлен!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CartPage;