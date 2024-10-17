import React, { useState, useEffect } from 'react';
import "../../styles/component/FeedbackCard.css";
import img from "../../assets/img/user.png";


const FeedbackCard = ({ userName, starRate, date, content }) => {
    const renderStars = (rate) => {
      return [...Array(5)].map((_, index) => (
        <span key={index} style={{ color: index < rate ? 'gold' : 'grey' }}>★</span>
      ));
    };
  
    return (
      <div className="feedback-card">
        <div className="feedback-top">
          <img src={img} alt={userName} className="profile-pic" />
          <h4 className="user-name">{userName}</h4>
        </div>
  
        <div className="rating-info">
          <div className="stars">{renderStars(starRate)}</div>
          <p className="date">{date}</p>
        </div>
  
        <p className="content">{content}</p>
      </div>
    );
  };
  
  export default FeedbackCard;