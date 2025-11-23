import React from "react";
import styles from "./NutritionSummary.module.css";
import MacroRatioBar from "../MacroRatioBar/MacroRatioBar";
import { useNutritionStore } from "../../../../stores/useNutritionStore";

const NutritionSummary = () => {
  const { totalNutrition } = useNutritionStore();
  if (!totalNutrition) return null;

  const data = {
    totalCalories: Number(totalNutrition.kcal.toFixed(1)),
    protein: Number(totalNutrition.protein.toFixed(1)),
    carbs: Number(totalNutrition.carbs.toFixed(1)),
    fat: Number(totalNutrition.fat.toFixed(1)),
    sodium: Math.round(totalNutrition.sodium),
  };

  return (
    <div className={styles.card}>
      <h3>이번 식사에서 섭취한 영양소</h3>
      <p className={styles.cardSubtitle}>목표 섭취량 대비 달성률을 한눈에 확인해 보세요.</p>

      {/* 메인 영양소 */}
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

      {/* 서브 영양소 */}
      <div className={styles.subDetails}>
        <p>나트륨 {data.sodium}mg</p>
      </div>

      <div className={styles.barSection}>
        <MacroRatioBar carbs={data.carbs} protein={data.protein} fat={data.fat} />
      </div>
    </div>
  );
};

export default NutritionSummary;
