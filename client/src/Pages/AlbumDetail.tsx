import { CircularProgress, Paper } from '@material-ui/core';
import React, { useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import { deleteAlbum, getAlbum, getRecommendation } from '../redux/albumSlice';
import { useAppDispatch, useAppSelector } from '../redux/store'
import '../Components/CSS/AlbumDetail.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CommentSeaction from '../Components/CommentSeaction';
import AlbumCard from '../Components/AlbumCard';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'

type currentIdType = {
  currentId : string | undefined
  setCurrentId : React.Dispatch<React.SetStateAction<string | undefined>>
}

const AlbumDetail:React.FC<currentIdType> = ({currentId, setCurrentId}) => {
  const {id} = useParams()
  const dispatch = useAppDispatch();
  const {album, recommendation ,isLoading} = useAppSelector(state => state.album);
  const user = JSON.parse(localStorage.getItem('profile') || '{}')
  const navigate = useNavigate();
  console.log(album?._id)

  useEffect(() => {
    if(id) dispatch(getAlbum(id))
  }, [id])

  useEffect(() => {
    if(album) dispatch(getRecommendation(album.genre))
  },[album])


  if(!album) return null;

  if(isLoading){
    return (
      <Paper elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  const handleEdit = () => {
    setCurrentId(album._id);
    navigate('/newAlbum', {state : {albumId: album._id}})
  }

  const handleDelete = (id : string) => {
    dispatch(deleteAlbum(id))
    alert('삭제 되었습니다.')
    window.location.replace('/')
  }
  
  return (
    <div className='detailContainer'>
      <div className='detailWrap'>

        {/* 앨범 정보 */}
        <div className='albumInfo'>
          <div className='albumEdit'>
            <h1>앨범 정보</h1>
            {user?.data?.result?._id === album?.creator && (
              <div>
                <MoreHorizIcon  onClick={() => handleEdit()} />
                <DeleteIcon fontSize='small' onClick={() => album._id && handleDelete(album._id)}/>
              </div>
            )}
          </div>
          <div className='albumSummary' >
            <div className='albumCover'>
                <img src={album.selectedFile} />
            </div>
            <div className='albumDetail'>
              <div>
                <h2 className='songTitle'>{album.title}</h2>
                <p className='songSinger'>{album.singer}</p>
              </div>
              <div>
                <p>발매일 : {album.createdAt?.toString().slice(0, 10)}</p>
                <p>작곡 : {album.composer}</p>
                <div className='likeIcon'><ThumbUpAltIcon fontSize='small' /><strong>좋아요 : {album.likes.length}</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* 앨범 소개 */}
        <div className="albumIntro">
            <h1>앨범 소개</h1>
            <p>
              {album.description}
            </p>
          </div>

          {/* 다른 추천 음악 */}
          <div className='recommendation'>
            <h1>다른 추천 음악</h1>
            <div className='recommendationWrap'>
              {recommendation.map((info) => (
                <AlbumCard  albumInfo={info}
                />
              ))}
              {!recommendation.length && (
                <div>유사한 장르의 추천 곡이 없습니다.</div>
              )}
            </div>
          </div>

          {/* 댓글 */}
          <div className='comment'>
            <h1>댓글</h1>
            <CommentSeaction album={album} />
          </div>
      </div>
    </div>
  )
}

export default AlbumDetail