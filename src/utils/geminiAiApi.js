import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_API_GEMINI_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// 제미나이로 끼니별 AI 분석하기
export const getMealAiReport = async (nutrition) => {
  const prompt = `
당신은 영양 전문가입니다.

아래는 한 끼 식단의 총 영양 데이터와 메뉴 목록 입니다.
이 데이터를 바탕으로 건강 점수(0~100), 부족/과다 태그(최대 3개까지 중요한 부분만), 개선 조언을 작성해주세요.
개선 조언은 500자를 넘기지 않도록 해주세요.

반드시 아래 JSON 형식으로만 응답하세요:

{
  "score": number,
  "tags": [string],
  "comment": string
}

영양소 데이터:
${JSON.stringify(nutrition)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let text = response.candidates[0].content.parts[0].text;

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};

// 제미나이로 하루식단(아침~간식) AI 분석하기
export const getTodayMealAiReport = async (nutrition, goal) => {
  const prompt = `
당신은 영양 전문가입니다.

아래는 하루 식단의 총 영양 데이터와 메뉴 목록, 사용자의 목표 정보 입니다.
이 데이터를 바탕으로 오늘 하루 식단의 평가 요약으로 건강 점수(0~100), 식단 평가와 오늘 하루 식단 중 부족한 영양소를 기반으로 추천하는 메뉴정보로 메뉴명, 섭취 영양소, 섭취 시 장점을 작성해주세요.
식단 평가는 100자를 넘기지 않도록 해주세요.

반드시 아래 JSON 형식으로만 응답하세요:

{"todaySummary":  //오늘 하루 식단의 평가 요약입니다.
  {
    "score": number,  //오늘 하루 식단 평가를 점수로 나타낸 값입니다.(0~100)
    "comment": string //오늘 하루 식단 평가입니다. 100자를 넘기지 않도록 해주세요.
  },
  "recommendMenu":  //오늘 하루 식단 중 부족한 영양소를 기반으로 추전하는 메뉴들의 정보입니다. 객체 배열 형태이고 최대 5개로 메뉴를 추천해주세요.
  {
    [{"menu": string, //추천하는 메뉴명입니다.
      "tags": [string],  //섭취 영양소 정보입니다. 최대 10개로 제한합니다.
      "reviews": [string] //섭취 시 장점을 10자 이내로 작성해주세요. 최대 10개로 제한합니다.
    }]
  }
}

영양소 데이터:
${JSON.stringify(nutrition)}

사용자 목표 정보:
영양소 데이터:
${JSON.stringify(goal)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let text = response.candidates[0].content.parts[0].text;

  return JSON.parse(
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
};
