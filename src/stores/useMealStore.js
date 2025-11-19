import { create } from "zustand";
import { getToday } from "../utils/getToday";

export const useMealStore = create((set, get) => ({
  meals: {},

  selectedDate: getToday(),

  editType: null,

  setSelectedDate: (date) => set({ selectedDate: date, editType: null }),

  setEditType: (type) => set({ editType: type }),

  saveMeal: (date, type, items) => {
    const { meals } = get();
    set({
      meals: {
        ...meals,
        [date]: {
          ...meals[date],
          [type]: [...items],
        },
      },
    });
  },

  getMealsByDate: (date) => {
    const { meals } = get();
    return (
      meals[date] || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      }
    );
  },
}));
