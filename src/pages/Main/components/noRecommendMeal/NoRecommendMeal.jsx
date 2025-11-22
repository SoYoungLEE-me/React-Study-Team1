import React from 'react'
import styles from './NoRecommendMeal.module.css'
import { motion } from "motion/react"

const NoRecommendMeal = () => {
  const fadeUp = {
    hidden: {opacity: 0, y: 40},
    show: {opacity: 1, y: 0, transition: {duration: 0.6}}
  };

  return (
    <motion.div className={styles.recommend_box} initial='hidden' animate='show' variants={fadeUp}>
      <h2>부족 영양소 기반 메뉴 추천</h2>
      <div className={styles.today_rec_box}>
        <div className={styles.recommend_list}>
          <div className={styles.small_content}>오늘의 요약을 보러가시면</div>
          <div className={styles.small_content}>부족한 영양소를 기반으로</div>
          <div className={styles.content}>메뉴를 추천하고 있어요! 🍱</div>
        </div>
      </div>
    </motion.div>
  )
}

export default NoRecommendMeal
