// src/components/TopSeller/TopSellersSection.tsx

import React, { useEffect, useState, useRef } from "react";
import { Box, Container, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopSellersCard from "./TopSellersCard";
import axiosInstance from "../../api/axiosInstance";
import { useCart } from "../../context/CartContext";

interface ProductType {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;   // Абсолютный путь к изображению на сервере
  media?: string[]; // Массив путей к изображениям
  category_id?: number;
}

function getRandomProducts(products: ProductType[], count: number) {
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const TopSellersSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { cartItems, addItem, updateItemQty } = useCart();

  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1) Загружаем все товары
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await axiosInstance.get<ProductType[]>("/products/category/0?limit=100");
        setAllProducts(res.data);
      } catch (error) {
        console.error("Ошибка при загрузке всех товаров:", error);
        setError("Не удалось загрузить топ продаж.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2) Берём 6 случайных
  useEffect(() => {
    if (allProducts.length > 0) {
      const sixRandom = getRandomProducts(allProducts, 6);
      setRandomProducts(sixRandom);
    }
  }, [allProducts]);

  // Анимация появления карточек
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !visibleCards.includes(index)) {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = containerRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [visibleCards, randomProducts]);

  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleBuyClick = (product: ProductType) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateItemQty(product.id, existingItem.quantity + 1);
    } else {
      addItem(product.id, 1);
    }
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#E2DCD3" }}>
      <Container
        disableGutters
        sx={{
          py: 5,
          px: 4,
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
            fontSize: "3.5rem",
            color: "#000",
            mb: 4,
          }}
        >
          Топ продаж
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && randomProducts.length === 0 && (
          <Typography>Нет товаров для отображения.</Typography>
        )}

        <Grid container spacing={2} justifyContent="space-between" ref={containerRef}>
          {randomProducts.map((product, index) => {
            // Определяем путь к изображению
            const imagePath = product.media?.[0] || product.image;
            // Формируем URL для изображения
            const imageUrl = imagePath
              ? `http://localhost:8000/api/data/image?image_path=${encodeURIComponent(imagePath)}`
              : "http://localhost:8000/api/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg";

            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={2}
                key={product.id}
                data-index={index}
                sx={{
                  opacity: visibleCards.includes(index) ? 1 : 0,
                  transform: visibleCards.includes(index)
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                  transitionDelay: `${index * 0.1}s`,
                  cursor: "pointer",
                }}
              >
                <TopSellersCard
                  img={imageUrl}
                  desc={product.name}
                  price={`${product.price} руб.`}
                  onCardClick={() => handleCardClick(product.id)}
                  onBuyClick={() => handleBuyClick(product)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopSellersSection;
