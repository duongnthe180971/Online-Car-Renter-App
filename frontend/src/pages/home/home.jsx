import React, { useState, useEffect } from "react";
import "../../styles/home/home.css";
import carData from "../../assets/data/carData";
import CarPlot from "../../modules/components/CarPlot";
import HomeHeader from "./homeheader";
import "../../styles/home/notification.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home({ id }) {
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
  });
  // const CarDetail = ({ id }) => ({
  // const cars = [
  //   {
  //     imageUrl:
  //       "https://vcdn1-vnexpress.vnecdn.net/2020/12/24/Toyota-Land-Cruiser-VnExpress-19-1608795637.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=-syfotVQ_sAy4i0cFIIkDQ",
  //     name: "Toyota Land Cruiser V8",
  //     details: "4 Seats • SUV • Auto",
  //     price: "1.000.000 vnd",
  //   },
  //   {
  //     imageUrl: "https://katavina.com/uploaded/tin/BMW-i8/BMW-i8.jpg",
  //     name: "BMW I8",
  //     details: "2 Seats • SUV • Auto",
  //     price: "4.000.000 vnd",
  //   },
  //   {
  //     imageUrl:
  //       "https://xehay.vn/uploads/images/2022/9/01/xehay-ford%20mustang-01092022-1.jpg",
  //     name: "Ford Mustang",
  //     details: "4 Seats • SUV • Auto",
  //     price: "3.000.000 vnd",
  //   },
  //   {
  //     imageUrl:
  //       "https://fordlongbien.com/wp-content/uploads/2017/08/Ford-Everest-2023-fordlongbien_com-19.jpg",
  //     name: "Ford Everest",
  //     details: "7 Seats • SUV • Auto",
  //     price: "2.000.000 vnd",
  //   },
  // ];
  //
  return (
    <div className="home-container">
      <HomeHeader id={id}></HomeHeader>
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
          {<CarPlot item={carData.find((item) => item.id === 1)} />}
          {<CarPlot item={carData.find((item) => item.id === 2)} />}
          {<CarPlot item={carData.find((item) => item.id === 3)} />}
          {<CarPlot item={carData.find((item) => item.id === 4)} />}
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
        <button className="home-about-button">
          <a href="./aboutus">About Us</a>
        </button>
      </div>
    </div>
  );
}

export default Home;
