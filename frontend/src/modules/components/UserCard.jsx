import React from "react";
import "../../styles/component/UserCard.css"; // Import CSS cho từng thẻ người dùng

const UserCard = ({ user }) => {
  const { username, role, phone, email, avatar } = user;

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={avatar || "https://via.placeholder.com/80"} alt="avatar" />
      </div>
      <div className="user-info">
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Role:</strong> {role}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
      <div className="user-actions">
        <button className="view-btn">View Full</button>
        <button className="remove-btn">Remove</button>
      </div>
    </div>
  );
};

export default UserCard;
