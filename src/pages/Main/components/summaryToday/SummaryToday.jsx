import React from 'react'
import styles from './SummaryToday.module.css'
import StatusNutrients from '../statusNutrients/StatusNutrients'
import { Link } from 'react-router-dom'

const SummaryToday = ({ data }) => {
  return (
    <div className={styles.summary_card}>
      <h2>오늘 요약</h2>
      <p className={styles.summary_desc}>
        오늘 날짜 기준으로 영양 점수, 부족/과다한 영양소, 추천 메뉴를 한눈에 확인해요.
      </p>

      <div className={styles.summary_content}>
        <div className={styles.score_circle}>
          <div className={styles.circle}>
            <span>{data?.score}</span>
            <p>/ 100 점</p>
          </div>
        </div>

        <div className={styles.summary_tags}>
          {data?.nutrients?.map((item) =>
            <StatusNutrients level={item.level} label={item.name}></StatusNutrients>
          )}

          <div className={styles.ai_comment}>
            AI 코멘트:<br />
            오늘은 단백질과 채소 섭취는 적절하지만, 국물 위주의 식사로{" "}
            나트륨이 다소 높은 편이에요.
          </div>
        </div>
      </div>

      <div className={styles.summary_buttons}>
        <Link to="/record">
          <button className={styles.btn_green}>식단 기록하기</button>
        </Link>
        <button className={styles.btn_outline}>오늘 기록 자세히 보기</button>
      </div>
    </div>
  )
}

export default SummaryToday
