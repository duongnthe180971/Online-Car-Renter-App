import React from 'react';
import "../../styles/component/AverageRating.css";
import "../../styles/General.css";

const AverageRating = ({ feedbackData }) => {
  // Calculate the average rating
  const totalRatings = feedbackData.length;
  const sumRatings = feedbackData.reduce((acc, feedback) => acc + feedback.starRate, 0);
  const averageRating = totalRatings === 0 ? 0 : (sumRatings / totalRatings).toFixed(1);

  // Count the number of each star rating (index 0 is 1-star, index 4 is 5-star)
  const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 = 1 star, Index 4 = 5 stars
  feedbackData.forEach(feedback => {
    // Subtract 1 from starRate to match array index (1-star should map to index 0, 5-star to index 4)
    ratingCounts[5 - feedback.starRate]++;
  });

  return (
    <div className="average-rating">
      <h2 className="average-text">Average Rating</h2>
      <div className="rating-columns">
        {/* First Column: Average Rating Number and Stars */}
        <div className="average-column">
          <div className="average-number-stars">
            <span className="average-number">{averageRating}</span>
            <span className="average-stars">
              {[...Array(5)].map((_, index) => (
                <span key={index} style={{ color: index < Math.round(averageRating) ? 'gold' : 'grey' }}>★</span>
              ))}
            </span>
          </div>
        </div>

        {/* Second Column: Breakdown of Ratings and Count */}
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