import React from "react";
import { useMealStore } from "../../../../stores/useMealStore";
import { getWeekDates } from "../../../../utils/getWeekDates";
import styles from "./CalendarWeek.module.css";

const CalendarWeek = () => {
  const { selectedDate, setSelectedDate } = useMealStore();

  // 기본값: 오늘 날짜
  const baseDate = selectedDate || new Date().toISOString().slice(0, 10);

  const weekDates = getWeekDates(baseDate);

  return (
    <div className={styles.calendar_week}>
      {weekDates.map((date) => (
        <div
          key={date}
          className={`date-box ${selectedDate === date ? "active" : ""}`}
          onClick={() => setSelectedDate(date)}
        >
          {date.split("-")[2]}
        </div>
      ))}
    </div>
  );
};

export default CalendarWeek;
