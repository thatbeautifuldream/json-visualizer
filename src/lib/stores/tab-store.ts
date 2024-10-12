import { create } from "zustand";
import { createSelectors } from "./create-selectors";
import { persist } from "zustand/middleware";

export type TabValue = "input" | "tree" | "grid" | "ai";

interface TabState {
  activeTab: TabValue;
  jsonInput: string;
  parsedJson: any;
  error: string | null;
  isLoading: boolean;
  setActiveTab: (tab: TabValue) => void;
  setJsonInput: (input: string) => void;
  setParsedJson: (json: any) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useTabStoreBase = create<TabState>()(
  persist(
    (set) => ({
      activeTab: "input",
      jsonInput: "",
      parsedJson: null,
      error: null,
      isLoading: false,

      setActiveTab: (tab) => set({ activeTab: tab }),
      setJsonInput: (input) => set({ jsonInput: input }),
      setParsedJson: (json) => set({ parsedJson: json }),
      setError: (error) => set({ error }),
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "json-visualizer-storage",
      partialize: (state) => ({
        jsonInput: state.jsonInput,
        parsedJson: state.parsedJson,
      }),
    }
  )
);

export const useTabStore = createSelectors(useTabStoreBase);
