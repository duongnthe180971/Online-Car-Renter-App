// CarCard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/component/CarCard.css';
const CarCard = ({ car, onStatusChange }) => {
    const [isAvailable, setIsAvailable] = useState(car.CarStatus === 'Idle');
    const navigate = useNavigate();

    useEffect(() => {
        setIsAvailable(car.CarStatus === 'Idle');
    }, [car.CarStatus]);

    const handleToggle = () => {
        // Toggle the status and set it locally
        const newStatus = isAvailable ? 'Closed' : 'Idle'; // Change status accordingly
        setIsAvailable(!isAvailable); // Update availability
        onStatusChange(car.CarID, newStatus); // Inform parent about the status change
    };

    const handleViewCar = () => {
        // Navigate to UpdateCar component with car details
        navigate(`/update-car`, { state: { carId: car.CarID } });
      };

    return (
        <div className={`car-card ${isAvailable ? 'available' : 'unavailable'}`}>
            <div className="car-image">
                <img src={process.env.PUBLIC_URL + car.CarImage} alt={car.CarName} />
            </div>
            <div className="car-info">
                <h2>{car.CarName}</h2>
                <div className="car-rating">
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= (car.Rate) ? 'filled' : 'empty'}
                            >
                                {star <= ( car.Rate) ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                    <span className={`status ${car.CarStatus.toLowerCase()}`}>
                        Status: {car.CarStatus}
                    </span>
                </div>
                <div className="car-details">
                    <span>Type: {car.CarType}</span>
                    <span>Seats: {car.Seats}</span>
                    <span>Gear: {car.Gear}</span>
                    <span>Fuel: {car.Fuel}</span>
                </div>
                <div className="car-actions">
                    <button className="view-car-btn" onClick={handleViewCar}>View Car</button>
                    <button className="delete-car-btn">Delete Car</button>
                    <label className="switch">
                        <input type="checkbox" checked={isAvailable} onChange={handleToggle} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
