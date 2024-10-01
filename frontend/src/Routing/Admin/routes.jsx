// src/Routing/Admin/routes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/admin/home/HomePage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Định nghĩa một route cho HomePage */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
