import React from 'react'
import styles from './NoReportMeal.module.css'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"

const NoReportMeal = () => {
  const fadeUp = {
    hidden: {opacity: 0, y: 40},
    show: {opacity: 1, y: 0, transition: {duration: 0.6}}
  };

  const navigate = useNavigate();

  const goTodaySummary = () => {
    navigate('/');
  };

  return (
    <motion.div className={styles.summary_card} initial='hidden' animate='show' variants={fadeUp}>
      <h2>오늘 요약</h2>
      <p className={styles.summary_desc}>
        오늘 날짜 기준으로 영양 점수, 부족/과다한 영양소, 추천 메뉴를 한눈에 확인해요.
      </p>

      <div className={styles.summary_content}>
        <div className={styles.content}>
            오늘의 요약을 아직 안 보셨군요!
        </div>
        <div className={styles.content}>
            오늘의 요약을 확인하실까요? 😊
        </div>
        <div>
            <button className={styles.summary_button} onClick={goTodaySummary}>오늘의 요약 보러가기</button>
        </div>
      </div>
    </motion.div>
  )
}

export default NoReportMeal
