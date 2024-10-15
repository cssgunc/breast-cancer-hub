const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

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

const PORT = process.env.DATABASE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
