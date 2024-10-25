import React, { useState, useEffect } from "react";
import axios from 'axios';
import RentalCard from "../../modules/components/RentalCard";
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
import "../../styles/cars_owner/RentalRequest.css";
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

  const [filteredRentalRequests, setRentalRequest] = useState([]);
  
  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const [responseAccount, responseCar, responseRental] = await Promise.all([
          axios.get("http://localhost:5000/api/account"),
          axios.get("http://localhost:5000/api/car"),
          axios.get("http://localhost:5000/api/rental"),
        ]);
  
        const accountData = responseAccount.data || [];
        const carData = responseCar.data || [];
        const rentalData = responseRental.data || [];
  
        const filteredData = rentalData
          .map((rental) => {
            const customer = accountData.find(
              (customer) => customer.id === rental.CustomerID
            );
            const car = carData.find((car) => car.CarID === rental.CarID);
  
            if (car) {
              return {
                ...rental,
                carName: car.CarName,
                price: car.Price,
                GarageID: car.GarageID,
                Customer: customer?.UserName || "Unknown Customer",
                CustomerID: customer?.id || null,
              };
            }
            return null;
          })
          .filter((rental) => rental && rental.GarageID === garageID && rental.RentalStatus !== 5);
  
        setRentalRequest(filteredData);
      } catch (error) {
        console.error("Error fetching rental data:", error);
      }
    };
  
    fetchRentalData();
  }, [garageID]);

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <div className="Bar">
          <ChooseBar />
        </div>
      </div>
      <div className="RightSide">
        <div className="garage rentalReq">
          <h1>Rental Requests</h1>
          <div className="rental-requests">
            {filteredRentalRequests.map((request) => (
              <RentalCard
                key={request.id}
                request={{
                  car: request.carName,
                  customer: request.Customer,
                  status: getStatusLabel(request.RentalStatus),
                  bookDate: `${formatDate_String(request.RentalStart)}`,
                  timePeriod: `${formatDate_String(request.RentalStart)} To ${formatDate_String(request.RentalEnd)}`,
                  price: `${formatPrice(request.price)} VND`,
                  rentalId: request.RentalID,
                  isWaiting: request.status === 1,
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
