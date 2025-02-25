import { SxProps, Theme } from "@mui/material";

export const filterPanelContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  alignItems: { xs: "stretch", sm: "center" },
  gap: { xs: 2, sm: 2 },
  mb: 2,
};

export const searchBox: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#ffffff",
  borderRadius: 2,
  p: { xs: 0.5, sm: 1 },
  flex: 1,
  minWidth: { xs: "100%", sm: "200px" },
};

export const searchInput: SxProps<Theme> = {
  flex: 1,
  border: "none",
  "& .MuiOutlinedInput-root": {
    padding: 0,
    "& fieldset": {
      border: "none",
    },
  },
  ml: -0.5,
  fontSize: { xs: "0.8rem", sm: "1rem" },
};

export const filterControlsContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: { xs: "space-between", sm: "flex-start" },
  gap: { xs: 1, sm: 2 },
  flexWrap: "nowrap",
  overflowX: { xs: "auto", sm: "visible" },
  width: { xs: "100%", sm: "auto" },
};

export const filterIconsContainer: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: { xs: 0.5, sm: 1 },
  flexShrink: 0,
};

export const clearFiltersButton: SxProps<Theme> = {
  backgroundColor: "#65293E",
  color: "#FFFFFF",
  textTransform: "none",
  fontWeight: 300,
  "&:hover": {
    backgroundColor: "#531E31",
  },
  fontSize: { xs: "0.7rem", sm: "1rem" },
  padding: { xs: "4px 8px", sm: "6px 12px" },
};

export const activeFiltersContainer: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  mb: 2,
};