import React from "react";
import "../../styles/home/homeheader.css";
import logo from "../../assets/icon/logo.png";
function HomeHeader() {
  return (
    <div className="header-home">
      <div className="logo">
        <div className="header-logo">
          <a href="../">
            <img src={logo} alt="logo" />
          </a>
        </div>
      </div>
      <div className="navbar">
        <a href="./">Home</a>
        <a href="./aboutus">About Us</a>
        <a href="./car-status">Your Renting Car</a>
      </div>
      <div className="user">
        <i className="fas fa-user-circle"></i>

        <a href="../login"> Login</a>
      </div>
    </div>
  );
}
export default HomeHeader;
