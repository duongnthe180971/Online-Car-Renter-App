import React from "react";
import "../../styles/component/UserCard.css"; // Import CSS

const UserCard = ({ user, onViewFull, onDelete }) => {
  const { id, UserName } = user;

  // Hàm xử lý khi nhấn nút xóa người dùng
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ${UserName}?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/account/${id}",
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          onDelete(id); // Gọi hàm onDelete được truyền từ component cha để xóa khỏi danh sách
          alert("User deleted successfully!"); // Hiển thị thông báo thành công
        } else {
          console.error("Failed to delete user");
        }
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="user-card">
      <div className="user-info">
        <p>
          <strong>Username:</strong> {UserName}
        </p>
      </div>
      <div className="user-actions">
        <button className="view-btn" onClick={onViewFull}>
          View Full
        </button>
        <button className="remove-btn" onClick={handleDeleteUser}>
          Remove User
        </button>
      </div>
    </div>
  );
};

export default UserCard;
