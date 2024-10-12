import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FaUser, FaCar, FaHistory, FaDollarSign, FaCog, FaSignOutAlt, FaCheckSquare } from 'react-icons/fa';
import '../../styles/component/ChooseBar.css';

export class ChooseBarCustomer extends Component {
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
          <Link to="/car-status">
            <FaCar className="icon" /> My Renting Car
          </Link>
        </li>
        <li>
          <Link to="/rental-history">
            <FaHistory className="icon" /> Car History
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
      )
    }
  }

export default ChooseBarCustomer;
