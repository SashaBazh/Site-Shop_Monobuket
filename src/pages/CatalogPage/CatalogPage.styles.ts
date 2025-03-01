import { styled } from "@mui/material/styles";
import { Box, Typography, Pagination } from "@mui/material";

export const CatalogContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#dcc7bd",
  minHeight: "100vh",
  padding: theme.spacing(4, 2),
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(4, 6),
  },
  margin: '120px 0 0 0',
  "@media (max-width: 900px)": {
    margin: '110px 0 0 0',
  },
}));

export const CatalogTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: "2.5rem",
  fontWeight: 300,
  textAlign: "center"
}));

export const LoaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "32px"
});

export const ErrorContainer = styled(Box)({
  padding: "16px"
});

export const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "32px",
  marginBottom: "32px"
});

export const StyledPagination = styled(Pagination)(() => ({
  "& .MuiPaginationItem-root": {
    color: "#333333",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "#65293E",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#531E31",
    },
  },
}));

export const AlertStyles = {
  width: "100%"
};

export const SnackbarPosition = {
  vertical: "top",
  horizontal: "center"
} as const;