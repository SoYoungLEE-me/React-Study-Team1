import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_API_GEMINI_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const getMealAnalysis = async (meals) => {
  const prompt = `
아래는 하루 식단 데이터입니다.
JSON 형태로 분석해주세요.
각 식사별 총 칼로리, 단백질(g), 탄수화물(g), 지방(g)까지 계산해주세요.

형식:
{
  "score": number,
  "tags": [string],
  "comment": string,
  "totalCalories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "goals": {
    "protein": number,
    "carbs": number,
    "fat": number
  }
}

식단: ${JSON.stringify(meals)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  // AI 결과 텍스트 가져오기
  let text = response.candidates[0].content.parts[0].text;

  // 코드블록 제거
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // JSON 파싱

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("AI 분석 JSON 파싱 실패:", e);
    return null;
  }
};
