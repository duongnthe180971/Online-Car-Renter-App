import React, { useState, useEffect } from "react";
import "../../styles/car/FeedbackStyle.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Radio from "../../modules/components/Radio"; // Assuming Radio is in the correct path

const FeedbackForm = () => {
  const [carName, setCarName] = useState("");
  const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
  const [authorized, setAuthorized] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { carId } = location.state || {}; 
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== 3) {
      setAuthorized(false);
      return;
    }

    setUserId(userData.id);

    if (carId) {
      axios.get(`http://localhost:5000/api/car/${carId}`)
        .then((response) => {
          setCarName(response.data.CarName); 
        })
        .catch((error) => {
          console.error("Error fetching car details:", error);
        });
    }
  }, [carId]);

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert("Please select a star rating before submitting your feedback.");
      return;
    }

    if (!feedback) {
      alert("Please enter your feedback.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/feedback", {
        CarID: carId,
        CustomerID: userId,
        FeedbackDescription: feedback,
        Rate: rating,
      });

      await axios.put(`http://localhost:5000/api/car/update-rating/${carId}`);

      alert("Feedback submitted successfully!");
      navigate("/car-status"); 
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  if (!authorized) {
    return (
      <div className="error-page">
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="feedback-wrapper">
      <div className="containerFeedback">
        <div className="back">
          <a href="#" onClick={() => navigate(-1)}><span></span> Back</a>
        </div>

        <div className="feedback-title">Feedback Car</div>

        <div className="feedback-car">Feedback Car: {carName}</div>

        <div className="stars">
          <Radio setRating={setRating} rating={rating} />
        </div>

        <textarea
          className="feedback-text"
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button className="feedback-button" onClick={handleSubmitFeedback}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
