// src/components/FoodSearchModal.jsx
import React, { useState, useEffect } from "react";
// 🔽 React Query 훅은 제거
// import { useFoodListQuery } from "../../../../hooks/useFoodListQuery";
import { useFoodStore } from "../../../../stores/useFoodStore";
import { apiNutrition } from "../../../../utils/apiNutrition"; 
import styles from "./FoodSearchModal.module.css";

const FoodSearchModal = ({ onSelect }) => {
    const [input, setInput] = useState("");
    const [foodList, setFoodList] = useState([]);      
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);          

    // 🔹 전역 스토어: "임시 선택 바구니" 역할
    const { selectedFoods, addFood, removeFood, clearSelectedFoods } = useFoodStore();

    const handleSearch = async () => {
        if (!input.trim()) return;

        try {
            setIsLoading(true);
            setError(null);

            // ✅ apiNutrition 직접 호출
            const result = await apiNutrition(input);

            console.log("[API 응답] 검색어:", input);
            console.log("[API 응답] 결과:", result);

            setFoodList(result || []);
        } catch (err) {
            console.error("검색 중 에러:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const isSelected = (food) =>
        selectedFoods.some((item) => item.code === food.code);

    const handleClickFood = (food) => {
        if (isSelected(food)) {
            removeFood(food.code);
        } else {
            addFood(food);
        }
    };


    const handleConfirmSelected = () => {
        if (!onSelect || selectedFoods.length === 0) return;

        selectedFoods.forEach((food) => {
            onSelect(food);
        });
        clearSelectedFoods();
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>음식 검색</h2>

            {/* 검색창 */}
            <div className={styles.searchRow}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="예: 김치찌개"
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    검색
                </button>
            </div>

            {/* 상태 표시 */}
            {isLoading && <p className={styles.statusText}>로딩 중... ⏳</p>}
            {error && (
                <p className={styles.errorText}>
                    에러 발생: {error.message || "잠시 후 다시 시도해주세요."}
                </p>
            )}

            {/* 결과 + 선택 리스트 */}
            <div className={styles.contentRow}>
                {/* 왼쪽: 검색 결과 */}
                <div className={styles.resultColumn}>
                    <h3 className={styles.subTitle}>
                        검색 결과 ({foodList ? foodList.length : 0}개)
                    </h3>
                    <ul className={styles.resultList}>
                        {foodList?.map((food) => (
                            <li
                                key={food.code}
                                onClick={() => handleClickFood(food)}
                                className={`${styles.resultItem} ${isSelected(food) ? styles.resultItemSelected : ""
                                    }`}
                            >
                                <strong className={styles.resultName}>{food.name}</strong>
                                {isSelected(food) && (
                                    <span className={styles.checkMark}>✔</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 오른쪽: 선택된 음식 (임시 바구니) */}
                <div className={styles.selectedColumn}>
                    <h3 className={styles.subTitle}>선택된 데이터 확인</h3>
                    {selectedFoods.length === 0 ? (
                        <p className={styles.emptyText}>
                            왼쪽에서 음식을 선택해서 담으세요.
                        </p>
                    ) : (
                        <>
                            <ul className={styles.selectedList}>
                                {selectedFoods.map((food) => (
                                    <li key={food.code} className={styles.selectedItem}>
                                        <span className={styles.selectedName}>{food.name}</span>
                                        <button
                                            onClick={() => removeFood(food.code)}
                                            className={styles.deleteButton}
                                        >
                                            삭제
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className={styles.addButton}
                                onClick={handleConfirmSelected}
                            >
                                선택한 음식 추가하기
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodSearchModal;
