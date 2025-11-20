import axios from "axios";

const API_KEY = import.meta.env.VITE_AGRIFOOD_API_KEY;

export const foodApi = axios.create({
  baseURL: "https://apis.data.go.kr/1390803/AgriFood",
  params: {
    serviceKey: API_KEY,
  },
});
