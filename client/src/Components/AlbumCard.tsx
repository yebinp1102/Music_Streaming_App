import React from 'react'
import { Album } from '../redux/interfaces/Album';
import './CSS/AlbumCard.css';

const AlbumCard = ({albumInfo} : {albumInfo : Album}) => {
  return (
    <div key={albumInfo._id} className="AlbumCard">
      <img src={albumInfo.selectedFile} />
      <div className='albumPosition'>
        <div className='albumTitle'>
          <p>{albumInfo.title}</p>
          <p>{albumInfo.singer}</p>
        </div>
      </div>
    </div>
  )
}

export default AlbumCard