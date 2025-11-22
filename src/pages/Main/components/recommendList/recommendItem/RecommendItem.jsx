import React from 'react'
import styles from './RecommendItem.module.css'

const RecommendItem = ({item}) => {
  return (
    <div className={styles.recommend_item}>
      <h4>{item.title}</h4>
      <div className={styles.tags}>
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className={styles.reviews}>
        {item.reviews.map((review) => (
          <span>{review}</span>
        ))}
      </div>
    </div>
  )
}

export default RecommendItem
