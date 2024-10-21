import React, { useEffect, useState } from "react";
import ChooseBar from "../../modules/components/ChooseBarAdmin"; // Thanh điều hướng (sidebar)
import UserCard from "../../modules/components/UserCard"; // Thành phần hiển thị thông tin người dùng
import "../../styles/admin/UserManagement.css"; // CSS cho trang quản lý người dùng

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Lưu danh sách người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn

  // Gọi API để lấy danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/account");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data); // Cập nhật danh sách người dùng
        setLoading(false); // Tắt trạng thái loading
      } catch (err) {
        setError(err.message); // Xử lý lỗi
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Hàm hiển thị chi tiết người dùng
  const handleViewFull = (user) => {
    setSelectedUser(user); // Lưu thông tin người dùng được chọn
  };

  // Hiển thị loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <ChooseBar /> {/* Thanh điều hướng */}
      </div>
      <div className="RightSide">
        <div className="manage-user-container">
          <h1 className="title">Manage Users</h1>

          <div className="user-list">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onViewFull={() => handleViewFull(user)}
              />
            ))}
          </div>

          {/* Nếu có người dùng được chọn, hiển thị chi tiết của người đó */}
          {selectedUser && (
            <div className="user-details">
              <h2>Details for {selectedUser.UserName}</h2>
              <p>
                <strong>Email:</strong> {selectedUser.Email}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                {selectedUser.Role === 1
                  ? "Admin"
                  : selectedUser.Role === 2
                  ? "Customer"
                  : "Car Owner"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedUser.Address || "No address provided"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
