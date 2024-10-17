const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const app = express();
const PORT = 5000;
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/img", express.static(path.join(__dirname, "img")));

const sqlConfig = {
  user: "sa",
  password: "sa",
  database: "CarRent",
  server: "localhost",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
app.post("/api/register", async (req, res) => {
  const { username, password, gender, dob, phone, email, address, role } =
    req.body;

  try {
    await sql.connect(sqlConfig);

    // Insert the user details into the Account table
    const insertQuery = `
      INSERT INTO Account (UserName, PassWord, Gender, DOB, Phone, Email, Address, Role)
      VALUES ('${username}', '${password}', '${gender}', '${dob}', '${phone}', '${email}', '${address}', '${role}');
    `;

    await sql.query(insertQuery);

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
});
//Car
app.get("/api/car", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Car");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

// Update car status by ID (PUT request)
app.put("/api/cars/:id", async (req, res) => {
  const carId = req.params.id;
  const { newStatus } = req.body; // Get the new status from the request body

  if (!newStatus) {
    return res.status(400).json({ error: "CarStatus is required" });
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
  } catch (error) {}
});

//Rental
app.get("/api/rental", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Rental");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

app.post("/api/rental", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const { CarID, CustomerID, RentalStart, RentalEnd, RentalStatus } =
      req.body;

    const query = `
      INSERT INTO Rental (CarID, CustomerID, RentalStart, RentalEnd, RentalStatus)
      VALUES (@CarID, @CustomerID, @RentalStart, @RentalEnd, @RentalStatus)
    `;

    const request = new sql.Request();
    request.input("CarID", sql.Int, CarID);
    request.input("CustomerID", sql.Int, CustomerID);
    request.input("RentalStart", sql.Date, RentalStart);
    request.input("RentalEnd", sql.Date, RentalEnd);
    request.input("RentalStatus", sql.Int, RentalStatus);

    await request.query(query);

    res.status(201).send("New rental added successfully");
  } catch (err) {
    console.error("Error adding new rental:", err);
    res.status(500).send("Server error");
  }
});

app.put("/api/rentals/:id", async (req, res) => {
  const rentalId = req.params.id;
  const { status } = req.body; // Get the new status from the request body

  try {
    await sql.connect(sqlConfig); // Ensure you are connected to the database

    const result =
      await sql.query`UPDATE Rental SET RentalStatus = 2 WHERE RentalID = ${rentalId}`;

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Rental status updated successfully" });
    } else {
      res.status(404).json({ message: "Rental not found" });
    }
  } catch (error) {
    console.error("Error updating rental status:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//Account
app.get("/api/account", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Account");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/garage", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Garage");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/feature", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Feature");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/features/:carID", async (req, res) => {
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
    console.error("Error fetching car features:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/payment", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Payment");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/feedback", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Feedback");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/notification", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Notification");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/notification-description", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM NotificationDescription");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "img")); // Ensure correct path
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  },
});

const upload = multer({ storage });

app.get("/api/car/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`SELECT * FROM Car WHERE CarID = ${carId}`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(result.recordset[0]); // Return the car data
  } catch (err) {
    console.error("Error fetching car data:", err);
    res.status(500).send("Server error");
  }
});

// Add this route to get the list of features for a specific car
app.get("/api/car-features/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`
      SELECT FeatureID FROM CarFeature WHERE CarID = ${carId}
    `);

    // Return the list of feature IDs
    res.json(result.recordset.map((row) => row.FeatureID));
  } catch (err) {
    console.error("Error fetching car features:", err);
    res.status(500).send("Server error");
  }
});
app.put("/api/updateCar/:carId", upload.single("image"), async (req, res) => {
  const { carId } = req.params;
  const {
    name,
    description,
    price,
    address,
    features,
    type,
    seat,
    gear,
    fuel,
    brand,
  } = req.body;

  try {
    await sql.connect(sqlConfig);
    console.log("Connected to DB");

    // Check if the car exists
    const checkCarQuery = `SELECT * FROM Car WHERE CarID = ${carId}`;
    const carResult = await sql.query(checkCarQuery);

    if (carResult.recordset.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Handle image update only if a new image is uploaded
    let imagePath = carResult.recordset[0].CarImage; // Keep existing image path by default
    if (req.file) {
      const imageName = req.file.filename;
      imagePath = `http://localhost:5000/img/${imageName}`; // Update with new image path

      console.log(`New image uploaded: ${imageName}`);
    }

    // Update car details, including the image path if a new image is provided
    const updateCarQuery = `
      UPDATE Car 
      SET 
        CarName = '${name}', 
        Brand = '${brand}', 
        Price = ${price}, 
        CarType = '${type}', 
        Seats = ${seat}, 
        Gear = '${gear}', 
        Fuel = '${fuel}', 
        CarImage = '${imagePath}', 
        CarDescription = '${description}'
      WHERE CarID = ${carId};
    `;

    await sql.query(updateCarQuery);

    // Update car features
    const selectedFeatures = JSON.parse(features);

    // First, delete the existing features for this car
    const deleteFeaturesQuery = `DELETE FROM CarFeature WHERE CarID = ${carId}`;
    await sql.query(deleteFeaturesQuery);

    // Insert the new set of features
    for (const featureID of selectedFeatures) {
      const insertFeatureQuery = `INSERT INTO CarFeature (CarID, FeatureID) VALUES (${carId}, ${featureID})`;
      await sql.query(insertFeatureQuery);
    }

    res.json({ message: "Car updated successfully!" });
  } catch (err) {
    console.error("Error updating car:", err);
    res.status(500).send("Server error");
  }
});

app.post("/api/registerCar", upload.single("image"), async (req, res) => {
  const {
    name,
    description,
    price,
    address,
    features,
    type,
    seat,
    gear,
    fuel,
    brand,
    garageID,
  } = req.body;

  if (!req.file) {
    console.error("No image uploaded");
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageName = req.file.filename;
  const imagePath = `http://localhost:5000/img/${imageName}`; // Store image path correctly

  try {
    await sql.connect(sqlConfig);
    console.log("Connected to DB");

    const carInsertQuery = `
      INSERT INTO Car (GarageID, CarName, Brand, Price, CarType, Seats, Gear, Fuel, CarStatus, CarImage, CarDescription)
      VALUES (${garageID}, '${name}', '${brand}', ${price}, '${type}', ${seat}, '${gear}', '${fuel}', 'Idle', '${imagePath}','${description}');
      SELECT SCOPE_IDENTITY() AS CarID;
    `;

    const carInsertResult = await sql.query(carInsertQuery);
    const newCarId = carInsertResult.recordset[0].CarID;

    const selectedFeatures = JSON.parse(features);
    for (const featureID of selectedFeatures) {
      const featureInsertQuery = `
        INSERT INTO CarFeature (CarID, FeatureID) 
        VALUES (${newCarId}, ${featureID});
      `;
      await sql.query(featureInsertQuery);
    }

    res.json({ message: "Car registered successfully!" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Server error");
  }
});

app.delete("/api/car/deleteAssociations/:carId", async (req, res) => {
  const { carId } = req.params;
  try {
    await sql.connect(sqlConfig);

    // Delete related records from CarFeature, Rental, Feedback tables
    await sql.query(`DELETE FROM CarFeature WHERE CarID = ${carId}`);
    await sql.query(`DELETE FROM Rental WHERE CarID = ${carId}`);
    await sql.query(`DELETE FROM Feedback WHERE CarID = ${carId}`);

    res.status(200).send({ message: "Car associations deleted successfully" });
  } catch (error) {
    console.error("Error deleting car associations:", error);
    res
      .status(500)
      .send({ message: "Error deleting car or associated records" });
  }
});

app.delete("/api/car/:carId", async (req, res) => {
  const { carId } = req.params;
  try {
    await sql.connect(sqlConfig);

    // Delete the car itself
    await sql.query(`DELETE FROM Car WHERE CarID = ${carId}`);

    res.status(200).send({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).send({ message: "Error deleting car" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
