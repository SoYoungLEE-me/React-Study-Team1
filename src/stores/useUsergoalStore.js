// stores/useUsergoalStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserGoal = create(
  persist(
    (set) => ({
      // 저장되는 실제 데이터
      savedGoal: {

      }, //gpt한테 넘기실 때 이거 쓰시면 됩니다!!

      // 수정 중인 데이터 (저장 전)
      editorGoal: {
        gender: "male",
        age: "",
        mode: "maintenance",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },

      // 수정 값 업데이트
      updateEditor: (key, value) =>
        set((state) => ({
          editorGoal: {
            ...state.editorGoal,
            [key]: value,
          },
        })),

      // 저장 버튼 클릭 → editorGoal을 savedGoal로
      saveGoal: () =>
        set((state) => ({
          savedGoal: { ...state.editorGoal },
        })),

      // 초기화
      resetGoal: () =>
        set({
          savedGoal: {

          },
          editorGoal: {
            gender: "male",
            age: "",
            mode: "maintenance",
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
          },
        }),
    }),

    {
      name: "user-goal-storage", // localStorage Key
      partialize: (state) => ({
        savedGoal: state.savedGoal, // 저장할 데이터
        editorGoal: state.editorGoal,
      }),
    }
  )
);
