import React, { useState, useEffect } from "react";
import axios from 'axios';
import RentalCard from "../../modules/components/RentalCard";
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
import "../../styles/cars_owner/RentalRequest.css";
import rentalDemo from "../../assets/data/rentalDemo";
import { formatPrice, formatDate_String } from "../../assets/format/numberFormat";

const getStatusLabel = (status) => {
    switch (status) {
        case 1:
            return 'Waiting to confirm';
        case 2:
            return 'Renting';
        case 3:
            return 'Renting';
        case 4:
            return 'Renting';
        case 5:
            return 'Renting';
        default:
            return 'Unknown';
    }
};



const RentalRequests = ({ garageID }) => {

  const [filteredRentalRequests, setRentalRequest] = useState(rentalDemo);
  useEffect(() => {
    const fetchRentalData = async () => {
        const responseAccount = await axios.get("http://localhost:5000/api/account");
        const responseCar = await axios.get("http://localhost:5000/api/car");
        const response = await axios.get("http://localhost:5000/api/rental");

        setRentalRequest(response.data
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
        .filter((rental) => rental && rental.GarageID === garageID && rental.RentalStatus !== 5)) // Step 2: Filter by GarageID
    };

    fetchRentalData();
}, [garageID]);

  // const filteredRentalRequests = rentalData
  //   .map((rental) => {
  //     // Find the corresponding car from carData using carID
  //     const car = carData.find((car) => car.id === rental.carID);
  //     if (car) {
  //       return {
  //         ...rental,
  //         carName: car.carName,
  //         price: car.price,
  //         GarageID: car.GarageID, // Add GarageID from car data
  //       };
  //     }
  //     return null; // Return null if no matching car is found (though this shouldn't happen)
  //   })
  //   .filter((rental) => rental && rental.GarageID === garageID); // Step 2: Filter by GarageID
  // {
  //     id: 1,
  //     car: 'Lamborghini Revuelto',
  //     customer: 'Name123',
  //     status: 'Waiting to confirm',
  //     bookDate: '19/10/2024',
  //     timePeriod: '21/10/2024 To 25/10/2024',
  //     price: '1,660,000 vnd',
  //     isWaiting: true
  // },
  // {
  //     id: 2,
  //     car: 'Bugatti Centodieci',
  //     customer: 'Name123',
  //     status: 'Renting',
  //     bookDate: '19/10/2024',
  //     timePeriod: '21/10/2024 To 25/10/2024',
  //     price: '1,660,000 vnd',
  //     isWaiting: false
  // }
  return (
    <div class="AllPage">
      <div class="LeftSide">
        <div class="Bar">
          <ChooseBar />
        </div>
      </div>
      <div class="RightSide">
        <div class="garage rentalReq">
          <h1>Rental Requests</h1>
          <div className="rental-requests">
            {filteredRentalRequests.map((request) => (
              <RentalCard
                key={request.id}
                request={{
                  car: request.carName,
                  customer: request.Customer,
                  status: getStatusLabel(request.RentalStatus), // Helper function to convert status to text
                  bookDate: `${formatDate_String(request.RentalStart)}`,
                  timePeriod: `${formatDate_String(request.RentalStart)} To ${formatDate_String(request.RentalEnd)}`,
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

export default RentalRequests;
