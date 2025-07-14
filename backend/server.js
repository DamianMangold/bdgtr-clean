require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

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

// Extended signup route
app.post('/signup', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthday,
    yearlyIncome,
    cashOnHand,
    netWorth,
    hasDebt,
    debtTypes,
    otherDebt,
    totalDebt,
    monthlyPayments,
    behindPayments
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name: `${firstName} ${lastName}`,
        birthday: birthday ? new Date(birthday) : null,
        yearlyIncome: yearlyIncome ? parseInt(yearlyIncome) : null,
        cashOnHand: cashOnHand ? parseInt(cashOnHand) : null,
        netWorth: netWorth ? parseInt(netWorth) : null,
        hasDebt,
        debtTypes: debtTypes ? JSON.stringify(debtTypes) : null,
        otherDebt,
        totalDebt: totalDebt ? parseInt(totalDebt) : null,
        monthlyPayments: monthlyPayments ? parseInt(monthlyPayments) : null,
        behindPayments
      },
    });

    res.status(200).json({ message: 'Account created successfully!', user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login route using Prisma
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
