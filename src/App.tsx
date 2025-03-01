import { BrowserRouter as Router } from "react-router-dom";
import { AppProviders } from "./AppProviders";
import { AppRoutes } from "./AppRoutes";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </Router>
    </CartProvider>
  );
}
