import React, { useState } from "react";
import styles from './Login.module.css'
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const {setUser, login} = useUserStore();
  const [errors, setErrors] = useState({ id: "", password: "" });

  const loginUser = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { id: "", password: "" };

    if(id === ''){
      newErrors.id = "아이디를 입력해주세요.";
      valid = false;
    }
    if(password === ''){
      newErrors.password = "비밀번호를 입력해주세요.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return false;

    login();
    setUser(id, password);
    navigate('/');
  };

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_container}>
        <h2 className={styles.login_title}>로그인</h2>

        <form onSubmit={loginUser} className={styles.login_form}>
          <div className={styles.input_group}>
            <input className={`${styles.input_box} ${errors.id && styles.input_error}`} type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)}/>
            {errors.id && (
              <div className={styles.error_message}>{errors.id}</div>
            )}
          </div>

          <div className={styles.input_group}>
            <input
              className={`${styles.input_box} ${errors.password && styles.input_error}`} type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {errors.password && (
              <div className={styles.error_message}>{errors.password}</div>
            )}
          </div>

          <button className={styles.login_button} type="submit">
            로그인
          </button>
        </form>

        <div className={styles.bottom_links}>
          <div className={styles.link} onClick={() => navigate("/join")}>회원가입</div>
          <div className={styles.link}>아이디 찾기</div>
          <div className={styles.link}>비밀번호 찾기</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
