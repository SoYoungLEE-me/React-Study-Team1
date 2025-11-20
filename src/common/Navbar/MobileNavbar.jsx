import React from 'react'
import styles from './MobileNavbar.module.css'
import { useNavigate } from 'react-router-dom'

const MobileNavbar = ({open, onClose}) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
    onClose();
  };

  return (
    <div>
      <div className={`${styles.backdrop} ${open ? styles.show : ''}`} onClick={onClose}></div>

      <nav className={`${styles.mobile_nav} ${open ? styles.open : ''}`}>
        <div className={styles.mobile_nav_header}>
          <span className={styles.close_btn} onClick={onClose}>✕</span>
        </div>

        <ul>
          <li onClick={goHome}>Home</li>
          <li onClick={onClose}>Log</li>
          <li onClick={onClose}>Recommend</li>
          <li onClick={onClose}>Report</li>
          <li onClick={onClose}>Settings</li>
        </ul>
      </nav>
    </div>
  )
}

export default MobileNavbar
