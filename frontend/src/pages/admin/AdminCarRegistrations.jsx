import React, { useState, useEffect } from "react";
import Sidebar from "../../modules/components/ChooseBarAdmin";
import "../../styles/admin/AdminCarRegistrations.css";

// AdminCarRegistrations Component
const AdminCarRegistrations = () => {
  const [cars, setCars] = useState([]); // State to hold car data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [selectedCar, setSelectedCar] = useState(null); // State for the selected car object
  const adminId = 1; // Placeholder: Use actual admin ID from your authentication logic

  // Fetch car data from the backend API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/car"); // Adjust the API URL
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        setCars(data); // Store car data in state
        setLoading(false); // Turn off loading spinner
      } catch (err) {
        setError(err.message); // Handle error
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Function to handle car approval
  const handleApprove = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cars/${carId}/approve`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminId }), // Replace 1 with actual adminId if dynamic
        }
      );

      if (response.ok) {
        setCars(cars.filter((car) => car.CarID !== carId)); // Remove the car from state
        alert("Car approved successfully!");
      } else {
        throw new Error("Failed to approve car");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Function to handle car decline
  const handleDecline = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cars/${carId}/decline`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminId }), // Replace 1 with actual adminId if dynamic
        }
      );

      if (response.ok) {
        setCars(cars.filter((car) => car.CarID !== carId)); // Remove the car from state
        alert("Car declined successfully!");
      } else {
        throw new Error("Failed to decline car");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Function to handle viewing car details
  const handleViewInfo = (car) => {
    setSelectedCar(car); // Set the selected car object in state
  };

  // Function to close the detailed view
  const handleCloseInfo = () => {
    setSelectedCar(null); // Close the detailed view
  };

  // Display a loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error if there's a problem fetching the data
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <Sidebar /> {/* Sidebar component */}
      </div>
      <div className="RightSide">
        <div className="adm-car-registration-container">
          <h1 className="page-title">Car Registrations</h1>

          <div className="car-registration-list">
            {cars.map((car) => (
              <CarCard
                key={car.CarID}
                car={car}
                onApprove={() => handleApprove(car.CarID)}
                onDecline={() => handleDecline(car.CarID)}
                onViewInfo={() => handleViewInfo(car)}
              />
            ))}
          </div>

          {selectedCar && (
            <div className="car-details-modal">
              <div className="car-details-content">
                <button className="close-modal-btn" onClick={handleCloseInfo}>
                  Close
                </button>
                <div className="car-details-left">
                  <img src={selectedCar.CarImage} alt={selectedCar.CarName} />
                </div>
                <div className="car-details-right">
                  <h2>{selectedCar.CarName}</h2>
                  <p>
                    <strong>Brand:</strong> {selectedCar.Brand}
                  </p>
                  <p>
                    <strong>Price:</strong> ${selectedCar.Price}
                  </p>
                  <p>
                    <strong>Seats:</strong> {selectedCar.Seats}
                  </p>
                  <p>
                    <strong>Fuel:</strong> {selectedCar.Fuel}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedCar.CarDescription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CarCard Component
const CarCard = ({ car, onApprove, onDecline, onViewInfo }) => {
  return (
    <div className="car-card">
      <img src={car.CarImage} alt={car.CarName} className="car-image" />
      <div className="car-info">
        <h2>{car.CarName}</h2>
        <div className="car-actions">
          <button className="view-info-btn" onClick={onViewInfo}>
            View Info
          </button>
          <button className="approve-btn" onClick={onApprove}>
            Approve
          </button>
          <button className="decline-btn" onClick={onDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCarRegistrations;
