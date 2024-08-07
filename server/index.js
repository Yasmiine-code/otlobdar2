import express from 'express';
import dotenv from 'dotenv';
import './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { User } from './models/user.js';
import bcrypt from 'bcryptjs';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

// Endpoint Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
              res.json({ message: "Success", token });
            } else {
              res.json("Incorrect password");
            }
          });
      } else {
        res.json("No record found");
      }
    })
    .catch(err => res.json({ error: err.message }));
});

// Endpoint Register
app.post('/register', (req, res) => {
  const { username, email, password, phoneNumber, role } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.json({ error: err.message });

    User.create({ username, email, password: hashedPassword, phoneNumber, role })
      .then(user => {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ user, token });
      })
      .catch(err => res.json({ error: err.message }));
  });
});

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
