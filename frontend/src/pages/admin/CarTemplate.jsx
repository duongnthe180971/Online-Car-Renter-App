import React, { useState } from "react";
import Sidebar from "../../modules/components/ChooseBarAdmin";
import "../../styles/admin/CarTemplate.css";

const CarTemplate = () => {
  return (
    <div className="AllPage">
      <div className="LeftSide">
        <Sidebar />
      </div>
      <div className="RightSide">
        <div className="template-container">
          <h1 className="page-title">Manage Car Template</h1>

          <div className="manage-buttons">
            <button className="manage-feature-btn">Manage Feature</button>
            <button className="manage-char-btn">Manage Characteristic</button>
          </div>

          <div className="feature-list">
            <button className="add-feature-btn">Add Feature</button>{" "}
            {/* Nút căn phải */}
            <FeatureItem name="Bluetooth" />
            <FeatureItem name="Map" />
            <FeatureItem name="Airbag" />
            <FeatureItem name="Reverse Cam" />
            <FeatureItem name="USB Port" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ name }) => {
  return (
    <div className="feature-item">
      <span>{name}</span>
      <button className="remove-btn">Remove</button>
    </div>
  );
};
export default CarTemplate;
