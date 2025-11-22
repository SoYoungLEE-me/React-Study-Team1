import React, { useEffect, useState } from "react";
import SummaryToday from "./components/summaryToday/SummaryToday";
import RecommendList from "./components/recommendList/RecommendList";
import styles from "./MainPage.module.css";
import { useUserStore } from "../../stores/useUserStore";
import NoReportMeal from "./components/noReportMeal/NoReportMeal";
import NoRecommendMeal from "./components/noRecommendMeal/NoRecommendMeal";
import Landing from "./components/landing/Landing";
import { useTodaySummary } from "../../stores/useTodaySummary";

const Main = () => {
  const { authenticate } = useUserStore();
  const { todaySummary } = useTodaySummary();
  const [isFirst, setIsFirst] = useState();

  useEffect(() => {
    if (!todaySummary || Object.keys(todaySummary).length === 0) {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }
  }, [todaySummary]);

  return (
    <div>
      <div className={styles.container}>
        {!authenticate ? (
          <Landing></Landing>
        ) : isFirst ? (
          <NoReportMeal></NoReportMeal>
        ) : (
          <SummaryToday></SummaryToday>
        )}
        {authenticate &&
          (isFirst ? <NoRecommendMeal></NoRecommendMeal> : <RecommendList></RecommendList>)}
      </div>
    </div>
  );
};

export default Main;
