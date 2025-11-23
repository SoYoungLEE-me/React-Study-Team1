import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodaySummary = create(
  persist(
    (set) => ({
      //오늘 요약 내용 저장
      todaySummary: null,
      //부족 영양소 기반 메뉴 추천 리스트 저장
      recommendList: [],

      //오늘 요약 내용 update
      setTodaySummary: (data) => set({ todaySummary: data }),

      //부족 영양소 기반 메뉴 추천 리스트 저장
      setRecommendList: (list) => set({ recommendList: list }),

      // 비우기
      clearTodaySummary: () => set({ todaySummary: null, recommendList: [] }),
    }),
    { name: "today-summary-storage" }
  )
);
