import { Request, Response } from 'express';

const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


app.get('/', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM PLAYING_WITH_NEON')
    
    res.json(result.rows)
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000/`);
});

