import { create } from "zustand";

export const useUserStore = create((set) => ({
  //유저 정보 저장(id, pw)
  user: {},

  //유저세팅(로그인 시 세팅)
  setUser: (id, pw) => set({user: {id: id, pw: pw}}),

  //로그인 인증(true: 로그인, false: 로그인 X)
  authenticate: false,

  //로그인
  login: () => set({authenticate: true}),

  //로그아웃
  logout: () => set({authenticate: false}),

}));
