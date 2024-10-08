import React, { useState } from 'react';
import "../../styles/car/FeedbackStyle.css";

const FeedbackForm = () => {
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (star) => {
    setRating(star);
  };

  const handleMouseEnter = (star) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="containerFeedback">
      <div className="back">
        <a href="#"><span></span> Back</a>
      </div>

      <div className="title">Feedback Car</div>

      <div className="feedback-car">Feedback Car: Toyota Land Cruiser V8</div>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= (hoverRating || rating) ? 'filled' : 'empty'}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => handleMouseEnter(star)} 
            onMouseLeave={handleMouseLeave} 
          >
            {star <= (hoverRating || rating) ? '★' : '☆'}
          </span>
        ))}
      </div>

      <textarea className="feedback-text" placeholder="Leave your feedback here..." />

      <button className="feedback-button">Submit Feedback</button>
    </div>
  );
};

export default FeedbackForm;
