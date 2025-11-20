import { useQuery } from "@tanstack/react-query";
import { foodApi } from "../utils/apiFood";
import { XMLParser } from "fast-xml-parser";

export const fetchFoodNutrition = async (foodCode) => {
  console.log(`영양정보 검색 : ${foodCode}`);

  const response = await foodApi.get("/MzenFoodNutri/getKoreanFoodIdntList", {
    params: {
      food_Code: foodCode,
    },
  });

  let rawData = response.data;
  let parsedData = null;

  try {
    const parser = new XMLParser({
      ignoreAttributes: false, // 속성값도 가져올지 여부 (필요 없다면 true)
      parseTagValue: true, // 숫자 자동 변환 (예: "57.0" -> 57.0)
      isArray: (name) => name === "idnt_List",
    });
    parsedData = parser.parse(rawData); // XML 문자열을 JS 객체로 변환
    console.log("XML 변환 결과:", parsedData);
  } catch (e) {
    console.error("XML 파싱 실패:", e);
    return null;
  }

  let item = parsedData?.response?.body?.items?.item;
  if (Array.isArray(item)) item = item[0];

  if (!item) return null;

  const ingredients = item.idnt_List || [];

  const standardTotal = ingredients.reduce(
    (acc, cur) => {
      return {
        weight: acc.weight + Number(cur.food_Weight || 0), // 총 중량 합산

        kcal: acc.kcal + Number(cur.energy_Qy || 0), //칼로리
        carbs: acc.carbs + Number(cur.carbohydrate_Qy || 0), //탄수화물
        protein: acc.protein + Number(cur.prot_Qy || 0), //단백질
        fat: acc.fat + Number(cur.ntrfs_Qy || 0), //지방
        sugar: acc.sugar + Number(cur.sugar_Qy || 0), //당
        sodium: acc.sodium + Number(cur.na_Qy || 0), //나트륨
      };
    },
    { weight: 0, kcal: 0, carbs: 0, protein: 0, fat: 0, sugar: 0, sodium: 0 }
  );

  // 표준 데이터에 대한 영양 정보 return -> 그람당의 계산은 나중에 해야지...
  return {
    foodCode: item.main_Food_Code, // 음식 코드
    foodName: item.main_Food_Name, // 음식 이름

    standardWeight: Number(item.main_Food_Weight) || standardTotal.weight,

    standardNutrition: {
      kcal: Number(standardTotal.kcal.toFixed(1)),
      carbs: Number(standardTotal.carbs.toFixed(1)),
      protein: Number(standardTotal.protein.toFixed(1)),
      fat: Number(standardTotal.fat.toFixed(1)),
      sugar: Number(standardTotal.sugar.toFixed(1)),
      sodium: Number(standardTotal.sodium.toFixed(1)),
    },
  };
};

export const useFoodNutritionQuery = (foodCode) => {
  return useQuery({
    queryKey: ["foodNutrition", foodCode],
    queryFn: () => fetchFoodNutrition(foodCode),
    enabled: !!foodCode,
    staleTime: Infinity,
  });
};
