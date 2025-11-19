import React from "react";
import styles from "./MealRecordPage.module.css";
import CalendarWeek from "./components/CalendarWeek/CalendarWeek";
import MealSummary from "./components/MealSummary/MealSummary";
import MealForm from "./components/MealFrom/MealForm";
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

  const dateObj = selectedDate ? new Date(selectedDate) : null;
  const year = dateObj?.getFullYear();
  const month = dateObj?.getMonth() + 1;
  const day = dateObj?.getDate();
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
            <div className={styles.sec_title}>
              <h3>식단 캘린더</h3>
              <p>날짜별 점수/상태 표시</p>
            </div>
            <div className={styles.calender}>
              <h4 className={styles.sub_title}>
                {selectedDate && `${year}년 ${month}월 ${weekText}`}
              </h4>
              <div className={styles.calender_wrap}>
                <CalendarWeek />
              </div>
            </div>
            <div className={styles.summary}>
              <h4 className={styles.sub_title}>
                {selectedDate && `${month}월 ${day}일 식단 요약`}
              </h4>
              <div className={styles.summary_wrap}>
                <MealSummary />
              </div>
            </div>
          </div>
          <div className={styles.sec_form}>
            <div className={styles.sec_title}>
              <h3>식단 추가 / 수정</h3>
              <p>식사 타입, 시간, 음식명을 입력하고 저장합니다. </p>
            </div>
            <MealForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealRecordPage;
