import { create } from "zustand";
import { createSelectors } from "./create-selectors";
import { persist, createJSONStorage } from "zustand/middleware";

export type TabValue = "input" | "tree" | "grid" | "ai";

interface ExplanationStep {
  explanation: string;
  output: string;
}

interface AIExplanation {
  summary: string;
  steps: ExplanationStep[];
}

interface JsonVisualizerState {
  activeTab: TabValue;
  jsonInput: string;
  parsedJson: any;
  error: string | null;
  isLoading: boolean;
  aiExplanation: AIExplanation | null;
  setActiveTab: (tab: TabValue) => void;
  setJsonInput: (input: string) => void;
  setParsedJson: (json: any) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setAIExplanation: (explanation: AIExplanation | null) => void;
}

const useJsonVisualizerStoreBase = create<JsonVisualizerState>()(
  persist(
    (set) => ({
      activeTab: "input",
      jsonInput: "",
      parsedJson: null,
      error: null,
      isLoading: false,
      aiExplanation: null,

      setActiveTab: (tab) => set({ activeTab: tab }),
      setJsonInput: (input) => set({ jsonInput: input }),
      setParsedJson: (json) => set({ parsedJson: json }),
      setError: (error) => set({ error }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setAIExplanation: (explanation) => set({ aiExplanation: explanation }),
    }),
    {
      name: "json-visualizer-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useJsonVisualizerStore = createSelectors(
  useJsonVisualizerStoreBase
);
