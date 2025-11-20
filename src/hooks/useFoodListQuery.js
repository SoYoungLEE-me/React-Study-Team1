import { useQuery } from "@tanstack/react-query";
import { foodApi } from "../utils/apiFood";

const fetchFoodList = async (keyword) => {
  if (!keyword) return [];

  console.log(`검색 시작: ${keyword}`);

  const response = await foodApi.get("/FdFood/getKoreanFoodFdFoodList", {
    params: {
      food_Name: keyword,
      Page_Size: 20,
      page_No: 1,
      service_Type: "json",
    },
  });

  let rawData = response.data;

  if (typeof rawData === "string") {
    try {
      const fixedData = rawData.replace(/,\s*,/g, ",");
      rawData = JSON.parse(fixedData);
    } catch (e) {
      console.error("JSON 파싱 실패:", e);
    }
  }

  console.log("파싱된 데이터 구조:", rawData);

  const list = rawData?.response?.list;

  if (!list || list.length === 0) {
    console.log("⚠️ 검색 결과가 없습니다.");
    return [];
  }

  console.log(`데이터 매핑 시작 (${list.length}개)`);

  return list.map((item) => ({
    code: item.fd_Code,
    name: item.fd_Nm,
  }));
};

export const useFoodListQuery = (keyword) => {
  return useQuery({
    queryKey: ["foodName", keyword],
    queryFn: () => fetchFoodList(keyword),
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
  });
};
