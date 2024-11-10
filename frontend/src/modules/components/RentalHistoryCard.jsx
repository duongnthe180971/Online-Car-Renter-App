import React, { useState } from 'react';
import '../../styles/component/RentalHistoryCard.css';
import { useNavigate } from 'react-router-dom';

function RentalHistoryCard({ rental }) {
    const { vehicle, customer, bookDate, timePeriod, price, customerID } = rental;
    const navigate = useNavigate();
    // Initialize the state to "Waiting to confirm" or whatever the rental status is
    const [status] = useState(rental.status);
    const handleRentalPartner = () => {
        navigate(`/profile-partner`, { state: { profileID: rental.customerID } });
      };

    return (
        <div className={`rental-history-card `}>

            <div className="rental-history-info">
                <h2>{vehicle}</h2>
                <div className="rental-history-customer">
                    <span>Customer: {customer}</span>
                    <div className="rental-history-actions">
                        <button className="view-customer-btn" onClick={handleRentalPartner}>View Rental Partner</button>
                    </div>
                </div>
                <div className="rental-history-details">
                    <span>Book Date: {bookDate}</span>
                    <span>Time Period: {timePeriod}</span>
                    <span>Price per day: {price}</span>
                    <span className={`status2 ${status.toLowerCase().replace(' ', '-')}`}>
                        Status: {status}
                    </span>
                </div>

            </div>
        </div>
    );
}

export default RentalHistoryCard;
