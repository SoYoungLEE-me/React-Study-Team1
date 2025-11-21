// src/components/common/Modal.jsx
import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // 안쪽 클릭 시 닫히지 않게
      >
        <button className={styles.close_btn} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
