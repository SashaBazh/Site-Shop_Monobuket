import { styled } from "@mui/material/styles";
import { Box, IconButton, List } from "@mui/material";
import { Link } from "react-router-dom";

export const MainHeaderContainer = styled(Box)(({ theme }) => ({
  position: "fixed", // Фиксированное положение
  top: 0, // Прикрепляем к верхней части
  left: 0,
  width: "100%", // Растягиваем на всю ширину
  zIndex: 1000, // Делаем поверх остальных элементов
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#dcc7bd", // Фон, чтобы не просвечивал контент под ним
  padding: theme.spacing(1, 2),
  // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Легкая тень
}));



export const NavRightContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  "@media (max-width:768px)": {
    display: "none",
  },
}));

export const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: 350,
  fontSize: "16px",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const Logo = styled("img")(({ theme }) => ({
  height: "46px",
  objectFit: "contain",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    height: "30px",
  },
}));

export const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 250,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#dcc7bd",
  height: "100%",
  paddingTop: theme.spacing(2),
  fontWeight: 300,

}));

export const DrawerCloseButton = styled(IconButton)(({ theme }) => ({
  alignSelf: "flex-end",
  margin: theme.spacing(2),
}));

export const DrawerList = styled(List)(() => ({
  fontWeight: 300,
}));
