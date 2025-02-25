import { styled } from "@mui/material/styles";
import { Box, Select } from "@mui/material";

export const SubHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(1, 2),
  backgroundColor: "#000000",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

export const ButtonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  display: "none",
  color: "#ffffff",
  backgroundColor: "#000000",
  borderRadius: theme.shape.borderRadius,
  "& .MuiSvgIcon-root": {
    color: "#ffffff",
    filter: "invert(1)",
  },
  "& .MuiSelect-select": {
    padding: theme.spacing(1),
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    color: "#ffffff !important",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ffffff",
    borderWidth: "0px",
  },
  "& + .MuiMenu-paper .MuiMenuItem-root": {
    color: "#000000",
  },
  [theme.breakpoints.down("md")]: {
    display: "block",
    width: "100%",
    maxWidth: 250,
    margin: "0 auto",
  },
}));

export const SelectWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));
