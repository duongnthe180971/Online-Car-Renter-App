import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/car/CarDetailsModal.css';

const CarDetailsModal = ({ car, onClose }) => {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        if(car.CarStatus === "Renting"){
            alert("You cannot edit renting car");
            return;
        }
        navigate(`/update-car`, { state: { carId: car.CarID } });
    };

    if (!car) return null;

    return (
        <div className="car-details-modal">
            <div className="car-details-content">
                <button className="close-modal-btn" onClick={onClose}>Close</button>
                <div className="car-details-left">
                    <img src={car.CarImage} alt={car.CarName} />
                </div>
                <div className="car-details-right">
                    <h2>{car.CarName}</h2>
                    <p><strong>Brand:</strong> {car.Brand}</p>
                    <p><strong>Price:</strong> ${car.Price}</p>
                    <p><strong>Seats:</strong> {car.Seats}</p>
                    <p><strong>Fuel:</strong> {car.Fuel}</p>
                    <p><strong>Type:</strong> {car.CarType}</p>
                    <p><strong>Gear:</strong> {car.Gear}</p>
                    <p><strong>Description:</strong> {car.CarDescription}</p>
                    <p>
                        <strong>Features:</strong> {car.features ? car.features.join(', ') : 'No features available'}
                    </p>
                    <button className="update-btn" onClick={handleUpdateClick}>Go to Update</button>
                </div>
            </div>
        </div>
    );
};

export default CarDetailsModal;