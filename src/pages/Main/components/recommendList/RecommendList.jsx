import React from "react";
import styles from "./RecommendList.module.css";
import RecommendItem from "./recommendItem/RecommendItem";
import { useTodaySummary } from "../../../../stores/useTodaySummary";

const RecommendList = () => {
  const { recommendList } = useTodaySummary();

  return (
    <div className={styles.recommend_box}>
      <h2>부족 영양소 기반 메뉴 추천</h2>
      <div className={styles.today_rec_box}>
        <h3 className={styles.today_rec}>오늘의 추천</h3>

        <div className={styles.recommend_list}>
          {recommendList.map((menu, index) => (
            <RecommendItem key={index} item={menu} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendList;
