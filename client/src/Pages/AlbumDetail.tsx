import { CircularProgress, Paper } from '@material-ui/core';
import React, { useEffect } from 'react'
import {useParams } from 'react-router-dom';
import { getAlbum } from '../redux/albumSlice';
import { useAppDispatch, useAppSelector } from '../redux/store'
import '../Components/CSS/AlbumDetail.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CommentSeaction from '../Components/CommentSeaction';

const AlbumDetail = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch();
  const {album, isLoading} = useAppSelector(state => state.album);
  console.log(album);

  useEffect(() => {
    if(id) dispatch(getAlbum(id))
  }, [id])


  if(!album) return null;

  if(isLoading){
    return (
      <Paper elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  // const recommendedAlbums = album.filter((album) => {
    
  // })

  return (
    <div className='detailContainer'>
      <div className='detailWrap'>

        {/* 앨범 정보 */}
        <div className='albumInfo'>
          <h1>앨범 정보</h1>
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
            <Paper>
              <div>Album 01</div>

            </Paper>
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