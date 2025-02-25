import { SxProps, Theme } from "@mui/system";

export const containerStyle: SxProps<Theme> = {
  width: "100%",
  backgroundColor: "#dcc7bd",
};

export const headerStyle: SxProps<Theme> = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 300,
  fontSize: "3.5rem",
  color: "#000",
  mb: 4,
};

export const gridContainerStyle: SxProps<Theme> = {
  justifyContent: "center",
  [`@media (max-width:600px)`]: {
    columnGap: "16px",
    rowGap: "24px",
    spacing: 0,
    width: "auto",
    margin: "0",
    "& .MuiGrid-item": {
      padding: 0,
      marginLeft: 0,
      marginRight: 0,
    },
  },
};
