const mockCarsData = [
    {
        "CarID": 1,
        "GarageID": 1,
        "CarName": "Tesla Malibu",
        "Brand": "Tesla",
        "Rate": 4,
        "Price": 400000,
        "CarType": "SUV",
        "Seats": 4,
        "Gear": "Auto",
        "Fuel": "Electric",
        "CarStatus": "Idle",
        "CarImage": "../img/car/nissan-offer.png",
        "CarDescription": "A cutting-edge electric SUV that combines Tesla’s innovative technology with modern design, offering a comfortable ride for up to 4 passengers."
    },
    {
        "CarID": 2,
        "GarageID": 1,
        "CarName": "Toyota Aventador",
        "Brand": "Toyota",
        "Rate": 5,
        "Price": 500000,
        "CarType": "Van",
        "Seats": 6,
        "Gear": "Manual",
        "Fuel": "Gasoline",
        "CarStatus": "Idle",
        "CarImage": "../img/car/offer-toyota.png",
        "CarDescription": "A reliable and spacious van from Toyota, featuring a manual transmission and enough seating for a large family or group travel."
    },
    {
        "CarID": 3,
        "GarageID": 1,
        "CarName": "BMW X3",
        "Brand": "BMW",
        "Rate": 4,
        "Price": 300000,
        "CarType": "SUV",
        "Seats": 4,
        "Gear": "Auto",
        "Fuel": "Diesel",
        "CarStatus": "Idle",
        "CarImage": "../img/car/bmw-offer.png",
        "CarDescription": "A stylish and compact SUV from BMW with diesel efficiency and all-wheel drive, perfect for city driving and off-road adventures."
    },
    {
        "CarID": 4,
        "GarageID": 2,
        "CarName": "Nissan Mercielago",
        "Brand": "Nissan",
        "Rate": 4,
        "Price": 270000,
        "CarType": "SUV",
        "Seats": 4,
        "Gear": "Manual",
        "Fuel": "Gasoline",
        "CarStatus": "Idle",
        "CarImage": "../img/car/nissan-offer.png",
        "CarDescription": "An affordable and versatile SUV from Nissan, designed for smooth handling and powered by a gasoline engine with manual control."
    },
    {
        "CarID": 5,
        "GarageID": 2,
        "CarName": "Ferrari Camry",
        "Brand": "Ferrari",
        "Rate": 4,
        "Price": 450000,
        "CarType": "SUV",
        "Seats": 8,
        "Gear": "Semi-Auto",
        "Fuel": "Gasoline",
        "CarStatus": "Idle",
        "CarImage": "../img/car/offer-toyota.png",
        "CarDescription": "A high-performance SUV with Ferrari engineering, offering a unique blend of luxury, power, and ample seating for up to 8 passengers."
    },
    {
        "CarID": 6,
        "GarageID": 2,
        "CarName": "Mercedes Benz XC90",
        "Brand": "Mercedes",
        "Rate": 5,
        "Price": 850000,
        "CarType": "SUV",
        "Seats": 4,
        "Gear": "Auto",
        "Fuel": "Diesel",
        "CarStatus": "Idle",
        "CarImage": "../img/car/mercedes-offer.png",
        "CarDescription": "A premium SUV from Mercedes, featuring a powerful diesel engine, advanced safety features, and luxurious interiors for a comfortable drive."
    },
    {
        "CarID": 7,
        "GarageID": 3,
        "CarName": "Audi Fiesta",
        "Brand": "Audi",
        "Rate": 5,
        "Price": 500000,
        "CarType": "Sport",
        "Seats": 6,
        "Gear": "Manual",
        "Fuel": "Gasoline",
        "CarStatus": "Idle",
        "CarImage": "../img/car/toyota-offer-2.png",
        "CarDescription": "A sporty and agile car from Audi, equipped with manual transmission and seating for 6, perfect for those who love high-speed drives."
    },
    {
        "CarID": 8,
        "GarageID": 3,
        "CarName": "Rolls Royce Colorado",
        "Brand": "Colorado",
        "Rate": 4,
        "Price": 500000,
        "CarType": "SUV",
        "Seats": 4,
        "Gear": "Semi-Auto",
        "Fuel": "Gasoline",
        "CarStatus": "Idle",
        "CarImage": "../img/car/mercedes-offer.png",
        "CarDescription": "An ultra-luxurious SUV, the Rolls Royce Colorado offers a semi-automatic driving experience with elegant design and powerful performance."
    },
    {
        "CarID": 9,
        "GarageID": 3,
        "CarName": "Lamborghini Revueltoo",
        "Brand": "Lamborghini",
        "Rate": 5,
        "Price": 10000000,
        "CarType": "Sport",
        "Seats": 2,
        "Gear": "Auto",
        "Fuel": "Gasoline",
        "CarStatus": "Idle",
        "CarImage": "https://www.mclarenlife.com/attachments/2024-lamborghini-aventador-successor-rendering-v1-jpg.228772/",
        "CarDescription": "The ultimate sports car from Lamborghini, designed for pure performance and speed, with a sleek body and luxurious interiors."
    },
    {
        "CarID": 10,
        "GarageID": 3,
        "CarName": "Bugatti Centodieci",
        "Brand": "Bugatti",
        "Rate": 5,
        "Price": 10000000,
        "CarType": "Sport",
        "Seats": 2,
        "Gear": "Auto",
        "Fuel": "Gasoline",
        "CarStatus": "Renting",
        "CarImage": "https://cdn.motor1.com/images/mgl/zxp3Jb/s3/bugatti-centodieci-2022-zehntes-und-letztes-exemplar.jpg",
        "CarDescription": "A rare masterpiece, the Bugatti Centodieci is a limited-edition hypercar that offers unmatched speed, power, and exclusivity for true car enthusiasts."
    }
];

export default mockCarsData;
