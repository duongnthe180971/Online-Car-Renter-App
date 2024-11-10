import React, { useState, useEffect } from "react";
import ChooseBar from "../../modules/components/ChooseBarAdmin";
import "../../styles/admin/CarTemplate.css";
import Input from "../../modules/components/Input";


const CarTemplate = () => {
  const [features, setFeatures] = useState([]); 
  const [newFeature, setNewFeature] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/features");
        if (!response.ok) {
          throw new Error("Unable to fetch features.");
        }
        const data = await response.json();
        setFeatures(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    const featureName = newFeature.trim();

    const isDuplicate = features.some(
      (feature) => feature.Name.toLowerCase() === featureName.toLowerCase()
    );

    if (isDuplicate) {
      alert("Feature already exists."); 
      return; 
    }


    const isValid =
      /^[a-zA-Z]+( [a-zA-Z]+)*$/.test(featureName) &&
      featureName.split(" ").filter((word) => word !== "").length <= 2;
    if (!isValid) {
      alert("Only alphabetic characters and up to two words are allowed.");
      return;
    }

    if (featureName === "") {
      alert("Feature name cannot be empty."); 
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: featureName }), 
      });

      if (response.ok) {
        const addedFeature = await response.json();
        setFeatures([...features, addedFeature]); 
        setNewFeature(""); 
        alert("Feature added successfully!");
      } else {
        throw new Error("Failed to add feature.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleInputChange = (e) => {
    setNewFeature(e.target.value);
  };

  const handleRemoveFeature = async (featureId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/features/${featureId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFeatures(
          features.filter((feature) => feature.FeatureID !== featureId)
        );
        alert("Feature removed successfully!");
      } else {

        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove feature.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`); 
      console.error("Error removing feature:", err);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <div className="Bar">
          <ChooseBar />
        </div>
      </div>
      <div className="RightSide">
        <div className="template">
          <h1 className="page-title">Manage Car Template</h1>
          <div className="feature-list">
            <div className="feature-input-container">
              <Input
                value={newFeature}
                onChange={handleInputChange}
                placeholder="Enter new feature"
              />
              <button className="add-feature-btn" onClick={handleAddFeature}>
                Add Feature
              </button>
            </div>

            {features.map((feature) => (
              <FeatureItem
                key={feature.FeatureID}
                feature={feature}
                onRemove={() => handleRemoveFeature(feature.FeatureID)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const FeatureItem = ({ feature, onRemove }) => {
  return (
    <div className="feature-item">
      <span>{feature.Name}</span>
      <button className="remove-btn" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
};

export default CarTemplate;
