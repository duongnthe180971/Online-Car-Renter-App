import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/General.css";
import "../../styles/car/CarRegistration.css";

const CarRegistration = () => {
  const { garageID } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
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
    const fetchFeatures = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feature');
        const data = await response.json();

        const featureOptions = {};
        data.forEach(feature => {
          featureOptions[feature.FeatureID] = { selected: false, name: feature.Name };
        });
        setFeatures(featureOptions);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    const fetchOptions = async () => {
      const types = ["SUV", "Sedan", "Truck","Sport","Van"];
      const seats = ["2","4", "5", "6","7"];
      const gears = ["Auto", "Manual"];
      const fuels = ["Gasoline", "Diesel", "Electric"];
      const brand = ["Toyota", "Tesla", "BMW", "Nissan", "Ferrari", "Mercedes", "Audi", "Colorado", "Lamborghini", "Bugatti"];

      setCarTypes(types);
      setSeatOptions(seats);
      setGearOptions(gears);
      setFuelOptions(fuels);
      setBrandOptions(brand);
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
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('address', address);
    formData.append('type', carType);
    formData.append('seat', seatOption);
    formData.append('gear', gearOption);
    formData.append('fuel', fuelOption);
    formData.append('brand', brandOption);
    formData.append('garageID', garageID);

    if (selectedImage) {
      formData.append('image', selectedImage); 
    } else {
      console.log('No image selected');
    }

    const selectedFeatures = Object.keys(features).filter(
      (featureID) => features[featureID].selected
    );
    formData.append('features', JSON.stringify(selectedFeatures));

    try {
      const response = await fetch('http://localhost:5000/api/registerCar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate(`/garage`);
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="car-container">
      <div className="car-header">
        <button className="backButton" onClick={() => navigate(-1)}>&lt; Back</button>
        <h1 className="heading">Car Registration</h1>
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
            required
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
            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="imagePreview" />}
            <input type="file" onChange={handleImageChange} className="fileInput" required />
          </div>

          <div className="characteristics">
            <div className="selectGroup">
              <label className="label">Type:</label>
              <select className="dropdown select" value={carType} onChange={(e) => setCarType(e.target.value)} required>
                <option value="">Select type</option>
                {carTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label">Seats:</label>
              <select className="dropdown select" value={seatOption} onChange={(e) => setSeatOption(e.target.value)} required>
                <option value="">Select seats</option>
                {seatOptions.map((seat) => (
                  <option key={seat} value={seat}>{seat}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label">Gear:</label>
              <select className="dropdown select" value={gearOption} onChange={(e) => setGearOption(e.target.value)} required>
                <option value="">Select gear</option>
                {gearOptions.map((gear) => (
                  <option key={gear} value={gear}>{gear}</option>
                ))}
              </select>
            </div>

            <div className="selectGroup">
              <label className="label">Fuel:</label>
              <select className="dropdown select" value={fuelOption} onChange={(e) => setFuelOption(e.target.value)} required>
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
            required
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
              required
            />
            <span className="priceUnit">vnd/day</span>
          </div>

          <div className="confirmButtonContainer">
            <button type="submit" className="confirmButton">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarRegistration;
