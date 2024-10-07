import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSelectors } from "./create-selectors";

interface KeyState {
  openAIKey: string;
  setOpenAIKey: (key: string) => void;
  clearOpenAIKey: () => void;
}

export const useKeyStoreBase = create<KeyState>()(
  persist(
    (set) => ({
      openAIKey: "",
      setOpenAIKey: (key: string) => set({ openAIKey: key }),
      clearOpenAIKey: () => set({ openAIKey: "" }),
    }),
    {
      name: "openai-key-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useKeyStore = createSelectors(useKeyStoreBase);
