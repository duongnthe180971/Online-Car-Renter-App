import React, { useState, useEffect } from "react";
import "../../styles/home/notification.css";
import axios from "axios";

const NotificationForm = ({ id }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notification/${id}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (id) fetchNotifications();
  }, [id]);

  return (
    <div className="notification-container">
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-content">
            <button
              className="notification-close"
              onClick={handleCloseNotification}
            >
              Close
            </button>
            <div className="notification-messages">
              {notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                  <div className="notification-description">
                    <p>{notification.Description}</p>
                  </div>
                  <div className="notification-date">
                    <span>
                      {new Date(
                        notification.NotificationDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className="notification-show" onClick={handleShowNotification}>
        Notifications
      </button>
    </div>
  );
};

export default NotificationForm;
