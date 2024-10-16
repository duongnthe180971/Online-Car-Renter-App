//login
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "../../styles/login/login.css";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // To handle redirection after login

  // Function to handle login
  const getPassByAccount = async () => {
    try {
      const resAccount = await axios.get("http://localhost:5000/api/account");
      const acc = resAccount.data.find((item) => item.UserName === username);

      if (acc && acc.PassWord === password) {
        navigate("/home"); // Redirect to home on successful login
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
      alert("Error during login. Please try again.");
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
            />
          </div>
          <div>
            <button className="register-btn">
              <Link to="/Register">Register</Link>
            </button>
            <button
              className="confirm-btn"
              onClick={getPassByAccount} // Pass function reference, not invocation
            >
              Confirm
            </button>
          </div>
        </div>

        <div className="google-login-box">
          <h2>Google Login</h2>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              // Handle Google Login success (e.g., send token to server for verification)
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
