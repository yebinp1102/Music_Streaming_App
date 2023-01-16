import React from 'react'
import './CSS/Paginate.css'
import {Pagination, PaginationItem} from '@material-ui/lab';
import {Link} from 'react-router-dom'

const Paginate: React.FC = () => {
  return (
    <Pagination 
      count={5}
      page={1}
      variant="outlined"
      color='primary'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/albums?page=${1}`} />
      )}
    />
  )
}

export default Paginate
