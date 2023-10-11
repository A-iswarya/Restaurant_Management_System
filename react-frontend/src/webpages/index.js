import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import CreateRestaurant from "./components/restaurants/create_restaurant";
import CreateAdmin from "./components/admins/create_admin";
import Dashboard from "./components/Dashboard/dashboard";

const Webpages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateRestaurant />} />
        <Route path="/admin/create" element={<CreateAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Webpages;
