import React from "react";
import "../../styles/admin/CarRegistration.css";

const CarRegistrationCard = ({ car }) => {
  return (
    <div className="car-registration-card">
      <img src={car.imgUrl} alt={car.carName} className="car-image" />
      <div className="car-info">
        <h3>Name: {car.carName}</h3>
        <p>Registration Request Date: {car.requestDate}</p>
      </div>
      <div className="car-actions">
        <button className="view-info-btn">View Info</button>
        <button className="approve-btn">Approve</button>
        <button className="decline-btn">Decline</button>
      </div>
    </div>
  );
};

export default CarRegistrationCard;
