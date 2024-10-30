import React, { useState } from 'react';
import '../../styles/component/RentalHistoryCard.css';
import { useNavigate } from 'react-router-dom';

function CarHistoryCard({ rental }) {
    const { vehicle, carowner, bookDate, timePeriod, price, carownerID } = rental;
    const navigate = useNavigate();
    // Initialize the state to "Waiting to confirm" or whatever the rental status is
    const [status] = useState(rental.status);
    const handleRentalPartner = () => {
        navigate(`/profile-partner`, { state: { profileID: rental.carownerID } });
      };

    return (
        <div className={`rental-history-card `}>

            <div className="rental-history-info">
                <h2>{vehicle}</h2>
                <div className="rental-history-customer">
                    <span>Car Owner: {carowner}</span>
                    <div className="rental-history-actions">
                        <button className="view-customer-btn" onClick={handleRentalPartner}>View Rental Partner</button>
                    </div>
                </div>
                <div className="rental-history-details">
                    <span>Book Date: {bookDate}</span>
                    <span>Time Period: {timePeriod}</span>
                    <span>Price: {price}</span>
                    <span className={`status2 ${status.toLowerCase().replace(' ', '-')}`}>
                        Status: {status}
                    </span>
                </div>

            </div>
        </div>
    );
}

export default CarHistoryCard;
