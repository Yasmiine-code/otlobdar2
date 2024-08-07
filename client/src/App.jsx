import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import './App.css';
import SignInUpForm from './component/login.jsx';
import Navbar from './component/navbar.jsx';
import Home from './component/home.jsx';
import Profil from'./component/profil.jsx'

function App() {
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/login" element={<SignInUpForm />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Home />} />



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
