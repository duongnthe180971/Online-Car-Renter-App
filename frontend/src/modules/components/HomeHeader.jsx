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
  }, [id]); // Fetch notifications whenever id changes
  return (
    <div className="notification-container">
      {/* Notification Popup */}
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-content">
            <ul>
              {notifications.map((item) => (
                <li key={item.NotificationID}>
                  {/* Fetch and display Description from NotificationDescription table */}
                  {(() => {
                    const getNotificationDescription = async () => {
                      try {
                        const response = await axios.get(
                          `http://localhost:5000/api/notification-description/${item.NotificationID}`
                        );
                        return response.data.Description;
                      } catch (error) {
                        console.error(
                          "Error fetching notification description:",
                          error
                        );
                        return "Error loading notification description";
                      }
                    };

                    return getNotificationDescription();
                  })()}
                </li>
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/account/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

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
        <a href="./aboutus">About Us</a>
        <a href="./car-status">Your Renting Car</a>
      </div>

      <div className="user">
        <Notification id={id}></Notification>
        <i className="fas fa-user-circle"></i>

        {user ? (
          <div className="user-info">
            <span>{user.UserName}</span>
            {/* Hiển thị thêm thông tin nếu cần */}
            {/* Ví dụ: <span>{user.Email}</span> */}
          </div>
        ) : (
          <a href="../login"> Login</a>
        )}
      </div>
    </div>
  );
};
export default HomeHeader;
