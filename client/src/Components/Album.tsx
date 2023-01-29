import React from 'react'
import './CSS/Album.css'
import { Card, Typography, CardContent } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'


type AlbumType = {
    _id?: string | undefined,
    creator: string,
    title: string,
    singer: string,
    description: string,
    composer: string,
    selectedFile: Object | any,
    likes: string[],
    createdAt: Date | null,
    genre: string
}

type AlbumProps = {
  album: AlbumType,
}
// 현재 id 불러오기 
const Album: React.FC<AlbumProps> = ({album}) => {
  const navigate = useNavigate();

  const openAlbum = () => {
    navigate(`/albums/${album._id}`)
  }

  return (
    <Card>
      <div onClick={openAlbum}>
        <div>
          <Typography variant='h6'>{album.singer}</Typography>
          <Typography variant='h6'>{album.composer}</Typography>
          <Typography variant='h6'>{album.createdAt?.toString().slice(0, 10)}</Typography>
        </div>
        <div className=''>
          <Typography variant='body2' color='textSecondary'>
            {album.genre}
          </Typography>
        </div>
        <CardContent>
          <Typography variant='h5' gutterBottom>{album.title}</Typography>
        </CardContent>
      </div>
    </Card>
  )
}

export default Album