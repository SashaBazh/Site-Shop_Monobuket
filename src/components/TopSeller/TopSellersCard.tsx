import React, { useState } from "react";
import {
  CardContainer,
  Image,
  Description,
  Price,
  BuyButton,
  CardBottom,
} from "./TopSellersCard.styles";
import { Snackbar, Alert } from "@mui/material";
import { TopSellersCardProps } from "../../types/TopSellersCard.types";

const TopSellersCard: React.FC<TopSellersCardProps> = ({
  img,
  desc,
  price,
  onCardClick,
  onBuyClick,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onBuyClick();
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <CardContainer onClick={onCardClick}>
        <Image src={img} alt="top-seller" />
        <Description>{desc}</Description>
        <CardBottom>
          <Price>{price}</Price>
          <BuyButton onClick={handleBuyClick}>Купить</BuyButton>
        </CardBottom>
      </CardContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Товар добавлен в корзину!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TopSellersCard;
