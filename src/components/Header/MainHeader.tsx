// src/components/Header/MainHeader.tsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useMediaQuery,
  Badge,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import cartIcon from "../../assets/icons/cart.svg";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/images/logo.png"; // Импорт логотипа

// Стили для MainHeader
const MainHeaderContainer = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(1, 2),
}));

const NavRightContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  "@media (max-width:768px)": { // Скрываем навигацию ниже 768px
    display: "none",
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: 350,
  fontSize: "16px",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Logo = styled("img")(({ theme }) => ({
  height: "50px",
  objectFit: "contain",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    height: "30px",
  },
}));

// Стили для LogoutButton
const LogoutButton = styled("button")(({ theme }) => ({
  backgroundColor: "#333", // Тёмный фон
  color: "#fff",
  border: "none",
  padding: theme.spacing(1, 2),
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 350,
  "&:hover": {
    backgroundColor: "#555",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "14px",
    
    padding: theme.spacing(0.5, 1),
    marginTop: theme.spacing(1),
  },
}));

// Стили для Placeholder (отступ под Header)
const Placeholder = styled(Box)(({ theme }) => ({
  height: "70px", // Высота MainHeader. При необходимости скорректируйте
}));

const MainHeader: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const isExtraSmall = useMediaQuery("(max-width:350px)");
  const { cartItems, showAddToCartSnackbar, hideAddToCartSnackbar } = useCart();
  const { isAuthenticated, logout } = useAuth(); // Используем useAuth

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Подсчет общего количества товаров в корзине
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Состояние для G2Header
  const [showG2Header, setShowG2Header] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 100) { // Порог появления G2Header
      setShowG2Header(true);
    } else {
      setShowG2Header(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Основной Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#dcc7bd",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1, // Убедимся, что MainHeader ниже G2Header
        }}
      >
        <MainHeaderContainer>
          {/* Логотип */}
          <Link to="/">
            <Logo src={logo} alt="Logo" />
          </Link>

          {/* Навигация и корзина */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Если НЕ мобильный экран, показываем навигацию */}
            {!isMobile && (
              <NavRightContainer>
                <NavLink to="/about">О нас</NavLink>
                <NavLink to="/payment-delivery">Оплата и доставка</NavLink>
                <NavLink to="/contacts">Контакты</NavLink>
                <NavLink to="/catalog">Каталог</NavLink>
                {/* Logout-кнопка для аутентифицированных пользователей */}
                {isAuthenticated && (
                  <LogoutButton onClick={logout}>
                    Выйти
                  </LogoutButton>
                )}
              </NavRightContainer>
            )}

            {/* Иконка корзины с Badge */}
            {!isExtraSmall && (
              <IconButton component={Link} to="/cart">
                <Badge badgeContent={totalItems} color="secondary">
                  <img
                    src={cartIcon}
                    alt="Cart"
                    style={{ width: "24px", height: "24px" }}
                  />
                </Badge>
              </IconButton>
            )}

            {/* Если мобильный или очень маленький экран, показываем «бургер» */}
            {(isMobile || isExtraSmall) && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </MainHeaderContainer>

        {/* Мобильное меню (Drawer) */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <Box
            sx={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#dcc7bd",
              height: "100%",
              paddingTop: 2,
              fontWeight: 300,
              
              
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={toggleDrawer}
              sx={{ alignSelf: "flex-end", m: 2 }}
              
            >
              <CloseIcon />
            </IconButton>

            <List>
              <ListItem component={Link} to="/about" onClick={toggleDrawer}>
                <ListItemText primary="О нас" />
              </ListItem>
              <ListItem
                component={Link}
                to="/payment-delivery"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Оплата и доставка" />
              </ListItem>
              <ListItem component={Link} to="/contacts" onClick={toggleDrawer}>
                <ListItemText primary="Контакты" />
              </ListItem>
              <ListItem component={Link} to="/catalog" onClick={toggleDrawer}>
                <ListItemText primary="Каталог" />
              </ListItem>
              {/* Logout-кнопка в Drawer для аутентифицированных пользователей */}
              {isAuthenticated && (
                <ListItem button onClick={() => { logout(); toggleDrawer(); }}>
                  <ListItemText primary="Выйти" />
                </ListItem>
              )}
              {/* Иконка корзины перемещается в Drawer только при очень маленьком экране */}
              {isExtraSmall && (
                <ListItem component={Link} to="/cart" onClick={toggleDrawer}>
                  <Badge badgeContent={totalItems} color="secondary">
                    <img
                      src={cartIcon}
                      alt="Cart"
                      style={{ width: "24px", height: "24px", marginRight: 8 }}
                    />
                  </Badge>
                  <ListItemText primary="Корзина" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </AppBar>

      {/* Дополнительный G2Header */}
      {showG2Header && (
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            backgroundColor: "#dcc7bd",
            top: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 2, // Выше MainHeader
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            
            transition: "transform 0.3s ease-in-out",
            transform: showG2Header ? "translateY(0)" : "translateY(-110%)",
          }}
        >
          <MainHeaderContainer>
            {/* Логотип */}
            <Link to="/">
              <Logo src={logo} alt="Logo" />
            </Link>

            {/* Навигация и корзина */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Если НЕ мобильный экран, показываем навигацию */}
              {!isMobile && (
                <NavRightContainer>
                  <NavLink to="/about">О нас</NavLink>
                  <NavLink to="/payment-delivery">Оплата и доставка</NavLink>
                  <NavLink to="/contacts">Контакты</NavLink>
                  <NavLink to="/catalog">Каталог</NavLink>
                  {/* Logout-кнопка для аутентифицированных пользователей */}
                  {isAuthenticated && (
                    <LogoutButton onClick={logout}>
                      Выйти
                    </LogoutButton>
                  )}
                </NavRightContainer>

                
              )}

              {/* Иконка корзины с Badge */}
              {!isExtraSmall && (
                <IconButton component={Link} to="/cart">
                  <Badge badgeContent={totalItems} color="secondary">
                    <img
                      src={cartIcon}
                      alt="Cart"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </Badge>
                </IconButton>
              )}

              {/* Если мобильный или очень маленький экран, показываем «бургер» */}
              {(isMobile || isExtraSmall) && (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </MainHeaderContainer>

          {/* Мобильное меню (Drawer) */}
          <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
            <Box
              sx={{
                width: 250,
                fontWeight: 300,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#dcc7bd",
                height: "100%",
                paddingTop: 2,
                
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={toggleDrawer}
                sx={{ alignSelf: "flex-end", m: 2 }}
              >
                <CloseIcon />
              </IconButton>

              <List>
                <ListItem component={Link} to="/about" onClick={toggleDrawer}>
                  <ListItemText primary="О нас" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/payment-delivery"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Оплата и доставка" />
                </ListItem>
                <ListItem component={Link} to="/contacts" onClick={toggleDrawer}>
                  <ListItemText primary="Контакты" />
                </ListItem>
                <ListItem component={Link} to="/catalog" onClick={toggleDrawer}>
                  <ListItemText primary="Каталог" />
                </ListItem>
                {/* Logout-кнопка в Drawer для аутентифицированных пользователей */}
                {isAuthenticated && (
                  <ListItem button onClick={() => { logout(); toggleDrawer(); }}>
                    <ListItemText primary="Выйти" />
                  </ListItem>
                )}
                {/* Иконка корзины перемещается в Drawer только при очень маленьком экране */}
                {isExtraSmall && (
                  <ListItem component={Link} to="/cart" onClick={toggleDrawer}>
                    <Badge badgeContent={totalItems} color="secondary">
                      <img
                        src={cartIcon}
                        alt="Cart"
                        style={{ width: "24px", height: "24px", marginRight: 8 }}
                      />
                    </Badge>
                    <ListItemText primary="Корзина" />
                  </ListItem>
                )}
              </List>
            </Box>
          </Drawer>
        </AppBar>
      )}

      {/* Отступ под Header, чтобы контент не перекрывался */}
      <Placeholder />

      {/* Уведомление при добавлении товара */}
      <Snackbar
        open={showAddToCartSnackbar}
        autoHideDuration={2000} // Время отображения 2 секунды
        onClose={hideAddToCartSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={hideAddToCartSnackbar} severity="success" sx={{ width: "100%" }}>
          Товар добавлен в корзину!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainHeader;
