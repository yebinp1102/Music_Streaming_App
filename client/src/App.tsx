import React, { useState } from 'react';
import './App.css';
import Home from './Pages/Home'
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import CreateAlbum from './Pages/EditAlbum';

const App: React.FC = () => {
  type IdType = {
    currentId: string | undefined
  }
  const [currentId, setCurrentId] = useState<string | undefined>('');
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home setCurrentId={setCurrentId}/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/newAlbum' element={<CreateAlbum currentId={currentId} setCurrentId={setCurrentId} />} />
      </Routes>
    </Router>
  );
}

export default App;
