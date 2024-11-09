import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCar,
  FaHistory,
  FaDollarSign,
  FaCog,
  FaSignOutAlt,
  FaCheckSquare,
  FaCarSide,
  FaHome,
} from "react-icons/fa";
import "../../styles/component/ChooseBar.css";

const ChooseBarCarOwner = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Log out success");
    navigate("/home");
  };

  return (
    <div className="sidebar">
      <ul>
      <li>
          <Link to="/">
            <FaHome className="icon" /> Home
          </Link>
        </li>

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
          <Link to="/rental-return">
            <FaCarSide className="icon" /> Confirm Return
          </Link>
        </li>
        <li>
          <Link to="/rental-history">
            <FaHistory className="icon" /> Rental History
          </Link>
        </li>
        <li>
          <Link to="/finance-carowner">
            <FaDollarSign className="icon" /> Finance
          </Link>
        </li>

        <li onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Log Out
        </li>
      </ul>
    </div>
  );
};

export default ChooseBarCarOwner;
