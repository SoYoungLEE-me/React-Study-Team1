import React from 'react'
import styles from './StatusNutrients.module.css'

const StatusNutrients = ({level, label}) => {
  return (
    <div className= {`${styles.stauts} ${styles[level]}`}>
      <span className={styles.dot}></span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default StatusNutrients
