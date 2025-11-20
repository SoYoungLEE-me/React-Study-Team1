import { create } from "zustand";
import { fetchFoodNutrition } from "../hooks/useFoodNutritionQuery";

export const useFoodStore = create((set, get) => ({
  selectedFoods: [],

  totalNutrition: null,

  toggleFood: (food) =>
    set((state) => {
      // 이미 바구니에 있는지 확인 (code로 비교)
      const isExisting = state.selectedFoods.find(
        (item) => item.code === food.code
      );

      if (isExisting) {
        // 이미 있으면 빼기(두번 누르면 자동으로 목록에서 빠지도록)
        return {
          selectedFoods: state.selectedFoods.filter(
            (item) => item.code !== food.code
          ),
        };
      } else {
        //없으면 넣기
        return {
          selectedFoods: [...state.selectedFoods, food],
        };
      }
    }),

  //삭제
  removeFood: (foodCode) =>
    set((state) => ({
      selectedFoods: state.selectedFoods.filter(
        (item) => item.code !== foodCode
      ),
    })),

  calculateTotalNutrition: async (gramMap) => {
    const state = get();

    let total = {
      kcal: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      sugar: 0,
      sodium: 0,
    };

    for (const food of state.selectedFoods) {
      const nutrition = await fetchFoodNutrition(food.code);
      if (!nutrition) continue;

      const userGram = gramMap[food.code] || nutrition.standardWeight;
      const ratio = userGram / nutrition.standardWeight;

      total.kcal += nutrition.standardNutrition.kcal * ratio;
      total.carbs += nutrition.standardNutrition.carbs * ratio;
      total.protein += nutrition.standardNutrition.protein * ratio;
      total.fat += nutrition.standardNutrition.fat * ratio;
      total.sugar += nutrition.standardNutrition.sugar * ratio;
      total.sodium += nutrition.standardNutrition.sodium * ratio;
    }

    set({ totalNutrition: total });
  },

  //초기화
  clearAll: () =>
    set({
      selectedFoods: [],
      totalNutrition: null,
    }),
}));
