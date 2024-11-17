import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TKeyState {
  key: null | string;
  updateKey: (newKey: string) => void;
  deleteKey: () => void;
}

export const useKeyStore = create<TKeyState>()(
  persist(
    (set, get) => ({
      key: null,
      updateKey: (newKey) => set({ key: newKey }),
      deleteKey: () => set({ key: null }),
    }),
    {
      name: "key-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ key: state.key }),
    }
  )
);
