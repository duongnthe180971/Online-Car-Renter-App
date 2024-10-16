const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const PORT = 5000;

app.use(cors());

// SQL Server configuration
const sqlConfig = {
  user: 'sa',      // Replace with your database username
  password: 'sa',  // Replace with your database password
  database: 'CarRent',  // Replace with your database name
  server: 'localhost',       // Replace with your server name or IP
  port: 1433,                // Ensure SQL Server is listening on this port
  options: {
    encrypt: true,           // If using Azure SQL Database, set to true
    trustServerCertificate: true, // For development, you might need this option
  },
};

// Endpoint to fetch data from SQL Server
app.get('/api/data', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(sqlConfig);

    // Query the database
    const result = await sql.query('SELECT * FROM Car'); // Replace with your table name

    // Send the result as JSON
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
