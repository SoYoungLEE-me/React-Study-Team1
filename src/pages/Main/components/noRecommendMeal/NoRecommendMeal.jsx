import React, { useEffect, useState } from "react";
import styles from "./NoRecommendMeal.module.css";
import { motion } from "motion/react";
import { useMealStore } from "../../../../stores/useMealStore";
import { getToday } from "../../../../utils/getToday";

const NoRecommendMeal = () => {
  const { getMealsByDate } = useMealStore();
  const [meals, setMeals] = useState(getMealsByDate(getToday()));
  const [noTodayMeal, setNoTodayMeal] = useState(true);

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    if (meals.breakfast.length === 0) {
      setNoTodayMeal(true);
    } else {
      setNoTodayMeal(false);
    }
  }, [meals]);

  return (
    <motion.div className={styles.recommend_box} initial="hidden" animate="show" variants={fadeUp}>
      <h2>부족 영양소 기반 메뉴 추천</h2>
      <div className={styles.today_rec_box}>
        <div className={styles.recommend_list}>
          <div className={styles.small_content}>
            {noTodayMeal ? "오늘의 식단을 입력하면" : "오늘의 요약을 보러가시면"} <br />
            부족한 영양소를 기반으로
          </div>
          <div className={styles.content}>메뉴를 추천하고 있어요! 🍱</div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoRecommendMeal;
