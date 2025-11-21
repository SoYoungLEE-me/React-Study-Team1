import { callGeminiApi } from "../apis/geminiApi"; 

export async function analyzeMeal(nutrition) {
  if (!nutrition) {
    throw new Error("nutrition 인자가 필요합니다.");
  }

  const prompt = `
당신은 식단 영양 분석 전문가입니다.

아래는 사용자가 오늘 섭취한 식단의 영양 요약입니다:

- 총 칼로리: ${nutrition.totalCalories} kcal
- 단백질: ${nutrition.protein} g
- 탄수화물: ${nutrition.carbs} g
- 지방: ${nutrition.fat} g

이 정보를 기반으로 다음 조건을 만족하는 분석을 JSON 형태로 출력하세요.

 JSON만 출력하세요.
 코드블록(\`\`\`json 등)으로 감싸지 마세요.
 "score", "tags", "comment" 3개의 key만 포함하세요.

아래 형식과 비슷하게 작성하되 값만 알맞게 채우세요:

{
  "score": 82,
  "tags": ["단백질 충분", "섬유질 부족", "나트륨 과다"],
  "comment": "오늘은 단백질과 채소 섭취는 비교적 좋지만, 국물 위주의 식사로 나트륨이 다소 높은 편이에요. 내일은 국물은 반만 드시고, 샐러드나 생채소를 함께 추가해 보는 걸 추천드려요."
}
  `.trim();

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const res = await callGeminiApi(body);

  const first = res.data?.candidates?.[0];
  let text = first?.content?.parts?.map((p) => p.text).join("\n") ?? "";

  console.log("[Gemini raw text]", text);

  // 🔧 1차: 앞뒤 공백 제거
  let cleaned = text.trim();

  // 🔧 2차: ```json ~ ``` 코드블록 제거
  if (cleaned.startsWith("```")) {
    // 앞쪽 ```json / ``` 제거
    cleaned = cleaned.replace(/^```[a-zA-Z]*\s*/, "");
    // 뒤쪽 ``` 제거
    cleaned = cleaned.replace(/```$/, "").trim();
  }

  // 🔧 3차: 혹시 앞뒤에 설명이 조금 붙었으면 { ~ }만 추출
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    cleaned = cleaned.slice(start, end + 1);
  }

  console.log("[Gemini cleaned JSON]", cleaned);

  try {
    const json = JSON.parse(cleaned);
    return {
      score: json.score ?? 0,
      tags: Array.isArray(json.tags) ? json.tags : [],
      comment: json.comment ?? "",
    };
  } catch (e) {
    console.error("JSON 파싱 실패:", e, cleaned);
    return {
      score: 0,
      tags: ["분석 실패"],
      comment:
        "AI 응답을 이해하는 데 문제가 생겼어요. 잠시 후 다시 시도해 주세요.",
    };
  }
}
