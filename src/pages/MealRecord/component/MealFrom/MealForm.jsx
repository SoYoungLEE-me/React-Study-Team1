import React, { useEffect, useState } from "react";
import { useMealStore } from "../../../../stores/useMealStore";
import styles from "./MealFrom.module.css";

const MealForm = () => {
  const { selectedDate, editType, getMealsByDate, saveMeal, setEditType } = useMealStore();

  const todayMeals = getMealsByDate(selectedDate);

  const [type, setType] = useState(editType || "breakfast");
  const [items, setItems] = useState(todayMeals[type] || []);
  const [input, setInput] = useState("");

  useEffect(() => {
    setType(editType || "breakfast");
  }, [editType]);

  useEffect(() => {
    const updatedMeals = getMealsByDate(selectedDate);
    setItems(updatedMeals[type] || []);
  }, [type, selectedDate]);

  const addItem = () => {
    if (input.trim() === "") return;
    setItems((prev) => [...prev, input]);
    setInput("");
  };

  const save = () => {
    saveMeal(selectedDate, type, items);
    setEditType(null);
  };
  if (!selectedDate) return null;

  return (
    <div className={styles.meal_form}>
      <h3>식단 추가 / 수정</h3>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="breakfast">아침</option>
        <option value="lunch">점심</option>
        <option value="dinner">저녁</option>
        <option value="snack">간식</option>
      </select>

      <div className={styles.add_box}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <button onClick={addItem}>추가</button>
      </div>

      <div className={styles.items_list}>
        {items.map((i, idx) => (
          <div key={idx}>{i}</div>
        ))}
      </div>

      <button onClick={save}>식단 저장</button>
    </div>
  );
};

export default MealForm;
