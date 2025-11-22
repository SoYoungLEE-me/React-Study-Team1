import { create } from "zustand";

export const useAiStore = create((set) => ({
  reports: {}, // { breakfast: {...}, lunch: {...}, ... }

  setReport: (mealType, data) =>
    set((state) => ({
      reports: {
        ...state.reports,
        [mealType]: data,
      },
    })),

  clearReport: (mealType) =>
    set((state) => ({
      reports: {
        ...state.reports,
        [mealType]: null,
      },
    })),
}));
