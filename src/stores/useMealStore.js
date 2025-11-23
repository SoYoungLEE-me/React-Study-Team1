import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getToday } from "../utils/getToday";

export const useMealStore = create(
  persist(
    (set, get) => ({
      meals: {}, // 날짜별 식단 기록
      selectedDate: getToday(),
      editType: null,

      // 날짜 변경
      setSelectedDate: (date) => set({ selectedDate: date, editType: null }),

      // 수정 모드 세팅
      setEditType: (type) => set({ editType: type }),

      // 끼니 저장
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

      // 끼니별 가져오기
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

      // 해당 날짜 모든 끼니 합쳐서 반환
      getAllMealsByDate: (date) => {
        const meals = get().meals[date] || {};
        return [
          ...(meals.breakfast || []),
          ...(meals.lunch || []),
          ...(meals.dinner || []),
          ...(meals.snack || []),
        ];
      },
    }),

    {
      name: "meal-storage", // 로컬스토리지 key
      partialize: (state) => ({
        meals: state.meals,
      }),
    }
  )
);
