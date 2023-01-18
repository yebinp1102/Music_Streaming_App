import React, { useEffect } from 'react'
import './CSS/Paginate.css'
import {Pagination, PaginationItem} from '@material-ui/lab';
import {Link} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getAlbums } from '../redux/albumSlice';

const Paginate = ({page} : {page: number}) => {
  const dispatch = useAppDispatch();
  const {numberOfPage} = useAppSelector(state => state.album);

  useEffect(() => {
    if(page) dispatch(getAlbums(page));
  },[page]);

  return (
    <Pagination 
      count={numberOfPage}
      page={Number(page)}
      variant="outlined"
      color='primary'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/albums?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate
