import React, { useState } from 'react'
import './CSS/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar:React.FC = () => {
  const [user, setUser] = useState(null)
  return (
    <div className='container'>
      <div className='wrap'>
        <a className='logo' href='/'>🎧 MSA</a>
        <div className='menuWrap'>
          {user ? (
            <div>
              <Link to='/'>요금제 보기</Link>
              <Link to='/newAlbum'>앨범 등록하기</Link>
              <p>{user}님</p>
            </div>
          ) : (
            <div className='auth'>
              <Link to='/'>요금제 보기</Link>
              <Link to='/login'>로그인</Link>
              <Link to='/register'>회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar