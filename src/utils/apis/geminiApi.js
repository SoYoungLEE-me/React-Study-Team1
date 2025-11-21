
import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const geminiApi = axios.create({
  baseURL:
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent",
  headers: { "Content-Type": "application/json" },
});

// Content-Type 프롬프트를 넣을 곳 (contents: [{ parts: [{ text: 프롬프트 넣기 }] }])” 이런식 
export const callGeminiApi = async (body) => {
  const res = await geminiApi.post(`?key=${GEMINI_API_KEY}`, body);
  return res; 
};