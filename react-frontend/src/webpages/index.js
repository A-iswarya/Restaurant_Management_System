import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import CreateRestaurant from "./components/restaurants/create_restaurant";
import CreateAdmin from "./components/admins/create_admin";
import EditAdmin from "./components/admins/edit_admin";
import Dashboard from "./dashboard";
import Staffs from "./components/staffs";

const Webpages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateRestaurant />} />
        <Route path="/admin/create" element={<CreateAdmin />} />
        <Route path="/admin/:adminId/edit" element={<EditAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/staffs" element={<Staffs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Webpages;
