import { create } from "zustand";

/**
 * Global store using Zustand
 * Add your state slices here as the app grows
 */

interface StoreState {
  // Example state - modify as needed
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}));
