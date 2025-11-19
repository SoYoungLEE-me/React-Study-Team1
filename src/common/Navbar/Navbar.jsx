import React, { useState } from "react";
import styles from './Navbar.module.css'
import MobileNavbar from "./MobileNavbar";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [open, setOpen] = useState(false);
  
  const goLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className={styles.header}>
        <Link to={'/'} className={styles.logo}>로그자리</Link>
          <ul className={styles.nav_menu}>
            <li><Link to={'/'}>Home</Link></li>
            <li>Log</li>
            <li>Recommend</li>
            <li>Report</li>
            <li>Settings</li>
          </ul>
        <div className={styles.nav_right}>
          <div className={styles.hamburger} onClick={() => setOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          { login
          ? <div className={styles.user_icon}>U</div>
          : <div className={styles.login} onClick={goLogin}>LOGIN</div>
          }
        </div>
      </div>

      <MobileNavbar open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
