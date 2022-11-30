import React from 'react'
import AllAlbums from '../Components/AllAlbums'
import '../Components/CSS/Home.css'

const Home: React.FC = () => {
  return (
    <div className="HomeContainer">
        <AllAlbums />
    </div>
  )
}

export default Home