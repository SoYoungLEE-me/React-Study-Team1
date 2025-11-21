import { useQuery } from "@tanstack/react-query";
import { fetchFoodNutrition } from "./useFoodNutritionQuery";

export const useMealNutrition = (selectedDate, type, items) => {
  return useQuery({
    queryKey: ["mealNutrition", selectedDate, type, items],
    queryFn: async () => {
      const results = await Promise.all(items.map((item) => fetchFoodNutrition(item.code)));

      return results.reduce(
        (acc, cur, idx) => {
          if (!cur) return acc;

          const g = items[idx].gram;
          const base = cur.standardNutrition;
          const per = g / cur.standardWeight;

          return {
            totalCalories: acc.totalCalories + base.kcal * per,
            carbs: acc.carbs + base.carbs * per,
            protein: acc.protein + base.protein * per,
            fat: acc.fat + base.fat * per,
          };
        },
        { totalCalories: 0, carbs: 0, protein: 0, fat: 0 }
      );
    },
    enabled: false, // ❗ 자동 실행 X → refetch() 호출로만 실행됨
    retry: 0,
  });
};
