import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { getNumOfDay, formatPrice } from "../../assets/format/numberFormat";
import "../../styles/customer/CarDetail.css";
import "react-datepicker/dist/react-datepicker.css";

const CarDetailCard = ({ car, userAddress }) => {
  const navigate = useNavigate();
  const {
    CarID,
    GarageID,
    CarImage,
    CarName,
    Rate,
    Seats,
    CarType,
    Gear,
    Fuel,
    CarDescription,
  } = car;
  const [address, setAddress] = useState("");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const resGarage = await axios.get("http://localhost:5000/api/garage");
        const garage = resGarage.data.find(
          (item) => item.GarageID === GarageID
        );
        const accID = garage.CarOwnerID;
        const resAccount = await axios.get("http://localhost:5000/api/account");
        const account = resAccount.data.find((item) => item.id === accID);
        setAddress(account.Address);
      } catch (err) {
        console.error("Error fetching address:", err);
      }
    };

    const fetchFeatureData = async () => {
      try {
        const resFeatures = await axios.get(
          `http://localhost:5000/api/features/${CarID}`
        );
        const features_ = resFeatures.data.map((f) => f.Name);
        setFeatures(features_);
      } catch (err) {
        console.error("Error fetching features:", err);
      }
    };

    if (CarID && GarageID) {
      fetchAddressData();
      fetchFeatureData();
    }
  }, [CarID, GarageID]);

  const featureList = Array.isArray(features) ? features : [];

  const handleViewMap = async () => {
    navigate("/customer-map", {
      state: { fromName: userAddress, toName: address },
    });
  };
  return (
    <div className="car-detail-card-container">
      <img src={CarImage} alt="Car" className="car-image" />
      <div className="car-info">
        <h3>{CarName}</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={star <= Rate ? "filled" : "empty"}>
              {star <= Rate ? "★" : "☆"}
            </span>
          ))}
        </div>
        <h5>Characteristics</h5>
        <div className="characteristics">
          <p>🪑Seats: {Seats}</p>
          <p>🚘Type: {CarType}</p>
          <p>⚙️Gear: {Gear}</p>
          <p>⛽Fuel: {Fuel}</p>
        </div>
        <h5>Features</h5>
        <div className="features">
          {featureList.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div className="address">
          <div className="address-detail">
            {" "}
            <h5>Address:</h5> <p>{address}</p>{" "}
          </div>
          <button className="view-map-button" onClick={handleViewMap}>
            {" "}
            View Map{" "}
          </button>
        </div>
        <div className="description">
          <h5>Description:</h5> <p>{CarDescription}</p>
        </div>
      </div>
    </div>
  );
};

const RentalCard = ({ car, accID }) => {
  const navigate = useNavigate();
  const { Price, CarID } = car;
  const insurance = 60000;

  const [formData, setFormData] = useState({
    startDate: new Date(),
    returnDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  const [errors, setErrors] = useState("");

  const totalRentingPrice =
    Price * getNumOfDay(formData.startDate, formData.returnDate);

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));

    if (name === "startDate") {
      validateDates(date, formData.returnDate);
    } else {
      validateDates(formData.startDate, date);
    }
  };

  const validateDates = (startDate, returnDate) => {
    const today = new Date();
    let errorMessage = "";

    if (startDate < today.setHours(0, 0, 0, 0)) {
      errorMessage = "The start date cannot be earlier than today.";
    } else if (getNumOfDay(startDate, returnDate) <= 0) {
      errorMessage =
        "The return date must be at least 1 day after the start date.";
    }

    setErrors(errorMessage);
  };

  const addNewRental = async () => {
    if (errors) {
      return;
    }

    const newRental = {
      CarID: CarID,
      CustomerID: accID,
      RentalStart: formData.startDate,
      RentalEnd: formData.returnDate,
      RentalStatus: 1,
    };

    try {
      await axios.post("http://localhost:5000/api/rental", newRental);
      navigate("/payment", {
        state: { totalPay: totalRentingPrice + insurance },
      });
    } catch (error) {
      console.error("Error adding rental:", error);
    }
  };

  return (
    <div className="rental-card-container">
      <h1>{formatPrice(Price)} VND / day</h1>
      <h3>Choose rental period</h3>
      <div className="rental-period">
        <div className="rental-date">
          <h5>Pick Up</h5>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleDateChange("startDate", date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="rental-date">
          <h5>Return</h5>
          <DatePicker
            selected={formData.returnDate}
            onChange={(date) => handleDateChange("returnDate", date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      <div className="price-details">
        <div className="item">
          <h7>Total Renting Price:</h7>
          <h7>{errors ? 0 : formatPrice(totalRentingPrice)} VND</h7>
        </div>
        <div className="item">
          <h7>Insurance:</h7>
          <h7>{formatPrice(insurance)} VND</h7>
        </div>
        <div className="item">
          <h5>Total:</h5>
          <h5>{errors ? 0 : formatPrice(totalRentingPrice + insurance)} VND</h5>
        </div>
      </div>
      <div className="button-container">
        <button className="book-button" onClick={addNewRental}>
          Book
        </button>
      </div>
      {errors && <p className="error-message">{errors}</p>}
    </div>
  );
};

const CarDetail = () => {
  const location = useLocation();
  const { carID } = location.state || { carID: 1 };
  const [car, setCar] = useState(null);
  const [accID, setAccID] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const fetchUserAddress = async (id) => {
      try {
        const response = await axios.get("http://localhost:5000/api/account");
        const address_ = response.data.find((item) => item.id === id).Address;
        setUserAddress(address_);
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setAccID(storedUser.id);
      fetchUserAddress(storedUser.id);
    }

    const fetchCarData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/car");
        const car_ = response.data.find((item) => item.CarID === carID);
        setCar(car_);
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };

    fetchCarData();
  }, [carID]);

  if (!car) return <div>Car not found.</div>;

  return (
    <div className="car-detail-container">
      <CarDetailCard car={car} userAddress={userAddress} />
      <RentalCard car={car} accID={accID} />
    </div>
  );
};

export default CarDetail;
