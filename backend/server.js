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

app.put("/api/cars/:id", async (req, res) => {
  const carId = req.params.id;
  const { newStatus } = req.body;

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

app.get("/api/rental/:rentalId", async (req, res) => {
  const { rentalId } = req.params;
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`select*from Rental a join Car b on a.CarID = b.CarID join Account c on a.CustomerID = c.id where RentalID = ${rentalId}`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching rental data:", err);
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
  const { status } = req.body;

  try {
    await sql.connect(sqlConfig);

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

app.delete("/api/rentals/:id", async (req, res) => {
  const { id }= req.params;

  try {
    await sql.connect(sqlConfig);
    await sql.query(`Delete from Payment WHERE RentalID = ${id}`);
    await sql.query(`Delete from Rental WHERE RentalID = ${id}`);

    res.status(200).send({ message: "Rental deleted successfully" });
  } catch (error) {
    console.error("Error deleting rental:", error);
    res.status(500).send({ message: "Error deleting rental" });
  }
});

app.delete("/api/car/:carId", async (req, res) => {
  const { carId } = req.params;
  try {
    await sql.connect(sqlConfig);

    await sql.query(`DELETE FROM CarFeature WHERE CarID = ${carId}`);
    await sql.query(`DELETE FROM Feedback WHERE CarID = ${carId}`);
    await sql.query(`DELETE FROM Payment WHERE RentalID IN (SELECT RentalID FROM Rental WHERE CarID = ${carId})`);
    await sql.query(`DELETE from Rental where CarID = ${carId}`);
    await sql.query(`DELETE FROM Car WHERE CarID = ${carId}`);

    res.status(200).send({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).send({ message: "Error deleting car" });
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

app.get("/api/account/:AccID", async (req, res) => {
  const { AccID } = req.params;
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`select*from Account where id = ${AccID}`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching account data:", err);
    res.status(500).send("Server error");
  }
});

app.put("/api/account/:id", async (req, res) => {
  const { id } = req.params;
  const { name, gender, dob, phone, email } = req.body;

  try {
    await sql.connect(sqlConfig);
    const query = `
          UPDATE Account
          SET UserName = '${name}',
          Gender = '${gender}',
          DOB ='${dob}',
          Phone = '${phone}',
          Email = '${email}'
          WHERE id = ${id}
      `;
    const result = await sql.query(query);

    if (result.rowsAffected[0] > 0) {
      res.status(200).send("Car status updated successfully");
    } else {
    }
  } catch (error) {}
});

app.put("/api/account/:id/change-password", async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    await sql.connect(sqlConfig);
    const query = `
          UPDATE Account
          SET PassWord = '${newPassword}' WHERE id = ${id}
      `;
    const result = await sql.query(query);

    if (result.rowsAffected[0] > 0) {
      res.status(200).send("Car status updated successfully");
    } else {
    }
  } catch (error) {}
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

    res.json(result.recordset);
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
    cb(null, path.join(__dirname, "img"));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const fileName = `${timestamp}_${originalName}`;
    cb(null, fileName);
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

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching car data:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/car-features/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`
      SELECT FeatureID FROM CarFeature WHERE CarID = ${carId}
    `);

    res.json(result.recordset.map((row) => row.FeatureID));
  } catch (err) {
    console.error("Error fetching car features:", err);
    res.status(500).send("Server error");
  }
});
app.put("/api/updateCar/:carId", upload.single("image"), async (req, res) => {
  const { carId } = req.params;
  const { name, description, price, features, type, seat, gear, fuel, brand } =
    req.body;

  try {
    await sql.connect(sqlConfig);
    console.log("Connected to DB");

    const checkCarQuery = `SELECT * FROM Car WHERE CarID = ${carId}`;
    const carResult = await sql.query(checkCarQuery);

    if (carResult.recordset.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    let imagePath = carResult.recordset[0].CarImage;
    if (req.file) {
      const imageName = req.file.filename;
      imagePath = `http://localhost:5000/img/${imageName}`;

      console.log(`New image uploaded: ${imageName}`);
    }

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

    const selectedFeatures = JSON.parse(features);

    const deleteFeaturesQuery = `DELETE FROM CarFeature WHERE CarID = ${carId}`;
    await sql.query(deleteFeaturesQuery);

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
  const imagePath = `http://localhost:5000/img/${imageName}`;

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

    await sql.query(`DELETE FROM CarFeature WHERE CarID = ${carId}`);
    await sql.query(`DELETE FROM Feedback WHERE CarID = ${carId}`);
    await sql.query(`DELETE FROM Payment WHERE RentalID IN (SELECT RentalID FROM Rental WHERE CarID = ${carId})`);
    await sql.query(`DELETE from Rental where CarID = ${carId}`);
    await sql.query(`DELETE FROM Car WHERE CarID = ${carId}`);

    res.status(200).send({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).send({ message: "Error deleting car" });
  }
});

app.get("/api/feedback/:carId", async (req, res) => {
  const { carId } = req.params;

  if (!carId) {
    return res.status(400).json({ error: "CarID is required" });
  }

  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`
      SELECT f.*, a.UserName 
      FROM Feedback f
      JOIN Account a ON f.CustomerID = a.id
      WHERE f.CarID = ${carId}
    `);

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ error: "No feedback found for this CarID" });
    }

    res.json(result.recordset);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/account/:identifier", async (req, res) => {
  const identifier = req.params.identifier; // Lấy giá trị của identifier từ URL

  try {
    await sql.connect(sqlConfig); // Kết nối đến cơ sở dữ liệu

    const query = `
      SELECT * FROM Account 
      WHERE UserName = @identifier 
      OR Email = @identifier
    `;

    const request = new sql.Request();
    request.input("identifier", sql.VarChar, identifier); // Gán giá trị cho tham số @identifier

    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]); // Trả về bản ghi đầu tiên nếu có kết quả
    } else {
      res.status(404).send("User not found"); // Không tìm thấy người dùng
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).send("Server error");
  }
});

app.delete("/api/account/:id", async (req, res) => {
  const userId = req.params.id; // Lấy ID người dùng từ request parameters

  try {
    await sql.connect(sqlConfig); // Kết nối đến cơ sở dữ liệu

    const request = new sql.Request();
    request.input("id", sql.Int, userId); // Gán giá trị cho tham số @id để chống SQL Injection

    const result = await request.query("DELETE FROM Account WHERE id = @id");

    if (result.rowsAffected[0] > 0) {
      res.status(200).send("User deleted successfully"); // Xóa thành công
    } else {
      res.status(404).send("User not found"); // Người dùng không tồn tại
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Server error");
  }
});
app.get("/api/car", async (req, res) => {
  try {
    await sql.connect(sqlConfig); // Connect to the database
    const result = await sql.query("SELECT * FROM Car"); // Query to get all cars
    res.json(result.recordset); // Return the result as JSON
  } catch (err) {
    console.error("Error fetching car registrations:", err);
    res.status(500).send("Server error");
  }
});

// Approve a Car
app.put("/api/cars/:id/approve", async (req, res) => {
  const carId = req.params.id;
  const adminId = req.body.adminId; // Admin ID passed from frontend
  try {
    await sql.connect(sqlConfig);

    // Update CarStatus to 'Approved'
    await sql.query(
      `UPDATE Car SET CarStatus = 'Approved' WHERE CarID = ${carId}`
    );

    // Log the action into CarApprovalLog
    const logQuery = `
      INSERT INTO CarApprovalLog (CarID, AdminID, ActionType)
      VALUES (@carId, @adminId, 'Approved')
    `;
    const request = new sql.Request();
    request.input("carId", sql.Int, carId);
    request.input("adminId", sql.Int, adminId);
    await request.query(logQuery);

    res.status(200).send("Car approved successfully and action logged.");
  } catch (error) {
    console.error("Error approving car:", error);
    res.status(500).send("Error approving car");
  }
});

// Decline a Car
app.put("/api/cars/:id/decline", async (req, res) => {
  const carId = req.params.id;
  const adminId = req.body.adminId; // Admin ID passed from frontend
  try {
    await sql.connect(sqlConfig);

    // Update CarStatus to 'Declined'
    await sql.query(
      `UPDATE Car SET CarStatus = 'Declined' WHERE CarID = ${carId}`
    );

    // Log the action into CarApprovalLog
    const logQuery = `
      INSERT INTO CarApprovalLog (CarID, AdminID, ActionType)
      VALUES (@carId, @adminId, 'Declined')
    `;
    const request = new sql.Request();
    request.input("carId", sql.Int, carId);
    request.input("adminId", sql.Int, adminId);
    await request.query(logQuery);

    res.status(200).send("Car declined successfully and action logged.");
  } catch (error) {
    console.error("Error declining car:", error);
    res.status(500).send("Error declining car");
  }
});

// Fetch all features
app.get("/api/features", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Feature");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching features:", error);
    res.status(500).json({ message: "Failed to fetch features." });
  }
});

// Add a new feature
app.post("/api/features", async (req, res) => {
  const { name } = req.body;
  try {
    await sql.connect(sqlConfig);
    const query = `INSERT INTO Feature (Name) OUTPUT INSERTED.* VALUES (@name)`;
    const request = new sql.Request();
    request.input("name", sql.VarChar, name);
    const result = await request.query(query);

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error("Error adding feature:", error);
    res.status(500).json({ message: "Failed to add feature." });
  }
});

// Remove a feature by ID
app.delete("/api/features/:id", async (req, res) => {
  const featureID = req.params.id;
  try {
    await sql.connect(sqlConfig);
    const query = `DELETE FROM Feature WHERE FeatureID = @featureID`;
    const request = new sql.Request();
    request.input("featureID", sql.Int, featureID);
    const result = await request.query(query);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Feature removed successfully!" });
    } else {
      res.status(404).json({ message: "Feature not found." });
    }
  } catch (error) {
    console.error("Error removing feature:", error);
    res.status(500).json({ message: "Failed to remove feature." });
  }
});
// Route to fetch finance data for a specific year
app.get("/api/finance/:year", async (req, res) => {
  const { year } = req.params;
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(
      `SELECT Month, Income FROM Finance WHERE Year = ${year}`
    );
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching finance data:", err);
    res.status(500).json({ error: "Failed to fetch finance data" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
