import React from "react";
import SummaryToday from "./components/summaryToday/SummaryToday";
import RecommendList from "./components/recommendList/RecommendList";
import styles from './MainPage.module.css'

const Main = () => {
  const data = {
  "score": 82,
  "nutrients": 
    [{key: "protein", level: "good", name: "단백질"}
      ,{key: "carbohydrate", level: "soso", name: "탄수화물"}
      ,{key: "fat", level: "bad", name: "지방"}
    ]
  };

  return (
    <div>
      <div className={styles.container}>
        <SummaryToday data={data}></SummaryToday>
        <RecommendList></RecommendList>
      </div>
    </div>
  );
};

export default Main;
