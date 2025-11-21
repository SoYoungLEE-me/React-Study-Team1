import React, { useState } from 'react';
import { apiNutrition } from '../utils/apiNutrition';

const TestNutrition = () => {
  const [input, setInput] = useState("");
  const [foodList, setFoodList] = useState([]);

  const handleSearch = async () => {
    if (!input.trim()) return;

    const result = await apiNutrition(input);

    console.log("검색어:", input);
    console.log("검색 결과:", result);

    setFoodList(result);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      
      <h2>Food Search Test</h2>

      {/* 검색 영역 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="예: 김치찌개"
          style={{ flex: 1, padding: "10px" }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            background: "#4CAF50",
            color: "white",
            borderRadius: "5px",
            border: "none",
          }}
        >
          검색
        </button>
      </div>

      {/* 결과 목록 */}
      <div>
        <h3>검색 결과 ({foodList.length}개)</h3>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            border: "1px solid #ddd",
            maxHeight: "350px",
            overflowY: "auto",
            borderRadius: "6px",
          }}
        >
          {foodList.length === 0 && (
            <p style={{ color: "#888" }}>검색 결과가 없습니다.</p>
          )}

          {foodList.map((food) => (
            <li
              key={food.code}
              style={{
                padding: "12px",
                borderBottom: "1px solid #eee",
                background: "white",
              }}
            >
              {/* 🍽 음식명 */}
              <strong style={{ fontSize: "16px" }}>{food.name}</strong>

              {/* 📊 영양성분 */}
              <div style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
                {food.calories} kcal · 탄수 {food.carbs}g · 단백질 {food.protein}g · 지방 {food.fat}g
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default TestNutrition;
