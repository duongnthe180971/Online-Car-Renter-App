import React, { useState, useEffect } from "react";
import "../../styles/home/notification.css";
import notificationData from "../../assets/data/notificationData";

function Notification({ id }) {
  const [showNotification, setShowNotification] = useState(false);
  const handleShowNotification = () => {
    setShowNotification(true);
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  useEffect(() => {
    const notifications = notificationData.filter((item) => item.AccID === id);
    setData(notifications);
  }, [id]);

  const [notifications, setData] = useState(notificationData);
  return (
    <div className="notification-container">
      {/* Notification Popup */}
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-content">
            <p>
              {notifications[0].Notifications.map((item) => (
                <p>{item.Description}</p>
              ))}
            </p>

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
}

export default Notification;
