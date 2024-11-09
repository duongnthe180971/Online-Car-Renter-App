import React, { useState, useEffect } from 'react';
import '../../styles/component/RentalCard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RentalCard({ request }) {
  const { car, carId, customerId, customer, bookDate, timePeriod, price, rentalId } = request;
  const navigate = useNavigate();
  const [status, setStatus] = useState(request.status);
  const [error, setError] = useState(null);

  const handleApprove = async () => {
    setStatus('Completed');
    try {
      const response = await axios.put(`http://localhost:5000/api/rentals/${rentalId}`, {
        status: 5
      });
      const responseCar = await axios.put(`http://localhost:5000/api/cars/${carId}`, {
        newStatus: 'Idle'
      },
      {
        headers: {
            'Content-Type': 'application/json',
        },
      });

      await axios.post(`http://localhost:5000/api/notification` , {
        AccID: customerId,
        NotificationID: 10
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        setError('Failed to update status.');
      }
    } catch (err) {
      console.error('Error updating rental status:', err);
      setError('An error occurred while updating the status.');
    } finally {
    }
  };

  const handleRentalOrder = () => {
    navigate(`/rental-order`, { state: { rentalID: request.rentalId } });
  };

  return (
    <div className={`rental-card ${status === 'Waiting to confirm' ? 'available' : 'unavailable'}`}>
      
      <div className="rental-info">
        <h2>{car}</h2>
        <div className="rental-customer">
          <span>Customer: {customerId}</span>
          <span className={`status1 ${status.toLowerCase().replace(/\s+/g, '-')}`}>
            Status: {status}
          </span>
        </div>
        <div className="rental-details">
          <span>Book Date: {bookDate}</span>
          <span>Time Period: {timePeriod}</span>
          <span>Price per day: {price}</span>
        </div>
        <div className="rental-actions">
          <button className="view-customer-btn" onClick={handleRentalOrder}>View Rental Order</button>
          {status === 'Waiting to confirm' && (
            <>
              <button className="approve-btn" onClick={handleApprove}>Confirm</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RentalCard;
