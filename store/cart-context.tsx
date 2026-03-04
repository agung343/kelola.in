"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">) => void;
  reduceItem: (id: string) => void;
  clearItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((p) => p.id === product.id);
          if (existing) {
            return {
              items: state.items.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),
      reduceItem: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((p) =>
                p.id === id ? { ...p, quantity: p.quantity - 1 } : p
              )
              .filter((p) => p.quantity > 0),
          };
        }),
      clearItem: (id) =>
        set((state) => {
          return {
            items: state.items.filter((p) => p.id !== id),
          };
        }),
      clearCart: () =>
        set((state) => {
          return {
            items: [],
          };
        }),
      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-store",
      skipHydration: true
    }
  )
);
