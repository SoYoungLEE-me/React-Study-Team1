import React, { useEffect, useState } from "react";
import SummaryToday from "./components/summaryToday/SummaryToday";
import RecommendList from "./components/recommendList/RecommendList";
import styles from './MainPage.module.css'
import { useUserStore } from "../../stores/useUserStore";
import NoReportMeal from "./components/noReportMeal/NoReportMeal";
import NoRecommendMeal from "./components/noRecommendMeal/NoRecommendMeal";
import Landing from "./components/landing/Landing";
import { useMealStore } from "../../stores/useMealStore";
import { getToday } from "../../utils/getToday";

const Main = () => {
  // const [isFirst, setIsFirst] = useState(false)
  const isFirst = false;
  const {authenticate} = useUserStore();
  const {meals} = useMealStore();
  const data = {
  "score": 82,
  "nutrients": 
    [{key: "protein", level: "good", name: "단백질"}
      ,{key: "carbohydrate", level: "soso", name: "탄수화물"}
      ,{key: "fat", level: "bad", name: "지방"}
    ]
  };

  // useEffect(() => {
  //   let today = getToday();
  //   if(today in meals){
  //     setIsFirst(false);
  //   } else{
  //     setIsFirst(true);
  //   }
  // }, []);

  return (
    <div>
      <div className={styles.container}>
        {!authenticate
        ? <Landing></Landing>
        : (isFirst
          ? <NoReportMeal></NoReportMeal>
          : <SummaryToday data={data}></SummaryToday>
        )}
        {authenticate &&
         (isFirst
         ? <NoRecommendMeal></NoRecommendMeal>
         : <RecommendList></RecommendList>)
         }
      </div>
    </div>
  );
};

export default Main;
