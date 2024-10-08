import React, { useState } from 'react';
import '../../styles/component/RentalHistoryCard.css';

function RentalHistoryCard({ rental }) {
    const { vehicle, customer, bookDate, timePeriod, price } = rental;

    // Initialize the state to "Waiting to confirm" or whatever the rental status is
    const [status, setStatus] = useState(rental.status);


    return (
        <div className={`rental-history-card `}>

            <div className="rental-history-info">
                <h2>{vehicle}</h2>
                <div className="rental-history-customer">
                    <span>Customer: {customer}</span>
                    <div className="rental-history-actions">
                        <button className="view-customer-btn">View Rental Order</button>
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

export default RentalHistoryCard;
