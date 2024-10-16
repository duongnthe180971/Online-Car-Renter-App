import React, { useState, useEffect } from 'react';
import '../../styles/component/RentalCard.css';
import axios from 'axios';

function RentalCard({ request }) {
  const { car, customer, bookDate, timePeriod, price, rentalId } = request;
  
  // Initialize the state to "Waiting to confirm"
  const [status, setStatus] = useState(request.status);
  //const [loading, setLoading] = useState(false); // To manage the loading state
  const [error, setError] = useState(null);
  // Handle approving the rental
  const handleApprove = async () => {
    setStatus('Renting'); // Change the status to "Renting" when the "Approve" button is clicked
    try {
      // Make the API request to update the rental status
      const response = await axios.put(`http://localhost:5000/api/rentals/${rentalId}`, {
        status: 2 // Update the status to "Renting"
      });

      if (response.status === 200) {
        setStatus('Renting'); // Change the status to "Renting" after a successful API call
      } else {
        setError('Failed to update status.'); // Set error if the response isn't successful
      }
    } catch (err) {
      console.error('Error updating rental status:', err);
      setError('An error occurred while updating the status.');
    } finally {
      //setLoading(false); // Turn off the loading spinner
    }
  };

  return (
    <div className={`rental-card ${status === 'Waiting to confirm' ? 'available' : 'unavailable'}`}>
      
      <div className="rental-info">
        <h2>{car}</h2>
        <div className="rental-customer">
          <span>Customer: {customer}</span>
          <span className={`status1 ${status.toLowerCase().replace(/\s+/g, '-')}`}>
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
