import React, { useEffect, useState } from "react";
import { useMealStore } from "../../../../stores/useMealStore";
import styles from "./MealFrom.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MealForm = () => {
  const { selectedDate, editType, getMealsByDate, saveMeal, setEditType } = useMealStore();
  const todayMeals = getMealsByDate(selectedDate);

  const [type, setType] = useState(editType || "breakfast");
  const [items, setItems] = useState(todayMeals[type] || []);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    setType(editType || "breakfast");
  }, [editType]);

  useEffect(() => {
    const updatedMeals = getMealsByDate(selectedDate);
    setItems(updatedMeals[type] || []);
  }, [type, selectedDate]);

  const generateTimes = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m of ["00", "30"]) {
        const hour = String(h).padStart(2, "0");
        times.push(`${hour}:${m}`);
      }
    }
    return times;
  };

  const addItem = () => {
    if (input.trim() === "") return;
    setItems((prev) => [...prev, { time, text: input }]);
    setInput("");
  };

  const save = () => {
    saveMeal(selectedDate, type, items);
    setEditType(null);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteAll = () => {
    setItems([]);
  };

  if (!selectedDate) return null;

  return (
    <div className={styles.meal_form}>
      <div className={styles.meal_select}>
        <div className={styles.select_wrap}>
          <span className={styles.small_title}>식사 타입</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="breakfast">아침</option>
            <option value="lunch">점심</option>
            <option value="dinner">저녁</option>
            <option value="snack">간식</option>
          </select>
        </div>

        <div className={styles.select_wrap}>
          <span className={styles.small_title}>시간</span>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            {generateTimes().map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.add_box}>
        <span className={styles.small_title}>음식명</span>
        <div className={styles.add_wrap}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />

          <button onClick={addItem}>추가</button>
        </div>
      </div>

      <div className={styles.items_box}>
        <span className={styles.small_title}>입력한 식단</span>
        <div className={styles.items_wrap}>
          <p>
            <span>식사 시간 : </span>
            {time}
          </p>
          <ul className={styles.item_list}>
            {items.map((i, idx) => (
              <li key={idx}>
                <p>{i.text}</p>
                <button onClick={() => removeItem(idx)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.btn_wrap}>
        <button onClick={save}>저장하기</button>
        <button onClick={deleteAll}>전체 삭제</button>
        <button>요약 보러 가기</button>
      </div>
    </div>
  );
};

export default MealForm;
