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
      {order.map((type) => {
        const mealList = meals[type] || [];
        const hasMeal = mealList.length > 0;

        const time = hasMeal ? mealList[0].time : null;

        const menus = hasMeal ? mealList.map((i) => i.text).join(", ") : null;

        return (
          <div key={type} className={styles.meal_box} onClick={() => setEditType(type)}>
            <strong>{labels[type]}</strong>

            {hasMeal ? (
              <div>
                <p className={styles.time}>{time}</p>
                <p className={styles.menu}>{menus}</p>
              </div>
            ) : (
              <div>오늘의 {labels[type]}을 기록 해주세요!</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MealSummary;
