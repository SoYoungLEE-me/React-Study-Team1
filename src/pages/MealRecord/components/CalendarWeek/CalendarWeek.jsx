import React from "react";
import { useMealStore } from "../../../../stores/useMealStore";
import { getWeekDates } from "../../../../utils/getWeekDates";
import styles from "./CalendarWeek.module.css";

const CalendarWeek = () => {
  const { selectedDate, setSelectedDate } = useMealStore();

  const weekDates = getWeekDates(selectedDate);

  return (
    <div className={styles.calendar}>
      <ul className={styles.day_list}>
        <li>일</li>
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
      </ul>

      <ul className={styles.date_list}>
        {weekDates.map((date) => (
          <li
            key={date}
            className={`${selectedDate === date ? styles.active : ""}`}
            onClick={() => setSelectedDate(date)}
          >
            <p>{date.split("-")[2]}</p>
            <div className={styles.score_circle}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarWeek;
