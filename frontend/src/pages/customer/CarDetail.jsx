import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { getNumOfDay, formatPrice, formatDate_vn } from "../../assets/format/numberFormat";
import rentalData from "../../assets/data/rentalData";
import "../../styles/customer/CarDetail.css";
import 'react-datepicker/dist/react-datepicker.css';

const CarDetailCard = ({ car }) => {
    const { CarImage, CarName, Rate, Seats, CarType, Gear, Fuel, Description } = car;
    const features = ["Bluetooth", "GPS", "Airbag", "Reverse Cam", "USB Port"];
    const address = "123 Tran Duy Hung, Cau Giay, Ha Noi";
    const featureList = Array.isArray(features) ? features : [];

    return (
        <div className="car-detail-card-container">
            <img src={process.env.PUBLIC_URL + CarImage} alt="Car" className="car-image" />
            <div className="car-info">
                <h3>{CarName}</h3>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={star <= Rate ? 'filled' : 'empty'}
                        >
                            {star <= Rate ? '★' : '☆'}
                        </span>
                    ))}
                </div>
                <h5>Characteristics</h5>
                <div className="characteristics">
                    <p>🪑Seats: {Seats}</p>
                    <p>🚘Type: {CarType}</p>
                    <p>⚙️Gear: {Gear}</p>
                    <p>⛽Fuel: {Fuel}</p>
                </div>
                <h5>Features</h5>
                <div className="features">
                    {featureList.map((item, index) => <p key={index}>{item}</p>)}
                </div>
                <div className="address">
                    <h5>Address:</h5> <p>{address}</p>
                </div>
                <div className="description">
                    <h5>Description:</h5> <p>{Description}</p>
                </div>
            </div>
        </div>
    );
}

const RentalCard = ({ car, rental }) => {
    const navigate = useNavigate();
    const { Price } = car;
    const insurance = 60000;

    const [data, setData] = useState(rentalData);

    const [formData, setFormData] = useState({
        startDate: new Date(),
        returnDate: new Date(),
    });

    const total_renting_price = Price * getNumOfDay(formData.startDate, formData.returnDate);

    const handleDateChange = (name, date) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: date,
        }));
    };

    const updateRentalData = () => {
        const updatedRental = {
            id: car.CarID,
            bookDate: formatDate_vn(new Date()),
            startDate: formatDate_vn(formData.startDate),
            returnDate: formatDate_vn(formData.returnDate),
            Customer: "Name123",
            carID: car.CarID,
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
            <h1>{formatPrice(Price)} vnd / day</h1>
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
    );
}

const CarDetail = ({ id }) => {
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await axios.get("http://localhost:5000/api/car");
            const car_ = response.data.find((item) => item.CarID === id);
            setCar(car_);
        };

        fetchCarData();
    }, [id]);

    const rental_data = rentalData.find(item => item.id === id);

    if (!car) return <div>Car not found.</div>;

    return (
        <div className="car-detail-container">
            <CarDetailCard car={car} />
            <RentalCard car={car} rental={rental_data} />
        </div>
    );
}

export default CarDetail;
