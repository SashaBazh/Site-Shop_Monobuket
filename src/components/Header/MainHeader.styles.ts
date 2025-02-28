import { styled } from "@mui/material/styles";
import { Box, IconButton, AppBar, List } from "@mui/material";
import { Link } from "react-router-dom";

export const MainHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(1, 2),
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
  height: "50px",
  objectFit: "contain",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    height: "30px",
  },
}));

export const Placeholder = styled(Box)({
  height: "70px",
});

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  elevation: 0,
  backgroundColor: "#dcc7bd",
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

export const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 250,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#dcc7bd",
  height: "100%",
  paddingTop: theme.spacing(2),
  fontWeight: 300,
  marginTop: "50px"
}));

export const DrawerCloseButton = styled(IconButton)(({ theme }) => ({
  alignSelf: "flex-end",
  margin: theme.spacing(2),
}));

export const DrawerList = styled(List)(() => ({
  fontWeight: 300,
}));
