import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCar,
  FaHistory,
  FaDollarSign,
  FaCog,
  FaSignOutAlt,
  FaCheckSquare,
} from "react-icons/fa";
import "../../styles/component/ChooseBar.css";

export class ChooseBarCarOwner extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/profile">
              <FaUser className="icon" /> My Profile
            </Link>
          </li>
          <li>
            <Link to="/garage">
              <FaCar className="icon" /> Garage
            </Link>
          </li>
          <li>
            <Link to="/rental-request">
              <FaCheckSquare className="icon" /> Rental Requests
            </Link>
          </li>
          <li>
            <Link to="/rental-history">
              <FaHistory className="icon" /> Rental History
            </Link>
          </li>
          <li>
            <Link to="/finance">
              <FaDollarSign className="icon" /> Finance
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCog className="icon" /> Settings
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <FaSignOutAlt className="icon" /> Log Out
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default ChooseBarCarOwner;
