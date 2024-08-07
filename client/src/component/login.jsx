import React, { useState } from 'react';
import axios from 'axios';
import './css/login.css';
import './image/logo.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SignInUpForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(response => {
        setToken(response.data.token);
        console.log(response.data);
        // navigate('/profile'); // Uncomment if using react-router for navigation
      })
      .catch(err => console.log(err));
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    console.log('Phone number:', phone);
    // Logic to handle phone number submission, e.g., sending a verification code
  };

  return (
    <div>
      <h2>OTLOB DAR</h2>
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <SignUpForm />
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Se connecter</h1>
            <div className="social-container">
              <a href="http://localhost:3001/auth/google" className="social"><i className="fab fa-google"></i></a>
              <a href="http://localhost:3001/auth/facebook" className="social"><i className="fab fa-facebook-f"></i></a>
              <PhoneInput
                country={'us'}
                value={phone}
                onChange={phone => setPhone(phone)}
                inputStyle={{ width: '100%' }}
              />
              <button type="submit" onClick={handlePhoneSubmit}>Se connecter avec numéro de téléphone</button>
            </div>
            <span>ou utilisez votre compte</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#">Mot de passe oublié ?</a>
            <button type="submit">Se connecter</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bon Retour !</h1>
              <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
              <button className="ghost" onClick={handleSignInClick}>Se connecter</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bonjour, Ami !</h1>
              <p>Entrez vos informations personnelles et commencez votre aventure avec nous</p>
              <button className="ghost" onClick={handleSignUpClick}>S'inscrire</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/register', { username, email, password, phoneNumber, role })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Créer un Compte</h1>
      <div className="social-container">
        <a href="http://localhost:3001/auth/google" className="social"><i className="fab fa-google"></i></a>
        <a href="http://localhost:3001/auth/facebook" className="social"><i className="fab fa-facebook-f"></i></a>
        <PhoneInput
          country={'us'}
          value={phoneNumber}
          onChange={phone => setPhoneNumber(phone)}
          inputStyle={{ width: '100%' }}
        />
      </div>
      <span>ou utilisez votre email pour vous inscrire</span>
      <input
        name="username"
        type="text"
        placeholder="Nom"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        name="phoneNumber"
        type="text"
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="role"
            value="professional"
            checked={role === 'professional'}
            onChange={handleRoleChange}
            required
          />
          Professionnel
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="owner"
            checked={role === 'owner'}
            onChange={handleRoleChange}
          />
          Propriétaire
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="buyer"
            checked={role === 'buyer'}
            onChange={handleRoleChange}
          />
          Acheteur
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="agent"
            checked={role === 'agent'}
            onChange={handleRoleChange}
          />
          Agent
        </label>
      </div>
      {role === 'professional' && (
        <>
          <input
            name="companyName"
            type="text"
            placeholder="Nom de l'entreprise"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            name="companyAddress"
            type="text"
            placeholder="Adresse de l'entreprise"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
        </>
      )}
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default SignInUpForm;
