import React, { useEffect, useRef, useState } from 'react'
import '../Components/CSS/Register.css'
import bgimage from '../utils/bgImage.jpg'
// 아이콘
import {BsCheckLg} from 'react-icons/bs'
import {FaTimes} from 'react-icons/fa'
import {FcInfo} from 'react-icons/fc'
import { Link } from 'react-router-dom'


const Register: React.FC = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;  // 유저명은 반드시 소문자 혹은 대문자로 시작하고 4~23자여야 함.
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 비밀번호는 반드시 하나 이상의 대소문자, 특수문자와 숫자를 요구하며 8~24자여야 힘.

  // user명을 입력하거나 데이터 양식에 맞지 않는 값을 입력할 경우 포커스를 주기 위해 useRef 사용
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  // 유저명 관리
  const [user, setUser] = useState<string>(''); // 사용자가 입력한 유저명
  const [validName, setValidName] = useState<Boolean>(false);  // 사용 가능한 유저명인지 판별
  const [userFocus, setUserFocus] = useState<Boolean>(false); // user명 입력 input에 포커스를 줄것인지 결정함

  // 비밀번호 관리
  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<Boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<Boolean>(false);

  // 비밀번호 확인
  const [matchPwd, setMatchPwd] = useState<string>('');
  const [validMatch, setValidMatch] = useState<Boolean>(false);
  const [matchFocus, setMatchFocus] = useState<Boolean>(false);

  // 에러 관리
  const [errMsg, setErrMsg] = useState<string>('');

  // 성공적으로 양식을 작성하고 submit 했는지 판별
  const [success, setSuccess] = useState<Boolean>(false);


  useEffect(()=>{
    userRef.current?.focus();
  },[]);

  useEffect(()=>{
    setValidName(USER_REGEX.test(user))
  },[user])

  useEffect(()=>{
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd);
  },[pwd, matchPwd])

  useEffect(()=>{
    setErrMsg('');
  },[user, pwd, matchPwd])

  return (
    <div className='registerWrap' style={{backgroundImage: `url(${bgimage})`}}>
      <div className='registerContainer'>
        <form className='registerForm'>
          {/* 유저명 */}
          <label htmlFor='username'>
            유저명 :
            <BsCheckLg className={validName ? 'valid' : 'hide'} /> {/* 사용 가능한 이름이면 아이콘 보이고, 아니면 숨김 */}
            <FaTimes className={validName || !user ?  'hide' : 'invalid'}/> {/* 사용 불가능한 이름이거나 아직 입력하지 않은 경우 아이콘 등장 */}
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
          <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
            <FcInfo /> 유저명은 반드시 소문자 혹은 대문자로 시작해야 하며, 총 4 ~ 23 자여야 합니다.
          </p>

          {/* 비밀번호 */}
          <label htmlFor='password'>
            비밀번호 :
            <BsCheckLg className={validPwd ? 'valid' : 'hide'} /> {/* 사용 가능한 비번이면 아이콘 보이고, 아니면 숨김 */}
            <FaTimes className={validPwd || !pwd ?  'hide' : 'invalid'}/> {/* 사용 불가능한 비번이거나 비번을 입력하지 않은 경우 아이콘 등장 */}
          </label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
            <FcInfo /> 비밀번호는 반드시 하나 이상의 대문자, 소문자, 특수문자, 그리고 숫자를 포함해야 하며, 총 8 ~ 24자여야 합니다.
          </p>

          {/* 비밀번호 확인 */}
          <label htmlFor='confirm_pwd'>
            비밀번호 확인 : 
            <BsCheckLg className={validMatch && matchPwd ? 'valid' : 'hide'} /> {/* 비밀번호가 일치하는 경우에만 아이콘 보임 */}
            <FaTimes className={validMatch || !matchPwd ?  'hide' : 'invalid'}/> {/* 비밀번호가 일치하지 않는 경우에만 보임 */}
          </label>
          <input
            type='password'
            id='confirm_pwd'
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
            <FcInfo /> 비밀번호가 일치하지 않습니다.
          </p>

          {/* 회원가입 버튼은 적합한 이름이고, 적합한 비밀번호이며, 비밀번호가 일치할 때만 활성화 된다 */}
          <button disabled={!validName || !validPwd || !validMatch ? true : false}>회원가입</button>
        </form>

        <p className='toLogin'>
          <div>이미 회원이신가요 ?</div>
          <Link to='/login'>로그인 페이지로 이동하기</Link>
        </p>
      </div>
    </div>
  )
}

export default Register