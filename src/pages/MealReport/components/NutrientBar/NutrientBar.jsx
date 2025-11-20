import React, { useEffect, useState } from "react";
import styles from "./NutrientBar.module.css";

const NutrientBar = ({ label, value, goal, color }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const targetPercentage = Math.min((value / goal) * 100, 100);

    const timer = setTimeout(() => {
      setWidth(targetPercentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [value, goal]);

  return (
    <div className={styles.barContainer}>
      <span>{label}</span>
      <div className={styles.barBackground}>
        <div
          className={styles.barForeground}
          style={{ width: `${width}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default NutrientBar;
