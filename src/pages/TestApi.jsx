// src/components/TestApi.jsx
import React, { useState, useEffect } from "react";
import { useFoodListQuery } from "../hooks/useFoodListQuery"; // 작성하신 훅 경로
import { useFoodStore } from "../stores/useFoodStore"; // 방금 만든 스토어 경로

const TestApi = () => {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const {
    data: foodList,
    isLoading,
    isError,
    error,
  } = useFoodListQuery(keyword);

  useEffect(() => {
    if (foodList) {
      console.log("[API 응답] 컴포넌트가 받은 데이터:", foodList);
    }
  }, [foodList]);

  const { selectedFoods, addFood, removeFood } = useFoodStore();

  const handleSearch = () => {
    if (!input.trim()) return;
    setKeyword(input);
  };

  const isSelected = (food) =>
    selectedFoods.some((item) => item.code === food.code);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>API 연결 테스트</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="예: 김치찌개"
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
          검색
        </button>
      </div>

      {isLoading && <p>로딩 중... ⏳</p>}
      {isError && <p style={{ color: "red" }}>에러 발생: {error.message}</p>}

      {/* 결과 리스트 영역 */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* 왼쪽: 검색 결과 목록 */}
        <div style={{ flex: 1 }}>
          <h3>검색 결과 ({foodList ? foodList.length : 0}개)</h3>
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
                onClick={() => addFood(food)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  background: isSelected(food) === food ? "#e3f2fd" : "white",
                }}
              >
                <strong>{food.name}</strong>
                {isSelected(food) && <span style={{ color: "blue" }}>✔</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽: 선택된 음식 확인 */}
        <div
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #aaa",
            background: "#f9f9f9",
          }}
        >
          <h3>선택된 데이터 확인</h3>
          {selectedFoods.length === 0 ? (
            <p style={{ color: "#888" }}>왼쪽에서 음식을 선택해서 담으세요.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedFoods.map((food) => (
                <li
                  key={food.code}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                    background: "white",
                    marginBottom: "5px",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{food.name}</span>
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => removeFood(food.code)}
                    style={{
                      background: "#ff5252",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestApi;
