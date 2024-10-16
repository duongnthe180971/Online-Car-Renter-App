const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const PORT = 5000;

app.use(express.json());
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
//Car
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

// Update car status by ID (PUT request)
app.put('/api/cars/:id', async (req, res) => {
  const carId = req.params.id;
  const { newStatus } = req.body; // Get the new status from the request body

  if (!newStatus) {
    return res.status(400).json({ error: 'CarStatus is required' });
  }
  try {
      await sql.connect(sqlConfig);
      const query = `
          UPDATE Car
          SET CarStatus = '${newStatus}'
          WHERE CarID = ${carId}
      `;
      const result = await sql.query(query);

      if (result.rowsAffected[0] > 0) {
          res.status(200).send("Car status updated successfully");
      } else {
      }
  } catch (error) {
  }
});

//Rental
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

app.post('/api/rental', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const { CarID, CustomerID, RentalStart, RentalEnd, RentalStatus } = req.body;

    const query = `
      INSERT INTO Rental (CarID, CustomerID, RentalStart, RentalEnd, RentalStatus)
      VALUES (@CarID, @CustomerID, @RentalStart, @RentalEnd, @RentalStatus)
    `;

    const request = new sql.Request();
    request.input('CarID', sql.Int, CarID);
    request.input('CustomerID', sql.Int, CustomerID);
    request.input('RentalStart', sql.Date, RentalStart);
    request.input('RentalEnd', sql.Date, RentalEnd);
    request.input('RentalStatus', sql.Int, RentalStatus);

    await request.query(query);

    res.status(201).send('New rental added successfully');
  } catch (err) {
    console.error('Error adding new rental:', err);
    res.status(500).send('Server error');
  }
});

app.put('/api/rentals/:id', async (req, res) => {
  const rentalId = req.params.id;
  const { status } = req.body; // Get the new status from the request body

  try {
    await sql.connect(sqlConfig); // Ensure you are connected to the database

    const result = await sql.query`UPDATE Rental SET RentalStatus = 2 WHERE RentalID = ${rentalId}`;

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Rental status updated successfully' });
    } else {
      res.status(404).json({ message: 'Rental not found' });
    }
  } catch (error) {
    console.error('Error updating rental status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
//Account
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

app.get('/api/features/:carID', async (req, res) => {
  try {
      await sql.connect(sqlConfig);
      const { carID } = req.params;
      const result = await sql.query(`
          SELECT f.Name 
          FROM CarFeature cf 
          JOIN Feature f ON cf.FeatureID = f.FeatureID 
          WHERE cf.CarID = ${carID}`);
      
      res.json(result.recordset); // Send the list of features as JSON
  } catch (err) {
      console.error('Error fetching car features:', err);
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