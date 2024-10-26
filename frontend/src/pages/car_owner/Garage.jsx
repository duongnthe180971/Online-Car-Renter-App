import React, { useState, useEffect } from "react";
import axios from 'axios';
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
import "../../styles/cars_owner/Garage.css";
import CarCard from "../../modules/components/CarCard";
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationCard from '../../modules/components/DeleteConfirmCard';

const Garage = ({ garageID }) => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [carToDelete, setCarToDelete] = useState(null);
    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/car");
                const filteredCars = response.data.filter(car => car.GarageID === garageID);
                if (garageID === 0) {
                    setCars(response.data)
                } else {
                    setCars(filteredCars);
                }
            } catch (error) {
                setError("Server error"); // Set error state if request fails
            } finally {
                setLoading(false); // Stop loading after fetching or error
            }
        };

        fetchCarData();
    }, [garageID]);

    const handleAddCarClick = () => {
        navigate(`/car-registration/${garageID}`);
    };



    const handleStatusChange = (carId, newStatus) => {
        const updatedCars = cars.map((car) =>
            car.CarID === carId ? { ...car, CarStatus: newStatus } : car
        );
        setCars(updatedCars);
    };

    const handleDeleteClick = (carId) => {
        setCarToDelete(carId);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/car/${carToDelete}`);
            setCars(cars.filter((car) => car.CarID !== carToDelete));
            setCarToDelete(null);
        } catch (error) {
            setError('Failed to delete the car.');
        }
    };

    const handleCancelDelete = () => {
        setCarToDelete(null); // Just close the modal
    };
    return (
        <div className="AllPage">
            <div className="LeftSide">
                <div className="Bar">
                    <ChooseBar />
                </div>

            </div>
            <div className="RightSide">
                <div className="garage">
                    <div className="header">
                        <h1>Garage</h1>
                        <button className="add-car-btn" onClick={handleAddCarClick}>Add New Car</button>
                    </div>{loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p> // Display the error here
                    ) : (
                        <div className="garageCarList">
                            {cars.map((car, index) => (
                                <CarCard key={car.id || index} 
                                         car={car} 
                                         onStatusChange={handleStatusChange}
                                         onDeleteClick={handleDeleteClick}
                                         />
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* Show Delete Confirmation Card if a car is selected for deletion */}
            {carToDelete && (
                <DeleteConfirmationCard
                    onConfirmDelete={handleConfirmDelete}
                    onCancelDelete={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default Garage;