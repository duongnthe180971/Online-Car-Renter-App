import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaCar,
  FaClipboardList,
  FaUsers,
  FaGift,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import "../../styles/component/ChooseBar.css";

const ChooseBarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Simulate the server logout request
      // If successful, clear localStorage and navigate to home
    localStorage.removeItem("user");
    alert("Log out success");
    navigate("/home");
    } catch (error) {
      alert(error); // Show error message if logout fails
    }
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
          <Link to="/finance">
            <FaChartBar className="icon" /> Statistic
          </Link>
        </li>
        <li>
          <Link to="/car-template">
            <FaCar className="icon" /> Car Template
          </Link>
        </li>
        <li>
          <Link to="/admin-car-registration">
            <FaClipboardList className="icon" /> Car Registrations
          </Link>
        </li>
        <li>
          <Link to="/user-management">
            <FaUsers className="icon" /> User Management
          </Link>
        </li>
        <li>
          <Link to="/admin-voucher">
            <FaGift className="icon" /> Voucher
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="icon" /> Setting
          </Link>
        </li>
        
        <li onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Log Out
        </li>
      </ul>
    </div>
  );
};

export default ChooseBarAdmin;
