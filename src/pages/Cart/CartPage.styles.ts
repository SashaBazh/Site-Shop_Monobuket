import { styled } from "@mui/system";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Theme } from "@mui/material/styles";

export const CartContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#dcc7bd",
  minHeight: "100vh",
  padding: theme.spacing(4),
  fontFamily: "'Roboto', sans-serif",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const CartTitle = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontWeight: 300,
  marginBottom: theme.spacing(3),
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
    marginBottom: theme.spacing(2),
  },
}));

export const EmptyCartTypography = styled(Typography)(() => ({
  fontSize: "1.2rem",
  fontWeight: 300,
}));

export const CartItemRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  backgroundColor: "#E2DCD3",
  padding: theme.spacing(2),
  borderRadius: 8,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

export const ProductImage = styled("img")(({ theme }) => ({
  width: "110px",
  height: "110px",
  objectFit: "cover",
  borderRadius: 8,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(1),
  },
}));

export const TextBlock = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const ProductName = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 300,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

export const RightBlock = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
  },
}));

export const PriceTypography = styled(Typography)(({ theme }) => ({
  color: "#333",
  fontSize: "1rem",
  fontWeight: 300,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

export const QuantityBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const QuantityTextField = styled(TextField)(() => ({
  width: "60px",
  "& input": {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: 300,
  },
}));

export const PinkIconButton = styled(IconButton)(() => ({
  backgroundColor: "#1D232C",
  color: "#000",
  filter: "invert(1)",
  "&:hover": {
    filter: "invert(1)",
  },
  fontSize: "1.2rem",
}));

export const DeleteIconButton = styled(IconButton)(() => ({
  "&:hover": {
    color: "#C06193",
  },
}));

export const DeleteBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

export const TotalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(4),
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

export const TotalTypography = styled(Typography)<{ theme?: Theme }>(({ theme }) => `
  font-weight: 300;
  ${theme?.breakpoints.up('sm') ? `
    font-size: 1.4rem;
  ` : `
    font-size: 1.2rem;
  `}
`);

export const ButtonsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  flexWrap: "wrap",
}));

export const CheckoutButton = styled(Button)<{ theme?: Theme }>(({ theme }) => `
  background-color: #B07889;
  color: #000;
  font-weight: 300;
  text-transform: none;
  
  &:hover {
    background-color: #FFB5C1;
  }
  
  ${theme?.breakpoints.up('sm') ? `
    padding: 10px 20px;
    font-size: 1.1rem;
  ` : `
    padding: 8px 16px;
    font-size: 1rem;
  `}
`);

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
`;

export const ContinueShoppingButton = styled(Button)<{ theme?: Theme }>(({ theme }) => `
  background-color: #F5EDEB;
  color: #000;
  font-weight: 300;
  text-transform: none;
  
  &:hover {
    background-color: #FFC7CD;
  }
  
  ${theme?.breakpoints.up('sm') ? `
    padding: 10px 20px;
    font-size: 1.1rem;
  ` : `
    padding: 8px 16px;
    font-size: 1rem;
  `}
`);

export const NoticeBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: "#E2DCD3",
  padding: theme.spacing(3),
  borderRadius: 8,
}));

export const NoticeTitle = styled(Typography)<{ theme?: Theme }>(({ theme }) => `
  margin-bottom: ${theme?.spacing(1)};
  font-weight: 300;
  
  ${theme?.breakpoints.up('sm') ? `
    font-size: 1rem;
  ` : `
    font-size: 0.95rem;
  `}
`);

export const NoticeText = styled(Typography)<{ theme?: Theme }>(({ theme }) => `
  margin-bottom: ${theme?.spacing(0.5)};
  font-weight: 300;
  
  ${theme?.breakpoints.up('sm') ? `
    font-size: 1rem;
  ` : `
    font-size: 0.95rem;
  `}
`);