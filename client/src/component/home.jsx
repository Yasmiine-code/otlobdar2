import React from 'react';
import Slider from 'react-slick';
import './css/home.css';
import { Link } from 'react-router-dom';

// Importation des images


const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Bienvenue chez OTLOB DAR</h1>
        <p>Votre agence immobilière de confiance pour trouver votre prochain bien immobilier. Explorez nos offres et commencez votre aventure avec nous.</p>
      

        <div className="cta-buttons">
          <button>Explorer les Propriétés</button>
          <button>Nous Contacter</button>
          <Link to="/login">
            <button className="login-button">Se Connecter</button>
          </Link>
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Propriétés de Qualité</h3>
          <p>Découvrez une sélection de propriétés soigneusement sélectionnées pour répondre à vos besoins.</p>
        </div>
        <div className="feature">
          <h3>Service Client Exceptionnel</h3>
          <p>Notre équipe est dédiée à vous fournir un service client irréprochable et une assistance tout au long de votre parcours.</p>
        </div>
        <div className="feature">
          <h3>Solutions Personnalisées</h3>
          <p>Nous offrons des solutions personnalisées pour vous aider à trouver le bien immobilier parfait.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
