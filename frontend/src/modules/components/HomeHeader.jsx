import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import "../../styles/home/homeheader.css";
import NotificationForm from "../../modules/components/NotificationForm";
import "../../styles/home/notification.css";

const HomeHeader = () => {
  const navigate = useNavigate();
  const [itlogedin, setitlogedin] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownDashboard, setShowDropdownDashboard] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const HandlerAssistant = () => {
    navigate("/assistant");
  };
  const HandlerMaps = () => {
    navigate("/customer-map");
  };
  const handleCheckLoginRole = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser?.role === 3) {
      navigate(`/voucher`);
    } else if (
      storedUser &&
      (storedUser?.role === 1 || storedUser?.role === 2)
    ) {
      alert("You must login at Customer!");
    } else {
      alert("Please log in to get Voucher");
      navigate("/login");
    }
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) fetchUserData(storedUser.id);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY && currentScrollY > 50) {
        setIsHeaderVisible(false); // Hide header on scroll down
      } else {
        setIsHeaderVisible(true); // Show header on scroll up
      }
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/account/${id}`
      );

      // Check if UserName exists and set state
      if (response.data && response.data.UserName) {
        setUser(response.data);
        setitlogedin(true);
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
    setitlogedin(false);
    navigate("/login");
  };
  const renderDashboardLinks = () => {
    if (user?.Role === 1) {
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
          <li>
            <a href="/admin-voucher">Admin Voucher</a>
          </li>
        </>
      );
    } else if (user?.Role === 2) {
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
    } else if (user?.Role === 3) {
      // Customer
      return (
        <>
          <li>
            <a href="/car-status">Car Status</a>
          </li>{" "}
          <li>
            <a href="/car-history">Car History</a>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <div
        className={`header-home ${isHeaderVisible ? "visible" : "hidden"}`}
        onMouseEnter={() => setIsHeaderVisible(true)}
      >
        <div className="logo">
          <div className="header-logo" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="header-navbar">
          <button className="click-navbar" onClick={() => navigate("/home")}>
            Home
          </button>
          <button
            className="click-navbar"
            onClick={() => navigate("/about-us")}
          >
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
          {itlogedin && (
            <button
              className="header-voucher-button"
              onClick={handleCheckLoginRole}
            >
              Vouchers
            </button>
          )}
          <div>{itlogedin && <NotificationForm id={user?.id} />}</div>
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
      </div>
      <button className="chat-icon" onClick={HandlerAssistant}>
        💬
      </button>
      <button className="map-icon" onClick={HandlerMaps}>
        🗺️
      </button>
    </>
  );
};

export default HomeHeader;
