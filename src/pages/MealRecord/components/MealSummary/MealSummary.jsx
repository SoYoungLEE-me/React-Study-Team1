import React from "react";
import { useMealStore } from "../../../../stores/useMealStore";
import styles from "./MealSummary.module.css";

const order = ["breakfast", "lunch", "dinner", "snack"];
const labels = {
  breakfast: "아침",
  lunch: "점심",
  dinner: "저녁",
  snack: "간식",
};

const MealSummary = () => {
  const { selectedDate, getMealsByDate, setEditType } = useMealStore();

  if (!selectedDate) return null;
  const meals = getMealsByDate(selectedDate);

  return (
    <div className={styles.meal_summary}>
      {order.map((type) => (
        <div key={type} className={styles.meal_box} onClick={() => setEditType(type)}>
          <strong>{labels[type]}</strong>
          <div>{meals[type]?.join(", ") || `오늘의 ${labels[type]} 기록을 해주세요`}</div>
        </div>
      ))}
    </div>
  );
};

export default MealSummary;
