import { createContext } from "react";
import { CartContextValue } from "../types/Cart.types";

export const CartContext = createContext<CartContextValue>({} as CartContextValue);