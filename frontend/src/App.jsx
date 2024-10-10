// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Garage from "./pages/car_owner/Garage";
import RentalRequest from "./pages/car_owner/RentalRequest";
import RentalHistory from "./pages/car_owner/RentalHistory";
import RentalDetail from "./pages/customer/RentalDeltail";
import CarList from "./pages/customer/CarList";
import CarStatus from "./pages/customer/CarStatus";
import CarDetail from "./pages/customer/CarDetail";
import CarRegistration from "./pages/car/CarRegistration";
import FeedbackPage from "./pages/car/FeedbackPage";
import UpdateCar from "./pages/car/UpdateCar";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import "./styles/General.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/garage" element={<Garage garageID={3}/>} />
        <Route path="/rentalrequest" element={<RentalRequest garageID={1}/>} />
        <Route path="/rental-history" element={<RentalHistory garageID={1} />} />
        <Route path="/rentaldetail" element={<RentalDetail />} />
        <Route path="/carlist" element={<CarList />} />
        <Route path="/carstatus" element={<CarStatus id={5} />} />
        <Route path="/carregistration" element={<CarRegistration />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/updatecar" element={<UpdateCar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cardetail" element={<CarDetail id={8} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
