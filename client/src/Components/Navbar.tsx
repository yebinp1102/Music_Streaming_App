import React from 'react'
import './CSS/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar:React.FC = () => {
  return (
    <div className='container'>
      <div className='wrap'>
        <a className='logo' href='/'>๐ง MSA</a>
        <div className='menuWrap'>
          <div>
            <Link to='/'>์๊ธ์  ๋ณด๊ธฐ</Link>
            <Link to='/newAlbum'>์จ๋ฒ ๋ฑ๋กํ๊ธฐ</Link>
          </div>
          <div className='auth'>
            <Link to='/register'>ํ์๊ฐ์</Link>
            <Link to='/login'>๋ก๊ทธ์ธ</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar