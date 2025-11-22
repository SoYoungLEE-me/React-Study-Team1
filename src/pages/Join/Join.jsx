import React, { useEffect, useState } from 'react'
import styles from './Join.module.css'
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  // validation 상태 저장
  const [errors, setErrors] = useState({
    name: '',
    id: '',
    pw: ''
  });

  const join = (e) => {
    e.preventDefault();

    if (!validate()) return false;

    alert("가입하셨습니다.");
    setName('');
    setId('');
    setPw('');
    navigate('/login');
  };

  const validate = () => {
    let newErrors = {};

    newErrors.name = name.trim().length < 2 ? '이름은 최소 2글자 이상이어야 합니다.' : '';
    newErrors.id = id.trim().length < 4 ? '아이디는 4글자 이상이어야 합니다.' : '';
    newErrors.pw = pw.trim().length < 6 ? '비밀번호는 6자리 이상이어야 합니다.' : '';

    setErrors(newErrors);

    return Object.values(newErrors).every(v => v === '');
  };

  return (
    <div className={styles.join_container}>
      <div className={styles.join_title}>회원가입</div>

      <form className={styles.join_form} onSubmit={join}>

        <div>
          <label>이름</label>
          <input className={`${styles.join_input} ${errors.name ? styles.error_input : name ? styles.success_input : ''}`} type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          {errors.name && <p className={styles.error_text}>{errors.name}</p>}
        </div>

        <div>
          <label>아이디</label>
          <input className={`${styles.join_input} ${errors.id ? styles.error_input : id ? styles.success_input : ''}`} type="text" value={id} onChange={(e) => setId(e.target.value)}/>
          {errors.id && <p className={styles.error_text}>{errors.id}</p>}
        </div>

        <div>
          <label>비밀번호</label>
          <input className={`${styles.join_input} ${errors.pw ? styles.error_input : pw ? styles.success_input : ''}`} type="password" value={pw} onChange={(e) => setPw(e.target.value)}/>
          {errors.pw && <p className={styles.error_text}>{errors.pw}</p>}
        </div>

        <button type="submit" className={styles.join_button} disabled={!name || !id || !pw }>가입</button>
      </form>
    </div>
  )
}

export default Join
