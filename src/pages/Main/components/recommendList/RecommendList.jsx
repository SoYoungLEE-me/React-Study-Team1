import React from 'react'
import styles from './RecommendList.module.css'
import RecommendItem from '../recommendItem/RecommendItem'

const RecommendList = () => {
  const items = [
    {
      title: "닭가슴살 샐러드 볼",
      tags: ["고단백", "채소 풍부", "저나트륨"],
      reviews: ["단백질 충분", "식이섬유 충분", "멋진 식사!"]
    },
    {
      title: "두부 채소 비빔밥",
      tags: ["부담 없는 칼로리", "균형 잡힌 한 끼"],
      reviews: ["저칼로리 식단"]
    },
    {
      title: "연어 포케",
      tags: ["오메가3", "단백질 보강"],
      reviews: ["영양 충분", "단백질 아쉽", "영양잡힌 식사 필요!"]
    },
  ];
  
  return (
    <div className={styles.recommend_box}>
      <h2>부족 영양소 기반 메뉴 추천</h2>
      <div className={styles.today_rec_box}>
        <h3 className={styles.today_rec}>오늘의 추천</h3>

        <div className={styles.recommend_list}>
          {items.map((item) => (
            <RecommendItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecommendList
