import AllAlbums from '../Components/AllAlbums'
import '../Components/CSS/Home.css'

const Home= ({setCurrentId} : {setCurrentId : React.Dispatch<React.SetStateAction<string | undefined>>}) => {
  return (
    <div className="HomeContainer">
        <AllAlbums  setCurrentId={setCurrentId}/>
    </div>
  )
}

export default Home