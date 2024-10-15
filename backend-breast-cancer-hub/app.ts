const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
import bcrypt from 'bcrypt'


import type { Request, Response } from 'express';

dotenv.config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM PLAYING_WITH_NEON');
    res.status(200).json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/register', async (req: Request, res: Response) => {
  const { username, password, first_name, last_name, email } = req.body

  if (!username || !password || !first_name || !last_name || !email) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  
  try {

    const check = await pool.query('SELECT * FROM USERS WHERE USERS.email = $1',[email])
    if(check.rows.length > 0){
        return res.status(400).json({error: 'Account already exists with this email'})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const result = await pool.query(
        'INSERT INTO USERS(email, password_hash, created_at, updated_at, first_name, last_name) VALUES($1, $2, NOW(), NOW(), $3, $4) RETURNING *',
        [email, hash, first_name, last_name]
    );

    return res.status(201).json({ message: 'User registered successfully', user: result.rows[0] })
    

  } catch (err) {
    return res.status(500).json({ error: 'Server error' })
  }
});

const PORT = process.env.DATABASE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
