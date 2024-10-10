import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaCar,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Import các icon
import "../../styles/component/ChooseBar.css";

export class ChooseBarAdmin extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
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
            <Link to="/settings">
              <FaCog className="icon" /> Setting
            </Link>
          </li>
          <li>
            <Link to="/home">
              <FaSignOutAlt className="icon" /> Log Out
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default ChooseBarAdmin;
