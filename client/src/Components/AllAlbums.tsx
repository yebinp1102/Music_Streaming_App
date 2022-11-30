import React from 'react'
import Album from './Album'
import './CSS/AllAlbums.css'

const AllAlbums: React.FC = () => {
  return (
    <div className='albumsContainer'>
      <Album />
      <Album />
      <Album />
    </div>
  )
}

export default AllAlbums