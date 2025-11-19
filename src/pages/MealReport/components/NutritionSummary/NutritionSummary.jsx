import React from "react";
import styles from "./NutritionSummary.module.css";
import NutrientBar from "../NutrientBar/NutrientBar";

const NutritionSummary = ({ data }) => {
  return (
    <div className={styles.card}>
      <h3>오늘의 영양 섭취</h3>
      <p className={styles.cardSubtitle}>
        목표 섭취량 대비 달성률을 한눈에 확인해 보세요.
      </p>

      <div className={styles.nutrientDetails}>
        <p>
          <strong>총 칼로리:</strong> {data.totalCalories} kcal
        </p>
        <p>
          <strong>단백질:</strong> {data.protein} g
        </p>
        <p>
          <strong>탄수화물:</strong> {data.carbs} g
        </p>
        <p>
          <strong>지방:</strong> {data.fat} g
        </p>
      </div>

      <div className={styles.barSection}>
        <NutrientBar
          label="단백질 (목표 대비)"
          value={data.protein}
          goal={data.goals.protein}
          color="#4caf50" // 초록색
        />
        <NutrientBar
          label="탄수화물 (목표 대비)"
          value={data.carbs}
          goal={data.goals.carbs}
          color="#ff9800" // 주황색
        />
        <NutrientBar
          label="지방 (목표 대비)"
          value={data.fat}
          goal={data.goals.fat}
          color="#2196f3" // 파란색
        />
      </div>
    </div>
  );
};

export default NutritionSummary;
