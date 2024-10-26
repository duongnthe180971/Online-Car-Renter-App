import React, { useState, useEffect } from "react";
import "../../styles/General.css";
import axios from "axios";
import "../../styles/customer/RentalDetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { formatPrice, formatDate_String } from "../../assets/format/numberFormat";

const RentalOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { rentalID } = location.state || {};

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

    const [customer, setCustomer] = useState("");
    const [name, setName] = useState("");
    const [bookDate, setBookDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchCarDetails = async () => {
          try {
            const rentalResponse = await axios.get(`http://localhost:5000/api/rental/${rentalID}`);
            const rental = rentalResponse.data;
            
            setCustomer(rental.UserName);
            setName(rental.CarName);
            setBookDate(rental.RentalStart);
            setStartDate(rental.RentalStart);
            setReturnDate(rental.RentalEnd);
            setPrice(rental.Price);
            setStatus(rental.RentalStatus);

          } catch (err) {
            console.error("Error fetching car details:", err);
          }
        };   
        fetchCarDetails();
      }, [rentalID]);
    
    return (
        <div className="car-container">
            <div className="car-header">
                <button className="backButton" onClick={() => navigate(-1)}>&lt; Back</button>
                <h1 className="heading">Rental Detail</h1>
            </div>

            <div className="formContainer">
                <form className="form">
                    <p className="info">Customer:  {customer}</p>
                    <p className="info">Car Name: {name}</p>
                    <p className="info">Book Date: {formatDate_String(startDate)}</p>
                    <p className="info">Start Date: {formatDate_String(startDate)}</p>
                    <p className="info">Return Date: {formatDate_String(returnDate)}</p>
                    <p className="info">Price: {formatPrice(price)} vnd</p>
                    <p className="info">Status: {getStatusLabel(status)} </p>
                </form>
            </div>
        </div>
    );
};

export default RentalOrder;
