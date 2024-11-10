import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCar, FaHistory, FaCog, FaSignOutAlt, FaList, FaHome } from 'react-icons/fa';
import '../../styles/component/ChooseBar.css';

const ChooseBarCustomer = () => {
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
          <Link to="/car-status">
            <FaCar className="icon" /> My Renting Car
          </Link>
        </li>
        <li>
          <Link to="/car-history">
            <FaHistory className="icon" /> Car History
          </Link>
        </li>
        <li>
          <Link to="/car-list">
            <FaList className="icon" /> List Of Car
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="icon" /> Settings
          </Link>
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Log Out
        </li>
      </ul>
    </div>
  );
};

export default ChooseBarCustomer;
