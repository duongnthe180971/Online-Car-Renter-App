import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import carData from "../../assets/data/carData"
import { getNumOfDay, formatPrice, formatDate_vn } from "../../assets/format/numberFormat"
import rentalData from "../../assets/data/rentalData"
import "../../styles/customer/CarDetail.css"
import 'react-datepicker/dist/react-datepicker.css';

const CarDetailCard = ({ car }) => {
    const { imgUrl, carName, rating, seat, type, gear, fuel, address, description } = car;
    return (
        <div className="car-detail-card-container">
            <img src={imgUrl} alt="Car" className="car-image" />
            <div className="car-info">
                <h3>{carName}</h3>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={star <= (rating) ? 'filled' : 'empty'}
                        >
                            {star <= (rating) ? '★' : '☆'}
                        </span>
                    ))}
                </div>
                <h5>Characteristics</h5>
                <div className="characteristics">
                    <p>🪑Seats: {seat}</p>
                    <p>🚘Type: {type}</p>
                    <p>⚙️Gear: {gear}</p>
                    <p>⛽Fuel: {fuel}</p>
                </div>
                <h5>Features</h5>
                <div className="features">
                    <p>Map</p>
                    <p>GPS</p>
                    <p>Bluetooth</p>
                    <p>Reverse cam</p>
                    <p>Airbag</p>
                    <p>DVD Player</p>
                </div>
                <div className="address">
                    <h5>Address:</h5> <p>{address}</p>
                </div>
                <div className="description">
                    <h5>Description:</h5> <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

const RentalCard = ({ car, rental }) => {
    const navigate = useNavigate();
    const { price } = car;
    const insurance = 60000;


    const [data, setData] = useState(rentalData);

    const [formData, setFormData] = useState({

        startDate: new Date(),
        returnDate: new Date(),

    });
    const total_renting_price = price * getNumOfDay(formData.startDate, formData.returnDate);
    const handleDateChange = (name, date) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: date,
        }));
    };

    const updateRentalData = () => {
        const updatedRental = {
            id: car.id,
            bookDate: formatDate_vn(new Date()),
            startDate: formatDate_vn(formData.startDate),
            returnDate: formatDate_vn(formData.returnDate),
            Customer: "Name123",
            carID: car.id,
            status: 1,
        };

        const updatedData = data.map((rental) =>
            rental.id === updatedRental.id ? updatedRental : rental
        );

        setData(updatedData);

        rentalData.length = 0;
        rentalData.push(...updatedData);
        navigate("/car-status");
    };
    return (
        <div className="rental-card-container">
            <h1>{formatPrice(price)} vnd / day</h1>
            <h3>Choose rental period</h3>
            <div className="rental-period">
                <div className="rental-date">
                    <h5>Pick Up</h5>
                    <DatePicker value={formData.startDate} selected={formData.startDate} onChange={(date) => handleDateChange('startDate', date)} dateFormat="dd/MM/yyyy" />
                </div>
                <div className="rental-date">
                    <h5>Return</h5>
                    <DatePicker value={formData.returnDate} selected={formData.returnDate} onChange={(date) => handleDateChange('returnDate', date)} dateFormat="dd/MM/yyyy" />
                </div>
            </div>
            <div className="price-details">
                <div className="item"><h7>Total Renting Price:</h7><h7>{formatPrice(total_renting_price)} vnd</h7></div>
                <div className="item"><h7>Insurance:</h7><h7>{formatPrice(insurance)} vnd</h7></div>
                <div className="item"><h5>Total:</h5><h5>{formatPrice(total_renting_price + insurance)} vnd</h5></div>
            </div>
            <div className='button-container'>
                <button className="book-button" onClick={updateRentalData}>Book</button>
            </div>
        </div>
    )
}
const CarDetail = ({ id }) => {
    const car_data = carData.find(item => item.id === id);
    const rental_data = rentalData.find(item => item.id === id);
    return (
        <div className="car-detail-container">
            <CarDetailCard car={car_data} />
            <RentalCard car={car_data} rental={rental_data} />
        </div>
    )
}

export default CarDetail


