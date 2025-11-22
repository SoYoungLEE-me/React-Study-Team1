import React, { useEffect, useState } from "react";
import styles from "./NoReportMeal.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useMealStore } from "../../../../stores/useMealStore";
import { getToday } from "../../../../utils/getToday";
import { getTodayMealAiReport } from "../../../../utils/geminiAiApi";
import { useNutritionStore } from "../../../../stores/useNutritionStore";
import { useTodaySummary } from "../../../../stores/useTodaySummary";

const NoReportMeal = () => {
  const navigate = useNavigate();
  const [noTodayMeal, setNoTodayMeal] = useState(true);
  const { calculateDailyTotal, totalNutrition } = useNutritionStore();
  const { selectedDate, getMealsByDate } = useMealStore();
  const { setTodaySummary, setRecommendList } = useTodaySummary();
  const [meals, setMeals] = useState(getMealsByDate(getToday()));

  // 페이드업 효과
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // 오늘 저장된 식단 1개이상 존재 여부에 따라 실행
  useEffect(() => {
    const hasMeal = Object.values(meals).some((meal) => meal.length > 0);
    setNoTodayMeal(!hasMeal);

    // 오늘 날짜 기준으로 하루 전체 영양합계를 계산하여 totalNutrition에 저장
    calculateDailyTotal(getToday());
  }, [meals]);

  // 기록하러가기 핸들러
  const goRecord = () => {
    navigate("/record");
  };

  // 오늘 식단 ai 분석하기 핸들러
  const goTodaySummary = async () => {
    await calculateDailyTotal(selectedDate);

    const ai = await getTodayMealAiReport(totalNutrition);

    setTodaySummary(ai.todaySummary);
    setRecommendList(ai.recommendMenu);

    navigate("/");
  };

  return (
    <motion.div className={styles.summary_card} initial="hidden" animate="show" variants={fadeUp}>
      <h2>오늘 요약</h2>
      <p className={styles.summary_desc}>
        오늘 날짜 기준으로 영양 점수, 부족/과다한 영양소, 추천 메뉴를 한눈에 확인해요.
      </p>

      {noTodayMeal ? (
        <div className={styles.summary_content}>
          <div className={styles.content}>
            오늘 식단을 입력하지않았어요! <br />
            오늘 드신 식단을 먼저 입력하러 가실까요? 😊
          </div>
          <div>
            <button className={styles.summary_button} onClick={goRecord}>
              오늘 식단 기록하기
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.summary_content}>
          <div className={styles.content}>
            오늘의 요약을 아직 안 보셨군요! <br />
            오늘의 요약을 확인하실까요? 😊
          </div>
          <div>
            <button className={styles.summary_button} onClick={goTodaySummary}>
              오늘 요약 보러가기"
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NoReportMeal;
