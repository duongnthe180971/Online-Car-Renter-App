// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Garage from "./pages/car_owner/Garage";
import RentalRequest from "./pages/car_owner/RentalRequest";
import RentalHistory from "./pages/car_owner/RentalHistory";
import CarList from "./pages/customer/CarList";
import CarStatus from "./pages/customer/CarStatus";
import CarRegistration from "./pages/Car/CarRegistration";
import FeedbackPage from "./pages/Car/FeedbackPage";
import UpdateCar from "./pages/Car/UpdateCar";
import './styles/General.css'
import Register from "./pages/login/register";
import Login from "./pages/login/login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/rentalrequest" element={<RentalRequest />} />
        <Route path="/rental-history" element={<RentalHistory />} />
        <Route path="/carlist" element={<CarList />} />
        <Route path="/carstatus" element={<CarStatus id={3} />} />
        <Route path="/carregistration" element={<CarRegistration />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/updatecar" element={<UpdateCar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
