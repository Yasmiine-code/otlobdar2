import express from 'express';
import dotenv from 'dotenv';
import './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import './passport-config.js'; // Importer le fichier de configuration de passport
import { User } from './models/user.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes d'authentification
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json("Success");
});

app.post('/register', (req, res) => {
  const { username, email, password, phoneNumber, role } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.json({ error: err.message });
    User.create({ username, email, password: hashedPassword, phoneNumber, role })
      .then(user => res.json(user))
      .catch(err => res.json({ error: err.message }));
  });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
};

// Example of a protected route
app.get('/profile', verifyToken, (req, res) => {
  User.findById(req.userId, { password: 0 }) // Exclude password
    .then(user => {
      if (!user) return res.status(404).send("No user found.");
      res.json(user);
    })
    .catch(err => res.status(500).send("There was a problem finding the user."));
});

// Server listening
app.listen(process.env.PORT, () => {
  console.log("Server is running!");
});
