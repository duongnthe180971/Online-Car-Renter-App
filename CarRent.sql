USE Master
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'CarRent')
    DROP DATABASE CarRent;
GO

CREATE DATABASE CarRent;
USE CarRent;

-- Account table
CREATE TABLE Account (
    id INT PRIMARY KEY IDENTITY NOT NULL,
    UserName VARCHAR(30) UNIQUE NOT NULL,
    PassWord VARCHAR(30) NOT NULL,
	Gender bit not null,
    Role INT NOT NULL,
	DOB date not null,
	Phone varchar(10) not null,
    Email VARCHAR(50) UNIQUE NOT NULL,
    Address VARCHAR(100),
	Status bit default 1
);

-- Garage table
CREATE TABLE Garage (
    GarageID INT PRIMARY KEY IDENTITY NOT NULL,
    CarOwnerID INT FOREIGN KEY REFERENCES Account(id)
);

-- Car table
CREATE TABLE Car (
    CarID INT PRIMARY KEY IDENTITY NOT NULL,
    GarageID INT FOREIGN KEY REFERENCES Garage(GarageID),
    CarName VARCHAR(50) NOT NULL,
    Brand VARCHAR(50) NOT NULL,
    Rate INT CHECK (Rate BETWEEN 1 AND 5),
    Price INT NOT NULL,
    CarType VARCHAR(50),
    Seats INT NOT NULL,
    Gear VARCHAR(50),
    Fuel VARCHAR(50),
    CarStatus VARCHAR(20) NOT NULL,
    CarImage VARCHAR(MAX),
	CarDescription varchar(max)
);

-- Feature table
CREATE TABLE Feature (
    FeatureID INT PRIMARY KEY IDENTITY NOT NULL,
    Name VARCHAR(50) NOT NULL
);

-- CarFeature table
CREATE TABLE CarFeature (
    CarID INT FOREIGN KEY REFERENCES Car(CarID),
    FeatureID INT FOREIGN KEY REFERENCES Feature(FeatureID),
    PRIMARY KEY (CarID, FeatureID)
);

-- Rental table
CREATE TABLE Rental (
    RentalID INT PRIMARY KEY IDENTITY NOT NULL,
    CarID INT FOREIGN KEY REFERENCES Car(CarID),
    CustomerID INT FOREIGN KEY REFERENCES Account(id),
    RentalStatus int NOT NULL,
    RentalStart DATE,
    RentalEnd DATE
);

-- Payment table
CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY IDENTITY NOT NULL,
    RentalID INT FOREIGN KEY REFERENCES Rental(RentalID),
    PaymentDate DATE NOT NULL
);

-- Feedback table
CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY IDENTITY NOT NULL,
    CarID INT FOREIGN KEY REFERENCES Car(CarID),
    CustomerID INT FOREIGN KEY REFERENCES Account(id),
    FeedbackDescription VARCHAR(255),
    FeedbackDate DATE NOT NULL,
    Rate INT CHECK (Rate BETWEEN 1 AND 5)
);

-- Notification Description table
CREATE TABLE NotificationDescription (
    NotificationID INT PRIMARY KEY IDENTITY NOT NULL,
    Description VARCHAR(MAX)
);

-- Notification table
CREATE TABLE Notification (
	Id INT PRIMARY KEY IDENTITY NOT NULL,
    AccID INT FOREIGN KEY REFERENCES Account(id),
    NotificationID INT FOREIGN KEY REFERENCES NotificationDescription(NotificationID),
    NotificationDate DATE,
);

CREATE TABLE RegisterCar (
    CarID INT PRIMARY KEY IDENTITY NOT NULL,
    GarageID INT FOREIGN KEY REFERENCES Garage(GarageID),
    CarName VARCHAR(50) NOT NULL,
    Brand VARCHAR(50) NOT NULL,
    Rate INT CHECK (Rate BETWEEN 1 AND 5),
    Price INT NOT NULL,
    CarType VARCHAR(50),
    Seats INT NOT NULL,
    Gear VARCHAR(50),
    Fuel VARCHAR(50),
    CarStatus VARCHAR(20) NOT NULL,
    CarImage VARCHAR(MAX),
	CarDescription varchar(max),
	License varchar(max)
);

CREATE TABLE RegisterCarFeature (
    CarID INT FOREIGN KEY REFERENCES RegisterCar(CarID),
    FeatureID INT FOREIGN KEY REFERENCES Feature(FeatureID),
    PRIMARY KEY (CarID, FeatureID)
);


CREATE TABLE Bill (
    
    FinanceID INT PRIMARY KEY IDENTITY NOT NULL,
	AccID Int foreign key references Account(id),
    Date date NOT NULL,
    totalMoney INT NOT NULL

);

CREATE TABLE CarApprovalLog (
    LogID INT PRIMARY KEY IDENTITY NOT NULL,
    CarID INT FOREIGN KEY REFERENCES Car(CarID),
    AdminID INT FOREIGN KEY REFERENCES Account(id),
    ActionType VARCHAR(20),
    ActionDate DATETIME DEFAULT GETDATE()
);
CREATE TABLE Voucher (
    VoucherID INT PRIMARY KEY IDENTITY NOT NULL,
    VoucherCode VARCHAR(50) UNIQUE NOT NULL,
    DiscountAmount DECIMAL(10, 2) NOT NULL,
    IsClaimed BIT DEFAULT 0,
    ClaimedBy INT NULL FOREIGN KEY REFERENCES Account(id),
	image VARCHAR(MAX) NULL
);

INSERT INTO Account (UserName, PassWord,Gender, Role, DOB, Phone, Email, Address) 
VALUES 
('admin', 'adminPass',0, 1, '1980-01-15', '0123456789', 'admin@example.com', '1 Ly Thai To, Hoan Kiem, Ha Noi'),
('customer1', 'custPass1',1, 3, '1992-04-20', '0987654321', 'customer1@example.com', '10 Tran Phu, Ba Dinh, Ha Noi'),
('customer2', 'custPass2',1, 3, '1985-07-05', '0912345678', 'customer2@example.com', '15 Hang Bac, Hoan Kiem, Ha Noi'),
('car1', 'ownerPass1',0, 2, '1979-09-12', '0923456789', 'owner1@example.com', '55 Nguyen Chi Thanh, Dong Da, Ha Noi'),
('carOwner2', 'ownerPass2',1, 2, '1983-11-30', '0934567890', 'owner2@example.com', '23 Lang Ha, Dong Da, Ha Noi'),
('customer3', '123',1, 3, '1983-11-30', '0934567890', 'cust3@example.com', '23 Lang Ha, Dong Da, Ha Noi'),
('customer4', '123',1, 3, '1983-11-30', '0934567890', 'cust4@example.com', '23 Lang Ha, Dong Da, Ha Noi'),
('customer5', '123',1, 3, '1983-11-30', '0934567890', 'cust5@example.com', '23 Lang Ha, Dong Da, Ha Noi'),
('customer6', '123',1, 3, '1983-11-30', '0934567890', 'cust6@example.com', '23 Lang Ha, Dong Da, Ha Noi');

-- Insert Garages (identity column GarageID will auto-increment)
INSERT INTO Garage (CarOwnerID) 
VALUES 
(4), -- car1 (OwnerID 4)
(5); -- carOwner2 (OwnerID 5)

-- Insert Cars (identity column CarID will auto-increment)
INSERT INTO Car (GarageID, CarName, Brand, Rate, Price, CarType, Seats, Gear, Fuel, CarStatus, CarImage, CarDescription) 
VALUES 
(1, 'Tesla Malibu', 'Tesla', 4, 400000, 'SUV', 4, 'Auto', 'Electric', 'Idle', '../img/car/nissan-offer.png', 'A cutting-edge electric SUV that combines Tesla�s innovative technology with modern design, offering a comfortable ride for up to 4 passengers.'),
(1, 'Toyota Aventador', 'Toyota', 5, 500000, 'Van', 6, 'Manual', 'Gasoline', 'Idle', '../img/car/offer-toyota.png', 'A reliable and spacious van from Toyota, featuring a manual transmission and enough seating for a large family or group travel.'),
(1, 'BMW X3', 'BMW', 4, 300000, 'SUV', 4, 'Auto', 'Diesel', 'Idle', '../img/car/bmw-offer.png', 'A stylish and compact SUV from BMW with diesel efficiency and all-wheel drive, perfect for city driving and off-road adventures.'),
(1, 'Nissan Mercielago', 'Nissan', 4, 270000, 'SUV', 4, 'Manual', 'Gasoline', 'Idle', '../img/car/nissan-offer.png', 'An affordable and versatile SUV from Nissan, designed for smooth handling and powered by a gasoline engine with manual control.'),
(1, 'Ferrari Camry', 'Ferrari', 4, 450000, 'SUV', 8, 'Semi-Auto', 'Gasoline', 'Idle', '../img/car/offer-toyota.png', 'A high-performance SUV with Ferrari engineering, offering a unique blend of luxury, power, and ample seating for up to 8 passengers.'),
(2, 'Mercedes Benz XC90', 'Mercedes', 5, 850000, 'SUV', 4, 'Auto', 'Diesel', 'Idle', '../img/car/mercedes-offer.png', 'A premium SUV from Mercedes, featuring a powerful diesel engine, advanced safety features, and luxurious interiors for a comfortable drive.'),
(2, 'Audi Fiesta', 'Audi', 5, 500000, 'Sport', 6, 'Manual', 'Gasoline', 'Idle', '../img/car/toyota-offer-2.png', 'A sporty and agile car from Audi, equipped with manual transmission and seating for 6, perfect for those who love high-speed drives.'),
(2, 'Rolls Royce Colorado', 'Colorado', 4, 500000, 'SUV', 4, 'Semi-Auto', 'Gasoline', 'Idle', '../img/car/mercedes-offer.png', 'An ultra-luxurious SUV, the Rolls Royce Colorado offers a semi-automatic driving experience with elegant design and powerful performance.'),
(2, 'Lamborghini Revueltoo', 'Lamborghini', 5, 10000000, 'Sport', 2, 'Auto', 'Gasoline', 'Idle', 'https://www.mclarenlife.com/attachments/2024-lamborghini-aventador-successor-rendering-v1-jpg.228772/', 'The ultimate sports car from Lamborghini, designed for pure performance and speed, with a sleek body and luxurious interiors.'),
(2, 'Bugatti Centodieci', 'Bugatti', 5, 10000000, 'Sport', 2, 'Auto', 'Gasoline', 'Renting', 'https://cdn.motor1.com/images/mgl/zxp3Jb/s3/bugatti-centodieci-2022-zehntes-und-letztes-exemplar.jpg', 'A rare masterpiece, the Bugatti Centodieci is a limited-edition hypercar that offers unmatched speed, power, and exclusivity for true car enthusiasts.'),
(2, 'Audi Fiesta2', 'Audi', 5, 500000, 'Sport', 6, 'Manual', 'Gasoline', 'Renting', '../img/car/toyota-offer-2.png', 'A sporty and agile car from Audi, equipped with manual transmission and seating for 6, perfect for those who love high-speed drives.'),
(2, 'Audi Fiesta3', 'Audi', 5, 500000, 'Sport', 6, 'Manual', 'Gasoline', 'Renting', '../img/car/toyota-offer-2.png', 'A sporty and agile car from Audi, equipped with manual transmission and seating for 6, perfect for those who love high-speed drives.'),
(2, 'Audi Fiesta2', 'Audi', 5, 500000, 'Sport', 6, 'Manual', 'Gasoline', 'Renting', '../img/car/toyota-offer-2.png', 'A sporty and agile car from Audi, equipped with manual transmission and seating for 6, perfect for those who love high-speed drives.');
-- Insert Features (identity column FeatureID will auto-increment)
INSERT INTO Feature (Name) 
VALUES 
('Bluetooth'), 
('GPS'), 
('Airbag'), 
('Reverse Cam'), 
('USB Port'), 
('Map'), 
('DVD Player');

select*from Car
-- Insert CarFeature relationships
INSERT INTO CarFeature (CarID, FeatureID) 
VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), -- Tesla Malibu
(2, 1), (2, 5), (2, 6), (2, 3),         -- Toyota Aventador
(3, 3), (3, 2), (3, 1), (3, 4), (3, 5), -- BMW X3
(4, 3), (4, 4), (4, 5),                 -- Nissan Mercielago
(5, 1), (5, 5), (5, 3), (5, 6), (5, 7), -- Ferrari Camry
(6, 1), (6, 4), (6, 7), (6, 2),         -- Mercedes Benz XC90
(7, 3), (7, 5), (7, 6),                 -- Audi Fiesta
(8, 3), (8, 4), (8, 7),                 -- Rolls Royce Colorado
(9, 1), (9, 3), (9, 6),                 -- Lamborghini Revuelto
(10, 2), (10, 3), (10, 5), (10, 7);     -- Bugatti Centodieci

-- Insert Rentals (identity column RentalID will auto-increment)
INSERT INTO Rental (CarID, CustomerID, RentalStatus, RentalStart, RentalEnd) 
VALUES 
(1, 2, 5, '2024-10-21', '2024-10-25'),
(2, 2, 5, '2024-09-12', '2024-09-15'),
(3, 2, 5, '2024-10-07', '2024-10-12'),
(4, 2, 5, '2024-08-22', '2024-08-26'),
(5, 2, 5, '2024-07-17', '2024-07-20'),
(6, 2, 5, '2024-06-05', '2024-06-10'),
(7, 2, 5, '2024-05-03', '2024-05-08'),
(8, 2, 5, '2024-04-17', '2024-04-21'),
(9, 2, 5, '2024-03-14', '2024-03-18'),
(10, 2, 5, '2024-02-22', '2024-02-27'),
(10, 6, 1, '2024-11-08', '2024-11-20'),
(11, 7, 2, '2024-11-08', '2024-11-20'),
(12, 8, 3, '2024-11-08', '2024-11-20'),
(13, 9, 4, '2024-11-08', '2024-11-20');

select * from Rental
-- Insert Payments (identity column PaymentID will auto-increment)
INSERT INTO Payment (RentalID, PaymentDate) 
VALUES 
(1, '2024-10-25'),
(2, '2024-09-15'),
(3, '2024-10-12'),
(4, '2024-08-26'),
(5, '2024-07-20'),
(6, '2024-06-10'),
(7, '2024-05-08'),
(8, '2024-04-21'),
(9, '2024-03-18'),
(10, '2024-02-27');

-- Insert Notification Descriptions (identity column NotificationID will auto-increment)
INSERT INTO NotificationDescription (Description) 
VALUES 
('Car rental confirmation'),--1
('Car maintenance update'),--2
('Rental return reminder'),--3
('Rental cancellation notice'),--4
('Feedback request'),--5
('Your car has been approved'),--6
('Your car has been declined'),--7
('Car Status has been updated'), --8
('Customer Ordered Your Car'), --9
('Car has been returned successfully'), --10
('Your car has a new feedback'), --11
('The Payment of your car order has been pay.'), --12
('Car Registration Confirmation.'); --13

-- Insert Notifications for users
INSERT INTO Notification (AccID, NotificationID, NotificationDate) 
VALUES 
(1, 1, '2024-10-19'),
(1, 4, '2024-08-20'),
(2, 2, '2024-09-10'),
(3, 3, '2024-10-05'),
(3, 5, '2024-07-15');

INSERT INTO Feedback (CarID, CustomerID, FeedbackDescription, FeedbackDate, Rate) 
VALUES 
-- Tesla Malibu (CarID 1)
(1, 2, 'Great performance and smooth ride. Highly recommended!', '2024-10-01', 5),

-- Toyota Aventador (CarID 2)
(2, 2, 'Spacious and reliable, perfect for family trips.', '2024-09-15', 5),

-- BMW X3 (CarID 3)
(3, 2, 'Great for both city driving and off-road adventures.', '2024-10-10', 5),


-- Nissan Mercielago (CarID 4)
(4, 2, 'Affordable and versatile, perfect for daily use.', '2024-09-12', 4),

-- Ferrari Camry (CarID 5)
(5, 2, 'High-performance SUV with a smooth drive.', '2024-07-28', 5),


-- Mercedes Benz XC90 (CarID 6)
(6, 2, 'Premium feel and exceptional performance.', '2024-06-20', 5),

-- Audi Fiesta (CarID 7)
(7, 2, 'A fun car for high-speed driving.', '2024-05-30', 5),


-- Rolls Royce Colorado (CarID 8)
(8, 2, 'Ultimate luxury, everything was perfect.', '2024-04-30', 5),


-- Lamborghini Revueltoo (CarID 9)
(9, 2, 'The best sports car I have ever driven.', '2024-03-25', 5),


-- Bugatti Centodieci (CarID 10)
(10, 2, 'A dream car for any enthusiast, worth every penny.', '2024-02-29', 5);



INSERT INTO Bill (AccID, Date, totalMoney) VALUES 
(5, '2020-01-01', 8000), 
(4, '2020-02-01', 7500), 
(5, '2020-03-01', 9000), 
(4, '2020-04-01', 10000), 
(5, '2020-05-01', 11000), 
(4, '2020-06-01', 12000), 
(5, '2020-07-01', 15000), 
(4, '2020-08-01', 13000), 
(5, '2020-09-01', 14000), 
(4, '2020-10-01', 16000), 
(5, '2020-11-01', 17000), 
(4, '2020-12-01', 20000), 
(5, '2021-01-01', 8500), 
(4, '2021-02-01', 7800), 
(5, '2021-03-01', 9500), 
(4, '2021-04-01', 10500), 
(5, '2021-05-01', 11500), 
(4, '2021-06-01', 12500), 
(5, '2021-07-01', 16000), 
(4, '2021-08-01', 13500), 
(5, '2021-09-01', 14500), 
(4, '2021-10-01', 16500), 
(5, '2021-11-01', 17500), 
(4, '2021-12-01', 20500), 
(5, '2022-01-01', 9000), 
(4, '2022-02-01', 8000), 
(5, '2022-03-01', 10000), 
(4, '2022-04-01', 11000), 
(5, '2022-05-01', 12000), 
(4, '2022-06-01', 13000), 
(5, '2022-07-01', 14000), 
(4, '2022-08-01', 13500), 
(5, '2022-09-01', 14500), 
(4, '2022-10-01', 15500), 
(5, '2022-11-01', 16500), 
(4, '2022-12-01', 19500), 

(5, '2023-01-01', 12000), 
(4, '2023-02-01', 14000), 
(5, '2023-03-01', 18000), 
(4, '2023-04-01', 21000), 
(5, '2023-05-01', 16000), 
(4, '2023-06-01', 23000), 
(5, '2023-07-01', 27000), 
(4, '2023-08-01', 19000), 
(5, '2023-09-01', 22000), 
(4, '2023-10-01', 25000), 
(5, '2023-11-01', 24000), 
(4, '2023-12-01', 28000), 

(5, '2024-01-01', 10000), 
(4, '2024-02-01', 7000), 
(5, '2024-03-01', 15000), 
(4, '2024-04-01', 8000), 
(5, '2024-05-01', 18000), 
(4, '2024-06-01', 25000), 
(5, '2024-07-01', 20000), 
(4, '2024-08-01', 16000), 
(5, '2024-09-01', 11000), 
(4, '2024-10-01', 18000), 
(5, '2024-11-01', 12000), 
(4, '2024-12-01', 22000);

INSERT INTO CarApprovalLog (CarID, AdminID, ActionType, ActionDate) 
VALUES 
(7, 1, 'Approved', '2024-10-21 07:54:10'),
(5, 1, 'Declined', '2024-10-21 07:54:14'),
(10, 1, 'Approved', '2024-10-21 07:54:27'),
(1, 1, 'Approved', '2024-10-21 08:14:15'),
(2, 1, 'Declined', '2024-10-21 08:14:18'),
(1, 1, 'Approved', '2024-10-21 08:27:56'),
(1, 1, 'Approved', '2024-10-23 20:56:03');

INSERT INTO RegisterCar (GarageID, CarName, Brand, Rate, Price, CarType, Seats, Gear, Fuel, CarStatus, CarImage, CarDescription, License) 
VALUES 
(1, 'Tesla Roadster', 'Tesla', 5, 1200000, 'Sport', 2, 'Auto', 'Electric', 'Pending', 
    (SELECT TOP 1 CarImage FROM Car ORDER BY NEWID()), 'A high-performance electric sports car from Tesla.', 'TES-2024-001'),
(1, 'Toyota Camry', 'Toyota', 4, 350000, 'Sedan', 4, 'Auto', 'Gasoline', 'Pending', 
    (SELECT TOP 1 CarImage FROM Car ORDER BY NEWID()), 'A reliable sedan with comfortable seating for 4.', 'TOY-2024-002'),
(1, 'BMW 7 Series', 'BMW', 5, 850000, 'Sedan', 4, 'Auto', 'Diesel', 'Pending', 
    (SELECT TOP 1 CarImage FROM Car ORDER BY NEWID()), 'A luxury sedan from BMW, providing comfort and style.', 'BMW-2024-003'),
(2, 'Nissan Patrol', 'Nissan', 4, 600000, 'SUV', 6, 'Auto', 'Gasoline', 'Pending', 
    (SELECT TOP 1 CarImage FROM Car ORDER BY NEWID()), 'A powerful SUV with spacious seating for 6 passengers.', 'NIS-2024-004'),
(2, 'Ferrari 488', 'Ferrari', 5, 1500000, 'Sport', 2, 'Auto', 'Gasoline', 'Pending', 
    (SELECT TOP 1 CarImage FROM Car ORDER BY NEWID()), 'A high-performance sports car with seating for 2.', 'FER-2024-005'),
(2, 'Mercedes GLS', 'Mercedes', 5, 1000000, 'SUV', 8, 'Auto', 'Diesel', 'Pending', 
    (SELECT TOP 1 CarImage FROM Car ORDER BY NEWID()), 'A luxury SUV offering ample space for 8 passengers.', 'MER-2024-006'),
(1, 'Audi A8', 'Audi', 4, 780000, 'Sedan', 4, 'Auto', 'Gasoline', 'Pending', 
    (SELECT TOP 1 CarImage FROM Car ORDER BY NEWID()), 'A luxury sedan with comfortable seating for 4.', 'AUD-2024-007'),
(1, 'Kia Carnival', 'Kia', 4, 500000, 'Van', 8, 'Auto', 'Gasoline', 'Pending', 
    (SELECT TOP 1 CarImage FROM Car ORDER BY NEWID()), 'A spacious van with seating for up to 8, perfect for group travel.', 'KIA-2024-008');


INSERT INTO Voucher (VoucherCode, DiscountAmount, IsClaimed, ClaimedBy, image)
VALUES 
    ('NEWUSER', 10.00, 0, NULL, NULL);


	  select * from Car
	  select * from Rental
	  select * from Feedback
	  select * from RegisterCar
	  select * from RegisterCarFeature
	  select * from Account
	  select * from Garage
	  select * from Voucher
	  select * from Bill

	  UPDATE Rental
      SET RentalStatus = 3
      WHERE RentalID = 13

	  delete from Feedback where CustomerID = 2

