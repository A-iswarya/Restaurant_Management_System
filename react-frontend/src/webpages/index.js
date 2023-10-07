import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Login from './login';

const Webpages = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:restaurantId/login" element={<Login />} />
      </Routes>
    </BrowserRouter>)
}

export default Webpages;