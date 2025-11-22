import React, { useEffect, useState } from "react";
import styles from './Navbar.module.css'
import MobileNavbar from "./MobileNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

const Navbar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const {user, authenticate, logout} = useUserStore();
  const [userIcon, setUserIcon] = useState();
  
  const goLogin = () => {
    navigate('/login');
  };

  const goJoin = () => {
    navigate('/join');
  }

  const goLogout = () => {
    setShowProfileMenu(false);
    logout();
    navigate('/');
  }

  const goSetting = () => {
    setShowProfileMenu(false);
    navigate('/settings');
  }

  useEffect(() => {
    if(Object.keys(user).length !== 0){
      setUserIcon(user.id.charAt(0));
    }
  }, [user]);

  return (
    <>
      <div className={styles.header}>
        <Link to={'/'} className={styles.logo}><img className={styles.logo_img} src={'logo3.png'}></img></Link>
          <ul className={styles.nav_menu}>
            <li><Link to={'/'}>홈</Link></li>
            <li><Link to={'/record'}>식단 입력</Link></li>
            <li><Link to={'/settings'}>목표 설정</Link></li>
          </ul>
        <div className={styles.nav_right}>
          { authenticate
          ? <div className={styles.user_icon} onClick={() => setShowProfileMenu(prev => !prev)}>{userIcon}</div>
          : <div className={styles.login} onClick={goLogin}>LOGIN</div>
          }
          { !authenticate &&
          <div className={styles.login} onClick={goJoin}>JOIN</div>
          }
          <div className={styles.hamburger} onClick={() => setOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {authenticate && showProfileMenu && (
        <div className={styles.profile_menu}>
          <div className={styles.menu_item} onClick={goSetting}>목표 설정</div>
          <div className={styles.menu_item} onClick={goLogout}>로그아웃</div>
        </div>
      )}

      <MobileNavbar open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
