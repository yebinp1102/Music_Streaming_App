import React, { useEffect, useState } from 'react'
import '../Components/CSS/CreateAlbum.css'
import { Album } from '../redux/interfaces/Album'
import bgimage from '../utils/bgImage.jpg'
import {Button, TextField} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useAppDispatch } from '../redux/store'
import { createAlbum } from '../redux/albumSlice'
import { useNavigate } from 'react-router-dom'

const CreateAlbum : React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialAlbum = {
    title: '',
    description: '',
    singer: '',
    composer: '',
    tags: [],
    selectedFile: {},
    likeCount : 0,
    createdAt: null,
  }

  const [albumData, setAlbumData] = useState<Album>(initialAlbum)

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createAlbum(albumData))
    navigate('/')
  }

  const clear = () => {
    setAlbumData(initialAlbum);
  }

  return (
    <div className='createContainer' style={{backgroundImage: `url(${bgimage})`}}>
      <div className='createForm'>
        <h1>새 앨범 등록하기</h1>
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
            // onChange={(e) => setAlbumData({...albumData, tags: e.target.value})}
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
              업로드하기
            </Button>
            <Button variant='contained' color='secondary' size="large" onClick={clear}>
              내용 삭제하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAlbum