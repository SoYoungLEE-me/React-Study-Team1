import { create } from "zustand";

export const useFoodStore = create((set) => ({
  selectedFoods: [],

  addFood: (food) =>
    set((state) => {
      // 이미 바구니에 있는지 확인 (code로 비교)
      const isExisting = state.selectedFoods.find(
        (item) => item.code === food.code
      );

      if (isExisting) {
        // 이미 있으면 빼기
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

  //초기화
  clearSelectedFoods: () => set({ selectedFoods: [] }),
}));
