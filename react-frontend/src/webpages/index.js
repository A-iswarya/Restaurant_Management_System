import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import CreateRestaurant from "./components/restaurants/create_restaurant";
import CreateAdmin from "./components/admins/create_admin";
import EditAdmin from "./components/admins/edit_admin";
import Dashboard from "./dashboard";
import Staffs from "./components/staffs";
import CreateStaff from "./components/staffs/create_staff";
import EditStaff from "./components/staffs/edit_staff";
import CreateCustomer from "./components/customers/create_customer";
import EditCustomer from "./components/customers/edit_customer";
import Menus from "./components/menus";
import CreateMenu from "./components/menus/create_menu";
import EditMenu from "./components/menus/edit_menu";
import Feedbacks from "./components/feedbacks";
import CreateFeedback from "./components/feedbacks/create_feedback";

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
        <Route path="/staff/create" element={<CreateStaff />} />
        <Route path="/staff/:staffId/edit" element={<EditStaff />} />

        <Route path="/customer/create" element={<CreateCustomer />} />
        <Route path="/customer/:customerId/edit" element={<EditCustomer />} />

        <Route path="/menus" element={<Menus />} />
        <Route path="/menus/create" element={<CreateMenu />} />
        <Route path="/menus/:menuId/edit" element={<EditMenu />} />

        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/feedbacks/create" element={<CreateFeedback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Webpages;
