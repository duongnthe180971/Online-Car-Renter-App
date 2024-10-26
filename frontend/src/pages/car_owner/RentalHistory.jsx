import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../styles/cars_owner/RentalHistory.css";
import RentalHistoryCard from "../../modules/components/RentalHistoryCard";
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
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
    case 6:
      return 'Canceled';
    default:
      return 'Unknown';
  }
};



const RentalHistory = () => {
  const [filteredRentalHistory, setRentalHistory] = useState([]);
  const [Accid, setAccID] = useState(0);
  const [garageID, setGarageID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
        setAccID(storedUser.id);
    }
    
    const fetchGarageData = async () => {
        try {
            if (Accid) {
                const responseGarage = await axios.get(`http://localhost:5000/api/garage/${Accid}`);
                if (responseGarage.data.length > 0) {
                    setGarageID(responseGarage.data[0].GarageID); // Ensure data exists before setting
                } else {
                    console.log("No garage found for this CarOwnerID");
                }
            }
        } catch (error) {
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };

    fetchGarageData();
}, [Accid]);

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const responseAccount = await axios.get("http://localhost:5000/api/account");
        const responseCar = await axios.get("http://localhost:5000/api/car");
        const response = await axios.get("http://localhost:5000/api/rental");

        console.log('Rental API Response:', response.data);

        const rentals = response.data
          .map((rental) => {
            const customer = responseAccount.data.find(c => c.id === rental.CustomerID);
            const car = responseCar.data.find(c => c.CarID === rental.CarID);
            if (car && customer) {
              return {
                ...rental,
                carName: car.CarName,
                price: car.Price,
                GarageID: car.GarageID,
                Customer: customer.UserName,
                CustomerID: customer.id
              };
            }
            return null;
          })
          .filter(rental => rental && rental.GarageID === garageID);

        setRentalHistory(rentals);
      } catch (error) {
        console.error("Error fetching rental data", error);
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
          <h1>Rental History</h1>
          <div className="rental-requests">
            {filteredRentalHistory.map((request) => (
              <RentalHistoryCard
                key={request.RentalID}
                rental={{
                  vehicle: request.carName,
                  customer: request.Customer,
                  status: getStatusLabel(request.RentalStatus),
                  bookDate: `${formatDate_String(request.RentalStart)}`,
                  timePeriod: `${formatDate_String(request.RentalStart)} To ${formatDate_String(request.RentalEnd)}`,
                  price: `${formatPrice(request.price)} VND`,
                  customerID: request.CustomerID
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
