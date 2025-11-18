import { create } from "zustand";

export const useMealStore = create((set, get) => ({
  meals: {}, // 식단데이터
  selectedDate: null, // 선택 날짜
  editType: null, // 현재 편집중인 식단(아침,점심,저녁,간식)

  // 달력에서 날짜 선택
  setSelectedDate: (date) => set({ selectedDate: new Date(date), editType: null }),

  // 수정 할 식단(아침,점심,저녁,간식) 선택
  setEditType: (type) => set({ editType: type }),

  // 식단 저장
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

  // 날짜의 식단 데이터 get
  getMealsByDate: (date) => {
    const { meals } = get();
    return (
      meals[date] || {
        breakfast: [], // 아침데이터
        lunch: [], // 점심데이터
        dinner: [], // 저녁데이터
        snack: [], // 간식데이터
      }
    );
  },
}));
