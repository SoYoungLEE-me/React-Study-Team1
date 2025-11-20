import React, { useState } from "react";
import styles from "./AiReport.module.css";

const AiReport = ({ data, remainingCount = 3 }) => {
  const [showReport, setShowReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetReport = () => {
    if (remainingCount <= 0) {
      alert("오늘의 AI 분석 횟수를 모두 사용하셨습니다.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowReport(true);
    }, 1500);
  };

  return (
    <div className={styles.card}>
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

      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>AI가 식단을 분석하고 있어요... </p>
        </div>
      )}

      {showReport && (
        <div className={styles.reportContent}>
          <h3>이번 식사 피드백</h3>
          <p className={styles.cardSubtitle}>
            더 건강한 한끼를 위해 AI의 맞춤 조언을 확인해 보세요.
          </p>
          <div className={styles.scoreSection}>
            <strong>영양 점수: {data.score} / 100</strong>
          </div>
          <div className={styles.tagsSection}>
            <p>부족/과다 태그:</p>
            <ul>
              {data.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
          <div className={styles.aiComment}>
            <p>{data.comment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiReport;
