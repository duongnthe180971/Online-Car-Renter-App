// src/RentalHistory.js
import React from 'react';
import '../../styles/cars_owner/RentalHistory.css';  // Import the main styles
import RentalHistoryCard from '../../modules/components/RentalHistoryCard';  // Import the RentalCard component
import ChooseBar from '../../modules/components/ChooseBar';
import carData from "../../assets/data/carData"
import rentalData from '../../assets/data/rentalData';
import { formatPrice } from "../../assets/format/numberFormat"

const getStatusLabel = (status) => {
  switch (status) {
    case 1:
      return 'Success';
    case 2:
      return 'Success';
    case 3:
      return 'Canceled';
    case 4:
      return 'Success';
    case 5:
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
  const filteredRentalHistory = rentalData
    .map((rental) => {
      // Find the corresponding car from carData using carID
      const car = carData.find((car) => car.id === rental.carID);
      if (car) {
        return {
          ...rental,
          carName: car.carName,
          price: car.price,
          GarageID: car.GarageID // Add GarageID from car data
        };
      }
      return null; // Return null if no matching car is found (though this shouldn't happen)
    })
    .filter((rental) => rental && rental.GarageID === garageID); // Step 2: Filter by GarageID

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
                  status: getStatusLabel(request.status), // Helper function to convert status to text
                  bookDate: request.bookDate,
                  timePeriod: `${request.startDate} To ${request.returnDate}`,
                  price: `${formatPrice(request.price)} VND`,
                  isWaiting: request.status === 1, // Example: Set waiting if status is '1'
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
