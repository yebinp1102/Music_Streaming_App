import { Paper } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import AllAlbums from '../Components/AllAlbums'
import '../Components/CSS/Home.css'
import Paginate from '../Components/Paginate'

const Home= ({setCurrentId} : {setCurrentId : React.Dispatch<React.SetStateAction<string | undefined>>}) => {
  function useQuery(){
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page') || 1

  return (
    <div className="HomeContainer">
        <AllAlbums  setCurrentId={setCurrentId}/>
        <Paper elevation={6}>
          <Paginate />
        </Paper>
    </div>
  )
}

export default Home