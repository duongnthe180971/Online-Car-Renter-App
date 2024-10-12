import React, { useState } from "react";
import "../../styles/home/notification.css";

function Notification() {
  // ... (rest of your code)

  // State for managing the notification
  const [showNotification, setShowNotification] = useState(false);

  // Function to show the notification
  const handleShowNotification = () => {
    setShowNotification(true);
  };

  // Function to close the notification
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="notification-container">
      {/* ... (rest of your code) */}

      {/* Notification Popup */}
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-content">
            <p>This is a notification message!</p>
            <button onClick={handleCloseNotification}>Close</button>
          </div>
        </div>
      )}

      {/* Button to trigger the notification */}
      <button onClick={handleShowNotification}>Show Notification</button>

      {/* ... (rest of your code) */}
    </div>
  );
}

export default Notification;
