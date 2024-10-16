// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import AboutUs from "./pages/home/aboutus";
import Garage from "./pages/car_owner/Garage";
import RentalRequest from "./pages/car_owner/RentalRequest";
import RentalHistory from "./pages/car_owner/RentalHistory";
import RentalDetail from "./pages/customer/RentalDeltail";
import CarList from "./pages/customer/CarList";
import CarStatus from "./pages/customer/CarStatus";
import CarDetail from "./pages/customer/CarDetail";
import CustomerMap from "./pages/customer/CustomerMap"
import CarRegistration from "./pages/car/CarRegistration";
import FeedbackPage from "./pages/car/FeedbackPage";
import UpdateCar from "./pages/car/UpdateCar";
import "./styles/General.css";
import FinancePage from "./pages/admin/Finance";
import UserManagementPage from "./pages/admin/UserManagement";
import AdminCarRegistrations from "./pages/admin/AdminCarRegistrations";
import CarTemplatePage from "./pages/admin/CarTemplate";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import Payment from "./pages/payment/payment";
import "./styles/General.css";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/garage" element={<Garage garageID={1} />} />
        <Route
          path="/rental-request"
          element={<RentalRequest garageID={3} />}
        />
        <Route
          path="/rental-history"
          element={<RentalHistory garageID={1} />}
        />
        <Route path="/rental-detail" element={<RentalDetail />} />
        <Route path="/car-list" element={<CarList />} />
        <Route path="/car-status" element={<CarStatus id={5} />} />
        <Route path="/car-registration/:garageID" element={<CarRegistration />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/update-car" element={<UpdateCar />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route
          path="/admin-car-registration"
          element={<AdminCarRegistrations />}
        />
        <Route path="/car-template" element={<CarTemplatePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/car-detail" element={<CarDetail id={5} />} />
        <Route path="/customer-map" element={<CustomerMap/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
