const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const PORT = 5000;

app.use(cors());

const sqlConfig = {
  user: 'sa',
  password: 'sa',
  database: 'CarRent',
  server: 'localhost', 
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

app.get('/api/car', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM Car');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/rental', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM Rental');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/account', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM Account');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/garage', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM Garage');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/feature', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM Feature');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});
app.get('/api/car-feature', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM CarFeature');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/payment', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM Payment');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM Feedback');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/notification', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM Notification');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/notification-description', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM NotificationDescription');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});