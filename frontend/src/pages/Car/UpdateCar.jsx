import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/General.css";
import "../../styles/car/CarRegistration.css";
import carData from "../../assets/data/carData";

const UpdateCar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { carId } = location.state || {};

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const predefinedFeatures = ["Map", "GPS", "DVD Player", "Bluetooth", "Airbag", "Reverse Cam", "USB Port", "ITPMS"];
  const [features, setFeatures] = useState({});

  const [carType, setCarType] = useState("");
  const [seatOption, setSeatOption] = useState("");
  const [gearOption, setGearOption] = useState("");
  const [fuelOption, setFuelOption] = useState([]);
  
  const [oldCarData, setOldCarData] = useState(null); 

  const [carTypes, setCarTypes] = useState([]);
  const [seatOptions, setSeatOptions] = useState([]);
  const [gearOptions, setGearOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const car = carData.find((c) => c.id === carId);
      if (car) {
        setOldCarData(car);
        setName(car.carName);
        setDescription(car.description);
        setAddress(car.address);
        setPrice(car.price);
        setSelectedImage(car.imgUrl);

        const initialFeatures = predefinedFeatures.reduce((acc, feature) => {
          acc[feature] = car.features.includes(feature); 
          return acc;
        }, {});
        setFeatures(initialFeatures);

        setCarType(car.type);
        setSeatOption(car.seat);
        setGearOption(car.gear);
        setFuelOption(car.fuel);
      }
    };

    const fetchOptions = async () => {
      const types = ["SUV", "Sedan", "Truck"];
      const seats = ["4", "5", "7"];
      const gears = ["Auto", "Manual"];
      const fuels = ["Gasoline", "Diesel", "Electric"];
      setCarTypes(types);
      setSeatOptions(seats);
      setGearOptions(gears);
      setFuelOptions(fuels);
    };

    fetchCarDetails();
    fetchOptions();
  }, [carId]);

  const handleFeatureChange = (feature) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const updateCarData = (updatedCar) => {
    const index = carData.findIndex((car) => car.id === updatedCar.id);
    if (index !== -1) {
      carData[index] = {
        ...carData[index],
        ...updatedCar,
      };
      console.log("Updated Car Data:", carData[index]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedFeatures = Object.keys(features).filter((feature) => features[feature]);

    const updatedCar = {
      id: carId,
      carName: name || oldCarData.carName, 
      description: description || oldCarData.description, 
      address: address || oldCarData.address,
      price: price || oldCarData.price,
      imgUrl: selectedImage || oldCarData.imgUrl,
      features: selectedFeatures, 
      type: carType || oldCarData.type, 
      seat: seatOption || oldCarData.seat, 
      gear: gearOption || oldCarData.gear, 
      fuel: fuelOption || oldCarData.fuel, 
      status: oldCarData.status || "Idle", 
    };

    updateCarData(updatedCar);

    navigate("/garage");
  };

  return (
    <div className="car-container">
      <div className="car-header">
        <button className="backButton" onClick={() => navigate(-1)}>
          &lt; Back
        </button>
        <h1 className="heading">Update Car</h1>
      </div>

      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">Enter Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />

          <label className="label">Choose Picture</label>
          <div className="imageUpload">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="imagePreview" />
            ) : (
              <div className="imagePlaceholder">No Image</div>
            )}
            <input type="file" onChange={handleImageChange} className="fileInput" />
          </div>

          <div className="characteristics">
            <div className="selectGroup">
              <label className="label">Type:</label>
              <select
                className="dropdown select"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
              >
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="selectGroup">
              <label className="label">Seats:</label>
              <select
                className="dropdown select"
                value={seatOption}
                onChange={(e) => setSeatOption(e.target.value)}
              >
                {seatOptions.map((seat) => (
                  <option key={seat} value={seat}>
                    {seat}
                  </option>
                ))}
              </select>
            </div>
            <div className="selectGroup">
              <label className="label">Gear:</label>
              <select
                className="dropdown select"
                value={gearOption}
                onChange={(e) => setGearOption(e.target.value)}
              >
                {gearOptions.map((gear) => (
                  <option key={gear} value={gear}>
                    {gear}
                  </option>
                ))}
              </select>
            </div>
            <div className="selectGroup">
              <label className="label">Fuel:</label>
              <select
                className="dropdown select"
                value={fuelOption}
                onChange={(e) => setFuelOption(e.target.value)}
              >
                {fuelOptions.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
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
            {predefinedFeatures.map((feature) => (
              <label
                key={feature}
                className={`featureCheckbox ${features[feature] ? "activeFeature" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={features[feature]}
                  onChange={() => handleFeatureChange(feature)}
                  className="checkbox"
                />
                {feature}
              </label>
            ))}
          </div>

          <label className="label">Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input"
          />
          <div className="mapSection">
            <img
              src="https://via.placeholder.com/400x200"
              alt="map"
              className="mapImage"
            />
            <button className="chooseMapButton">Choose From Map</button>
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
            <button type="submit" className="confirmButton">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
