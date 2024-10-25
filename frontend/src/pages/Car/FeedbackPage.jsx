import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedbackCard from '../../modules/components/FeedbackCard';
import AverageRating from '../../modules/components/AverageRating';
import axios from 'axios';
import "../../styles/car/FeedbackPage.css";

const FeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const location = useLocation();
  const { carId } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      console.log('Fetching feedback for carId:', carId);
      try {
        const response = await axios.get(`http://localhost:5000/api/feedback/${carId}`);
        setFeedbackData(response.data);
      } catch (err) {
        console.error('Error fetching feedback data:', err);
      }
    };

    if (carId) {
      fetchFeedback();
    }
  }, [carId]);

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className='feedback-container'>
      <div className="feedback-page">
        <button className="backButton" onClick={handleBackClick}>&lt; Back</button> 
        <h2 className="title">Customer Feedback</h2>
        <AverageRating feedbackData={feedbackData} />
        <div className="feedback-list">
          {feedbackData.map((feedback, index) => (
            <FeedbackCard
              key={index}
              userName={feedback.UserName}
              userProfilePic={feedback.UserProfilePic}
              starRate={feedback.Rate}
              date={feedback.FeedbackDate}
              content={feedback.FeedbackDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;