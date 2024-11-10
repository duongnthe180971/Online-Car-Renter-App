import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChooseBarCustomer from "../../modules/components/ChooseBarCustomer";
import { formatPrice, formatDate_vn } from "../../assets/format/numberFormat";
import "../../styles/customer/CarStatus.css";

const CarOrderDetails = ({
  car,
  rental,
  handleUpdateStatus,
  handleFeedback,
}) => {
  const { CarImage, CarName, Rate, Price } = car;
  const { RentalStart, RentalEnd, RentalStatus } = rental;
  return (
    <div className="car-order-container">
      <div className="title">My Renting Car:</div>
      <div className="car-order-content">
        <div className="car-image-section">
          <img className="car-image" src={CarImage} alt={CarName} />
        </div>
        <div className="car-details-section">
          <h1>{CarName}</h1>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= Rate ? "filled" : "empty"}>
                {star <= Rate ? "★" : "☆"}
              </span>
            ))}
          </div>
          <div className="car-info">
            <div className="item">
              <h5>Start Date:</h5> <h5>{formatDate_vn(RentalStart)}</h5>
            </div>
            <div className="item">
              <h5>Return Date:</h5> <h5>{formatDate_vn(RentalEnd)}</h5>
            </div>
            <div className="item">
              <h5>Price / Day:</h5> <h5>{formatPrice(Price)} VND</h5>
            </div>
          </div>
        </div>
      </div>
      <ProgressBar status={RentalStatus} />
      <div className="cancel-section">
        {RentalStatus === 1 ? (
          <button className="cancel-btn" onClick={() => handleUpdateStatus(0)}>
            Cancel Order
          </button>
        ) : RentalStatus === 2 ? (
          <button className="in-rent-btn" onClick={() => handleUpdateStatus(3)}>
            In Rent
          </button>
        ) : RentalStatus === 3 ? (
          <button className="return-btn" onClick={() => handleUpdateStatus(4)}>
            Return Car
          </button>
        ) : (
          <div />
        )}
        {(RentalStatus === 3 || RentalStatus === 4) && (
          <button className="in-rent-btn" onClick={handleFeedback}>
            Give Feedback
          </button>
        )}
      </div>
    </div>
  );
};

const ProgressBar = ({ status }) => {
  return (
    <div className="progress-bar">
      <div className="progress-item">
        <h5>Booked</h5>
        <div
          className={status >= 1 ? "progress-step isBook" : "progress-step"}
        />
      </div>
      <div className="progress-item">
        <h5>Confirmed</h5>
        <div
          className={status >= 2 ? "progress-step isConfirm" : "progress-step"}
        />
      </div>
      <div className="progress-item">
        <h5>Renting</h5>
        <div
          className={status >= 3 ? "progress-step isRent" : "progress-step"}
        />
      </div>
      <div className="progress-item">
        <h5>Waiting Return</h5>
        <div
          className={status >= 4 ? "progress-step isWaiting" : "progress-step"}
        />
      </div>
      <div className="progress-item">
        <h5>Completed</h5>
        <div
          className={status >= 5 ? "progress-step isComplete" : "progress-step"}
        />
      </div>
    </div>
  );
};

const CarStatus = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [rental, setRental] = useState(null);
  const [error, setError] = useState("");
  const [accID, setAccID] = useState(0);
  const [carOwnerID, setCarOwnerID] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setAccID(storedUser.id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!accID) return;

      try {
        const rentalResponse = await axios.get(
          "http://localhost:5000/api/rental"
        );
        const filteredRentals = rentalResponse.data.filter(
          (item) => item.CustomerID === accID
        );
        const sortedRentals = filteredRentals.sort(
          (a, b) => b.RentalID - a.RentalID
        );
        const rental_ = sortedRentals.length > 0 ? sortedRentals[0] : null;

        
        if (rental_) {
          setRental(rental_);
          const carResponse = await axios.get("http://localhost:5000/api/car");
          const car_ = carResponse.data.find(
            (item) => item.CarID === rental_.CarID
          );
          setCar(car_);
          const resGarage = await axios.get("http://localhost:5000/api/garage");
          const garage = resGarage.data.find((item) => item.GarageID === car_.GarageID);
          
          if (garage) {
            setCarOwnerID(garage.CarOwnerID);
          } else {
            console.error("Garage not found for CarID:", car_.CarID);
          }
        } else {
          setError("You have not rented any car yet");
        }
      } catch (err) {
        setError("Error loading car or rental data");
      }
    };

    fetchData();
  }, [accID]);
  const handleFeedback = async () => {
    console.log("Feedback button clicked");

    try {
      console.log("User ID:", accID);

      const response = await axios.get(
        `http://localhost:5000/api/feedback/${car.CarID}`
      );
      console.log("Feedback response data:", response.data);

      const existingFeedback = response.data.find(
        (f) => f.CustomerID === accID
      );
      if (existingFeedback) {
        window.alert("You already provided feedback for this car.");
      } else {
        navigate("/customer-feedback", { state: { carId: car.CarID } });
      }
    } catch (err) {
      console.error("Error checking feedback existence:", err);
      alert("Failed to check feedback status.");
    }
  };
  const sendNotification = async (accID) => {
    try {
      const response = await fetch("http://localhost:5000/api/notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ NotificationID: 8, AccID: accID }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          `Failed to send notification to owner: ${accID}. Error: ${errorData.message}`
        );
  
      if (!response.data.success) {
        console.error("Failed to send notification to car owner.");
      } else {
        console.log("Notification sent to car owner successfully.");
      }
    }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
  const updateStatus = async (newStatus) => {
    if (!rental || !rental.RentalID) {
      alert("Rental data is missing.");
      return;
    }

    const RentalID = rental.RentalID;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/rentals/${RentalID}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        sendNotification(carOwnerID);
        setRental((prevRental) => ({
          ...prevRental,
          RentalStatus: newStatus,
        }));
        alert("Rental status updated successfully!");
      } else {
        alert("Failed to update rental status.");
      }
    } catch (error) {
      console.error("Error updating rental status:", error);
      alert("An error occurred while updating the rental status.");
    }
  };

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <div className="Bar">
          <ChooseBarCustomer />
        </div>
      </div>
      <div className="RightSide">
        {car && rental && rental.RentalStatus !== 0 ? (
          <CarOrderDetails
            car={car}
            rental={rental}
            handleUpdateStatus={updateStatus}
            handleFeedback={handleFeedback}
          />
        ) : (
            <h1 style={{marginTop: '25%'}}>{error ? error : "You have not rented any car yet"}</h1>
        )}
      </div>
    </div>
  );
};

export default CarStatus;
