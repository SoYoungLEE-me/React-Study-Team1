import React from "react";
import styles from "./MealReport.module.css"; // CSS Module import
import NutritionSummary from "./components/NutritionSummary/NutritionSummary";
import AiReport from "./components/AiReport/AiReport";
import { useAiStore } from "../../stores/useAiStore"; // 추가

// // Mock 데이터
// const mockData = {
//   totalCalories: 1850,
//   protein: 72,
//   carbs: 230,
//   fat: 58,
//   goals: {
//     protein: 80,
//     carbs: 200,
//     fat: 70,
//   },
//   score: 82,
//   tags: ["단백질 충분", "섬유질 부족", "나트륨 과다"],
//   comment:
//     "오늘은 단백질과 채소 섭취는 비교적 좋지만, 국물 위주의 식사로 나트륨이 다소 높은 편이에요. 내일은 국물은 반만 드시고, 샐러드나 생채소를 함께 추가해 보는 걸 추천드려요.",
// };

const MealReportPage = () => {
  const { report } = useAiStore();
  if (!report) return <div>식단 분석 결과가 없습니다.</div>;
  const summaryData = {
    totalCalories: report.totalCalories ?? report.calories ?? 0,
    protein: report.protein ?? 0,
    carbs: report.carbs ?? 0,
    fat: report.fat ?? 0,
    goals: {
      protein: 80,  
      carbs: 250,    
      fat: 60,       
    },
  };

  const reportData = {
    score: report.score ?? 0,
    tags: report.tags ?? [],
    comment: report.comment ?? "",
  };

  // const summaryData = {
  //   totalCalories: mockData.totalCalories,
  //   protein: mockData.protein,
  //   carbs: mockData.carbs,
  //   fat: mockData.fat,
  //   goals: mockData.goals,
  // };

  // const reportData = {
  //   score: mockData.score,
  //   tags: mockData.tags,
  //   comment: mockData.comment,
  // };

  return (
    <div className={styles.analysisWrapper}>
      <div className={styles.analysisHeader}>
        <h2>오늘의 식단 리포트</h2>
        <p>
          오늘 섭취한 영양소를 분석하고, 더 건강한 식습관을 위한 AI 조언을
          확인해 보세요.
        </p>
      </div>

      <div className={styles.analysisContent}>
        {/*섭취 영양 분석 */}
        <NutritionSummary data={summaryData} />
        {/* <NutritionSummary data={report} /> */}
        {/*ai 평가 및 코멘트*/}
        <AiReport data={reportData} />
        {/* <AiReport data={report} /> */}
      </div>
    </div>
  );
};

export default MealReportPage;
