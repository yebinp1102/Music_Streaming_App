import React, { useCallback, useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { getAlbums } from '../redux/albumSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Album from './Album'
import './CSS/AllAlbums.css'

const AllAlbums = ({setCurrentId} : {setCurrentId : React.Dispatch<React.SetStateAction<string | undefined>>}) => {

  const dispatch = useAppDispatch();
  const albums = useAppSelector(state => state.album.albums);

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
            <Album album={album} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default AllAlbums