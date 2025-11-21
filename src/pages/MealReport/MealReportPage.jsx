import React from "react";
import styles from "./MealReport.module.css";
import NutritionSummary from "./components/NutritionSummary/NutritionSummary";
import AiReport from "./components/AiReport/AiReport";
import { useFoodStore } from "../../stores/useFoodStore";

const MealReportPage = () => {
  const { totalNutrition } = useFoodStore();

  // totalNutrition이 아직 없으면 안내
  if (!totalNutrition) {
    return (
      <div className={styles.analysisWrapper}>
        <h2>분석 데이터가 없습니다.</h2>
        <p>식단을 선택하고 영양 분석을 먼저 진행해주세요.</p>
      </div>
    );
  }

  const reportData = {
    score: 85,
    tags: ["양호한 단백질", "식이섬유 부족", "나트륨 다소 높음"],
    comment:
      "오늘은 전체적으로 균형 잡힌 식단이었지만 나트륨 섭취가 조금 높은 편이에요. 국물 음식은 양을 줄이거나 건더기 위주로 드시는 것을 추천합니다!",
  };

  return (
    <div className={styles.analysisWrapper}>
      <div className={styles.analysisHeader}>
        <h2>식사 리포트</h2>
        <p>
          섭취한 음식들의 총 영양성분을 분석한 결과예요. 내 식습관을 이해하고 더
          건강하게 조절해볼까요?
        </p>
      </div>

      <div className={styles.analysisContent}>
        {/* 섭취 영양 분석 */}
        <NutritionSummary />

        {/* AI 평가 및 코멘트 */}
        <AiReport data={reportData} />
      </div>
    </div>
  );
};

export default MealReportPage;
