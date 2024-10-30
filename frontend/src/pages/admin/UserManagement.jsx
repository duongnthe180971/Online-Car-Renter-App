import React, { useEffect, useState } from "react";
import ChooseBar from "../../modules/components/ChooseBarAdmin"; // Sidebar
import "../../styles/admin/UserManagement.css"; // CSS for user management page
import defaultAvatar from "../../assets/img/user.png"; // Default avatar for users

const UserManagement = () => {
  const [users, setUsers] = useState([]); // To hold the user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for details
  const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
  const usersPerPage = 3; // Number of users per page
  const [selectedRole, setSelectedRole] = useState(""); // Filter by role
  const [isDeleting, setIsDeleting] = useState(false); // Deleting state
  const [isUpdating, setIsUpdating] = useState(false); // Updating state

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/account");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();

        // Filter only activated users (Status = 1)
        const activeUsers = data.filter((user) => user.Status === true);
        setUsers(activeUsers); // Update users list
        setLoading(false); // Turn off loading spinner
      } catch (err) {
        setError(err.message); // Handle error
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on selected role
  const filteredUsers = users.filter((user) => {
    return selectedRole ? user.Role === parseInt(selectedRole) : true;
  });

  // Get the current users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle user selection for details
  const handleViewFull = (user) => {
    setSelectedUser(user);
  };

  // Handle user deletion
  // Handle user deletion
  const handleDeleteUser = async (id, UserName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to deactivate ${UserName} ?`
    );

    if (confirmDelete) {
      setIsDeleting(true); // Start deleting state
      try {
        // Corrected URL
        const response = await fetch(
          `http://localhost:5000/api/deactivate-user/${id}`,
          {
            method: "PUT",
          }
        );

        if (response.ok) {
          alert(`${UserName} has been deactivated.`);
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } else {
          console.error("Failed to deactivate user");
        }
      } catch (err) {
        console.error("Error deactivating user:", err);
      } finally {
        setIsDeleting(false); // Reset deleting state
      }
    }
  };

  const handleCloseInfo = () => {
    setSelectedUser(null); // Close modal
  };

  // Display a loading spinner while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error if there's an issue fetching the data
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <div className="Bar">
          <ChooseBar />
        </div>
      </div>
      <div className="RightSide">
        <div className="manage-user-container">
          <h1 className="title">Manage Users</h1>

          {/* Filter section for roles */}
          <div className="filter-container">
            <label htmlFor="roleFilter">Filter by Role:</label>
            <select
              id="roleFilter"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="1">Admin</option>
              <option value="2">Customer</option>
              <option value="3">Car Owner</option>
            </select>
          </div>

          {/* User list */}
          <div className="user-list">
            {currentUsers.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <img
                    className="user-avatar"
                    src={user.Avatar || defaultAvatar}
                    alt={`${user.UserName}'s avatar`}
                  />
                  <p>
                    <strong>Username:</strong> {user.UserName}
                  </p>
                </div>
                <div className="user-actions">
                  <button
                    className="view-btn"
                    onClick={() => handleViewFull(user)}
                  >
                    View
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleDeleteUser(user.id, user.UserName)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Component */}
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={filteredUsers.length}
            currentPage={currentPage}
            paginate={paginate}
          />

          {/* User Details Modal */}
          {selectedUser && (
            <div className="user-details-modal">
              <div className="user-details-content">
                <button className="close-modal-btn" onClick={handleCloseInfo}>
                  Close
                </button>
                <div className="user-details-left">
                  <img
                    src={selectedUser.Avatar || defaultAvatar}
                    alt={selectedUser.UserName}
                    className="user-details-avatar"
                  />
                </div>
                <div className="user-details-right">
                  <h2>{selectedUser.UserName}</h2>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""
            }`}
        >
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserManagement;
