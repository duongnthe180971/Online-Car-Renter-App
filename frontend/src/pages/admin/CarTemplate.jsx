import React, { useState, useEffect } from "react";
import ChooseBar from "../../modules/components/ChooseBarAdmin";
import "../../styles/admin/CarTemplate.css";
import Input from "../../modules/components/Input";

// CarTemplate Component
const CarTemplate = () => {
  const [features, setFeatures] = useState([]); // State to store feature list
  const [newFeature, setNewFeature] = useState(""); // State for new feature input
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch feature data from the API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/features");
        if (!response.ok) {
          throw new Error("Unable to fetch features.");
        }
        const data = await response.json();
        setFeatures(data); // Store fetched features in state
        setLoading(false); // Stop loading indicator
      } catch (err) {
        setError(err.message); // Handle fetch error
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Add a new feature with duplicate check and validation
  const handleAddFeature = async () => {
    const featureName = newFeature.trim();

    // Check if the feature already exists in the list (duplicate check)
    const isDuplicate = features.some(
      (feature) => feature.Name.toLowerCase() === featureName.toLowerCase()
    );

    if (isDuplicate) {
      alert("Feature already exists."); // Display error message for duplicate
      return; // Prevent further action
    }

    // Validate that the input contains only letters and spaces, with no more than two consecutive spaces
    const isValid =
      /^[a-zA-Z]+( [a-zA-Z]+)*$/.test(featureName) &&
      featureName.split(" ").filter((word) => word !== "").length <= 2;
    if (!isValid) {
      alert("Only alphabetic characters and up to two words are allowed.");
      return;
    }

    if (featureName === "") {
      alert("Feature name cannot be empty."); // Show error if input is empty
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: featureName }), // Send the new feature name
      });

      if (response.ok) {
        const addedFeature = await response.json(); // Fetch the new feature from response
        setFeatures([...features, addedFeature]); // Add new feature to the list
        setNewFeature(""); // Clear the input field
        alert("Feature added successfully!");
      } else {
        throw new Error("Failed to add feature.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`); // Show error message
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setNewFeature(e.target.value); // Allow any input, validation happens on Add
  };

  // Remove a feature with API error handling
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
        ); // Remove the feature from the list if successful
        alert("Feature removed successfully!");
      } else {
        // If the response is not ok, get the detailed error message from the server
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove feature.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`); // Show detailed error message
      console.error("Error removing feature:", err);
    }
  };

  // Show loading indicator while fetching features
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error if there was an issue fetching the data
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

            {/* List of existing features */}
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

// FeatureItem Component
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
