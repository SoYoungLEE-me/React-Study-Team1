import React, { useState, useMemo } from "react";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  // --- 상태 관리 ---
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(25);
  const [mode, setMode] = useState("maintenance"); // maintenance, diet, bulkup

  const [calories, setCalories] = useState(2500);
  const [carbs, setCarbs] = useState(300);
  const [protein, setProtein] = useState(80);
  const [fat, setFat] = useState(60);

  // 보건복지부 한국인 영양소 섭취 기준 등을 기준으로 한 권장량 로직
  const recommendation = useMemo(() => {
    let baseKcal = 0;

    if (gender === "male") {
      baseKcal = age < 30 ? 2600 : age < 50 ? 2400 : 2200;
    } else {
      baseKcal = age < 30 ? 2100 : age < 50 ? 1900 : 1800;
    }

    let targetKcal = baseKcal;
    if (mode === "diet") targetKcal -= 500;
    else if (mode === "bulkup") targetKcal += 300;

    let ratio = { c: 0.5, p: 0.3, f: 0.2 }; // 기본 (유지)
    if (mode === "diet") ratio = { c: 0.4, p: 0.4, f: 0.2 }; // 다이어트 (저탄고단)
    if (mode === "bulkup") ratio = { c: 0.5, p: 0.3, f: 0.2 }; // 벌크업 (고탄수)

    return {
      kcal: targetKcal,
      c: Math.round((targetKcal * ratio.c) / 4),
      p: Math.round((targetKcal * ratio.p) / 4),
      f: Math.round((targetKcal * ratio.f) / 9),
    };
  }, [gender, age, mode]);

  const handleApplyRecommendation = () => {
    if (
      window.confirm("현재 설정된 정보로 목표 수치를 자동 갱신하시겠습니까?")
    ) {
      setCalories(recommendation.kcal);
      setCarbs(recommendation.c);
      setProtein(recommendation.p);
      setFat(recommendation.f);
    }
  };

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
        <h2>나의 목표 설정</h2>
        <p>신체 정보와 목표에 맞춰 권장 섭취량을 확인하고 설정해보세요.</p>
      </div>

      <div className={styles.card}>
        <section className={styles.section}>
          <h3>기본 정보 & 목표 모드</h3>
          <div className={styles.gridRow}>
            <div className={styles.inputGroup}>
              <label>성별</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.selectBox}
              >
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>나이</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={styles.inputBox}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>목표</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className={styles.selectBox}
              >
                <option value="maintenance">체중 유지</option>
                <option value="diet">다이어트</option>
                <option value="bulkup">벌크업</option>
              </select>
            </div>
          </div>
        </section>

        <div className={styles.guideBox}>
          <div className={styles.guideText}>
            <h4>💡 맞춤 권장 가이드</h4>
            <p>
              선택하신 정보 기준 권장 섭취량:
              <strong> {recommendation.kcal}kcal </strong>
              (탄 {recommendation.c}g / 단 {recommendation.p}g / 지{" "}
              {recommendation.f}g)
            </p>
          </div>
          <button
            className={styles.applyButton}
            onClick={handleApplyRecommendation}
          >
            권장값 자동 입력
          </button>
        </div>

        <hr className={styles.divider} />

        <section className={styles.section}>
          <h3>상세 목표 설정</h3>
          <p className={styles.sectionSubtitle}>
            가이드를 참고하여 나만의 목표를 직접 수정할 수 있습니다.
          </p>

          <div className={styles.inputGroup} style={{ marginBottom: "1.5rem" }}>
            <label>하루 목표 칼로리</label>
            <div className={styles.inputWithUnit}>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className={styles.mainInput}
              />
              <span className={styles.unitText}>kcal</span>
            </div>
          </div>

          {/* 탄/단/지 (3열 배치) */}
          <div className={styles.gridThree}>
            <div className={styles.miniInputGroup}>
              <label>탄수화물</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                />
                <span>g</span>
              </div>
            </div>
            <div className={styles.miniInputGroup}>
              <label>단백질</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
                <span>g</span>
              </div>
            </div>
            <div className={styles.miniInputGroup}>
              <label>지방</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
                <span>g</span>
              </div>
            </div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* 4. 초기화 */}
        <section className={styles.section}>
          <div className={styles.resetArea}>
            <div>
              <h3>데이터 초기화</h3>
              <p className={styles.warningText}>모든 식단 기록이 삭제됩니다.</p>
            </div>
            <button onClick={handleResetData} className={styles.resetButton}>
              초기화
            </button>
          </div>
        </section>
        {/* 저장 */}
        <section className={styles.section}>
          <div className={styles.saveArea}>
            <button className={styles.saveButton}>저장</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
