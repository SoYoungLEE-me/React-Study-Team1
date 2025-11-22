import React from "react";
import styles from "./StatusNutrients.module.css";

const StatusNutrients = ({ label, value, goal }) => {
  const percent = Math.min(100, Math.round((value / goal) * 100));

  const nutrientClass =
    label === "단백질" ? styles.protein : label === "탄수화물" ? styles.carbs : styles.fat; // 지방

  // console.log(percent);

  return (
    <div className={styles.status_row}>
      <span className={styles.label}>{label}</span>

      <div className={styles.bar_wrap}>
        <div
          className={`${styles.bar_fill} ${nutrientClass}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatusNutrients;
