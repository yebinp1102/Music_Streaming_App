import React, { useEffect, useState } from 'react'
import './CSS/Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import decode from 'jwt-decode'
import SearchIcon from '@material-ui/icons/Search';
import { useAppDispatch } from '../redux/store';
import { getAlbumBySearch } from '../redux/albumSlice';

// function useQuery(){
//   return new URLSearchParams(useLocation().search);
// }

const Navbar:React.FC = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || '{}'))
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const query = useQuery();
  // const searchQuery = query.get('searchQuery');


  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  }

  const searchAlbum = () => {
    if(search.trim()){
      dispatch(getAlbumBySearch(search))
      navigate(`/albums/search?searchQuery=${search || 'none'}`)
    }else{
      navigate('/')
    }
  }

  // Navbar 컴포넌트는 렌더링 될 때마다 토큰이 존재하는지 확인
  useEffect(() => {
    const token = user?.data?.token
    if(token){
      // decode 함수는 이 토큰이 언제 만료되는지에 대한 정보를 가짐
      const decodedToken : any = decode(token)
      // 토큰이 만료된 경우 자동 로그아웃
      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
  },[])

  return (
    <div className='container'>
      <div className='wrap'>
        <a className='logo' href='/'>🎧 MSA</a>
        <div className='searchWrap'>
          <input
            className='searchInput'
            type="text"
            placeholder='검색'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon onClick={searchAlbum} />
        </div>
        <div className='menuWrap'>
          {user?.data ? (
            <div className='auth'>
              <Link to='/'>요금제 보기</Link>
              <Link to='/newAlbum'>앨범 등록하기</Link>
              <p>{user?.data?.result?.username}님</p>
              <button className='logout' onClick={logout}>로그아웃</button>
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