// src/RentalHistory.js
import React from 'react';
import '../../styles/cars_owner/RentalHistory.css';  // Import the main styles
import RentalHistoryCard from '../../modules/components/RentalHistoryCard';  // Import the RentalCard component
import ChooseBar from '../../modules/components/ChooseBar';

const RentalHistory = () => {
  const rentalData = [
    {
      vehicle: 'Toyota land cruiser V8',
      customer: 'Name123',
      bookDate: '19/10/2024',
      timePeriod: '21/10/2024 To 25/10/2024',
      price: '1,660,000 vnd',
      status: 'Success'
    },
    {
      vehicle: 'Toyota land cruiser V8',
      customer: 'Name123',
      bookDate: '19/10/2024',
      timePeriod: '21/10/2024 To 25/10/2024',
      price: '1,660,000 vnd',
      status: 'Canceled'
    }
  ];

  return (
    <div class="AllPage">
        <div class="LeftSide">
            <div class="Bar">
                <ChooseBar />
            </div>

        </div>
        <div class="RightSide">
            <div class="garage rentalReq">
                <h1>Rental History</h1>
                <div className="rental-requests">
                    {rentalData.map((rental, index) => (
                        <RentalHistoryCard key={index} rental={rental} />
                    ))}
                </div>
            </div>

        </div>


    </div>

);
};

export default RentalHistory;
