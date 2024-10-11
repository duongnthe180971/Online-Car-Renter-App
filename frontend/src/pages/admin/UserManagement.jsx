import React from "react";
import ChooseBar from "../../modules/components/ChooseBarAdmin"; // Thanh điều hướng (sidebar)
import UserCard from "../../modules/components/UserCard"; // Thành phần thẻ hiển thị thông tin người dùng
import "../../styles/admin/UserManagement.css"; // Import CSS cho trang quản lý người dùng

// Dữ liệu giả lập danh sách người dùng
const users = [
  {
    id: 1,
    username: "Name123",
    role: "Customer",
    phone: "1234567",
    email: "aaa@gmail.com",
    avatar: "", // Có thể sử dụng ảnh đại diện mặc định
  },
  {
    id: 2,
    username: "Name124",
    role: "Customer",
    phone: "2345678",
    email: "bbb@gmail.com",
    avatar: "",
  },
  {
    id: 3,
    username: "Name125",
    role: "Customer",
    phone: "3456789",
    email: "ccc@gmail.com",
    avatar: "",
  },
];

const UserManagement = () => {
  return (
    <div className="AllPage">
      <div className="LeftSide">
        <ChooseBar /> {/* Thanh điều hướng bên trái */}
      </div>
      <div className="RightSide">
        <div className="manage-user-container">
          {" "}
          {/* Container chính với nền tối */}
          <h1 className="title">Manage User</h1>
          <div className="user-list">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
