import React, { useState, useEffect } from "react";
import aboutus from "../../assets/icon/aboutus.gif";
import { useLocation } from "react-router-dom";
import "../../styles/home/aboutus.css";
import HomeHeader from "../../modules/components/HomeHeader";
import axios from "axios";

const AboutUs = () => {
  const location = useLocation();
  const { id } = location.state || { id: 1 };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      fetchUserData(storedUser.id);
    }
  }, []);
  const [user, setUser] = useState(null);
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/account/${userId}`
      );
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const roleGreeting = () => {
    if (!user) return "Welcome Guest, you need login to use our service!";
    switch (user.Role) {
      case 1:
        return `Hello Admin ${user.UserName}, welcome to our About Us page!`;
      case 2:
        return `Hello Car Owner ${user.UserName}, welcome to our About Us page!`;
      case 3:
        return `Hello Customer ${user.UserName}, welcome to our About Us page!`;
      default:
        return `Hello ${user.UserName}, welcome to our About Us page!`;
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    switch (name) {
      case "name":
        if (value.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "Name cannot be blank!",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "",
          }));
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email is invalid!",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
          }));
        }
        break;
      case "message":
        if (value.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            message: "Messages cannot be empty!",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            message: "",
          }));
        }
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !validateEmail(formData.email) || !formData.message) {
      alert("Please check the input fields!");
      return;
    }

    alert(
      `Information has been sent:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className="aboutus-body">
      <HomeHeader id={id}></HomeHeader>
      <div className="aboutus-container">
        <div className="image-section">
          <img alt="Ảnh GIF động" src={aboutus} />
        </div>
        <div className="form-section">
          <div className="toggle-switch">
            <input type="checkbox" id="dark-mode-toggle" />
          </div>
          <h5>{roleGreeting()}</h5>
          <h1>CONTACT US</h1>

          <p>
            <h5>
              Each trip is a journey to discover life and the world around you,
              an opportunity to learn and conquer new things for each individual
              to become better. Therefore, the quality of customer experience is
              the top priority and inspiration of the CARDIO team ❤️
            </h5>
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">FULL NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <label htmlFor="message">MESSAGE</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && (
              <p className="error-message">{errors.message}</p>
            )}

            <button type="submit">SEND</button>
          </form>
          <div class="social-icons">
            <a href="./about-us" title="Contact">
              <i class="fas fa-phone"></i> 1900.1234
            </a>
            <a href="https://facebook.com/" title="Facebook">
              <i class="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="./aboutus" title="Zalo">
              <i class="fas fa-comment-dots"></i> Message
            </a>
            <a href="https://tiktok.com/" title="TikTok">
              <i class="fab fa-tiktok"></i> Tiktok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
