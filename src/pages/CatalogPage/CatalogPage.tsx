// src/pages/CatalogPage/CatalogPage.tsx

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  ChangeEvent,
} from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Chip,
  Pagination,
  Alert,
  CircularProgress,
  TextField,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSearchParams, useNavigate } from "react-router-dom";

import MainHeader from "../../components/Header/MainHeader";
import SubHeader from "../../components/Header/SubHeader";
import Footer from "../../components/Footer/Footer";

import axiosInstance from "../../api/axiosInstance";
import ProductCard, { Product } from "./ProductCard";
import { useCart } from "../../context/CartContext";

import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

// Интерфейс для категорий (пример)
interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

// Стили обёртки каталога
const CatalogContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#dcc7bd",
  minHeight: "100vh",
  padding: theme.spacing(4, 2),
  [theme.breakpoints.up("lg")]: {
    // На больших экранах чуть больше отступ, если хотите
    padding: theme.spacing(4, 6),
  },
}));

export default function CatalogPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Фильтры/поиск
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // URL-параметры
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "";

  // Пагинация
  // Пагинация
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(15); // Дефолтное значение

// Обработчик изменения ширины экрана
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setItemsPerPage(14); // На мобильных экранах
    } else {
      setItemsPerPage(15); // На десктопе
    }
  };

  // Устанавливаем начальное значение при загрузке
  handleResize();

  // Подписываемся на изменение размера окна
  window.addEventListener("resize", handleResize);

  // Убираем подписку при размонтировании компонента
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  // Корзина
  const { addItem, cartItems, updateItemQty } = useCart();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Меню (цена, сорт, категория)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = useState<"price" | "sort" | "category">();
  const open = Boolean(anchorEl);

  // Опции для фильтра цены
  const priceOptions = [
    { label: "0-9999 руб.", value: "0-9999" },
    { label: "700-1200 руб.", value: "700-1200" },
    { label: "120-300 руб.", value: "120-300" },
  ];

  // Опции для сортировки
  const sortOptions = [
    { label: "По возрастанию цены", value: "priceAsc" },
    { label: "По убыванию цены", value: "priceDesc" },
  ];

  // Для списка категорий (названия)
  const [bouquetTypes, setBouquetTypes] = useState<string[]>([]);

  // Состояние для показа всплывающего уведомления «Товар добавлен»
  const [showAddMessage, setShowAddMessage] = useState(false);

  // ---------------- Загрузка данных (товары + категории) ----------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1) Загружаем категории
        const catRes = await axiosInstance.get<Category[]>("/products/category");
        setCategories(catRes.data);
        // Преобразуем в массив строк (названия категорий)
        setBouquetTypes(catRes.data.map((c) => c.name));

        // 2) Загружаем все товары (category_id=0 => "все")
        const limit = 200;
        const prodRes = await axiosInstance.get<Product[]>(
          `/products/category/0?limit=${limit}`
        );
        setAllProducts(prodRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке товаров/категорий:", err);
        setError("Ошибка при загрузке товаров/категорий");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // При изменении categoryFromUrl сбрасываем некоторые состояния
  useEffect(() => {
    if (categoryFromUrl) {
      setSearchValue("");
      setPriceRange([0, 9999]);
      setSortBy("");
      setSelectedCategory(categoryFromUrl);
      setCurrentPage(1);
    }
  }, [categoryFromUrl]);

  // ---------------- Фильтрация ----------------
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Поиск
      const nameLower = product.name.toLowerCase();
      const searchLower = searchValue.toLowerCase();
      const matchesSearch = nameLower.includes(searchLower);

      // Категория из URL
      let matchesCategoryFromUrl = true;
      if (categoryFromUrl) {
        const catObj = categories.find((cat) => cat.name === categoryFromUrl);
        if (catObj) {
          matchesCategoryFromUrl = product.category_id === catObj.id;
        }
      }

      // Выбранная категория (в выпадающем)
      let matchesSelectedCategory = true;
      if (selectedCategory) {
        const catObj = categories.find((cat) => cat.name === selectedCategory);
        if (catObj) {
          matchesSelectedCategory = product.category_id === catObj.id;
        }
      }

      // Цена
      const [minP, maxP] = priceRange;
      const matchesPrice = product.price >= minP && product.price <= maxP;

      return (
        matchesSearch &&
        matchesCategoryFromUrl &&
        matchesSelectedCategory &&
        matchesPrice
      );
    });
  }, [
    allProducts,
    categories,
    searchValue,
    categoryFromUrl,
    selectedCategory,
    priceRange,
  ]);

  // ---------------- Сортировка ----------------
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortBy === "priceAsc") {
      arr.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      arr.sort((a, b) => b.price - a.price);
    }
    return arr;
  }, [filteredProducts, sortBy]);

  // ---------------- Пагинация ----------------
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // При изменении фильтров -> сбрасываем на стр.1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, priceRange, sortBy, selectedCategory]);

  // ------------ Меню --------------
  const handleMenuOpen =
    (type: "price" | "sort" | "category") =>
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setMenuType(type);
    };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType(undefined);
  };

  const handleMenuItemClick = (value: string) => {
    if (menuType === "price") {
      const [minStr, maxStr] = value.split("-");
      setPriceRange([Number(minStr), Number(maxStr)]);
    } else if (menuType === "sort") {
      setSortBy(value);
    } else if (menuType === "category") {
      setSelectedCategory(value);
    }
    handleMenuClose();
  };

  // Сброс фильтров
  function handleClearFilters() {
    setSearchValue("");
    setPriceRange([0, 9999]);
    setSortBy("");
    setSelectedCategory("");
    setCurrentPage(1);
  }

  // Пагинация
  function handlePageChange(_event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value);
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }

  // Клик по карточке -> деталь
  function handleCardClick(prodId: number) {
    navigate(`/product/${prodId}`);
  }

  // Убираем «синюю подсветку» при клике
  const noHighlight: React.CSSProperties = {
    WebkitTapHighlightColor: "transparent",
    outline: "none",
    cursor: "pointer",
  };

  // При добавлении товара — показать всплывающее уведомление
  const handleAddToCart = (productId: number) => {
    // Проверяем, есть ли товар уже в корзине
    const cartItem = cartItems.find((item) => item.id === productId);
    if (cartItem) {
      // Если есть, обновляем количество на +1
      updateItemQty(productId, cartItem.quantity + 1);
    } else {
      // Если нет, добавляем с количеством 1
      addItem(productId, 1);
    }

    // Показываем уведомление на 1.5 секунды
    setShowAddMessage(true);
    setTimeout(() => {
      setShowAddMessage(false);
    }, 1500);
  };

  return (
    <>
      <MainHeader />
      <SubHeader />

      <CatalogContainer ref={containerRef}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 4, fontSize: "2.5rem", fontWeight: 300 }}
        >
          Каталог
        </Typography>

        {/* Блок фильтров */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Столбец на мобильных, строка на больших экранах
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 2, sm: 2 },
            mb: 2,
          }}
        >
          {/* Строка поиска */}
          <Box
  sx={{
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 2,
    p: { xs: 0.5, sm: 1 },
    flex: 1,
    minWidth: { xs: "100%", sm: "200px" }, // Полная ширина на мобильных
  }}
>
  {/* Значок поиска с отступом */}
  <SearchIcon fontSize="small" sx={{ ml: 1.5 }} /> {/* Добавлен отступ */}
  <TextField
    variant="outlined"
    placeholder="Поиск..."
    value={searchValue}
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(e.target.value)
    }
    InputProps={{
      startAdornment: null,
      // Убираем подчеркивание, используя стили
      disableUnderline: true,
    }}
    sx={{
      flex: 1,
      border: "none",
      "& .MuiOutlinedInput-root": {
        padding: 0,
        "& fieldset": {
          border: "none",
        },
      },
      ml: -0.5,
      fontSize: { xs: "0.8rem", sm: "1rem" },
    }}
  />
</Box>


          {/* Строка фильтров и сброса */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: { xs: "space-between", sm: "flex-start" },
              gap: { xs: 1, sm: 2 },
              flexWrap: "nowrap",
              overflowX: { xs: "auto", sm: "visible" }, // Горизонтальная прокрутка на мобильных
              width: { xs: "100%", sm: "auto" }, // Полная ширина на мобильных
            }}
          >
            {/* Иконки меню фильтров */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
                flexShrink: 0,
              }}
            >
              <Tooltip title="Фильтр по цене">
                <IconButton
                  onClick={handleMenuOpen("price")}
                  color="primary"
                  size="small"
                >
                  <AttachMoneyIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Сортировка">
                <IconButton
                  onClick={handleMenuOpen("sort")}
                  color="primary"
                  size="small"
                >
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Фильтр по категориям">
                <IconButton
                  onClick={handleMenuOpen("category")}
                  color="primary"
                  size="small"
                >
                  <LocalFloristIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Кнопка сброса фильтров */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexShrink: 0,
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  
                  backgroundColor: "#65293E",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: 300,
                  
                  "&:hover": {
                    backgroundColor: "#531E31",
                  },
                  fontSize: { xs: "0.7rem", sm: "1rem" }, // Уменьшен размер шрифта на мобильных
                  padding: { xs: "4px 8px", sm: "6px 12px" }, // Уменьшены отступы на мобильных
                }}
                onClick={handleClearFilters}
              >
                Сбросить фильтры
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Активные фильтры */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {searchValue && <Chip label={`Поиск: ${searchValue}`} />}
          {selectedCategory && <Chip label={`Категория: ${selectedCategory}`} />}
          {(priceRange[0] !== 0 || priceRange[1] !== 9999) && (
            <Chip label={`Цена: ${priceRange[0]}-${priceRange[1]} руб.`} />
          )}
          {sortBy && <Chip label={`Сортировка: ${sortBy}`} />}
        </Box>

        {/* Меню (цена/сорт/категория) */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {menuType === "price" &&
            priceOptions.map((option) => (
              <MenuItem
                key={option.value}
                selected={`${priceRange[0]}-${priceRange[1]}` === option.value}
                onClick={() => handleMenuItemClick(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}

          {menuType === "sort" &&
            sortOptions.map((option) => (
              <MenuItem
                key={option.value}
                selected={sortBy === option.value}
                onClick={() => handleMenuItemClick(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}

          {menuType === "category" &&
            bouquetTypes.map((type) => (
              <MenuItem
                key={type}
                selected={selectedCategory === type}
                onClick={() => handleMenuItemClick(type)}
              >
                {type}
              </MenuItem>
            ))}
        </Menu>

        {/* Основная часть каталога */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : (
          // columns={20} => позволяет 5 карточек по 4 'единицы' на lg экранах
          <Grid container spacing={2} columns={20}>
            {paginatedProducts.map((product) => (
              // xs=10 => 2 в ряд на XS
              // sm=10 => 2 в ряд на SM
              // md=5  => 4 в ряд на MD
              // lg=4  => 5 в ряд на LG
              <Grid
                item
                key={product.id}
                xs={10}
                sm={10}
                md={5}
                lg={4}
                style={noHighlight}
                onClick={() => handleCardClick(product.id)}
              >
                <ProductCard
                  product={product}
                  // При нажатии "Купить" добавляем +1 к количеству товара
                  onBuy={() => handleAddToCart(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Пагинация */}
        {!loading && !error && paginatedProducts.length > 0 && totalPages > 1 && (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
         <Pagination
           count={totalPages}
           page={currentPage}
           onChange={handlePageChange}
           shape="rounded"
           showFirstButton
           showLastButton
           sx={{
             "& .MuiPaginationItem-root": {
              
              
               color: "#333333", // Тёмный цвет текста для невыбранных страниц
               borderRadius: "50%",
               "&:hover": {
                 backgroundColor: "#ссс", // Лёгкий фон при наведении
               },
             },
             "& .MuiPaginationItem-root.Mui-selected": {
               backgroundColor: "#65293E", // Цвет фона для выбранной страницы
               color: "#FFFFFF", // Белый текст для выбранной страницы
               "&:hover": {
                 backgroundColor: "#531E31",
               },
             },
           }}
         />
       </Box>
       
        )}
      </CatalogContainer>

      <Footer />

      {/* Всплывающее уведомление "Товар добавлен" */}
      <Snackbar
        open={showAddMessage}
        onClose={() => setShowAddMessage(false)}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAddMessage(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Товар добавлен в корзину!
        </Alert>
      </Snackbar>
    </>
  );
}