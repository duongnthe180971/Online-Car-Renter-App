import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/General.css";
import "../../styles/car/CarRegistration.css";

const UpdateCar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { carId } = location.state || {};

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const [features, setFeatures] = useState({});

  const [carType, setCarType] = useState("");
  const [seatOption, setSeatOption] = useState("");
  const [gearOption, setGearOption] = useState("");
  const [fuelOption, setFuelOption] = useState("");
  const [brandOption, setBrandOption] = useState("");

  const [carTypes, setCarTypes] = useState([]);
  const [seatOptions, setSeatOptions] = useState([]);
  const [gearOptions, setGearOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carResponse = await axios.get(`http://localhost:5000/api/car/${carId}`);
        const car = carResponse.data;

        setName(car.CarName);
        setDescription(car.CarDescription);
        setPrice(car.Price);
        setCurrentImage(car.CarImage); 

        setCarType(car.CarType);
        setSeatOption(car.Seats);
        setGearOption(car.Gear);
        setFuelOption(car.Fuel);
        setBrandOption(car.Brand);

        const carFeaturesResponse = await axios.get(`http://localhost:5000/api/car-features/${carId}`);
        const carFeatureIDs = carFeaturesResponse.data;
        const allFeaturesResponse = await fetchFeatures(carFeatureIDs);
        setFeatures(allFeaturesResponse);
      } catch (err) {
        console.error("Error fetching car details:", err);
      }
    };

    const fetchOptions = async () => {
      const types = ["SUV", "Sedan", "Truck","Van","Sport"];
      const seats = ["2", "4", "5","6", "7"];
      const gears = ["Auto", "Manual"];
      const fuels = ["Gasoline", "Diesel", "Electric"];
      const brands = ["Toyota", "Tesla", "BMW", "Nissan", "Ferrari", "Mercedes", "Audi", "Lamborghini", "Bugatti"];

      setCarTypes(types);
      setSeatOptions(seats);
      setGearOptions(gears);
      setFuelOptions(fuels);
      setBrandOptions(brands);
    };

    fetchCarDetails();
    fetchOptions();
  }, [carId]);

  const fetchFeatures = async (carFeatureIDs) => {
    try {
      const response = await axios.get('http://localhost:5000/api/feature');
      const data = response.data;

      const featureOptions = {};
      data.forEach((feature) => {
        featureOptions[feature.FeatureID] = {
          selected: carFeatureIDs.includes(feature.FeatureID),
          name: feature.Name,
        };
      });
      return featureOptions;
    } catch (error) {
      console.error("Error fetching features:", error);
      return {};
    }
  };

  const handleFeatureChange = (featureID) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [featureID]: {
        ...prevFeatures[featureID],
        selected: !prevFeatures[featureID].selected,
      },
    }));
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedFeatures = Object.keys(features)
      .filter((featureID) => features[featureID].selected)
      .map(Number);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("features", JSON.stringify(selectedFeatures));
      formData.append("type", carType);
      formData.append("seat", seatOption);
      formData.append("gear", gearOption);
      formData.append("fuel", fuelOption);
      formData.append("brand", brandOption);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.put(`http://localhost:5000/api/updateCar/${carId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Car updated successfully!");
      navigate("/garage");
    } catch (err) {
      console.error("Error updating car:", err);
      alert(`Failed to update the car. Error: ${err.response?.data.message || err.message}`);
    }
  };

  return (
    <div className="car-container">
      <div className="car-header">
        <button className="backButton" onClick={() => navigate(-1)}>&lt; Back</button>
        <h1 className="heading">Update Car</h1>
      </div>

      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="label">Enter Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />

          <label className="label">Choose Brand</label>
          <select className="dropdown select brand" value={brandOption} onChange={(e) => setBrandOption(e.target.value)} required>
            <option value="">Select a brand</option>
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <label className="label">Choose Picture</label>
          <div className="imageUpload">
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="imagePreview" />
            ) : (
              <img src={currentImage} alt="Current" className="imagePreview" />
            )}
            <input type="file" onChange={handleImageChange} className="fileInput" />
          </div>

          <div className="characteristics">
            <div className="selectGroup">
              <label className="label">Type:</label>
              <select className="dropdown select" value={carType} onChange={(e) => setCarType(e.target.value)}>
                <option value="">Select a type</option>
                {carTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label">Seats:</label>
              <select className="dropdown select" value={seatOption} onChange={(e) => setSeatOption(e.target.value)}>
                <option value="">Select seats</option>
                {seatOptions.map((seat) => (
                  <option key={seat} value={seat}>{seat}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label">Gear:</label>
              <select className="dropdown select" value={gearOption} onChange={(e) => setGearOption(e.target.value)}>
                <option value="">Select gear</option>
                {gearOptions.map((gear) => (
                  <option key={gear} value={gear}>{gear}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label">Fuel:</label>
              <select className="dropdown select" value={fuelOption} onChange={(e) => setFuelOption(e.target.value)}>
                <option value="">Select fuel</option>
                {fuelOptions.map((fuel) => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="label">Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          />

          <label className="label">Features:</label>
          <div className="features">
            {Object.keys(features).map((featureID) => (
              <label key={featureID} className={`featureCheckbox ${features[featureID].selected ? "activeFeature" : ""}`}>
                <input
                  type="checkbox"
                  checked={features[featureID].selected}
                  onChange={() => handleFeatureChange(featureID)}
                  className="checkbox"
                />
                {features[featureID].name}
              </label>
            ))}
          </div>

          <label className="label">Price</label>
          <div className="priceInput">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
            />
            <span className="priceUnit">vnd/day</span>
          </div>

          <div className="confirmButtonContainer">
            <button type="submit" className="confirmButton">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
