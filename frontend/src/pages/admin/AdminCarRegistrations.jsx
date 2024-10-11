import React from "react";
import Sidebar from "../../modules/components/ChooseBarAdmin";
import carData from "../../assets/data/carData";
import "../../styles/admin/AdminCarRegistrations.css";

const AdminCarRegistrations = () => {
  return (
    <div className="AllPage">
      <div className="LeftSide">
        <Sidebar />
      </div>
      <div className="RightSide">
        <div className="adm-car-registration-container">
          <h1 className="page-title">Car Registrations</h1>
          <div className="car-registration-list">
            {carData.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.imgUrl} alt={car.carName} className="car-image" />
      <div className="car-info">
        <h2>Name: {car.carName}</h2>
        <p>Registration Request Date: {car.requestDate || "19/10/2024"}</p>
      </div>
      <div className="car-actions">
        <button className="view-info-btn">View Info</button>
        <button className="approve-btn">Approve</button>
        <button className="decline-btn">Decline</button>
      </div>
    </div>
  );
};
export default AdminCarRegistrations;
