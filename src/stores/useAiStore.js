import { create } from "zustand";

export const useAiStore = create((set) => ({
  report: null,
  setReport: (data) => set({ report: data }),
  clearReport: () => set({ report: null }),
}));