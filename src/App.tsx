import { BrowserRouter as Router } from "react-router-dom";
import { AppProviders } from "./AppProviders";
import { AppRoutes } from "./AppRoutes";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </Router>
    </CartProvider>
  );
}
