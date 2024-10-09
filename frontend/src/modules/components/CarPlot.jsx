import React from "react";
import { Col } from "reactstrap";
import "../../styles/component/CarPlot.css";
import {formatPrice} from "../../assets/format/numberFormat"

const CarPlot = (props) => {
  const { imgUrl, carName, gear, price, seat, type } = props.item;

  return (
    <>
      <Col md="3" sm="6">
        <div className="car-item">
          <img className="car-image" src={imgUrl} alt={carName} />
          <div className="car-content">
            <h2 className="car-name">{carName}</h2>
            <div className="car-details">
              <h8> {seat} Seats </h8>
              <h8> {type} </h8>
              <h8> {gear} </h8>
            </div>
            <hr className="split-line" />
            <div className="book-section">
              <div className="car-price">
                <h6 className="price">Starting from </h6>
                <h5>{formatPrice(price)} vnd</h5>
              </div>
              <button className="book-btn">Book now</button>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default CarPlot;
