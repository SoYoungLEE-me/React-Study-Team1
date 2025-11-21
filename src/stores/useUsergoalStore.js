// stores/useUsergoalStore.js
import { create } from "zustand";

export const useUserGoal = create((set, get) => ({
  savedGoal: {
    gender: "male",
    age: "",
    mode: "maintenance",
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  }, // gpt한테 넘길 때 이거 넘기면 될 것 같아요!

  editorGoal: {
    gender: "male",
    age: "",
    mode: "maintenance",
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  },

  updateEditor: (key, value) =>
    set((state) => ({
      editorGoal: { ...state.editorGoal, [key]: value },
    })),

  saveGoal: () => {
    const { editorGoal } = get();
    localStorage.setItem("userGoal", JSON.stringify(editorGoal));
    set({ savedGoal: editorGoal });
  },

  resetGoal: () => {
    const initial = {
      gender: "male",
      age: "",
      mode: "maintenance",
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
    };
    localStorage.setItem("userGoal", JSON.stringify(initial));
    set({
      savedGoal: initial,
      editorGoal: initial,
    });
  },

  // 앱 시작 시 저장된 데이터 불러오기
  loadGoal: () => {
    const saved = localStorage.getItem("userGoal");
    if (saved) {
      const data = JSON.parse(saved);
      set({
        savedGoal: data,
        editorGoal: data,
      });
    }
  },
}));
