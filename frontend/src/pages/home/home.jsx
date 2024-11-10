import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/home/home.css";
import CarPlot from "../../modules/components/CarPlot";
import HomeHeader from "../../modules/components/HomeHeader";
import carDemo from "../../assets/data/carDemo";
import "../../styles/home/notification.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://wallpapersmug.com/download/2048x1152/6906f8/bmw-car-headlight.jpg",
    "https://thuexeincar.net/wp-content/uploads/2018/12/86579d751e8a73c.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20210205/pngtree-car-banner-background-image_547203.jpg",
    "https://img.pikbest.com/background/20220119/car-banner-background_6224454.jpg!sw800",
  ];

  const showImage = (index) => {
    setCurrentIndex(index);
  };

  const showNextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(showNextImage, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const [cars, SetCars] = useState(carDemo);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/car");
        const filteredCars = response.data.filter((car) => car.CarID < 5);
        SetCars(filteredCars);
      } catch (error) {
        console.error("Error fetching car data:", error); // Log the error
      }
    };

    fetchCarData();
  }, []);
  const handleNavigateAboutUs = () => {
    navigate("/about-us");
  };

  return (
    <div className="home-container">
      <HomeHeader></HomeHeader>
      {/* Advertisement section */}
      <div className="home-advertisement">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`home-Advertisement ${index + 1}`}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
        <div className="home-dots">
          {images.map((_, index) => (
            <div
              key={index}
              className={`home-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => showImage(index)}
            />
          ))}
        </div>
      </div>
      {/* show car */}
      <div className="home-popular-cars">
        <h2>Popular Cars</h2>
        <div className="home-car-list">
          {cars.map((item) => (
            <CarPlot key={item.CarID} item={item} />
          ))}
        </div>
      </div>

      <div className="home-rent-now">
        <img
          src="https://storage.googleapis.com/a1aa/image/uuufUh0pGjQRPCfpPXZ6GUv1smHoCX44eeSKmO93eAoeqOP5E.jpg"
          alt="Toyota land cruiser V8"
          height="200"
          width="300"
        />
        <div className="home-content">
          <h2>Don’t Have a Car? Rent a Car Right Away!</h2>
          <p>
            Immerse yourself in a world of possibilities with our extensive
            range of vehicles. From sleek sedans to rugged SUVs and luxurious
            convertibles, we have the perfect wheels to match your style,
            preferences, and the demands of your adventure.
          </p>
          <button className="home-rent-button">
            <a href="./car-list">Rent Now</a>
          </button>
        </div>
      </div>

      <div className="home-about">
        <h2>About Our Company</h2>
        <button className="home-about-button" onClick={handleNavigateAboutUs}>
          About Us
        </button>
      </div>
    </div>
  );
};

export default Home;
