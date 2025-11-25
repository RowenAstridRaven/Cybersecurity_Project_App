// server/routes/account.ts
import express from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db';

const router = express.Router();

// Sign-up endpoint
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const existing = await db.get('SELECT * FROM users WHERE username = ?', username);
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.run('INSERT INTO users (username, password) VALUES (?, ?)', username, hashedPassword);
  res.status(201).json({ message: 'User created successfully' });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.get('SELECT * FROM users WHERE username = ?', username);
  if (!user) return res.status(400).json({ message: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Incorrect password' });
  // For demonstration, encode the username; production should use JWT
  const token = Buffer.from(username).toString('base64');
  res.status(200).json({ token });
});

export default router;
