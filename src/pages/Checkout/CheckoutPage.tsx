import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  Typography,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/cartAPI";
import {
  FormData,
  CartItem,
  OrderCreateRequest,
} from "../../types/Checkout.types";
import {
  StyledContainer,
  PageTitle,
  OrderPaper,
  SectionTitle,
  ProductImage,
  ListItemContainer,
  PriceText,
  FormGrid,
  DeliveryFormSection,
  SubmitButton,
  BackButton,
} from "./CheckoutPage.styles";

const initialFormData: FormData = {
  sender_name: "",
  sender_phone: "",
  email: "",
  delivery_type: "pickup",
  delivery_address: "",
  pickup_address: null,
  room: "",
  floor: "",
  receiver_name: "",
  receiver_phone: "",
  comment: "",
  payment_method: "cash",
};

const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getDeliveryPrice = (): number => {
    if (formData.delivery_type === "delivery") {
      return 10.0;
    }
    return 0;
  };

  const finalPrice = totalPrice + getDeliveryPrice();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const orderData: OrderCreateRequest = {
        delivery_address:
          formData.delivery_type === "delivery"
            ? formData.delivery_address.trim()
            : null,
        pickup_address:
          formData.delivery_type === "pickup"
            ? "г. Минск, ул. Примерная, 123"
            : null,
        payment_method: formData.payment_method,
        sender_name: formData.sender_name.trim(),
        receiver_name:
          formData.receiver_name && formData.receiver_name.trim() !== ""
            ? formData.receiver_name.trim()
            : null,
        email:
          formData.email && formData.email.trim() !== ""
            ? formData.email.trim()
            : null,
        sender_phone: formData.sender_phone.trim(),
        receiver_phone:
          formData.receiver_phone && formData.receiver_phone.trim() !== ""
            ? formData.receiver_phone.trim()
            : null,
        room:
          formData.room && formData.room.trim() !== ""
            ? parseInt(formData.room)
            : null,
        floor:
          formData.floor && formData.floor.trim() !== ""
            ? parseInt(formData.floor)
            : null,
        comment:
          formData.comment && formData.comment.trim() !== ""
            ? formData.comment.trim()
            : null,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      await createOrder(orderData);
      clearCart();
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Ошибка при оформлении заказа:", error);
        setError(error.message || "Произошла ошибка при оформлении заказа");
      } else {
        console.error("Неизвестная ошибка:", error);
        setError("Произошла неизвестная ошибка при оформлении заказа");
      }
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <PageTitle variant="h4">Оформление заказа</PageTitle>

      <OrderPaper>
        <SectionTitle variant="h6">Ваш заказ</SectionTitle>
        <List>
          {cartItems.map((item: CartItem) => (
            <ListItem key={item.id}>
              <ListItemContainer>
                <ProductImage
                  src={item.image || "/assets/images/default.jpg"}
                  alt={item.name}
                />
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography variant="body2">
                        Количество: {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Цена: {item.price} руб.
                      </Typography>
                    </>
                  }
                />
                <PriceText>
                  {(item.price * item.quantity).toFixed(2)} руб.
                </PriceText>
              </ListItemContainer>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">
          Сумма заказа: {totalPrice.toFixed(2)} руб.
        </Typography>
        <Typography variant="body1">
          Стоимость доставки: {getDeliveryPrice().toFixed(2)} руб.
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Итого к оплате: {finalPrice.toFixed(2)} руб.
        </Typography>
      </OrderPaper>

      <form onSubmit={handleSubmit}>
        <OrderPaper>
          <SectionTitle variant="h6">Данные заказчика</SectionTitle>
          <FormGrid>
            <TextField
              required
              fullWidth
              label="Фамилия, Имя"
              name="sender_name"
              value={formData.sender_name}
              onChange={handleInputChange}
            />
            <TextField
              required
              fullWidth
              label="Телефон"
              name="sender_phone"
              value={formData.sender_phone}
              onChange={handleInputChange}
              helperText="Например: +375291234567"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              helperText="Формат: example@example.com"
            />
          </FormGrid>
        </OrderPaper>

        <OrderPaper>
          <FormControl component="fieldset" fullWidth>
            <FormLabel>Способ получения</FormLabel>
            <RadioGroup
              name="delivery_type"
              value={formData.delivery_type}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="pickup"
                control={<Radio />}
                label="Самовывоз (бесплатно)"
              />
              <FormControlLabel
                value="delivery"
                control={<Radio />}
                label="Доставка (10 руб.)"
              />
            </RadioGroup>
          </FormControl>

          {formData.delivery_type === "delivery" && (
            <DeliveryFormSection>
              <TextField
                required
                fullWidth
                label="Адрес доставки"
                name="delivery_address"
                value={formData.delivery_address}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Этаж"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                fullWidth
                label="Квартира/Офис"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                fullWidth
                label="Имя получателя"
                name="receiver_name"
                value={formData.receiver_name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Телефон получателя"
                name="receiver_phone"
                value={formData.receiver_phone}
                onChange={handleInputChange}
                helperText="Например: +375291234567"
              />
            </DeliveryFormSection>
          )}
        </OrderPaper>

        <OrderPaper>
          <FormControl component="fieldset" fullWidth>
            <FormLabel>Способ оплаты</FormLabel>
            <RadioGroup
              name="payment_method"
              value={formData.payment_method}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Наличными"
              />
              <FormControlLabel
                value="webpay"
                control={<Radio />}
                label="Картой"
              />
            </RadioGroup>
          </FormControl>
        </OrderPaper>

        <OrderPaper>
          <SectionTitle variant="h6">Дополнительная информация</SectionTitle>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Комментарий к заказу"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
        </OrderPaper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <SubmitButton type="submit" fullWidth>
          Оформить заказ
        </SubmitButton>

        <BackButton fullWidth onClick={() => navigate("/cart")}>
          Вернуться в корзину
        </BackButton>
      </form>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Ваш заказ успешно оформлен!
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default CheckoutPage;
