import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const ProductContainer = styled(Box)(({ theme }) => ({
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
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

export const ProductImage = styled("img")(({ theme }) => ({
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

export const ProductTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, sans-serif",
  fontSize: "50px",
  fontWeight: 300,
  color: "#000",
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
    textAlign: "center",
  },
}));

export const ProductDescription = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, sans-serif",
  fontSize: "24px",
  fontWeight: 300,
  color: "#000",
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
    textAlign: "center",
  },
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const ProductDetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  gap: theme.spacing(4),
  alignItems: "flex-start",
  width: "100%",
}));

export const ProductInfoContainer = styled(Box)(({ theme }) => ({
  flex: 2,
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  alignItems: "center",
  justifyContent: "flex-start",
  marginTop: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
  },
}));

export const RelatedProductsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  width: "100%",
}));

export const RelatedProductsTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "10px",
  fontWeight: 300,
  fontSize: "36px",
  padding: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "36px",
  },
}));

export const RelatedProductCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  backgroundColor: "#dcc7bd",
  borderRadius: "8px",
  overflow: "hidden",
  maxWidth: "400px",
  margin: "0 auto",
  cursor: "pointer",
  "&:hover": { 
    boxShadow: theme.shadows[4] 
  },
  transition: "box-shadow 0.3s ease-in-out",
}));

export const RelatedProductImage = styled("img")({
  width: "100%",
  height: "200px",
  objectFit: "cover",
});

export const RelatedProductInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const RelatedProductName = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 100,
  marginBottom: 1,
});

export const RelatedProductDescription = styled(Typography)({
  color: "#555",
  fontWeight: 100,
  fontSize: "0.9rem",
});

export const RelatedProductFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderTop: "1px solid #7c5661",
}));

export const RelatedProductPrice = styled(Typography)({
  fontWeight: 200,
  fontSize: "1rem",
});

export const RelatedProductBuyButton = styled(Button)({
  backgroundColor: "#443C41",
  color: "#fff",
  fontSize: "0.85rem",
  fontWeight: 200,
  "&:hover": {
    backgroundColor: "#333",
  },
});