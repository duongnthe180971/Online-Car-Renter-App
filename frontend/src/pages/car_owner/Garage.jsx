
import React, { useState, useEffect } from "react";
import axios from 'axios';
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
import "../../styles/cars_owner/Garage.css";
import CarCard from "../../modules/components/CarCard";
import CarDetailsModal from "../../modules/components/CarDetailsModal";
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationCard from '../../modules/components/DeleteConfirmCard';

const Garage = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [carToDelete, setCarToDelete] = useState(null);
    const [Accid, setAccID] = useState(0);
    const [garageID, setGarageID] = useState(-1);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.id) {
            setAccID(storedUser.id);
        }

                if (storedUser.role !== 2) {
            setError("No permission for current feauture");
        }

        const fetchGarageData = async () => {
            try {
                if (Accid) {
                    const responseGarage = await axios.get(`http://localhost:5000/api/garage/${Accid}`);
                    if (responseGarage.data.length > 0) {
                        setGarageID(responseGarage.data[0].GarageID);
                    } else {
                        console.log("No garage found for this CarOwnerID");
                    }
                }
            } catch (error) {
                setError("Server error");
            } finally {
                setLoading(false);
            }
        };
    
        fetchGarageData();
    }, [Accid]);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/car");
                const filteredCars = response.data.filter(car => car.GarageID === garageID && car.CarStatus !== 'Deleted' );
                if (garageID === 0) {
                    setCars(response.data)
                } else {
                    setCars(filteredCars);
                }
            } catch (error) {
                setError("Server error");
            } finally {
                setLoading(false);
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
            await axios.put(`http://localhost:5000/api/car/${carToDelete}/delete`);
            setCars(cars.filter((car) => car.CarID !== carToDelete));
            setCarToDelete(null);
        } catch (error) {
            setError('Failed to delete the car.');
        }
    };

    const handleCancelDelete = () => {
        setCarToDelete(null);
    };

    const handleViewCar = async (car) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/features/${car.CarID}`);
            const features = response.data.map(feature => feature.Name);
            setSelectedCar({ ...car, features });
        } catch (error) {
            setError("Failed to load car features.");
        }
    };

    const handleCloseModal = () => {
        setSelectedCar(null);
    };

    return (
        <div className="AllPage">
            <div className="LeftSide">
                <div className="Bar">
                    <ChooseBar />
                </div>
            </div>
            <div className="RightSide">
            {error ? (
                <p className="Error">{error}</p>
                ) : (

                <div className="garage">
                    <div className="header">
                        <h1>Garage</h1>
                        <button className="add-car-btn" onClick={handleAddCarClick}>Add New Car</button>
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="garageCarList">
                            {cars.map((car, index) => (
                                <CarCard
                                    key={car.CarID || index}
                                    car={car}
                                    onStatusChange={handleStatusChange}
                                    onDeleteClick={handleDeleteClick}
                                    onViewClick={() => handleViewCar(car)} 
                                />
                            ))}
                        </div>
                    )}
                </div>
                )}
            </div>

            {carToDelete && (
                <DeleteConfirmationCard
                    onConfirmDelete={handleConfirmDelete}
                    onCancelDelete={handleCancelDelete}
                />
            )}

            {selectedCar && (
                <CarDetailsModal car={selectedCar} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default Garage;
