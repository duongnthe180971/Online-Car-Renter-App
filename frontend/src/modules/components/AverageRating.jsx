import React from 'react';
import "../../styles/component/AverageRating.css";
import "../../styles/General.css";

const AverageRating = ({ feedbackData }) => {
  const totalRatings = feedbackData.length;

  const sumRatings = feedbackData.reduce((acc, feedback) => acc + (feedback.Rate || 0), 0);
  const averageRating = totalRatings === 0 ? 0 : (sumRatings / totalRatings).toFixed(1);

  const ratingCounts = [0, 0, 0, 0, 0];
  feedbackData.forEach(feedback => {
    if (feedback.Rate >= 1 && feedback.Rate <= 5) {
      ratingCounts[5 - feedback.Rate]++;
    }
  });

  return (
    <div className="average-rating">
      <h2 className="average-text">Average Rating</h2>
      <div className="rating-columns">
        <div className="average-column">
          <div className="average-number-stars">
            <span className="average-number">{isNaN(averageRating) ? 0 : averageRating}</span>
            <span className="average-stars">
              {[...Array(5)].map((_, index) => (
                <span key={index} style={{ color: index < Math.round(averageRating) ? 'gold' : 'grey' }}>★</span>
              ))}
            </span>
          </div>
        </div>
        <div className="breakdown-column">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="rating-row">
              <span>{5 - index} ★</span>
              <span className="count">{ratingCounts[index]}</span>
            </div>
          ))}
          <div className="total-row">
            <strong>Total</strong>
            <span>{totalRatings}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageRating;
