import React, { useState, useEffect } from 'react';
import '../../styles/component/RentalCard.css';

function RentalCard({ request }) {
  const { car, customer, bookDate, timePeriod, price } = request;
  
  // Initialize the state to "Waiting to confirm"
  const [status, setStatus] = useState('Waiting to confirm');

  // Handle approving the rental
  const handleApprove = () => {
    setStatus('Renting'); // Change the status to "Renting" when the "Approve" button is clicked
  };

  return (
    <div className={`rental-card ${status === 'Waiting to confirm' ? 'available' : 'unavailable'}`}>
      
      <div className="rental-info">
        <h2>{car}</h2>
        <div className="rental-customer">
          <span>Customer: {customer}</span>
          <span className={`status1 ${status.toLowerCase().replace(' ', '-')}`}>
            Status: {status}
          </span>
        </div>
        <div className="rental-details">
          <span>Book Date: {bookDate}</span>
          <span>Time Period: {timePeriod}</span>
          <span>Price: {price}</span>
        </div>
        <div className="rental-actions">
          <button className="view-customer-btn">View Rental Order</button>
          {/* Approve button triggers the status change to "Renting" */}
          {status === 'Waiting to confirm' && (
            <>
              <button className="approve-btn" onClick={handleApprove}>Approve</button>
              <button className="reject-btn">Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RentalCard;
