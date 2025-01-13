// src/pages/CatalogPage/ProductCard.tsx

import React from "react";
import {
  CardContainer,
  ImageContainer,
  Image,
  Description,
  Price,
  BuyButton,
  CardBottom,
} from "./CardStyle";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;   // путь к файлу
  media?: string[]; // массив путей
}

interface ProductCardProps {
  product: Product;
  onBuy: () => void; // нажатие "Купить"
}

function getImageUrl(path?: string): string {
  if (!path) {
    // fallback
    return "http://localhost:8000/api/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg";
  }
  return `http://localhost:8000/api/data/image?image_path=${encodeURIComponent(path)}`;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const noHighlight: React.CSSProperties = {
    WebkitTapHighlightColor: "transparent",
    outline: "none",
    cursor: "pointer",
  };

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onBuy();
  };

  const mainPath = product.media?.[0] || product.image;
  const finalImg = getImageUrl(mainPath);

  return (
    <CardContainer style={noHighlight}>
      <ImageContainer>
        <Image
          src={finalImg}
          alt={product.name}
          style={noHighlight}
        />
      </ImageContainer>
      <Description>
        {product.name}
      </Description>
      <CardBottom>
        <Price>{product.price} руб.</Price>
        <BuyButton onClick={handleBuy} style={noHighlight}>
          Купить
        </BuyButton>
      </CardBottom>
    </CardContainer>
  );
}
