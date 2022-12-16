import React, { useCallback, useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { getAlbums } from '../redux/albumSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Album from './Album'
import './CSS/AllAlbums.css'

const AllAlbums: React.FC = () => {

  const dispatch = useAppDispatch();
  const albums = useAppSelector(state => state.album.albums);
  console.log('albums : ', albums);

  const initApp = useCallback(async()=>{
    await dispatch(getAlbums());
  },[dispatch])

  useEffect(()=>{
    initApp();
  },[dispatch])

  return (
    !albums?.length ? <CircularProgress/> : (
      <Grid container alignItems='stretch' spacing={3}>
        {albums.map( album => (
          <Grid key={album._id} xs={12} sm={6} item>
            <Album album={album} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default AllAlbums