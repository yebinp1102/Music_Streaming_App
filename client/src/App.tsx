import React, { useState } from 'react';
import './App.css';
import Home from './Pages/Home'
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import CreateAlbum from './Pages/EditAlbum';

const App: React.FC = () => {
  const [currentId, setCurrentId] = useState<string | undefined>('');
  const user = JSON.parse(localStorage.getItem('profile') || '{}')

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* CRUD route */}
        <Route path='/' element={<Navigate replace to="/albums" />} />
        <Route path='/albums' element={<Home setCurrentId={setCurrentId}/>} />
        <Route path='/newAlbum' element={<CreateAlbum currentId={currentId} setCurrentId={setCurrentId} />} />
        {/* auth route */}
        <Route path='/register' element={!user ? <Register /> : <Navigate replace to="/albums" /> }  />
        <Route path='/login' element={!user ? <Login /> : <Navigate replace to="/albums" /> }  />
      </Routes>
    </Router>
  );
}

export default App;
