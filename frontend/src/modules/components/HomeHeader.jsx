import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import "../../styles/home/homeheader.css";
// import Voucher from "../../modules/components/Voucher";
import NotificationForm from "../../modules/components/NotificationForm";
import "../../styles/home/notification.css";

const HomeHeader = ({ id }) => {
  const navigate = useNavigate();
  const [itlogedin, setitlogedin] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownDashboard, setShowDropdownDashboard] = useState(false);
  // const [showVoucherPopup, setShowVoucherPopup] = useState(false);
  // const [vouchers, setVouchers] = useState([]);

  // useEffect(() => {
  //   fetchVouchers();
  // }, []);

  // const fetchVouchers = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/vouchers");
  //     setVouchers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching vouchers:", error);
  //   }
  // };

  // const handleClaimVoucher = async (voucherId) => {
  //   try {
  //     await axios.put(`http://localhost:5000/api/voucher/claim/${voucherId}`, {
  //       userId: id,
  //     });
  //     fetchVouchers();
  //     alert("Voucher claimed successfully");
  //   } catch (error) {
  //     console.error("Error claiming voucher:", error);
  //   }
  // };
  const HandlerAssistant = () => {
    navigate("/assistant");
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      fetchUserData(storedUser.id);
    }
    // else {
    //   navigate("/login");
    // }
  });
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/account/${id}`
      );

      // Check if UserName exists and set state
      if (response.data && response.data.UserName) {
        setUser(response.data);
        setitlogedin(true);
      } else {
        console.log("No UserName found in the response data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // Log the state changes for debugging
  // console.log("itlogedin:", itlogedin); // To track login status
  // console.log("user:", user); // To track user data
  const handleLogout = () => {
    localStorage.removeItem("user");
    console.log("Logout clicked");
    setitlogedin(false);
    setUser(null);
    navigate("/login", { state: { id } });
  };
  const renderDashboardLinks = () => {
    if (user?.Role === 0) {
      // Admin
      return (
        <>
          <li>
            <a href="/finance">Finance Statistic</a>
          </li>
          <li>
            <a href="/car-template">Car Template</a>
          </li>
          <li>
            <a href="/admin-car-registration">Car Registration</a>
          </li>
          <li>
            <a href="/user-management">User Management</a>
          </li>
        </>
      );
    } else if (user?.Role === 1) {
      // CarOwner
      return (
        <>
          <li>
            <a href="/garage">Garage</a>
          </li>
          <li>
            <a href="/rental-request">Rental Request</a>
          </li>
          <li>
            <a href="/rental-history">Rental History</a>
          </li>
          <li>
            <a href="/finance">Finance Statistic</a>
          </li>
        </>
      );
    } else if (user?.Role === 2) {
      // Customer
      return (
        <>
          <li>
            <a href="/car-status">Car Status</a>
          </li>
        </>
      );
    }
  };
  return (
    <div className="header-home">
      <div className="logo">
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="header-navbar">
        <button className="click-navbar" onClick={() => navigate("/home")}>
          Home
        </button>
        <button className="click-navbar" onClick={() => navigate("/about-us")}>
          About Us
        </button>
        <div className="header-dashboard-dropdown">
          <button
            className="click-navbar"
            onClick={() => setShowDropdownDashboard(!showDropdownDashboard)}
          >
            Dashboard 🔽
          </button>
          {showDropdownDashboard && (
            <div className="header-dropdowndashboard-menu">
              <ul>{renderDashboardLinks()}</ul>
            </div>
          )}
        </div>
      </div>

      <div className="user">
        {/* <div className="voucher">
          <button
            className="header-voucher-button"
            onClick={() => setShowVoucherPopup(true)}
          >
            Vouchers
          </button>
          {showVoucherPopup && (
            <Voucher
              vouchers={vouchers}
              onClose={() => setShowVoucherPopup(false)}
              onClaim={handleClaimVoucher}
            />
          )}
        </div> */}
        <NotificationForm id={user?.id} />
        <div className="header-user-dropdown">
          <button
            className="header-user-show"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="fas fa-user-circle"></i>
            {itlogedin && user?.UserName ? (
              <div className="user-info">
                <span>{user.UserName}</span>
                {showDropdown && (
                  <div className="header-dropdown-menu">
                    <ul>
                      <li>
                        <a href="/profile">Profile</a>
                      </li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <a href="../login">Login</a>
            )}
          </button>
        </div>
      </div>
      <button className="chat-icon" onClick={HandlerAssistant}>
        💬
      </button>
    </div>
  );
};

export default HomeHeader;
