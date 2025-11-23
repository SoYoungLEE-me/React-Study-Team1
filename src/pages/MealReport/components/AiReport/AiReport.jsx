import React, { useEffect, useState } from "react";
import styles from "./AiReport.module.css";

import { useNutritionStore } from "../../../../stores/useNutritionStore";
import { useAiStore } from "../../../../stores/useAiStore";
import { getMealAiReport } from "../../../../utils/geminiAiApi";

const AiReport = ({ mealType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { totalNutrition } = useNutritionStore();

  const { reports, setReport } = useAiStore();
  const report = reports?.[mealType] ?? null;

  const today = new Date().toISOString().split("T")[0];

  const countKey = `aiCount-${today}-${mealType}`;
  const reportKey = `aiReport-${today}-${mealType}`;

  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(countKey);
    return saved ? Number(saved) : 3;
  });

  useEffect(() => {
    const saved = localStorage.getItem(countKey);
    setCount(saved ? Number(saved) : 3);
  }, [mealType, countKey]);

  useEffect(() => {
    const savedReport = localStorage.getItem(reportKey);
    if (savedReport) {
      setReport(mealType, JSON.parse(savedReport));
    }
  }, [mealType, reportKey, setReport]);

  const decreaseCount = () => {
    setCount((prev) => {
      const newCount = prev - 1;
      localStorage.setItem(countKey, newCount);
      return newCount;
    });
  };

  const saveReport = (data) => {
    localStorage.setItem(reportKey, JSON.stringify(data));
  };

  const handleGetReport = async () => {
    if (count <= 0) return;

    if (!totalNutrition) {
      alert("영양 분석이 먼저 필요합니다.");
      return;
    }

    setIsLoading(true);

    const aiResult = await getMealAiReport(totalNutrition);

    setReport(mealType, aiResult);
    saveReport(aiResult);
    decreaseCount();

    setIsLoading(false);
  };

  return (
    <div className={styles.card}>
      {!report && !isLoading && (
        <div className={styles.placeholder}>
          <p>
            {mealType === "breakfast" && "아침 식사"}
            {mealType === "lunch" && "점심 식사"}
            {mealType === "dinner" && "저녁 식사"}
            {mealType === "snack" && "간식"} AI 분석을 시작해보세요
          </p>

          <p className={styles.limitInfo}>
            (남은 횟수: <strong>{count}회</strong> / 3회)
          </p>

          <button className={styles.analyzeButton} onClick={handleGetReport} disabled={count <= 0}>
            AI 리포트 받아보기
          </button>
        </div>
      )}

      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>AI가 식단을 분석하고 있어요...</p>
        </div>
      )}

      {report && !isLoading && (
        <div className={styles.reportContent}>
          <h3>
            {mealType === "breakfast" && "아침 식사 피드백"}
            {mealType === "lunch" && "점심 식사 피드백"}
            {mealType === "dinner" && "저녁 식사 피드백"}
            {mealType === "snack" && "간식 피드백"}
          </h3>

          <h3 className={styles.nutri_score}>영양 점수: {report.score} / 100</h3>

          <ul className={styles.tagsSection}>
            {report.tags?.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <p className={styles.aiComment}>{report.comment}</p>

          <button
            className={`${styles.analyzeButton} ${styles.retry}`}
            onClick={handleGetReport}
            disabled={count <= 0}
          >
            리포트 다시 받기
          </button>

          <p className={styles.limitInfo}>
            (남은 횟수: <strong>{count}회</strong> / 3회)
          </p>

          {count <= 0 && (
            <p className={styles.exhaustedNotice}>
              오늘 사용 가능한 분석 횟수가 모두 소진되었습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AiReport;
