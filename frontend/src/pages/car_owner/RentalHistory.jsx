// src/RentalHistory.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../styles/cars_owner/RentalHistory.css"; // Import the main styles
import RentalHistoryCard from "../../modules/components/RentalHistoryCard"; // Import the RentalCard component
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
//import carData from "../../assets/data/carData";
import rentalDemo from "../../assets/data/rentalDemo";
import { formatPrice, formatDate_String } from "../../assets/format/numberFormat";

const getStatusLabel = (status) => {
  switch (status) {
    case 1:
      return 'Renting';
    case 2:
      return 'Renting';
    case 3:
      return 'Renting';
    case 4:
      return 'Renting';
    case 5:
      return 'Success';
    case 6:
      return 'Canceled';
    default:
      return 'Unknown';
  }
};

const RentalHistory = ({ garageID }) => {
  // const rentalData = [
  //   {
  //     vehicle: 'Toyota land cruiser V8',
  //     customer: 'Name123',
  //     bookDate: '19/10/2024',
  //     timePeriod: '21/10/2024 To 25/10/2024',
  //     price: '1,660,000 vnd',
  //     status: 'Success'
  //   },
  //   {
  //     vehicle: 'Toyota land cruiser V8',
  //     customer: 'Name123',
  //     bookDate: '19/10/2024',
  //     timePeriod: '21/10/2024 To 25/10/2024',
  //     price: '1,660,000 vnd',
  //     status: 'Canceled'
  //   }
  // ];
  const [filteredRentalHistory, setRentalHistory] = useState(rentalDemo);
  useEffect(() => {
    const fetchRentalData = async () => {
        const responseAccount = await axios.get("http://localhost:5000/api/account");
        const responseCar = await axios.get("http://localhost:5000/api/car");
        const response = await axios.get("http://localhost:5000/api/rental");

        console.log('Rental API Response:', response.data);
        setRentalHistory(response.data
        .map((rental) => {
          // Find the corresponding car from carData using carID
          const customer = responseAccount.data.find((customer) => customer.id === rental.CustomerID);
          const car = responseCar.data.find((car) => car.CarID === rental.CarID);         
          if (car) {
            return {
              ...rental,
              carName: car.CarName,
              price: car.Price,
              GarageID: car.GarageID, // Add GarageID from car data
              Customer: customer.UserName,
              CustomerID: customer.id
            };
          }
          return null; // Return null if no matching car is found (though this shouldn't happen)
        })
        .filter((rental) => rental && rental.GarageID === garageID)) // Step 2: Filter by GarageID
    };

    fetchRentalData();
}, [garageID]);
  return (
    <div class="AllPage">
      <div class="LeftSide">
        <div class="Bar">
          <ChooseBar />
        </div>
      </div>
      <div class="RightSide">
        <div class="garage rentalReq">
          <h1>Rental History</h1>
          <div className="rental-requests">
            {/* {rentalData.map((rental, index) => (
              <RentalHistoryCard key={index} rental={rental} />
            ))} */}
            {filteredRentalHistory.map((request) => (
              <RentalHistoryCard
                key={request.id}
                rental={{
                  vehicle: request.carName,
                  customer: request.Customer,
                  status: getStatusLabel(request.RentalStatus), // Helper function to convert status to text
                  bookDate: `${formatDate_String(request.RentalStart)}`,
                  timePeriod: `${formatDate_String(request.RentalStart)} To ${formatDate_String(request.RentalEnd)}`,
                  price: `${formatPrice(request.price)} VND`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalHistory;
