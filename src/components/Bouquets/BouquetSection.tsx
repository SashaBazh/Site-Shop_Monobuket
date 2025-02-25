import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import BouquetCard from "./BouquetCard";
import { Product } from "../../types/Product.types";
import {
  containerStyle,
  headerStyle,
  gridContainerStyle,
} from "./BouquetSection.styles";
import { getImageUrl } from "../../api/config";
import { getNewProducts } from "../../api/productAPI";

const BouquetSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await getNewProducts();
        setProducts(res);
      } catch {
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
    addItem(product.id, 1, {
      name: product.name,
      price: product.price,
      image: product.media?.[0] || product.image,
    });
  };

  return (
    <Box sx={containerStyle}>
      <Container disableGutters sx={{ py: 4, px: 2, textAlign: "center" }}>
        <Typography variant="h2" sx={headerStyle}>
          Букеты
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && products.length === 0 && (
          <Typography>Нет букетов для отображения.</Typography>
        )}

        <Grid container spacing={2} sx={gridContainerStyle}>
          {products.map((product) => {
            const imagePath = product.media?.[0] || product.image;
            const imageUrl = getImageUrl(imagePath);

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
