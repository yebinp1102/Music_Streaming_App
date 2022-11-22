import React from 'react'
import './CSS/Navbar.css'

const Navbar:React.FC = () => {
  return (
    <div className='container'>
      <div className='wrap'>
        <a className='logo' href='#'>🎧 MSA</a>
        <ul className='menuWrap'>
          <li><a href='#'>MSA란?</a></li>
          <li><a href='#'>요금제 보기</a></li>
          <li><a href='#'>회원가입</a></li>
          <li><a href='#'>로그인</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar