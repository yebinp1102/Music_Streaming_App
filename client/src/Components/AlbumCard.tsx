import { useNavigate } from 'react-router-dom';
import { Album } from '../redux/interfaces/Album';
import './CSS/AlbumCard.css';

const AlbumCard = ({albumInfo} : {albumInfo : Album}) => {
  const navigate = useNavigate();

  const openAlbum = (id: string | undefined) => {
    if(id) navigate(`/albums/${id}`)
  }
  return (
    <div key={albumInfo._id} className="AlbumCard" onClick={() => openAlbum(albumInfo._id)}>
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