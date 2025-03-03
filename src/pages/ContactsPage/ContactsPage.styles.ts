import { createTheme, styled } from "@mui/material/styles";
import { Box, Typography, Link } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#dcc7bd",
    },
    text: {
      primary: "#000",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h2: {
      fontSize: "36px",
      fontWeight: 300,
    },
  },
});

export const PageContainer = styled(Box)(() => ({
  backgroundColor: "#dcc7bd",
  width: "100%",
  minHeight: "100vh",
  overflowX: "hidden",
}));

export const ContactContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#dcc7bd",
  textAlign: "center",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowX: "hidden",
  color: theme.palette.text.primary,
}));

export const ContentWrapper = styled(Box)(() => ({
  maxWidth: "1200px",
  width: "100%",
  padding: "20px",
  boxSizing: "border-box",
  overflow: "hidden",
  "@media (max-width: 768px)": {
    padding: "20px 15px",
  },
}));

export const SectionTitle = styled(Typography)(() => ({
  margin: "20px 0",
  fontSize: "50px",
  fontWeight: 300,
  "@media (max-width: 600px)": {
    fontSize: "30px", // Измени значение по необходимости
  },
}));


export const SectionText = styled(Typography)(() => ({
  margin: "10px 0",
  fontWeight: 300,
  lineHeight: "1.5",
  textAlign: "left",
  maxWidth: "600px",
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "30px",
  "@media (max-width: 600px)": {
    fontSize: "18px",
  },
}));

export const ImageContainer = styled(Box)(() => ({
  width: "100%",
  maxWidth: "600px",
  margin: "20px auto",
  textAlign: "center",
  img: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    objectFit: "cover",
  },
  "@media (max-width: 768px)": {
    img: {
      maxHeight: "250px",
    },
  },
}));

export const MapContainer = styled(Box)(() => ({
  width: "100%",
  maxWidth: "1200px",
  height: "400px",
  margin: "20px auto",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    color: "#535bf2",
    textDecoration: "underline",
  },
}));

export const StyledList = styled("ul")(() => ({
  paddingLeft: "20px",
  textAlign: "left",
}));