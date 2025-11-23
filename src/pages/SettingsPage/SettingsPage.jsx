import React, { useMemo, useState } from "react";
import styles from "./SettingsPage.module.css";
import { useUserGoal } from "../../stores/useUsergoalStore";

const SettingsPage = () => {
  const { editorGoal, updateEditor, saveGoal, resetGoal } = useUserGoal();

  const { gender, age, mode, calories, carbs, protein, fat } = editorGoal;

  const [errors, setErrors] = useState({ age: "", calories: "", carbs: "", protein: "", fat: "" });

  // 권장 섭취량 계산
  const recommendation = useMemo(() => {
    let baseKcal = 0;

    if (gender === "male") {
      baseKcal = age < 30 ? 2500 : age < 50 ? 2400 : 2200;
    } else {
      baseKcal = age < 30 ? 2000 : age < 50 ? 1900 : 1800;
    }

    let targetKcal = baseKcal;
    if (mode === "diet") targetKcal -= 500;
    else if (mode === "bulkup") targetKcal += 300;

    let ratio = { c: 0.5, p: 0.2, f: 0.3 };

    if (mode === "diet") ratio = { c: 0.4, p: 0.25, f: 0.35 };
    else if (mode === "bulkup") ratio = { c: 0.55, p: 0.2, f: 0.25 };

    return {
      kcal: targetKcal,
      c: Math.round((targetKcal * ratio.c) / 4),
      p: Math.round((targetKcal * ratio.p) / 4),
      f: Math.round((targetKcal * ratio.f) / 9),
    };
  }, [gender, age, mode]);

  const applyRecommendation = () => {
    if (window.confirm("현재 설정된 정보로 권장치로 자동 적용할까요?")) {
      updateEditor("calories", recommendation.kcal);
      updateEditor("carbs", recommendation.c);
      updateEditor("protein", recommendation.p);
      updateEditor("fat", recommendation.f);
    }
  };

  const handleResetData = () => {
    if (window.confirm("정말 초기화할까요?")) {
      resetGoal();
      alert("초기화되었습니다!");
    }
  };

  const handleSave = () => {
    let valid = true;
    const newErrors = { age: "", calories: '', carbs: '', protein: '', fat: '' };

    if(age === ''){
      newErrors.age = '나이를 입력해주세요.';
      valid = false;
    }

    if(calories === 0){
      newErrors.calories = '하루 목표 칼로리를 입력해주세요.'
      valid = false;
    }

    if(carbs === 0){
      newErrors.carbs = '탄수화물을 입력해주세요.'
      valid = false;
    }

    if(protein === 0){
      newErrors.protein = '단백질을 입력해주세요.'
      valid = false;
    }

    if(fat === 0){
      newErrors.fat = '지방을 입력해주세요.'
      valid = false;
    }

    setErrors(newErrors);

    if(!valid) return false;

    saveGoal();
    alert("저장되었습니다!");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        {/* <span className={styles.categoryLabel}>SETTINGS</span> */}
        <h2>나의 목표 설정</h2>
        <p>신체 정보와 목표에 맞춰 권장 섭취량을 확인하고 설정해보세요.</p>
      </div>

      <div className={styles.card}>
        {/* 기본 정보 */}
        <section className={styles.section}>
          <h3>기본 정보 & 목표 모드</h3>
          <div className={styles.gridRow}>
            <div className={styles.inputGroup}>
              <label>성별</label>
              <select
                value={gender}
                onChange={(e) => updateEditor("gender", e.target.value)}
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
                onChange={(e) => updateEditor("age", Number(e.target.value))}
                className={`${styles.inputBox} ${errors.age && styles.input_error}`}
              />
              {errors.age && <div className={styles.error_message}>{errors.age}</div>}
            </div>

            <div className={styles.inputGroup}>
              <label>목표</label>
              <select
                value={mode}
                onChange={(e) => updateEditor("mode", e.target.value)}
                className={styles.selectBox}
              >
                <option value="maintenance">체중 유지</option>
                <option value="diet">다이어트</option>
                <option value="bulkup">벌크업</option>
              </select>
            </div>
          </div>
        </section>

        {/* 권장 가이드 */}
        <div className={styles.guideBox}>
          <div className={styles.guideText}>
            <h4>💡 맞춤 권장 가이드</h4>
            <p>
              권장 섭취량:
              <strong> {recommendation.kcal}kcal </strong>
              (탄 {recommendation.c}g / 단 {recommendation.p}g / 지 {recommendation.f}g)
            </p>
          </div>
          <button className={styles.applyButton} onClick={applyRecommendation}>
            권장값 자동 입력
          </button>
        </div>

        <hr className={styles.divider} />

        {/* 상세 설정 */}
        <section className={styles.section}>
          <h3>상세 목표 설정</h3>
          <p className={styles.sectionSubtitle}>가이드를 참고해 직접 수정할 수 있어요.</p>

          {/* 칼로리 */}
          <div className={styles.inputGroup} style={{ marginBottom: "1.5rem" }}>
            <label>하루 목표 칼로리</label>
            <div className={styles.inputWithUnit}>
              <input
                type="number"
                value={calories}
                onChange={(e) => updateEditor("calories", Number(e.target.value))}
                className={`${styles.mainInput} ${errors.calories && styles.input_error}`}
              />
              <span className={styles.unitText}>kcal</span>
            </div>
            {errors.calories && <div className={styles.error_message}>{errors.calories}</div>}
          </div>

          {/* 3개 입력 */}
          <div className={styles.gridThree}>
            <div className={styles.miniInputGroup}>
              <label>탄수화물</label>
              <div className={`${styles.inputWrapper}  ${errors.carbs && styles.input_error}`}>
                <input
                  type="number"
                  value={carbs}
                  className={styles.nutritionInput}
                  onChange={(e) => updateEditor("carbs", Number(e.target.value))}
                />
                <span>g</span>
              </div>
                {errors.carbs && <div className={styles.error_message}>{errors.carbs}</div>}
            </div>

            <div className={styles.miniInputGroup}>
              <label>단백질</label>
              <div className={`${styles.inputWrapper}  ${errors.protein && styles.input_error}`}>
                <input
                  type="number"
                  value={protein}
                  className={styles.nutritionInput}
                  onChange={(e) => updateEditor("protein", Number(e.target.value))}
                />
                <span>g</span>
              </div>
              {errors.protein && <div className={styles.error_message}>{errors.protein}</div>}
            </div>

            <div className={styles.miniInputGroup}>
              <label>지방</label>
              <div className={`${styles.inputWrapper}  ${errors.fat && styles.input_error}`}>
                <input
                  type="number"
                  value={fat}
                  className={styles.nutritionInput}
                  onChange={(e) => updateEditor("fat", Number(e.target.value))}
                />
                <span>g</span>
              </div>
              {errors.fat && <div className={styles.error_message}>{errors.fat}</div>}
            </div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* 초기화 */}
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
            <button className={styles.saveButton} onClick={handleSave}>
              저장
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
