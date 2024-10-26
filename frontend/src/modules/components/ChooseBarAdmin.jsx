import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaCar,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons
import "../../styles/component/ChooseBar.css";

export class ChooseBarAdmin extends Component {
  // Simulate a server call to log out the user
  simulateLogoutRequest = () => {
    // Simulate a server request with a 50% chance of failure
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.5; // Simulate failure 50% of the time
        if (shouldFail) {
          reject("Server error: Unable to log out.");
        } else {
          resolve("Logout successful.");
        }
      }, 1000); // Simulate network delay
    });
  };

  // Function to handle logout
  handleLogout = async (e) => {
    e.preventDefault(); // Prevent default link behavior (navigation)

    try {
      // Simulate the server logout request
      const response = await this.simulateLogoutRequest();
      // If successful, clear localStorage and show success message
      localStorage.removeItem("authToken"); // Clear auth token
      alert(response); // Show the success message
      // Redirect to the home page
      window.location.href = "/home";
    } catch (error) {
      // If there is an error, show the error message
      alert(error); // Show error message if logout fails
    }
  };

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
            {/* The logout link triggers the handleLogout function */}
            <Link to="/home" onClick={this.handleLogout}>
              <FaSignOutAlt className="icon" /> Log Out
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default ChooseBarAdmin;
