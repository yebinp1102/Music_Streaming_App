import { Paper } from '@material-ui/core'
import { useLocation } from 'react-router-dom';
import AllAlbums from '../Components/AllAlbums'
import '../Components/CSS/Home.css'
import Paginate from '../Components/Paginate'

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home= ({setCurrentId} : {setCurrentId : React.Dispatch<React.SetStateAction<string | undefined>>}) => {
  const query = useQuery();
  const page = Number(query.get('page')) || 1
  const searchQuery = query.get('searchQuery')

  return (
    <div className="HomeContainer">
        <AllAlbums  setCurrentId={setCurrentId} page={page}/>
        {!searchQuery && (
          <Paper elevation={6}>
            <Paginate page={page} />
          </Paper>
        )}
    </div>
  )
}

export default Home