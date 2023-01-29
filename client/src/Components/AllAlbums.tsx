import React, { useCallback, useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { getAlbums } from '../redux/albumSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import './CSS/AllAlbums.css'
import AlbumCard from './AlbumCard';

const AllAlbums = ({page} : {page: number}) => {
  const dispatch = useAppDispatch();
  const {albums} = useAppSelector(state => state.album);
  const {isLoading} = useAppSelector(state => state.album)
  console.log(albums)

  const initApp = useCallback(async()=>{
    await dispatch(getAlbums(page));
  },[dispatch])

  useEffect(()=>{
    initApp();
  },[dispatch])

  if(!albums?.length && !isLoading) return <div>아직 등록된 앨범이 없습니다. 첫 앨범을 등록해보세요.</div>

  return (
    isLoading ? <CircularProgress/> : (
      <div className='AllAblumsContainer'>
        {albums?.map(album => (
          <div>
            <AlbumCard albumInfo={album} />
          </div>
        ))}
      </div>
    )
  )
}

export default AllAlbums