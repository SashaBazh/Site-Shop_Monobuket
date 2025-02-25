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
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  backgroundColor: "#dcc7bd",
  animation: `${fadeIn} 0.2s ease-in-out`,
  padding: theme.spacing(0),
  borderRadius: "4px",
}));

export const ImageContainer = styled(Box)(() => ({
  width: "100%",
  aspectRatio: "4 / 5",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4px",
  backgroundColor: "#f5f5f5",
}));

export const Image = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

export const Description = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0.5, 0, 1, 0),
  color: "#000",
  fontWeight: 300,
  fontSize: "1rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  textOverflow: "ellipsis",
  height: "1.9rem",
}));

export const CardBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: theme.spacing(0, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

export const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: "#000",
  fontSize: "1rem",
  margin: theme.spacing(0, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

export const BuyButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "#443C41",
  color: "#fff",
  padding: theme.spacing(0.5, 2),
  fontSize: "1rem",
  fontWeight: 300,
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#333",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));