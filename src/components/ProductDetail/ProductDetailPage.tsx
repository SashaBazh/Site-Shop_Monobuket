import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, CircularProgress, Grid, Typography } from "@mui/material";

import MainHeader from "../Header/MainHeader";
import SubHeader from "../Header/SubHeader";
import Footer from "../Footer/Footer";

import { getProductDetail, getProductsByCategory } from "../../api/productAPI";
import { useCart } from "../../context/CartContext";
import { getImageUrl } from "../../api/config";
import { Product } from "../../types/Product.types";

import {
  ProductContainer,
  ImageContainer,
  ProductImage,
  ProductTitle,
  ProductDescription,
  PrimaryButton,
  SecondaryButton,
  ProductDetailsContainer,
  ProductInfoContainer,
  ButtonsContainer,
  RelatedProductsContainer,
  RelatedProductsTitle,
  RelatedProductCard,
  RelatedProductImage,
  RelatedProductInfo,
  RelatedProductName,
  RelatedProductDescription,
  RelatedProductFooter,
  RelatedProductPrice,
  RelatedProductBuyButton,
} from "./ProductDetailPage.styles";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartItems, addItem, updateItemQty } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [errorRelated, setErrorRelated] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchProductAndRelated = async () => {
      setLoading(true);
      setError(null);

      try {
        const productData = await getProductDetail(Number(id));
        setProduct(productData);

        if (productData.category_id) {
          setLoadingRelated(true);
          try {
            const relatedProducts = await getProductsByCategory(productData.category_id);
            const filtered = relatedProducts
              .filter((p: { id: unknown; }) => p.id !== productData.id)
              .slice(0, 4);
            setRelatedProducts(filtered);
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
    };

    fetchProductAndRelated();
  }, [id]);

  const cartQuantity = cartItems.find((item) => item.id === product?.id)?.quantity || 0;
  const mainImageUrl = getImageUrl(product?.media?.[0] || product?.image);

  const handleAddToCart = () => {
    if (!product) return;
    const existingItem = cartItems.find((i) => i.id === product.id);
    if (existingItem) {
      updateItemQty(product.id, existingItem.quantity + 1);
    } else {
      addItem(product.id, 1, {
        name: product.name,
        price: product.price,
        image: product.media?.[0] || product.image,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleRelatedClick = (prodId: number) => {
    navigate(`/product/${prodId}`);
    window.scrollTo(0, 0);
  };

  const handleRelatedBuy = (r: Product) => (evt: React.MouseEvent) => {
    evt.stopPropagation();
    const relatedCartItem = cartItems.find((i) => i.id === r.id);
    if (relatedCartItem) {
      updateItemQty(r.id, relatedCartItem.quantity + 1);
    } else {
      addItem(r.id, 1, {
        name: r.name,
        price: r.price,
        image: r.media?.[0] || r.image,
      });
    }
  };

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
        <ProductDetailsContainer>
          <ImageContainer>
            <ProductImage src={mainImageUrl} alt={product.name} />
          </ImageContainer>

          <ProductInfoContainer>
            <ProductTitle>{product.name}</ProductTitle>

            <ProductDescription>
              {product.price} руб.{" "}
              {cartQuantity > 0 && `(В корзине: ${cartQuantity})`}
            </ProductDescription>

            <ProductDescription>
              {product.description ||
                "Описание отсутствует. Композиции создаём индивидуально под ваш заказ, чтобы цветы были свежими..."}
            </ProductDescription>

            <ButtonsContainer>
              <PrimaryButton variant="contained" onClick={handleBuyNow}>
                Купить
              </PrimaryButton>
              <PrimaryButton variant="contained" onClick={handleAddToCart}>
                Добавить в корзину
              </PrimaryButton>
              <SecondaryButton
                variant="contained"
                onClick={() => window.location.href = "https://www.instagram.com/monobuket_by_mk/"}
              >
                Связаться с нами
              </SecondaryButton>
            </ButtonsContainer>
          </ProductInfoContainer>
        </ProductDetailsContainer>

        <RelatedProductsContainer>
          <RelatedProductsTitle>Похожие товары</RelatedProductsTitle>

          {loadingRelated ? (
            <CircularProgress />
          ) : errorRelated ? (
            <Alert severity="error">{errorRelated}</Alert>
          ) : relatedProducts.length === 0 ? (
            <Typography>Нет похожих товаров.</Typography>
          ) : (
            <Grid container spacing={2}>
              {relatedProducts.map((r) => (
                <Grid item xs={12} sm={6} md={3} key={r.id}>
                  <RelatedProductCard onClick={() => handleRelatedClick(r.id)}>
                    <RelatedProductImage
                      src={getImageUrl(r.media?.[0] || r.image)}
                      alt={r.name}
                    />
                    <RelatedProductInfo>
                      <RelatedProductName>{r.name}</RelatedProductName>
                      <RelatedProductDescription>
                        {r.description?.slice(0, 60)}...
                      </RelatedProductDescription>
                    </RelatedProductInfo>
                    <RelatedProductFooter>
                      <RelatedProductPrice>
                        {r.price} руб.
                      </RelatedProductPrice>
                      <RelatedProductBuyButton
                        onClick={handleRelatedBuy(r)}
                        variant="contained"
                      >
                        Купить
                      </RelatedProductBuyButton>
                    </RelatedProductFooter>
                  </RelatedProductCard>
                </Grid>
              ))}
            </Grid>
          )}
        </RelatedProductsContainer>
      </ProductContainer>
      <Footer />
    </>
  );
}