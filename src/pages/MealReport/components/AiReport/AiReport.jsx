import React from "react";
import styles from "./AiReport.module.css";

const AiReport = ({ data }) => {
  return (
    <div className={styles.card}>
      <h3>오늘의 식단 피드백</h3>
      <p className={styles.cardSubtitle}>
        더 건강한 내일을 위한 AI의 맞춤 조언을 확인해 보세요.
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
  );
};

export default AiReport;
