const express = require('express')
const { Pool } = require('pg')
const dotenv = require('dotenv')
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { Request, Response } from 'express'

dotenv.config()

const app = express()
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

//Test route that accesses sample table
app.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM PLAYING_WITH_NEON');
    res.status(200).json(result.rows)
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
})


app.post('/auth', async (req: Request, res: Response) => {
  const { password, first_name, last_name, email } = req.body

  if (!password || !first_name || !last_name || !email) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const check = await pool.query('SELECT * FROM USERS WHERE USERS.email = $1', [email])
    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'Account already exists with this email' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const result = await pool.query(
      'INSERT INTO USERS(email, password_hash, created_at, updated_at, first_name, last_name) VALUES($1, $2, NOW(), NOW(), $3, $4) RETURNING *',
      [email, hash, first_name, last_name]
    )

    const sessionToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(sessionToken).digest('hex')

    await pool.query(
      'INSERT INTO SESSIONS(user_id, session_token, created_at) VALUES($1, $2, NOW())',
      [result.rows[0].id, hashedToken]
    )

    return res.status(201).json({ message: 'User registered successfully', sessionToken })


  } catch (err) {
    return res.status(500).json({ error: 'Server error' })
  }
})

app.put('/auth', async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const check = await pool.query('SELECT id, password_hash FROM USERS WHERE USERS.email = $1', [email])
    if (check.rows.length == 0) {
      return res.status(404).json({ error: 'Account not found' })
    }
    const hashedPassword = check.rows[0].password_hash
    const userId = check.rows[0].id


    const passwordMatch = await bcrypt.compare(password, hashedPassword)
    if (passwordMatch) {
      const sessionToken = crypto.randomBytes(32).toString('hex')
      const hashedToken = crypto.createHash('sha256').update(sessionToken).digest('hex')

      await pool.query(
        'UPDATE SESSIONS SET session_token = $1, created_at = NOW() WHERE user_id = $2',
        [hashedToken, userId]
      )

      return res.status(200).json({ message: 'User logged in successfully', sessionToken })
    }
    else {
      return res.status(401).json({ error: 'Incorrect password' })
    }
  }
  catch (err) {
    return res.status(500).json({ error: 'Server error' })
  }
})

app.get('/auth', async (req: Request, res: Response) => {
  const sessionToken = req.body.sessionToken

  if (!sessionToken) {
    return res.status(400).json({ error: 'No session token provided' })
  }

  try{
    const hashedToken = crypto.createHash('sha256').update(sessionToken).digest('hex');
    const result = await pool.query(
      'SELECT * FROM SESSIONS WHERE session_token = $1 AND created_at > NOW() - INTERVAL \'1 day\'',
      [hashedToken]
    )

    if (result.rows.length == 0) {
      return res.status(401).json({ error: 'Invalid session' })
    }

    return res.status(200).json({ message: 'Valid Session' })


  }
  catch(err){
    return res.status(500).json({ error: 'Server Error'})
  }
})

const PORT = process.env.DATABASE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
