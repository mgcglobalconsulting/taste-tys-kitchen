"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  label: string;
  unitPrice: number; // dollars
  quantity: number;
  category: string;
};

type CartState = {
  items: CartItem[];
  fulfillment: "pickup" | "delivery";
};

type CartAction =
  | { type: "HYDRATE"; state: CartState }
  | { type: "ADD"; item: Omit<CartItem, "quantity"> }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "SET_FULFILLMENT"; value: "pickup" | "delivery" }
  | { type: "CLEAR" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.qty } : i,
        ),
      };
    case "SET_FULFILLMENT":
      return { ...state, fulfillment: action.value };
    case "CLEAR":
      return { items: [], fulfillment: state.fulfillment };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  fulfillment: "pickup" | "delivery";
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setFulfillment: (value: "pickup" | "delivery") => void;
  clear: () => void;
  total: number;
  count: number;
  mounted: boolean;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "totk-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], fulfillment: "pickup" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: "HYDRATE", state: JSON.parse(saved) as CartState });
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, mounted]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD", item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    dispatch({ type: "SET_QTY", id, qty });
  }, []);

  const setFulfillment = useCallback((value: "pickup" | "delivery") => {
    dispatch({ type: "SET_FULFILLMENT", value });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const total = state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        fulfillment: state.fulfillment,
        addItem,
        removeItem,
        setQty,
        setFulfillment,
        clear,
        total,
        count,
        mounted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
