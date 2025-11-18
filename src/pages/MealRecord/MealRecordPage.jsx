import React from "react";
import styles from "./MealRecordPage.module.css";
import CalendarWeek from "./component/CalendarWeek/CalendarWeek";
import MealSummary from "./component/MealSummary/MealSummary";
import MealForm from "./component/MealFrom/MealForm";
import { useMealStore } from "../../stores/useMealStore";

const MealRecordPage = () => {
  // 주차 계산 함수
  const getWeekOfMonth = (date) => {
    const current = new Date(date);
    const first = new Date(current.getFullYear(), current.getMonth(), 1);

    const firstDay = first.getDay();
    const currentDate = current.getDate();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  const { selectedDate } = useMealStore();

  const year = selectedDate?.getFullYear();
  const month = selectedDate?.getMonth() + 1;
  const day = selectedDate?.getDate();
  const week = selectedDate ? getWeekOfMonth(selectedDate) : 0;

  const weekNames = ["첫째주", "둘째주", "셋째주", "넷째주", "다섯째주"];
  const weekText = week ? weekNames[week - 1] : "";

  return (
    <section className={styles.meal_page}>
      <div className={styles.inner}>
        <div className={styles.page_title}>
          <h2>식단 기록 & 캘린더</h2>
          <p>날짜별 식단을 확인하고, 아침/점심/저녁/간식 기록을 추가·수정·삭제할 수 있습니다. </p>
        </div>
        <div className={styles.sec_inner}>
          <div className={styles.sec_calender}>
            <h3 className={styles.sec_title}>식단 캘린더</h3>
            <div className={styles.calender}>
              <h4 className={styles.sub_title}>
                {selectedDate && `${year}년 ${month}월 ${weekText}`}
              </h4>
              <div className={styles.calender_wrap}>
                <CalendarWeek />
                <MealSummary />
              </div>
            </div>
            <div className={styles.summary}>
              <h4 className={styles.sub_title}>
                {selectedDate && `${month}월 ${day}일 식단 요약`}
              </h4>
              <div className={styles.summary_wrap}></div>
            </div>
          </div>
          <div className={styles.sec_form}>
            <MealForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealRecordPage;
