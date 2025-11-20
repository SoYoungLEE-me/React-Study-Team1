import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Join = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [gender, setGender] = useState('');

  const join = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/user", {
            "id":id,
            "pw":pw,
            "name":name,
            "gender":gender,
            "goal":null,
            "goalKcal":null,
            "goalProtein":null
    }).then((res) => {
        alert("가입하셨습니다.");
        setName('');
        setId('');
        setPw('');
        setGender('');
    });
  };

  const getUser = () => {
    return axios.get("http://localhost:3001/user").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <form onSubmit={(e) => join(e)}>
        이름: <input type='text' name='id' value={name} onChange={(e) => setName(e.target.value)}></input>
        아이디: <input type='text' name='pw' value={id} onChange={(e) => setId(e.target.value)}></input>
        비밀번호: <input type='password' name='name' value={pw} onChange={(e) => setPw(e.target.value)}></input>
        성별: <input type='radio' name='gender' value={'F'} checked={gender === "F"} onClick={(e) => setGender(e.target.value)}></input>여성
        <input type='radio' name='gender' value={'M'} checked={gender === "M"} onClick={(e) => setGender(e.target.value)}></input>남성
        <button type='submit'>가입</button>
        <button type='button' onClick={getUser}>조회</button>
      </form>
    </div>
  )
}

export default Join
