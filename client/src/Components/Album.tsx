import React from 'react'
import './CSS/Album.css'
import { Card, CardActions, CardMedia, Button, Typography, CardContent } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { deleteAlbum, likeAlbum } from '../redux/albumSlice'

type AlbumType = {
    _id?: string | undefined,
    creator: string,
    title: string,
    singer: string,
    description: string,
    composer: string,
    tags: string[],
    selectedFile: Object | any,
    likes: string[],
    createdAt: Date | null,
    // song: 
}

type AlbumProps = {
  album: AlbumType,
  setCurrentId : React.Dispatch<React.SetStateAction<string | undefined>>
}
// 현재 id 불러오기 
const Album: React.FC<AlbumProps> = ({album, setCurrentId}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile') || '{}')

  const handleEdit = () => {
    setCurrentId(album._id);
    navigate('/newAlbum', {state : {albumId: album._id}})
  }

  const handleDelete = (id : string) => {
    dispatch(deleteAlbum(id))
    alert('삭제 되었습니다.')
    window.location.replace('/')
  }

  const handleLike = (id: string) => {
    dispatch(likeAlbum(id))
    window.location.replace('/')
  }

  const LikesIcon = (): JSX.Element => {
    if(album?.likes?.length > 0){
      return album.likes.find((like) => like === user?.data?.result?._id) 
      ? (
        <><ThumbUpAltIcon fontSize='small' />&nbsp; 좋아요{album?.likes?.length}</>
      ) : (
        <><ThumbUpOutlinedIcon fontSize='small' />&nbsp; 좋아요{album?.likes?.length}</>
      ) 
    }
    return <><ThumbUpOutlinedIcon fontSize='small' />&nbsp; 좋아요 {album?.likes?.length}</>
  }

  return (
    <Card>
      {/* <CardMedia title={album.title} image={album.selectedFile} /> */}
      <div className=''>
        <Typography variant='h6'>{album.singer}</Typography>
        <Typography variant='h6'>{album.composer}</Typography>
        <Typography variant='h6'>{album.createdAt?.toString().slice(0, 10)}</Typography>
      </div>
      <div className=''>
        <Button style={{color: 'red'}} size='small' onClick={() => handleEdit()}>
          <MoreHorizIcon />
        </Button>
      </div>
      <div className=''>
        <Typography variant='body2' color='textSecondary'>
          {album.tags && album.tags.map(tag => ` #${tag}`)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant='h5' gutterBottom>{album.title}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small' color='primary' disabled={!user?.data?.result} onClick={() => album._id && handleLike(album._id)}>
          <LikesIcon />
        </Button>
        <Button size='small' color='secondary' onClick={() => album._id && handleDelete(album._id)}>
          <DeleteIcon fontSize='small'/>
          삭제하기
        </Button>
      </CardActions>
    </Card>
  )
}

export default Album