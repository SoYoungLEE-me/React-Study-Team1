import React, { useState } from "react";
import styles from "./SummaryToday.module.css";
import StatusNutrients from "../statusNutrients/StatusNutrients";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useNutritionStore } from "../../../../stores/useNutritionStore";
import { useTodaySummary } from "../../../../stores/useTodaySummary";
import { getTodayMealAiReport } from "../../../../utils/geminiAiApi";
import { useUserGoal } from "../../../../stores/useUsergoalStore";

const SummaryToday = ({ data }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const { todaySummary, setTodaySummary, setRecommendList } = useTodaySummary();
  const { totalNutrition } = useNutritionStore();
  const { savedGoal } = useUserGoal();

  const today = new Date().toISOString().split("T")[0];
  const countKey = `aiDailyCount-${today}`;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  const goRecord = () => {
    navigate("/record");
  };

  const goGoalSetting = () => {
    navigate("/settings");
  };

  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(countKey);
    return saved ? Number(saved) : 3;
  });

  const decrease = () => {
    const newCount = count - 1;
    localStorage.setItem(countKey, newCount);
    setCount(newCount);
  };

  const retry = async () => {
    if (count <= 0 || isLoading) return;

    const ai = await getTodayMealAiReport(totalNutrition);

    setTodaySummary(ai.todaySummary);
    setRecommendList(ai.recommendMenu);

    decrease();
    setIsLoading(false);
  };

  // 유저가 목표를 입력했는지 여부 판단
  const hasGoal = savedGoal?.carbs > 0 && savedGoal?.protein > 0 && savedGoal?.fat > 0;

  // 있으면 : 하루데이터 / 목표
  // 없으면 : 하루데이터 / 100
  const nutrients = [
    {
      label: "탄수화물",
      value: totalNutrition?.carbs || 0,
      goal: hasGoal ? savedGoal.carbs : 100,
    },
    {
      label: "단백질",
      value: totalNutrition?.protein || 0,
      goal: hasGoal ? savedGoal.protein : 100,
    },
    {
      label: "지방",
      value: totalNutrition?.fat || 0,
      goal: hasGoal ? savedGoal.fat : 100,
    },
  ];

  return (
    <motion.div className={styles.summary_card} initial="hidden" animate="show" variants={fadeUp}>
      <h2>오늘 요약</h2>
      <p className={styles.summary_desc}>
        오늘 날짜 기준으로 영양 점수, 부족/과다한 영양소, 추천 메뉴를 한눈에 확인해요.
      </p>

      <div className={styles.summary_content}>
        <div className={styles.score_circle}>
          <div className={styles.circle}>
            <span>{todaySummary?.score}</span>
            <p>/ 100 점</p>
          </div>
        </div>

        <div className={styles.summary_tags}>
          {nutrients.map((item) => (
            <StatusNutrients
              key={item.label}
              label={item.label}
              value={item.value}
              goal={item.goal}
            />
          ))}

          {!hasGoal && (
            <p className={styles.no_goal_msg}>
              목표 영양 섭취량이 설정되지 않았어요! 목표 설정 페이지에서 입력해보세요 😊
            </p>
          )}

          <div className={styles.ai_comment}>
            AI 코멘트:
            <br />
            {todaySummary?.comment}
          </div>
        </div>

        <div className={styles.retry_wrap}>
          <button onClick={retry} disabled={count <= 0} className={styles.retry_buttons}>
            {isLoading ? "다시 분석 하는 중..." : "다시 분석 받기"}
          </button>

          <p>(남은 횟수: {count} / 3)</p>

          {count <= 0 && <p className={styles.limit}>오늘 분석 기회를 모두 사용했어요!</p>}
        </div>
      </div>

      <div className={styles.summary_buttons}>
        <button className={styles.btn_green} onClick={goRecord}>
          식단 기록하기
        </button>
        <button className={styles.btn_outline} onClick={goGoalSetting}>
          목표 설정
        </button>
      </div>
    </motion.div>
  );
};

export default SummaryToday;
