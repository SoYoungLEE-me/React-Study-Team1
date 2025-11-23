import React from "react";
import styles from "./MealReport.module.css";
import NutritionSummary from "./components/NutritionSummary/NutritionSummary";
import AiReport from "./components/AiReport/AiReport";
import { useNutritionStore } from "../../stores/useNutritionStore";
// import { useAiStore } from "../../stores/useAiStore";
import { useMealStore } from "../../stores/useMealStore";

const MealReportPage = () => {
  const { totalNutrition } = useNutritionStore();
  // const { report } = useAiStore();
  const { editType: mealType } = useMealStore();

  // totalNutrition이 아직 없으면 안내
  if (!totalNutrition) {
    return (
      <div className={styles.analysisWrapper}>
        <h2>분석 데이터가 없습니다.</h2>
        <p>식단을 선택하고 영양 분석을 먼저 진행해주세요.</p>
      </div>
    );
  }

  return (
    <div className={styles.analysisWrapper}>
      <div className={styles.analysisHeader}>
        <h2>식사 리포트</h2>
        <p>
          섭취한 음식들의 총 영양성분을 분석한 결과예요. 내 식습관을 이해하고 더 건강하게
          조절해볼까요?
        </p>
      </div>

      <div className={styles.analysisContent}>
        {/* 섭취 영양 분석 */}
        <NutritionSummary mealType={mealType} />

        {/* AI 평가 및 코멘트 */}
        <AiReport mealType={mealType} />
      </div>
    </div>
  );
};

export default MealReportPage;
