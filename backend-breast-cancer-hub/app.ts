import express from 'express'
import { Pool } from 'pg'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { Request, Response } from 'express'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

//Test route that accesses sample table
app.get('/', async (req: Request, res: Response) => {
  console.log("req made")
  try {
    const result = await pool.query('SELECT * FROM PLAYING_WITH_NEON');
    res.status(200).json(result.rows)
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
})


app.post('/auth', async (req: Request, res: Response) => {
  console.log(req.body)
  const { password, name, email } = req.body

  if (!password || !name || !email) {
    res.status(400).json({ error: 'All fields are required' })
    console.log("field error")
    return
  }

  try {
    const check = await pool.query('SELECT * FROM USERS WHERE USERS.email = $1', [email])
    if (check.rows.length > 0) {
      res.status(400).json({ error: 'Account already exists with this email' })
      console.log("dupe error")
      return
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const result = await pool.query(
      'INSERT INTO USERS(email, password_hash, created_at, updated_at, user_name) VALUES($1, $2, NOW(), NOW(), $3) RETURNING *',
      [email, hash, name]
    )

    const sessionToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(sessionToken).digest('hex')

    await pool.query(
      'INSERT INTO SESSIONS(user_id, session_token, created_at) VALUES($1, $2, NOW())',
      [result.rows[0].id, hashedToken]
    )

    res.status(201).json({ message: 'User registered successfully', sessionToken: sessionToken })
    console.log("succ")
    return


  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' })
    return
  }
})

app.put('/auth', async (req: Request, res: Response) => {
  console.log(req.body)

  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: 'All fields are required' })
    return
  }

  try {
    const check = await pool.query('SELECT id, password_hash FROM USERS WHERE USERS.email = $1', [email])
    if (check.rows.length == 0) {
      res.status(404).json({ error: 'Account not found' })
      return
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

      res.status(200).json({ message: 'User logged in successfully', sessionToken: sessionToken })
      return
    }
    else {
      res.status(401).json({ error: 'Incorrect password' })
      return
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' })
    return
  }
})

app.post('/settings', async (req: Request, res: Response) => {
  const sessionToken = req.headers['x-session-token'] as string;
  const email = req.headers['x-user-email'] as string;
  
  if (!sessionToken || !email || !(await checkToken(sessionToken, email))) {
    res.status(403).json({ error: 'Unauthorized' });
    return
  }

  const { user_id} = req.body;

  if (!user_id ) {
    res.status(400).json({ error: 'Invalid input' });
    return
  }

  try {
    const result = await pool.query(
      `INSERT INTO settings (user_id) 
      VALUES ($1) RETURNING *`,
      [user_id]
    );

    res.status(201).json({ message: 'Settings created successfully', settings: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})

app.get('/settings', async (req: Request, res: Response) => {
  const sessionToken = req.headers['x-session-token'] as string;
  const email = req.headers['x-user-email'] as string;
  const userId = req.query.user_id as string;

  if (!sessionToken || !email || !(await checkToken(sessionToken, email))) {
    res.status(403).json({ error: 'Unauthorized' });
    return
  }

  if (!userId) {
    res.status(400).json({ error: 'user_id is required' });
    return
  }

  try {
    const result = await pool.query('SELECT * FROM settings WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No settings found for this user' });
      return
    }

    res.status(200).json({ settings: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/settings', async (req: Request, res: Response) => {
  const sessionToken = req.headers['x-session-token'] as string;
  const email = req.headers['x-user-email'] as string;
  const { user_id, scheduling_type, notification_times, locale, use_backup_data, use_telemetry, use_push_notification, use_in_app_notification } = req.body;

  if (!sessionToken || !email || !(await checkToken(sessionToken, email))) {
    res.status(403).json({ error: 'Unauthorized' });
    return
  }

  if (!user_id || !scheduling_type || !notification_times || !locale) {
    res.status(400).json({ error: 'user_id, scheduling_type, notification_times, and locale are required' });
    return
  }

  try {
    const result = await pool.query(
      `UPDATE settings 
       SET scheduling_type = $1, 
           notification_times = $2, 
           locale = $3, 
           use_backup_data = $4, 
           use_telemetry = $5, 
           use_push_notification = $6, 
           use_in_app_notification = $7 
       WHERE user_id = $8 
       RETURNING *`,
      [scheduling_type, notification_times, locale, use_backup_data, use_telemetry, use_push_notification, use_in_app_notification, user_id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'No settings found for this user' });
      return
    }

    res.status(200).json({ message: 'Settings updated successfully', settings: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/user', async (req: Request, res: Response) => {
  const sessionToken = req.headers['x-session-token'] as string;
  const email = req.headers['x-user-email'] as string;
  const userId = req.query.user_id as string;

  if (!sessionToken || !email || !(await checkToken(sessionToken, email))) {
    res.status(403).json({ error: 'Unauthorized' });
    return
  }

  if (!userId) {
    res.status(400).json({ error: 'user_id is required' });
    return
  }

  try {
    const result = await pool.query('SELECT user_name FROM users WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No name found for this user' });
      return
    }

    res.status(200).json({ name: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

async function checkToken(sessionToken: string, email: string){
  if (sessionToken == null) {
    return false
  }

  try{
    const hashedToken = crypto.createHash('sha256').update(sessionToken).digest('hex');
    const result = await pool.query(
      `
      SELECT * 
        FROM SESSIONS 
        JOIN USERS ON USERS.id = SESSIONS.user_id 
        WHERE
          USERS.email = $1 
          AND SESSIONS.session_token = $2 
          AND SESSIONS.created_at > NOW() - INTERVAL \'1 year\'
      `,
      [email, hashedToken]
    )

    if (result.rows.length == 0) {
      return false
    }

    return true


  }
  catch(err){
    console.log(err)
    return false
  }
}

const PORT = process.env.DATABASE_PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})
