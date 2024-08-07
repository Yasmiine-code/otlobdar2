import React from 'react';
import './css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">OTLOB DAR</div>
      <div className="nav-links">
        <a href="/">Accueil</a>
        <a href="/about">À Propos</a>
        <a href="/properties">Propriétés</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="nav-buttons">
<link>Se connecter</link>
        <button>S'inscrire</button>
      </div>
    </nav>
  );
};

export default Navbar;
