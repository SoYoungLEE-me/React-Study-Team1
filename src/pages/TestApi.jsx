import React, { useState } from "react";
import { useFoodListQuery } from "../hooks/useFoodListQuery";
import { useFoodStore } from "../stores/useFoodStore";
import { useNavigate } from "react-router-dom";
import { useUserGoal } from "../stores/useUsergoalStore";

const TestApi = () => {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const { savedGoal } = useUserGoal();

  console.log(savedGoal.calories);
  console.log(savedGoal.carbs);

  const {
    data: foodList,
    isLoading,
    isError,
    error,
  } = useFoodListQuery(keyword);

  const { selectedFoods, toggleFood, calculateTotalNutrition } = useFoodStore();

  // 각 음식의 gram 저장
  const [gramMap, setGramMap] = useState({});

  const handleSearch = () => {
    if (!input.trim()) return;
    setKeyword(input);
  };

  const handleGramChange = (code, value) => {
    setGramMap((prev) => ({
      ...prev,
      [code]: Number(value),
    }));
  };

  const isSelected = (food) =>
    selectedFoods.some((item) => item.code === food.code);

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h2>음식 검색</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="음식 이름 입력"
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
          검색
        </button>
      </div>

      {isLoading && <p>로딩 중...</p>}
      {isError && <p>에러 발생: {error.message}</p>}

      <div style={{ display: "flex", gap: "20px" }}>
        {/* 왼쪽: 검색 결과 */}
        <div style={{ flex: 1 }}>
          <h3>검색 결과 ({foodList?.length || 0})</h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              border: "1px solid #ddd",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {foodList?.map((food) => (
              <li
                key={food.code}
                onClick={() => toggleFood(food)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  background: isSelected(food) ? "#e3f2fd" : "white",
                }}
              >
                <strong>{food.name}</strong>
                {isSelected(food) && <span> ✔</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽: gram 입력 */}
        <div
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #aaa",
            background: "#f9f9f9",
          }}
        >
          <h3>선택된 음식 + 그램 입력</h3>

          {selectedFoods.length === 0 ? (
            <p>음식을 선택해주세요.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedFoods.map((food) => (
                <li
                  key={food.code}
                  style={{
                    padding: "10px",
                    background: "white",
                    marginBottom: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{food.name}</span>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="number"
                        placeholder="그램"
                        value={gramMap[food.code] || ""}
                        onChange={(e) =>
                          handleGramChange(food.code, e.target.value)
                        }
                        style={{
                          width: "70px",
                          padding: "5px",
                          marginRight: "6px",
                        }}
                      />
                      g
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 영양 분석 버튼 */}
      {selectedFoods.length > 0 && (
        <button
          onClick={async () => {
            await calculateTotalNutrition(gramMap);
            navigate("/report");
          }}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          영양분석 하러가기 →
        </button>
      )}
    </div>
  );
};

export default TestApi;
