import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';

const Webpages = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>)
}

export default Webpages;