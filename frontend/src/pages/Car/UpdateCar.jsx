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
  const [imageError, setImageError] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [carTypeError, setCarTypeError] = useState("");
  const [seatError, setSeatError] = useState("");
  const [gearError, setGearError] = useState("");
  const [fuelError, setFuelError] = useState("");
  const [loadError, setLoadError] = useState("");

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
        setLoadError("Error fetching car details: Server Error");
      }
    };

    const fetchOptions = async () => {
      const types = ["SUV", "Sedan", "Truck", "Van", "Sport"];
      const seats = ["2", "4", "5", "6", "7"];
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
    const file = event.target.files[0];

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file && !validImageTypes.includes(file.type)) {
      setImageError("Invalid image type. Please upload a JPEG, PNG, or GIF image.");
      setSelectedImage(null);
    } else {
      setImageError("");
      setSelectedImage(file);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError("Car name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!description) {
      setDescriptionError("Car description is required.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!price) {
      setPriceError("Car price is required.");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (!brandOption) {
      setBrandError("Please select a brand.");
      isValid = false;
    } else {
      setBrandError("");
    }

    if (!carType) {
      setCarTypeError("Please select a car type.");
      isValid = false;
    } else {
      setCarTypeError("");
    }

    if (!seatOption) {
      setSeatError("Please select the number of seats.");
      isValid = false;
    } else {
      setSeatError("");
    }

    if (!gearOption) {
      setGearError("Please select the car's gear type.");
      isValid = false;
    } else {
      setGearError("");
    }

    if (!fuelOption) {
      setFuelError("Please select the fuel type.");
      isValid = false;
    } else {
      setFuelError("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; 
    }

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
      alert('Update successful!');
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
      {loadError && <p className="error-message">{loadError}</p>}
        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data" role="form">
          <label className="label" htmlFor="car-name">Enter Name</label>
          <input
            id="car-name"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          {nameError && <p className="error-message">{nameError}</p>}

          <label className="label" htmlFor="car-brand">Choose Brand</label>
          <select id="car-brand" className="dropdown select brand" value={brandOption} onChange={(e) => setBrandOption(e.target.value)} required>
            <option value="">Select a brand</option>
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          {brandError && <p className="error-message">{brandError}</p>}

          <label className="label" htmlFor="car-image">Choose Picture</label>
          <div className="imageUpload">
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="imagePreview" />
            ) : (
              <img src={currentImage} alt="Current" className="imagePreview" />
            )}
            <input id="car-image" type="file" onChange={handleImageChange} className="fileInput" />
            {imageError && <p className="error-message">{imageError}</p>} {/* Display image error */}
          </div>

          <div className="characteristics">
            <div className="selectGroup">
              <label className="label" htmlFor="car-type">Type:</label>
              <select id="car-type" className="dropdown select" value={carType} onChange={(e) => setCarType(e.target.value)}>
                <option value="">Select a type</option>
                {carTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {carTypeError && <p className="error-message">{carTypeError}</p>}
            </div>

            <div className="selectGroup">
              <label className="label" htmlFor="car-seats">Seats:</label>
              <select id="car-seats" className="dropdown select" value={seatOption} onChange={(e) => setSeatOption(e.target.value)}>
                <option value="">Select seats</option>
                {seatOptions.map((seat) => (
                  <option key={seat} value={seat}>{seat}</option>
                ))}
              </select>
              {seatError && <p className="error-message">{seatError}</p>}
            </div>

            <div className="selectGroup">
              <label className="label" htmlFor="car-gear">Gear:</label>
              <select id="car-gear" className="dropdown select" value={gearOption} onChange={(e) => setGearOption(e.target.value)}>
                <option value="">Select gear</option>
                {gearOptions.map((gear) => (
                  <option key={gear} value={gear}>{gear}</option>
                ))}
              </select>
              {gearError && <p className="error-message">{gearError}</p>}
            </div>

            <div className="selectGroup">
              <label className="label" htmlFor="car-fuel">Fuel:</label>
              <select id="car-fuel" className="dropdown select" value={fuelOption} onChange={(e) => setFuelOption(e.target.value)}>
                <option value="">Select fuel</option>
                {fuelOptions.map((fuel) => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
              {fuelError && <p className="error-message">{fuelError}</p>}
            </div>
          </div>

          <label className="label" htmlFor="car-description">Description</label>
          <textarea
            id="car-description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          />
          {descriptionError && <p className="error-message">{descriptionError}</p>}

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

          <label className="label" htmlFor="car-price">Price</label>
          <div className="priceInput">
            <input
              id="car-price"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
            />
            <span className="priceUnit">vnd/day</span>
          </div>
          {priceError && <p className="error-message">{priceError}</p>}

          <div className="confirmButtonContainer">
            <button type="submit" className="confirmButton">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
