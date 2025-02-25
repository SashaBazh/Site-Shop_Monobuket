import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import theme from "./theme/theme";


interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
};