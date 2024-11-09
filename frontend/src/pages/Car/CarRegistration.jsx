import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/General.css";
import "../../styles/car/CarRegistration.css";

const CarRegistration = () => {
  const { garageID } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLicense, setSelectedLicense] = useState(null);
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

  const [imageError, setImageError] = useState("");
  const [licenseError, setLicenseError] = useState("");
  const [isFormValid, setIsFormValid] = useState(true); 
  const [submitError, setSubmitError] = useState("");
const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== 2) {
      setAuthorized(false);
      return;
    }

    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feature");
        const data = await response.json();

        const featureOptions = {};
        data.forEach((feature) => {
          featureOptions[feature.FeatureID] = { selected: false, name: feature.Name };
        });
        setFeatures(featureOptions);
      } catch (error) {
        console.error("Error fetching features:", error);
        setSubmitError("Error fetching features: " + error.message);
      }
    };

    const fetchOptions = async () => {
      const types = ["SUV", "Sedan", "Truck", "Sport", "Van"];
      const seats = ["2", "4", "5", "6", "7"];
      const gears = ["Auto", "Manual"];
      const fuels = ["Gasoline", "Diesel", "Electric"];
      const brands = ["Toyota", "Tesla", "BMW", "Nissan", "Ferrari", "Mercedes", "Audi", "Lamborghini"];

      setCarTypes(types);
      setSeatOptions(seats);
      setGearOptions(gears);
      setFuelOptions(fuels);
      setBrandOptions(brands);
    };

    fetchFeatures();
    fetchOptions();
  }, []);

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
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setImageError("Invalid image type. Please upload a JPEG, PNG, or GIF image.");
        setSelectedImage(null);
        setIsFormValid(false); 
      } else {
        setSelectedImage(file);
        setImageError("");
        setIsFormValid(true);
      }
    }
  };

  const handleLicenseChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validLicenseTypes = [
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/pdf",
      ];
      if (!validLicenseTypes.includes(file.type)) {
        setLicenseError("Invalid license file type. Please upload a DOC, DOCX, XLS, XLSX, or PDF file.");
        setSelectedLicense(null);
        setIsFormValid(false);
      } else {
        setSelectedLicense(file);
        setLicenseError(""); 
        setIsFormValid(true);
      }
    }
  };

  const sendNotification = async () => {
    try {
      const adminResponse = await fetch("http://localhost:5000/api/account");
      if (!adminResponse.ok) {
        throw new Error("Failed to fetch admin accounts");
      }
      const accounts = await adminResponse.json();
  
      const admins = accounts.filter((account) => account.Role === 1);
  
      for (const admin of admins) {
        const response = await fetch("http://localhost:5000/api/notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ NotificationID: 1, AccID: admin.id }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            `Failed to send notification to admin ID: ${admin.id}. Error: ${errorData.message}`
          );
          throw new Error(`Failed to send notification to admin ID: ${admin.id}`);
        }
      }
  
      console.log("Notifications sent to all admins.");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid || !selectedImage || !selectedLicense) {
      if (!selectedImage) {
        setImageError("Please upload a valid image.");
      }
      if (!selectedLicense) {
        setLicenseError("Please upload a valid license file.");
      }
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("type", carType);
    formData.append("seat", seatOption);
    formData.append("gear", gearOption);
    formData.append("fuel", fuelOption);
    formData.append("brand", brandOption);
    formData.append("garageID", garageID);

    formData.append("image", selectedImage);
    formData.append("license", selectedLicense); 

    const selectedFeatures = Object.keys(features).filter(
      (featureID) => features[featureID].selected
    );
    formData.append("features", JSON.stringify(selectedFeatures));

    try {
      const response = await fetch("http://localhost:5000/api/registerCar", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Form Submitted:", formData);
        alert("Registration successful!");
        await sendNotification(); 
        navigate(`/garage`, { state: { garageID: garageID } });
      } else {
        console.error("Error submitting form:", response.statusText);
        setSubmitError("Error submitting form: " + response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Error submitting form: " + error.message);
    }
  };

  if (!authorized) {
    return (
      <div className="error-page">
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="car-container">
      <div className="car-header">
        <button className="backButton" onClick={() => navigate(-1)}>
&lt; Back
</button>
        <h1 className="heading">Car Registration</h1>
      </div>

      <div className="formContainer">
      {submitError && <p className="error-message">{submitError}</p>}
        <form
className="form"
onSubmit={handleSubmit}
encType="multipart/form-data"
data-testid="car-form"
>
          <label className="label" htmlFor="car-name">Enter Name</label>
          <input
            id="car-name"
            className="input"
            placeholder="Enter Name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label" htmlFor="car-brand">Choose Brand</label>
          <select
            id="car-brand"
            className="dropdown select brand"
            required
            value={brandOption}
            onChange={(e) => setBrandOption(e.target.value)}
          >
            <option value="">Select a brand</option>
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <label className="label" htmlFor="car-image">Choose Picture</label>
          <div className="imageUpload">
            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="imagePreview" />}
            <input
              id="car-image"
              className="fileInput"
              required
              type="file"
              onChange={handleImageChange} 
            />
          </div>
          {imageError && <p className="error-message">{imageError}</p>}

          <label className="label" htmlFor="car-license">Upload License</label>
          <div className="licenseUpload">
            {selectedLicense && <p>{selectedLicense.name}</p>}
            <input
              id="car-license"
              className="fileInput"
              required
              type="file"
              onChange={handleLicenseChange}
            />
          </div>
          {licenseError && <p className="error-message">{licenseError}</p>}

          <div className="characteristics">
            <div className="selectGroup">
              <label className="label" htmlFor="car-type">Type:</label>
              <select
                id="car-type"
                className="dropdown select"
                required
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
              >
                <option value="">Select type</option>
                {carTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label" htmlFor="car-seats">Seats:</label>
              <select
                id="car-seats"
                className="dropdown select"
                required
                value={seatOption}
                onChange={(e) => setSeatOption(e.target.value)}
              >
                <option value="">Select seats</option>
                {seatOptions.map((seat) => (
                  <option key={seat} value={seat}>{seat}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label" htmlFor="car-gear">Gear:</label>
              <select
                id="car-gear"
                className="dropdown select"
                required
                value={gearOption}
                onChange={(e) => setGearOption(e.target.value)}
              >
                <option value="">Select gear</option>
                {gearOptions.map((gear) => (
                  <option key={gear} value={gear}>{gear}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label" htmlFor="car-fuel">Fuel:</label>
              <select
                id="car-fuel"
                className="dropdown select"
                required
                value={fuelOption}
                onChange={(e) => setFuelOption(e.target.value)}
              >
                <option value="">Select fuel</option>
                {fuelOptions.map((fuel) => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="label" htmlFor="car-description">Description</label>
          <textarea
            id="car-description"
            className="textarea"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="label" htmlFor="car-features">Features:</label>
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
              className="input"
              placeholder="Price"
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="priceUnit">vnd/day</span>
          </div>

          <div className="confirmButtonContainer">
            <button type="submit" className="confirmButton" disabled={!isFormValid}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarRegistration;
