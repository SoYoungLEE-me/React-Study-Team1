import React, { useState } from "react";
import styles from "./AiReport.module.css";
import { analyzeMeal } from "../../../../utils/ai/analyzeMeal";

const AiReport = ({ nutrition, remainingCount = 3 }) => {
  const [showReport, setShowReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Gemini에서 받아온 결과를 저장할 state
  const [aiData, setAiData] = useState({
    score: 0,
    tags: [],
    comment: "",
  });

  const handleGetReport = async () => {
    if (remainingCount <= 0) {
      alert("오늘의 AI 분석 횟수를 모두 사용하셨습니다.");
      return;
    }

    if (!nutrition) {
      alert("영양 정보가 없습니다.");
      return;
    }

    try {
      setIsLoading(true);
      setShowReport(false);

      // 🔥 Gemini API 호출
      const result = await analyzeMeal(nutrition);
      console.log("[AI 분석 결과]", result);

      // 🔥 결과를 state에 반영
      setAiData(result);

      // 🔥 결과를 다 받은 뒤에 리포트 보여주기
      setShowReport(true);
    } catch (error) {
      console.error("AI 분석 중 오류:", error);
      alert("AI 분석 과정에서 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      {/* 분석 전 상태 */}
      {!showReport && !isLoading && (
        <div className={styles.placeholder}>
          <p>
            구체적인 조언이 필요하신가요?
            <br />
            AI를 통해 이번 식사를 분석해보세요
          </p>
          <p className={styles.limitInfo}>
            (남은 횟수: <strong>{remainingCount}회</strong> / 3회)
          </p>
          <button className={styles.analyzeButton} onClick={handleGetReport}>
            AI 리포트 받아보기
          </button>
        </div>
      )}

      {/* 로딩 상태 */}
      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>AI가 식단을 분석하고 있어요... </p>
        </div>
      )}

      {/* 분석 결과 표시 */}
      {showReport && !isLoading && (
        <div className={styles.reportContent}>
          <h3>이번 식사 피드백</h3>
          <p className={styles.cardSubtitle}>
            더 건강한 한끼를 위해 AI의 맞춤 조언을 확인해 보세요.
          </p>
          <div className={styles.scoreSection}>
            <strong>영양 점수: {aiData.score} / 100</strong>
          </div>
          <div className={styles.tagsSection}>
            <p>부족/과다 태그:</p>
            <ul>
              {aiData.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
          <div className={styles.aiComment}>
            <p>{aiData.comment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiReport;
