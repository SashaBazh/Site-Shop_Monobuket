import { styled } from "@mui/material/styles";
import { Box, Select } from "@mui/material";

export const SubHeaderContainer = styled(Box)(({ theme }) => ({
  position: "relative", 
  width: "100%",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(1, 2),
  backgroundColor: "#000000",
  marginTop: "69px", // Отступ, равный высоте MainHeaderContainer
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    marginTop: "56px", // Меньше отступ на мобилках, если хедер ниже
  },
  "@media (max-width: 900px)": {
    top: "10px",
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
