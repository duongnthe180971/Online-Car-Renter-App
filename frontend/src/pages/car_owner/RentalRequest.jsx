import React from 'react';
import RentalCard from '../../modules/components/RentalCard';
import ChooseBar from '../../modules/components/ChooseBar';
import '../../styles/cars_owner/RentalRequest.css';
const rentalRequests = [
    {
        id: 1,
        car: 'Lamborghini Revuelto',
        customer: 'Name123',
        status: 'Waiting to confirm',
        bookDate: '19/10/2024',
        timePeriod: '21/10/2024 To 25/10/2024',
        price: '1,660,000 vnd',
        isWaiting: true
    },
    {
        id: 2,
        car: 'Bugatti Centodieci',
        customer: 'Name123',
        status: 'Renting',
        bookDate: '19/10/2024',
        timePeriod: '21/10/2024 To 25/10/2024',
        price: '1,660,000 vnd',
        isWaiting: false
    }
];

function App() {
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
                        {rentalRequests.map((request) => (
                            <RentalCard key={request.id} request={request} />
                        ))}
                    </div>
                </div>

            </div>


        </div>

    );
}

export default App;
