import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../styles/cars_owner/RentalHistory.css";
import CarHistoryCard from "../../modules/components/CarHistoryCard";
import ChooseBarCustomer from "../../modules/components/ChooseBarCustomer";
import { formatPrice, formatDate_String } from "../../assets/format/numberFormat";

const getStatusLabel = (status) => {
  switch (status) {
    case 1:
    case 2:
    case 3:
    case 4:
      return 'Renting';
    case 5:
      return 'Success';
    case 0:
      return 'Canceled';
    default:
      return 'Unknown';
  }
};



const CarHistory = () => {
  const [filteredRentalHistory, setRentalHistory] = useState([]);
  const [Accid, setAccID] = useState(0);
  const [garageID, setGarageID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carID, setCarID] = useState(0);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setAccID(storedUser.id);
    }
  });

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const responseGarage = await axios.get(`http://localhost:5000/api/garage`);
        const responseAccount = await axios.get("http://localhost:5000/api/account");
        const responseCar = await axios.get("http://localhost:5000/api/car");
        const response = await axios.get("http://localhost:5000/api/rental");
        

        console.log('Rental API Response:', response.data);

        const rentals = response.data
          .map((rental) => {                        
            const car = responseCar.data.find(c => c.CarID === rental.CarID);
            const Garage = responseGarage.data.find(c => c.GarageID === car.GarageID);
            const carowner = responseAccount.data.find(c => c.id === Garage.CarOwnerID);
            if (car && carowner) {
              return {
                ...rental,
                carName: car.CarName,
                price: car.Price,
                GarageID: car.GarageID,
                CarOwner: carowner.UserName,
                CarOwnerID: carowner.id
              };
            }
            return null;
          })
          .filter(rental => rental && rental.CustomerID === Accid 
            && (rental.RentalStatus === 0
            || rental.RentalStatus === 5)
            );

        setRentalHistory(rentals);
      } catch (error) {
        console.error("Error fetching rental data", error);
      }
    };

    fetchRentalData();
  }, [Accid]);

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <div className="Bar">
          <ChooseBarCustomer />
        </div>
      </div>
      <div className="RightSide">
        <div className="garage rentalReq">
          <h1>Car History</h1>
          <div className="rental-requests">
            {filteredRentalHistory.map((request) => (
              <CarHistoryCard
                key={request.RentalID}
                rental={{
                  vehicle: request.carName,
                  carowner: request.CarOwner,
                  status: getStatusLabel(request.RentalStatus),
                  bookDate: `${formatDate_String(request.RentalStart)}`,
                  timePeriod: `${formatDate_String(request.RentalStart)} To ${formatDate_String(request.RentalEnd)}`,
                  price: `${formatPrice(request.price)} VND`,
                  carownerID: request.CarOwnerID
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHistory;
