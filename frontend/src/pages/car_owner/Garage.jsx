import React, { useState, useEffect } from "react";
import axios from 'axios';
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
import "../../styles/cars_owner/Garage.css";
import CarCard from "../../modules/components/CarCard";
import { useNavigate } from 'react-router-dom';

const Garage = ({ garageID }) => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                                <CarCard key={car.id || index} car={car} onStatusChange={handleStatusChange} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Garage;
