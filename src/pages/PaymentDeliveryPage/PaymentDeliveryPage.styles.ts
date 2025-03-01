import { styled, keyframes } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

// Анимация появления
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

// Контейнер страницы
export const PageContainer = styled(Box)(() => ({
  backgroundColor: "#dcc7bd",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  animation: `${fadeIn} 1s ease-out`,
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: theme.spacing(0, 2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
  animation: `${fadeIn} 1.5s ease-out`,
}));

export const SectionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  animation: `${fadeIn} 2s ease-out`,
}));

export const TextSection = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 200,
  lineHeight: 1.8,
  color: theme.palette.text.primary,
  flex: 2,
  whiteSpace: "pre-line",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontWeight: 200,
  margin: theme.spacing(2, 0),
  color: theme.palette.primary.main,
  borderBottom: `1px solid black`,
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
  },
}));

export const SectionTitle1 = styled(Typography)(({ theme }) => ({
  fontSize: "50px",
  fontWeight: 200,
  margin: theme.spacing(1, 0),
  color: theme.palette.primary.main,
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

export const Image = styled("img")(({ theme }) => ({
  flex: 1,
  width: "100%",
  maxWidth: "400px",
  height: "auto",
  borderRadius: theme.spacing(2),
  objectFit: "contain",
  animation: `${fadeIn} 2.5s ease-out`,
}));

export const PaymentMethodsImage = styled("img")(() => ({
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  display: "block",
  height: "auto",
  animation: `${fadeIn} 3s ease-out`,
}));

export const MapWrapper = styled(Box)(() => ({
  width: "100%",
  maxWidth: "1200px",
  margin: "20px auto",
  height: "400px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  animation: `${fadeIn} 3.5s ease-out`,
}));
