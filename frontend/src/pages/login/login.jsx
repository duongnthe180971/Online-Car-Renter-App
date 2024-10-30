//login
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "../../styles/login/login.css";
import "../../styles/General.css";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(""); //eror
  const navigate = useNavigate(); // To handle redirection after login
  //check input from user
  const validateInputs = () => {
    let valid = true;

    if (username.trim() === "" && password.trim() === "") {
      setError("Username and Password cannot be left blank!");
      valid = false;
    } else if (username.trim() === "") {
      setError("Username cannot be blank!");
      valid = false;
    } else if (password.trim() === "") {
      setError("Password cannot be blank!");
      valid = false;
    } else if (password.length < 6) {
      setError("Password must have at least 6 characters!");
      valid = false;
    } else {
      setError("");
    }
    return valid;
  };
  // Function to handle login
  const getPassByAccount = async () => {
    if (!validateInputs()) {
      return; // stop if input can't be validated
    }
    try {
      const resAccount = await axios.get("http://localhost:5000/api/account");
      const acc = resAccount.data.find((item) => item.UserName === username);

      if (acc && acc.PassWord === password) {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: acc.id, role: acc.Role })
        );
        if (acc.Role === 1) {
          navigate(`/home`);
        } else {
          navigate(`/home`);
        }
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="register-btn">
              <Link to="/Register">Register</Link>
            </button>
            <button className="confirm-btn" onClick={getPassByAccount}>
              Confirm
            </button>
            {Error && <p className="error-message">{Error}</p>}
          </div>
        </div>

        <div className="google-login-box">
          <h2>Google Login</h2>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
