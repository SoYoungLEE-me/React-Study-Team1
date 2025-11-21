import React, { useEffect, useState } from "react";
import styles from "./MacroRatioBar.module.css";

const MacroRatioBar = ({ carbs, protein, fat }) => {
  // 애니메이션을 위한 상태
  const [ratios, setRatios] = useState({ c: 0, p: 0, f: 0 });

  useEffect(() => {
    //칼로리 기준 영양비율
    const cKcal = carbs * 4;
    const pKcal = protein * 4;
    const fKcal = fat * 9;
    const totalKcal = cKcal + pKcal + fKcal || 1; // 0 나누기 방지

    const cRatio = (cKcal / totalKcal) * 100;
    const pRatio = (pKcal / totalKcal) * 100;
    const fRatio = (fKcal / totalKcal) * 100;

    // 애니메이션 효과
    const timer = setTimeout(() => {
      setRatios({ c: cRatio, p: pRatio, f: fRatio });
    }, 100);

    return () => clearTimeout(timer);
  }, [carbs, protein, fat]);

  return (
    <div className={styles.container}>
      <div className={styles.labelGroup}>
        <span>탄단지 비율 (칼로리 기준)</span>
      </div>

      {/* 막대기 비율 바 */}
      <div className={styles.barBackground}>
        {/* 탄수화물 (주황) */}
        <div
          className={styles.segment}
          style={{ width: `${ratios.c}%`, backgroundColor: "#ff9800" }}
        />
        {/* 단백질 (초록) */}
        <div
          className={styles.segment}
          style={{ width: `${ratios.p}%`, backgroundColor: "#4caf50" }}
        />
        {/* 지방 (파랑) */}
        <div
          className={styles.segment}
          style={{ width: `${ratios.f}%`, backgroundColor: "#2196f3" }}
        />
      </div>

      {/* 하단 범례 (Legend) */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span
            className={styles.dot}
            style={{ backgroundColor: "#ff9800" }}
          ></span>
          <span>탄수 {Math.round(ratios.c)}%</span>
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.dot}
            style={{ backgroundColor: "#4caf50" }}
          ></span>
          <span>단백 {Math.round(ratios.p)}%</span>
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.dot}
            style={{ backgroundColor: "#2196f3" }}
          ></span>
          <span>지방 {Math.round(ratios.f)}%</span>
        </div>
      </div>
    </div>
  );
};

export default MacroRatioBar;
