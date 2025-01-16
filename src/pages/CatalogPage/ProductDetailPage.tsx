// src/pages/ProductDetailPage/ProductDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";

import axiosInstance from "../../api/axiosInstance";
import { useCart } from "../../context/CartContext";

// ====== Стили ======
const ProductContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#dcc7bd",
  minHeight: "100vh",
  padding: theme.spacing(4),
  fontFamily: "Roboto, sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingLeft: "5%",
  paddingRight: "5%",
  maxWidth: "1200px",
  margin: "0 auto",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: "600px",
  height: "auto",
  borderRadius: "8px",
  fontWeight: 400,
  objectFit: "cover",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "90%",
    margin: "0 auto",
  },
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, sans-serif",
  fontSize: "50px",
  fontWeight: 300,
  color: "#000",
  marginBottom: "24px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
    textAlign: "center",
  },
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, sans-serif",
  fontSize: "24px",
  fontWeight: 300,
  color: "#000",
  marginBottom: "24px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
    textAlign: "center",
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  width: "200px",
  padding: "16px 24px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 300,
  backgroundColor: "#d6a3a8",
  color: "#000",
  borderRadius: "12px",
  "&:hover": {
    backgroundColor: "#c48c92",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "12px 20px",
    fontSize: "0.9rem",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  width: "200px",
  padding: "16px 24px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 400,
  backgroundColor: "#7C5661",
  color: "#fff",
  borderRadius: "12px",
  "&:hover": {
    backgroundColor: "#5A3C44",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "12px 20px",
    fontSize: "0.9rem",
  },
}));

// ====== Типы ======
interface ProductType {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string; // Абсолютный путь к изображению на сервере (или относительный)
  media?: string[];
  category_id: number;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { cartItems, addItem, updateItemQty } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [errorRelated, setErrorRelated] = useState<string | null>(null);

  // Прокрутка страницы наверх при смене ID
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Загрузка информации о товаре
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        // 1) Запрашиваем детальную информацию о товаре
        const res = await axiosInstance.get<ProductType>(`/products/${id}`);
        setProduct(res.data);

        // 2) Загружаем "Похожие товары"
        if (res.data.category_id) {
          setLoadingRelated(true);
          try {
            const catId = res.data.category_id;
            // Увеличиваем лимит до 5 для обеспечения достаточного количества товаров после фильтрации
            const relatedRes = await axiosInstance.get<ProductType[]>(
              `/products/category/${catId}?limit=5`
            );
            // Исключаем текущий товар
            const filtered = relatedRes.data.filter(
              (p) => p.id !== res.data.id
            );
            // Ограничиваем до 4 товаров
            setRelatedProducts(filtered.slice(0, 4));
          } catch (err) {
            console.error("Ошибка при загрузке похожих товаров:", err);
            setErrorRelated("Не удалось загрузить похожие товары.");
          } finally {
            setLoadingRelated(false);
          }
        }
      } catch (err) {
        console.error("Ошибка при загрузке товара:", err);
        setError("Товар не найден или ошибка на сервере.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Узнаём, сколько уже в корзине
  const cartQuantity =
    cartItems.find((item) => item.id === product?.id)?.quantity || 0;

  // Формируем URL для главной картинки
  // Если ни media, ни image нет — подставляем путь к картинке по умолчанию
  let mainImageUrl =
    "https://course.excellentjewellery.ru/flowers/api/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg";

  if (product?.media?.[0]) {
    mainImageUrl = `https://course.excellentjewellery.ru/flowers/api/data/image?image_path=${encodeURIComponent(
      product.media[0]
    )}`;
  } else if (product?.image) {
    mainImageUrl = `https://course.excellentjewellery.ru/flowers/api/data/image?image_path=${encodeURIComponent(
      product.image
    )}`;
  }

  // ====== Обработчики ======
  // Добавить в корзину (+1)
  function handleAddToCart() {
    if (!product) return;
    const existingItem = cartItems.find((i) => i.id === product.id);
    if (existingItem) {
      // Увеличиваем qty
      updateItemQty(product.id, existingItem.quantity + 1);
    } else {
      addItem(product.id, 1);
    }
  }

  // Купить сейчас => +1 и переход в корзину
  function handleBuyNow() {
    if (!product) return;
    const existingItem = cartItems.find((i) => i.id === product.id);
    if (existingItem) {
      updateItemQty(product.id, existingItem.quantity + 1);
    } else {
      addItem(product.id, 1);
    }
    navigate("/cart");
  }

  // Клик по похожим товарам
  function handleRelatedClick(prodId: number) {
    navigate(`/product/${prodId}`);
    window.scrollTo(0, 0);
  }

  // ====== Рендер ======
  if (loading) {
    return (
      <>
        <MainHeader />
        <SubHeader />
        <ProductContainer>
          <CircularProgress />
        </ProductContainer>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <MainHeader />
        <SubHeader />
        <ProductContainer>
          <Alert severity="error">{error}</Alert>
        </ProductContainer>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <MainHeader />
        <SubHeader />
        <ProductContainer>
          <Typography>Товар не найден</Typography>
        </ProductContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainHeader />
      <SubHeader />

      <ProductContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* Картинка товара */}
          <ImageContainer>
            <ProductImage src={mainImageUrl} alt={product.name} />
          </ImageContainer>

          {/* Описание товара */}
          <Box sx={{ flex: 2 }}>
            <ProductTitle>{product.name}</ProductTitle>

            <ProductDescription>
              {product.price} руб.{" "}
              {cartQuantity > 0 && `(В корзине: ${cartQuantity})`}
            </ProductDescription>

            <ProductDescription>
              {product.description ||
                "Описание отсутствует. Композиции создаём индивидуально под ваш заказ, чтобы цветы были свежими..."}
            </ProductDescription>

            {/* Блок кнопок */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                alignItems: "center",
                justifyContent: "flex-start",
                mt: 3,
              }}
            >
              <PrimaryButton variant="contained" onClick={handleBuyNow}>
                Купить
              </PrimaryButton>
              <PrimaryButton variant="contained" onClick={handleAddToCart}>
                Добавить в корзину
              </PrimaryButton>

              <SecondaryButton
                variant="contained"
                sx={{
                  marginLeft: { xs: 0, md: "auto" },
                }}
                onClick={() =>
                  (window.location.href =
                    "https://www.instagram.com/monobuket_by_mk/")
                }
              >
                Связаться с нами
              </SecondaryButton>
            </Box>
          </Box>
        </Box>

        {/* Похожие товары */}
        <Box sx={{ mt: 6, width: "100%" }}>
        <Typography
                variant="body1"
                sx={{
                  marginBottom: "10px",
                  fontWeight: 300,
                  fontSize: "36px",
                  padding: "10px",
                  "@media (max-width: 600px)": {
                    fontSize: "36px", // Шрифт для экранов меньше 600px
                  },
                }}>Похожие товары </Typography>
    
          

          {loadingRelated ? (
            <CircularProgress />
          ) : errorRelated ? (
            <Alert severity="error">{errorRelated}</Alert>
          ) : relatedProducts.length === 0 ? (
            <Typography>Нет похожих товаров.</Typography>
          ) : (
            <Grid container spacing={2}>
            {relatedProducts.map((r) => {
              let relatedImageUrl =
                "https://course.excellentjewellery.ru/flowers/api/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg";
              if (r.media?.[0]) {
                relatedImageUrl = `https://course.excellentjewellery.ru/flowers/api/data/image?image_path=${encodeURIComponent(
                  r.media[0]
                )}`;
              } else if (r.image) {
                relatedImageUrl = `https://course.excellentjewellery.ru/flowers/api/data/image?image_path=${encodeURIComponent(
                  r.image
                )}`;
              }
          
              const relatedCartItem = cartItems.find((i) => i.id === r.id);
          
              const handleRelatedBuy = (evt: React.MouseEvent) => {
                evt.stopPropagation();
                if (relatedCartItem) {
                  updateItemQty(r.id, relatedCartItem.quantity + 1);
                } else {
                  addItem(r.id, 1);
                }
              };
          
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={r.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { boxShadow: 4 },
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                  onClick={() => handleRelatedClick(r.id)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      backgroundColor: "#dcc7bd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      maxWidth: "400px", // Фиксированная ширина карточки
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={relatedImageUrl}
                      alt={r.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Box sx={{ p: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "1.5rem", // Размер шрифта
                          fontWeight: 100, // Очень тонкий шрифт
                          mb: 1,
                        }}
                      >
                        {r.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#555",
                          fontWeight: 100, // Тонкий шрифт для описания
                          fontSize: "0.9rem",
                        }}
                      >
                        {r.description?.slice(0, 60)}...
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        borderTop: "1px solid #7c5661",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 200, // Тонкий шрифт для цены
                          fontSize: "1rem",
                        }}
                      >
                        {r.price} руб.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#443C41",
                          color: "#fff",
                          fontSize: "0.85rem",
                          fontWeight: 200,
                          "&:hover": {
                            backgroundColor: "#333",
                          },
                        }}
                        onClick={handleRelatedBuy}
                      >
                        Купить
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          
          )}
        </Box>
      </ProductContainer>

      <Footer />
    </>
  );
}
