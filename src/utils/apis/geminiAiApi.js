// src/utils/apis/geminiAiApi.js
import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_API_GEMINI_KEY;

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" +
  GEMINI_API_KEY;

export async function getMealAnalysis(meals) {
  const promptText = `
    아래는 한 사용자의 하루 식단이야.
    끼니별로 영양 균형, 부족/과다 영양소, 개선점을 간단하게 정리해줘.
    식단 데이터(JSON): ${JSON.stringify(meals)}
  `;

  const body = {
    contents: [
      {
        parts: [{ text: promptText }],
      },
    ],
  };

  try {
    const res = await axios.post(GEMINI_URL, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Gemini 응답:", res.data);
    const text =
      res.data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("\n") ??
      "분석 결과를 가져오지 못했어요. 다시 시도해 주세요.";

    return text;
  } catch (error) {
    console.error("Gemini API 오류:", error);
    return "AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
}
