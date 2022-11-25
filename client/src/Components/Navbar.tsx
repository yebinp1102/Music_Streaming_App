import React from 'react'
import './CSS/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar:React.FC = () => {
  return (
    <div className='container'>
      <div className='wrap'>
        <a className='logo' href='/'>🎧 MSA</a>
        <div className='menuWrap'>
          <Link to='/'>요금제 보기</Link>
          <Link to='/register'>회원가입</Link>
          <Link to='/login'>로그인</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar