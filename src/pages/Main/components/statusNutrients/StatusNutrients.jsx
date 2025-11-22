import React from 'react'
import styles from './StatusNutrients.module.css'

const StatusNutrients = ({level, label}) => {
  console.log('???');
  const goal = 90;  //store에서 저장된 탄단지 각각의 목표치 불러와야함
  const current = 49; //오늘 날짜로 store에 저장된 탄단지의 섭취량

  const percent = Math.min(100, Math.round((current/goal) * 100));
console.log(percent);
  return (
    <div className={styles.status_row}>
      <span className={styles.label}>{label}</span>

      <div className={styles.bar_wrap}>
        <div 
          className={`${styles.bar_fill} ${styles[level]}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <span className={styles.percent}>{percent}%</span>
    </div>
  )
}

export default StatusNutrients
