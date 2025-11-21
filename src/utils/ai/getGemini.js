import { callGeminiApi } from "../apis/geminiApi";

export async function getGemini(promptText) {

  const body = {
    contents: [
      {
        parts: [{ text: promptText }],
      },
    ],
  };

  try {

    const res = await callGeminiApi(body);
    const result = res.data;

    // Gemini는 items가 아니라 "candidates"로 응답함
    const answers = result.candidates;

    if (!answers || answers.length === 0) {
      return "AI가 답변을 보내지 않았어요.";
    }


    const firstAnswer = answers[0];


    const messageParts = firstAnswer.content.parts;

    const finalText = messageParts.map((part) => part.text).join("\n");

    return finalText.trim();
  } catch (error) {
    console.error("Gemini 호출 에러:", error);
    return "AI 응답을 가져오는 중 오류가 발생했어요.";
  }
}
