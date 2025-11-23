import React from "react";
import styles from "./MobileNavbar.module.css";
import { useNavigate } from "react-router-dom";

const MobileNavbar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    onClose();
  };

  const goRecord = () => {
    navigate('/record');
    onClose();
  };

  const goSetting = () => {
    navigate('/settings');
    onClose();
  };

  return (
    <div>
      <div className={`${styles.backdrop} ${open ? styles.show : ""}`} onClick={onClose}></div>

      <nav className={`${styles.mobile_nav} ${open ? styles.open : ""}`}>
        <div className={styles.mobile_nav_header}>
          <span className={styles.close_btn} onClick={onClose}>
            ✕
          </span>
        </div>

        <ul>
          <li onClick={goHome}>홈</li>
          <li onClick={goRecord}>식단 입력</li>
          <li onClick={goSetting}>목표 설정</li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavbar;
