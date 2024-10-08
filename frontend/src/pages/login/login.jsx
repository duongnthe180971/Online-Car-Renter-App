import React from "react";
import "../../styles/login/login.css";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <button className="register-btn">
            <Link to="/Register">Register</Link>
          </button>
          <button className="confirm-btn">Confirm</button>
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
  );
}

export default Login;
