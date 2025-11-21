import axios from "axios";

export const apiNutrition = async (keyword) => {
  const res = await axios.get(
    "https://api.odcloud.kr/api/15050912/v1/uddi:0a633058-9843-40fe-93d0-b568f23b715e_201909261047",
    {
      params: {
        page: 1,
        perPage: 2000,
        returnType: "JSON",
        serviceKey: import.meta.env.VITE_NUI_API_KEY,
      },
    }
  );

  const list = res.data.data;

  const filtered = list.filter((item) => {
    const name = item["음식명"]?.replace(/\s+/g, "").toLowerCase();
    const key = keyword.replace(/\s+/g, "").toLowerCase();
    return name.includes(key);
  });

    return filtered.map((item, index) => ({
    code: `${item["음식명"]}_${index}`,
    name: item["음식명"],
    calories: Number(item["1인분칼로리(kcal)"]) || 0,
    carbs: Number(item["탄수화물(g)"]) || 0,
    protein: Number(item["단백질(g)"]) || 0,
    fat: Number(item["지방(g)"]) || 0,
  }));
};
