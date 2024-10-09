import React, { useState , useEffect} from 'react';
import ChooseBar from '../../modules/components/ChooseBar';
import '../../styles/cars_owner/Garage.css'
import CarCard from '../../modules/components/CarCard';
import carData from "../../assets/data/carData"

const Garage = ({ garageID }) => {
    // const [cars, setCars] = useState([
    //     {
    //         id: 1,
    //         name: 'Lamborghini Revuelto',
    //         status: 'Idle',
    //         type: 'Mid-engine sports car',
    //         seats: 2,
    //         gear: 'Auto',
    //         fuel: 'Gasoline',
    //         rating: 5,
    //         imageUrl: 'https://www.mclarenlife.com/attachments/2024-lamborghini-aventador-successor-rendering-v1-jpg.228772/',
    //     },
    //     {
    //         id: 2,
    //         name: 'Bugatti Centodieci',
    //         status: 'Renting',
    //         type: 'Mid-engine sports car',
    //         seats: 2,
    //         gear: 'Auto',
    //         fuel: 'Gasoline',
    //         rating: 5,
    //         imageUrl: 'https://cdn.motor1.com/images/mgl/zxp3Jb/s3/bugatti-centodieci-2022-zehntes-und-letztes-exemplar.jpg',
    //     },
    //     {
    //         id: 3,
    //         name: 'Toyota Land Cruiser V8',
    //         status: 'Closed',
    //         type: 'SUV',
    //         seats: 4,
    //         gear: 'Auto',
    //         fuel: 'Gasoline',
    //         rating: 4.5,
    //         imageUrl: 'https://example.com/car1.jpg',
    //     },
    // ]);
    useEffect(() => {
        // Filter cars based on the garageID passed from the account
        const filteredCars = carData.filter(car => car.GarageID === garageID);
        setCars(filteredCars);
    }, [garageID]); // Re-run the effect if the garageID changes

    const [cars, setCars] = useState(carData);

    const handleStatusChange = (carId, newStatus) => {
        const updatedCars = cars.map((car) =>
            car.id === carId ? { ...car, status: newStatus } : car
        );
        setCars(updatedCars);
    };
    return (
        <div class="AllPage">
            <div class="LeftSide">
                <div class="Bar">
                    <ChooseBar />
                </div>

            </div>
            <div class="RightSide">
                <div class="garage">
                    <div className="header">
                        <h1>Garage</h1>
                        <button className="add-car-btn">Add New Car</button>
                    </div>
                    <div className="garageCarList">
                        {cars.map((car) => (
                            <CarCard key={car.id} car={car} onStatusChange={handleStatusChange} />
                        ))}
                    </div>
                </div>

            </div>


        </div>
    )
};

export default Garage;