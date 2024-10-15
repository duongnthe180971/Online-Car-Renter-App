import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/General.css";
import "../../styles/car/CarRegistration.css";
import carData from "../../assets/data/carData"

const CarRegistration = () => {
  const { garageID } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [features, setFeatures] = useState({});
  const [carTypes, setCarTypes] = useState([]);
  const [seatOptions, setSeatOptions] = useState([]);
  const [gearOptions, setGearOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);



  useEffect(() => {
    const fetchFeatures = async () => {
      const featuresData = {
        "Map": false,
        "GPS": false,
        "DVD Player": false,
        "Bluetooth": false,
        "Airbag": false,
        "Reverse Cam": false,
        "Usb Port": false,
        "ITPMS": false,
      };
      setFeatures(featuresData);
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

    fetchFeatures();
    fetchOptions();
  }, []);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const imgUrl1 = imageName
      ? `../img/car/${imageName}` 
      : "https://via.placeholder.com/150";
    const newCarId = carData.length + 1;

    const newCar = {
        id: newCarId,
        GarageID: parseInt(garageID),
        carName: name,
        imgUrl: imgUrl1,
        description: description,
        price: parseInt(price),
        address: address,
        features: Object.keys(features).filter(key => features[key]),
        type: carTypes[0],
        seat: seatOptions[0],
        gear: gearOptions[0],
        fuel: fuelOptions[0],
        status: 'Idle',
    };

    carData.push(newCar);

    // if changed 
    // navigate("/garage/${garageID}`");
    navigate("/garage");
};

  return (
    <div className="car-container">
      <div className="car-header">
        <button className="backButton" onClick={() => navigate(-1)}>&lt; Back</button>
        <h1 className="heading">Car Registration</h1>
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
              <select className="dropdown select">
                {carTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="selectGroup">
              <label className="label">Seats:</label>
              <select className="dropdown select">
                {seatOptions.map((seat) => (
                  <option key={seat} value={seat}>{seat}</option>
                ))}
              </select>
            </div>
            <div className="selectGroup">
              <label className="label">Gear:</label>
              <select className="dropdown select">
                {gearOptions.map((gear) => (
                  <option key={gear} value={gear}>{gear}</option>
                ))}
              </select>
            </div>
            <div className="selectGroup">
              <label className="label">Fuel:</label>
              <select className="dropdown select">
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
            {Object.keys(features).map((feature) => (
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

          <label className="label">Upload Licence</label>
          <div className="uploadSection">
            <input type="file" className="fileInput" />
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

export default CarRegistration;
