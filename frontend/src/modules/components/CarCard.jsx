// CarCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/component/CarCard.css';
import axios from 'axios';
const CarCard = ({ car, onStatusChange }) => {
    const [isAvailable, setIsAvailable] = useState(car.CarStatus === 'Idle');
    const navigate = useNavigate();

    useEffect(() => {
        setIsAvailable(car.CarStatus === 'Idle');
    }, [car.CarStatus]);

    const handleToggle = async () => {
        const newStatus = isAvailable ? 'Closed' : 'Idle'; // Change status accordingly
        setIsAvailable(!isAvailable); // Update availability
        try {
            // Send PUT request to update the car status in the database
            const response = await axios.put(`http://localhost:5000/api/cars/${car.CarID}`, {
                newStatus: newStatus,
            },
            {
                headers: {
                    'Content-Type': 'application/json', // Ensure the Content-Type header is set
                },
            }
        );

            // Update the parent component that the status has changed
            if (response.status === 200) {
                onStatusChange(car.CarID, newStatus); // Inform the parent about the status change
            }
        } catch (error) {
        } finally {
        }
    };

    const handleViewCar = () => {
        // Navigate to UpdateCar component with car details
        navigate(`/update-car`, { state: { carId: car.CarID } });
      };

      const handleDeleteCar = async () => {
        try {
            // Delete associated records first
            await axios.delete(`http://localhost:5000/api/car/deleteAssociations/${car.CarID}`);
    
            // Then delete the car itself
            await axios.delete(`http://localhost:5000/api/car/${car.CarID}`);
    
            console.log('Car deleted successfully');
            window.location.reload();  // Refresh the page after deletion
        } catch (error) {
            console.error('Error deleting car:', error);
            alert('Failed to delete the car. Please try again.');
        }
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
                    <button className="delete-car-btn" onClick={handleDeleteCar}>Delete Car</button>
                    <label className="switch">
                        <input type="checkbox" 
                               checked={isAvailable} 
                               onChange={handleToggle} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
