import { Paper } from '@material-ui/core'
import AllAlbums from '../Components/AllAlbums'
import '../Components/CSS/Home.css'
import Paginate from '../Components/Paginate'

const Home= ({setCurrentId} : {setCurrentId : React.Dispatch<React.SetStateAction<string | undefined>>}) => {

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