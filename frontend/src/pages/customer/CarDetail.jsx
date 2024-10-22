import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { getNumOfDay, formatPrice } from "../../assets/format/numberFormat";
import "../../styles/customer/CarDetail.css";
import 'react-datepicker/dist/react-datepicker.css';

const CarDetailCard = ({ car }) => {
    const { CarID, GarageID, CarImage, CarName, Rate, Seats, CarType, Gear, Fuel, CarDescription } = car;
    const [address, setAddress] = useState("");
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const fetchAddressData = async () => {
            const resGarage = await axios.get("http://localhost:5000/api/garage");
            const garage = resGarage.data.find((item) => item.GarageID === GarageID);
            const accID = garage.CarOwnerID;
            const resAccount = await axios.get("http://localhost:5000/api/account");
            const account = resAccount.data.find((item) => item.id === accID);
            const address_ = account.Address;
            setAddress(address_);
        };

        const fetchFeatureData = async () => {
            const resFeatures = await axios.get(`http://localhost:5000/api/features/${CarID}`);
            const features_ = resFeatures.data.map((f) => f.Name);
            setFeatures(features_);
        };

        if (CarID && GarageID) {
            fetchAddressData();
            fetchFeatureData();
        }
    }, [CarID, GarageID]);

    const featureList = Array.isArray(features) ? features : [];

    return (
        <div className="car-detail-card-container">
            <img src={CarImage} alt="Car" className="car-image" />
            <div className="car-info">
                <h3>{CarName}</h3>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= Rate ? 'filled' : 'empty'}>
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
                    <h5>Description:</h5> <p>{CarDescription}</p>
                </div>
            </div>
        </div>
    );
}

const RentalCard = ({ car }) => {
    const navigate = useNavigate();
    const { Price, CarID } = car;
    const insurance = 60000;

    const [formData, setFormData] = useState({
        startDate: new Date(),
        returnDate: new Date(),
    });

    const totalRentingPrice = Price * getNumOfDay(formData.startDate, formData.returnDate);

    const handleDateChange = (name, date) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: date,
        }));
    };

    const addNewRental = async () => {
        const newRental = {
            CarID: CarID,
            CustomerID: 3,
            RentalStart: formData.startDate,
            RentalEnd: formData.returnDate,
            RentalStatus: 1,
        };

        try {
            await axios.post('http://localhost:5000/api/rental', newRental);
            navigate('/car-status', { state: { id: CarID } });
        } catch (error) {
            console.error('Error adding rental:', error);
        }
    };

    return (
        <div className="rental-card-container">
            <h1>{formatPrice(Price)} VND / day</h1>
            <h3>Choose rental period</h3>
            <div className="rental-period">
                <div className="rental-date">
                    <h5>Pick Up</h5>
                    <DatePicker
                        selected={formData.startDate}
                        onChange={(date) => handleDateChange('startDate', date)}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="rental-date">
                    <h5>Return</h5>
                    <DatePicker
                        selected={formData.returnDate}
                        onChange={(date) => handleDateChange('returnDate', date)}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>
            <div className="price-details">
                <div className="item"><h7>Total Renting Price:</h7><h7>{formatPrice(totalRentingPrice)} VND</h7></div>
                <div className="item"><h7>Insurance:</h7><h7>{formatPrice(insurance)} VND</h7></div>
                <div className="item"><h5>Total:</h5><h5>{formatPrice(totalRentingPrice + insurance)} VND</h5></div>
            </div>
            <div className='button-container'>
                <button className="book-button" onClick={addNewRental}>Book</button>
            </div>
        </div>
    );
}

const CarDetail = () => {
    const location = useLocation();
    const { id } = location.state || {id: 1};
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await axios.get("http://localhost:5000/api/car");
            const car_ = response.data.find((item) => item.CarID === id);
            setCar(car_);
        };

        fetchCarData();
    }, [id]);

    if (!car) return <div>Car not found.</div>;

    return (
        <div className="car-detail-container">
            <CarDetailCard car={car} />
            <RentalCard car={car} />
        </div>
    );
}

export default CarDetail;
