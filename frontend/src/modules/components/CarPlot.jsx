import React from "react";
import { Col } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import "../../styles/component/CarPlot.css";
import { formatPrice } from "../../assets/format/numberFormat";

const CarPlot = (props) => {
  const {CarID, CarImage, CarName, Gear, Price, Seats, CarType } = props.item;
  const navigate = useNavigate();
  const handleCheckDetailCar = () => {
    navigate(`/car-detail`, { state: { carID: CarID } });
  };
  return (
    <>
      <Col md="3" sm="6">
        <div className="car-item">
          <img className="car-image" src={CarImage} alt={CarName} />
          <div className="car-content">
            <h2 className="car-name">{CarName}</h2>
            <div className="car-details">
              <h8>🪑 {Seats} Seats </h8>
              <h8>🚗 {CarType} </h8>
              <h8>⚙️ {Gear} </h8>
            </div>
            <hr className="split-line" />
            <div className="book-section">
              <div className="car-price">
                <h6 className="price">Starting from </h6>
                <h5>{formatPrice(Price)} vnd</h5>
              </div>
              <button className="book-btn" onClick={handleCheckDetailCar}>Book now</button>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default CarPlot;
