import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import HomeHeader from "../../modules/components/HomeHeader";
import { getNumOfDay, formatPrice } from "../../assets/format/numberFormat";
import "../../styles/customer/CarDetail.css";
import "react-datepicker/dist/react-datepicker.css";

const CarDetailCard = ({ car, userAddress, carOwnerID }) => {
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
        const accID = carOwnerID;
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
  }, [CarID, GarageID, carOwnerID]);

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

const RentalCard = ({ car, accID, carOwnerID }) => {
  const navigate = useNavigate();
  const { Price, CarID } = car;
  const insurance = 60000;
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const [formData, setFormData] = useState({
    startDate: new Date(),
    returnDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  const [errors, setErrors] = useState("");

  const totalRentingPrice =
    Price * getNumOfDay(formData.startDate, formData.returnDate);
  const discountAmount = selectedVoucher ? selectedVoucher.DiscountAmount : 0;
  const finalPrice = totalRentingPrice + insurance - (totalRentingPrice * (discountAmount / 100));

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/voucher/`);
        const claimedVouchers = res.data.filter((item) => item.ClaimedBy = accID);
        setVouchers(claimedVouchers);
      } catch (err) {
        console.error("Error fetching vouchers:", err);
      }
    };

    if (accID) {
      fetchVouchers();
    }
  }, [accID]);


  const deleteVoucher = async (voucherId) => {
    try {
      await axios.delete(`http://localhost:5000/api/voucher/${voucherId}`);
      setVouchers(
        vouchers.filter((voucher) => voucher.VoucherID !== voucherId)
      );
      alert("Your voucher has been use!");
    } catch (error) {
      console.error("Error using voucher:", error);
    }
  };
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
  const sendNotification = async (accID) => {
    try {
      const response = await fetch("http://localhost:5000/api/notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ NotificationID: 9, AccID: accID }),
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
  const addNewRental = async () => {
    if (errors) {
      alert(errors);
      return;
    }
  
    try {
      // Check for existing rentals with statuses from 1 to 4
      const res = await axios.get(`http://localhost:5000/api/rental`);
      const existingRental = res.data.some(
        (rental) =>
          rental.CustomerID === accID &&
          rental.RentalStatus >= 1 &&
          rental.RentalStatus <= 4
      );
  
      if (existingRental) {
        alert(
          "You already have an ongoing or pending rental. Please complete or cancel it before booking a new car."
        );
        return;
      }
  
      // Proceed with the booking if no conflicting rentals are found
      const newRental = {
        CarID: CarID,
        CustomerID: accID,
        RentalStart: formData.startDate,
        RentalEnd: formData.returnDate,
        RentalStatus: 1,
      };
  
      await axios.put(
        `http://localhost:5000/api/cars/${car.CarID}`,
        {
          newStatus: "Renting",
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      await axios.post("http://localhost:5000/api/rental", newRental);
  
      if (selectedVoucher) deleteVoucher(selectedVoucher.VoucherID);
      sendNotification(carOwnerID);
  
      navigate("/payment", {
        state: { totalPay: finalPrice, carId: CarID },
      });
    } catch (error) {
      console.error("Error adding rental:", error);
      alert("An error occurred while booking the car. Please try again.");
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
      <div className="voucher-section">
        <h3>Choose Voucher</h3>
        <select
          value={selectedVoucher ? selectedVoucher.VoucherID : ""}
          onChange={(e) =>
            setSelectedVoucher(
              vouchers.find((v) => v.VoucherID === parseInt(e.target.value))
            )
          }
        >
          <option value="" hidden>Select a Voucher</option>
          <option value="" >None</option>
          {vouchers.map((voucher) => (
            <option key={voucher.VoucherID} value={voucher.VoucherID}>
              {voucher.VoucherCode} - {voucher.DiscountAmount}% Off
            </option>
          ))}
        </select>
      </div>
      <div className="price-details">
        <div className="item">
          <h7>Total Renting Price:</h7>
          <h7>{selectedVoucher ? `(- ${selectedVoucher.DiscountAmount}%) ` : ""}{errors ? 0 : formatPrice(finalPrice - insurance)} VND </h7>
        </div>
        <div className="item">
          <h7>Insurance:</h7>
          <h7>{formatPrice(insurance)} VND</h7>
        </div>
        <div className="item">
          <h5>Total:</h5>
          <h5 style={{ textDecoration: selectedVoucher ? "line-through" : "none", fontSize: selectedVoucher ? "0.9rem" : "1.2rem" }}>
            {errors ? 0 : formatPrice(totalRentingPrice + insurance)} VND
          </h5>
          {selectedVoucher && !errors && (
            <h5>{formatPrice(finalPrice)} VND</h5>
          )}
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
  const [carOwnerID, setCarOwnerID] = useState(null);
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
        if (car_) {
          setCar(car_);
          const resGarage = await axios.get("http://localhost:5000/api/garage");
          const garage = resGarage.data.find((item) => item.GarageID === car_.GarageID);
          
          if (garage) {
            setCarOwnerID(garage.CarOwnerID);
          } else {
            console.error("Garage not found for CarID:", carID);
          }
        } else {
          console.error("Car not found for CarID:", carID);
        }
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };

    fetchCarData();
  }, [carID]);

  if (!car) return <div>Car not found.</div>;

  return (
    <div>
      <HomeHeader/>
      <div className="car-detail-container" style={{marginTop: '50px'}}> 
      <CarDetailCard car={car} userAddress={userAddress} carOwnerID={carOwnerID}/>
      <RentalCard car={car} accID={accID} carOwnerID={carOwnerID}/>
      </div>
      
    </div>
  );
};

export default CarDetail;
