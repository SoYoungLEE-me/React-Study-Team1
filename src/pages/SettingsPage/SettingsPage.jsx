import React, { useState } from "react";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(70);
  const [mode, setMode] = useState("maintenance");

  const handleResetData = () => {
    if (
      window.confirm(
        "정말로 모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      alert("모든 데이터가 초기화되었습니다.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <span className={styles.categoryLabel}>SETTINGS</span>
        <h2>기본 목표 & 데이터 관리</h2>
        <p>
          목표 칼로리/단백질 등을 설정하거나, 전체 데이터를 초기화할 수
          있습니다.
        </p>
      </div>

      <div className={styles.card}>
        {/* 기본 목표 설정 */}
        <section className={styles.section}>
          <h3>기본 목표 설정</h3>
          <p className={styles.sectionSubtitle}>
            일일 목표 섭취량과 식단 모드를 설정합니다.
          </p>

          <div className={styles.inputGroup}>
            <label htmlFor="calories">목표 칼로리</label>
            <div className={styles.inputWithUnit}>
              <input
                type="number"
                id="calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <span className={styles.unit}>kcal</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="protein">단백질</label>
            <div className={styles.inputWithUnit}>
              <input
                type="number"
                id="protein"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
              <span className={styles.unit}>g</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mode">목표 모드</label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className={styles.selectBox}
            >
              <option value="maintenance">유지</option>
              <option value="diet">다이어트</option>
              <option value="bulkup">벌크업</option>
            </select>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* 데이터 초기화 */}
        <section className={styles.section}>
          <h3>데이터 초기화</h3>

          <p className={styles.warningText}>
            모든 기록이 삭제되면 되돌릴 수 없습니다.
          </p>

          <button onClick={handleResetData} className={styles.resetButton}>
            전체 데이터 초기화
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
