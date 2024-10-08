
import React, { useState } from 'react';
import FeedbackCard from '../../modules/components/FeedbackCard';
import AverageRating from '../../modules/components/AverageRating';
import "../../styles/car/FeedbackPage.css";

const FeedbackPage = () => {
  // Example feedback data
  const feedbackData = [
    {
      userName: "John Doe",
      userProfilePic: "https://via.placeholder.com/150",
      starRate: 5,
      date: "2024-10-01",
      content: "Amazing service! Highly recommend."
    },
    {
      userName: "Jane Smith",
      userProfilePic: "https://via.placeholder.com/150",
      starRate: 4,
      date: "2024-09-15",
      content: "Very good experience, but room for improvement."
    },
    {
      userName: "Alex Johnson",
      userProfilePic: "https://via.placeholder.com/150",
      starRate: 3,
      date: "2024-08-25",
      content: "It was okay, not the best I've had."
    },
    {
      userName: "Alex Johnson",
      userProfilePic: "https://via.placeholder.com/150",
      starRate: 1,
      date: "2024-08-25",
      content: "It was suck."
    }
  ];

  return (
    <div className='feedback-container'>
      <div className="feedback-page">
        <h2 className="title">Customer Feedback</h2>
        <AverageRating feedbackData={feedbackData} />
        <div className="feedback-list">
          {feedbackData.map((feedback, index) => (
            <FeedbackCard
              key={index}
              userName={feedback.userName}
              userProfilePic={feedback.userProfilePic}
              starRate={feedback.starRate}
              date={feedback.date}
              content={feedback.content}
            />
          ))}
        </div>
      </div>
    </div>

  );
};

export default FeedbackPage;