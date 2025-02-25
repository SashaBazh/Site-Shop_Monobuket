import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import {
  CardContainer,
  ImageContainer,
  Image,
  Description,
  Price,
  BuyButton,
  CardBottom,
} from "./ProductCard.style";
import { ProductCardProps } from "../../types/Product.types";
import { getImageUrl } from "../../api/config";

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const noHighlight: React.CSSProperties = {
    WebkitTapHighlightColor: "transparent",
    outline: "none",
    cursor: "pointer",
  };

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onBuy();
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const mainPath = product.media?.[0] || product.image;
  const finalImg = getImageUrl(mainPath);

  return (
    <>
      <CardContainer style={noHighlight}>
        <ImageContainer>
          <Image src={finalImg} alt={product.name} style={noHighlight} />
        </ImageContainer>
        <Description>{product.name}</Description>
        <CardBottom>
          <Price>{product.price} руб.</Price>
          <BuyButton onClick={handleBuy} style={noHighlight}>
            Купить
          </BuyButton>
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
}