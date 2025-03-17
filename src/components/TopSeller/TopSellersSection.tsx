import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopSellersCard from "./TopSellersCard";
import { useCart } from "../../context/CartContext";
import { ProductType } from "../../types/TopSellersSection.types";
import {
  sectionContainer,
  contentContainer,
  titleStyle,
  gridItemStyle,
} from "./TopSellersSection.styles";
import { getImageUrl } from "../../api/config";
import { getAllProducts } from "../../api/productAPI";

function getRandomProducts(products: ProductType[], count: number) {
  if (products.length <= count) return products;
  return [...products].sort(() => Math.random() - 0.5).slice(0, count);
}

const TopSellersSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const products = await getAllProducts();
        setRandomProducts(getRandomProducts(products, 6));
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
        setError("Не удалось загрузить топ продаж.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
    addItem(product.id, 1, {
      name: product.name,
      price: product.price,
      image: product.media?.[0] || product.image,
    });
  };

  return (
    <Box sx={sectionContainer}>
      <Container disableGutters sx={contentContainer}>
        <Typography variant="h2" sx={titleStyle}>
          Топ продаж
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && randomProducts.length === 0 && (
          <Typography>Нет товаров для отображения.</Typography>
        )}

        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          ref={containerRef}
        >
          {randomProducts.map((product, index) => {
            const imagePath = product.media?.[0] || product.image;
            const imageUrl = getImageUrl(imagePath);

            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={2}
                key={product.id}
                data-index={index}
                sx={gridItemStyle(index, visibleCards)}
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
