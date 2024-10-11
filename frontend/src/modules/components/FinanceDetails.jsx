import React from "react";

const FinanceDetails = () => {
  return (
    <div className="finance-details">
      <h1>Finance</h1>
      <div className="filters">
        <div className="filter-item">
          <label>Time interval</label>
          <select>
            <option>Year</option>
            <option>Month</option>
          </select>
        </div>
        <div className="filter-item">
          <label>Time</label>
          <select>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FinanceDetails;
