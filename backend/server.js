require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Static frontend
app.use(express.static(path.join(__dirname, '../public')));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Routes
const decisionRouter = require('./routes/aidecision');
app.use('/', decisionRouter);

// In-memory user store (can be replaced with database)
const users = [];

// Sign up route
app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  users.push({ firstName, lastName, email, password });
  res.status(200).json({ message: 'Account created successfully!' });
});

// Log in route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  res.status(200).json({ message: 'Login successful', user });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
