import React, { useState, useEffect } from "react";
import "../../styles/car/FeedbackStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FeedbackForm = () => {
  const [carName, setCarName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate();
  const location = useLocation();
  
  const { carId, customerId } = location.state || {};

  useEffect(() => {
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
      setErrorMessage("Please select a star rating before submitting your feedback.");
      return;
    }

    if (!feedback) {
      setErrorMessage("Please enter your feedback.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/feedback", {
        CarID: carId,
        CustomerID: customerId,
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

  return (
    <div className="feedback-wrapper">
      <div className="containerFeedback">
        <div className="back">
          <a href="#" onClick={() => navigate(-1)}><span></span> Back</a>
        </div>

        <div className="title">Feedback Car</div>

        <div className="feedback-car">Feedback Car: {carName}</div>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= (hoverRating || rating) ? 'filled' : 'empty'}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              {star <= (hoverRating || rating) ? '★' : '☆'}
            </span>
          ))}
        </div>

        <textarea
          className="feedback-text"
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button className="feedback-button" onClick={handleSubmitFeedback}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
