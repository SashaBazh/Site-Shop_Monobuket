import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItemText,
  useMediaQuery,
  Badge,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../../context/CartContext";

import {
  MainHeaderContainer,
  NavRightContainer,
  NavLink,
  Logo,
  Placeholder,
  DrawerContainer,
  DrawerCloseButton,
  StyledAppBar,
} from "./MainHeader.styles";

const MainHeader: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const isExtraSmall = useMediaQuery("(max-width:350px)");
  const { cartItems } = useCart();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [, setShowG2Header] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowG2Header(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <StyledAppBar>
        <MainHeaderContainer>
          <Link to="/">
            <Logo src="/assets/images/logo.png" alt="Logo" />
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && (
              <NavRightContainer>
                <NavLink
                  to="/about"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  О нас
                </NavLink>
                <NavLink
                  to="/payment-delivery"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Оплата и доставка
                </NavLink>
                <NavLink
                  to="/contacts"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Контакты
                </NavLink>
                <NavLink
                  to="/catalog"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Каталог
                </NavLink>
              </NavRightContainer>
            )}

            {!isExtraSmall && (
              <IconButton component={Link} to="/cart">
                <Badge badgeContent={totalItems} color="error">
                  <img
                    src="/assets/icons/cart.svg"
                    alt="Cart"
                    style={{ width: "24px", height: "24px" }}
                  />
                </Badge>
              </IconButton>
            )}

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

        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <DrawerContainer>
            <DrawerCloseButton onClick={toggleDrawer}>
              <CloseIcon />
            </DrawerCloseButton>

            <List>
              <ListItemButton
                component={Link}
                to="/about"
                onClick={toggleDrawer}
              >
                <ListItemText primary="О нас" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/payment-delivery"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Оплата и доставка" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/contacts"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Контакты" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/catalog"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Корзина" />
              </ListItemButton>
            </List>
          </DrawerContainer>
        </Drawer>
      </StyledAppBar>

      <Placeholder />
    </>
  );
};

export default MainHeader;
