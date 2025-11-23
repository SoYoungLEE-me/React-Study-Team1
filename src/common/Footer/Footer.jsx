import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.linkGroup}>
            <h4>바로가기</h4>
            <Link to="/">홈</Link>
            <Link to="/record">식단 입력</Link>
            <Link to="/settings">목표 설정</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4>지원</h4>
            <Link to="/">FAQ</Link>
            <Link to="/">문의하기</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4>정책</h4>
            <Link to="/">이용약관</Link>
            <Link to="/">개인정보처리방침</Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <strong className={styles.logo}>Balance Eat</strong>
            <p>© {currentYear} Balance Eat. All rights reserved.</p>
          </div>
          <div className={styles.socialLinks}>
            <a
              href="https://github.com/SoYoungLEE-me/React-Study-Team1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineEmail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
