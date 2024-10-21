import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Sử dụng useParams để lấy ID từ URL

const UserDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Gọi API để lấy thông tin chi tiết người dùng dựa trên ID
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/account/${id}");
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUser(data); // Lưu thông tin người dùng vào state
        setLoading(false); // Tắt trạng thái loading
      } catch (err) {
        setError(err.message); // Xử lý lỗi
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-details">
      <h1>{user.UserName}'s Details</h1>
      <p>
        <strong>Email:</strong> {user.Email}
      </p>
      <p>
        <strong>Role:</strong>{" "}
        {user.Role === 1 ? "Admin" : user.Role === 2 ? "Customer" : "Car Owner"}
      </p>
      <p>
        <strong>Address:</strong> {user.Address || "No address provided"}
      </p>
      <button onClick={() => window.history.back()}>Go Back</button>{" "}
      {/* Nút quay lại */}
    </div>
  );
};

export default UserDetails;
