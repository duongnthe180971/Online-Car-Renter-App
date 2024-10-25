import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [itlogedin, setitlogedin] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      fetchUserData(storedUser.id);
    }
    // else {
    //   navigate("/login");
    // }
  });
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/account/${id}`
      );

      // Check if UserName exists and set state
      if (response.data && response.data.UserName) {
        setUser(response.data);
        setitlogedin(true);
      } else {
        console.log("No UserName found in the response data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // Log the state changes for debugging
  // console.log("itlogedin:", itlogedin); // To track login status
  // console.log("user:", user); // To track user data
  const handleLogout = () => {
    localStorage.removeItem("user");
    console.log("Logout clicked");
    setitlogedin(false);
    setUser(null);
    navigate("/login", { state: { id } });
  };
  return (
    <div className="header-home">
      <div className="logo">
        <div className="header-logo">
          <div
            className="header-logo"
            onClick={() => navigate("/", { state: { id: user?.id } })}
          >
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <div className="header-navbar">
        <button
          className="navbar"
          onClick={() => navigate("/home", { state: { id: user?.id } })}
        >
          Home
        </button>
        <button
          className="navbar"
          onClick={() => navigate("/about-us", { state: { id: user?.id } })}
        >
          About Us
        </button>
        <button
          className="navbar"
          onClick={() => navigate("/car-status", { state: { id: user?.id } })}
        >
          Your Renting Car
        </button>
      </div>

      <div className="user">
        <Notification id={user?.id}></Notification>
        <div className="header-user-dropdown">
          <button
            className="header-user-show"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="fas fa-user-circle"></i>
            {itlogedin && user && user.UserName ? (
              <div className="user-info">
                <span>{user.UserName}</span>
              </div>
            ) : (
              <a href="../login">Login</a>
            )}
          </button>

          {showDropdown && (
            <div className="header-dropdown-menu">
              <ul>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
