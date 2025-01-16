import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useCart } from "../../context/CartContext";
import BouquetCard from "./BouquetCard";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  media?: string[];
  category_id?: number;
}

const BouquetSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { cartItems, addItem, updateItemQty } = useCart();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await axiosInstance.get<Product[]>("/products/new?limit=6");
        setProducts(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке букетов:", err);
        setError("Не удалось загрузить букеты.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const noHighlight: React.CSSProperties = {
    WebkitTapHighlightColor: "transparent",
    outline: "none",
    cursor: "pointer",
  };

  const handleCardClick = (prodId: number) => {
    navigate(`/product/${prodId}`);
  };

  const handleBuyClick = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateItemQty(product.id, existingItem.quantity + 1);
    } else {
      addItem(product.id, 1);
    }
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#dcc7bd" }}>
      <Container disableGutters sx={{ py: 4, px: 2, textAlign: "center" }}>
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
          Букеты
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && products.length === 0 && (
          <Typography>Нет букетов для отображения.</Typography>
        )}

        <Grid 
          container 
          spacing={2}
          sx={{ 
            justifyContent: "center",
            // Специальные отступы только для мобильных устройств
            [`@media (max-width:600px)`]: {
              columnGap: "16px",
              rowGap: "24px",
              spacing: 0,
              width: "auto",
              margin: "0",
              "& .MuiGrid-item": {
                padding: 0,
                marginLeft: 0,
                marginRight: 0
              }
            }
          }}
        >
          {products.map((product) => {
            const imagePath = product.media?.[0] || product.image;
            const imageUrl = imagePath
              ? `https://course.excellentjewellery.ru/flowers/api/data/image?image_path=${encodeURIComponent(imagePath)}`
              : "https://course.excellentjewellery.ru/flowers/api/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg";

            return (
              <Grid
                item
                xs={5.7}
                sm={4}
                md={2}
                key={product.id}
                style={noHighlight}
                onClick={() => handleCardClick(product.id)}
              >
                <BouquetCard
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

export default BouquetSection;