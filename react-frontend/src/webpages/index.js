import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Login from './login';
import CreateRestaurant from './create_restaurant';

const Webpages = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:restaurantId/login" element={<Login />} />
        <Route path="/create" element={<CreateRestaurant />} />
      </Routes>
    </BrowserRouter>)
}

export default Webpages;