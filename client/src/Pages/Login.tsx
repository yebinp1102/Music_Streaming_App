import React, { useRef, useState } from 'react'
import '../Components/CSS/Auth.css'
import * as api from '../api'

import { Link, useNavigate } from 'react-router-dom'
import bgimage from '../utils/bgImage.jpg'
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<string>(''); // 사용자가 입력한 유저명
  const [userFocus, setUserFocus] = useState<Boolean>(false); // user명 입력 input에 포커스를 줄것인지 결정함

  const [pwd, setPwd] = useState<string>('');
  const [pwdFocus, setPwdFocus] = useState<Boolean>(false);

  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    try{
      const formData = {username : user, password : pwd}
      const data = await api.loginAPI(formData);
      localStorage.setItem('profile', JSON.stringify(data))
      setUser("")
      setPwd("")
      setShowPwd(false)
      alert('로그인에 성공했습니다.')
      window.location.replace("/")
    }catch(err : any){
      console.log(err.message);
    }

  }

  return (
    <div className='authWrap' style={{backgroundImage: `url(${bgimage})`}}>
      <div className='authContainer'>
        <h2 className='title'>로그인 Login</h2>
        <form className='authForm' onSubmit={handleSubmit}>
          {/* 유저명 */}
          <label htmlFor='username'>
            유저명 :
          </label>
          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            onFocus={()=> setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />

          {/* 비밀번호 */}
          <label htmlFor='password'>
            비밀번호 :
          </label>
          <div className='pwdInput'>
            <input
              type={showPwd ? 'text' : 'password'}
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {showPwd ? 
              <AiFillEye className='showIcon' onClick={() => setShowPwd(!showPwd)}/> :
              <AiFillEyeInvisible className='showIcon' onClick={() => setShowPwd(!showPwd)}/>
            }
          </div>

          <button type='submit'>로그인</button>
        </form>

        <div className='changePage'>
          <p>회원이 아니신가요 ?</p>
          <Link to='/register'>회원가입 페이지로 이동하기</Link>
        </div>
      </div>
    </div>
  )
}

export default Login