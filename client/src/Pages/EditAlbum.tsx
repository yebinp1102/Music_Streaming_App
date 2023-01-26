import React, { useEffect, useState } from 'react'
import '../Components/CSS/CreateAlbum.css'
import { Album } from '../redux/interfaces/Album'
import bgimage from '../utils/bgImage.jpg'
import {Button, Paper, TextField, Typography} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { createAlbum, updateAlbum } from '../redux/albumSlice'
import { useNavigate } from 'react-router-dom'

type currentIdType = {
  currentId : string | undefined
  setCurrentId : React.Dispatch<React.SetStateAction<string | undefined>>
}

const CreateAlbum :React.FC<currentIdType> = ({currentId, setCurrentId}) => {
  const album = useAppSelector(state => currentId ? state.album.albums?.find((a) => a._id === currentId) : null)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile') || '{}')

  const initialAlbum = {
    title: '',
    description: '',
    singer: '',
    composer: '',
    tags: [],
    selectedFile: {},
    likes : [],
    createdAt: null,
    creator: '',
    comments: []
  }
  const [albumData, setAlbumData] = useState<Album>(initialAlbum)

  useEffect(() => {
    if(album) setAlbumData(album);
  },[album])

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(currentId){
      dispatch(updateAlbum({currentId, albumData}))
    }else{
      dispatch(createAlbum(albumData))
    }
    navigate('/')
  }

  const clear = () => {
    setAlbumData(initialAlbum);
  }

  // 로그인 하지 않은 유저가 앨범 추가 or 수정 페이지에 접근 했을 경우
  if(!user?.data?.result){
    return (
      <Paper>
        <Typography variant='h6' align='center'>
          로그인 후 이용해주세요.
        </Typography>
      </Paper>
    )
  }

  return (
    <div className='createContainer' style={{backgroundImage: `url(${bgimage})`}}>
      <div className='createForm'>
        <h1>{currentId ? '앨범 내용 수정하기' : '새 앨범 등록하기'}</h1>
        <form onSubmit={handleSubmit}>
          <TextField // 제목
            style={{backgroundColor: 'rgb(206, 206, 206)', borderRadius: '5px'}}
            variant='outlined'
            fullWidth
            label='title'
            value={albumData.title}
            onChange={(e) => setAlbumData({...albumData, title: e.target.value})}
          />
          <TextField // 작곡가
            style={{backgroundColor: 'rgb(206, 206, 206)', borderRadius: '5px'}}
            variant='outlined'
            fullWidth
            label='composer'
            value={albumData.composer}
            onChange={(e) => setAlbumData({...albumData, composer: e.target.value})}
          />
          <TextField // 가수
            style={{backgroundColor: 'rgb(206, 206, 206)', borderRadius: '5px'}}
            variant='outlined'
            fullWidth
            label='singer'
            value={albumData.singer}
            onChange={(e) => setAlbumData({...albumData, singer: e.target.value})}
          />
          <TextField // 곡 or 앨범 설명
            style={{backgroundColor: 'rgb(206, 206, 206)', borderRadius: '5px'}}
            variant='outlined'
            fullWidth
            label='description'
            value={albumData.description}
            onChange={(e) => setAlbumData({...albumData, description: e.target.value})}
          />
          <TextField // 태그
            style={{backgroundColor: 'rgb(206, 206, 206)', borderRadius: '5px'}}
            variant='outlined'
            fullWidth
            label='tags'
            value={albumData.tags}
            onChange={(e) => setAlbumData({...albumData, tags: e.target.value.split(',')})}
          />
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({base64} : {base64: string}) => setAlbumData({...albumData, selectedFile: base64})}
            />
          </div>
          <div className='btnWraps'>
            <Button variant='contained' color='primary' size="large" type="submit">
              {currentId ? '업데이트' : '등록하기'}
            </Button>
            <Button variant='contained' color='secondary' size="large" onClick={clear}>
              내용 삭제
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAlbum