import React from "react";
import styles from "./Landing.module.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className={styles.container}>
      <motion.div className={styles.heroSection} initial="hidden" animate="show" variants={fadeUp}>
        <img src={"./logo3.png"} className={styles.logoImg}></img>
        <p className={styles.title}>영양 균형을 기반으로 식단을 분석하고 추천하는 서비스</p>
      </motion.div>

      <div className={styles.mainSection}>
        <motion.div
          className={styles.leftColumn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeLeft}
        >
          <img src={"/land_img.png"} className={styles.land_img} />
        </motion.div>

        <motion.div
          className={styles.rightColumn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeRight}
        >
          <div className={styles.box}>오늘의 식단 요약과 피드백을 제공합니다.</div>
          <div className={styles.box}>부족한 영양소 기반 추천 메뉴를 확인할 수 있습니다.</div>
          <div className={styles.box}>식단 기록 & 캘린더 기능 제공</div>
        </motion.div>
      </div>

      <motion.div
        className={styles.section}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <button className={styles.joinBtn} onClick={() => navigate("/join")}>
          지금 바로 시작하기
        </button>
      </motion.div>
    </div>
  );
};

export default Landing;
