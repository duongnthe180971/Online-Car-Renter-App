import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/login/register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    dob: "",
    phone: "",
    email: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDOB = (dob) => {
    const selectedDate = new Date(dob);
    const today = new Date();
    return selectedDate < today;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    switch (name) {
      case "password":
        if (value.length < 6) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must have at least 6 characters",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "",
          }));
        }
        break;
      case "dob":
        if (!validateDOB(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            dob: "Invalid date of birth",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            dob: "",
          }));
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: "Phone number must be 10 digits",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: "",
          }));
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Invalid email",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.password || errors.dob || errors.phone || errors.email) {
      alert("Please check the input fields");
      return;
    }
    try {
      // Send a POST request to the backend API to insert data into the Account table
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      console.log(response.data);

      // Redirect to login after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          <label>Gender:</label>
          <div className="radio-container">
            <input
              type="radio"
              id="male"
              name="gender"
              value="0"
              checked={formData.gender === "0"}
              onChange={handleChange}
              required
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="1"
              checked={formData.gender === "1"}
              onChange={handleChange}
              required
            />
            <label htmlFor="female">Female</label>
          </div>

          <label htmlFor="dob">Date Of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {errors.dob && <p className="error-message">{errors.dob}</p>}
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <label htmlFor="address">Address:</label>
          <input
            type="address"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label>Role:</label>
          <div className="radio-container">
            <input
              type="radio"
              id="carowner"
              name="role"
              value="1"
              checked={formData.role === "1"}
              onChange={handleChange}
              required
            />
            <label htmlFor="carowner">Car Owner</label>
            <input
              type="radio"
              id="customer"
              name="role"
              value="2"
              checked={formData.role === "2"}
              onChange={handleChange}
              required
            />
            <label htmlFor="customer">Customer</label>
          </div>
          <div className="buttons">
            <button type="submit" className="confirm">
              Confirm
            </button>
            <button type="button" className="cancel">
              <Link to="/login">Cancel</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
