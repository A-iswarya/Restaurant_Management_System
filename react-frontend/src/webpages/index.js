import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import CreateRestaurant from "./components/restaurants/create_restaurant";
import EditRestaurant from "./components/restaurants/edit_restaurant";
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
import EditFeedback from "./components/feedbacks/edit_feedback";
import Orders from "./components/orders";
import CreateOrder from "./components/orders/create_order";
import EditOrder from "./components/orders/edit_order";
import Tables from "./components/tables";
import CreateTable from "./components/tables/create_table";
import EditTable from "./components/tables/edit_table";
import Reservations from "./components/reservations";
import CreateReservation from "./components/reservations/create_reservation";
import EditReservation from "./components/reservations/edit_reservation";

const Webpages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateRestaurant />} />
        <Route
          path="/restaurants/:restaurantId/edit"
          element={<EditRestaurant />}
        />
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
        <Route path="/feedbacks/:feedbackId/edit" element={<EditFeedback />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/create" element={<CreateOrder />} />
        <Route path="/orders/:orderId/edit" element={<EditOrder />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/tables/create" element={<CreateTable />} />
        <Route path="/tables/:tableId/edit" element={<EditTable />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/create" element={<CreateReservation />} />
        <Route
          path="/reservations/:reservationId/edit"
          element={<EditReservation />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Webpages;
