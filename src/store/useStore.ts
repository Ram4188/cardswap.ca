import { create } from 'zustand';
import { CartItem, User } from '../types';

interface Store {
  cart: CartItem[];
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  setUser: (user: User | null) => void;
  promoCode: string | null;
  setPromoCode: (code: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  cart: [],
  user: null,
  promoCode: null,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  setUser: (user) => set({ user }),
  setPromoCode: (code) => set({ promoCode: code }),
}));