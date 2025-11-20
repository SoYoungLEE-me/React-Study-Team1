import React from "react";
import { useAiStore } from "../../stores/useAiStore";
import NutritionSummary from "./components/NutritionSummary/NutritionSummary";
import AiReport from "./components/AiReport/AiReport";
import styles from "./MealReport.module.css";

const MealReportPage = () => {
  const { report } = useAiStore();

  if (!report) return <div>식단 분석 결과가 없습니다.</div>;

  return (
    <div className={styles.analysisWrapper}>
      <div className={styles.analysisHeader}>
        <h2>오늘의 식단 리포트</h2>
        <p>오늘 섭취한 영양소를 분석하고, AI의 맞춤 조언을 확인해보세요.</p>
      </div>

      <div className={styles.analysisContent}>
        <NutritionSummary data={report} />
        <AiReport data={report} />
      </div>
    </div>
  );
};

export default MealReportPage;
