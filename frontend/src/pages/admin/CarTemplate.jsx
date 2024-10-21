import React, { useState, useEffect } from "react";
import Sidebar from "../../modules/components/ChooseBarAdmin";
import "../../styles/admin/CarTemplate.css";

// CarTemplate Component
const CarTemplate = () => {
  const [features, setFeatures] = useState([]); // State to hold features
  const [newFeature, setNewFeature] = useState(""); // State for new feature input
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [isFeatureModalOpen, setFeatureModalOpen] = useState(false); // State to control feature modal
  const [isCharModalOpen, setCharModalOpen] = useState(false); // State to control characteristic modal
  const [newCharacteristic, setNewCharacteristic] = useState(""); // State for new characteristic input

  // Fetch features data from the backend API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/features"); // Adjust the API URL
        if (!response.ok) {
          throw new Error("Failed to fetch features.");
        }
        const data = await response.json();
        setFeatures(data); // Store features in state
        setLoading(false); // Turn off loading spinner
      } catch (err) {
        setError(err.message); // Handle error
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Function to handle adding a new feature
  const handleAddFeature = async () => {
    if (newFeature.trim() === "") return; // Ensure input isn't empty

    try {
      const response = await fetch("http://localhost:5000/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFeature }), // Send new feature name
      });

      if (response.ok) {
        const addedFeature = await response.json(); // Fetch the new feature
        setFeatures([...features, addedFeature]); // Add to state
        setNewFeature(""); // Clear input field
        alert("Feature added successfully!");
      } else {
        throw new Error("Failed to add feature.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Function to handle removing a feature
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
        ); // Remove from state
        alert("Feature removed successfully!");
      } else {
        throw new Error("Failed to remove feature.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Handlers for opening and closing modals
  const openFeatureModal = () => setFeatureModalOpen(true);
  const closeFeatureModal = () => setFeatureModalOpen(false);
  const openCharModal = () => setCharModalOpen(true);
  const closeCharModal = () => setCharModalOpen(false);

  // Handler for submitting characteristic form
  const handleCharSubmit = (e) => {
    e.preventDefault();
    // Handle submitting the characteristic to the backend here
    console.log("New characteristic added:", newCharacteristic);
    setNewCharacteristic(""); // Reset the form field
    closeCharModal(); // Close the modal after submission
  };

  // Display a loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error if there's a problem fetching the data
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <Sidebar /> {/* Sidebar component */}
      </div>
      <div className="RightSide">
        <div className="template-container">
          <h1 className="page-title">Manage Car Template</h1>
          <div className="feature-list">
            <input
              type="text"
              placeholder="Enter new feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)} // Update input value
            />
            <button className="add-feature-btn" onClick={handleAddFeature}>
              Add Feature
            </button>

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
