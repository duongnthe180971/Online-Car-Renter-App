import React from 'react';
import RentalCard from '../../modules/components/RentalCard';
import ChooseBar from '../../modules/components/ChooseBar';
import '../../styles/cars_owner/RentalRequest.css';
import carData from "../../assets/data/carData"
import rentalData from '../../assets/data/rentalData';
import {formatPrice} from "../../assets/format/numberFormat"


const getStatusLabel = (status) => {
    switch (status) {
        case 1:
            return 'Waiting to confirm';
        case 2:
            return 'Confirmed';
        case 3:
            return 'In progress';
        case 4:
            return 'Completed';
        case 5:
            return 'Canceled';
        default:
            return 'Unknown';
    }
};

const rentalRequests = ({ garageID }) => {
    const filteredRentalRequests = rentalData
        .map((rental) => {
            // Find the corresponding car from carData using carID
            const car = carData.find((car) => car.id === rental.carID);
            if (car) {
                return { 
                    ...rental, 
                    carName: car.carName, 
                    price: car.price, 
                    GarageID: car.GarageID // Add GarageID from car data
                };
            }
            return null; // Return null if no matching car is found (though this shouldn't happen)
        })
        .filter((rental) => rental && rental.GarageID === garageID); // Step 2: Filter by GarageID
    // {
    //     id: 1,
    //     car: 'Lamborghini Revuelto',
    //     customer: 'Name123',
    //     status: 'Waiting to confirm',
    //     bookDate: '19/10/2024',
    //     timePeriod: '21/10/2024 To 25/10/2024',
    //     price: '1,660,000 vnd',
    //     isWaiting: true
    // },
    // {
    //     id: 2,
    //     car: 'Bugatti Centodieci',
    //     customer: 'Name123',
    //     status: 'Renting',
    //     bookDate: '19/10/2024',
    //     timePeriod: '21/10/2024 To 25/10/2024',
    //     price: '1,660,000 vnd',
    //     isWaiting: false
    // }
    return (
        <div class="AllPage">
            <div class="LeftSide">
                <div class="Bar">
                    <ChooseBar />
                </div>
            </div>
            <div class="RightSide">
                <div class="garage rentalReq">
                    <h1>Rental Requests</h1>
                    <div className="rental-requests">
                        {/* {rentalRequests.map((request) => (
                            <RentalCard key={request.id} request={request} />
                        ))} */}
                        {filteredRentalRequests.map((request) => (
                            <RentalCard
                                key={request.id}
                                request={{
                                    car: request.carName,
                                    customer: request.Customer,
                                    status: getStatusLabel(request.status), // Helper function to convert status to text
                                    bookDate: request.bookDate,
                                    timePeriod: `${request.startDate} To ${request.returnDate}`,
                                    price: `${formatPrice(request.price)} VND`,
                                    isWaiting: request.status === 1, // Example: Set waiting if status is '1'
                                }}
                            />
                        ))}
                    </div>
                </div>

            </div>


        </div>

    );
}

export default rentalRequests;
