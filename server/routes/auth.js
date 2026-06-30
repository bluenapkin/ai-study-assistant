const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already registered' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unexpected error' });
  }
});

module.exports = router;