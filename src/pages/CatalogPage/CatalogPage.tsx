import React, { useState, useMemo, useEffect, useRef } from "react";
import { Grid, Alert, CircularProgress, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

import { getAllProducts, getProductsByCategory } from "../../api/productAPI";
import { useCart } from "../../context/CartContext";
import { Category } from "../../types/Category.types";
import { Product } from "../../types/Product.types";

import {
  CatalogContainer,
  CatalogTitle,
  LoaderContainer,
  ErrorContainer,
  PaginationContainer,
  StyledPagination,
  AlertStyles,
  SnackbarPosition
} from "./CatalogPage.styles";

export default function CatalogPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const { addItem, cartItems, updateItemQty } = useCart();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [bouquetTypes, setBouquetTypes] = useState<string[]>([]);
  const [showAddMessage, setShowAddMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Загрузить все категории
        const catRes = await getProductsByCategory(0); // Загрузить все категории
        const categories = Array.isArray(catRes) ? catRes : [];
        setCategories(categories);
        setBouquetTypes(categories.map((c) => c.name));
        
        // Загрузить товары по выбранной категории
        if (selectedCategory) {
          const fetchCategoryProducts = async () => {
            try {
              // Получаем товары по ID категории
              const data = await getProductsByCategory(selectedCategory);
              setAllProducts(data); // Сохраняем товары в состояние
            } catch (error) {
              console.error("Ошибка при загрузке товаров по категории:", error);
              setError("Не удалось загрузить товары по выбранной категории.");
            }
          };
          fetchCategoryProducts();
        } else {
          // Если категория не выбрана, можно загрузить все товары
          const data = await getAllProducts();
          setAllProducts(data); // Загружаем все товары, если категория не выбрана
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setError("Произошла ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedCategory]); // Этот useEffect сработает, когда selectedCategory изменится

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const nameLower = product.name.toLowerCase();
      const searchLower = searchValue.toLowerCase();
      const matchesSearch = nameLower.includes(searchLower);
  
      let matchesCategory = true;
      if (selectedCategory) {
        const catObj = categories.find((cat) => cat.id === selectedCategory); // Ищем категорию по числовому id
        if (catObj) {
          matchesCategory = product.category_id === catObj.id;
        }
      }
  
      const [minP, maxP] = priceRange;
      const matchesPrice = product.price >= minP && product.price <= maxP;
  
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [allProducts, categories, searchValue, selectedCategory, priceRange]);
  
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortBy === "по возрастанию") {
      arr.sort((a, b) => a.price - b.price);
    } else if (sortBy === "по убыванию") {
      arr.sort((a, b) => b.price - a.price);
    }
    return arr;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, priceRange, sortBy, selectedCategory]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (prodId: number) => {
    navigate(`/product/${prodId}`);
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem) {
      updateItemQty(product.id, cartItem.quantity + 1);
    } else {
      addItem(product.id, 1, {
        name: product.name,
        price: product.price,
        image: product.media?.[0] || product.image,
      });
    }
    setShowAddMessage(true);
    setTimeout(() => setShowAddMessage(false), 1500);
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setPriceRange([0, 9999]);
    setSortBy("");
    setSelectedCategory(null); // передаем null для сброса категории
    navigate("/catalog", { replace: true });
  };
  

  return (
    <>
      <MainHeader />
      <SubHeader />

      <CatalogContainer ref={containerRef}>
        <CatalogTitle variant="h2">
          Каталог
        </CatalogTitle>

        <FilterPanel
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          bouquetTypes={bouquetTypes}
          onClearFilters={handleClearFilters}
        />

        {loading ? (
          <LoaderContainer>
            <CircularProgress />
          </LoaderContainer>
        ) : error ? (
          <ErrorContainer>
            <Alert severity="error">{error}</Alert>
          </ErrorContainer>
        ) : (
          <Grid container spacing={2} columns={20}>
            {paginatedProducts.map((product) => (
              <Grid item key={product.id} xs={10} sm={10} md={5} lg={4} onClick={() => handleCardClick(product.id)}>
                <ProductCard
                  product={product}
                  onBuy={() => handleAddToCart(product)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && !error && paginatedProducts.length > 0 && totalPages > 1 && (
          <PaginationContainer>
            <StyledPagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </PaginationContainer>
        )}
      </CatalogContainer>

      <Footer />

      <Snackbar
        open={showAddMessage}
        onClose={() => setShowAddMessage(false)}
        autoHideDuration={1500}
        anchorOrigin={SnackbarPosition}
      >
        <Alert
          onClose={() => setShowAddMessage(false)}
          severity="success"
          sx={AlertStyles}
        >
          Товар добавлен в корзину!
        </Alert>
      </Snackbar>
    </>
  );
}
