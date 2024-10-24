import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/icon/logo.png";
import "../../styles/home/homeheader.css";
import "../../styles/home/notification.css";

const Notification = ({ id }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setData] = useState([]);

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const fetchNotis = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/notification"
        );
        const filteredNotis = response.data.filter(
          (notification) => notification.AccID === id
        );
        setData(filteredNotis);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotis();
  }, [id]);

  return (
    <div className="notification-container">
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-content">
            <ul>
              {notifications.map((item) => (
                <li key={item.NotificationID}>{item.Description}</li>
              ))}
            </ul>
            <button
              className="notification-close"
              onClick={handleCloseNotification}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <button className="notification-show" onClick={handleShowNotification}>
        Notification
      </button>
    </div>
  );
};

const HomeHeader = ({ id }) => {
  const [itlogedin, setitlogedin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/account/${id}`
        );
        console.log("Fetched User Data:", response.data); // Log the API response

        // Check if UserName exists and set state
        if (response.data && response.data.UserName) {
          setUser(response.data); // Set the user state
          setitlogedin(true); // Set the login state to true
        } else {
          console.log("No UserName found in the response data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  // Log the state changes for debugging
  console.log("itlogedin:", itlogedin); // To track login status
  console.log("user:", user); // To track user data

  return (
    <div className="header-home">
      <div className="logo">
        <div className="header-logo">
          <a href="../">
            <img src={logo} alt="logo" />
          </a>
        </div>
      </div>
      <div className="navbar">
        <a href="./">Home</a>
        <a href="./about-us">About Us</a>
        <a href="./car-status">Your Renting Car</a>
      </div>

      <div className="user">
        <Notification id={id}></Notification>
        <i className="fas fa-user-circle"></i>

        {itlogedin && user && user.UserName ? (
          <div className="user-info">
            <span>{user.UserName}</span>
          </div>
        ) : (
          <a href="../login">Login</a>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
