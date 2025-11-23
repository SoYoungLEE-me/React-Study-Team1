import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

// 경로가 다르다면 본인 프로젝트 구조에 맞게 수정해주세요.
import { useMealStore } from "../../../../stores/useMealStore";
import { useNutritionStore } from "../../../../stores/useNutritionStore";
import { useFoodListQuery } from "../../../../hooks/useFoodListQuery";
import styles from "./MealForm.module.css";

const MealForm = () => {
  // 식단 기록/관리 스토어
  const { selectedDate, editType, getMealsByDate, saveMeal, setEditType } = useMealStore();

  // 영양 분석 스토어
  const { setAnalysisItems, calculateTotal, clearAnalysis } = useNutritionStore();

  const todayMeals = getMealsByDate(selectedDate);

  // Local State
  const [type, setType] = useState(editType || "breakfast");
  const [items, setItems] = useState(todayMeals[type] || []);
  const [time, setTime] = useState("00:00");

  // 입력 관련 State
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [gram, setGram] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false); // 로딩 상태 관리

  const navigate = useNavigate();

  // React Query (음식 검색)
  const { data: foodList, isLoading } = useFoodListQuery(keyword);

  // 초기 진입 시 수정 모드인지 확인
  useEffect(() => {
    setType(editType || "breakfast");
  }, [editType]);

  // 날짜나 식사 타입이 바뀌면 기존에 저장된 리스트 불러오기
  useEffect(() => {
    const updated = getMealsByDate(selectedDate);
    const mealList = updated[type] || [];

    setItems(mealList);

    // ✅ 저장된 시간이 있다면 수정 화면에 반영
    if (mealList.length > 0) {
      setTime(mealList[0].time);
    } else {
      setTime("00:00");
    }
  }, [type, selectedDate, getMealsByDate]);

  // 시간 생성 (00:00 ~ 23:30)
  const generateTimes = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m of ["00", "30"]) {
        const hour = String(h).padStart(2, "0");
        times.push(`${hour}:${m}`);
      }
    }
    return times;
  };

  // 검색 핸들러
  const handleSearch = () => {
    if (!input.trim()) return;
    setKeyword(input);
  };

  // 검색 결과 클릭
  const selectFood = (food) => {
    setSelectedFood(food);
    setInput(food.name);
    setKeyword(""); // 검색 목록 닫기
  };

  // 리스트에 추가 (Local State 업데이트)
  const addItem = () => {
    if (!selectedFood || !gram) {
      alert("음식과 섭취량(g)을 모두 입력해주세요.");
      return;
    }

    const newItem = {
      time,
      name: selectedFood.name,
      gram: Number(gram),
      code: selectedFood.code, // 영양 정보 검색을 위한 코드
      text: `${selectedFood.name} ${gram}g`,
    };

    setItems((prev) => [...prev, newItem]);

    // 입력창 초기화
    setInput("");
    setSelectedFood(null);
    setGram("");
  };

  // 개별 삭제
  const removeItem = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  // 전체 삭제
  const deleteAll = () => setItems([]);

  // 단순 저장
  const save = () => {
    const updatedItems = items.map((item) => ({
      ...item,
      time, // ✅ 변경된 시간 적용
    }));

    saveMeal(selectedDate, type, updatedItems);
    setEditType(null);
  };

  // 저장 후 분석 페이지로 이동
  const goToReport = async () => {
    if (!items.length) {
      alert("분석할 식단을 입력해주세요.");
      return;
    }

    setIsAnalyzing(true);

    try {
      // 현재 식단 저장 (MealStore)
      saveMeal(selectedDate, type, items);

      // 분석할 데이터 세팅 (NutritionStore)
      // 기존 데이터를 비우고, 현재 작성된 리스트를 통째로 넘기기
      clearAnalysis();
      setAnalysisItems(items);

      // 영양소 합산 계산 실행 (API 호출 포함)
      await calculateTotal();

      // 4. 계산 완료 후 페이지 이동
      setIsAnalyzing(false);
      navigate("/report");
    } catch (error) {
      console.error("분석 중 오류 발생:", error);
      alert("영양 정보를 불러오는 중 오류가 발생했습니다.");
      setIsAnalyzing(false);
    }
  };

  if (!selectedDate) return null;

  return (
    <div className={styles.meal_form}>
      {/* 상단: 식사 타입 & 시간 선택 */}
      <div className={styles.meal_select}>
        <div className={styles.select_wrap}>
          <span className={styles.small_title}>식사 타입</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="breakfast">아침</option>
            <option value="lunch">점심</option>
            <option value="dinner">저녁</option>
            <option value="snack">간식</option>
          </select>
        </div>

        <div className={styles.select_wrap}>
          <span className={styles.small_title}>시간</span>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            {generateTimes().map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 중단: 음식 검색 및 추가 */}
      <div className={styles.add_box}>
        <span className={styles.small_title}>음식 검색</span>
        <div className={styles.add_wrap}>
          <div className={styles.search}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="음식명 입력"
              className={styles.food_search_input}
            />
            <button onClick={handleSearch} className={styles.search_btn}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          <div className={styles.gram}>
            <input
              type="number"
              placeholder="g"
              value={gram}
              onChange={(e) => setGram(e.target.value)}
              className={styles.gram_input}
            />
          </div>

          <button onClick={addItem} className={styles.add_btn}>
            추가
          </button>
        </div>

        {/* 검색 결과 리스트 (키워드가 있을 때만 표시) */}
        {keyword && (
          <ul className={styles.search_list}>
            {isLoading && <li>검색 중...</li>}
            {!isLoading && foodList?.length === 0 && <li>검색 결과가 없습니다.</li>}
            {foodList?.map((food) => (
              <li key={food.code} onClick={() => selectFood(food)}>
                {food.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 하단: 입력된 식단 리스트 */}
      <div className={styles.items_box}>
        <span className={styles.small_title}>입력한 식단</span>
        <div className={styles.items_wrap}>
          <p>
            <span>식사 시간 : </span>
            {time}
          </p>

          <ul className={styles.item_list}>
            {items.length === 0 ? (
              <li style={{ justifyContent: "center", color: "#D1D1D1" }}>
                추가된 음식이 없습니다.
              </li>
            ) : (
              items.map((item, idx) => (
                <li key={idx}>
                  <p>{item.text}</p>
                  <button onClick={() => removeItem(idx)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className={styles.btn_wrap}>
        <button onClick={save}>저장하기</button>
        <button onClick={deleteAll}>전체 삭제</button>
        <button
          onClick={goToReport}
          disabled={isAnalyzing}
          style={{
            opacity: isAnalyzing ? 0.7 : 1,
            cursor: isAnalyzing ? "wait" : "pointer",
          }}
        >
          {isAnalyzing ? "분석 중..." : "요약 보러 가기"}
        </button>
      </div>
    </div>
  );
};

export default MealForm;
