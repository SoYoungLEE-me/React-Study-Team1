// src/components/FoodSearchModal.jsx
import React, { useState, useEffect } from "react";
import { useFoodListQuery } from "../../../../hooks/useFoodListQuery";
import { useFoodStore } from "../../../../stores/useFoodStore";
import styles from "./FoodSearchModal.module.css";

const FoodSearchModal = ({ onSelect }) => {
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

    // 🔹 전역 스토어: 여기서는 "임시 선택 바구니" 역할
    const { selectedFoods, addFood, removeFood, clearSelectedFoods } = useFoodStore();

    const handleSearch = () => {
        if (!input.trim()) return;
        setKeyword(input);
    };

    const isSelected = (food) =>
        selectedFoods.some((item) => item.code === food.code);

    // ✅ 음식 클릭 시: onSelect 호출 X, 임시 선택만 토글
    const handleClickFood = (food) => {
        if (isSelected(food)) {
            // 이미 선택되어 있으면 제거
            removeFood(food.code);
        } else {
            // 선택 안 되어 있으면 추가
            addFood(food);
        }
    };

    // ✅ “선택한 음식 추가하기” 버튼 눌렀을 때만 부모로 전달
    const handleConfirmSelected = () => {
        if (!onSelect || selectedFoods.length === 0) return;

        // 선택된 음식들을 하나씩 부모(MealForm)에 전달
        selectedFoods.forEach((food) => {
            onSelect(food);
        });
        clearSelectedFoods();
        // 필요하면 여기서 선택 바구니 비우는 로직을 추가할 수도 있음
        // ex) clearFoods() 같은 함수가 스토어에 있다면 사용
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

            {isLoading && <p className={styles.statusText}>로딩 중... ⏳</p>}
            {isError && (
                <p className={styles.errorText}>에러 발생: {error.message}</p>
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

                            {/* ✅ 여기서 확정 추가 */}
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
