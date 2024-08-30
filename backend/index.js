const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
require('dotenv').config();
// Initialize express app and PostgreSQL pool
const app = express();
app.use(cors());
app.use(bodyParser.json());  // Middleware to parse JSON request bodies
console.log(process.env.DB_USER)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,  // Replace with your port if different                 // Default PostgreSQL port
});

// Endpoint to get patients data
app.get('/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hospitalData');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Endpoint to register a new user
app.post('/register', async (req, res) => {
    console.log('POST /register received:', req.body); // Log the request body
    const { patientname, age, symptoms } = req.body;
    
    if (!patientname || !age || !symptoms) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
      const query = 'INSERT INTO hospitalData (patientname, age, symptoms) VALUES ($1, $2, $3) RETURNING *';
      const values = [patientname, age, symptoms];
      const result = await pool.query(query, values);
      
      console.log('Inserted patient record:', result.rows[0]); // Log the inserted record
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error inserting patient:', err);
      res.status(500).send('Server error');
    }
  });

  app.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM hospitalData WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).send('Patient not found');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
