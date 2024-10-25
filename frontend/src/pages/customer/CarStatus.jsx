import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChooseBarCustomer from '../../modules/components/ChooseBarCustomer';
import { formatPrice, formatDate_vn } from "../../assets/format/numberFormat";
import "../../styles/customer/CarStatus.css";

const CarOrderDetails = ({ car, rental, handleCancel }) => {
    const { CarImage, CarName, Rate, Price } = car;
    const { RentalStart, RentalEnd, RentalStatus } = rental;
    return (
        <div className="car-order-container">
            <div className="title">My Renting Car:</div>
            <div className="car-order-content">
                <div className="car-image-section">
                    <img className="car-image" src={CarImage} alt={CarName} />
                </div>
                <div className="car-details-section">
                    <h1>{CarName}</h1>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= Rate ? 'filled' : 'empty'}>
                                {star <= Rate ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                    <div className="car-info">
                        <div className="item"><h5>Start Date:</h5> <h5>{formatDate_vn(RentalStart)}</h5></div>
                        <div className="item"><h5>Return Date:</h5> <h5>{formatDate_vn(RentalEnd)}</h5></div>
                        <div className="item"><h5>Price:</h5> <h5>{formatPrice(Price)} VND</h5></div>
                    </div>
                </div>
            </div>
            <ProgressBar status={RentalStatus} />
            <div className="cancel-section">
                { RentalStatus === 1 ? (<button className="cancel-btn" onClick={handleCancel}>Cancel Order</button>) : 
                (RentalStatus === 2 ? (<button className="in-rent-btn" onClick={handleCancel}>In Rent</button>) : 
                (RentalStatus === 3 ? (<button className="return-btn" onClick={handleCancel}>Return Car</button>) : (<div/>) ) ) 
                }
            </div>
        </div>
    );
};

const ProgressBar = ({ status }) => {
    return (
        <div className="progress-bar">
            <div className="progress-item">
                <h5>Booked</h5>
                <div className={status >= 1 ? 'progress-step isBook' : 'progress-step'} />
            </div>
            <div className="progress-item">
                <h5>Confirmed</h5>
                <div className={status >= 2 ? 'progress-step isConfirm' : 'progress-step'} />
            </div>
            <div className="progress-item">
                <h5>Renting</h5>
                <div className={status >= 3 ? 'progress-step isRent' : 'progress-step'} />
            </div>
            <div className="progress-item">
                <h5>Waiting Return</h5>
                <div className={status >= 4 ? 'progress-step isWaiting' : 'progress-step'} />
            </div>
            <div className="progress-item">
                <h5>Completed</h5>
                <div className={status >= 5 ? 'progress-step isComplete' : 'progress-step'} />
            </div>
        </div>
    );
};

const CarStatus = () => {
    const location = useLocation();
    const [{id}, setId] = useState(location.state || { id: 1 });
    const [car, setCar] = useState(null);
    const [rental, setRental] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carResponse = await axios.get("http://localhost:5000/api/car");
                const car_ = carResponse.data.find((item) => item.CarID === id);
                setCar(car_);

                const rentalResponse = await axios.get("http://localhost:5000/api/rental");
                const filteredRentals = rentalResponse.data.filter((item) => item.CarID === id);
                const sortedRentals = filteredRentals.sort((a, b) => b.RentalID - a.RentalID);
                const rental_ = sortedRentals.length > 0 ? sortedRentals[0] : null;
                setRental(rental_);
            } catch (err) {
                setError("Error loading car or rental data");
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [id]);

    const handleCancel = () => {
        setId(0);
    };

    return (
        <div className="AllPage">
            <div className="LeftSide">
                <div className="Bar">
                    <ChooseBarCustomer />
                </div>
            </div>
            <div className="RightSide sidefix">
                {id > 0 && car && rental ? (
                    <CarOrderDetails car={car} rental={rental} handleCancel={handleCancel} />
                ) : (
                    <h1>{ error ? error : "You have not rented any car yet"}</h1>
                )}
            </div>
        </div>
    );
};

export default CarStatus;
