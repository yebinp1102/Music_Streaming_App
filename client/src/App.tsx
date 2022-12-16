import React from 'react';
import './App.css';
import Home from './Pages/Home'
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import CreateAlbum from './Pages/CreateAlbum';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/newAlbum' element={<CreateAlbum/>} />
      </Routes>
    </Router>
  );
}

export default App;
