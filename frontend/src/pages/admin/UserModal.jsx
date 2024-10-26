import React from "react";
import defaultAvatar from "../../assets/img/user.png"; // Default avatar (user.png)
import "../../styles/admin/UserModal.css"; // CSS for modal styling

const UserModal = ({ user, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>
        <div className="user-info-modal">
          <img
            className="modal-avatar"
            src={user.Avatar || defaultAvatar} // Use default avatar if none provided
            alt={`${user.UserName}'s avatar`}
          />
          <h2>{user.UserName}'s Info</h2>
          <p>
            <strong>Email:</strong> {user.Email}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            {user.Role === 1
              ? "Admin"
              : user.Role === 2
              ? "Customer"
              : "Car Owner"}
          </p>
          <p>
            <strong>Address:</strong> {user.Address || "No address provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
