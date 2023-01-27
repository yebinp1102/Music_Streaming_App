import React, { useCallback, useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { getAlbums } from '../redux/albumSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Album from './Album'
import './CSS/AllAlbums.css'

const AllAlbums = ({page} : {page: number}) => {

  const dispatch = useAppDispatch();
  const {albums} = useAppSelector(state => state.album);
  const {isLoading} = useAppSelector(state => state.album)
  // console.log(albums, isLoading)

  const initApp = useCallback(async()=>{
    await dispatch(getAlbums(page));
  },[dispatch])

  useEffect(()=>{
    initApp();
  },[dispatch])

  if(!albums?.length && !isLoading) return <div>아직 등록된 앨범이 없습니다. 첫 앨범을 등록해보세요.</div>

  return (
    isLoading ? <CircularProgress/> : (
      <Grid container alignItems='stretch' spacing={3}>
        {albums?.map( album => (
          <Grid key={album._id} xs={12} sm={6} item>
            <Album album={album}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default AllAlbums