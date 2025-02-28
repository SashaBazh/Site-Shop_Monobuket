import { styled, keyframes } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CardContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "280px",
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  backgroundColor: "#dcc7bd",
  padding: theme.spacing(0.01),
  animation: `${fadeIn} 0.2s ease-in-out`,
  borderRadius: "8px",
}));

export const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "4px",
  marginBottom: theme.spacing(0.2),
}));

export const Description = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0.5, 0, 1, 0),
  color: "#000",
  fontWeight: 300,
  fontSize: "1.1rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  textOverflow: "ellipsis",
  height: "1.2rem",
}));

export const CardBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(0.2),
}));

export const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: "#000",
  fontSize: "1.3rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

export const BuyButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "#443C41",
  color: "#fff",
  padding: theme.spacing(0.5, 2),
  fontSize: "1rem",
  fontWeight: 300,
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#333",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));
