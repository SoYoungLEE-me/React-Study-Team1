import { create } from "zustand";

export const useTodaySummary = create((set) => ({
  //오늘 요약 내용 저장
  todaySummary: {},

  //오늘 요약 내용 update
  setUser: (newSummary) => set({todaySummary: newSummary}),

  //부족 영양소 기반 메뉴 추천 리스트 저장
  recommendList: [],

  //부족 영양소 기반 메뉴 추천 리스트 update
  setRecommendList: (newList) => set({recommendList: newList}),
}));
